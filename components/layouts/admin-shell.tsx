"use client";

import { signOutAction } from "@/app/auth/action";
import {
    BellDot,
    ChartNoAxesCombined,
    ChevronRight,
    LayoutDashboard,
    LogOut,
    Menu,
    Settings,
    ShieldCheck,
    Store,
    Users,
    X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState, type ComponentType } from "react";

type AdminShellProps = {
    children: React.ReactNode;
};

type NavItem = {
    activeMatch?: "exact" | "segment";
    description: string;
    href?: string;
    Icon: ComponentType<{ className?: string }>;
    label: string;
    soon?: boolean;
};

const primaryMenu: NavItem[] = [
    {
        label: "Overview",
        href: "/dashboard",
        description: "Summary, alerts, and daily activity.",
        Icon: LayoutDashboard,
        activeMatch: "exact",
    },
    {
        label: "Shops",
        description: "Manage storefronts and availability.",
        Icon: Store,
        href: "/dashboard/shops",
        soon: false,
        activeMatch: "segment",
    },
    {
        label: "Customers",
        description: "Review users and account activity.",
        Icon: Users,
        soon: true,
    },
    {
        label: "Analytics",
        description: "Track performance and growth.",
        Icon: ChartNoAxesCombined,
        soon: true,
    },
];

const secondaryMenu: NavItem[] = [
    {
        label: "Security",
        description: "Permissions, sessions, and controls.",
        Icon: ShieldCheck,
        soon: true,
    },
    {
        label: "Settings",
        description: "Workspace preferences and setup.",
        Icon: Settings,
        soon: true,
    },
];

