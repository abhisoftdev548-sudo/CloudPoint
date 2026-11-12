import type { ComponentType, SVGProps } from "react";
import type { LucideIcon } from "lucide-react";

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export type NavLink = { label: string; href: string };

export type FooterColumn = { title: string; links: NavLink[] };

export type SocialLink = { label: string; href: string; icon: IconComponent };

export type FeatureItem = { icon: LucideIcon; title: string; sub: string };

export type StatItem = { to: number; suffix: string; decimals: number; label: string };

export type CtaLink = { label: string; href: string };

export type Plan = {
  id: string;
  name: string;
  tagline: string;
  monthly: number;
  features: string[];
  cta: CtaLink;
  popular?: boolean;
};

export type BillingCycle = "monthly" | "yearly";

export type LoginPayload = { email: string; password: string; remember?: boolean };
export type SignupPayload = { name: string; email: string; password: string };
