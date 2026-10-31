"use client";

import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { useCallback, useEffect, useRef } from "react";
import { isStudioShot } from "@/lib/photo";

/**
 * Full-screen photo viewer, opened by clicking a product photo.
 *
 * Arrow keys and the on-screen arrows move between photos, Escape or a click
 * on the backdrop closes it, and the page behind is held still while it is
 * open so it does not scroll away underneath.
 */
export function Lightbox({
  photos,
  index,
  onIndex,
  onClose,
  alt,
}: {
  photos: string[];
  /** Which photo is showing; null means the viewer is closed. */
  index: number | null;
  onIndex: (i: number) => void;
  onClose: () => void;
  alt: string;
}) {
  const lenis = useLenis();
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null;

  const step = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onIndex((index + dir + photos.length) % photos.length);
    },
    [index, onIndex, photos.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    // Both are needed: Lenis drives the smooth scroll, and the overflow lock
    // catches a phone, where Lenis is not what moves the page.
    lenis?.stop();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
      document.body.style.overflow = previous;
    };
  }, [open, onClose, step, lenis]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex flex-col bg-ink/92 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${alt} — photo ${index + 1} of ${photos.length}`}
          onClick={onClose}
        >
          <div className="flex items-center justify-between px-4 py-4 sm:px-6">
            <p className="text-sm font-bold text-paper/80">
              {index + 1} / {photos.length}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="grid h-11 w-11 place-items-center rounded-full bg-paper/15 text-paper transition-colors hover:bg-paper/25"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          {/* Stops a click on the photo itself from closing the viewer */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4" onClick={(e) => e.stopPropagation()}>
            {photos.length > 1 && (
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous photo"
                className="absolute left-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-paper/15 text-paper transition-colors hover:bg-paper/25 sm:left-6"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m15 5-7 7 7 7" />
                </svg>
              </button>
            )}

            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={photos[index]}
                src={photos[index]}
                alt={alt}
                draggable={false}
                className={`max-h-full max-w-full rounded-2xl object-contain ${isStudioShot(photos[index]) ? "bg-cream" : ""}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </AnimatePresence>

            {photos.length > 1 && (
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next photo"
                className="absolute right-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-paper/15 text-paper transition-colors hover:bg-paper/25 sm:right-6"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m9 5 7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {photos.length > 1 && (
            <div className="flex justify-center gap-2 px-4 pb-6" onClick={(e) => e.stopPropagation()}>
              {photos.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => onIndex(i)}
                  aria-label={`Photo ${i + 1}`}
                  aria-current={i === index}
                  className={`h-16 w-[3.25rem] overflow-hidden rounded-xl border-2 transition-all ${
                    i === index ? "border-paper" : "border-transparent opacity-50 hover:opacity-90"
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
