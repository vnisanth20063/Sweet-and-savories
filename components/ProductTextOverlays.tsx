"use client";
import { motion, useTransform, type MotionValue } from "framer-motion";

type P = { p: MotionValue<number> };
const CAPS: [string, number, number][] = [
  ["Hand-rolled in small batches", 0.12, 0.3],
  ["Pure ghee. Real saffron.", 0.34, 0.52],
  ["Wrapped like a celebration", 0.56, 0.74],
];
const WORDS = "Tradition in Every Bite.".split(" ");

function Cap({ p, t, a, b, i }: P & { t: string; a: number; b: number; i: number }) {
  const opacity = useTransform(p, [a, a + 0.05, b - 0.05, b], [0, 1, 1, 0]);
  const x = useTransform(p, [a, a + 0.05], [-24, 0]);
  return (
    <motion.p style={{ opacity, x }} className="absolute left-5 text-xs uppercase tracking-[.3em] text-gold-light sm:left-12 sm:text-sm" >
      <span style={{ top: `${i * 0}px` }}>{t}</span>
    </motion.p>
  );
}
function Word({ p, w, i }: P & { w: string; i: number }) {
  const y = useTransform(p, [0.7 + i * 0.03, 0.78 + i * 0.03], ["110%", "0%"]);
  return (
    <span className="inline-block overflow-hidden pb-1 align-bottom">
      <motion.span style={{ y }} className="inline-block">{w}&nbsp;</motion.span>
    </span>
  );
}

export default function ProductTextOverlays({ p }: P) {
  const clip = useTransform(p, [0.55, 0.7], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const ty = useTransform(p, [0.55, 0.7], [30, 0]);
  const cue = useTransform(p, [0, 0.05], [1, 0]);
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <motion.h1 style={{ clipPath: clip, y: ty }} className="gold-text absolute inset-x-0 top-[11vh] text-center text-[clamp(64px,17vw,230px)] font-semibold leading-none tracking-[.12em]">
        INIPU
      </motion.h1>
      <div className="absolute inset-x-0 bottom-[17vh] h-6">
        {CAPS.map(([t, a, b], i) => <Cap key={t} p={p} t={t} a={a} b={b} i={i} />)}
      </div>
      <p className="absolute inset-x-0 bottom-[8vh] text-center text-[clamp(18px,3vw,36px)] font-light tracking-wide text-cream">
        {WORDS.map((w, i) => <Word key={w} p={p} w={w} i={i} />)}
      </p>
      <motion.div style={{ opacity: cue }} className="absolute inset-x-0 bottom-6 text-center text-[11px] uppercase tracking-[.4em] text-gold-light/80">
        Scroll
      </motion.div>
    </div>
  );
}
