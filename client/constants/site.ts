import { DiscordIcon, GithubIcon, XIcon, YoutubeIcon } from "@/components/common/brandIcons";
import type { FooterColumn, NavLink, SocialLink } from "@/types";
import { ROUTES } from "@/constants/routes";

export const SITE = {
  name: "CloudPoint",
  tagline: "Infrastructure. Simplified.",
  title: "CloudPoint — Building what lasts",
  description:
    "Powerful VPS hosting with complete control, unmatched performance and zero complexity.",
  copyright: "© 2026 CloudPoint. All rights reserved.",
  getStarted: "Get Started",
} as const;

export const NAV_LINKS: NavLink[] = [
  { label: "Product", href: ROUTES.why },
  { label: "Pricing", href: ROUTES.pricing },
  { label: "Docs", href: ROUTES.docs },
  { label: "Support", href: ROUTES.support },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Overview", href: ROUTES.home },
      { label: "Pricing", href: ROUTES.pricing },
      { label: "Docs", href: ROUTES.docs },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Guides", href: "#" },
      { label: "Status", href: "#" },
      { label: "Support", href: ROUTES.support },
      { label: "Community", href: "#" },
    ],
  },
];

export const LEGAL_LINKS: NavLink[] = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", href: "#", icon: GithubIcon },
  { label: "X", href: "#", icon: XIcon },
  { label: "Discord", href: "#", icon: DiscordIcon },
  { label: "YouTube", href: "#", icon: YoutubeIcon },
];
