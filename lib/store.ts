// Store settings shared by the browser and the server.

export const STORE = {
  name: "Soft Snuggle",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999",
  shippingFlat: Number(process.env.NEXT_PUBLIC_SHIPPING_FLAT ?? 79),
  freeShippingAbove: Number(process.env.NEXT_PUBLIC_FREE_SHIPPING_ABOVE ?? 1499),
  instagram: "https://instagram.com/",
  email: "hello@softsnuggle.in",
};

export const AGE_GROUPS = [
  { slug: "newborn", title: "Newborn", range: "0–3 months", tint: "#DFE7DD", sizes: ["0–3M"] },
  { slug: "little-one", title: "Little One", range: "3–6 months", tint: "#F3D8C8", sizes: ["3–6M"] },
  { slug: "on-the-move", title: "On the Move", range: "6–12 months", tint: "#DCE6EE", sizes: ["6–12M"] },
  { slug: "tiny-toddler", title: "Tiny Toddler", range: "1–3 years", tint: "#F1E7BC", sizes: ["12–18M", "18–24M", "2–3Y"] },
] as const;

export const CATEGORY_LABELS = {
  bodysuit: "Bodysuits",
  romper: "Rompers",
  "gift-set": "Gift Sets",
} as const;

export function shippingFor(subtotal: number) {
  if (subtotal === 0 || subtotal >= STORE.freeShippingAbove) return 0;
  return STORE.shippingFlat;
}

export function inr(amount: number) {
  return "₹" + amount.toLocaleString("en-IN");
}
