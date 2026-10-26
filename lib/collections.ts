import type { BabyLook } from "@/components/art/Baby";

export interface Collection {
  slug: string;
  productSlug: string;
  eyebrow: string;
  title: string;
  accent: string;
  label: string;
  blurb: string;
  glow: string;
  look: BabyLook;
}

// One character per hero slide. Swap `look` for a 3D render later.
// A photo in public/hero/<slug>.(png|webp) replaces the illustration for that slide.
export const COLLECTIONS: Collection[] = [
  {
    // Shown with the real photo in public/hero/cherry.webp. The look below is
    // only the fallback if that photo is ever removed.
    slug: "cherry",
    productSlug: "cherry-frock",
    eyebrow: "New in",
    title: "Cherry",
    accent: "Bloom",
    label: "Cherry Bloom Frock",
    blurb: "A twirl-ready muslin frock scattered with little red cherries, with snaps down the front.",
    glow: "#F6E6CC",
    look: {
      skin: "#B97F5C", hair: "#24190F", hairStyle: "curls", outfit: "#F6E7C8",
      kind: "bodysuit", detail: "heart", accessory: "bow", accessoryColor: "#F2B8B0", prop: "none",
    },
  },
  {
    slug: "everyday",
    productSlug: "everyday-bodysuit",
    eyebrow: "Bestseller",
    title: "Everyday",
    accent: "Edit",
    label: "Everyday Bodysuit",
    blurb: "Envelope shoulders, nickel-free snaps and organic cotton that gets softer every wash.",
    glow: "#DFE7DD",
    look: {
      skin: "#F3CDB0", hair: "#6B4A36", hairStyle: "tuft", outfit: "#F1E8DA",
      kind: "bodysuit", detail: "dots", accessory: "none", prop: "teddy",
    },
  },
  {
    slug: "sunday",
    productSlug: "sunday-morning-romper",
    eyebrow: "New in",
    title: "Sunday",
    accent: "Mornings",
    label: "Sunday Romper",
    blurb: "A roomy, breezy romper with a full snap front for slow mornings and pancake crumbs.",
    glow: "#F3D8C8",
    look: {
      skin: "#D9A47F", hair: "#2F2420", hairStyle: "curls", outfit: "#D9B994",
      kind: "romper", detail: "heart", accessory: "beanie", accessoryColor: "#B7CCBE", prop: "none",
    },
  },
  {
    slug: "bloom",
    productSlug: "little-bloom-bodysuit",
    eyebrow: "Organic cotton",
    title: "Little",
    accent: "Bloom",
    label: "Little Bloom",
    blurb: "A tiny garden of embroidered blooms, with flat seams and tagless necks so nothing scratches.",
    glow: "#E6EDE1",
    look: {
      skin: "#B97F5C", hair: "#24190F", hairStyle: "curls", outfit: "#C9D8C5",
      kind: "bodysuit", detail: "flower", accessory: "bow", accessoryColor: "#E6A99D", prop: "none",
    },
  },
  {
    slug: "cloud",
    productSlug: "cloud-nine-bodysuit",
    eyebrow: "Dreamy & light",
    title: "Cloud",
    accent: "Nine",
    label: "Cloud Nine",
    blurb: "Sky-blue organic cotton with little cloud embroidery. It feels as light as it looks.",
    glow: "#DCE6EE",
    look: {
      skin: "#F6D5BE", hair: "#B98955", hairStyle: "none", outfit: "#CFDFEC",
      kind: "bodysuit", detail: "cloud", accessory: "bunny", accessoryColor: "#F7F1E8", prop: "star",
    },
  },
  {
    slug: "wiggler",
    productSlug: "wiggler-romper",
    eyebrow: "For crawlers",
    title: "The",
    accent: "Wiggler",
    label: "Wiggler Romper",
    blurb: "Stretchy jersey that keeps up with crawlers, cruisers and brave first steps.",
    glow: "#F1E7BC",
    look: {
      skin: "#E8B996", hair: "#4A3121", hairStyle: "tuft", outfit: "#B7CCBE",
      kind: "romper", detail: "star", accessory: "none", prop: "teddy",
    },
  },
  {
    slug: "welcome",
    productSlug: "welcome-home-set",
    eyebrow: "Gift ready",
    title: "Welcome",
    accent: "Home",
    label: "Welcome Home Set",
    blurb: "A bodysuit, knotted bonnet and swaddle in a keepsake box, ready for the first ride home.",
    glow: "#F3E5E4",
    look: {
      skin: "#C68E6B", hair: "#2F2420", hairStyle: "none", outfit: "#F4D9D6",
      kind: "bodysuit", detail: "dots", accessory: "bonnet", accessoryColor: "#CFDCCB", prop: "star",
    },
  },
];

/** A character's look by collection slug, so other sections don't depend on slide order. */
export const lookFor = (slug: string) => (COLLECTIONS.find((c) => c.slug === slug) ?? COLLECTIONS[0]).look;
