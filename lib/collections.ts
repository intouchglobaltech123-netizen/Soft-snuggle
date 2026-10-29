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

// One slide per piece in the shop. Every productSlug here must exist in
// lib/seed.ts: a slide pointing at a retired piece sends shoppers to a missing
// page, which is how the demo catalogue used to break this hero.
//
// A photo at public/hero/<slug>.(png|webp) replaces the drawing for that slide.
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
    slug: "jabla",
    productSlug: "cherry-jabla",
    eyebrow: "New in",
    title: "Cherry",
    accent: "Jabla",
    label: "Cherry Bloom Jabla",
    blurb: "A sleeveless muslin jabla with snaps all the way down, for dressing a wriggly baby in seconds.",
    glow: "#F3EBD6",
    look: {
      skin: "#F3CDB0", hair: "#6B4A36", hairStyle: "tuft", outfit: "#F1E8DA",
      kind: "bodysuit", detail: "dots", accessory: "none", prop: "teddy",
    },
  },
  {
    slug: "lemon",
    productSlug: "lemon-frock",
    eyebrow: "New in",
    title: "Lemon",
    accent: "Grove",
    label: "Lemon Grove Frock",
    blurb: "Watercolour lemons across airy crinkled muslin, with snaps down the front and a skirt that swings.",
    glow: "#F7F3E0",
    look: {
      skin: "#E8BE9C", hair: "#3A2A1E", hairStyle: "curls", outfit: "#F6F1E2",
      kind: "bodysuit", detail: "flower", accessory: "bow", accessoryColor: "#F2DE9A", prop: "none",
    },
  },
  {
    slug: "zebra",
    productSlug: "zebra-jabla",
    eyebrow: "New in",
    title: "Zebra",
    accent: "Doodle",
    label: "Zebra Doodle Jabla",
    blurb: "One hand-drawn zebra on soft ivory muslin, tied at the back of the neck for easy changes.",
    glow: "#F1EDE5",
    look: {
      skin: "#D9A47F", hair: "#2F2420", hairStyle: "tuft", outfit: "#F6F3EC",
      kind: "bodysuit", detail: "dots", accessory: "none", prop: "star",
    },
  },
  {
    slug: "butterfly",
    productSlug: "butterfly-nappy",
    eyebrow: "New in",
    title: "Butterfly",
    accent: "Flutter",
    label: "Butterfly Flutter Nappy",
    blurb: "A tie-up muslin nappy scattered with butterflies and hearts, with long ties for a fit you set yourself.",
    glow: "#F6EFE6",
    look: {
      skin: "#F6D5BE", hair: "#B98955", hairStyle: "tuft", outfit: "#F7F3EA",
      kind: "bodysuit", detail: "flower", accessory: "bow", accessoryColor: "#E86A9B", prop: "none",
    },
  },
  {
    slug: "zebra-wrap",
    productSlug: "zebra-wrap-jabla",
    eyebrow: "New in",
    title: "Zebra",
    accent: "Wrap",
    label: "Zebra Wrap Jabla",
    blurb: "A crossover wrap jabla in white muslin with braided side ties, so nothing has to go over the head.",
    glow: "#F3F0EA",
    look: {
      skin: "#E8BE9C", hair: "#2F2420", hairStyle: "curls", outfit: "#FBFAF7",
      kind: "bodysuit", detail: "dots", accessory: "none", prop: "none",
    },
  },
  {
    slug: "day-pack",
    productSlug: "day-pack",
    eyebrow: "Gift ready",
    title: "Day",
    accent: "Pack",
    label: "The Day Pack",
    blurb: "Three pieces in the rainbow shades of your choice, tied with a ribbon and ready to give.",
    glow: "#F3E9DF",
    look: {
      skin: "#B97F5C", hair: "#24190F", hairStyle: "curls", outfit: "#C9D8C5",
      kind: "bodysuit", detail: "flower", accessory: "bow", accessoryColor: "#E6A99D", prop: "none",
    },
  },
  {
    slug: "week-pack",
    productSlug: "week-pack",
    eyebrow: "Best value",
    title: "Week",
    accent: "Pack",
    label: "The Week Pack",
    blurb: "All seven rainbow shades, one for every day of the week, boxed and ready to give.",
    glow: "#E8E3EF",
    look: {
      skin: "#C68E6B", hair: "#2F2420", hairStyle: "none", outfit: "#F4D9D6",
      kind: "bodysuit", detail: "dots", accessory: "bonnet", accessoryColor: "#CFDCCB", prop: "star",
    },
  },
];

export const lookFor = (slug: string) => (COLLECTIONS.find((c) => c.slug === slug) ?? COLLECTIONS[0]).look;

// The four shop-by-age cards. Kept separate from the slides above so that
// retiring a piece changes the hero without leaving every age card showing the
// same baby.
export const AGE_LOOKS: BabyLook[] = [
  {
      skin: "#F3CDB0", hair: "#6B4A36", hairStyle: "tuft", outfit: "#F1E8DA",
      kind: "bodysuit", detail: "dots", accessory: "none", prop: "teddy",
  },
  {
      skin: "#C68E6B", hair: "#2F2420", hairStyle: "none", outfit: "#F4D9D6",
      kind: "bodysuit", detail: "dots", accessory: "bonnet", accessoryColor: "#CFDCCB", prop: "star",
  },
  {
      skin: "#F6D5BE", hair: "#B98955", hairStyle: "none", outfit: "#CFDFEC",
      kind: "bodysuit", detail: "cloud", accessory: "bunny", accessoryColor: "#F7F1E8", prop: "star",
  },
  {
      skin: "#D9A47F", hair: "#2F2420", hairStyle: "curls", outfit: "#D9B994",
      kind: "romper", detail: "heart", accessory: "beanie", accessoryColor: "#B7CCBE", prop: "none",
  },
];
