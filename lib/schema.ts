// Runs on every server start. Every statement is idempotent, so it is safe
// against both the embedded database and a real PostgreSQL server.
export const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS products (
  id            SERIAL PRIMARY KEY,
  slug          TEXT UNIQUE NOT NULL,
  name          TEXT NOT NULL,
  category      TEXT NOT NULL,
  fabric        TEXT NOT NULL,
  colour        TEXT NOT NULL,
  price         INTEGER NOT NULL CHECK (price >= 0),
  compare_at    INTEGER,
  badge         TEXT,
  organic       BOOLEAN NOT NULL DEFAULT FALSE,
  sizes         TEXT[] NOT NULL DEFAULT '{}',
  age_groups    TEXT[] NOT NULL DEFAULT '{}',
  description   TEXT NOT NULL DEFAULT '',
  care          TEXT NOT NULL DEFAULT '',
  tint          TEXT NOT NULL DEFAULT '#E3EAE0',
  garment       TEXT NOT NULL DEFAULT '#F4EEE4',
  in_stock      BOOLEAN NOT NULL DEFAULT TRUE,
  sort          INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Allowed categories, updated on start so new ones reach existing databases.
-- Only rewritten when out of date, so parallel server starts don't race each other.
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'products_category_check' AND pg_get_constraintdef(oid) LIKE '%jabla%'
  ) THEN
    ALTER TABLE products DROP CONSTRAINT IF EXISTS products_category_check;
    ALTER TABLE products ADD CONSTRAINT products_category_check
      CHECK (category IN ('frock', 'jabla', 'bodysuit', 'romper', 'gift-set'));
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS orders (
  id              SERIAL PRIMARY KEY,
  code            TEXT GENERATED ALWAYS AS ('SS-' || (id + 1000)::text) STORED,
  access_key      TEXT NOT NULL,
  customer_name   TEXT NOT NULL,
  phone           TEXT NOT NULL,
  email           TEXT,
  address         TEXT NOT NULL,
  city            TEXT NOT NULL,
  state           TEXT NOT NULL,
  pincode         TEXT NOT NULL,
  items           JSONB NOT NULL,
  subtotal        INTEGER NOT NULL,
  shipping        INTEGER NOT NULL,
  total           INTEGER NOT NULL,
  payment_method  TEXT NOT NULL CHECK (payment_method IN ('upi', 'cod')),
  payment_status  TEXT NOT NULL DEFAULT 'pending',
  utr             TEXT,
  status          TEXT NOT NULL DEFAULT 'new',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS orders_code_idx ON orders (code);

-- Delivery tracking, filled in by the owner as the order moves.
-- status: new → confirmed → packed → shipped → out_for_delivery → delivered (or cancelled)
ALTER TABLE orders ADD COLUMN IF NOT EXISTS courier         TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS tracking_number TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS tracking_url    TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS confirmed_at    TIMESTAMPTZ;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipped_at      TIMESTAMPTZ;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS delivered_at    TIMESTAMPTZ;

-- Shoppers with an account. Guests order without one, so this is optional:
-- orders keep their own name, phone and address whatever happens here.
CREATE TABLE IF NOT EXISTS customers (
  id            SERIAL PRIMARY KEY,
  phone         TEXT UNIQUE NOT NULL,
  name          TEXT NOT NULL,
  email         TEXT,
  password_hash TEXT NOT NULL,
  address       TEXT,
  city          TEXT,
  state         TEXT,
  pincode       TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_login_at TIMESTAMPTZ
);

-- Saved pieces. One row per customer and product, so saving twice is harmless.
CREATE TABLE IF NOT EXISTS wishlist (
  customer_id  INTEGER NOT NULL REFERENCES customers (id) ON DELETE CASCADE,
  product_id   INTEGER NOT NULL REFERENCES products (id) ON DELETE CASCADE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (customer_id, product_id)
);

-- Orders remember who placed them when the shopper was signed in. Guest orders
-- leave this empty and are claimed later by matching phone number.
ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_id INTEGER REFERENCES customers (id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS orders_customer_idx ON orders (customer_id);
CREATE INDEX IF NOT EXISTS orders_phone_idx ON orders (phone);

CREATE TABLE IF NOT EXISTS subscribers (
  id          SERIAL PRIMARY KEY,
  email       TEXT UNIQUE NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
`;
