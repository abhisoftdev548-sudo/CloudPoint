"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const modes = [
  { value: "light", Icon: Sun },
  { value: "dark", Icon: Moon },
] as const;

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const current = mounted && resolvedTheme === "dark" ? "dark" : "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(current === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="flex items-center rounded-full border border-foreground/10 bg-foreground/[0.04] p-1 transition-colors hover:bg-foreground/[0.08]"
    >
      {modes.map(({ value, Icon }) => {
        const active = mounted && current === value;
        return (
          <span
            key={value}
            className="relative flex size-7 items-center justify-center rounded-full"
          >
            {active && (
              <motion.span
                layoutId="theme-thumb"
                className="absolute inset-0 rounded-full bg-foreground/10"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <Icon
              className={cn(
                "relative size-4 transition-colors",
                active ? "text-foreground" : "text-foreground/40"
              )}
            />
          </span>
        );
      })}
    </button>
  );
}