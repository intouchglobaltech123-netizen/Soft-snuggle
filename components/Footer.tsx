"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { STORE } from "@/lib/store";
import { Logo } from "./art/Logo";
import { WhatsAppIcon } from "@/components/art/WhatsAppIcon";

// Grouped rather than one long row: a list of six unlabelled links gave no
// clue which were for buying and which were the small print.
const COLUMNS = [
  {
    heading: "Shop",
    links: [
      { href: "/shop", label: "All pieces" },
      { href: "/track", label: "Track order" },
      { href: "/contact", label: "Contact us" },
    ],
  },
  {
    heading: "Help",
    links: [
      { href: "/policies/shipping", label: "Shipping" },
      { href: "/policies/returns", label: "Returns & exchanges" },
      { href: "/policies/privacy", label: "Privacy" },
    ],
  },
];

export function Footer() {
  // The contact page is a single screen by design; a footer under it would
  // put the same three links twice on one phone screen.
  if (usePathname() === "/contact") return null;

  const social =
    "grid h-10 w-10 place-items-center rounded-full bg-sage text-ink transition-colors hover:bg-sage-deep hover:text-paper";

  return (
    <footer className="relative overflow-hidden border-t border-line bg-paper text-ink-soft">
      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-10 pt-12 sm:pt-14">
        <div className="grid gap-10 text-center sm:grid-cols-[1.4fr_1fr_1fr] sm:gap-8 sm:text-left">
          <div className="flex flex-col items-center sm:items-start">
            <Logo className="h-11" />
            <p className="mt-3 max-w-[22ch] text-sm leading-relaxed">
              Little clothes for the first year, made soft and kept simple.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-sage px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-ink">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#25D366]" /> 24×7 ordering
            </p>
            <div className="mt-5 flex gap-2.5">
              <a
                href={`https://wa.me/${STORE.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className={social}
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="h-[18px] w-[18px]" />
              </a>
              <a href={STORE.instagram} target="_blank" rel="noreferrer" className={social} aria-label="Instagram">
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href={`mailto:${STORE.email}`} className={social} aria-label="Email">
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="3" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
              </a>
            </div>
          </div>

          {/* The two columns sit side by side on a phone too, so the footer
              stays short instead of running to six stacked rows. */}
          <div className="col-span-1 grid grid-cols-2 gap-6 text-left sm:col-span-2 sm:gap-8">
            {COLUMNS.map((col) => (
              <nav key={col.heading}>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-ink">{col.heading}</p>
                <ul className="mt-3 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-sm transition-colors hover:text-ink">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </div>

      {/* Big soft logo watermark */}
      <div aria-hidden="true" className="pointer-events-none hidden justify-center px-4 opacity-[0.16] sm:flex">
        <img src="/logo.webp" alt="" className="w-full max-w-4xl" draggable={false} />
      </div>

      <div className="relative z-10 border-t border-line/70">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-5 text-xs sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Soft Snuggle · Little clothes, lots of love</p>
          <a href={`mailto:${STORE.email}`} className="transition-colors hover:text-ink">
            {STORE.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
