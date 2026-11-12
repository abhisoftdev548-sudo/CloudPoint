import type { LoginPayload, SignupPayload } from "@/types";

/**
 * Auth service stubs — replace the bodies with real API / NextAuth / Clerk calls.
 */
export async function login(_payload: LoginPayload) {
  await new Promise((r) => setTimeout(r, 900));
  return { ok: true as const };
}

export async function signup(_payload: SignupPayload) {
  await new Promise((r) => setTimeout(r, 900));
  return { ok: true as const };
}
