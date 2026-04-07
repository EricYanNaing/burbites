"use client";

import { usePathname } from "next/navigation";
import { AppShell } from "./app-shell";
import AdminShell from "./admin-shell";

function isAdminPath(pathname: string) {
    return pathname.startsWith("/auth") || pathname.startsWith("/dashboard");
}

export function ShellSwitch({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    if (isAdminPath(pathname)) {
        return <AdminShell>{children}</AdminShell>;
    }

    return <AppShell>{children}</AppShell>;
}
