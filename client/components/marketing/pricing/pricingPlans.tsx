"use client";

import * as React from "react";
import Link from "next/link";
import { Check } from "lucide-react";

import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { BILLING, PLANS, PRICING_HEADER } from "@/constants/pricing";
import { styles } from "@/constants/styles";
import { useBillingCycle } from "@/hooks/useBillingCycle";
import { Button } from "@/components/ui/button";
import { BillingToggle } from "@/components/marketing/landing/ui";

function AnimatedPrice({ value }: { value: number }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const prev = React.useRef(value);

  React.useEffect(() => {
    const o = { v: prev.current };
    const tween = gsap.to(o, {
      v: value,
      duration: 0.6,
      ease: "power2.out",
      onUpdate: () => {
        if (ref.current) ref.current.textContent = Math.round(o.v).toString();
      },
    });
    prev.current = value;
    return () => {
      tween.kill();
    };
  }, [value]);

  return <span ref={ref}>{value}</span>;
}

export function PricingPlans() {
  const ref = React.useRef<HTMLElement>(null);
  const { yearly, setYearly, priceFor } = useBillingCycle();

  useGSAP(
    () => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from("[data-ph]", { y: 36, opacity: 0, duration: 0.9, stagger: 0.12 })
        .from("[data-plan]", { y: 60, opacity: 0, duration: 0.9, stagger: 0.14 }, "-=0.5");
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={cn(styles.containerMd, "pb-24 pt-10")}>
      <p data-ph className={styles.eyebrow}>{PRICING_HEADER.eyebrow}</p>
      <h1 data-ph className={cn(styles.displayItalic, "mt-4")}>
        {PRICING_HEADER.lineOne}
        <br />
        {PRICING_HEADER.lineTwo}
      </h1>
      <p data-ph className={cn(styles.bodySm, "mt-5 text-sm")}>{PRICING_HEADER.subtitle}</p>
      <div data-ph className="mt-6">
        <BillingToggle yearly={yearly} onChange={setYearly} />
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {PLANS.map((p) => (
          <div key={p.id} className={styles.cardHover}>
            <article
              data-plan
              className={cn(styles.card, "relative flex h-full flex-col p-6", p.popular && styles.cardPopular)}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-purple px-3.5 py-1 text-[0.68rem] font-semibold text-white shadow-[0_6px_20px_-4px_rgb(var(--glow-color)/0.9)]">
                  {BILLING.popularLabel}
                </span>
              )}
              <h3 className="text-base font-semibold text-foreground">{p.name}</h3>
              <p className={cn(styles.muted, "mt-1 text-[0.7rem]")}>{p.tagline}</p>

              <div className="mt-6 flex items-end gap-1.5">
                <span className="text-4xl font-medium tracking-tight text-foreground">
                  {BILLING.currency}
                  <AnimatedPrice value={priceFor(p.monthly)} />
                </span>
                <span className={cn(styles.muted, "pb-1.5")}>{BILLING.perMonth}</span>
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-[0.78rem] text-foreground/85">
                    <Check className={cn("size-3.5", styles.accent)} strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>

              <Button asChild variant={p.popular ? "default" : "outline"} size="default" className="mt-7 w-full text-xs">
                <Link href={p.cta.href}>{p.cta.label}</Link>
              </Button>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
