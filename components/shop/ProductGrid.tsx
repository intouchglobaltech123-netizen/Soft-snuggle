"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useMemo, useState } from "react";
import { AGE_GROUPS } from "@/lib/store";
import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { ShopBanner } from "./ShopBanner";
import { FlowerMark } from "../art/FlowerMark";

const TABS = [
  { key: "all", label: "All" },
  { key: "frock", label: "Frocks" },
  { key: "jabla", label: "Jablas" },
  { key: "nappy", label: "Nappies" },
  { key: "set", label: "Sets" },
  { key: "gift-set", label: "Gift Sets" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

interface Props {
  products: Product[];
  initialTab?: string;
  initialAge?: string;
  showAgeFilter?: boolean;
  /** Background-free garment cut-outs for the banner, keyed by product slug. */
  cutouts?: Record<string, string>;
  /** Large header that changes with the selected filter (shop page) */
  banner?: boolean;
}

export function ProductGrid({ products, initialTab, initialAge, showAgeFilter, banner, cutouts = {} }: Props) {
  const [tab, setTab] = useState<TabKey>(TABS.some((t) => t.key === initialTab) ? (initialTab as TabKey) : "all");
  const [age, setAge] = useState<string>(initialAge ?? "all");

  const visible = useMemo(() => {
    const matching = products.filter((p) => {
      const tabOk = tab === "all" || p.category === tab;
      const ageOk = age === "all" || p.ageGroups.includes(age);
      return tabOk && ageOk;
    });
    // Single pieces first, gift packs after them, so the packs fall together on
    // their own row instead of being scattered among the clothes.
    const isPack = (p: Product) => Number(p.category === "gift-set");
    return [...matching].sort((a, b) => isPack(a) - isPack(b));
  }, [products, tab, age]);

  // A photo for each filter, taken from the first piece in it that has one.
  const tabPhoto = useMemo(() => {
    const pick = (key: TabKey) =>
      products.find((p) => (key === "all" || p.category === key) && p.images[0])?.images[0];
    return Object.fromEntries(TABS.map((t) => [t.key, pick(t.key)])) as Record<TabKey, string | undefined>;
  }, [products]);

  // Three real garments for the banner, as cut-outs so they float on the tint
  // rather than sitting on their photo backdrop. Gift sets are left out: the
  // banner wants clothes, not a box. A piece whose cut-out failed has no file
  // and is simply skipped.
  const bannerPhotos = useMemo(
    () =>
      products
        .filter((p) => p.category !== "gift-set" && cutouts[p.slug])
        .filter((p) => tab === "all" || tab === "gift-set" || p.category === tab)
        .slice(0, 3)
        .map((p) => cutouts[p.slug]),
    [products, tab, cutouts],
  );

  return (
    <div>
      {banner && <ShopBanner tab={tab} age={age} photos={bannerPhotos} />}
      <LayoutGroup id="tabs">
        <div className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 pb-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`relative flex shrink-0 items-center gap-2 rounded-full py-1.5 pl-1.5 pr-5 text-sm font-bold transition-colors ${
                tab === t.key ? "text-paper" : "text-ink-soft hover:text-ink"
              }`}
            >
              {tab === t.key && (
                <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
              )}
              <span className="relative grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-full bg-cream">
                {tabPhoto[t.key] ? (
                  <img src={tabPhoto[t.key]} alt="" className="h-full w-full object-cover" loading="lazy" />
                ) : (
                  <FlowerMark className="h-4 w-4" />
                )}
              </span>
              <span className="relative">{t.label}</span>
            </button>
          ))}
        </div>
      </LayoutGroup>

      {showAgeFilter && (
        <div className="no-scrollbar -mx-6 mt-3 flex gap-2 overflow-x-auto px-6 pb-2">
          {[{ slug: "all", title: "All ages", tint: "#FDFBF6" }, ...AGE_GROUPS].map((g) => (
            <button
              key={g.slug}
              onClick={() => setAge(g.slug)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition-all ${
                age === g.slug ? "border-ink shadow-[inset_0_0_0_1px_var(--color-ink)]" : "border-line"
              }`}
              style={{ background: g.tint }}
            >
              {g.title}
            </button>
          ))}
        </div>
      )}

      <motion.div layout className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <motion.div
              key={p.id}
              layout
              className={p.category === "gift-set" ? "col-span-2" : ""}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              transition={{ type: "spring", stiffness: 140, damping: 20, delay: Math.min(i, 8) * 0.05 }}
            >
              <ProductCard product={p} wide={p.category === "gift-set"} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <p className="py-20 text-center font-display text-2xl text-ink-soft">Nothing here yet. New little things are on the way!</p>
      )}
    </div>
  );
}
