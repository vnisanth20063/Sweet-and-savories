"use client";
import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/lib/cart";
import { inr } from "@/lib/format";
import { Photo } from "./SweetArt";

export default function ProductCard({ p, i, dark = false }: { p: Product; i: number; dark?: boolean }) {
  const { add } = useCart();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 16 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 16 });

  const move = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`); el.style.setProperty("--my", `${py * 100}%`);
    if (!reduce) { ry.set((px - 0.5) * 12); rx.set(-(py - 0.5) * 12); }
  };
  const leave = () => { rx.set(0); ry.set(0); };

  return (
    <motion.article initial={{ opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (i % 3) * 0.12, ease: [0.2, 0.7, 0.2, 1] }}>
      <motion.div ref={ref} onMouseMove={move} onMouseLeave={leave} style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
        className={`group relative overflow-hidden rounded-2xl border transition-shadow duration-500 hover:shadow-[0_24px_60px_rgba(58,10,23,.35)] ${dark ? "border-gold/20 bg-white/5" : "border-gold/30 bg-white"}`}>
        <div aria-hidden className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: "radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(243,207,117,.3), transparent 55%)" }} />
        <div className="aspect-[4/3] overflow-hidden">
          <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110">
            <Photo src={p.image} kind={p.id} alt={`${p.name} — ${p.desc}`} />
          </div>
        </div>
        <div className="relative z-20 p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className={`text-xl font-medium ${dark ? "text-cream" : "text-choc"}`}>{p.name}</h3>
            <span className="text-sm text-gold">{p.tamil}</span>
          </div>
          <p className={`mt-2 min-h-[2.75rem] text-sm leading-relaxed ${dark ? "text-cream/70" : "text-choc/70"}`}>{p.desc}</p>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <div className={`text-lg font-semibold ${dark ? "text-gold-light" : "text-burgundy"}`}>{inr(p.price)}</div>
              <div className={`text-xs ${dark ? "text-cream/50" : "text-choc/50"}`}>per {p.weight}</div>
            </div>
            <button onClick={(e) => add(p.id, e.currentTarget.getBoundingClientRect())} aria-label={`Add ${p.name} to cart`} className="btn-gold !px-4 !py-2 text-sm active:scale-95">
              <Plus size={16} /> Add to Cart
            </button>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}
