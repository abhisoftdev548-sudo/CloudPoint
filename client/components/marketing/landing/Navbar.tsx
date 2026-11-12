"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { ArrowRight, Menu, Moon, Sun } from "lucide-react";

import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE } from "@/constants/site";
import { ROUTES } from "@/constants/routes";
import { WaveBg } from "@/components/marketing/landing/art";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/common/logo";
import { useMounted } from "@/hooks/useMounted";

function NavbarThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const thumbRef = React.useRef<HTMLSpanElement>(null);
  const isDark = mounted ? resolvedTheme === "dark" : true;

  useGSAP(
    () => {
      if (!mounted || !thumbRef.current) return;
      gsap.to(thumbRef.current, {
        x: isDark ? 32 : 0,
        duration: 0.4,
        ease: "power3.out",
      });
    },
    { dependencies: [isDark, mounted] },
  );

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative flex h-10 w-[72px] shrink-0 items-center rounded-full border border-border bg-card/50 p-1 outline-none backdrop-blur-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <span
        ref={thumbRef}
        aria-hidden="true"
        className="absolute left-1 top-1 size-8 rounded-full bg-accent shadow-[0_0_16px_rgb(var(--glow-color)/0.25)]"
      />
      <span className="relative z-10 grid size-8 place-items-center">
        <Sun className={cn("size-[18px] transition-colors", !isDark ? "text-accent-foreground" : "text-muted-foreground")} />
      </span>
      <span className="relative z-10 grid size-8 place-items-center">
        <Moon className={cn("size-4 transition-colors", isDark ? "text-accent-foreground" : "text-muted-foreground")} />
      </span>
    </button>
  );
}

function GetStarted({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href={ROUTES.signup}
      onClick={onClick}
      className={cn(
        "group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground outline-none",
        "shadow-[0_0_28px_rgb(var(--glow-color)/0.35)] transition-colors hover:bg-primary/90",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      {SITE.getStarted}
      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
    </Link>
  );
}

function MobileMenuBody({
  active,
  onSelect,
  onClose,
}: {
  active: number;
  onSelect: (index: number) => void;
  onClose: () => void;
}) {
  const scope = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-mobile-nav-item]", {
          x: 24,
          opacity: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: "power3.out",
          delay: 0.1,
        });
      });
      return () => media.revert();
    },
    { scope },
  );

  return (
    <div ref={scope} className="relative z-10 flex h-full flex-col px-6 pb-8 pt-16">
      <nav aria-label="Mobile" className="flex flex-col gap-1">
        {NAV_LINKS.map((link, index) => (
          <Link
            key={link.label}
            href={link.href}
            data-mobile-nav-item
            onClick={() => {
              onSelect(index);
              onClose();
            }}
            aria-current={index === active ? "page" : undefined}
            className={cn(
              "flex items-center justify-between rounded-xl px-4 py-3.5 text-lg font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
              index === active
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {link.label}
            {index === active && <span className="size-1.5 rounded-full bg-primary" />}
          </Link>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-4">
        <div data-mobile-nav-item className="flex items-center justify-between rounded-xl border border-border px-4 py-3">
          <span className="text-sm text-muted-foreground">Theme</span>
          <NavbarThemeToggle />
        </div>
        <div data-mobile-nav-item>
          <GetStarted className="w-full" onClick={onClose} />
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState(() => {
    const index = NAV_LINKS.findIndex((link) => link.href === pathname || (pathname === ROUTES.home && link.href === ROUTES.why));
    return index < 0 ? 0 : index;
  });
  const headerRef = React.useRef<HTMLElement>(null);
  const indicatorRef = React.useRef<HTMLSpanElement>(null);
  const itemRefs = React.useRef<(HTMLAnchorElement | null)[]>([]);

  const moveIndicator = (index: number, animate = true) => {
    const link = itemRefs.current[index];
    const indicator = indicatorRef.current;
    if (!link || !indicator) return;
    const position = { x: link.offsetLeft, width: link.offsetWidth };
    if (animate) {
      gsap.to(indicator, { ...position, duration: 0.4, ease: "power3.out" });
    } else {
      gsap.set(indicator, position);
    }
  };

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(
    () => {
      moveIndicator(active, false);
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
        timeline
          .from("[data-nav-logo]", { y: -16, opacity: 0, duration: 0.7 })
          .from("[data-nav-link]", { y: -12, opacity: 0, duration: 0.6, stagger: 0.08 }, "-=0.45")
          .from("[data-nav-right]", { y: -12, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.5");
      });
      return () => media.revert();
    },
    { scope: headerRef },
  );

  React.useEffect(() => {
    const index = NAV_LINKS.findIndex((link) => link.href === pathname || (pathname === ROUTES.home && link.href === ROUTES.why));
    setActive(index < 0 ? 0 : index);
  }, [pathname]);

  React.useEffect(() => {
    const onResize = () => moveIndicator(active, false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active]);

  React.useEffect(() => {
    moveIndicator(active);
  }, [active]);

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled ? "border-border/60 bg-background/70 backdrop-blur-xl" : "border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-20 w-full max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <div data-nav-logo>
            <Logo />
          </div>

          <nav aria-label="Primary" className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
            <div className="relative flex items-center gap-10 xl:gap-12" onMouseLeave={() => moveIndicator(active)}>
              {NAV_LINKS.map((link, index) => (
                <Link
                  key={link.label}
                  href={link.href}
                  data-nav-link
                  ref={(element) => {
                    itemRefs.current[index] = element;
                  }}
                  onMouseEnter={() => moveIndicator(index)}
                  onFocus={() => moveIndicator(index)}
                  onBlur={() => moveIndicator(active)}
                  onClick={() => setActive(index)}
                  aria-current={index === active ? "page" : undefined}
                  className={cn(
                    "rounded-sm py-2 text-[13px] font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
                    index === active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <span
                ref={indicatorRef}
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-0.5 left-0 h-0.5 w-0 rounded-full bg-primary shadow-[0_0_10px_rgb(var(--glow-color)/0.8)]"
              />
            </div>
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <div data-nav-right className="hidden sm:block">
              <NavbarThemeToggle />
            </div>
            <div data-nav-right className="hidden sm:block">
              <GetStarted />
            </div>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  data-nav-right
                  aria-label="Open menu"
                  aria-expanded={open}
                  className="grid size-11 place-items-center rounded-xl border border-border bg-card/50 text-foreground outline-none backdrop-blur-sm transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
                >
                  <Menu className="size-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[86%] max-w-sm border-border bg-background p-0">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                  <WaveBg flip intensity={0.65} />
                  <div className="absolute inset-0 bg-gradient-to-b from-background/35 via-background/20 to-background/55" />
                </div>
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                <SheetDescription className="sr-only">Main navigation links for CloudPoint</SheetDescription>
                <MobileMenuBody active={active} onSelect={setActive} onClose={() => setOpen(false)} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <div aria-hidden="true" className="h-20" />
    </>
  );
}
