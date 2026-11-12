import type { Metadata } from "next";

import { WaveBg } from "@/components/marketing/landing/art";
import { PricingPlans } from "@/components/marketing/pricing/pricingPlans";
import { styles } from "@/constants/styles";

export const metadata: Metadata = {
  title: "Pricing — CloudPoint",
  description: "Simple. Transparent. Fair. Choose the perfect VPS plan for your needs.",
};

export default function PricingPage() {
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[800px]">
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_75%_30%,black_30%,transparent_100%)]">
          <WaveBg className="opacity-80" />
        </div>
        <div className={styles.glowPricing} />
      </div>
      <div className="min-h-[70vh]">
        <PricingPlans />
      </div>
    </>
  );
}
