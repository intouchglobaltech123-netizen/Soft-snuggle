"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useMemo, useState } from "react";
import { AGE_GROUPS } from "@/lib/store";
import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { ShopBanner } from "./ShopBanner";

const TABS = [
  { key: "all", label: "All" },
  { key: "bodysuit", label: "Bodysuits" },
  { key: "romper", label: "Rompers" },
  { key: "gift-set", label: "Gift Sets" },
  { key: "organic", label: "Organic Cotton" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

interface Props {
  products: Product[];
  initialTab?: string;
  initialAge?: string;
  showAgeFilter?: boolean;
  /** Large header that changes with the selected filter (shop page) */
  banner?: boolean;
}

export function ProductGrid({ products, initialTab, initialAge, showAgeFilter, banner }: Props) {
  const [tab, setTab] = useState<TabKey>(TABS.some((t) => t.key === initialTab) ? (initialTab as TabKey) : "all");
  const [age, setAge] = useState<string>(initialAge ?? "all");

  const visible = useMemo(
    () =>
      products.filter((p) => {
        const tabOk = tab === "all" || (tab === "organic" ? p.organic : p.category === tab);
        const ageOk = age === "all" || p.ageGroups.includes(age);
        return tabOk && ageOk;
      }),
    [products, tab, age],
  );

  return (
    <div>
      {banner && <ShopBanner tab={tab} age={age} />}
      <LayoutGroup id="tabs">
        <div className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 pb-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`relative shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
                tab === t.key ? "text-paper" : "text-ink-soft hover:text-ink"
              }`}
            >
              {tab === t.key && (
                <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
              )}
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
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              transition={{ type: "spring", stiffness: 140, damping: 20, delay: Math.min(i, 8) * 0.05 }}
            >
              <ProductCard product={p} />
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
