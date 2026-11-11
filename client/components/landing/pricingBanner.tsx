"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { GhostButton } from "./ui";
import { Planet } from "./art";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function PricingBanner() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-pb]", {
          y: 30,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
        });
        gsap.from("[data-planet-wrap]", {
          scale: 0.92,
          opacity: 0,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
        });
        gsap.to("[data-swirl]", { rotate: 360, duration: 90, repeat: -1, ease: "none" });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section id="pricing" ref={root} className="px-5 pb-20 sm:px-8 lg:px-12">
      <div className="relative mx-auto min-h-[300px] max-w-[1400px] overflow-hidden rounded-[28px] border border-border/70 bg-gradient-to-br from-card via-card to-[#1A1238] sm:min-h-[340px]">
        {/* grid texture */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(70%_100%_at_20%_50%,black,transparent)]"
        />
        <div
          data-planet-wrap
          className="pointer-events-none absolute -bottom-[95%] -right-[22%] w-[85%] min-w-[420px] sm:-bottom-[110%] sm:-right-[8%] sm:w-[62%] lg:-right-[2%] lg:w-[52%]"
        >
          <Planet className="w-full" />
        </div>

        <div className="relative z-10 flex h-full max-w-xl flex-col justify-center px-7 py-12 sm:px-12 sm:py-14 lg:px-16">
          <p data-pb className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#E9B79A]">
            Simple &amp; Transparent
          </p>
          <h2
            data-pb
            className="mt-5 bg-gradient-to-b from-[#F8E3D0] to-[#D9A98A] bg-clip-text font-heading text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[1.05] tracking-[-0.01em] text-transparent"
          >
            Flexible Pricing
            <br />
            for Every Need.
          </h2>
          <p data-pb className="mt-5 text-sm text-muted-foreground">
            No hidden fees. No surprises.
          </p>
          <div data-pb className="mt-8">
            <GhostButton href="/pricing">View All Plans</GhostButton>
          </div>
        </div>
      </div>
    </section>
  );
}