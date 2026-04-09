export const locales = ["en", "my"] as const;

export type Locale = (typeof locales)[number];

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE_NAME = "burbites-locale";

export function isLocale(value: string | null | undefined): value is Locale {
  if (!value) {
    return false;
  }

  return locales.includes(value as Locale);
}

export function normalizeLocale(value: string | null | undefined): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}
