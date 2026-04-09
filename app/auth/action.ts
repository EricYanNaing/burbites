"use server";

import { auth } from "@/lib/auth/server";
import { getServerMessages } from "@/lib/i18n/server";
import { redirect } from "next/navigation";

type AuthActionState = {
  error?: string;
  success?: string;
};

function getErrorMessage(error: unknown, fallbackMessage: string) {
  if (typeof error === "object" && error !== null && "message" in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string" && message.length > 0) {
      return message;
    }
  }

  return fallbackMessage;
}

function getErrorCode(error: unknown) {
  if (typeof error === "object" && error !== null && "code" in error) {
    const code = (error as { code?: unknown }).code;
    if (typeof code === "string" && code.length > 0) {
      return code;
    }
  }

  return "";
}

function isEmailVerificationError(error: unknown) {
  const code = getErrorCode(error).toLowerCase();
  const message = getErrorMessage(error, "").toLowerCase();

  return (
    code.includes("confirm") ||
    code.includes("verification") ||
    message.includes("not confirmed") ||
    (message.includes("verify") && message.includes("email"))
  );
}

function getEncodedEmail(formData: FormData) {
  return encodeURIComponent((formData.get("email") as string) ?? "");
}

export async function signUpAction(formData: FormData) {
  const fallbackMessage = (await getServerMessages()).authAction.fallbackError;
  const { data, error } = await auth.signUp.email({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    name: formData.get("name") as string,
  });

  if (error) {
    return { error: getErrorMessage(error, fallbackMessage) };
  }

  if (!data?.user.emailVerified) {
    redirect(`/auth/verify-email?email=${getEncodedEmail(formData)}&source=sign-up`);
  }

  redirect("/dashboard");
}

export async function signUpActionState(
  _state: AuthActionState | undefined,
  formData: FormData,
) {
  const fallbackMessage = (await getServerMessages()).authAction.fallbackError;
  const { data, error } = await auth.signUp.email({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    name: formData.get("name") as string,
  });

  if (error) {
    return { error: getErrorMessage(error, fallbackMessage) };
  }

  if (!data?.user.emailVerified) {
    redirect(`/auth/verify-email?email=${getEncodedEmail(formData)}&source=sign-up`);
  }

  redirect("/dashboard");
}

export async function signInAction(formData: FormData) {
  const fallbackMessage = (await getServerMessages()).authAction.fallbackError;
  const { error } = await auth.signIn.email({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    if (isEmailVerificationError(error)) {
      redirect(`/auth/verify-email?email=${getEncodedEmail(formData)}&source=sign-in`);
    }

    return { error: getErrorMessage(error, fallbackMessage) };
  }

  redirect("/dashboard");
}

export async function signInActionState(
  _state: AuthActionState | undefined,
  formData: FormData,
) {
  const fallbackMessage = (await getServerMessages()).authAction.fallbackError;
  const { error } = await auth.signIn.email({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    if (isEmailVerificationError(error)) {
      redirect(`/auth/verify-email?email=${getEncodedEmail(formData)}&source=sign-in`);
    }

    return { error: getErrorMessage(error, fallbackMessage) };
  }

  redirect("/dashboard");
}

export async function signOutAction() {
  await auth.signOut();
  redirect("/auth/sign-in");
}