function isActivePath(
    pathname: string,
    href?: string,
    activeMatch: NavItem["activeMatch"] = "segment",
) {
    if (!href) {
        return false;
    }

    if (activeMatch === "exact") {
        return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
}

function getPageTitle(pathname: string) {
    if (pathname === "/dashboard") {
        return "Dashboard";
    }

    const segment = pathname.split("/").filter(Boolean).at(-1);

    if (!segment) {
        return "Dashboard";
    }

    return segment
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
}

export default function AdminShell({ children }: AdminShellProps) {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    const pageTitle = useMemo(() => getPageTitle(pathname), [pathname]);

    return (
        <section className="min-h-screen bg-[#f4eee8] text-secondary">
            <div className="mx-auto flex min-h-screen w-full bg-[#f7f1eb]">
                <aside className="hidden w-[304px] shrink-0 border-r border-[#eaded4] bg-[#26191a] text-white lg:flex">
                    <SidebarContent pathname={pathname} />
                </aside>

                <div className="flex min-h-screen min-w-0 flex-1 flex-col">
                    <header className="sticky top-0 z-30 border-b border-[#eaded4] bg-[#f7f1eb]/92 backdrop-blur">
                        <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                            <div className="flex min-w-0 items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setMenuOpen(true)}
                                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#e8ddd4] bg-white text-secondary shadow-sm transition hover:bg-[#fdfaf8] lg:hidden"
                                    aria-label="Open dashboard menu"
                                >
                                    <Menu className="h-5 w-5" />
                                </button>

                                <div className="min-w-0">
                                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-primary/74">
                                        Admin workspace
                                    </p>
                                    <h1 className="truncate text-xl font-black text-secondary sm:text-2xl">
                                        {pageTitle}
                                    </h1>
                                </div>
                            </div>

                            <div className="hidden items-center gap-3 sm:flex">
                                <div className="rounded-full border border-[#eaded4] bg-white px-4 py-2 text-sm font-semibold text-secondary shadow-sm">
                                    Live dashboard
                                </div>
                                <button
                                    type="button"
                                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#e8ddd4] bg-white text-secondary shadow-sm transition hover:bg-[#fdfaf8]"
                                    aria-label="Notifications"
                                >
                                    <BellDot className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
                        <div className="mx-auto w-full max-w-7xl">{children}</div>
                    </main>
                </div>
            </div>

            <div
                className={`fixed inset-0 z-50 lg:hidden ${menuOpen ? "pointer-events-auto" : "pointer-events-none"
                    }`}
                aria-hidden={!menuOpen}
            >
                <button
                    type="button"
                    aria-label="Close dashboard menu"
                    onClick={() => setMenuOpen(false)}
                    className={`absolute inset-0 bg-[#1e1214]/48 transition ${menuOpen ? "opacity-100" : "opacity-0"
                        }`}
                />

                <aside
                    className={`absolute left-0 top-0 h-full w-[86vw] max-w-[320px] border-r border-white/8 bg-[#26191a] text-white shadow-[0_24px_60px_rgba(0,0,0,0.32)] transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
                        <div className="flex items-center gap-3">
                            <Image src="/logo.png" alt="Burbites logo" width={36} height={36} />
                            <div>
                                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-white/56">
                                    Dashboard menu
                                </p>
                                <p className="font-display text-lg text-white">Burbites</p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setMenuOpen(false)}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-white"
                            aria-label="Close dashboard menu"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <SidebarContent
                        pathname={pathname}
                        mobile
                        onNavigate={() => setMenuOpen(false)}
                    />
                </aside>
            </div>
        </section>
    );
}

function SidebarContent({
    mobile = false,
    onNavigate,
    pathname,
}: {
    mobile?: boolean;
    onNavigate?: () => void;
    pathname: string;
}) {
    return (
        <div className="flex h-full w-full flex-col">
            <div className="border-b border-white/8 px-5 pb-5 pt-6">
                <Link href="/" onClick={onNavigate} className="inline-flex items-center gap-3">
                    <Image src="/logo.png" alt="Burbites logo" width={44} height={44} />
                    <div>
                        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-white/56">
                            Internal workspace
                        </p>
                        <p className="font-display text-xl text-white">Burbites</p>
                    </div>
                </Link>

                <div className="mt-5 rounded-[24px] border border-white/8 bg-white/6 p-4">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/52">
                        Control center
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/72">
                        Start from overview, then grow this menu as new dashboard pages land.
                    </p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-5">
                <MenuGroup
                    label="Main menu"
                    items={primaryMenu}
                    onNavigate={onNavigate}
                    pathname={pathname}
                />
                <MenuGroup
                    label="System"
                    items={secondaryMenu}
                    onNavigate={onNavigate}
                    pathname={pathname}
                />
            </div>

            <div className="border-t border-white/8 p-4">
                <div className="rounded-[24px] border border-white/8 bg-white/6 p-4">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/52">
                        Session
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/72">
                        Dashboard shell is responsive and ready for mobile navigation.
                    </p>
                    <form action={signOutAction} className="mt-4">
                        <button
                            type="submit"
                            onClick={onNavigate}
                            className={`inline-flex w-full items-center justify-between rounded-[18px] border border-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/8 ${mobile ? "bg-white/8" : "bg-black/18"
                                }`}
                        >
                            Sign out
                            <LogOut className="h-4 w-4" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

function MenuGroup({
    items,
    label,
    onNavigate,
    pathname,
}: {
    items: NavItem[];
    label: string;
    onNavigate?: () => void;
    pathname: string;
}) {
    return (
        <div className="mb-6">
            <p className="px-2 text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-white/40">
                {label}
            </p>
            <div className="mt-3 space-y-2">
                {items.map((item) => (
                    <MenuItem
                        key={item.label}
                        item={item}
                        onNavigate={onNavigate}
                        pathname={pathname}
                    />
                ))}
            </div>
        </div>
    );
}

function MenuItem({
    item,
    onNavigate,
    pathname,
}: {
    item: NavItem;
    onNavigate?: () => void;
    pathname: string;
}) {
    const active = isActivePath(pathname, item.href, item.activeMatch);

    const content = (
        <div
            className={`group flex items-center gap-3 rounded-[22px] border px-3 py-3 transition ${active
                    ? "border-white/16 bg-white text-secondary shadow-[0_16px_34px_rgba(0,0,0,0.16)]"
                    : "border-transparent bg-white/5 text-white hover:border-white/10 hover:bg-white/8"
                }`}
        >
            <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${active ? "bg-primary text-white" : "bg-white/8 text-white"
                    }`}
            >
                <item.Icon className="h-5 w-5" />
            </div>

            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                    <p
                        className={`truncate text-sm font-semibold ${active ? "text-secondary" : "text-white"
                            }`}
                    >
                        {item.label}
                    </p>
                    {item.soon ? (
                        <span
                            className={`rounded-full px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] ${active
                                    ? "bg-secondary/8 text-secondary/56"
                                    : "bg-white/10 text-white/56"
                                }`}
                        >
                            Soon
                        </span>
                    ) : null}
                </div>
                <p
                    className={`mt-1 text-xs leading-5 ${active ? "text-secondary/60" : "text-white/52"
                        }`}
                >
                    {item.description}
                </p>
            </div>

            <ChevronRight
                className={`h-4 w-4 shrink-0 ${active ? "text-secondary/40" : "text-white/32"
                    }`}
            />
        </div>
    );

    if (item.href && !item.soon) {
        return (
            <Link href={item.href} onClick={onNavigate}>
                {content}
            </Link>
        );
    }

    return (
        <div aria-disabled="true" className="cursor-not-allowed opacity-90">
            {content}
        </div>
    );
}
