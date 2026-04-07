"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { NeonAuthUIProvider } from "@neondatabase/auth/react/ui";
import "@neondatabase/auth/ui/css";
import { authClient } from "@/lib/auth/client";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    // Neon Auth UI currently resolves a parallel package type graph in this install.
    // The runtime client is correct; we coerce the prop type to bridge the duplicate package instances.
    const providerAuthClient = authClient as never;

    return (
        <div>
            <div className="flex items-center justify-center gap-2">
                <img src='/logo.png' alt="Logo" width={60} />
                <span className="text-red-500 text-2xl font-bold">Burbites</span>
            </div>
            <NeonAuthUIProvider
                authClient={providerAuthClient}
                navigate={router.push}
                replace={router.replace}
                onSessionChange={() => router.refresh()}
                redirectTo="/dashboard"
                social={{ providers: ["google"] }}
                Link={Link}
            >
                {children}
            </NeonAuthUIProvider>
        </div>
    );
}
