import type { Metadata } from "next";

import { AuthShell } from "@/components/auth/authShell";
import { LoginForm } from "@/components/auth/loginForm";

export const metadata: Metadata = { title: "Sign in — CloudPoint" };

export default function LoginPage() {
  return (
    <AuthShell>
      <LoginForm />
    </AuthShell>
  );
}
