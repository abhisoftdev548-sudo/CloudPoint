"use client";

import * as React from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { AUTH_BRAND } from "@/constants/auth";
import { styles } from "@/constants/styles";
import { Logo } from "@/components/common/logo";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { WaveBg } from "@/components/marketing/landing/art";
import { MaskedLine } from "@/components/marketing/landing/ui";

export function AuthShell({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from("[data-auth-top]", { y: -20, opacity: 0, duration: 0.7, stagger: 0.1 })
        .from("[data-auth-card]", { y: 40, opacity: 0, scale: 0.98, duration: 0.9 }, "-=0.4")
        .from("[data-auth-item]", { y: 18, opacity: 0, duration: 0.6, stagger: 0.07 }, "-=0.5")
        .from("[data-brand-line]", { yPercent: 115, duration: 1.1, stagger: 0.14 }, "-=1");
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="relative isolate grid min-h-screen overflow-hidden lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_40%_at_75%_30%,rgb(var(--glow-color)/0.16),transparent)]" />

      <div className="relative flex flex-col px-6 py-6 sm:px-10">
        <div className="flex items-center justify-between">
          <div data-auth-top>
            <Logo />
          </div>
          <div data-auth-top className="lg:hidden">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          <div data-auth-card className={styles.authCard}>
            <div className="pointer-events-none absolute inset-0 opacity-60">
              <WaveBg intensity={0.6} />
            </div>
            <div className="relative">{children}</div>
          </div>
        </div>
      </div>

      <aside className="relative hidden overflow-hidden border-l border-border/60 lg:block">
        <WaveBg />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
        <div data-auth-top className="absolute right-8 top-6 z-10">
          <ThemeToggle />
        </div>
        <div className="absolute inset-x-0 bottom-0 z-10 p-12 xl:p-16">
          <h2 className={styles.displayBrand}>
            <MaskedLine dataAttr="data-brand-line">{AUTH_BRAND.lineOne}</MaskedLine>
            <MaskedLine dataAttr="data-brand-line" indent italic>
              {AUTH_BRAND.lineTwoPlain} <span className={styles.accent}>{AUTH_BRAND.lineTwoAccent}</span>
            </MaskedLine>
          </h2>
          <p className={cn(styles.bodySm, "mt-4 max-w-xs text-sm")}>{AUTH_BRAND.description}</p>
        </div>
      </aside>
    </div>
  );
}
