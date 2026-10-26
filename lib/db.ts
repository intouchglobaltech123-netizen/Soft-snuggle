import { mkdirSync } from "node:fs";
import path from "node:path";
import { SCHEMA_SQL } from "./schema";
import { SEED_PRODUCTS } from "./seed";

type Row = Record<string, unknown>;

export interface Db {
  query<T = Row>(sql: string, params?: unknown[]): Promise<{ rows: T[] }>;
  exec(sql: string): Promise<void>;
}

// Survives hot reloads in dev so we never open the database twice.
const globalForDb = globalThis as unknown as { __softSnuggleDb?: Promise<Db> };

async function connect(): Promise<Db> {
  const url = process.env.DATABASE_URL;
  let db: Db;

  if (url) {
    const { Pool } = await import("pg");
    const pool = new Pool({ connectionString: url, max: 5 });
    db = {
      query: async (sql, params) => {
        const res = await pool.query(sql, params as unknown[]);
        return { rows: res.rows };
      },
      exec: async (sql) => {
        await pool.query(sql);
      },
    };
  } else if (process.env.VERCEL) {
    throw new Error("DATABASE_URL is not set. Add a Postgres database (Vercel → Storage → Neon) and redeploy.");
  } else {
    const { PGlite } = await import("@electric-sql/pglite");
    const dataDir = path.join(process.cwd(), ".data");
    mkdirSync(dataDir, { recursive: true });
    const lite = await PGlite.create(path.join(dataDir, "pglite"));
    db = {
      query: async (sql, params) => {
        const res = await lite.query(sql, params);
        return { rows: res.rows as never[] };
      },
      exec: async (sql) => {
        await lite.exec(sql);
      },
    };
  }

  await db.exec(SCHEMA_SQL);
  await syncCatalogue(db);
  return selfHealing(db);
}

// The connection is cached for the life of the process, so a schema added after
// the server started is never created and every query against it fails. That is
// easy to hit in development, where the server keeps running across a git pull.
// Rather than leave a dead site until someone restarts it, a query that fails
// because a table or column is missing runs the schema once and tries again.
function selfHealing(db: Db): Db {
  let healing: Promise<void> | null = null;

  const heal = () => {
    healing ??= (async () => {
      await db.exec(SCHEMA_SQL);
      await syncCatalogue(db);
    })().finally(() => {
      healing = null;
    });
    return healing;
  };

  // 42P01 is an unknown table, 42703 an unknown column. PGlite reports the same
  // thing in the message rather than a code, so both are checked.
  const isMissing = (err: unknown) => {
    const code = (err as { code?: string })?.code;
    if (code === "42P01" || code === "42703") return true;
    const message = err instanceof Error ? err.message : String(err);
    return /relation .* does not exist|column .* does not exist/i.test(message);
  };

  const retrying = <T>(run: () => Promise<T>) => async (): Promise<T> => {
    try {
      return await run();
    } catch (err) {
      if (!isMissing(err)) throw err;
      await heal();
      return run();
    }
  };

  return {
    query: (sql, params) => retrying(() => db.query(sql, params))(),
    exec: (sql) => retrying(() => db.exec(sql))(),
  } as Db;
}

// lib/seed.ts is the catalogue: there is no admin screen, so the file is the
// only place products are written. This runs on every start and brings the
// database in step with it — new pieces are added and details are refreshed on
// the ones already there. Without it a live database keeps its first-ever
// catalogue for good and never sees a new product.
//
// Two things are deliberately left alone, because the owner changes them in the
// database and the seed file knows nothing about them:
//   * in_stock — so a sold-out piece stays sold out across a deploy.
//   * products whose slug is no longer in the file — removed by hand if wanted.
async function syncCatalogue(db: Db) {
  for (const [i, p] of SEED_PRODUCTS.entries()) {
    await db.query(
      `INSERT INTO products
        (slug, name, category, fabric, colour, price, compare_at, badge, organic,
         sizes, age_groups, description, care, tint, garment, sort)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
       ON CONFLICT (slug) DO UPDATE SET
         name        = EXCLUDED.name,
         category    = EXCLUDED.category,
         fabric      = EXCLUDED.fabric,
         colour      = EXCLUDED.colour,
         price       = EXCLUDED.price,
         compare_at  = EXCLUDED.compare_at,
         badge       = EXCLUDED.badge,
         organic     = EXCLUDED.organic,
         sizes       = EXCLUDED.sizes,
         age_groups  = EXCLUDED.age_groups,
         description = EXCLUDED.description,
         care        = EXCLUDED.care,
         tint        = EXCLUDED.tint,
         garment     = EXCLUDED.garment,
         sort        = EXCLUDED.sort`,
      [
        p.slug, p.name, p.category, p.fabric, p.colour, p.price, p.compareAt ?? null,
        p.badge ?? null, p.organic, p.sizes, p.ageGroups, p.description, p.care,
        p.tint, p.garment, i,
      ],
    );
  }
}

export function getDb(): Promise<Db> {
  if (!globalForDb.__softSnuggleDb) {
    globalForDb.__softSnuggleDb = connect().catch((err) => {
      globalForDb.__softSnuggleDb = undefined;
      throw err;
    });
  }
  return globalForDb.__softSnuggleDb;
}
