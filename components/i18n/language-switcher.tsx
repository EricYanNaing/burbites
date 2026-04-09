"use client";

import { type Locale } from "@/lib/i18n";
import { useI18n } from "./locale-provider";

type LanguageSwitcherProps = {
  className?: string;
  tone?: "light" | "dark";
};

const OPTIONS: Locale[] = ["en", "my"];

export function LanguageSwitcher({ className, tone = "light" }: LanguageSwitcherProps) {
  const { locale, messages, setLocale, isPending } = useI18n();

  const isLight = tone === "light";

  return (
    <div className={className}>
      <p className="sr-only">{messages.languageSwitcher.label}</p>
      <div
        className={`inline-flex items-center rounded-full border p-1 ${
          isLight
            ? "border-[#e8ddd4] bg-white shadow-sm"
            : "border-white/14 bg-white/8"
        }`}
      >
        {OPTIONS.map((option) => {
          const active = option === locale;
          const label =
            option === "en"
              ? messages.languageSwitcher.english
              : messages.languageSwitcher.burmese;

          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              disabled={isPending}
              onClick={() => setLocale(option)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                active
                  ? isLight
                    ? "bg-secondary text-white"
                    : "bg-white text-secondary"
                  : isLight
                    ? "text-secondary/72 hover:bg-[#f8f2ed]"
                    : "text-white/72 hover:bg-white/12"
              } ${isPending ? "cursor-not-allowed opacity-80" : "cursor-pointer"}`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
