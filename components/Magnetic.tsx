"use client";
import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Magnetic({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 }), sy = useSpring(y, { stiffness: 200, damping: 15 });
  return (
    <motion.div ref={ref} className={`inline-block ${className}`} style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        if (!ref.current || !window.matchMedia("(hover: hover)").matches) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.25); y.set((e.clientY - r.top - r.height / 2) * 0.25);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.div>
  );
}
