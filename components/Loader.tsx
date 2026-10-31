"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import DriftWall from "./DriftWall";

export default function Loader() {
  const [show, setShow] = useState(true);
  const reduce = !!useReducedMotion();
  const min = reduce ? 600 : 2800;
  const pct = useMotionValue(0);
  const label = useTransform(pct, (v) => `${Math.round(v).toString().padStart(3, "0")}%`);

  useEffect(() => {
    const c = animate(pct, 100, { duration: min / 1000, ease: "easeInOut" });
    return () => c.stop();
  }, [min, pct]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t0 = performance.now();
    let loaded = document.readyState === "complete";
    let timer: ReturnType<typeof setTimeout> | undefined;
    const finish = () => {
      document.documentElement.dataset.loaded = "1";
      document.body.style.overflow = "";
      setShow(false);
      window.dispatchEvent(new Event("inipu:ready"));
    };
    const check = () => { if (loaded) timer = setTimeout(finish, Math.max(0, min - (performance.now() - t0))); };
    const onLoad = () => { loaded = true; check(); };
    if (loaded) check(); else window.addEventListener("load", onLoad);
    return () => { clearTimeout(timer); window.removeEventListener("load", onLoad); document.body.style.overflow = ""; };
  }, [min]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div key="loader" role="status" aria-label="Loading INIPU" exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: 0.8 }}
          className="loader-failsafe fixed inset-0 z-[90] overflow-hidden bg-burgundy-deep">
          <DriftWall />
          <div className="pointer-events-none absolute inset-0 grid place-items-center px-5 text-center">
            <div className="relative [&>*:not(:first-child)]:relative">
              <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[140%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-saffron/25 blur-3xl" style={{ animation: "loader-glow 3.2s ease-in-out infinite" }} />
              <motion.p initial={{ clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: "inset(0 0% 0 0)" }} transition={{ duration: 1.1, delay: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
                className="gold-text text-[clamp(56px,14vw,160px)] font-semibold leading-none tracking-[.14em]">INIPU</motion.p>
              <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8 }} className="mt-4 tracking-widest text-cream/90">
                இனிப்பு · Tradition in Every Bite.
              </motion.p>
              <div className="mx-auto mt-8 h-px w-48 overflow-hidden bg-gold/20">
                <motion.div initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: min / 1000, ease: "easeInOut" }} className="h-full bg-gold-light" />
              </div>
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.6 }}
                className="mt-3 block text-xs font-medium tabular-nums tracking-[.4em] text-gold-light/80">{label}</motion.span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
