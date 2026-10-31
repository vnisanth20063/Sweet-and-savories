import Navbar from "@/components/Navbar";
import InipuHero from "@/components/InipuHero";
import ProductSection from "@/components/ProductSection";
import OurStory from "@/components/OurStory";
import FreshnessSection from "@/components/FreshnessSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import GiftBoxSection from "@/components/GiftBoxSection";
import CatalogueSection from "@/components/CatalogueSection";

export default function Page() {
  return (
    <>
      <Loader />
      <Navbar />
      <main>
        <InipuHero />
        <GiftBoxSection />
        <div aria-hidden className="h-24 bg-gradient-to-b from-burgundy-deep to-cream" />
        <ProductSection id="sweets" cat="sweet" eyebrow="இனிப்பு · Signature Sweets" title="Made for Moments Worth Sharing" sub="Slow-cooked in pure ghee, finished by hand." />
        <div aria-hidden className="h-24 bg-gradient-to-b from-cream to-choc" />
        <ProductSection id="savouries" cat="savoury" dark eyebrow="காரம் · Crunchy Savouries" title="Crisp, Spiced, Impossible to Stop" sub="Fried fresh in small batches, the way home kitchens do it." />
        <CatalogueSection />
        <OurStory />
        <FreshnessSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
