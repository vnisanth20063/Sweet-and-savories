"use client";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import Magnetic from "./Magnetic";

const LINKS = [["Home", "#home"], ["Sweets", "#sweets"], ["Savouries", "#savouries"], ["Our Story", "#story"], ["Contact", "#contact"]];

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);
  const { count, setOpen } = useCart();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 40));

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid || menu ? "bg-burgundy-deep/90 shadow-lg backdrop-blur-xl" : "bg-transparent"}`}>
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#home" className="flex items-baseline gap-2" aria-label="INIPU home">
          <span className="gold-text text-2xl font-semibold tracking-[.25em]">INIPU</span>
          <span className="hidden text-sm text-gold-light/70 sm:inline">இனிப்பு</span>
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map(([l, h]) => (
            <li key={h}>
              <a href={h} className="group relative py-1 text-sm tracking-wide text-cream/90 transition-colors hover:text-gold-light">
                {l}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold-light transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <button id="cart-btn" onClick={() => setOpen(true)} aria-label={`Open cart, ${count} items`} className="relative grid h-11 w-11 place-items-center rounded-full text-cream transition-colors hover:bg-white/10">
            <ShoppingBag size={22} />
            {count > 0 && (
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span key={count} initial={{ scale: 1.9 }} animate={{ scale: 1 }} className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-saffron px-1 text-[11px] font-semibold text-white">{count}</motion.span>
              </AnimatePresence>
            )}
          </button>
          <Magnetic className="hidden sm:inline-block"><a href="#sweets" className="btn-gold !py-2 text-sm">Order Now</a></Magnetic>
          <button className="grid h-11 w-11 place-items-center rounded-full text-cream md:hidden" aria-expanded={menu} aria-label={menu ? "Close menu" : "Open menu"} onClick={() => setMenu((m) => !m)}>
            {menu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {menu && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden md:hidden">
            <ul className="flex flex-col gap-1 px-5 pb-6">
              {LINKS.map(([l, h], i) => (
                <motion.li key={h} initial={{ x: -16, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}>
                  <a href={h} onClick={() => setMenu(false)} className="block py-3 text-lg text-cream">{l}</a>
                </motion.li>
              ))}
              <li><a href="#sweets" onClick={() => setMenu(false)} className="btn-gold mt-2">Order Now</a></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
