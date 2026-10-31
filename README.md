# Soft Snuggle — babywear store

Next.js 15 (App Router) + React 19 + Tailwind CSS 4 + Motion + Lenis, with a PostgreSQL backend.

## Run it

```bash
npm install
cp .env.example .env.local   # then edit the values
npm run dev                  # http://localhost:3000
```

## Database

- **No `DATABASE_URL` set** → uses an embedded Postgres (PGlite) stored in `./.data`. Good for development only.
- **`DATABASE_URL` set** → connects to real PostgreSQL (Neon, Supabase, your own server).

Tables (`products`, `orders`, `subscribers`) are created automatically on first start (`lib/schema.ts`),
and the 8 catalogue products from the PDF are seeded if `products` is empty (`lib/seed.ts`).
Orders get IDs like `SS-1001` automatically.

There is no admin panel. Use any Postgres client (TablePlus, pgAdmin, Neon console) to see orders or
edit products:

```sql
SELECT code, customer_name, phone, total, payment_method, payment_status, utr, created_at
FROM orders ORDER BY id DESC;
```

## Order flow

1. Customer adds items (size + qty) → bag is kept in the browser.
2. Checkout: name, WhatsApp number, address, pincode, **UPI** or **Cash on Delivery**.
3. `POST /api/orders` re-prices everything from the database and saves the order.
4. Order page (`/order/SS-1001?k=…`, private link):
   - **UPI** → QR code (desktop) or "Pay in UPI app" button (mobile) with amount + order ID filled in → customer enters the UTR → saved to the order.
   - **COD** → goes straight to the WhatsApp step.
5. "Send order on WhatsApp" opens WhatsApp with a pre-filled message (items, total, UTR or COD, address). The customer taps Send.

## Order tracking (no admin page)

Customers check their order at `/track` with their order ID and mobile number. You move an order along by
updating it in the database (Neon / Supabase console, TablePlus, pgAdmin, or `psql`):

```sql
-- payment checked / order confirmed
UPDATE orders SET status = 'confirmed', payment_status = 'paid', confirmed_at = now(), updated_at = now() WHERE code = 'SS-1042';

-- packed
UPDATE orders SET status = 'packed', updated_at = now() WHERE code = 'SS-1042';

-- handed to the courier (tracking_url is optional; without it the page links a search for the number)
UPDATE orders SET status = 'shipped', courier = 'Delhivery', tracking_number = '1234567890',
  tracking_url = NULL, shipped_at = now(), updated_at = now() WHERE code = 'SS-1042';

-- out for delivery / delivered / cancelled
UPDATE orders SET status = 'out_for_delivery', updated_at = now() WHERE code = 'SS-1042';
UPDATE orders SET status = 'delivered', delivered_at = now(), updated_at = now() WHERE code = 'SS-1042';
UPDATE orders SET status = 'cancelled', updated_at = now() WHERE code = 'SS-1042';
```

## Where to change things

| What | File |
| --- | --- |
| WhatsApp number, UPI ID, payee name, shipping rules | `.env.local` |
| Hero carousel slides (title, text, character look) | `lib/collections.ts` |
| Baby characters (swap for 3D PNGs later) | `components/art/Baby.tsx` |
| Product photos (front/back/close-up/lifestyle) | drop into `public/products/<slug>/1.jpg … 4.jpg` — prompts in `IMAGE-PROMPTS.md` |
| Real photos on their own background | name them e.g. `1-photo.webp`, `2-photo.webp` (only files named exactly `1`/`2`/`3` are treated as white-background studio shots and blended into the card colour) |
| Hero 3D characters | drop into `public/hero/<collection>.png` (white background) |
| Product illustrations (shown until photos exist) | `components/art/Garment.tsx` |
| Loading screen (clothesline) | `components/Loader.tsx` |
| Logo | `public/logo.webp` (favicon: `app/icon.png`) |
| Size charts (Frock in inches, Jabla in cm) | `components/shop/SizeChart.tsx` |
| Email, Instagram, WhatsApp | `lib/store.ts` / `.env.local` |
| Age groups | `lib/store.ts` |
| Policy page wording (drafts) | `app/policies/[slug]/page.tsx` |
| Colours & fonts | `app/globals.css`, `app/layout.tsx` |

## Deploying

Needs Node.js hosting (Vercel, Railway, Render, a VPS) plus a Postgres database. Plain cPanel shared
hosting usually cannot run a Next.js server. Set the same env vars there, with `DATABASE_URL` pointing at
your Postgres.

On Vercel and Railway the site refuses to start without `DATABASE_URL` and `SESSION_SECRET`: the embedded
database would be wiped on every deploy, and the fallback secret is public in this repo.

### Railway

The live site runs on Railway (`soft-snuggle-production.up.railway.app`), deployed from `main`.

1. In the project, **+ Create → Database → PostgreSQL**. The service is named `Postgres`.
2. On the app service's **Variables**, add:
   - `DATABASE_URL` = `${{Postgres.DATABASE_URL}}` (Railway's private network; no SSL setting needed)
   - `SESSION_SECRET` = a long random value (`openssl rand -base64 32`)
   - the WhatsApp, UPI and shipping values from `.env.example`
3. Redeploy. The first start creates the tables and loads the catalogue.

To work against the Railway database from your own computer, put the Postgres service's
`DATABASE_PUBLIC_URL` into `.env.local` with `?sslmode=no-verify` on the end. Railway's certificate is
self-signed, so `sslmode=require` fails. This is the live shop's data: anything you order or sign up
locally is real.
