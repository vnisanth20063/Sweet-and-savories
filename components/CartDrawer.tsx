"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { FREE_SHIPPING_AT, useCart } from "@/lib/cart";
import AnimatedPrice from "./AnimatedPrice";
import { Photo } from "./SweetArt";

export default function CartDrawer() {
  const { lines, count, subtotal, shipping, total, add, dec, rm, clear, open, setOpen } = useCart();
  const [step, setStep] = useState<"cart" | "checkout" | "done">("cart");
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) { const t = setTimeout(() => setStep((s) => (s === "checkout" ? "cart" : s === "done" ? "cart" : s)), 400); return () => clearTimeout(t); }
    closeRef.current?.focus();
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", key); document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", key); document.body.style.overflow = ""; };
  }, [open, setOpen]);

  const field = "w-full rounded-lg border border-gold/30 bg-white/5 px-3 py-2.5 text-sm text-cream placeholder:text-cream/40";
  return (
    <AnimatePresence>
      {open && <motion.div key="ov" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm" />}
      {open && (
        <motion.aside key="dr" role="dialog" aria-modal="true" aria-label="Shopping cart" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 32, stiffness: 300 }} className="fixed bottom-0 right-0 top-0 z-[60] flex w-full max-w-md flex-col bg-burgundy-deep text-cream shadow-2xl">
          <div className="flex items-center justify-between border-b border-gold/20 px-5 py-4">
            <h2 className="flex items-center gap-2 text-lg"><ShoppingBag size={20} className="text-gold-light" /> {step === "checkout" ? "Checkout" : "Your Cart"} <span className="text-sm text-cream/60">({count})</span></h2>
            <button ref={closeRef} onClick={() => setOpen(false)} aria-label="Close cart" className="grid h-10 w-10 place-items-center rounded-full hover:bg-white/10"><X size={20} /></button>
          </div>
          <p className="bg-saffron/15 px-5 py-2 text-xs text-saffron">Demo checkout — no payment is taken and no order is placed.</p>

          {step === "done" ? (
            <div className="grid flex-1 place-items-center p-8 text-center">
              <div><p className="gold-text text-3xl">Demo order recorded</p><p className="mt-3 text-sm text-cream/70">This was a front-end demo. Nothing was sent or charged.</p>
                <button className="btn-gold mt-6" onClick={() => { setStep("cart"); setOpen(false); }}>Back to shop</button></div>
            </div>
          ) : lines.length === 0 ? (
            <div className="grid flex-1 place-items-center p-8 text-center text-cream/70">
              <div><p>Your cart is empty.</p><a href="#sweets" onClick={() => setOpen(false)} className="btn-gold mt-5">Explore sweets</a></div>
            </div>
          ) : (
            <>
              {step === "cart" ? (
                <ul className="flex-1 space-y-4 overflow-y-auto p-5">
                  <AnimatePresence initial={false}>
                    {lines.map(({ product: p, qty }) => (
                      <motion.li key={p.id} layout initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 60 }} className="flex gap-4 rounded-xl border border-gold/15 bg-white/5 p-3">
                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg"><Photo src={p.image} kind={p.id} alt={p.name} /></div>
                        <div className="flex min-w-0 flex-1 flex-col justify-between">
                          <div className="flex justify-between gap-2"><span className="font-medium">{p.name}</span>
                            <button onClick={() => rm(p.id)} aria-label={`Remove ${p.name}`} className="text-cream/50 hover:text-saffron"><Trash2 size={16} /></button></div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 rounded-full border border-gold/30">
                              <button onClick={() => dec(p.id)} aria-label={`Decrease ${p.name}`} className="grid h-8 w-8 place-items-center"><Minus size={14} /></button>
                              <span className="relative inline-flex w-6 justify-center overflow-hidden text-sm" aria-live="polite">
                                <AnimatePresence mode="popLayout" initial={false}><motion.span key={qty} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }}>{qty}</motion.span></AnimatePresence>
                              </span>
                              <button onClick={() => add(p.id)} aria-label={`Increase ${p.name}`} className="grid h-8 w-8 place-items-center"><Plus size={14} /></button>
                            </div>
                            <AnimatedPrice value={p.price * qty} className="text-gold-light" />
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              ) : (
                <form id="demo-form" onSubmit={(e) => { e.preventDefault(); clear(); setStep("done"); }} className="flex-1 space-y-3 overflow-y-auto p-5">
                  <label className="block text-sm">Full name<input required className={`${field} mt-1`} autoComplete="name" /></label>
                  <label className="block text-sm">Phone<input required type="tel" className={`${field} mt-1`} autoComplete="tel" /></label>
                  <label className="block text-sm">Delivery address<textarea required rows={3} className={`${field} mt-1`} autoComplete="street-address" /></label>
                  <p className="text-xs text-cream/50">Details stay in this browser tab and are discarded. No payment gateway is connected.</p>
                </form>
              )}
              <div className="space-y-2 border-t border-gold/20 p-5 text-sm">
                <div className="flex justify-between"><span className="text-cream/70">Subtotal</span><AnimatedPrice value={subtotal} /></div>
                <div className="flex justify-between"><span className="text-cream/70">Shipping (demo)</span>{shipping ? <AnimatedPrice value={shipping} /> : <span>Free</span>}</div>
                {shipping > 0 && <p className="text-xs text-gold-light/70">Free shipping above ₹{FREE_SHIPPING_AT}</p>}
                <div className="flex justify-between border-t border-gold/20 pt-3 text-lg font-semibold"><span>Total</span><AnimatedPrice value={total} className="text-gold-light" /></div>
                {step === "cart"
                  ? <button className="btn-gold mt-2 w-full justify-center" onClick={() => setStep("checkout")}>Proceed to demo checkout</button>
                  : <div className="mt-2 flex gap-2"><button type="button" className="rounded-full border border-gold/40 px-5 py-3" onClick={() => setStep("cart")}>Back</button><button type="submit" form="demo-form" className="btn-gold flex-1 justify-center">Place demo order</button></div>}
              </div>
            </>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
