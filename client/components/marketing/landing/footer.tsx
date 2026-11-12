import Link from "next/link";

import { cn } from "@/lib/utils";
import { FOOTER_COLUMNS, LEGAL_LINKS, SITE, SOCIAL_LINKS } from "@/constants/site";
import { styles } from "@/constants/styles";
import { Logo } from "@/components/common/logo";

export function Footer() {
  return (
    <footer className={styles.footerRoot}>
      <div className={cn(styles.container, "py-12")}>
        <div className="grid gap-10 md:grid-cols-[1.3fr_2fr_auto] md:items-start">
          <Logo showTagline />

          <div className="grid grid-cols-3 gap-6">
            {FOOTER_COLUMNS.map((c) => (
              <div key={c.title}>
                <h4 className={styles.footerHeading}>{c.title}</h4>
                <ul className="space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className={styles.footerLink}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-5 text-foreground/80">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} aria-label={label} className={styles.footerSocial}>
                <Icon className="size-[18px]" />
              </a>
            ))}
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>{SITE.copyright}</p>
          <div className="flex gap-6">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.label} href={l.href} className="hover:text-foreground">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
