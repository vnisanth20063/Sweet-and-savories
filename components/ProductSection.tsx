"use client";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";

type Props = { id: string; cat: "sweet" | "savoury"; eyebrow: string; title: string; sub: string; dark?: boolean };

export default function ProductSection({ id, cat, eyebrow, title, sub, dark = false }: Props) {
  const list = products.filter((p) => p.cat === cat);
  return (
    <section id={id} aria-labelledby={`${id}-h`} className={`px-5 py-20 sm:px-8 ${dark ? "bg-choc text-cream" : "bg-cream text-choc"}`}>
      <div className="mx-auto max-w-7xl">
        <p className="text-sm uppercase tracking-[.3em] text-gold">{eyebrow}</p>
        <div className="mt-3 overflow-hidden">
          <motion.h2 id={`${id}-h`} initial={{ y: "110%" }} whileInView={{ y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
            className="text-4xl font-light leading-tight sm:text-5xl">{title}</motion.h2>
        </div>
        <p className={`mt-3 max-w-xl ${dark ? "text-cream/70" : "text-choc/70"}`}>{sub}</p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => <ProductCard key={p.id} p={p} i={i} dark={dark} />)}
        </div>
        <p className={`mt-8 text-xs ${dark ? "text-cream/40" : "text-choc/40"}`}>Illustrated placeholders shown until product photography is added. Prices are sample values.</p>
      </div>
    </section>
  );
}
