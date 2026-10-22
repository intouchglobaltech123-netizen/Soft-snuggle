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
  await seedIfEmpty(db);
  return db;
}

async function seedIfEmpty(db: Db) {
  const { rows } = await db.query<{ n: number }>("SELECT count(*)::int AS n FROM products");
  if (rows[0].n > 0) return;
  for (const [i, p] of SEED_PRODUCTS.entries()) {
    await db.query(
      `INSERT INTO products
        (slug, name, category, fabric, colour, price, compare_at, badge, organic,
         sizes, age_groups, description, care, tint, garment, sort)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
       ON CONFLICT (slug) DO NOTHING`,
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
