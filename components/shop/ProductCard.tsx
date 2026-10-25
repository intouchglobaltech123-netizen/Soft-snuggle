"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { isStudioShot } from "@/lib/photo";
import { inr } from "@/lib/store";
import type { Product } from "@/lib/types";
import { Garment } from "../art/Garment";
import { useCart } from "../providers/CartProvider";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [picking, setPicking] = useState(false);
  const [front, back] = product.images;

  const addSize = (size: string) => {
    add({
      productId: product.id, slug: product.slug, name: product.name, category: product.category,
      price: product.price, size, colour: product.colours[0]?.name, qty: 1, tint: product.tint, garment: product.garment, image: front,
    });
    setPicking(false);
  };

  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-[24px]" style={{ background: product.tint }}>
        <Link href={`/product/${product.slug}`} className="relative block aspect-[4/5]" aria-label={product.name}>
          {front ? (
            <>
              <img
                src={front}
                alt={product.name}
                loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105 ${
                  isStudioShot(front) ? "mix-blend-multiply" : ""
                } ${back ? "group-hover:opacity-0" : ""}`}
              />
              {back && (
                <img
                  src={back}
                  alt=""
                  loading="lazy"
                  className={`absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-100 group-hover:opacity-100 ${
                    isStudioShot(back) ? "mix-blend-multiply" : ""
                  }`}
                />
              )}
            </>
          ) : (
            <>
              <div className="absolute inset-[12%] rounded-full bg-paper/40 blur-2xl" />
              <div className="relative grid h-full place-items-center transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-2 group-hover:rotate-[-4deg] group-hover:scale-105">
                <Garment category={product.category} color={product.garment} className="h-[76%] w-[76%]" />
              </div>
            </>
          )}
        </Link>

        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-paper/90 px-2.5 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.14em]">
            {product.badge}
          </span>
        )}

        <div
          className={`absolute inset-x-3 bottom-3 transition-all duration-300 ${
            picking ? "" : "[@media(hover:hover)]:translate-y-3 [@media(hover:hover)]:opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {picking ? (
              <motion.div
                key="sizes"
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 24, opacity: 0 }}
                className="glass-light rounded-2xl p-3"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-ink-soft">Pick a size</span>
                  <button onClick={() => setPicking(false)} className="text-xs font-bold" aria-label="Close sizes">
                    ✕
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => addSize(s)}
                      className="rounded-full border border-ink/15 bg-paper px-3 py-1.5 text-xs font-bold transition-colors hover:bg-ink hover:text-paper"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.button
                key="add"
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 24, opacity: 0 }}
                onClick={() => setPicking(true)}
                disabled={!product.inStock}
                className="w-full rounded-2xl bg-ink py-2.5 text-[13px] font-bold text-paper disabled:bg-ink/40"
              >
                {product.inStock ? "Add to bag +" : "Sold out"}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Link href={`/product/${product.slug}`} className="mt-3 block px-1">
        <h3 className="font-display text-lg leading-tight tracking-tight">{product.name}</h3>
        <p className="mt-0.5 text-[13px] text-ink-soft">
          {product.fabric} · {product.colour}
        </p>
        <p className="mt-1.5 font-bold">
          {inr(product.price)}
          {product.compareAt && <s className="ml-1.5 text-sm font-normal text-ink-soft">{inr(product.compareAt)}</s>}
        </p>
      </Link>
    </div>
  );
}
