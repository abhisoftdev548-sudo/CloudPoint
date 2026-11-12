import { Clock, Headphones, Shield, Zap } from "lucide-react";

import { ROUTES } from "@/constants/routes";
import type { CtaLink, FeatureItem, StatItem } from "@/types";

export const HERO = {
  lineOne: "BUILDING",
  lineTwoPlain: "WHAT",
  lineTwoAccent: "LASTS",
  description:
    "Powerful VPS hosting with complete control, unmatched performance and zero complexity.",
  primaryCta: { label: "Start for Free", href: ROUTES.signup } satisfies CtaLink,
  secondaryCta: { label: "Explore Plans", href: ROUTES.pricing } satisfies CtaLink,
};

export const FEATURES: FeatureItem[] = [
  { icon: Zap, title: "Ultra Fast", sub: "Global Network" },
  { icon: Shield, title: "Military-Grade", sub: "Security" },
  { icon: Clock, title: "99.9% Uptime", sub: "SLA" },
  { icon: Headphones, title: "24/7 Expert", sub: "Support" },
];

export const WHY = {
  id: "why",
  eyebrow: "Why CloudPoint",
  lineOne: "More Power.",
  lineTwoPlain: "More",
  lineTwoAccent: "Freedom.",
  description:
    "Deploy, manage and scale your VPS with ease. Built for developers, businesses and dreamers.",
  cta: { label: "Learn More", href: ROUTES.pricing } satisfies CtaLink,
};

export const STATS: StatItem[] = [
  { to: 50, suffix: "K+", decimals: 0, label: "Active Users" },
  { to: 99.9, suffix: "%", decimals: 1, label: "Uptime" },
  { to: 30, suffix: "s", decimals: 0, label: "Avg. Deploy Time" },
  { to: 100, suffix: "+", decimals: 0, label: "Countries" },
];

export const PRICING_BANNER = {
  eyebrow: "Simple & Transparent",
  lineOne: "Flexible Pricing",
  lineTwoPlain: "for Every",
  lineTwoAccent: "Need.",
  description: "No hidden fees. No surprises. Just powerful VPS hosting at honest prices.",
  cta: { label: "View All Plans", href: ROUTES.pricing } satisfies CtaLink,
};
