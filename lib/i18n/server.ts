import "server-only";

import { cookies } from "next/headers";

import { LOCALE_COOKIE_NAME, normalizeLocale } from "./config";
import { messages } from "./messages";

export async function getServerLocale() {
  const cookieStore = await cookies();
  const localeValue = cookieStore.get(LOCALE_COOKIE_NAME)?.value;

  return normalizeLocale(localeValue);
}

export async function getServerMessages() {
  const locale = await getServerLocale();

  return messages[locale];
}
