"use client";

import { AuthProvider } from "@/components/auth/auth-provider";

export default function AdminShell({ children }: { children: React.ReactNode }) {
    return (
        <section className="min-h-screen bg-[#f4eee8]">
            <div className="mx-auto min-h-screen w-full bg-white">
                <AuthProvider>{children}</AuthProvider>
            </div>
        </section>
    );
}
