import { randomBytes } from "node:crypto";
import { getDb } from "./db";
import { productImages } from "./images";
import { shippingFor } from "./store";
import { courierLink, type TrackInfo } from "./tracking";
import type { Order, OrderItem, PaymentMethod, Product } from "./types";

type ProductRow = {
  id: number; slug: string; name: string; category: Product["category"]; fabric: string;
  colour: string; price: number; compare_at: number | null; badge: string | null;
  organic: boolean; sizes: string[]; age_groups: string[]; description: string; care: string;
  tint: string; garment: string; in_stock: boolean;
};

function toProduct(r: ProductRow): Product {
  return {
    id: r.id, slug: r.slug, name: r.name, category: r.category, fabric: r.fabric,
    colour: r.colour, price: r.price, compareAt: r.compare_at, badge: r.badge,
    organic: r.organic, sizes: r.sizes, ageGroups: r.age_groups, description: r.description,
    care: r.care, tint: r.tint, garment: r.garment, inStock: r.in_stock,
    images: productImages(r.slug),
  };
}

export async function getProducts(): Promise<Product[]> {
  const db = await getDb();
  const { rows } = await db.query<ProductRow>("SELECT * FROM products ORDER BY sort, id");
  return rows.map(toProduct);
}

export async function getProduct(slug: string): Promise<Product | null> {
  const db = await getDb();
  const { rows } = await db.query<ProductRow>("SELECT * FROM products WHERE slug = $1", [slug]);
  return rows[0] ? toProduct(rows[0]) : null;
}

export interface NewOrderInput {
  customerName: string;
  phone: string;
  email: string | null;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: PaymentMethod;
  items: { productId: number; size: string; qty: number }[];
}

export class OrderError extends Error {}

/** Prices always come from the database, never from the browser. */
export async function createOrder(input: NewOrderInput) {
  const db = await getDb();
  const ids = [...new Set(input.items.map((i) => i.productId))];
  const { rows } = await db.query<ProductRow>("SELECT * FROM products WHERE id = ANY($1::int[])", [ids]);
  const byId = new Map(rows.map((r) => [r.id, r]));

  const items: OrderItem[] = input.items.map((i) => {
    const p = byId.get(i.productId);
    if (!p || !p.in_stock) throw new OrderError("One of the items in your bag is no longer available.");
    if (!p.sizes.includes(i.size)) throw new OrderError(`Size ${i.size} is not available for ${p.name}.`);
    return { productId: p.id, name: p.name, size: i.size, qty: i.qty, price: p.price };
  });

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;
  const accessKey = randomBytes(12).toString("hex");

  const res = await db.query<{ code: string }>(
    `INSERT INTO orders
      (access_key, customer_name, phone, email, address, city, state, pincode,
       items, subtotal, shipping, total, payment_method, payment_status)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
     RETURNING code`,
    [
      accessKey, input.customerName, input.phone, input.email, input.address, input.city,
      input.state, input.pincode, JSON.stringify(items), subtotal, shipping, total,
      input.paymentMethod, input.paymentMethod === "cod" ? "cod" : "pending",
    ],
  );
  return { code: res.rows[0].code, accessKey, total };
}

type OrderRow = {
  code: string; access_key: string; customer_name: string; phone: string; email: string | null;
  address: string; city: string; state: string; pincode: string; items: OrderItem[];
  subtotal: number; shipping: number; total: number; payment_method: PaymentMethod;
  payment_status: string; utr: string | null; created_at: Date | string;
};

export async function getOrder(code: string, accessKey: string): Promise<Order | null> {
  const db = await getDb();
  const { rows } = await db.query<OrderRow>(
    "SELECT * FROM orders WHERE code = $1 AND access_key = $2",
    [code, accessKey],
  );
  const r = rows[0];
  if (!r) return null;
  return {
    code: r.code, accessKey: r.access_key, customerName: r.customer_name, phone: r.phone,
    email: r.email, address: r.address, city: r.city, state: r.state, pincode: r.pincode,
    items: typeof r.items === "string" ? JSON.parse(r.items) : r.items,
    subtotal: r.subtotal, shipping: r.shipping, total: r.total,
    paymentMethod: r.payment_method, paymentStatus: r.payment_status, utr: r.utr,
    createdAt: new Date(r.created_at).toISOString(),
  };
}

export async function submitUtr(code: string, accessKey: string, utr: string) {
  const db = await getDb();
  const { rows } = await db.query<{ code: string }>(
    `UPDATE orders SET utr = $3, payment_status = 'submitted', updated_at = now()
     WHERE code = $1 AND access_key = $2 AND payment_method = 'upi'
     RETURNING code`,
    [code, accessKey, utr],
  );
  return rows.length > 0;
}

export async function addSubscriber(email: string) {
  const db = await getDb();
  await db.query("INSERT INTO subscribers (email) VALUES ($1) ON CONFLICT (email) DO NOTHING", [email]);
}

type TrackRow = {
  code: string; phone: string; status: string; payment_method: "upi" | "cod"; payment_status: string;
  total: number; items: OrderItem[] | string; city: string; pincode: string; created_at: Date | string;
  updated_at: Date | string; confirmed_at: Date | string | null; shipped_at: Date | string | null;
  delivered_at: Date | string | null; courier: string | null; tracking_number: string | null;
  tracking_url: string | null;
};

const iso = (d: Date | string | null) => (d ? new Date(d).toISOString() : null);

/** Order status for the public tracking page. The phone number must match the order. */
export async function trackOrder(code: string, phone: string): Promise<TrackInfo | null> {
  const db = await getDb();
  const { rows } = await db.query<TrackRow>("SELECT * FROM orders WHERE code = $1", [code]);
  const r = rows[0];
  if (!r || r.phone.slice(-10) !== phone.slice(-10)) return null;
  const items: OrderItem[] = typeof r.items === "string" ? JSON.parse(r.items) : r.items;
  return {
    code: r.code,
    status: r.status as TrackInfo["status"],
    paymentMethod: r.payment_method,
    paymentStatus: r.payment_status,
    total: r.total,
    items: items.map((i) => ({ name: i.name, size: i.size, qty: i.qty })),
    city: r.city,
    pincode: r.pincode,
    placedAt: iso(r.created_at)!,
    confirmedAt: iso(r.confirmed_at),
    shippedAt: iso(r.shipped_at),
    deliveredAt: iso(r.delivered_at),
    updatedAt: iso(r.updated_at)!,
    courier: r.courier,
    trackingNumber: r.tracking_number,
    trackingUrl: courierLink(r.courier, r.tracking_number, r.tracking_url),
  };
}
