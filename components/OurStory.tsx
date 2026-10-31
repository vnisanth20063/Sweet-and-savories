"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Photo } from "./SweetArt";

const LINES = ["Rooted in Tradition.", "Crafted with Love."];
const PARAS = [
  "In South Indian homes, sweets and savouries are never just food. They mark festivals, welcome guests, and carry recipes across generations.",
  "At INIPU we keep that spirit intact: slow-stirred sweets, hand-shaped savouries, authentic spice balances and patient cooking, with no shortcuts.",
  "Every box is prepared in small batches and packed with care, so a taste of home arrives the way it was meant to.",
];

export default function OurStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bg = useTransform(scrollYProgress, [0, 0.3, 1], ["#2b1810", "#4a0c1c", "#3a0a17"]);
  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 120]);
  return (
    <motion.section ref={ref} id="story" aria-labelledby="story-h" style={{ backgroundColor: bg }} className="overflow-hidden px-5 py-28 sm:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <div>
          <p className="text-sm uppercase tracking-[.3em] text-gold">Our Story</p>
          <h2 id="story-h" className="mt-4 text-4xl font-light leading-tight sm:text-6xl">
            {LINES.map((l, i) => (
              <span key={l} className="block overflow-hidden">
                <motion.span className="gold-text block" initial={{ y: "110%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: i * 0.15, ease: [0.2, 0.7, 0.2, 1] }}>{l}</motion.span>
              </span>
            ))}
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-cream/80">
            {PARAS.map((t, i) => (
              <motion.p key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8, delay: i * 0.1 }}>{t}</motion.p>
            ))}
          </div>
        </div>
        <div className="relative mx-auto grid w-full max-w-lg grid-cols-2 gap-5" aria-hidden>
          <motion.div style={{ y: y1 }} className="aspect-[3/4] overflow-hidden rounded-t-full border border-gold/40"><Photo src="/images/story/1.webp" kind="mysorepak" alt="" /></motion.div>
          <motion.div style={{ y: y2 }} className="mt-16 aspect-[3/4] overflow-hidden rounded-t-full border border-gold/40"><Photo src="/images/story/2.webp" kind="laddu" alt="" /></motion.div>
        </div>
      </div>
    </motion.section>
  );
}
