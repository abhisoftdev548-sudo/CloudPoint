import type { Metadata } from "next";

import { AuthShell } from "@/components/auth/authShell";
import { SignupForm } from "@/components/auth/signupForm";

export const metadata: Metadata = { title: "Create account — CloudPoint" };

export default function SignupPage() {
  return (
    <AuthShell>
      <SignupForm />
    </AuthShell>
  );
}
