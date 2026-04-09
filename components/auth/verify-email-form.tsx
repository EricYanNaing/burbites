"use client";

import {
  authClient,
} from "@/lib/auth/client";
import { Eye, MailCheck, RotateCw } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

export function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const source = searchParams.get("source");
  const verified = searchParams.get("verified");
  const defaultEmail = searchParams.get("email") ?? "";

  const [email, setEmail] = useState(defaultEmail);
  const [otp, setOtp] = useState("");
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [resendError, setResendError] = useState<string | null>(null);
  const [resendSuccess, setResendSuccess] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const sourceMessage = useMemo(() => {
    if (verified === "1") {
      return "Your email is verified. You can sign in now.";
    }

    if (source === "sign-up") {
      return "Your account was created. Enter the verification code Neon emailed you.";
    }

    if (source === "sign-in") {
      return "Your account exists, but the email still needs to be verified before sign-in.";
    }

    return "Enter the email verification code to continue.";
  }, [source, verified]);

  async function handleVerify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email || !otp) {
      setVerifyError("Enter both your email address and verification code.");
      return;
    }

    setIsVerifying(true);
    setVerifyError(null);

    const { data, error } = await authClient.emailOtp.verifyEmail({
      email,
      otp,
    });

    setIsVerifying(false);

    if (error) {
      setVerifyError(error.message || "Could not verify the code. Try again.");
      return;
    }

    if (data?.token) {
      router.push("/dashboard");
      return;
    }

    router.push(`/auth/sign-in?verified=1&email=${encodeURIComponent(email)}`);
  }

  async function handleResend(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email) {
      setResendError("Enter your email address before requesting another code.");
      setResendSuccess(null);
      return;
    }

    setIsResending(true);
    setResendError(null);
    setResendSuccess(null);

    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: "email-verification",
    });

    setIsResending(false);

    if (error) {
      setResendError(
        error.message || "Could not send a new verification code right now.",
      );
      return;
    }

    setResendSuccess("A new verification code was sent to your email.");
  }

  return (
    <div className="space-y-8 text-secondary">
      <div className="space-y-3">
        <div className="inline-flex rounded-full border border-primary/12 bg-primary/6 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-primary">
          Verify email
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-[-0.03em] text-secondary sm:text-[2.3rem]">
            Confirm your email
          </h1>
          <p className="max-w-lg text-sm leading-6 text-secondary/62 sm:text-[0.98rem]">
            {sourceMessage}
          </p>
        </div>
      </div>

      <div className="grid gap-3 rounded-[28px] border border-[#efe4dc] bg-[#faf6f2] p-4 sm:grid-cols-3">
        <InfoPill label="Method" value="Email code" />
        <InfoPill label="Required for" value="First access" />
        <InfoPill label="After verify" value="Dashboard or sign in" />
      </div>

      <form onSubmit={handleVerify} className="space-y-4">
        <AuthField
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={setEmail}
          icon={<MailCheck className="h-5 w-5" />}
        />

        <AuthField
          label="Verification code"
          name="otp"
          type="text"
          autoComplete="one-time-code"
          placeholder="Enter the code"
          value={otp}
          onChange={setOtp}
          helper="Paste the code exactly as it appears in the email."
          icon={<Eye className="h-5 w-5" />}
        />

        {verifyError ? <Feedback tone="error">{verifyError}</Feedback> : null}

        <VerifyButton pending={isVerifying} />
      </form>

      <form
        onSubmit={handleResend}
        className="space-y-4 rounded-[24px] border border-dashed border-[#e7dacf] bg-[#fcfaf8] p-4"
      >
        <div className="space-y-1">
          <p className="text-sm font-semibold text-secondary">Didn’t get the code?</p>
          <p className="text-sm leading-6 text-secondary/58">
            Resend a new verification code to the same email address.
          </p>
        </div>

        {resendError ? <Feedback tone="error">{resendError}</Feedback> : null}
        {resendSuccess ? <Feedback tone="success">{resendSuccess}</Feedback> : null}

        <ResendButton pending={isResending} />
      </form>

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-secondary/58">
        <span>Already verified or want to try signing in?</span>
        <Link
          href={`/auth/sign-in${email ? `?email=${encodeURIComponent(email)}` : ""}`}
          className="font-semibold text-primary transition hover:text-[#b9112f]"
        >
          Back to sign in
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
  helper,
  icon,
  label,
  name,
  onChange,
  placeholder,
  type,
  value,
  autoComplete,
}: {
  helper?: string;
  icon: ReactNode;
  label: string;
  name: string;
  onChange: (value: string) => void;
  placeholder: string;
  type: string;
  value: string;
  autoComplete?: string;
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
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full border-0 bg-transparent text-[0.98rem] text-secondary outline-none placeholder:text-secondary/34"
        />
      </span>
      {helper ? (
        <p className="px-1 text-xs leading-5 text-secondary/46">{helper}</p>
      ) : null}
    </label>
  );
}

function Feedback({
  children,
  tone,
}: {
  children: ReactNode;
  tone: "error" | "success";
}) {
  const classes =
    tone === "error"
      ? "border-primary/20 bg-primary/10 text-primary"
      : "border-[#cce9da] bg-[#eef9f2] text-[#177245]";

  return (
    <div
      aria-live="polite"
      className={`rounded-[22px] border px-4 py-3 text-sm leading-6 ${classes}`}
    >
      {children}
    </div>
  );
}

function VerifyButton({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center rounded-[22px] bg-secondary px-5 py-4 text-sm font-semibold text-white shadow-[0_18px_35px_rgba(38,25,26,0.16)] transition hover:bg-[#1d1213] disabled:cursor-not-allowed disabled:bg-secondary/70"
    >
      {pending ? "Verifying..." : "Verify email"}
    </button>
  );
}

function ResendButton({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-[18px] border border-[#eadfd6] bg-white px-4 py-3 text-sm font-semibold text-secondary transition hover:bg-[#faf6f2] disabled:cursor-not-allowed disabled:opacity-70"
    >
      <RotateCw className={`h-4 w-4 ${pending ? "animate-spin" : ""}`} />
      {pending ? "Sending..." : "Resend code"}
    </button>
  );
}
