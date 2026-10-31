"use client";
import { useState, type ReactElement } from "react";

const HAS_PHOTOS = process.env.NEXT_PUBLIC_HAS_PHOTOS === "1";
export const rnd = (i: number) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const spiral = (turns: number, r0 = 6, r1 = 78) => {
  const n = turns * 28, pts: string[] = [];
  for (let i = 0; i <= n; i++) { const a = (i / 28) * Math.PI * 2, r = r0 + ((r1 - r0) * i) / n; pts.push(`${(100 + r * Math.cos(a)).toFixed(1)},${(100 + r * Math.sin(a)).toFixed(1)}`); }
  return pts.join(" ");
};
const pol = (i: number, rad: number) => { const a = rnd(i) * 6.283, r = Math.sqrt(rnd(i + 50)) * rad; return [100 + r * Math.cos(a), 100 + r * Math.sin(a)]; };

const Defs = () => (
  <defs>
    <radialGradient id="gOr" cx="35%" cy="30%"><stop offset="0" stopColor="#ffb347" /><stop offset=".6" stopColor="#f4821f" /><stop offset="1" stopColor="#b8530a" /></radialGradient>
    <radialGradient id="gBr" cx="35%" cy="30%"><stop offset="0" stopColor="#8a4a2a" /><stop offset=".6" stopColor="#4b2312" /><stop offset="1" stopColor="#24100a" /></radialGradient>
    <linearGradient id="gGd" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f3cf75" /><stop offset="1" stopColor="#b8862b" /></linearGradient>
    <radialGradient id="gTn" cx="40%" cy="35%"><stop offset="0" stopColor="#e9c58e" /><stop offset="1" stopColor="#a8742f" /></radialGradient>
    <filter id="sh" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="6" stdDeviation="5" floodOpacity=".45" /></filter>
  </defs>
);
const arr = (n: number) => Array.from({ length: n }, (_, i) => i);

