"use client";
import { createContext, useCallback, useContext, useMemo, useReducer, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { products, type Product } from "@/data/products";
import SweetArt from "@/components/SweetArt";

type Items = Record<string, number>;
type Act = { t: "add" | "dec" | "rm"; id: string } | { t: "clear" };
function reducer(s: Items, a: Act): Items {
  if (a.t === "clear") return {};
  const next = { ...s };
  if (a.t === "add") next[a.id] = (s[a.id] ?? 0) + 1;
  else if (a.t === "dec") { if ((s[a.id] ?? 0) > 1) next[a.id] = s[a.id] - 1; else delete next[a.id]; }
  else delete next[a.id];
  return next;
}

export type Line = { product: Product; qty: number };
type Ctx = {
  lines: Line[]; count: number; subtotal: number; shipping: number; total: number;
  add: (id: string, from?: DOMRect) => void; dec: (id: string) => void; rm: (id: string) => void; clear: () => void;
  open: boolean; setOpen: (b: boolean) => void;
};
const C = createContext<Ctx | null>(null);
export const useCart = () => { const c = useContext(C); if (!c) throw new Error("useCart must be used inside CartProvider"); return c; };

type Fly = { k: number; id: string; x: number; y: number; tx: number; ty: number };
export const FREE_SHIPPING_AT = 1000;
export const SHIPPING_FEE = 60; // demo value

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(reducer, {});
  const [open, setOpen] = useState(false);
  const [flies, setFlies] = useState<Fly[]>([]);

  const lines = useMemo<Line[]>(() => products.filter((p) => items[p.id]).map((p) => ({ product: p, qty: items[p.id] })), [items]);
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const subtotal = lines.reduce((s, l) => s + l.qty * l.product.price, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_AT ? 0 : SHIPPING_FEE;

  const add = useCallback((id: string, from?: DOMRect) => {
    dispatch({ t: "add", id });
    const to = document.getElementById("cart-btn")?.getBoundingClientRect();
    if (from && to && !window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      setFlies((f) => [...f, { k: Date.now() + Math.random(), id, x: from.left + from.width / 2 - 24, y: from.top - 8, tx: to.left + to.width / 2 - 24, ty: to.top + to.height / 2 - 24 }]);
  }, []);
  const dec = useCallback((id: string) => dispatch({ t: "dec", id }), []);
  const rm = useCallback((id: string) => dispatch({ t: "rm", id }), []);
  const clear = useCallback(() => dispatch({ t: "clear" }), []);

  const value = useMemo(() => ({ lines, count, subtotal, shipping, total: subtotal + shipping, add, dec, rm, clear, open, setOpen }), [lines, count, subtotal, shipping, add, dec, rm, clear, open]);

  return (
    <C.Provider value={value}>
      {children}
      <AnimatePresence>
        {flies.map((f) => (
          <motion.div key={f.k} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[70] h-12 w-12"
            initial={{ x: f.x, y: f.y, scale: 1, opacity: 1 }} animate={{ x: f.tx, y: f.ty, scale: 0.3, opacity: 0.2 }}
            transition={{ duration: 0.8, ease: [0.5, 0, 0.2, 1] }} onAnimationComplete={() => setFlies((a) => a.filter((z) => z.k !== f.k))}>
            <SweetArt kind={f.id} className="h-full w-full" />
          </motion.div>
        ))}
      </AnimatePresence>
    </C.Provider>
  );
}
