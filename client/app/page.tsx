
import Footer from "@/components/landing/footer";
import Hero from "@/components/landing/hero";
import Navbar from "@/components/landing/Navbar";
import PricingBanner from "@/components/landing/pricingBanner";
import WhySection from "@/components/landing/whySection";

export default function Home() {
  return (
    <main className="grain relative overflow-x-clip bg-background">
      <Navbar />
      <Hero />
      <WhySection />
      <PricingBanner />
      <Footer />
    </main>
  );
}