"use client";

import { useRef } from "react";
import { Clock, Headphones, Play, Shield, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { GlowButton } from "./ui";
import { SilkWaves } from "./art";
import Link from "next/link";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const FEATURES = [
  { icon: Zap, title: "Ultra Fast", sub: "Global Network" },
  { icon: Shield, title: "Military-Grade", sub: "Security" },
  { icon: Clock, title: "99.9% Uptime", sub: "SLA" },
  { icon: Headphones, title: "24/7 Expert", sub: "Support" },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.2 });
        tl.from("[data-wave-wrap]", { opacity: 0, scale: 1.06, duration: 2.2, ease: "power2.out" }, 0)
          .from("[data-line]", { yPercent: 115, duration: 1.2, stagger: 0.14 }, 0.1)
          .from("[data-fade]", { y: 26, opacity: 0, duration: 0.9, stagger: 0.1, ease: "power3.out" }, "-=0.7")
          .from("[data-card]", { y: 30, opacity: 0, duration: 0.9, stagger: 0.09, ease: "power3.out" }, "-=0.6");

        gsap.to("[data-wave]", { y: -14, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to("[data-wave-wrap]", {
          yPercent: 14,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      id="home"
      ref={root}
      className="relative isolate overflow-hidden pb-16 pt-32 sm:pt-36 lg:pt-40"
    >
      {/* ambient background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(60%_50%_at_75%_55%,rgb(var(--glow-color)/.18),transparent_70%),radial-gradient(40%_40%_at_10%_0%,rgb(var(--glow-color)/.10),transparent_70%)]"
      />
      <div data-wave-wrap aria-hidden className="pointer-events-none absolute -right-[18%] bottom-[8%] -z-10 w-[120%] sm:-right-[8%] sm:w-[88%] lg:right-[-4%] lg:w-[74%]">
        <SilkWaves className="h-auto w-full" />
      </div>

      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <h1 className="font-heading text-[clamp(2.7rem,9.2vw,8.75rem)] font-normal leading-[0.94] tracking-[-0.012em]">
          <span className="block overflow-hidden pb-[0.08em]">
            <span
              data-line
              className="block bg-gradient-to-b from-foreground to-foreground/55 bg-clip-text text-transparent"
            >
              BUILDING
            </span>
          </span>
          <span className="ml-[0.7em] block overflow-hidden pb-[0.08em] pr-[0.1em] italic sm:ml-[1.5em]">
            <span data-line className="block">
              <span className="text-foreground/90">WHAT </span>
              <span className="bg-gradient-to-r from-[#B99AFF] to-[#8B5CF6] bg-clip-text pr-[0.1em] text-transparent">
                LASTS
              </span>
            </span>
          </span>
        </h1>

        <p
          data-fade
          className="mt-10 max-w-[26rem] text-lg leading-[1.7] text-foreground/80 sm:mt-12 sm:text-xl"
        >
          Powerful VPS hosting with complete control, unmatched performance and zero complexity.
        </p>

        <div data-fade className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
          <GlowButton href="/signup">Start for Free</GlowButton>
          <Link
            href="/pricing"
            className="group inline-flex items-center gap-3 rounded-full text-sm font-medium text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="grid size-10 place-items-center rounded-full border border-primary/70 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_0_24px_rgb(var(--glow-color)/.6)]">
              <Play className="size-3.5 translate-x-px fill-current" />
            </span>
            Explore Plans
          </Link>
        </div>

        {/* feature strip */}
        <ul className="mt-16 grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:mt-24 lg:grid-cols-4 lg:gap-4">
          {FEATURES.map(({ icon: Icon, title, sub }) => (
            <li
              key={title}
              data-card
              className="group flex items-center gap-4 rounded-2xl border border-border/70 bg-gradient-to-b from-foreground/[0.05] to-foreground/[0.01] px-6 py-5 backdrop-blur-md transition-colors duration-300 hover:border-primary/40"
            >
              <Icon className="size-7 shrink-0 text-primary transition-transform duration-300 group-hover:scale-110" strokeWidth={1.6} />
              <div className="leading-tight">
                <p className="text-sm font-semibold text-foreground">{title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}