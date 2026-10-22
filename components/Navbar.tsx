"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useEffect, useState } from "react";
import { STORE, inr } from "@/lib/store";
import { FlowerMark } from "./art/FlowerMark";
import { useCart } from "./providers/CartProvider";

const LEFT = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
];
const RIGHT = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const { count, open } = useCart();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const navLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      key={href}
      href={href}
      className={`relative py-1 text-[12px] font-bold uppercase tracking-[0.18em] transition-colors ${
        isActive(href) ? "text-ink" : "text-ink-soft hover:text-ink"
      }`}
    >
      {label}
      {isActive(href) && (
        <motion.span
          layoutId="nav-underline"
          className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-sage-deep"
          transition={{ type: "spring", stiffness: 400, damping: 34 }}
        />
      )}
    </Link>
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* Offer strip */}
        <div className="bg-sage-deep px-4 py-1.5 text-center text-[10.5px] font-bold uppercase tracking-[0.14em] text-paper sm:text-[11px]">
          Free shipping over {inr(STORE.freeShippingAbove)}
          <span className="hidden sm:inline"> · Cash on Delivery available</span>
        </div>

        {/* Main bar: links split around a centred logo */}
        <nav className="border-b border-line/80 bg-cream/85 backdrop-blur-md">
          <div className="mx-auto grid h-14 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-8">
            <LayoutGroup id="nav">
              <div className="flex items-center gap-7">
                <button
                  className="grid h-9 w-9 place-items-center rounded-full md:hidden"
                  onClick={() => setMenuOpen((v) => !v)}
                  aria-label="Menu"
                  aria-expanded={menuOpen}
                >
                  <div className="relative h-2.5 w-4">
                    <span className={`absolute left-0 h-0.5 w-4 rounded bg-ink transition-all ${menuOpen ? "top-1 rotate-45" : "top-0"}`} />
                    <span className={`absolute left-0 h-0.5 w-4 rounded bg-ink transition-all ${menuOpen ? "top-1 -rotate-45" : "top-2"}`} />
                  </div>
                </button>
                <div className="hidden items-center gap-7 md:flex">
                  {LEFT.map(navLink)}
                </div>
              </div>

              <Link href="/" className="flex items-center gap-2" aria-label="Soft Snuggle home">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-sage">
                  <FlowerMark className="h-[18px] w-[18px]" />
                </span>
                <span className="font-display text-lg tracking-tight">
                  soft <em className="text-sage-deep">snuggle</em>
                </span>
              </Link>

              <div className="flex items-center justify-end gap-7">
                <div className="hidden items-center gap-7 md:flex">
                  {RIGHT.map(navLink)}
                </div>
                <button
                  onClick={open}
                  className="flex items-center gap-1.5 rounded-full py-1.5 pl-2.5 pr-1.5 text-ink transition-colors hover:bg-sage/70"
                  aria-label={`Open bag, ${count} items`}
                >
                  <BagIcon className="h-[18px] w-[18px]" />
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={count}
                      initial={{ scale: 0.3, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.3, opacity: 0 }}
                      className="grid h-5 min-w-5 place-items-center rounded-full bg-butter px-1 text-[11px] font-bold"
                    >
                      {count}
                    </motion.span>
                  </AnimatePresence>
                </button>
              </div>
            </LayoutGroup>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-x-0 top-[86px] z-40 border-b border-line bg-cream/95 px-4 pb-4 pt-2 shadow-lg backdrop-blur-md md:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {[...LEFT, ...RIGHT].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={`block rounded-xl px-4 py-3 text-[13px] font-bold uppercase tracking-[0.16em] ${
                  isActive(l.href) ? "bg-sage text-ink" : "text-ink-soft"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function BagIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z" />
      <path d="M9 10V7a3 3 0 0 1 6 0v3" />
    </svg>
  );
}
