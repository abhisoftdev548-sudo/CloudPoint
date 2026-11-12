import { ROUTES } from "@/constants/routes";
import type { Plan } from "@/types";

export const PRICING_HEADER = {
  eyebrow: "Pricing",
  lineOne: "Simple. Transparent.",
  lineTwo: "Fair.",
  subtitle: "Choose the perfect plan for your needs.",
};

export const BILLING = {
  currency: "₹",
  perMonth: "/mo",
  monthlyLabel: "Monthly",
  yearlyLabel: "Yearly",
  saveLabel: "Save 20%",
  yearlyDiscount: 0.2,
  popularLabel: "Most Popular",
};

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For individuals & small projects",
    monthly: 199,
    features: ["1 vCPU", "1 GB RAM", "25 GB SSD", "Free Snapshot"],
    cta: { label: "Get Started", href: ROUTES.signup },
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For growing projects",
    monthly: 499,
    features: ["2 vCPU", "4 GB RAM", "80 GB SSD", "Priority Support"],
    cta: { label: "Get Started", href: ROUTES.signup },
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For large-scale needs",
    monthly: 999,
    features: ["4 vCPU", "8 GB RAM", "200 GB SSD", "Dedicated Support"],
    cta: { label: "Contact Sales", href: "#" },
  },
];
