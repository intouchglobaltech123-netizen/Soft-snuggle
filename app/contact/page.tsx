import type { Metadata } from "next";
import { FlowerMark } from "@/components/art/FlowerMark";
import { Reveal } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppFab";
import { STORE } from "@/lib/store";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const cards = [
    {
      title: "WhatsApp",
      body: "Order any hour, or ask us about sizes and delivery.",
      cta: "Chat with us",
      href: `https://wa.me/${STORE.whatsappNumber}?text=${encodeURIComponent("Hi Soft Snuggle! ")}`,
      tint: "#DFE7DD",
      icon: <WhatsAppIcon className="h-6 w-6 text-[#25D366]" />,
    },
    {
      title: "Email",
      body: "For bulk orders, collaborations or anything longer.",
      cta: STORE.email,
      href: `mailto:${STORE.email}`,
      tint: "#F3D8C8",
      icon: <span className="text-xl">✉️</span>,
    },
    {
      title: "Instagram",
      body: "New arrivals, little moments and offers first.",
      cta: "Follow us",
      href: STORE.instagram,
      tint: "#DCE6EE",
      icon: <span className="text-xl">📸</span>,
    },
  ];

  return (
    <div className="speckle min-h-[80vh]">
      <section className="mx-auto max-w-5xl px-6 pb-24 pt-32">
        <Reveal className="text-center">
          <FlowerMark className="anim-float mx-auto h-12 w-12" />
          <h1 className="mt-5 font-display text-5xl tracking-tight sm:text-6xl">
            Say <em className="text-sage-deep">hello</em>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-ink-soft">Here whenever you need us, 24×7. Every message reaches a real person.</p>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group block h-full rounded-[28px] p-7 transition-transform duration-500 hover:-translate-y-1.5"
                style={{ background: c.tint }}
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-paper">{c.icon}</span>
                <h2 className="mt-6 font-display text-2xl">{c.title}</h2>
                <p className="mt-1 text-sm text-ink-soft">{c.body}</p>
                <span className="mt-5 inline-block text-sm font-bold underline-offset-4 group-hover:underline">{c.cta} →</span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
