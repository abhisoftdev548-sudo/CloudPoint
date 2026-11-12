"use client";

import * as React from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { BILLING } from "@/constants/pricing";
import { styles } from "@/constants/styles";

/* ---------- Counter: counts up when scrolled into view ---------- */
export function Counter({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const o = { v: 0 };
      gsap.to(o, {
        v: to,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
        onUpdate: () => {
          if (ref.current) ref.current.textContent = o.v.toFixed(decimals) + suffix;
        },
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref}>
      {to.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ---------- BillingToggle: Monthly / Yearly ---------- */
export function BillingToggle({
  yearly,
  onChange,
  className,
}: {
  yearly: boolean;
  onChange: (yearly: boolean) => void;
  className?: string;
}) {
  return (
    <div className={cn(styles.togglePill, className)}>
      <button
        type="button"
        onClick={() => onChange(false)}
        className={cn(styles.toggleItem, !yearly ? styles.toggleActive : styles.toggleIdle)}
      >
        {BILLING.monthlyLabel}
      </button>
      <button
        type="button"
        onClick={() => onChange(true)}
        className={cn(styles.toggleItem, yearly ? styles.toggleActive : styles.toggleIdle)}
      >
        {BILLING.yearlyLabel}
        <span className={cn("font-semibold", yearly ? "text-white/90" : styles.accent)}>
          {BILLING.saveLabel}
        </span>
      </button>
    </div>
  );
}

/* ---------- Two-line display title with an accented word ---------- */
export function MaskedLine({
  children,
  indent = false,
  italic = false,
  dataAttr = "data-line",
}: {
  children: React.ReactNode;
  indent?: boolean;
  italic?: boolean;
  dataAttr?: string;
}) {
  const attr = { [dataAttr]: "" };
  return (
    <span className={indent ? styles.lineMaskIndent : styles.lineMask}>
      <span {...attr} className={cn("block", italic && "italic")}>
        {children}
      </span>
    </span>
  );
}
