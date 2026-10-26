import type { ColourOption, Product } from "./types";

// Colour choices shown as round swatches on every product page.
//
// RAINBOW is the seven-colour set, kept in rainbow order so the swatches read
// left to right as a rainbow. Add `image` (a path under /public) to any colour
// and picking it switches the main photo, e.g.
//   { name: "Cherry Red", hex: "#DE6B63", image: "/products/cherry-frock/1-red.webp" }
//
// OVERRIDES gives one product (by slug) its own list instead of the seven.
//
// Colour names are stored with every cart item and past order, so renaming one
// changes what old orders read. Add and remove freely; rename sparingly.

const RAINBOW: ColourOption[] = [
  { name: "Cherry Red", hex: "#DE6B63" },
  { name: "Apricot Orange", hex: "#F2A86B" },
  { name: "Butter Yellow", hex: "#F3E3A3" },
  { name: "Leaf Green", hex: "#A8C9A0" },
  { name: "Sky Blue", hex: "#9FC4E0" },
  { name: "Periwinkle Indigo", hex: "#8E96C9" },
  { name: "Lilac Violet", hex: "#C4A5D1" },
];

const OVERRIDES: Record<string, ColourOption[]> = {
  // "cherry-jabla": [
  //   { name: "Butter Yellow", hex: "#F3E3A3", image: "/products/cherry-jabla/1-front.webp" },
  //   { name: "Cherry Red", hex: "#DE6B63", image: "/products/cherry-jabla/1-red.webp" },
  // ],
};

// Only the dresses are sold by colour. A gift pack already says which shades
// it contains, and offering a single colour for a box of several would be a
// promise the pack cannot keep, so those get no swatches at all. Anything else
// opts in through OVERRIDES.
const COLOURED_CATEGORIES: Product["category"][] = ["frock"];

export function coloursFor(p: Pick<Product, "slug" | "colour" | "garment" | "category">): ColourOption[] {
  if (OVERRIDES[p.slug]) return OVERRIDES[p.slug];
  return COLOURED_CATEGORIES.includes(p.category) ? RAINBOW : [];
}

/** The swatch a product opens on: its own colour when that is one of the seven. */
export function defaultColour(p: Pick<Product, "colour">, colours: ColourOption[]): ColourOption {
  const own = p.colour.toLowerCase();
  return colours.find((c) => own.startsWith(c.name.toLowerCase())) ?? colours[0];
}
