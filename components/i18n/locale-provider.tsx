"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import {
  LOCALE_COOKIE_NAME,
  messages,
  type Locale,
  type Messages,
} from "@/lib/i18n";

type LocaleContextValue = {
  locale: Locale;
  messages: Messages;
  setLocale: (nextLocale: Locale) => void;
  isPending: boolean;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

type LocaleProviderProps = {
  children: ReactNode;
  initialLocale: Locale;
};

export function LocaleProvider({ children, initialLocale }: LocaleProviderProps) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setLocaleState(initialLocale);
  }, [initialLocale]);

  const setLocale = useCallback(
    (nextLocale: Locale) => {
      if (nextLocale === locale) {
        return;
      }

      setLocaleState(nextLocale);
      document.cookie = `${LOCALE_COOKIE_NAME}=${nextLocale}; path=/; max-age=${ONE_YEAR_IN_SECONDS}; samesite=lax`;
      document.documentElement.lang = nextLocale;

      startTransition(() => {
        router.refresh();
      });
    },
    [locale, router],
  );

  const value = useMemo<LocaleContextValue>(() => {
    return {
      locale,
      messages: messages[locale],
      setLocale,
      isPending,
    };
  }, [isPending, locale, setLocale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useI18n() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useI18n must be used inside LocaleProvider");
  }

  return context;
}
