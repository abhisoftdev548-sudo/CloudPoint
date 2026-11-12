"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { useMounted } from "@/hooks/useMounted";
import { cn } from "@/lib/utils";

const wrap =
  "flex cursor-pointer items-center gap-0.5 rounded-full border border-border bg-card/70 p-1 text-left backdrop-blur transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-white/10 dark:bg-white/[0.04]";
const item = "grid size-7 place-items-center rounded-full transition-colors";
const on = "bg-card text-foreground shadow-sm dark:bg-white/10 dark:shadow-none";
const off = "text-muted-foreground";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(wrap, className)}
    >
      <span aria-hidden="true" className={cn(item, !isDark ? on : off)}>
        <Sun className="size-4" />
      </span>
      <span aria-hidden="true" className={cn(item, isDark ? on : off)}>
        <Moon className="size-4" />
      </span>
    </button>
  );
}
