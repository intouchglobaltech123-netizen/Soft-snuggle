"use client";

import { useState } from "react";

/** Copies text for pasting into a courier booking or a bank search. */
export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 1500);
        } catch {
          // Clipboard blocked (old browser or not https): the text is on screen to copy by hand.
        }
      }}
      className="rounded-full border border-line bg-paper px-3 py-1 text-xs font-bold hover:border-ink/40"
    >
      {done ? "Copied ✓" : label}
    </button>
  );
}
