import { FlowerMark } from "../art/FlowerMark";
import { STORE, inr } from "@/lib/store";

const ITEMS = [
  "Cloud-soft cotton",
  "Kind to tiny skin",
  "Made to pass along",
  `Free shipping over ${inr(STORE.freeShippingAbove)}`,
  "UPI & Cash on Delivery",
];

export function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative z-10 -rotate-1 overflow-hidden bg-ink py-4 text-paper">
      <div className="anim-marquee flex w-max">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
            {row.map((t, i) => (
              <span key={`${k}-${i}`} className="flex items-center gap-6 px-6 font-display text-xl italic sm:text-2xl">
                {t}
                <FlowerMark className="h-5 w-5" petal="#B7CCBE" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