const art: Record<string, () => ReactElement> = {
  laddu: () => (<><circle cx="100" cy="100" r="70" fill="url(#gOr)" />{arr(46).map((i) => { const [x, y] = pol(i, 64); return <circle key={i} cx={x} cy={y} r={2 + rnd(i + 3) * 3} fill="#ffd48a" opacity=".6" />; })}{arr(5).map((i) => { const [x, y] = pol(i + 80, 50); return <ellipse key={i} cx={x} cy={y} rx="7" ry="4" fill="#f1d9a0" transform={`rotate(${i * 40} ${x} ${y})`} />; })}</>),
  mysorepak: () => (<g transform="rotate(-8 100 100)"><rect x="38" y="60" width="124" height="80" rx="10" fill="url(#gGd)" />{arr(26).map((i) => <ellipse key={i} cx={48 + rnd(i) * 104} cy={72 + rnd(i + 9) * 56} rx={2 + rnd(i + 2) * 3} ry={1.5 + rnd(i + 4) * 2} fill="#8a5d12" opacity=".35" />)}<rect x="38" y="60" width="124" height="12" rx="6" fill="#fff" opacity=".25" /></g>),
  jangiri: () => (<><polyline points={spiral(3.2)} fill="none" stroke="url(#gOr)" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" /><polyline points={spiral(3.2, 6, 78)} fill="none" stroke="#ffd9a0" strokeWidth="2" opacity=".45" strokeLinecap="round" transform="translate(-2 -3)" /></>),
  gulabjamun: () => (<><circle cx="78" cy="114" r="44" fill="url(#gBr)" /><circle cx="126" cy="90" r="44" fill="url(#gBr)" /><ellipse cx="64" cy="98" rx="14" ry="8" fill="#fff" opacity=".22" transform="rotate(-30 64 98)" /><ellipse cx="112" cy="74" rx="14" ry="8" fill="#fff" opacity=".22" transform="rotate(-30 112 74)" /></>),
  badusha: () => (<><circle cx="100" cy="100" r="72" fill="url(#gTn)" /><circle cx="100" cy="100" r="38" fill="none" stroke="#8a5a22" strokeWidth="8" opacity=".5" /><circle cx="100" cy="100" r="70" fill="none" stroke="#fff" strokeWidth="3" opacity=".3" />{arr(18).map((i) => { const [x, y] = pol(i + 20, 66); return <circle key={i} cx={x} cy={y} r="2" fill="#fff" opacity=".6" />; })}</>),
  kajukatli: () => (<g transform="rotate(45 100 100)"><rect x="46" y="46" width="108" height="108" rx="6" fill="#f4e6c4" /><rect x="58" y="58" width="84" height="84" fill="#eceff3" opacity=".55" /><rect x="46" y="46" width="108" height="108" rx="6" fill="none" stroke="#d9b96a" strokeWidth="3" /></g>),
  murukku: () => (<><polyline points={spiral(4, 4, 74)} fill="none" stroke="#d9a441" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" /><polyline points={spiral(4, 4, 74)} fill="none" stroke="#8a5a22" strokeWidth="1.5" opacity=".5" transform="translate(1 2)" /></>),
  mixture: () => (<>{arr(48).map((i) => { const [x, y] = pol(i, 76), k = i % 3; return k === 0 ? <rect key={i} x={x} y={y} width="16" height="4" rx="2" fill="#e2a93b" transform={`rotate(${rnd(i) * 180} ${x} ${y})`} /> : k === 1 ? <circle key={i} cx={x} cy={y} r="6" fill="#c68642" /> : <ellipse key={i} cx={x} cy={y} rx="7" ry="3" fill="#4f7a2a" transform={`rotate(${rnd(i) * 180} ${x} ${y})`} />; })}</>),
  thattai: () => (<>{[[75, 80], [126, 90], [100, 140]].map(([x, y], i) => (<g key={i}><circle cx={x} cy={y} r="42" fill="url(#gTn)" stroke="#8a5a22" strokeOpacity=".4" strokeWidth="2" />{arr(10).map((j) => <circle key={j} cx={x + (rnd(j + i * 7) - 0.5) * 60} cy={y + (rnd(j + i * 9 + 3) - 0.5) * 60} r="2.2" fill="#7a4d18" opacity=".6" />)}</g>))}</>),
  ribbonpakoda: () => (<>{arr(5).map((i) => <path key={i} d={`M20 ${50 + i * 24} q 20 -22 40 0 t 40 0 t 40 0 t 40 0`} fill="none" stroke="url(#gGd)" strokeWidth="12" strokeLinecap="round" />)}</>),
  karasev: () => (<>{arr(26).map((i) => <path key={i} d={`M${14 + rnd(i) * 40} ${24 + i * 6} q 12 -14 24 0 t 24 0 t 24 0 t 24 0`} fill="none" stroke={i % 5 === 0 ? "#c4622a" : "#e0a63a"} strokeWidth="4" strokeLinecap="round" />)}</>),
  seedai: () => (<>{arr(30).map((i) => { const [x, y] = pol(i + 100, 70); return <circle key={i} cx={x} cy={y} r="13" fill="url(#gTn)" stroke="#8a5a22" strokeOpacity=".35" />; })}</>),
};

export default function SweetArt({ kind, className = "" }: { kind: string; className?: string }) {
  const draw = art[kind] ?? art.laddu;
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label={kind}>
      <Defs />
      <g filter="url(#sh)">{draw()}</g>
    </svg>
  );
}

/** Real photo when NEXT_PUBLIC_HAS_PHOTOS=1 and file exists; otherwise illustrated fallback. */
export function Photo({ src, kind, alt, className = "" }: { src: string; kind: string; alt: string; className?: string }) {
  const [bad, setBad] = useState(false);
  if (HAS_PHOTOS && !bad)
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} loading="lazy" decoding="async" width={800} height={600} onError={() => setBad(true)} className={`h-full w-full object-cover ${className}`} />;
  return (
    <div className={`grid h-full w-full place-items-center bg-[radial-gradient(circle_at_50%_40%,#7a1c36,#3a0a17)] ${className}`}>
      <SweetArt kind={kind} className="h-[78%] w-[78%]" />
    </div>
  );
}
