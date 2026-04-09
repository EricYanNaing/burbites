import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  LayoutDashboard,
  ShieldCheck,
  Waypoints,
} from "lucide-react";
import type { ReactNode } from "react";

type AuthMode = "sign-in" | "sign-up";

type AuthShellProps = {
  children: ReactNode;
  mode: AuthMode;
};

const shellCopy = {
  "sign-in": {
    badge: "Secure access",
    eyebrow: "Dashboard login",
    title: "Sign in to your Burbites account.",
    description:
      "Use your registered email and password to continue. New users can create an account from the sign-up page.",
    switchLabel: "No account yet?",
    switchHref: "/auth/sign-up",
    switchCta: "Create account",
    policyDescription:
      "Anyone can register for an account. Elevated dashboard permissions are still assigned separately by the owner.",
  },
  "sign-up": {
    badge: "New account",
    eyebrow: "User onboarding",
    title: "Create your Burbites account.",
    description:
      "Register with your name, email, and password. After signup, role-based permissions still determine what you can access.",
    switchLabel: "Already registered?",
    switchHref: "/auth/sign-in",
    switchCta: "Go to sign in",
    policyDescription:
      "Signup is open for users, but admin privileges are not granted automatically. Those remain provisioned separately.",
  },
} satisfies Record<
  AuthMode,
  {
    badge: string;
    eyebrow: string;
    title: string;
    description: string;
    switchLabel: string;
    switchHref: string;
    switchCta: string;
    policyDescription: string;
  }
>;

const authHighlights = [
  {
    title: "Email-only auth",
    description: "A single credential flow keeps access predictable and easier to manage.",
    Icon: ShieldCheck,
  },
  {
    title: "Role-aware access",
    description: "Accounts can exist without automatically unlocking every dashboard view.",
    Icon: LayoutDashboard,
  },
  {
    title: "Managed permissions",
    description: "Sensitive privileges stay under manual control even when signup is enabled.",
    Icon: BadgeCheck,
  },
] as const;

export function AuthShell({ children, mode }: AuthShellProps) {
  const content = shellCopy[mode];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f4eee8] text-secondary">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(227,24,55,0.08),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.52),rgba(244,238,232,0.94))]" />

      <div className="relative mx-auto grid min-h-screen w-full max-w-7xl gap-6 px-4 py-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-8">
        <section className="relative overflow-hidden rounded-[32px] border border-[#e8ddd4] bg-[#26191a] text-white shadow-[0_24px_70px_rgba(42,20,24,0.16)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.12),transparent_22%),radial-gradient(circle_at_82%_22%,rgba(227,24,55,0.2),transparent_24%),linear-gradient(140deg,rgba(255,255,255,0.04),rgba(255,255,255,0)_38%)]" />
          <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:32px_32px]" />

          <div className="relative flex h-full flex-col justify-between gap-10 p-6 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/6 px-4 py-2 backdrop-blur-md transition hover:bg-white/10"
              >
                <Image src="/logo.png" alt="Burbites logo" width={42} height={42} />
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-white/60">
                    Auth center
                  </p>
                  <p className="font-display text-lg text-white">Burbites</p>
                </div>
              </Link>

              <span className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/72">
                {content.badge}
              </span>
            </div>

            <div className="max-w-2xl space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/70">
                <Waypoints className="h-3.5 w-3.5" />
                {content.eyebrow}
              </div>

              <div className="space-y-3">
                <h1 className="max-w-xl text-4xl font-black leading-[0.95] text-white sm:text-5xl lg:text-[3.35rem]">
                  {content.title}
                </h1>
                <p className="max-w-xl text-sm leading-6 text-white/72 sm:text-base">
                  {content.description}
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {authHighlights.map(({ title, description, Icon }) => (
                <article
                  key={title}
                  className="rounded-[24px] border border-white/10 bg-white/6 p-4 backdrop-blur-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-4 text-base font-bold text-white">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-white/65">
                    {description}
                  </p>
                </article>
              ))}
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/6 p-5">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/56">
                Access model
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
                <p className="max-w-md text-sm leading-6 text-white/72">
                  {content.policyDescription}
                </p>
                <Link
                  href={content.switchHref}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/8"
                >
                  {content.switchLabel} {content.switchCta}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center">
          <div className="relative w-full max-w-xl overflow-hidden rounded-[32px] border border-[#eadfd6] bg-white p-6 shadow-[0_24px_60px_rgba(84,43,48,0.08)] sm:p-8">
            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}
