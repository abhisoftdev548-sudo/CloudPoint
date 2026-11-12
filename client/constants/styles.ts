/**
 * Centralised Tailwind classes.
 * Change a class here and it updates everywhere it is used.
 * (Component-level variants such as buttons live in components/ui/*.)
 */
export const styles = {
  /* ---------- layout ---------- */
  container: "mx-auto w-full max-w-7xl px-6 lg:px-10",
  containerMd: "mx-auto w-full max-w-6xl px-6 lg:px-10",
  pageRoot: "relative isolate overflow-x-clip",
  glowLanding:
    "pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_35%_at_85%_8%,rgb(var(--glow-color)/0.14),transparent),radial-gradient(40%_30%_at_5%_60%,rgb(var(--glow-color)/0.08),transparent)]",
  glowPricing:
    "absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_20%,rgb(var(--glow-color)/0.14),transparent)]",

  /* ---------- typography ---------- */
  eyebrow:
    "text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-brand-purple dark:text-brand-lavender",
  displayHero:
    "font-display text-[clamp(3.4rem,9vw,7.2rem)] leading-[0.95] tracking-tight text-foreground",
  displayBrand:
    "font-display text-6xl leading-none tracking-tight text-foreground xl:text-7xl",
  displaySection:
    "font-display text-5xl leading-[1.05] tracking-tight text-foreground md:text-6xl",
  displayItalic:
    "font-display text-5xl italic leading-[1.05] tracking-tight text-foreground md:text-6xl",
  displayBanner:
    "font-display text-4xl italic leading-tight tracking-tight text-foreground md:text-5xl",
  displayStat: "font-display text-5xl tracking-tight text-foreground",
  lineMask: "block overflow-hidden pb-2",
  lineMaskIndent: "block overflow-hidden pb-3 pl-[0.55em]",
  accent: "text-brand-purple dark:text-brand-lavender",
  accentItalic: "italic text-brand-purple dark:text-brand-lavender",
  bodyLg: "text-[0.95rem] leading-relaxed text-foreground/75",
  body: "text-[0.9rem] leading-relaxed text-foreground/70",
  bodySm: "text-[0.8rem] text-foreground/70",
  muted: "text-xs text-muted-foreground",
  link: "font-medium text-brand-purple hover:underline dark:text-brand-lavender",

  /* ---------- surfaces ---------- */
  card: "card-surface rounded-2xl",
  cardHover: "pricing-card-hover",
  cardPopular:
    "border-brand-purple/70 shadow-[0_0_0_1px_rgb(var(--glow-color)/0.35),0_24px_60px_-20px_rgb(var(--glow-color)/0.55)]",

  /* ---------- navbar ---------- */
  navBar: "flex h-20 items-center justify-between",
  navLinks: "hidden items-center gap-9 md:flex",
  navLink: "relative py-1 text-[0.8rem] font-medium transition-colors hover:text-foreground",
  navLinkActive: "text-foreground",
  navLinkIdle: "text-foreground/70",
  navUnderline: "absolute inset-x-0 -bottom-1 h-px bg-brand-purple dark:bg-brand-lavender",
  navMobileLink: "block rounded-lg px-3 py-2 text-sm hover:bg-accent",

  /* ---------- hero ---------- */
  heroWave:
    "pointer-events-none absolute -right-10 top-0 -z-10 h-[115%] w-[85%] [mask-image:radial-gradient(ellipse_75%_70%_at_65%_45%,black_45%,transparent_100%)] md:w-[70%]",
  heroText: "mt-7 max-w-[21rem]",
  featureGrid: "mt-16 grid grid-cols-2 gap-3 md:max-w-3xl md:grid-cols-4 lg:mt-24",
  chip: "card-surface flex items-center gap-3 rounded-xl px-4 py-4 transition-transform duration-300 hover:-translate-y-1",
  chipIcon: "size-5 shrink-0 text-brand-purple dark:text-brand-lavender",
  chipTitle: "text-[0.72rem] font-semibold leading-tight text-foreground",
  chipSub: "text-[0.66rem] leading-tight text-muted-foreground",
  playCircle:
    "grid size-9 place-items-center rounded-full border border-brand-purple/50 text-brand-purple transition-colors group-hover:bg-brand-purple group-hover:text-white dark:border-brand-lavender/50 dark:text-brand-lavender",

  /* ---------- stats ---------- */
  statsGrid: "mt-14 grid grid-cols-2 gap-y-8 md:grid-cols-4 md:divide-x md:divide-border",

  /* ---------- billing toggle ---------- */
  togglePill:
    "inline-flex items-center rounded-xl border border-border bg-card/70 p-1 text-xs backdrop-blur dark:border-white/10 dark:bg-white/[0.04]",
  toggleItem: "flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-all",
  toggleActive: "bg-brand-purple text-white",
  toggleIdle: "text-foreground/70 hover:text-foreground",

  /* ---------- footer ---------- */
  footerRoot:
    "relative z-10 border-t border-border/70 bg-card/40 backdrop-blur-sm dark:bg-black/20",
  footerHeading: "mb-4 text-xs font-semibold text-foreground",
  footerLink: "text-[0.72rem] text-muted-foreground transition-colors hover:text-foreground",
  footerSocial: "transition-colors hover:text-brand-purple dark:hover:text-brand-lavender",
  footerBottom:
    "mt-10 flex flex-col gap-3 border-t border-border/70 pt-5 text-[0.68rem] text-muted-foreground sm:flex-row sm:items-center sm:justify-between",

  /* ---------- auth ---------- */
  authCard: "card-surface relative w-full max-w-[420px] overflow-hidden rounded-2xl p-7 sm:p-8",
  authTitle: "text-xl font-semibold tracking-tight text-foreground",
  authSubtitle: "mt-1 text-xs text-muted-foreground",
  authSwitch: "mt-5 text-center text-[0.72rem] text-muted-foreground",
  authDivider: "my-5 flex items-center gap-3 text-[0.7rem] text-muted-foreground",
  authSocialBtn:
    "grid size-10 place-items-center rounded-full border border-border bg-card/60 text-foreground transition-all hover:-translate-y-0.5 hover:border-brand-purple/60 dark:border-white/10 dark:bg-white/[0.04]",
} as const;
