"use client";
 
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Cloud, Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
 
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
 
gsap.registerPlugin(useGSAP);
 
const NAV_LINKS = [
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Support", href: "/support" },
];
 
/* ------------------------------------------------------------------ */
/* Logo                                                                */
/* ------------------------------------------------------------------ */
function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="CloudPoint home"
      className="flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Cloud
        className="size-9 text-primary"
        strokeWidth={1.75}
        aria-hidden="true"
      />
      <span className="text-[22px] font-medium tracking-tight text-foreground">
        CloudPoint
      </span>
    </Link>
  );
}
 
/* ------------------------------------------------------------------ */
/* Theme toggle (sun / moon pill)                                      */
/* ------------------------------------------------------------------ */
function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const thumbRef = useRef<HTMLSpanElement>(null);
  const firstRun = useRef(true);
 
  useEffect(() => setMounted(true), []);
 
  const isDark = mounted ? resolvedTheme === "dark" : true;
 
  useGSAP(
    () => {
      if (!mounted || !thumbRef.current) return;
      const x = isDark ? 32 : 0;
      if (firstRun.current) {
        gsap.set(thumbRef.current, { x });
        firstRun.current = false;
        return;
      }
      gsap.to(thumbRef.current, { x, duration: 0.4, ease: "power3.out" });
    },
    { dependencies: [isDark, mounted] }
  );
 
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative flex h-10 w-[72px] shrink-0 items-center rounded-full border border-border bg-card/50 p-1 outline-none backdrop-blur-sm transition-colors",
        "focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
    >
      {/* sliding thumb */}
      <span
        ref={thumbRef}
        aria-hidden="true"
        className="absolute left-1 top-1 size-8 rounded-full bg-accent shadow-[0_0_16px_rgb(var(--glow-color)/0.25)]"
      />
      <span className="relative z-10 grid size-8 place-items-center">
        <Sun
          className={cn(
            "size-[18px] transition-colors",
            !isDark ? "text-accent-foreground" : "text-muted-foreground"
          )}
        />
      </span>
      <span className="relative z-10 grid size-8 place-items-center">
        <Moon
          className={cn(
            "size-[16px] transition-colors",
            isDark ? "text-accent-foreground" : "text-muted-foreground"
          )}
        />
      </span>
    </button>
  );
}
 
