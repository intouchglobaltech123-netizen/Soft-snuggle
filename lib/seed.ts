import { AGE_GROUPS } from "./store";
import type { Category } from "./types";

interface SeedProduct {
  slug: string;
  name: string;
  category: Category;
  fabric: string;
  colour: string;
  price: number;
  compareAt?: number;
  badge?: string;
  organic: boolean;
  sizes: string[];
  ageGroups: string[];
  description: string;
  care: string;
  tint: string;
  garment: string;
}

// Matches the Frock / Jabla size charts (components/shop/SizeChart.tsx)
const BODYSUIT_SIZES = ["0–3M", "3–6M", "6–9M", "9–12M"];
const ROMPER_SIZES = ["3–6M", "6–9M", "9–12M"];
const CHART_SIZES = ["0–3M", "3–6M", "6–9M", "9–12M"];
const SET_SIZES = ["0–3M", "3–6M"];
const CARE = "Machine wash cold, inside out, with similar colours. Tumble dry low. No bleach, no fuss.";

function groupsFor(sizes: string[]) {
  return AGE_GROUPS.filter((g) => g.sizes.some((s) => sizes.includes(s))).map((g) => g.slug);
}

// Placeholder catalogue taken from the Soft Snuggle PDF. Sizes and copy are
// stand-ins until the client sends the real product sheet.
const RAW: Omit<SeedProduct, "ageGroups">[] = [
  // Real Soft Snuggle pieces (photos in public/products/<slug>). Prices are placeholders.
  {
    slug: "cherry-frock",
    name: "Cherry Bloom Frock",
    category: "frock",
    fabric: "50% bamboo, 50% cotton",
    colour: "Butter yellow, cherry print",
    price: 349,
    badge: "New",
    organic: false,
    sizes: CHART_SIZES,
    description:
      "A twirl-ready sleeveless frock in breathable muslin, scattered with little red cherries. Gathered waist, a comfy round neck and snap buttons at the back for quick, easy changes.",
    care: "Hand wash or gentle machine wash cold. Dry in shade. Do not bleach.",
    tint: "#F6EFD3",
    garment: "#F3EBC4",
  },
  {
    slug: "cherry-jabla",
    name: "Cherry Bloom Jabla",
    category: "jabla",
    fabric: "Soft muslin cotton",
    colour: "Butter yellow, cherry print",
    price: 449,
    badge: "New",
    organic: false,
    sizes: CHART_SIZES,
    description:
      "A classic sleeveless jabla in soft, breathable muslin with a sweet cherry print. Snap buttons all the way down the front make dressing a wriggly baby quick and easy.",
    care: "Hand wash or gentle machine wash cold. Dry in shade. Do not bleach.",
    tint: "#F3EBD6",
    garment: "#F3EBC4",
  },
  {
    slug: "day-pack",
    name: "The Day Pack",
    category: "gift-set",
    fabric: "3 dresses",
    colour: "Any 3 rainbow shades",
    price: 999,
    compareAt: 1047,
    badge: "Gift ready",
    organic: false,
    sizes: CHART_SIZES,
    description:
      "Three dresses in the rainbow shades of your choice, folded and tied with a cotton ribbon. Enough for the days when one outfit is never enough, and ready to give as it comes.",
    care: "Hand wash or gentle machine wash cold. Dry in shade. Do not bleach.",
    tint: "#F3E9DF",
    garment: "#F2D6CC",
  },
  {
    slug: "week-pack",
    name: "The Week Pack",
    category: "gift-set",
    fabric: "7 dresses",
    colour: "All 7 rainbow shades",
    price: 1999,
    compareAt: 2443,
    badge: "Best value",
    organic: false,
    sizes: CHART_SIZES,
    description:
      "All seven rainbow shades, one for every day of the week. Soft bamboo-cotton muslin throughout, boxed and ready to give. The easiest gift for a new arrival, and the easiest week of dressing you will have.",
    care: "Hand wash or gentle machine wash cold. Dry in shade. Do not bleach.",
    tint: "#E8E3EF",
    garment: "#C4A5D1",
  },
];

export const SEED_PRODUCTS: SeedProduct[] = RAW.map((p) => ({ ...p, ageGroups: groupsFor(p.sizes) }));
