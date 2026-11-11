import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type BtnProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  arrow?: boolean;
};

/** Primary CTA: gradient purple, inner highlight, glow + shine sweep on hover */
export function GlowButton({ href, children, className, arrow = true }: BtnProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-xl px-7 text-sm font-semibold text-primary-foreground outline-none",
        "bg-gradient-to-b from-[#A98BF2] to-primary",
        "shadow-[inset_0_1px_0_rgba(255,255,255,.3),0_10px_34px_-8px_rgb(var(--glow-color)/.7)]",
        "transition-transform duration-300 hover:-translate-y-0.5",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/25 blur-md transition-transform duration-700 group-hover:translate-x-[320%]"
      />
      <span className="relative">{children}</span>
      {arrow && (
        <ArrowRight className="relative size-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </Link>
  );
}

/** Secondary CTA: dark glass, hairline border */
export function GhostButton({ href, children, className, arrow = true }: BtnProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex h-11 items-center justify-center gap-2 rounded-xl px-6 text-sm font-medium text-foreground outline-none",
        "border border-foreground/10 bg-foreground/[0.04] backdrop-blur-md",
        "shadow-[inset_0_1px_0_rgba(255,255,255,.06)] transition-all duration-300",
        "hover:border-primary/50 hover:bg-primary/10",
        "focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
    >
      {children}
      {arrow && (
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </Link>
  );
}

export function Eyebrow({
  children,
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      {...props}
      className={cn(
        "text-[11px] font-medium uppercase tracking-[0.28em] text-primary",
        className
      )}
    >
      {children}
    </p>
  );
}

/** Purple gradient for italic accent words */
export const accentText =
  "bg-gradient-to-r from-[#B99AFF] to-[#8B5CF6] bg-clip-text pr-[0.12em] text-transparent";