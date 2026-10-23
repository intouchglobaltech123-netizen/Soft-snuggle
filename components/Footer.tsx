import Link from "next/link";
import { STORE } from "@/lib/store";
import { Logo } from "./art/Logo";
import { WhatsAppIcon } from "./WhatsAppFab";

const LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/track", label: "Track order" },
  { href: "/policies/shipping", label: "Shipping" },
  { href: "/policies/returns", label: "Returns" },
  { href: "/policies/privacy", label: "Privacy" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const social = "grid h-9 w-9 place-items-center rounded-full bg-sage text-ink transition-colors hover:bg-sage-deep hover:text-paper";

  return (
    <footer className="relative overflow-hidden border-t border-line bg-paper text-ink-soft">
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-5 px-6 pt-10 text-center">
        <Logo className="h-12" />
        <p className="inline-flex items-center gap-2 rounded-full bg-sage px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-ink">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#25D366]" /> Place orders anytime · 24×7
        </p>
        <nav className="flex flex-wrap justify-center gap-x-7 gap-y-2">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-[11px] font-bold uppercase tracking-[0.18em] transition-colors hover:text-ink">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex gap-2">
          <a href={`https://wa.me/${STORE.whatsappNumber}`} target="_blank" rel="noreferrer" className={social} aria-label="WhatsApp">
            <WhatsAppIcon className="h-4 w-4" />
          </a>
          <a href={STORE.instagram} target="_blank" rel="noreferrer" className={social} aria-label="Instagram">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a href={`mailto:${STORE.email}`} className={social} aria-label="Email">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="3" />
              <path d="m4 7 8 6 8-6" />
            </svg>
          </a>
        </div>
        <a href={`mailto:${STORE.email}`} className="text-sm hover:text-ink">
          {STORE.email}
        </a>
      </div>

      {/* Big soft logo watermark */}
      <div aria-hidden="true" className="pointer-events-none mt-6 flex justify-center px-4 opacity-[0.16]">
        <img src="/logo.webp" alt="" className="w-full max-w-4xl" draggable={false} />
      </div>

      <div className="relative z-10 border-t border-line/70 py-4 text-center text-xs">
        © {new Date().getFullYear()} Soft Snuggle · Little clothes, lots of love
      </div>
    </footer>
  );
}
