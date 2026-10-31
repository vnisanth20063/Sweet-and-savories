"use client";
import { memo, useEffect } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import SweetArt from "./SweetArt";

const KINDS = ["laddu", "mysorepak", "jangiri", "gulabjamun", "badusha", "kajukatli", "murukku", "thattai", "mixture", "seedai", "ribbonpakoda"];
/** ROWS fills the viewport height (plus tilt margin); PER (even, so the checkerboard loops cleanly) fills 160vw+ so a row never runs out. */
const ROWS = 12, PER = 16;
/** seconds per full loop, varied per row for a parallax feel */
const SPEEDS = [64, 80, 56, 92, 70, 86, 60, 76, 68, 90, 74, 58];
/** deterministic gold motes drifting up through the wall */
const MOTES = Array.from({ length: 16 }, (_, i) => ({
  left: `${(i * 37 + 11) % 100}%`, size: 3 + (i % 4), dur: 9 + (i * 5) % 8, delay: -((i * 3) % 12),
}));

const Row = memo(function Row({ r }: { r: number }) {
  const dir = r % 2 === 0 ? "left" : "right";
  const tiles = [0, 1].flatMap((copy) =>
    Array.from({ length: PER }, (_, c) => {
      const twinkle = (r * 7 + c * 3) % 9 === 0;
      return (
        <div
          key={`${copy}-${c}`}
          style={twinkle ? ({ "--d": `${-((r * 5 + c * 2) % 7)}s` } as React.CSSProperties) : undefined}
          className={`drift-tile ${twinkle ? "drift-twinkle" : ""} grid place-items-center rounded-xl border border-gold/30 bg-gradient-to-br from-burgundy to-burgundy-deep`}
        >
          {(r + c) % 2 === 0 && <SweetArt kind={KINDS[(r * 3 + c * 5) % KINDS.length]} className="h-[70%] w-[70%]" />}
        </div>
      );
    })
  );
  return (
    <div className="drift-row" style={{ "--dur": `${SPEEDS[r % SPEEDS.length]}s`, "--off": `${-((r * 11) % 40)}s` } as React.CSSProperties}>
      <div className={`drift-track drift-${dir}`}>{tiles}</div>
    </div>
  );
});

/** Full-bleed wall of tiles drifting sideways in alternating rows. Tiles lift on hover; the whole wall eases toward the pointer. */
function DriftWall({ className = "" }: { className?: string }) {
  const reduce = !!useReducedMotion();
  const px = useMotionValue(0), py = useMotionValue(0);
  const rotY = useSpring(px, { stiffness: 50, damping: 18 });
  const rotX = useSpring(py, { stiffness: 50, damping: 18 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      px.set((e.clientX / window.innerWidth - 0.5) * 7);
      py.set((0.5 - e.clientY / window.innerHeight) * 5);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, px, py]);

  return (
    <div aria-hidden className={`absolute inset-0 overflow-hidden [perspective:900px] ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.2, 0.7, 0.2, 1] }}
        style={{ rotateX: rotX, rotateY: rotY }}
        className="absolute inset-0 [transform-style:preserve-3d]"
      >
        {/* oversized + centred so the tilted plane always covers every corner */}
        <div className="drift-plane absolute left-1/2 top-1/2 w-[150vw] [transform-style:preserve-3d] [transform:translate(-50%,-50%)_rotateX(16deg)_rotateZ(-8deg)]">
          {Array.from({ length: ROWS }, (_, r) => <Row key={r} r={r} />)}
        </div>
      </motion.div>

      <div className="drift-sheen pointer-events-none absolute inset-y-0 -left-1/3 w-1/3" />
      {MOTES.map((m, i) => (
        <span key={i} className="drift-mote pointer-events-none absolute bottom-0 rounded-full bg-gold-light"
          style={{ left: m.left, width: m.size, height: m.size, animationDuration: `${m.dur}s`, animationDelay: `${m.delay}s` }} />
      ))}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(58,10,23,.88)_0%,rgba(58,10,23,.4)_45%,rgba(28,5,9,.8)_100%)]" />
    </div>
  );
}

export default memo(DriftWall);
