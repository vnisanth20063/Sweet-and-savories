"use client";
import { motion } from "framer-motion";
import { BookOpen, Flame, Leaf, Package, Sparkles } from "lucide-react";
import { Photo } from "./SweetArt";

const ITEMS = [
  { i: Leaf, t: "Quality Ingredients", d: "Pure ghee, whole cashews, real saffron and freshly ground spices." },
  { i: BookOpen, t: "Authentic Recipes", d: "Family-style methods, followed faithfully batch after batch." },
  { i: Flame, t: "Fresh Preparation", d: "Cooked in small batches and packed soon after." },
  { i: Sparkles, t: "Traditional Flavours", d: "The balance of sweet, salt and spice you remember." },
  { i: Package, t: "Careful Packaging", d: "Sealed to hold crunch and softness until the box is opened." },
];

export default function FreshnessSection() {
  return (
    <section id="freshness" aria-labelledby="fresh-h" className="bg-cream px-5 py-24 text-choc sm:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm uppercase tracking-[.3em] text-gold">Freshness &amp; Quality</p>
        <h2 id="fresh-h" className="mt-3 max-w-2xl text-4xl font-light leading-tight sm:text-5xl">Fresh from our kitchen, the way it should be.</h2>
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <motion.div initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="aspect-square overflow-hidden rounded-3xl border border-gold/40">
            <Photo src="/images/story/3.webp" kind="kajukatli" alt="Kaju Katli, one of INIPU's signature sweets" />
          </motion.div>
          <ul className="grid gap-5 sm:grid-cols-2">
            {ITEMS.map(({ i: Icon, t, d }, k) => (
              <motion.li key={t} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: k * 0.08, duration: 0.7 }}
                whileHover={{ y: -4 }} className="rounded-2xl border border-gold/30 bg-white p-6">
                <motion.span whileHover={{ rotate: 12, scale: 1.1 }} className="inline-grid h-11 w-11 place-items-center rounded-full bg-burgundy text-gold-light"><Icon size={20} /></motion.span>
                <h3 className="mt-4 text-lg font-medium">{t}</h3>
                <p className="mt-1 text-sm text-choc/70">{d}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
