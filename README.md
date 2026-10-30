# INIPU — Premium Indian Sweets & Savouries

Next.js 14 (App Router) · TypeScript · Tailwind · Framer Motion · Canvas · Lucide · Outfit

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```
(`next/font` fetches Outfit from Google Fonts at build/dev time, so the first run needs internet.)

## Hero (all 8 animations, one scroll-driven timeline)
`components/InipuHero.tsx` runs a 450vh sticky sequence driven by a single progress value:
intro light reveal → gift box assembly → floating sweets → ingredient burst (canvas) → syrup/cream swirls → golden glow + particles → camera push-in → INIPU + tagline reveal.
`prefers-reduced-motion` renders a static, fully composed 100vh hero.

## Assets — what is real and what is a stand-in
No photography or video was available when this was generated, so **nothing photographic is bundled**. Fallbacks:
- Product/story images → illustrated SVG sweets (`components/SweetArt.tsx`).
- Splash → stylised SVG swirls. These are *not* realistic liquid physics.
- Hero → layered Framer Motion composition + canvas particles.

To go photoreal, add files then flip the flags in `.env.local` (see `.env.example`):

| Path | Needed | Flag |
|---|---|---|
| `public/images/products/{mysorepak,laddu,jangiri,gulabjamun,badusha,kajukatli,murukku,mixture,thattai,ribbonpakoda,karasev,seedai}.webp` | 12 product photos, ~1200×900 | `NEXT_PUBLIC_HAS_PHOTOS=1` |
| `public/images/story/{1,2,3}.webp` | warm craft/ingredient photos (portrait 3:4, 3:4, square) | same flag |
| `public/images/inipu/1.webp … 120.webp` | hero frame sequence (all 120) | `NEXT_PUBLIC_HERO_FRAMES=1` |
| `public/images/inipu/splash.webp` | transparent cream/syrup splash overlay | `NEXT_PUBLIC_HERO_SPLASH=1` |

Use generated or properly licensed images only.

## Placeholders to replace
Prices (`data/products.ts`), contact email/phone/address and social links (`components/Footer.tsx`).

## Shopping
Cart state, drawer, quantities, totals and fly-to-cart are real front-end logic (`lib/cart.tsx`). Checkout is a **demo**: no payment gateway, no backend, nothing is sent or stored.
