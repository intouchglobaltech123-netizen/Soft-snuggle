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
    slug: "lemon-frock",
    name: "Lemon Grove Frock",
    category: "frock",
    fabric: "50% bamboo, 50% cotton",
    colour: "Ivory, lemon print",
    price: 349,
    badge: "New",
    organic: false,
    sizes: CHART_SIZES,
    description:
      "A sleeveless frock in airy crinkled muslin, printed all over with watercolour lemons. Snaps run the whole way down the front, and a gathered waist gives the skirt its swing.",
    care: "Hand wash or gentle machine wash cold. Dry in shade. Do not bleach.",
    tint: "#F7F3E0",
    garment: "#F6F1E2",
  },
  {
    slug: "zebra-jabla",
    name: "Zebra Doodle Jabla",
    category: "jabla",
    fabric: "50% bamboo, 50% cotton",
    colour: "Ivory, zebra doodle",
    price: 449,
    badge: "New",
    organic: false,
    sizes: CHART_SIZES,
    description:
      "A sleeveless jabla in soft crinkled muslin, ivory all over with one hand-drawn zebra on the front. It ties at the back of the neck, so it goes on and comes off without pulling anything over a small head.",
    care: "Hand wash or gentle machine wash cold. Dry in shade. Do not bleach.",
    tint: "#F1EDE5",
    garment: "#F6F3EC",
  },
  {
    slug: "butterfly-nappy",
    name: "Butterfly Flutter Nappy",
    category: "nappy",
    fabric: "50% bamboo, 50% cotton",
    colour: "Ivory, butterfly print",
    price: 199,
    badge: "New",
    organic: false,
    sizes: CHART_SIZES,
    description:
      "A tie-up muslin nappy, printed with little butterflies and hearts. Long side ties let you set the fit exactly where it is comfortable, and the open shape dries quickly after a wash.",
    care: "Hand wash or gentle machine wash cold. Dry in shade. Do not bleach.",
    tint: "#F6EFE6",
    garment: "#F7F3EA",
  },
  {
    slug: "zebra-wrap-jabla",
    name: "Zebra Wrap Jabla",
    category: "jabla",
    fabric: "50% bamboo, 50% cotton",
    colour: "White, zebra motif",
    price: 449,
    badge: "New",
    organic: false,
    sizes: CHART_SIZES,
    description:
      "A crossover wrap jabla in soft white muslin, with one hand-drawn zebra on the front and braided cord ties at the side. Nothing goes over the head, which makes it the easiest thing to put on a newborn.",
    care: "Hand wash or gentle machine wash cold. Dry in shade. Do not bleach.",
    tint: "#F3F0EA",
    garment: "#FBFAF7",
  },
  {
    slug: "moonbeam-set",
    name: "Moonbeam Night Set",
    category: "set",
    fabric: "50% bamboo, 50% cotton",
    colour: "White, blue moon print",
    price: 599,
    badge: "New",
    organic: false,
    sizes: CHART_SIZES,
    description:
      "A two-piece set in airy crinkled muslin, printed with little blue crescent moons. The short-sleeved top buttons down the front and the pyjamas have a soft covered waist, so nothing digs in on a warm night.",
    care: "Hand wash or gentle machine wash cold. Dry in shade. Do not bleach.",
    tint: "#EAF0F7",
    garment: "#F8FAFC",
  },
  {
    slug: "peaks-frock",
    name: "Tiny Peaks Frock",
    category: "frock",
    fabric: "50% bamboo, 50% cotton",
    colour: "White, brown and tan triangles",
    price: 349,
    badge: "New",
    organic: false,
    sizes: CHART_SIZES,
    description:
      "A white muslin frock scattered with little brown and tan triangles, stacked like tiny hills. Flutter sleeves over the shoulders, buttons the whole way down the front and a gathered waist that gives the skirt its swing.",
    care: "Hand wash or gentle machine wash cold. Dry in shade. Do not bleach.",
    tint: "#F4EFE6",
    garment: "#FBF9F4",
  },
  {
    slug: "reef-jabla",
    name: "Little Reef Jabla",
    category: "jabla",
    fabric: "50% bamboo, 50% cotton",
    colour: "White, sea creature print",
    price: 349,
    badge: "New",
    organic: false,
    sizes: CHART_SIZES,
    description:
      "A strappy muslin top printed with turtles, starfish, stripy fish and a smiling stingray. The shoulder straps tie, so the length grows with the baby and nothing has to go over the head on a hot day.",
    care: "Hand wash or gentle machine wash cold. Dry in shade. Do not bleach.",
    tint: "#EFEBF4",
    garment: "#FBFAF8",
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
