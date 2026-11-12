"use client";

import * as React from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/* ============================================================
   WaveBg — flowing silk-ribbon background
   ============================================================ */

/**
 * Flowing silk-ribbon background (SVG strands + soft ribbons) animated with GSAP.
 * Colours come from the theme tokens, so it works in light + dark.
 */
export function WaveBg({
  className,
  flip = false,
  intensity = 1,
}: {
  className?: string;
  flip?: boolean;
  intensity?: number;
}) {
  const ref = React.useRef<SVGSVGElement>(null);
  const uid = React.useId().replace(/:/g, "");

  useGSAP(
    () => {
      const strands = gsap.utils.toArray<SVGPathElement>("[data-strand]");
      gsap.to(strands, {
        y: (i) => (i % 2 ? 14 : -14),
        x: (i) => (i % 3 ? 10 : -8),
        duration: 5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.18, from: "center" },
      });
      gsap.to("[data-ribbon]", {
        y: (i) => (i % 2 ? -22 : 18),
        rotation: (i) => (i % 2 ? 1.6 : -1.6),
        transformOrigin: "50% 50%",
        duration: 7,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.6,
      });
    },
    { scope: ref },
  );

  const strands = Array.from({ length: 16 }, (_, i) => {
    const o = (i - 8) * 7;
    return `M -60 ${540 + o * 1.1} C 140 ${470 + o}, 300 ${560 - o * 0.6}, 430 ${400 + o * 0.5} S 640 ${150 + o * 1.4}, 880 ${40 + o * 0.9}`;
  });

  return (
    <svg
      ref={ref}
      aria-hidden
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className={cn("pointer-events-none absolute inset-0 size-full", flip && "-scale-x-100", className)}
      style={{ opacity: intensity }}
    >
      <defs>
        <linearGradient id={`${uid}-r1`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="var(--brand-purple)" stopOpacity="0" />
          <stop offset="0.45" stopColor="var(--brand-purple-light)" stopOpacity="0.55" />
          <stop offset="1" stopColor="var(--brand-lavender)" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id={`${uid}-r2`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--brand-lavender)" stopOpacity="0.0" />
          <stop offset="0.5" stopColor="var(--brand-purple)" stopOpacity="0.4" />
          <stop offset="1" stopColor="var(--brand-purple-light)" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id={`${uid}-s`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="var(--brand-purple)" stopOpacity="0" />
          <stop offset="0.5" stopColor="var(--brand-purple-light)" stopOpacity="0.8" />
          <stop offset="1" stopColor="var(--brand-lavender)" stopOpacity="0.2" />
        </linearGradient>
        <filter id={`${uid}-b`} filterUnits="userSpaceOnUse" x="-400" y="-300" width="1600" height="1200">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      <g filter={`url(#${uid}-b)`}>
        <path
          data-ribbon
          fill={`url(#${uid}-r1)`}
          d="M-60 560 C 150 470 320 560 430 390 S 660 110 880 40 L 880 190 C 700 230 560 400 430 500 S 120 620 -60 600 Z"
        />
        <path
          data-ribbon
          fill={`url(#${uid}-r2)`}
          d="M-60 470 C 160 400 300 470 420 330 S 640 80 880 -20 L 880 90 C 700 170 560 330 440 420 S 140 540 -60 520 Z"
        />
      </g>

      <g fill="none" strokeWidth="0.9" stroke={`url(#${uid}-s)`}>
        {strands.map((d, i) => (
          <path key={i} data-strand d={d} />
        ))}
      </g>
    </svg>
  );
}

/* ============================================================
   ServerRack — isometric server towers with orbit rings
   ============================================================ */

const COS = 0.866;
const SIN = 0.5;

type TowerProps = {
  ox: number;
  oy: number;
  a: number;
  b: number;
  h: number;
  rows: number;
  id: string;
};

function Tower({ ox, oy, a, b, h, rows, id }: TowerProps) {
  const l = { x: -a * COS, y: -a * SIN };
  const r = { x: b * COS, y: -b * SIN };
  const L = (k: number, s: number) => `${ox + l.x * k},${oy + l.y * k - h * s}`;
  const R = (k: number, s: number) => `${ox + r.x * k},${oy + r.y * k - h * s}`;

  const items = Array.from({ length: rows }, (_, i) => {
    const s0 = (i + 0.14) / rows;
    const s1 = (i + 0.86) / rows;
    const mid = (s0 + s1) / 2;
    return { i, s0, s1, mid };
  });

  const pt = (k: number, s: number, v: { x: number; y: number }) => ({
    x: ox + v.x * k,
    y: oy + v.y * k - h * s,
  });

  return (
    <g>
      {/* top */}
      <polygon
        points={`${ox},${oy - h} ${ox + l.x},${oy + l.y - h} ${ox + l.x + r.x},${oy + l.y + r.y - h} ${ox + r.x},${oy + r.y - h}`}
        fill={`url(#${id}-top)`}
        stroke="rgba(185,154,255,0.35)"
        strokeWidth="0.8"
      />
      {/* left face */}
      <polygon
        points={`${ox},${oy} ${ox},${oy - h} ${ox + l.x},${oy + l.y - h} ${ox + l.x},${oy + l.y}`}
        fill={`url(#${id}-left)`}
        stroke="rgba(185,154,255,0.28)"
        strokeWidth="0.8"
      />
      {/* right face */}
      <polygon
        points={`${ox},${oy} ${ox},${oy - h} ${ox + r.x},${oy + r.y - h} ${ox + r.x},${oy + r.y}`}
        fill={`url(#${id}-right)`}
        stroke="rgba(185,154,255,0.2)"
        strokeWidth="0.8"
      />

      {items.map(({ i, s0, s1, mid }) => {
        const led1 = pt(0.84, mid, l);
        const led2 = pt(0.74, mid, l);
        const v1 = pt(0.14, mid, l);
        const v2 = pt(0.5, mid, l);
        const rl = pt(0.7, mid, r);
        return (
          <g key={i}>
            <polygon
              points={`${L(0.07, s0)} ${L(0.93, s0)} ${L(0.93, s1)} ${L(0.07, s1)}`}
              fill="rgba(255,255,255,0.035)"
              stroke="rgba(185,154,255,0.28)"
              strokeWidth="0.7"
            />
            <line x1={v1.x} y1={v1.y} x2={v2.x} y2={v2.y} stroke="rgba(185,154,255,0.3)" strokeWidth="1" />
            <circle className="led" cx={led1.x} cy={led1.y} r="1.9" fill="#B99AFF" filter={`url(#${id}-glow)`} />
            <circle className="led" cx={led2.x} cy={led2.y} r="1.5" fill="#7138DC" filter={`url(#${id}-glow)`} />
            <polygon
              points={`${R(0.14, s0)} ${R(0.86, s0)} ${R(0.86, s1)} ${R(0.14, s1)}`}
              fill="rgba(255,255,255,0.02)"
              stroke="rgba(185,154,255,0.16)"
              strokeWidth="0.6"
            />
            <circle className="led" cx={rl.x} cy={rl.y} r="1.4" fill="#9068DC" filter={`url(#${id}-glow)`} />
          </g>
        );
      })}
    </g>
  );
}

export function ServerRack({ className }: { className?: string }) {
  const ref = React.useRef<SVGSVGElement>(null);
  const uid = React.useId().replace(/:/g, "");

  useGSAP(
    () => {
      gsap.to("[data-float]", {
        y: -10,
        duration: 3.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".led", {
        opacity: 0.25,
        duration: 0.7,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.09, from: "random" },
      });

      const orbit = (sel: string, rx: number, ry: number, deg: number, dur: number, offset = 0) => {
        const el = ref.current?.querySelector<SVGCircleElement>(sel);
        if (!el) return;
        const o = { t: offset };
        gsap.to(o, {
          t: offset + Math.PI * 2,
          duration: dur,
          ease: "none",
          repeat: -1,
          onUpdate: () => {
            const x = Math.cos(o.t) * rx;
            const y = Math.sin(o.t) * ry;
            const a = (deg * Math.PI) / 180;
            el.setAttribute("cx", String(260 + x * Math.cos(a) - y * Math.sin(a)));
            el.setAttribute("cy", String(270 + x * Math.sin(a) + y * Math.cos(a)));
          },
        });
      };
      orbit("[data-dot-a]", 235, 72, -6, 9);
      orbit("[data-dot-b]", 205, 95, 14, 13, 2);
    },
    { scope: ref },
  );

  return (
    <svg ref={ref} viewBox="0 -34 520 464" className={className} aria-hidden>
      <defs>
        <linearGradient id={`${uid}-left`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2B2450" />
          <stop offset="1" stopColor="#181430" />
        </linearGradient>
        <linearGradient id={`${uid}-right`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#16122C" />
          <stop offset="1" stopColor="#0C0A1B" />
        </linearGradient>
        <linearGradient id={`${uid}-top`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4A3C86" />
          <stop offset="1" stopColor="#2B2450" />
        </linearGradient>
        <radialGradient id={`${uid}-floor`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#7138DC" stopOpacity="0.55" />
          <stop offset="1" stopColor="#7138DC" stopOpacity="0" />
        </radialGradient>
        <filter id={`${uid}-glow`} x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="1.6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={`${uid}-soft`}>
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      <ellipse cx="260" cy="360" rx="230" ry="46" fill={`url(#${uid}-floor)`} filter={`url(#${uid}-soft)`} />

      <g fill="none" strokeWidth="1.1">
        <g data-ring-a>
          <ellipse cx="260" cy="270" rx="235" ry="72" stroke="rgba(144,104,220,0.8)" strokeDasharray="2 5" transform="rotate(-6 260 270)" />
        </g>
        <g data-ring-b>
          <ellipse cx="260" cy="270" rx="205" ry="95" stroke="rgba(185,154,255,0.6)" transform="rotate(14 260 270)" />
        </g>
      </g>
      <circle data-dot-a cx="260" cy="270" r="3" fill="#B99AFF" filter={`url(#${uid}-glow)`} />
      <circle data-dot-b cx="260" cy="270" r="2.4" fill="#9068DC" filter={`url(#${uid}-glow)`} />

      <g data-float>
        <Tower id={uid} ox={338} oy={330} a={112} b={84} h={250} rows={9} />
        <Tower id={uid} ox={196} oy={362} a={112} b={84} h={170} rows={6} />
      </g>
    </svg>
  );
}

/* ============================================================
   Planet — glowing sphere used in the pricing banner
   ============================================================ */

export function Planet({ className }: { className?: string }) {
  return (
    <div
      data-planet
      className={cn("rounded-full", className)}
      style={{
        background: "radial-gradient(circle at 30% 30%, #0b0a18 0%, #0a0916 55%, #100b25 100%)",
        boxShadow:
          "0 0 0 1px rgba(185,154,255,0.25), 0 0 70px -6px rgba(144,104,220,0.6), inset 20px 20px 80px -20px rgba(144,104,220,0.55)",
      }}
    />
  );
}
