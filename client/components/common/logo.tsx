import Link from "next/link";
import { Cloud } from "lucide-react";

import { SITE } from "@/constants/site";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

export function Logo({ className, showTagline = false }: { className?: string; showTagline?: boolean }) {
  return (
    <Link href={ROUTES.home} className={cn("flex items-center gap-2.5", className)}>
      <Cloud
        className="size-8 text-brand-purple drop-shadow-[0_0_10px_rgb(var(--glow-color)/0.7)] dark:text-brand-lavender"
        strokeWidth={1.8}
      />
      <span className="flex flex-col leading-none">
        <span className="text-xl font-semibold tracking-tight text-foreground">{SITE.name}</span>
        {showTagline && <span className="mt-1 text-[0.6rem] text-muted-foreground">{SITE.tagline}</span>}
      </span>
    </Link>
  );
}
