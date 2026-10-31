"use client";
import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import SweetArt, { rnd } from "./SweetArt";
import ProductTextOverlays from "./ProductTextOverlays";

const USE_FRAMES = process.env.NEXT_PUBLIC_HERO_FRAMES === "1";
const USE_SPLASH = process.env.NEXT_PUBLIC_HERO_SPLASH === "1";
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);
type P = { p: MotionValue<number> };

const FLOATS = [
  { k: "laddu", x: 14, y: 30, s: 1.15, d: 1 }, { k: "mysorepak", x: 84, y: 26, s: 1.1, d: 0.9 },
  { k: "jangiri", x: 8, y: 68, s: 0.9, d: 0.6 }, { k: "laddu", x: 90, y: 70, s: 0.85, d: 0.5 },
  { k: "jangiri", x: 70, y: 88, s: 1.2, d: 1.2 }, { k: "mysorepak", x: 26, y: 90, s: 0.8, d: 0.4 },
];

function FloatItem({ f, i, p, reduce }: P & { f: (typeof FLOATS)[number]; i: number; reduce: boolean }) {
  const a = 0.2 + i * 0.03;
  const opacity = useTransform(p, [a, a + 0.12], [0, 1]);
  const scale = useTransform(p, [a, a + 0.12], [0.3, 1]);
  const y = useTransform(p, [0, 1], [0, -160 * f.d]);
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${f.x}%`, top: `${f.y}%`, filter: f.d < 0.7 ? "blur(1.5px)" : undefined }}>
      <motion.div style={{ opacity, scale, y }}>
        <motion.div animate={reduce ? undefined : { y: [0, -14 * f.d, 0], rotate: [0, i % 2 ? -8 : 8, 0] }}
          transition={{ duration: 4 + i * 0.7, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: `clamp(56px, ${11 * f.s}vw, ${110 * f.s}px)` }}>
          <SweetArt kind={f.k} className="h-auto w-full" />
        </motion.div>
      </motion.div>
    </div>
  );
}

function GiftBox({ p }: P) {
  const baseY = useTransform(p, [0.03, 0.2], [260, 0]);
  const baseO = useTransform(p, [0.03, 0.12], [0, 1]);
  const lidY = useTransform(p, [0.08, 0.26], [-380, 0]);
  const lidO = useTransform(p, [0.08, 0.16], [0, 1]);
  const rot = useTransform(p, [0.03, 0.3], [-12, 0]);
  const ribS = useTransform(p, [0.2, 0.3], [0, 1]);
  const logoO = useTransform(p, [0.26, 0.34], [0, 1]);
  const logoS = useTransform(p, [0.26, 0.34], [0.3, 1]);
  return (
    <motion.div style={{ rotate: rot }} className="relative aspect-square w-[min(58vw,300px)]" aria-hidden>
      <motion.div style={{ y: baseY, opacity: baseO }} className="absolute inset-x-[4%] bottom-[2%] h-[56%] rounded-md border border-gold/60 bg-gradient-to-b from-[#7a1c36] to-burgundy-deep shadow-2xl" />
      <motion.div style={{ y: lidY, opacity: lidO }} className="absolute inset-x-0 top-[8%] h-[40%] rounded-md border border-gold bg-gradient-to-b from-[#9a2646] to-burgundy shadow-[0_20px_40px_rgba(0,0,0,.5)]" />
      <motion.div style={{ scaleY: ribS, transformOrigin: "top" }} className="absolute bottom-[2%] left-[45%] top-[8%] w-[10%] bg-gradient-to-b from-gold-light to-gold" />
      <motion.div style={{ scaleX: ribS }} className="absolute inset-x-0 top-[24%] h-[8%] bg-gradient-to-r from-gold to-gold-light" />
      <motion.div style={{ opacity: logoO, scale: logoS }} className="absolute left-[32%] top-[12%] grid aspect-square w-[36%] place-items-center rounded-full border-2 border-gold bg-burgundy-deep text-[clamp(10px,2.4vw,16px)] font-semibold tracking-[.2em] text-gold-light">
        INIPU
      </motion.div>
    </motion.div>
  );
}

/** Stylised syrup/cream swirls (SVG). For photoreal liquid, supply public/images/inipu/splash.webp and set NEXT_PUBLIC_HERO_SPLASH=1. */
function Splash({ p }: P) {
  const opacity = useTransform(p, [0.38, 0.5, 0.8], [0, 1, 0.7]);
  const scale = useTransform(p, [0.38, 0.6], [0.6, 1.05]);
  return (
    <motion.div aria-hidden style={{ opacity, scale }} className="pointer-events-none absolute inset-0">
      {USE_SPLASH ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/images/inipu/splash.webp" alt="" className="h-full w-full object-contain" />
      ) : (
        <svg viewBox="0 0 400 400" className="h-full w-full">
          <defs><linearGradient id="syr" x1="0" x2="1"><stop offset="0" stopColor="#f3cf75" stopOpacity="0" /><stop offset=".5" stopColor="#f4a31f" /><stop offset="1" stopColor="#f3cf75" stopOpacity="0" /></linearGradient></defs>
          <path d="M20 250 C 80 140, 160 340, 220 230 S 340 120, 385 200" fill="none" stroke="url(#syr)" strokeWidth="9" strokeLinecap="round" />
          <path d="M15 160 C 90 250, 170 90, 240 170 S 330 280, 390 250" fill="none" stroke="#fff4dd" strokeOpacity=".55" strokeWidth="6" strokeLinecap="round" />
          {[[60, 300], [340, 90], [320, 330], [90, 70]].map(([x, y], i) => <path key={i} d={`M${x} ${y} q 6 14 0 22 q -6 -8 0 -22z`} fill="#f4a31f" opacity=".85" />)}
        </svg>
      )}
    </motion.div>
  );
}

function shape(ctx: CanvasRenderingContext2D, k: number, s: number) {
  ctx.beginPath();
  if (k === 0) { ctx.fillStyle = "#e8c88a"; ctx.ellipse(0, 0, s * 1.2, s * 0.6, 0, 0, 7); ctx.fill(); }
  else if (k === 1) { ctx.fillStyle = "#b98a55"; ctx.ellipse(0, 0, s * 1.3, s * 0.7, 0, 0, 7); ctx.fill(); }
  else if (k === 2) { ctx.fillStyle = "#8fae4f"; ctx.arc(0, 0, s * 0.7, 0, 7); ctx.fill(); }
  else if (k === 3) { ctx.strokeStyle = "#e0361b"; ctx.lineWidth = 2; ctx.moveTo(-s, 0); ctx.quadraticCurveTo(0, s * 0.6, s, 0); ctx.stroke(); }
  else { ctx.fillStyle = "#9bb36a"; ctx.ellipse(0, 0, s * 1.1, s * 0.55, 0, 0, 7); ctx.fill(); ctx.strokeStyle = "#5f7a35"; ctx.lineWidth = 1; ctx.moveTo(-s, 0); ctx.lineTo(s, 0); ctx.stroke(); }
}

function ParticleCanvas({ p, reduce, frames }: P & { reduce: boolean; frames: HTMLImageElement[] | null }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current; const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    const parts = Array.from({ length: 150 }, (_, i) => ({ k: i % 5, a: rnd(i) * 6.283, sp: 0.35 + rnd(i + 9) * 0.65, sz: 3 + rnd(i + 3) * 5, sp2: (rnd(i + 5) - 0.5) * 2, dust: i >= 70, ph: rnd(i + 7) * 6.28 }));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0, vis = true;
    const draw = (t: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
      const pv = p.get();
      if (frames && frames.length) {
        const im = frames[Math.min(frames.length - 1, Math.floor(pv * (frames.length - 1)))];
        const r = Math.min(w / im.width, h / im.height);
        ctx.drawImage(im, (w - im.width * r) / 2, (h - im.height * r) / 2, im.width * r, im.height * r);
        return;
      }
      const cx = w / 2, cy = h / 2, R = Math.min(w, h);
      const b = ease(clamp((pv - 0.32) / 0.4)), g = clamp((pv - 0.25) / 0.3), fade = 1 - clamp((pv - 0.88) / 0.12) * 0.6;
      for (const q of parts) {
        ctx.save();
        if (q.dust) {
          const x = cx + Math.cos(q.a + t * 0.08 * q.sp2) * R * (0.15 + q.sp * 0.45);
          const y = cy + Math.sin(q.a * 1.3 + t * 0.1) * R * (0.12 + q.sp * 0.38) - pv * R * 0.2 * q.sp;
          ctx.globalAlpha = g * (0.25 + 0.45 * Math.abs(Math.sin(t * 0.8 + q.ph))) * fade;
          ctx.fillStyle = "#f3cf75"; ctx.shadowColor = "#f4b942"; ctx.shadowBlur = 8;
          ctx.beginPath(); ctx.arc(x, y, q.sz * 0.3, 0, 7); ctx.fill();
        } else {
          const d = b * R * (0.18 + q.sp * 0.5);
          ctx.globalAlpha = clamp(b * 4) * fade;
          ctx.translate(cx + Math.cos(q.a) * d, cy + Math.sin(q.a) * d * 0.8);
          ctx.rotate(q.a + b * 3 * q.sp2 + t * 0.2 * q.sp2);
          shape(ctx, q.k, q.sz * (w < 640 ? 0.8 : 1.1));
        }
        ctx.restore();
      }
    };
    const size = () => { w = cv.clientWidth; h = cv.clientHeight; cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); draw(0); };
    const loop = (now: number) => { if (vis) draw(now / 1000); raf = requestAnimationFrame(loop); };
    const ro = new ResizeObserver(size); ro.observe(cv);
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; }); io.observe(cv);
    size();
    if (!reduce) raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, [p, reduce, frames]);
  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 z-[5] h-full w-full" />;
}

export default function InipuHero() {
  const section = useRef<HTMLElement>(null);
  const reduce = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const p = useMotionValue(0), intro = useMotionValue(0);
  const [frames, setFrames] = useState<HTMLImageElement[] | null>(null);

  useMotionValueEvent(scrollYProgress, "change", (v) => { if (!reduce) p.set(v); });
  useEffect(() => {
    if (reduce) { p.set(0.85); intro.set(1); return; }
    p.set(scrollYProgress.get());
    let c: ReturnType<typeof animate> | undefined;
    const go = () => { c = animate(intro, 1, { duration: 2.4, ease: "easeOut" }); };
    if (document.documentElement.dataset.loaded === "1") go();
    else window.addEventListener("inipu:ready", go, { once: true });
    return () => { c?.stop(); window.removeEventListener("inipu:ready", go); };
  }, [reduce, p, intro, scrollYProgress]);

  useEffect(() => {
    if (!USE_FRAMES) return;
    let dead = false;
    Promise.all(Array.from({ length: 120 }, (_, i) => new Promise<HTMLImageElement | null>((res) => {
      const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = `/images/inipu/${i + 1}.webp`;
    }))).then((a) => { const ok = a.filter((x): x is HTMLImageElement => !!x); if (!dead && ok.length > 1) setFrames(ok); });
    return () => { dead = true; };
  }, []);

  const push = useTransform(p, [0, 1], [1, 1.45]);
  const light = useTransform(intro, [0, 1], [0, 1]);
  const glow = useTransform(p, [0.28, 0.6], [0, 1]);
  const halo = useTransform(p, [0.28, 0.6], [0.6, 1.2]);

  return (
    <section ref={section} id="home" aria-label="INIPU introduction" className={`relative ${reduce ? "h-screen" : "h-[450vh]"}`}>
      <div className="sticky top-0 h-screen overflow-hidden bg-burgundy-deep">
        <motion.div aria-hidden style={{ opacity: light }} className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#5a0f23_0%,#3a0a17_55%,#1c0509_100%)]" />
        <motion.div aria-hidden style={{ opacity: light }} className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(244,130,31,.2),transparent_60%)]" />
        {frames ? null : (
          <motion.div aria-hidden style={{ scale: push }} className="absolute inset-0 grid place-items-center">
            <div className="relative aspect-square w-[min(92vw,720px)]">
              <motion.div style={{ opacity: glow, scale: halo }} className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(243,207,117,.55),rgba(244,130,31,.15)_50%,transparent_70%)] blur-2xl" />
              <Splash p={p} />
              <div className="absolute inset-0 grid place-items-center"><GiftBox p={p} /></div>
              {FLOATS.map((f, i) => <FloatItem key={i} f={f} i={i} p={p} reduce={reduce} />)}
            </div>
          </motion.div>
        )}
        <ParticleCanvas p={p} reduce={reduce} frames={frames} />
        <ProductTextOverlays p={p} />
      </div>
    </section>
  );
}
