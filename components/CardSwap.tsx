"use client";
import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight, Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/lib/cart";
import { inr } from "@/lib/format";
import { Photo } from "./SweetArt";

/** 3D stack: front card goes to the back on a timer, on click of Next, or when flung sideways. */
export default function CardSwap({ items }: { items: Product[] }) {
  const { add } = useCart();
  const reduce = useReducedMotion();
  const [order, setOrder] = useState(() => items.map((_, i) => i));
  const [pause, setPause] = useState(false);
  const next = useCallback(() => setOrder((o) => [...o.slice(1), o[0]]), []);

  useEffect(() => {
    if (reduce || pause) return;
    const t = setInterval(next, 3500);
    return () => clearInterval(t);
  }, [reduce, pause, next]);

  return (
    <div onMouseEnter={() => setPause(true)} onMouseLeave={() => setPause(false)} onFocus={() => setPause(true)} onBlur={() => setPause(false)}>
      <div className="relative mx-auto h-[430px] w-[min(72vw,330px)] [perspective:1100px] sm:ml-0 sm:mr-24" role="group" aria-label="Featured products">
        {items.map((p, idx) => {
          const pos = order.indexOf(idx);
          return (
            <motion.div key={p.id} drag={pos === 0 ? "x" : false} dragSnapToOrigin dragElastic={0.6}
              onDragEnd={(_, i) => { if (Math.abs(i.offset.x) > 80 || Math.abs(i.velocity.x) > 500) next(); }}
              animate={{ x: pos * 34, y: -pos * 26, z: -pos * 80, rotateY: -6, opacity: pos > 3 ? 0 : 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              style={{ zIndex: items.length - pos, pointerEvents: pos > 3 ? "none" : "auto" }}
              aria-hidden={pos !== 0} className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing">
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gold/50 bg-gradient-to-b from-[#7a1c36] to-burgundy-deep shadow-2xl">
                <div className="h-[56%] shrink-0"><Photo src={p.image} kind={p.id} alt={pos === 0 ? p.name : ""} /></div>
                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <h3 className="flex items-baseline justify-between text-lg font-medium"><span>{p.name}</span><span className="text-xs text-gold">{p.tamil}</span></h3>
                    <p className="mt-1 text-xs leading-relaxed text-cream/70">{p.desc}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gold-light">{inr(p.price)}</span>
                    <button tabIndex={pos === 0 ? 0 : -1} onClick={(e) => add(p.id, e.currentTarget.getBoundingClientRect())} aria-label={`Add ${p.name} to cart`} className="btn-gold !px-3 !py-1.5 text-xs">
                      <Plus size={14} /> Add
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="mt-6 flex justify-center sm:justify-start">
        <button onClick={next} aria-label="Next product" className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-5 py-2 text-sm text-cream transition hover:bg-gold hover:text-burgundy-deep">
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
