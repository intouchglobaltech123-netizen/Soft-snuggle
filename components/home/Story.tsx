"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { COLLECTIONS } from "@/lib/collections";
import { Baby } from "../art/Baby";
import { FlowerMark } from "../art/FlowerMark";
import { Reveal } from "../Reveal";

const VALUES = [
  { n: "01", title: "Gentle fabrics", body: "Soft cotton selected with delicate skin in mind.", tint: "#DFE7DD" },
  { n: "02", title: "Easy little details", body: "Comfy fits that make getting dressed simpler.", tint: "#F3D8C8" },
  { n: "03", title: "Made to pass along", body: "Thoughtful quality for keeping and sharing.", tint: "#DCE6EE" },
];

export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const babyY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const cloudY = useTransform(scrollYProgress, [0, 1], [40, -30]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-6, 6]);

  return (
    <section id="story" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
      <div ref={ref} className="relative grid overflow-hidden rounded-[40px] bg-sage lg:grid-cols-2">
        <div className="relative z-10 p-8 sm:p-14 lg:p-20">
          <Reveal>
            <p className="eyebrow">A softer kind of start</p>
            <h2 className="mt-4 font-display text-5xl leading-[1.02] tracking-tight sm:text-6xl">
              Made with love. <em className="text-sage-deep">Made to be loved.</em>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
              We believe the first things they wear should feel like a little hug. Thoughtful fabrics, fuss-free details
              and pieces worth keeping close — then passing along to the next little one.
            </p>
          </Reveal>
        </div>

        <div className="relative h-[420px] lg:h-auto lg:min-h-[560px]">
          <motion.div className="absolute bottom-10 left-1/2 h-[46%] w-[78%] -translate-x-1/2 rounded-[50%] bg-[#C5D4C3]" style={{ y: cloudY }} />
          <motion.div className="absolute bottom-16 left-1/2 aspect-[220/320] h-[78%] -translate-x-1/2" style={{ y: babyY, rotate }}>
            <Baby look={COLLECTIONS[2].look} className="h-full w-full" />
          </motion.div>
          {[["12%", "18%"], ["78%", "26%"], ["70%", "70%"]].map(([l, t], i) => (
            <div key={i} className="anim-float absolute" style={{ left: l, top: t, animationDelay: `${i * 0.8}s` }}>
              <FlowerMark className="h-7 w-7" petal="#FDFBF6" />
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial */}
      <Reveal className="mx-auto mt-24 max-w-4xl text-center sm:mt-32">
        <p className="eyebrow">A little love from another mum</p>
        <blockquote className="relative mt-6 font-display text-3xl leading-snug tracking-tight sm:text-[2.6rem]">
          <span className="absolute -left-2 -top-10 font-display text-8xl text-peach sm:-left-10">“</span>
          The softest little things. My daughter practically lives in her romper, and I love knowing it&apos;s{" "}
          <em className="text-sage-deep">gentle on her skin.</em>
        </blockquote>
        <p className="mt-6 text-sm font-extrabold uppercase tracking-[0.2em] text-ink-soft">Meera S. · Mum to Anaya, 8 months</p>
      </Reveal>

      {/* Values */}
      <div className="mt-24 grid gap-5 sm:mt-32 md:grid-cols-3">
        {VALUES.map((v, i) => (
          <Reveal key={v.n} delay={i * 0.12}>
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="h-full rounded-[28px] border border-line bg-paper p-8"
            >
              <span className="grid h-14 w-14 place-items-center rounded-2xl font-display text-xl" style={{ background: v.tint }}>
                {v.n}
              </span>
              <h3 className="mt-6 font-display text-2xl tracking-tight">{v.title}</h3>
              <p className="mt-2 text-ink-soft">{v.body}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
