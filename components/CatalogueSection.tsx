"use client";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import CardSwap from "./CardSwap";

const FEATURED = ["mysorepak", "murukku", "kajukatli", "mixture", "laddu", "thattai"];

export default function CatalogueSection() {
  const items = FEATURED.map((id) => products.find((p) => p.id === id)!).filter(Boolean);
  return (
    <section id="catalogue" aria-labelledby="cat-h" className="overflow-hidden bg-burgundy-deep px-5 py-24 sm:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8 }}>
          <p className="text-sm uppercase tracking-[.3em] text-gold">The Catalogue</p>
          <h2 id="cat-h" className="mt-3 text-4xl font-light leading-tight sm:text-5xl">Our favourites, <span className="gold-text">one by one</span>.</h2>
          <p className="mt-5 max-w-md text-lg text-cream/75">A hand-picked selection of sweets and savouries. Fling a card aside or tap Next to see the next one.</p>
        </motion.div>
        <CardSwap items={items} />
      </div>
    </section>
  );
}
