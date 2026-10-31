"use client";
import { AnimatePresence, motion } from "framer-motion";
import { inr } from "@/lib/format";

export default function AnimatedPrice({ value, className = "" }: { value: number; className?: string }) {
  return (
    <span className={`relative inline-flex overflow-hidden align-bottom ${className}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span key={value} initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }} transition={{ duration: 0.25 }}>
          {inr(value)}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
