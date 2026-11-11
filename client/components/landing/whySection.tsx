"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { Eyebrow, GhostButton, accentText } from "./ui";
import { ServerRacks } from "./art";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STATS = [
  { value: "50", suffix: "K+", label: "Active Users" },
  { value: "99.9", suffix: "%", label: "Uptime" },
  { value: "30", suffix: "s", label: "Avg. Deploy Time" },
  { value: "100", suffix: "+", label: "Countries" },
];

export default function WhySection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-why]", {
          y: 34,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
        });
        gsap.from("[data-rack-wrap]", {
          opacity: 0,
          x: 50,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
        });
        gsap.to("[data-rack]", {
          y: -8,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: { each: 0.5, from: "start" },
        });

        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const raw = el.dataset.count ?? "0";
          const end = parseFloat(raw);
          const decimals = raw.includes(".") ? 1 : 0;
          const obj = { v: 0 };
          el.textContent = (0).toFixed(decimals);
          gsap.to(obj, {
            v: end,
            duration: 2.2,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
            onUpdate: () => {
              el.textContent = obj.v.toFixed(decimals);
            },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section id="why" ref={root} className="relative isolate overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(50%_45%_at_75%_30%,rgb(var(--glow-color)/.14),transparent_70%)]"
      />
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-6">
          <div>
            <Eyebrow data-why>Why CloudPoint</Eyebrow>
            <h2
              data-why
              className="mt-6 font-heading text-[clamp(2.6rem,5.4vw,4.5rem)] leading-[1.02] tracking-[-0.01em] text-foreground"
            >
              More Power.
              <br />
              More <em className={accentText}>Freedom.</em>
            </h2>
            <p data-why className="mt-7 max-w-sm text-base leading-[1.75] text-muted-foreground">
              Deploy, manage and scale your VPS with ease. Built for developers, businesses and dreamers.
            </p>
            <div data-why className="mt-9">
              <GhostButton href="/about">Learn More</GhostButton>
            </div>
          </div>

          <div data-rack-wrap className="relative mx-auto w-full max-w-[640px] lg:max-w-none">
            <ServerRacks className="h-auto w-full" />
          </div>
        </div>

        {/* stats */}
        <dl className="mt-16 grid grid-cols-2 gap-y-10 sm:mt-24 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              data-why
              className={
                "flex flex-col-reverse items-center text-center " +
                (i > 0 ? "lg:border-l lg:border-border " : "") +
                (i % 2 === 1 ? "border-l border-border lg:border-l " : "")
              }
            >
              <dt className="mt-3 text-sm text-muted-foreground">{s.label}</dt>
              <dd className="font-heading text-[clamp(2.2rem,4vw,3.4rem)] leading-none text-foreground">
                <span data-count={s.value}>{s.value}</span>
                <span>{s.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}