"use client";
import { motion } from "framer-motion";
import GiftBoxViewer from "./GiftBoxViewer";

export default function GiftBoxSection() {
  return (
    <section id="giftbox" aria-labelledby="gift-h" className="bg-burgundy-deep px-5 py-24 sm:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8 }}>
          <p className="text-sm uppercase tracking-[.3em] text-gold">The INIPU Gift Box</p>
          <h2 id="gift-h" className="mt-3 text-4xl font-light leading-tight sm:text-5xl">A box worth <span className="gold-text">gifting</span>.</h2>
          <p className="mt-5 max-w-md text-lg text-cream/75">Burgundy and gold, packed with an assortment of sweets and savouries. Turn it around and take a closer look.</p>
          <p className="mt-6 text-xs uppercase tracking-[.3em] text-gold-light/70">Drag to rotate · ← → keys</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.9 }}
          className="rounded-3xl bg-[radial-gradient(circle_at_50%_45%,rgba(201,162,75,.22),transparent_65%)] py-6">
          <GiftBoxViewer startAngle={-25} tilt={10} />
        </motion.div>
      </div>
    </section>
  );
}
