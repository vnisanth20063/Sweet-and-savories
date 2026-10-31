"use client";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic";

const WORDS = "A Taste of Tradition. A Moment of Happiness.".split(" ");

export default function FinalCTA() {
  return (
    <section aria-labelledby="cta-h" className="relative overflow-hidden bg-burgundy-deep px-5 py-32 text-center sm:px-8">
      <motion.div aria-hidden animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(201,162,75,.28),transparent_60%),radial-gradient(ellipse_at_20%_80%,rgba(244,130,31,.15),transparent_50%)]" />
      <motion.div aria-hidden initial={{ x: "-150%" }} animate={{ x: "450%" }} transition={{ duration: 5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
        className="absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-gold-light/20 to-transparent motion-reduce:hidden" />
      <div className="relative mx-auto max-w-4xl">
        <h2 id="cta-h" className="gold-text text-4xl font-light leading-tight sm:text-6xl">
          {WORDS.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-2 align-bottom">
              <motion.span className="inline-block" initial={{ y: "110%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.07, ease: [0.2, 0.7, 0.2, 1] }}>{w}&nbsp;</motion.span>
            </span>
          ))}
        </h2>
        <div className="mt-10"><Magnetic><a href="#sweets" className="btn-gold text-lg">Explore INIPU</a></Magnetic></div>
      </div>
    </section>
  );
}
