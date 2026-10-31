import { StockRow } from "@/components/admin/StockRow";
import { requireAdmin } from "@/lib/admin";
import { getProducts } from "@/lib/queries";

export const metadata = { title: "Stock" };

export default async function Stock() {
  await requireAdmin();
  const products = await getProducts();
  const off = products.filter((p) => !p.inStock).length;
  const sizesOut = products.reduce((n, p) => n + (p.inStock ? p.soldOutSizes.filter((s) => p.sizes.includes(s)).length : 0), 0);

  return (
    <div>
      <p className="eyebrow">Stock</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">What&apos;s on sale</h1>
      <p className="mt-2 max-w-2xl text-ink-soft">
        Tap a size to mark it sold out (it shows crossed out in the shop and can&apos;t be ordered); tap again to put it back.
        “On sale” takes the whole piece off or puts it back. Changes are live straight away.
      </p>
      <p className="mt-3 text-sm font-bold">
        {products.length} pieces · {off} sold out · {sizesOut} {sizesOut === 1 ? "size" : "sizes"} sold out
      </p>

      <ul className="mt-6 divide-y divide-line overflow-hidden rounded-[24px] border border-line bg-paper">
        {products.map((p) => <StockRow key={p.id} product={p} />)}
      </ul>
      <p className="mt-4 text-sm text-ink-soft">New pieces, prices and photos are changed in the code for now. Ask your developer.</p>
    </div>
  );
}
