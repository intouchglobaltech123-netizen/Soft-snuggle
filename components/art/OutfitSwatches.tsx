"use client";

import { RAINBOW } from "@/lib/colours";

/**
 * Changes the outfit colour on a drawn baby.
 *
 * These sit inside cards that are themselves links, so each swatch stops the
 * click before it reaches the card: tapping a colour should dress the baby,
 * not navigate away mid-decision.
 */
export function OutfitSwatches({
  value,
  onPick,
  className = "",
}: {
  value: string;
  onPick: (hex: string) => void;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-1 ${className}`} role="radiogroup" aria-label="Outfit colour">
      {RAINBOW.map((c) => {
        const on = c.hex.toLowerCase() === value.toLowerCase();
        return (
          <button
            key={c.name}
            type="button"
            role="radio"
            aria-checked={on}
            aria-label={c.name}
            title={c.name}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onPick(c.hex);
            }}
            className="grid h-9 w-9 place-items-center rounded-full outline-none transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-ink/40"
          >
            <span
              className={`block h-6 w-6 rounded-full border border-ink/15 transition-shadow ${
                on ? "ring-2 ring-ink ring-offset-2 ring-offset-paper" : ""
              }`}
              style={{ background: c.hex }}
            />
          </button>
        );
      })}
    </div>
  );
}
