import Navbar from "@/components/Navbar";
import InipuHero from "@/components/InipuHero";
import ProductSection from "@/components/ProductSection";
import OurStory from "@/components/OurStory";
import FreshnessSection from "@/components/FreshnessSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
<<<<<<< HEAD
import Loader from "@/components/Loader";
import GiftBoxSection from "@/components/GiftBoxSection";
import CatalogueSection from "@/components/CatalogueSection";
=======
>>>>>>> 9d84e7331aa6c9ca4384899e9a69fdeb304be549

export default function Page() {
  return (
    <>
<<<<<<< HEAD
      <Loader />
      <Navbar />
      <main>
        <InipuHero />
        <GiftBoxSection />
=======
      <Navbar />
      <main>
        <InipuHero />
>>>>>>> 9d84e7331aa6c9ca4384899e9a69fdeb304be549
        <div aria-hidden className="h-24 bg-gradient-to-b from-burgundy-deep to-cream" />
        <ProductSection id="sweets" cat="sweet" eyebrow="இனிப்பு · Signature Sweets" title="Made for Moments Worth Sharing" sub="Slow-cooked in pure ghee, finished by hand." />
        <div aria-hidden className="h-24 bg-gradient-to-b from-cream to-choc" />
        <ProductSection id="savouries" cat="savoury" dark eyebrow="காரம் · Crunchy Savouries" title="Crisp, Spiced, Impossible to Stop" sub="Fried fresh in small batches, the way home kitchens do it." />
<<<<<<< HEAD
        <CatalogueSection />
=======
>>>>>>> 9d84e7331aa6c9ca4384899e9a69fdeb304be549
        <OurStory />
        <FreshnessSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
