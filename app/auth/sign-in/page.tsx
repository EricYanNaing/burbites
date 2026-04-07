"use client";

import { AuthView } from "@neondatabase/auth/react/ui";

export default function SignInPage() {
    return (
        <div className="mx-auto flex min-h-screen w-full max-w-lg items-center justify-center px-6 py-10">
            <div className="w-full">
                <AuthView path="sign-in" />
            </div>
        </div>
    );
}
