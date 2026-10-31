"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion } from "framer-motion";

const W = 200, BH = 110, LW = 212, LH = 36;
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

function Face({ w, h, t, className = "", children }: { w: number; h: number; t: string; className?: string; children?: ReactNode }) {
  return (
    <div className={`absolute overflow-hidden ${className}`} style={{ width: w, height: h, left: -w / 2, top: -h / 2, transform: t, backfaceVisibility: "hidden" }}>
      {children}
    </div>
  );
}
const Ribbon = ({ dir = "v" }: { dir?: "v" | "h" }) =>
  dir === "v" ? <div className="absolute inset-y-0 left-[44%] w-[12%] bg-gradient-to-b from-gold-light to-gold" /> : <div className="absolute inset-x-0 top-[44%] h-[12%] bg-gradient-to-r from-gold to-gold-light" />;

/** Product-style 3D gift box built with CSS 3D (no model file or 3D library). Drag, swipe or use arrow keys to rotate. */
export default function GiftBoxViewer({ startAngle = -25, tilt = 10 }: { startAngle?: number; tilt?: number }) {
  const reduce = !!useReducedMotion();
  const rotY = useMotionValue(startAngle), rotX = useMotionValue(-tilt);
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const el = ref.current; if (!el || reduce) return;
    let raf = 0, vis = true, last = performance.now();
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; }); io.observe(el);
    const loop = (n: number) => { const dt = n - last; last = n; if (vis && !drag.current) rotY.set(rotY.get() + dt * 0.012); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [reduce, rotY]);

  const side = "border border-gold/60 bg-gradient-to-b from-[#7a1c36] to-burgundy-deep";
  const lid = "border border-gold bg-gradient-to-b from-[#9a2646] to-burgundy";
  const faces = (w: number, h: number, cls: string, ribbons: boolean, label?: boolean) => (
    <>
      <Face w={w} h={h} t={`translateZ(${w / 2}px)`} className={cls}>{ribbons && <Ribbon />}{label && <span className="absolute inset-x-0 top-[12%] text-center text-[11px] font-semibold tracking-[.3em] text-gold-light">INIPU</span>}</Face>
      <Face w={w} h={h} t={`rotateY(180deg) translateZ(${w / 2}px)`} className={cls}>{ribbons && <Ribbon />}</Face>
      <Face w={w} h={h} t={`rotateY(90deg) translateZ(${w / 2}px)`} className={cls}>{ribbons && <Ribbon />}</Face>
      <Face w={w} h={h} t={`rotateY(-90deg) translateZ(${w / 2}px)`} className={cls}>{ribbons && <Ribbon />}</Face>
    </>
  );

  return (
    <div ref={ref} tabIndex={0} role="img" aria-label="Interactive INIPU gift box. Drag or use arrow keys to rotate."
      className="relative mx-auto h-[320px] w-[320px] cursor-grab touch-none select-none [perspective:900px] active:cursor-grabbing"
      onPointerDown={(e) => { drag.current = { x: e.clientX, y: e.clientY }; e.currentTarget.setPointerCapture(e.pointerId); }}
      onPointerMove={(e) => { const d = drag.current; if (!d) return; rotY.set(rotY.get() + (e.clientX - d.x) * 0.6); rotX.set(clamp(rotX.get() + (e.clientY - d.y) * 0.3, -40, 0)); drag.current = { x: e.clientX, y: e.clientY }; }}
      onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }}
      onKeyDown={(e) => { if (e.key === "ArrowLeft") rotY.set(rotY.get() - 15); if (e.key === "ArrowRight") rotY.set(rotY.get() + 15); }}>
      <div className="pointer-events-none absolute bottom-[6%] left-1/2 -translate-x-1/2">
        <motion.div animate={reduce ? undefined : { scaleX: [1, 0.85, 1], opacity: [0.55, 0.35, 0.55] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="h-6 w-52 rounded-full bg-black/60 blur-xl" />
      </div>
      <motion.div className="absolute inset-0" animate={reduce ? undefined : { y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
        <motion.div style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }} className="absolute left-1/2 top-[46%] h-0 w-0">
          <div className="absolute h-0 w-0 [transform-style:preserve-3d]" style={{ transform: "translateY(18px)" }}>
            {faces(W, BH, side, true, true)}
            <Face w={W} h={W} t={`rotateX(90deg) translateZ(${BH / 2}px)`} className={side} />
            <Face w={W} h={W} t={`rotateX(-90deg) translateZ(${BH / 2}px)`} className={side} />
          </div>
          <div className="absolute h-0 w-0 [transform-style:preserve-3d]" style={{ transform: "translateY(-55px)" }}>
            {faces(LW, LH, lid, true)}
            <Face w={LW} h={LW} t={`rotateX(90deg) translateZ(${LH / 2}px)`} className={lid}>
              <Ribbon /><Ribbon dir="h" />
              <div className="absolute left-1/2 top-1/2 grid h-[64px] w-[64px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-gold bg-burgundy-deep text-[10px] font-semibold tracking-[.2em] text-gold-light">INIPU</div>
            </Face>
            <Face w={LW} h={LW} t={`rotateX(-90deg) translateZ(${LH / 2}px)`} className={lid} />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
