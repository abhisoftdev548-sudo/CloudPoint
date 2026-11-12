"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";

import { SIGNUP_COPY as C } from "@/constants/auth";
import { styles } from "@/constants/styles";
import { signup } from "@/services/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/auth/passwordInput";

export function SignupForm() {
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setLoading(true);
    await signup({
      name: String(fd.get("name")),
      email: String(fd.get("email")),
      password: String(fd.get("password")),
    });
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
          <Label htmlFor="name" className="sr-only">{C.namePlaceholder}</Label>
          <Input id="name" name="name" placeholder={C.namePlaceholder} autoComplete="name" required />
        </div>
        <div data-auth-item>
          <Label htmlFor="email" className="sr-only">{C.emailPlaceholder}</Label>
          <Input id="email" name="email" type="email" placeholder={C.emailPlaceholder} autoComplete="email" required />
        </div>
        <div data-auth-item>
          <Label htmlFor="password" className="sr-only">{C.passwordPlaceholder}</Label>
          <PasswordInput id="password" name="password" placeholder={C.passwordPlaceholder} autoComplete="new-password" minLength={8} required />
        </div>
        <div data-auth-item>
          <Button type="submit" size="md" disabled={loading} className="w-full">
            {loading ? <Loader2 className="animate-spin" /> : (<>{C.submit} <ArrowRight /></>)}
          </Button>
        </div>
      </form>

      <p data-auth-item className={styles.authSwitch}>
        {C.haveAccount}{" "}
        <Link href={C.switchHref} className={styles.link}>{C.switchLabel}</Link>
      </p>
    </>
  );
}
