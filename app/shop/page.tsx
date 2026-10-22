import type { Metadata } from "next";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { getProducts } from "@/lib/queries";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Shop" };

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; age?: string }>;
}) {
  const { category, age } = await searchParams;
  const products = await getProducts();

  return (
    <div className="speckle min-h-screen">
      <section className="mx-auto max-w-7xl px-4 pb-24 pt-32 sm:px-6">
        {/* key resets the filters when the URL changes */}
        <ProductGrid key={`${category}-${age}`} products={products} initialTab={category} initialAge={age} showAgeFilter banner />
      </section>
    </div>
  );
}
