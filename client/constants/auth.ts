import { ROUTES } from "@/constants/routes";

export const AUTH_BRAND = {
  lineOne: "BUILDING",
  lineTwoPlain: "WHAT",
  lineTwoAccent: "LASTS",
  description:
    "Powerful VPS hosting with complete control, unmatched performance and zero complexity.",
};

export const LOGIN_COPY = {
  title: "Welcome Back",
  subtitle: "Sign in to your CloudPoint account",
  emailPlaceholder: "Email address",
  passwordPlaceholder: "Password",
  remember: "Remember me",
  forgot: "Forgot password?",
  submit: "Sign In",
  divider: "Or continue with",
  noAccount: "Don't have an account?",
  switchLabel: "Sign up",
  switchHref: ROUTES.signup,
};

export const SIGNUP_COPY = {
  title: "Create Account",
  subtitle: "Start your journey with CloudPoint",
  namePlaceholder: "Full name",
  emailPlaceholder: "Email address",
  passwordPlaceholder: "Password",
  submit: "Create Account",
  haveAccount: "Already have an account?",
  switchLabel: "Sign in",
  switchHref: ROUTES.login,
};
