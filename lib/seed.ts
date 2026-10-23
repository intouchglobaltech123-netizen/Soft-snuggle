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
    fabric: "Soft muslin cotton",
    colour: "Butter yellow, cherry print",
    price: 699,
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
    slug: "everyday-bodysuit",
    name: "The Everyday Bodysuit",
    category: "bodysuit",
    fabric: "Organic cotton",
    colour: "Oat milk",
    price: 899,
    badge: "Bestseller",
    organic: true,
    sizes: BODYSUIT_SIZES,
    description:
      "The one you reach for first. Envelope shoulders for easy over-the-head changes, nickel-free snaps for quick nappy swaps, and cotton that gets softer every wash.",
    care: CARE,
    tint: "#E3EAE0",
    garment: "#F4EEE4",
  },
  {
    slug: "sunday-morning-romper",
    name: "Sunday Morning Romper",
    category: "romper",
    fabric: "Gentle cotton",
    colour: "Biscuit",
    price: 1290,
    badge: "New",
    organic: false,
    sizes: ROMPER_SIZES,
    description:
      "Made for slow mornings and pancake crumbs. A roomy, breezy romper with a full snap front, so dressing a wriggler takes seconds.",
    care: CARE,
    tint: "#F2E6DC",
    garment: "#D9B994",
  },
  {
    slug: "little-bloom-bodysuit",
    name: "Little Bloom Bodysuit",
    category: "bodysuit",
    fabric: "Organic cotton",
    colour: "Sage garden",
    price: 990,
    organic: true,
    sizes: BODYSUIT_SIZES,
    description:
      "A tiny garden of embroidered blooms on breathable organic cotton. Flat seams and tagless necks, so nothing scratches.",
    care: CARE,
    tint: "#E0E9E3",
    garment: "#C9D8C5",
  },
  {
    slug: "welcome-home-set",
    name: "The Welcome Home Set",
    category: "gift-set",
    fabric: "3 pieces",
    colour: "Fern & oat",
    price: 2490,
    badge: "Gift ready",
    organic: true,
    sizes: SET_SIZES,
    description:
      "Everything for the first ride home: a bodysuit, a knotted bonnet and a soft swaddle blanket, tucked into a keepsake box with a handwritten note.",
    care: CARE,
    tint: "#E3EAE0",
    garment: "#CFDCCB",
  },
  {
    slug: "dreamy-days-bodysuit",
    name: "Dreamy Days Bodysuit",
    category: "bodysuit",
    fabric: "Organic cotton",
    colour: "Petal",
    price: 899,
    organic: true,
    sizes: BODYSUIT_SIZES,
    description:
      "A blush-soft favourite for naps, cuddles and everything in between. Long enough in the body for growing legs and big stretches.",
    care: CARE,
    tint: "#F3E5E4",
    garment: "#F4D9D6",
  },
  {
    slug: "wiggler-romper",
    name: "The Wiggler Romper",
    category: "romper",
    fabric: "Soft jersey",
    colour: "Eucalyptus",
    price: 1390,
    organic: false,
    sizes: ROMPER_SIZES,
    description:
      "Stretchy jersey that keeps up with crawlers, cruisers and first-steppers. Knee panels are reinforced for all the adventures.",
    care: CARE,
    tint: "#E6EDE6",
    garment: "#B7CCBE",
  },
  {
    slug: "cloud-nine-bodysuit",
    name: "Cloud Nine Bodysuit",
    category: "bodysuit",
    fabric: "Organic cotton",
    colour: "Morning sky",
    price: 990,
    organic: true,
    sizes: BODYSUIT_SIZES,
    description:
      "A soft sky-blue bodysuit with little cloud embroidery. It feels as light as it looks.",
    care: CARE,
    tint: "#E2EAF1",
    garment: "#CFDFEC",
  },
  {
    slug: "little-something-set",
    name: "A Little Something Set",
    category: "gift-set",
    fabric: "3 pieces",
    colour: "Petal & oat",
    price: 2290,
    badge: "Perfect present",
    organic: true,
    sizes: SET_SIZES,
    description:
      "A sweet hello for a new arrival: a bodysuit, a pair of footed pants and a matching hat, ribbon-wrapped and ready to give.",
    care: CARE,
    tint: "#F3E9DF",
    garment: "#F2D6CC",
  },
];

export const SEED_PRODUCTS: SeedProduct[] = RAW.map((p) => ({ ...p, ageGroups: groupsFor(p.sizes) }));
