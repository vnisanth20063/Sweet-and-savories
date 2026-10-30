export type Product = {
  id: string; name: string; tamil: string; desc: string; price: number;
  cat: "sweet" | "savoury"; weight: string; image: string;
};
const p = (id: string, name: string, tamil: string, desc: string, price: number, cat: Product["cat"], weight = "250 g"): Product =>
  ({ id, name, tamil, desc, price, cat, weight, image: `/images/products/${id}.webp` });

// NOTE: prices are placeholders. Replace with real INR pricing before launch.
export const products: Product[] = [
  p("mysorepak", "Mysore Pak", "மைசூர் பாக்", "Gram flour whisked with ghee into a melt-away golden block.", 420, "sweet"),
  p("laddu", "Laddu", "லட்டு", "Hand-rolled boondi laddus with cardamom, cashew and raisin.", 380, "sweet"),
  p("jangiri", "Jangiri", "ஜாங்கிரி", "Crisp saffron-hued spirals soaked in fragrant sugar syrup.", 360, "sweet"),
  p("gulabjamun", "Gulab Jamun", "குலாப் ஜாமுன்", "Soft khoya dumplings in rose-cardamom syrup.", 340, "sweet"),
  p("badusha", "Badusha", "பாதுஷா", "Flaky, ghee-rich rounds finished with a sugar glaze.", 350, "sweet"),
  p("kajukatli", "Kaju Katli", "காஜு கத்லி", "Smooth cashew fudge, diamond-cut and silver-leafed.", 780, "sweet"),
  p("murukku", "Murukku", "முறுக்கு", "Rice-and-urad spirals, crunchy with cumin and sesame.", 220, "savoury"),
  p("mixture", "Mixture", "மிக்சர்", "Sev, peanuts, fried gram and curry leaves, perfectly spiced.", 200, "savoury"),
  p("thattai", "Thattai", "தட்டை", "Thin rice crackers with chana dal and a gentle heat.", 210, "savoury"),
  p("ribbonpakoda", "Ribbon Pakoda", "ரிப்பன் பக்கோடா", "Wavy gram-flour ribbons, light and addictively crisp.", 190, "savoury"),
  p("karasev", "Kara Sev", "காரா சேவ்", "Peppery gram-flour strands with a bold, spicy bite.", 180, "savoury"),
  p("seedai", "Seedai", "சீடை", "Crunchy rice-flour spheres flavoured with coconut and cumin.", 200, "savoury"),
];
