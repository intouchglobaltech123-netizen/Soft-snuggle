"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { inr } from "@/lib/store";
import { ProductThumb } from "../shop/ProductThumb";

/** One product: sell it or not, and which sizes are sold out. Saves on every tap. */
export function StockRow({ product }: { product: Product }) {
  const router = useRouter();
  const [inStock, setInStock] = useState(product.inStock);
  const [soldOut, setSoldOut] = useState(product.soldOutSizes);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const save = async (change: { inStock?: boolean; soldOutSizes?: string[] }) => {
    const before = { inStock, soldOut };
    // Show the change straight away and put it back if the server says no.
    if (change.inStock !== undefined) setInStock(change.inStock);
    if (change.soldOutSizes) setSoldOut(change.soldOutSizes);
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(change),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error ?? "That didn't save.");
      router.refresh();
    } catch (err) {
      setInStock(before.inStock);
      setSoldOut(before.soldOut);
      setError(err instanceof Error ? err.message : "That didn't save.");
    } finally {
      setSaving(false);
    }
  };

  const toggleSize = (s: string) =>
    save({ soldOutSizes: soldOut.includes(s) ? soldOut.filter((x) => x !== s) : [...soldOut, s] });

  const allSizesGone = product.sizes.every((s) => soldOut.includes(s));

  return (
    <li className={`flex flex-wrap items-center gap-4 px-5 py-4 ${inStock ? "" : "bg-cream/70"}`}>
      <div className="h-16 w-14 shrink-0 overflow-hidden rounded-xl" style={{ background: product.tint }}>
        <ProductThumb image={product.images[0]} category={product.category} garment={product.garment} className="h-full w-full p-1.5" />
      </div>

      <div className="min-w-0 flex-1 basis-48">
        <a href={`/product/${product.slug}`} target="_blank" rel="noreferrer" className="font-bold hover:underline">{product.name}</a>
        <p className="text-sm text-ink-soft">{inr(product.price)} · {product.colour}</p>
        {error && <p role="alert" className="mt-1 text-sm font-bold text-[#a0573f]">{error}</p>}
      </div>

      <div className="flex flex-wrap gap-1.5" aria-label="Sizes: tap to mark sold out">
        {product.sizes.map((s) => {
          const gone = soldOut.includes(s);
          return (
            <button
              key={s}
              disabled={saving || !inStock}
              onClick={() => toggleSize(s)}
              aria-pressed={!gone}
              title={gone ? "Sold out: tap to put back" : "In stock: tap to mark sold out"}
              className={`rounded-full border px-3 py-1.5 text-xs font-bold transition-colors disabled:opacity-50 ${
                gone ? "border-line bg-cream text-ink-soft line-through" : "border-sage-deep bg-sage"
              }`}
            >
              {s}
            </button>
          );
        })}
      </div>

      <button
        disabled={saving}
        onClick={() => save({ inStock: !inStock })}
        className={`w-32 rounded-full px-4 py-2 text-sm font-bold transition-colors disabled:opacity-60 ${
          inStock && !allSizesGone ? "bg-ink text-paper" : "border border-line bg-paper text-ink-soft"
        }`}
      >
        {inStock ? (allSizesGone ? "All sizes out" : "On sale") : "Sold out"}
      </button>
    </li>
  );
}
