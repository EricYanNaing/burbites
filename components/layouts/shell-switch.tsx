"use client";

import { usePathname } from "next/navigation";
import { AppShell } from "./app-shell";
import AdminShell from "./admin-shell";

function isAuthPath(pathname: string) {
    return pathname.startsWith("/auth");
}

export function ShellSwitch({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    if (pathname.startsWith("/dashboard")) {
        return children;
    }

    if (isAuthPath(pathname)) {
        return <AdminShell>{children}</AdminShell>;
    }

    return <AppShell>{children}</AppShell>;
}
