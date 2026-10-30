"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";

const col = "space-y-2 text-sm text-cream/70";
const a = "transition-colors hover:text-gold-light";

export default function Footer() {
  const [sent, setSent] = useState(false);
  return (
    <motion.footer id="contact" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="bg-choc px-5 pb-8 pt-16 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="gold-text text-3xl font-semibold tracking-[.25em]">INIPU</p>
          <p className="mt-1 text-sm text-gold-light/70">இனிப்பு · Tradition in Every Bite.</p>
          <p className="mt-4 max-w-sm text-sm text-cream/70">Premium Indian sweets and savouries, made in small batches with traditional recipes.</p>
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-6 flex max-w-sm gap-2">
            <label htmlFor="nl" className="sr-only">Email address</label>
            <input id="nl" type="email" required placeholder="Your email" className="min-w-0 flex-1 rounded-full border border-gold/30 bg-white/5 px-4 py-2.5 text-sm placeholder:text-cream/40" />
            <button className="btn-gold !px-5 !py-2.5 text-sm">Subscribe</button>
          </form>
          <p className="mt-2 text-xs text-cream/50" aria-live="polite">{sent ? "Demo only — your email was not stored or sent anywhere." : "Newsletter form is a demo; no service is connected."}</p>
        </div>
        <nav aria-label="Quick links"><h2 className="mb-3 text-sm uppercase tracking-widest text-gold">Quick Links</h2>
          <ul className={col}>{[["Home", "#home"], ["Our Story", "#story"], ["Freshness", "#freshness"], ["Contact", "#contact"]].map(([l, h]) => <li key={h}><a className={a} href={h}>{l}</a></li>)}</ul></nav>
        <nav aria-label="Shop"><h2 className="mb-3 text-sm uppercase tracking-widest text-gold">Shop</h2>
          <ul className={col}><li><a className={a} href="#sweets">Sweets</a></li><li><a className={a} href="#savouries">Savouries</a></li></ul></nav>
        <div><h2 className="mb-3 text-sm uppercase tracking-widest text-gold">Contact</h2>
          <ul className={col}>
            <li className="flex gap-2"><Mail size={16} /> hello@inipu.example</li>
            <li className="flex gap-2"><Phone size={16} /> +91 00000 00000</li>
            <li className="flex gap-2"><MapPin size={16} /> Address to be added</li>
          </ul>
          <div className="mt-4 flex gap-3">
            {[[Instagram, "Instagram"], [Facebook, "Facebook"], [Youtube, "YouTube"]].map(([I, n]) => {
              const Icon = I as typeof Instagram;
              return <a key={n as string} href="#contact" aria-label={`${n} (link to be added)`} className="grid h-10 w-10 place-items-center rounded-full border border-gold/30 text-cream/80 transition hover:-translate-y-0.5 hover:bg-gold hover:text-burgundy-deep"><Icon size={18} /></a>;
            })}
          </div>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-7xl border-t border-gold/15 pt-6 text-xs text-cream/40">© {new Date().getFullYear()} INIPU. Demo storefront — contact details, social links and prices are placeholders.</p>
    </motion.footer>
  );
}
