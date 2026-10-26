import type { Metadata } from "next";
import { WishlistView } from "@/components/account/WishlistView";

export const metadata: Metadata = { title: "Saved pieces" };

export default function WishlistPage() {
  return (
    <div className="speckle min-h-[80vh]">
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-32">
        <WishlistView />
      </section>
    </div>
  );
}
