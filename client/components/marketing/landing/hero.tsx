"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { FEATURES, HERO } from "@/constants/landing";
import { styles } from "@/constants/styles";
import { Button } from "@/components/ui/button";
import { WaveBg } from "@/components/marketing/landing/art";
import { MaskedLine } from "@/components/marketing/landing/ui";

export function Hero() {
  const ref = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from("[data-line]", { yPercent: 115, duration: 1.2, stagger: 0.14 })
        .from("[data-hero-fade]", { y: 26, opacity: 0, duration: 0.9, stagger: 0.12 }, "-=0.7")
        .from("[data-chip]", { y: 34, opacity: 0, duration: 0.8, stagger: 0.09 }, "-=0.6");

      gsap.to("[data-wave-wrap]", {
        yPercent: 14,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative isolate overflow-hidden">
      <div data-wave-wrap className={styles.heroWave}>
        <WaveBg />
      </div>

      <div className={cn(styles.container, "pb-16 pt-10 lg:pt-16")}>
        <h1 className={styles.displayHero}>
          <MaskedLine>{HERO.lineOne}</MaskedLine>
          <MaskedLine indent italic>
            {HERO.lineTwoPlain} <span className={styles.accent}>{HERO.lineTwoAccent}</span>
          </MaskedLine>
        </h1>

        <p data-hero-fade className={cn(styles.bodyLg, styles.heroText)}>
          {HERO.description}
        </p>

        <div data-hero-fade className="mt-8 flex flex-wrap items-center gap-5">
          <Button asChild size="md">
            <Link href={HERO.primaryCta.href}>
              {HERO.primaryCta.label} <ArrowRight />
            </Link>
          </Button>
          <Link href={HERO.secondaryCta.href} className="group flex items-center gap-3 text-sm font-medium text-foreground/90">
            <span className={styles.playCircle}>
              <Play className="size-3.5 fill-current" />
            </span>
            {HERO.secondaryCta.label}
          </Link>
        </div>

        <div className={styles.featureGrid}>
          {FEATURES.map(({ icon: Icon, title, sub }) => (
            <div key={title} data-chip className={styles.chip}>
              <Icon className={styles.chipIcon} strokeWidth={1.8} />
              <div>
                <div className={styles.chipTitle}>{title}</div>
                <div className={styles.chipSub}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
