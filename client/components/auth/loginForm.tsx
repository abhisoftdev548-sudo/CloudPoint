"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { LOGIN_COPY as C } from "@/constants/auth";
import { ROUTES } from "@/constants/routes";
import { styles } from "@/constants/styles";
import { login } from "@/services/auth";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GithubIcon, GoogleIcon } from "@/components/common/brandIcons";
import { PasswordInput } from "@/components/auth/passwordInput";

export function LoginForm() {
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setLoading(true);
    await login({ email: String(fd.get("email")), password: String(fd.get("password")) });
    setLoading(false);
  }

  return (
    <>
      <div data-auth-item>
        <h1 className={styles.authTitle}>{C.title}</h1>
        <p className={styles.authSubtitle}>{C.subtitle}</p>
      </div>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div data-auth-item>
          <Label htmlFor="email" className="sr-only">{C.emailPlaceholder}</Label>
          <Input id="email" name="email" type="email" placeholder={C.emailPlaceholder} autoComplete="email" required />
        </div>
        <div data-auth-item>
          <Label htmlFor="password" className="sr-only">{C.passwordPlaceholder}</Label>
          <PasswordInput id="password" name="password" placeholder={C.passwordPlaceholder} autoComplete="current-password" required />
        </div>

        <div data-auth-item className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-xs text-foreground/80">
            <Checkbox id="remember" />
            {C.remember}
          </label>
          <Link href="#" className={cn(styles.link, "text-xs")}>{C.forgot}</Link>
        </div>

        <div data-auth-item>
          <Button type="submit" size="md" disabled={loading} className="w-full">
            {loading ? <Loader2 className="animate-spin" /> : (<>{C.submit} <ArrowRight /></>)}
          </Button>
        </div>
      </form>

      <div data-auth-item className={styles.authDivider}>
        <span className="h-px flex-1 bg-border" />
        {C.divider}
        <span className="h-px flex-1 bg-border" />
      </div>

      <div data-auth-item className="flex items-center justify-center gap-5">
        <button type="button" aria-label="Continue with GitHub" className={styles.authSocialBtn}>
          <GithubIcon className="size-5" />
        </button>
        <button type="button" aria-label="Continue with Google" className={styles.authSocialBtn}>
          <GoogleIcon className="size-5" />
        </button>
      </div>

      <p data-auth-item className={styles.authSwitch}>
        {C.noAccount}{" "}
        <Link href={C.switchHref ?? ROUTES.signup} className={styles.link}>{C.switchLabel}</Link>
      </p>
    </>
  );
}
