"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { PRICING_BANNER } from "@/constants/landing";
import { styles } from "@/constants/styles";
import { useBillingCycle } from "@/hooks/useBillingCycle";
import { Button } from "@/components/ui/button";
import { Planet, WaveBg } from "@/components/marketing/landing/art";
import { BillingToggle } from "@/components/marketing/landing/ui";

export function PricingBanner() {
  const ref = React.useRef<HTMLElement>(null);
  const { yearly, setYearly } = useBillingCycle();

  useGSAP(
    () => {
      gsap.from("[data-teaser]", {
        y: 36,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
      gsap.to("[data-planet]", { y: -14, duration: 5, ease: "sine.inOut", repeat: -1, yoyo: true });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={cn(styles.container, "pb-20 pt-6")}>
      <div className="card-surface relative isolate overflow-hidden rounded-3xl">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <WaveBg className="opacity-70 dark:opacity-0" />
          <Planet className="absolute -right-24 -top-20 hidden size-[420px] dark:block" />
          <div className="absolute inset-y-0 right-0 hidden w-2/3 bg-[radial-gradient(60%_80%_at_85%_30%,rgb(var(--glow-color)/0.35),transparent)] dark:block" />
        </div>

        <div className="flex flex-col gap-8 p-8 md:flex-row md:items-end md:justify-between md:p-12">
          <div>
            <p data-teaser className={cn(styles.eyebrow, "!text-[0.6rem]")}>{PRICING_BANNER.eyebrow}</p>
            <h3 data-teaser className={cn(styles.displayBanner, "mt-4")}>
              {PRICING_BANNER.lineOne}
              <br />
              {PRICING_BANNER.lineTwoPlain}{" "}
              <span className="not-italic text-brand-purple dark:italic dark:text-foreground">
                {PRICING_BANNER.lineTwoAccent}
              </span>
            </h3>
            <p data-teaser className={cn(styles.bodySm, "mt-4 max-w-sm")}>{PRICING_BANNER.description}</p>
            <div data-teaser className="mt-6">
              <Button asChild variant="outline" size="sm" className="h-10 bg-card/40 px-4">
                <Link href={PRICING_BANNER.cta.href}>
                  {PRICING_BANNER.cta.label} <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>

          <div data-teaser className="self-start md:self-end dark:hidden">
            <BillingToggle yearly={yearly} onChange={setYearly} />
          </div>
        </div>
      </div>
    </section>
  );
}
