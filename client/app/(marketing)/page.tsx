import { Hero } from "@/components/marketing/landing/hero";
import { WhySection } from "@/components/marketing/landing/whySection";
import { PricingBanner } from "@/components/marketing/landing/pricingBanner";
import { styles } from "@/constants/styles";

export default function LandingPage() {
  return (
    <>
      <div className={styles.glowLanding} />
      <Hero />
      <WhySection />
      <PricingBanner />
    </>
  );
}
