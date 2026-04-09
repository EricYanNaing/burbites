"use client";

import { signInActionState, signUpActionState } from "@/app/auth/action";
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import Link from "next/link";
import { useActionState, useState, type ReactNode } from "react";
import { useFormStatus } from "react-dom";

type AuthMode = "sign-in" | "sign-up";
type AuthState = { error?: string } | undefined;

type AuthFormProps = {
  mode: AuthMode;
};

const formCopy = {
  "sign-in": {
    label: "Sign in",
    title: "Welcome back",
    description:
      "Enter your account credentials to continue into Burbites.",
    submitLabel: "Sign in",
    footerLabel: "Need an account?",
    footerHref: "/auth/sign-up",
    footerCta: "Create one",
    helperText: "Use the email and password already registered to your account.",
  },
  "sign-up": {
    label: "Create account",
    title: "Set up your account",
    description:
      "Create a user account with your name, email, and password.",
    submitLabel: "Create account",
    footerLabel: "Already have an account?",
    footerHref: "/auth/sign-in",
    footerCta: "Sign in",
    helperText: "Admin permissions, if needed, are assigned separately after signup.",
  },
} satisfies Record<
  AuthMode,
  {
    label: string;
    title: string;
    description: string;
    submitLabel: string;
    footerLabel: string;
    footerHref: string;
    footerCta: string;
    helperText: string;
  }
>;

export function AuthForm({ mode }: AuthFormProps) {
  const content = formCopy[mode];
  const action = mode === "sign-in" ? signInActionState : signUpActionState;

  const [formState, formAction] = useActionState<AuthState, FormData>(
    action,
    undefined,
  );
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-8 text-secondary">
      <div className="space-y-3">
        <div className="inline-flex rounded-full border border-primary/12 bg-primary/6 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-primary">
          {content.label}
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-[-0.03em] text-secondary sm:text-[2.3rem]">
            {content.title}
          </h1>
          <p className="max-w-lg text-sm leading-6 text-secondary/62 sm:text-[0.98rem]">
            {content.description}
          </p>
        </div>
      </div>

      <div className="grid gap-3 rounded-[28px] border border-[#efe4dc] bg-[#faf6f2] p-4 sm:grid-cols-3">
        <InfoPill label="Auth" value="Email only" />
        <InfoPill label="Permissions" value="Role based" />
        <InfoPill label="Next step" value="Dashboard" />
      </div>

      <form action={formAction} className="space-y-4">
        {mode === "sign-up" ? (
          <AuthField
            label="Full name"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            icon={<UserRound className="h-5 w-5" />}
          />
        ) : null}

        <AuthField
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          icon={<Mail className="h-5 w-5" />}
        />

        <AuthField
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
          placeholder={mode === "sign-in" ? "Enter your password" : "Create a password"}
          helper={content.helperText}
          icon={<LockKeyhole className="h-5 w-5" />}
          trailing={
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="rounded-full p-1 text-secondary/45 transition hover:text-primary"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          }
        />

        {formState?.error ? (
          <div
            aria-live="polite"
            className="rounded-[22px] border border-primary/20 bg-primary/10 px-4 py-3 text-sm leading-6 text-primary"
          >
            {formState.error}
          </div>
        ) : null}

        <SubmitButton label={content.submitLabel} />
      </form>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[24px] border border-dashed border-[#e7dacf] bg-[#fcfaf8] px-4 py-4 text-sm leading-6 text-secondary/58">
        <span>{content.footerLabel}</span>
        <Link
          href={content.footerHref}
          className="font-semibold text-primary transition hover:text-[#b9112f]"
        >
          {content.footerCta}
        </Link>
      </div>
    </div>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[20px] border border-white bg-white px-4 py-3 shadow-sm">
      <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-secondary/40">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-secondary">{value}</p>
    </div>
  );
}

function AuthField({
  autoComplete,
  helper,
  icon,
  label,
  name,
  placeholder,
  trailing,
  type = "text",
}: {
  autoComplete?: string;
  helper?: string;
  icon: ReactNode;
  label: string;
  name: string;
  placeholder: string;
  trailing?: ReactNode;
  type?: string;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-secondary">{label}</span>
      <span className="flex items-center gap-3 rounded-[22px] border border-[#eadfd6] bg-[#faf6f2] px-4 py-3.5 transition focus-within:border-primary/25 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(227,24,55,0.08)]">
        <span className="shrink-0 text-primary">{icon}</span>
        <input
          required
          name={name}
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className="w-full border-0 bg-transparent text-[0.98rem] text-secondary outline-none placeholder:text-secondary/34"
        />
        {trailing}
      </span>
      {helper ? (
        <p className="px-1 text-xs leading-5 text-secondary/46">{helper}</p>
      ) : null}
    </label>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center rounded-[22px] bg-secondary px-5 py-4 text-sm font-semibold text-white shadow-[0_18px_35px_rgba(38,25,26,0.16)] transition hover:bg-[#1d1213] disabled:cursor-not-allowed disabled:bg-secondary/70"
    >
      {pending ? "Working..." : label}
    </button>
  );
}
