"use client";

import { AnimatePresence, motion } from "motion/react";
import { AGE_GROUPS, STORE, inr } from "@/lib/store";
import type { Category } from "@/lib/types";
import { Garment } from "../art/Garment";
import { FlowerMark } from "../art/FlowerMark";

const BANNERS: Record<string, { eyebrow: string; title: string; accent: string; body: string; tint: string; perks: string[]; art: { category: Category; color: string }[] }> = {
  all: {
    eyebrow: "The whole collection",
    title: "All the",
    accent: "little things",
    body: "Bodysuits, rompers and gift sets for every new chapter.",
    tint: "#DFE7DD",
    perks: ["Soft cotton", `Free shipping over ${inr(STORE.freeShippingAbove)}`, "Cash on Delivery"],
    art: [
      { category: "bodysuit", color: "#F4EEE4" },
      { category: "romper", color: "#D9B994" },
      { category: "gift-set", color: "#F2D6CC" },
    ],
  },
  bodysuit: {
    eyebrow: "Everyday essentials",
    title: "Easy-snap",
    accent: "bodysuits",
    body: "Envelope shoulders and nickel-free snaps for the many, many changes.",
    tint: "#E3EAE0",
    perks: ["Envelope neck", "Tagless", "Organic options"],
    art: [
      { category: "bodysuit", color: "#CFDFEC" },
      { category: "bodysuit", color: "#F4EEE4" },
      { category: "bodysuit", color: "#F4D9D6" },
    ],
  },
  romper: {
    eyebrow: "For wigglers",
    title: "Rompers that",
    accent: "keep up",
    body: "Stretchy, breezy one-pieces for crawling, cruising and first steps.",
    tint: "#F3E2D6",
    perks: ["Full snap front", "Stretch jersey", "Room to grow"],
    art: [
      { category: "romper", color: "#B7CCBE" },
      { category: "romper", color: "#D9B994" },
      { category: "romper", color: "#F4D9D6" },
    ],
  },
  "gift-set": {
    eyebrow: "Wrapped with love",
    title: "Gifts, ready",
    accent: "to give",
    body: "Keepsake-boxed sets for baby showers, first visits and welcome-home days.",
    tint: "#F3E5E4",
    perks: ["Keepsake box", "Handwritten note", "Ribbon-wrapped"],
    art: [
      { category: "gift-set", color: "#CFDCCB" },
      { category: "gift-set", color: "#F2D6CC" },
      { category: "gift-set", color: "#F1E7BC" },
    ],
  },
  organic: {
    eyebrow: "Kind to tiny skin",
    title: "Organic",
    accent: "cotton",
    body: "Certified organic cotton that breathes, and only gets softer with every wash.",
    tint: "#E6EDE1",
    perks: ["Breathable", "No harsh dyes", "Softer every wash"],
    art: [
      { category: "bodysuit", color: "#C9D8C5" },
      { category: "gift-set", color: "#CFDCCB" },
      { category: "bodysuit", color: "#F4EEE4" },
    ],
  },
};

export function ShopBanner({ tab, age }: { tab: string; age: string }) {
  const b = BANNERS[tab] ?? BANNERS.all;
  const group = AGE_GROUPS.find((g) => g.slug === age);
  const key = `${tab}-${age}`;

  return (
    <motion.div
      className="relative mb-10 overflow-hidden rounded-[36px] px-7 py-10 sm:px-12 sm:py-14"
      animate={{ backgroundColor: group?.tint ?? b.tint }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="pointer-events-none absolute -right-10 -top-10 opacity-40"
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        <FlowerMark className="h-56 w-56" petal="#FDFBF6" center="#FDFBF6" />
      </motion.div>

      <div className="relative grid items-center gap-8 md:grid-cols-[1.2fr_1fr]">
        <AnimatePresence mode="wait">
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow">{group ? group.range : b.eyebrow}</p>
            <h1 className="mt-3 font-display text-5xl leading-[0.98] tracking-tight sm:text-6xl">
              {group ? (
                <>
                  For your <em className="text-sage-deep">{group.title.toLowerCase()}</em>
                </>
              ) : (
                <>
                  {b.title} <em className="text-sage-deep">{b.accent}</em>
                </>
              )}
            </h1>
            <p className="mt-4 max-w-md text-ink-soft">{b.body}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {b.perks.map((p) => (
                <span key={p} className="rounded-full bg-paper/80 px-3.5 py-1.5 text-xs font-bold">
                  ✿ {p}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="relative hidden h-56 md:block">
          <AnimatePresence mode="popLayout">
            {b.art.map((a, i) => (
              <motion.div
                key={`${tab}-${i}`}
                className="absolute top-1/2 w-[36%]"
                style={{ left: `${i * 31}%` }}
                initial={{ opacity: 0, y: 40, rotate: 0 }}
                animate={{ opacity: 1, y: "-50%", rotate: (i - 1) * 8 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 120, damping: 14 }}
              >
                <div className="anim-float" style={{ animationDelay: `${i * 0.6}s` }}>
                  <Garment category={a.category} color={a.color} className="w-full" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
