import type { ColourOption, Product } from "./types";

// Colour choices shown as round swatches on every product page.
//
// EDIT THIS FILE to match the colours you really stock:
//   * OVERRIDES lists the exact colours for one product (by slug). Add `image`
//     (a path under /public) to switch the main photo when that colour is picked.
//   * Any product without an override gets its own colour first, then 3 from FALLBACK.
// Colour names are saved with the cart item and the order, so keep them stable.

const FALLBACK: ColourOption[] = [
  { name: "Butter Yellow", hex: "#F3E3A3" },
  { name: "Blush Pink", hex: "#F4C6C6" },
  { name: "Sky Blue", hex: "#BDD7EA" },
  { name: "Sage Green", hex: "#C3D7BE" },
];

const OVERRIDES: Record<string, ColourOption[]> = {
  // "cherry-jabla": [
  //   { name: "Butter Yellow", hex: "#F3E3A3", image: "/products/cherry-jabla/1-front.webp" },
  //   { name: "Blush Pink", hex: "#F4C6C6" },
  // ],
};

const titleCase = (s: string) => s.replace(/\b\w/g, (c) => c.toUpperCase());

export function coloursFor(p: Pick<Product, "slug" | "colour" | "garment">): ColourOption[] {
  if (OVERRIDES[p.slug]) return OVERRIDES[p.slug];
  const own: ColourOption = { name: titleCase(p.colour.split(",")[0].trim()), hex: p.garment };
  return [own, ...FALLBACK.filter((c) => c.name.toLowerCase() !== own.name.toLowerCase())].slice(0, 4);
}
