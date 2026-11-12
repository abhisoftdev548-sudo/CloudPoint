"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { STATS, WHY } from "@/constants/landing";
import { styles } from "@/constants/styles";
import { Button } from "@/components/ui/button";
import { ServerRack } from "@/components/marketing/landing/art";
import { Counter } from "@/components/marketing/landing/ui";

export function WhySection() {
  const ref = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const st = { trigger: ref.current, start: "top 70%", once: true };
      gsap.from("[data-why]", { y: 40, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.12, scrollTrigger: st });
      gsap.from("[data-rack]", { x: 60, opacity: 0, scale: 0.94, duration: 1.2, ease: "power3.out", scrollTrigger: st });
      gsap.from("[data-stat]", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: "[data-stats]", start: "top 90%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <section id={WHY.id} ref={ref} className="relative">
      <div className={cn(styles.container, "py-14")}>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p data-why className={styles.eyebrow}>{WHY.eyebrow}</p>
            <h2 data-why className={cn(styles.displaySection, "mt-5")}>
              {WHY.lineOne}
              <br />
              {WHY.lineTwoPlain} <span className={styles.accentItalic}>{WHY.lineTwoAccent}</span>
            </h2>
            <p data-why className={cn(styles.body, "mt-6 max-w-sm")}>{WHY.description}</p>
            <div data-why className="mt-7">
              <Button asChild variant="outline" size="sm" className="h-10 px-4">
                <Link href={WHY.cta.href}>
                  {WHY.cta.label} <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>

          <div data-rack className="relative mx-auto w-full max-w-[560px]">
            <ServerRack className="h-auto w-full" />
          </div>
        </div>

        <div data-stats className={styles.statsGrid}>
          {STATS.map((s) => (
            <div key={s.label} data-stat className="text-center">
              <div className={styles.displayStat}>
                <Counter to={s.to} suffix={s.suffix} decimals={s.decimals} />
              </div>
              <div className={cn(styles.muted, "mt-1.5")}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