/* ------------------------------------------------------------------ */
/* Get Started CTA                                                     */
/* ------------------------------------------------------------------ */
function GetStarted({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/signup"
      onClick={onClick}
      className={cn(
        "group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground outline-none",
        "shadow-[0_0_28px_rgb(var(--glow-color)/0.35)] transition-colors hover:bg-primary/90",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      Get Started
      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
    </Link>
  );
}
 
/* ------------------------------------------------------------------ */
/* Mobile menu content (animated on mount)                             */
/* ------------------------------------------------------------------ */
function MobileMenuBody({
  active,
  onSelect,
  onClose,
}: {
  active: number;
  onSelect: (i: number) => void;
  onClose: () => void;
}) {
  const scope = useRef<HTMLDivElement>(null);
 
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-m-item]", {
          x: 24,
          opacity: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: "power3.out",
          delay: 0.1,
        });
      });
      return () => mm.revert();
    },
    { scope }
  );
 
  return (
    <div ref={scope} className="flex h-full flex-col px-6 pb-8 pt-16">
      <nav aria-label="Mobile" className="flex flex-col gap-1">
        {NAV_LINKS.map((link, i) => (
          <Link
            key={link.label}
            href={link.href}
            data-m-item
            onClick={() => {
              onSelect(i);
              onClose();
            }}
            className={cn(
              "flex items-center justify-between rounded-xl px-4 py-3.5 text-lg font-medium outline-none transition-colors",
              "focus-visible:ring-2 focus-visible:ring-ring",
              i === active
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {link.label}
            {i === active && (
              <span className="size-1.5 rounded-full bg-primary" />
            )}
          </Link>
        ))}
      </nav>
 
      <div className="mt-auto flex flex-col gap-4">
        <div
          data-m-item
          className="flex items-center justify-between rounded-xl border border-border px-4 py-3"
        >
          <span className="text-sm text-muted-foreground">Theme</span>
          <ThemeToggle />
        </div>
        <div data-m-item>
          <GetStarted className="w-full" onClick={onClose} />
        </div>
      </div>
    </div>
  );
}
 
/* ------------------------------------------------------------------ */
/* Navbar                                                              */
/* ------------------------------------------------------------------ */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Swap with usePathname() matching if you want route-based active state.
  const [active, setActive] = useState(0);
 
  const headerRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
 
  /* blur background only after scrolling */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
 
  const moveIndicator = (index: number, animate = true) => {
    const el = itemRefs.current[index];
    const indicator = indicatorRef.current;
    if (!el || !indicator) return;
    const vars = { x: el.offsetLeft, width: el.offsetWidth };
    if (animate) {
      gsap.to(indicator, { ...vars, duration: 0.4, ease: "power3.out" });
    } else {
      gsap.set(indicator, vars);
    }
  };
 
  /* page-load entrance + initial indicator position */
  useGSAP(
    () => {
      moveIndicator(active, false);
 
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from("[data-nav-logo]", { y: -16, opacity: 0, duration: 0.7 })
          .from(
            "[data-nav-link]",
            { y: -12, opacity: 0, duration: 0.6, stagger: 0.08 },
            "-=0.45"
          )
          .from(
            "[data-nav-right]",
            { y: -12, opacity: 0, duration: 0.6, stagger: 0.1 },
            "-=0.5"
          );
      });
      return () => mm.revert();
    },
    { scope: headerRef }
  );
 
  /* keep indicator correct on resize / font load */
  useEffect(() => {
    const onResize = () => moveIndicator(active, false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
 
  useEffect(() => {
    moveIndicator(active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
 
  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled
            ? "border-border/60 bg-background/70 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto flex h-20 w-full max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">
          {/* Logo */}
          <div data-nav-logo>
            <Logo />
          </div>
 
          {/* Desktop links (centered) */}
          <nav
            aria-label="Primary"
            className="absolute left-1/2 hidden -translate-x-1/2 lg:block"
          >
            <div
              ref={linksRef}
              className="relative flex items-center gap-12"
              onMouseLeave={() => moveIndicator(active)}
            >
              {NAV_LINKS.map((link, i) => (
                <Link
                  key={link.label}
                  href={link.href}
                  data-nav-link
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  onMouseEnter={() => moveIndicator(i)}
                  onFocus={() => moveIndicator(i)}
                  onBlur={() => moveIndicator(active)}
                  onClick={() => setActive(i)}
                  aria-current={i === active ? "page" : undefined}
                  className={cn(
                    "rounded-sm py-2 text-[13px] font-medium outline-none transition-colors",
                    "focus-visible:ring-2 focus-visible:ring-ring",
                    i === active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
 
              {/* sliding underline */}
              <span
                ref={indicatorRef}
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-0.5 left-0 h-[2px] w-0 rounded-full bg-primary shadow-[0_0_10px_rgb(var(--glow-color)/0.8)]"
              />
            </div>
          </nav>
 
          {/* Right side */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div data-nav-right className="hidden sm:block">
              <ThemeToggle />
            </div>
            <div data-nav-right className="hidden sm:block">
              <GetStarted />
            </div>
 
            {/* Hamburger (below lg) */}
            <button
              type="button"
              data-nav-right
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="grid size-11 place-items-center rounded-xl border border-border bg-card/50 text-foreground outline-none backdrop-blur-sm transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>
 
      {/* Mobile drawer */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="w-[86%] max-w-sm border-border bg-background p-0"
        >
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>
          <SheetDescription className="sr-only">
            Main navigation links for CloudPoint
          </SheetDescription>
          <MobileMenuBody
            active={active}
            onSelect={setActive}
            onClose={() => setOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}