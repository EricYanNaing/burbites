"use client";

import { signOutAction } from "@/app/auth/action";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { useI18n } from "@/components/i18n/locale-provider";
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
import CustomModal from "../ui/custom-modal";

type AdminShellProps = {
    children: React.ReactNode;
};

type NavKey =
    | "overview"
    | "shops"
    | "customers"
    | "analytics"
    | "security"
    | "settings";

type NavItem = {
    key: NavKey;
    activeMatch?: "exact" | "segment";
    description: string;
    href?: string;
    Icon: ComponentType<{ className?: string }>;
    label: string;
    soon?: boolean;
};

const primaryMenuMeta: Array<{
    key: NavKey;
    href?: string;
    Icon: ComponentType<{ className?: string }>;
    soon?: boolean;
    activeMatch?: "exact" | "segment";
}> = [
        {
            key: "overview",
            href: "/dashboard",
            Icon: LayoutDashboard,
            activeMatch: "exact",
        },
        {
            key: "shops",
            href: "/dashboard/shops",
            Icon: Store,
            activeMatch: "segment",
        },
        {
            key: "customers",
            Icon: Users,
            soon: true,
        },
        {
            key: "analytics",
            Icon: ChartNoAxesCombined,
            soon: true,
        },
    ];

const secondaryMenuMeta: Array<{
    key: NavKey;
    Icon: ComponentType<{ className?: string }>;
    soon?: boolean;
}> = [
        {
            key: "security",
            Icon: ShieldCheck,
            soon: true,
        },
        {
            key: "settings",
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

function getPageTitle(pathname: string, dashboardTitle: string, shopsTitle: string) {
    if (pathname === "/dashboard") {
        return dashboardTitle;
    }

    if (pathname === "/dashboard/shops" || pathname.startsWith("/dashboard/shops/")) {
        return shopsTitle;
    }

    const segment = pathname.split("/").filter(Boolean).at(-1);

    if (!segment) {
        return dashboardTitle;
    }

    return segment
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
}

export default function AdminShell({ children }: AdminShellProps) {
    const pathname = usePathname();
    const showSidebar = pathname.startsWith("/dashboard");
    const { messages } = useI18n();
    const t = messages.admin;
    const [menuOpen, setMenuOpen] = useState(false);
    const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

    const primaryMenu = useMemo<NavItem[]>(() => {
        return primaryMenuMeta.map((item) => {
            const navCopy = t.nav[item.key];

            return {
                ...item,
                label: navCopy.label,
                description: navCopy.description,
            };
        });
    }, [t]);

    const secondaryMenu = useMemo<NavItem[]>(() => {
        return secondaryMenuMeta.map((item) => {
            const navCopy = t.nav[item.key];

            return {
                ...item,
                label: navCopy.label,
                description: navCopy.description,
            };
        });
    }, [t]);

    const pageTitle = useMemo(() => {
        return getPageTitle(pathname, t.pageTitleDashboard, t.pageTitleShops);
    }, [pathname, t.pageTitleDashboard, t.pageTitleShops]);

    const signOutHandler = () => {
        setIsSignOutModalOpen(true);
    }

    return (
        <section className="min-h-screen bg-[#f4eee8] text-secondary">
            <div className="mx-auto flex min-h-screen w-full bg-[#f7f1eb]">
                {showSidebar && (
                    <aside className="hidden w-[304px] shrink-0 border-r border-[#eaded4] bg-[#26191a] text-white lg:flex">
                        <SidebarContent
                            pathname={pathname}
                            primaryMenu={primaryMenu}
                            secondaryMenu={secondaryMenu}
                        />
                    </aside>
                )}


                <div className="flex min-h-screen min-w-0 flex-1 flex-col">
                    <header className="sticky top-0 z-30 border-b border-[#eaded4] bg-[#f7f1eb]/92 backdrop-blur">
                        <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                            <div className="flex min-w-0 items-center gap-3">
                                {showSidebar ? (
                                    <button
                                        type="button"
                                        onClick={() => setMenuOpen(true)}
                                        className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#e8ddd4] bg-white text-secondary shadow-sm transition hover:bg-[#fdfaf8] lg:hidden"
                                        aria-label={t.openMenu}
                                    >
                                        <Menu className="h-5 w-5" />
                                    </button>
                                ) : null}

                                <div className="min-w-0">
                                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-primary/74">
                                        {t.adminWorkspace}
                                    </p>
                                    <h1 className="truncate text-xl font-black text-secondary sm:text-2xl">
                                        {pageTitle}
                                    </h1>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <LanguageSwitcher />

                                <button
                                    type="button"
                                    onClick={() => signOutHandler()}
                                    className="hidden h-11 w-11 items-center justify-center rounded-2xl border border-[#e8ddd4] bg-white text-secondary shadow-sm transition hover:bg-[#fdfaf8] sm:inline-flex"
                                    aria-label={t.signOut}
                                >
                                    <LogOut className="h-4 w-4" />
                                </button>



                                {/* <button
                                    type="button"
                                    className="hidden h-11 w-11 items-center justify-center rounded-2xl border border-[#e8ddd4] bg-white text-secondary shadow-sm transition hover:bg-[#fdfaf8] sm:inline-flex"
                                    aria-label={t.notifications}
                                >
                                    <BellDot className="h-5 w-5" />
                                </button> */}
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
                        <div className="mx-auto w-full max-w-7xl">{children}</div>
                    </main>
                </div>

                <CustomModal
                    open={isSignOutModalOpen}
                    onClose={() => setIsSignOutModalOpen(false)}
                    isCloseButton={true}
                    className="w-full max-w-md"
                >
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                            <LogOut className="h-8 w-8 text-red-600" />
                        </div>
                        <h2 className="text-xl font-bold text-secondary">Sign Out</h2>
                        <p className="text-center text-secondary/74">Are you sure you want to sign out?</p>
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => setIsSignOutModalOpen(false)}
                                className="rounded-lg border border-[#e8ddd4] bg-white px-4 py-2 text-secondary shadow-sm transition hover:bg-[#fdfaf8]"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={() => signOutAction()}
                                className="rounded-lg bg-red-600 px-4 py-2 text-white shadow-sm transition hover:bg-red-700"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </CustomModal>
            </div>

            {showSidebar ? (
                <div
                    className={`fixed inset-0 z-50 lg:hidden ${menuOpen ? "pointer-events-auto" : "pointer-events-none"
                        }`}
                    aria-hidden={!menuOpen}
                >
                    <button
                        type="button"
                        aria-label={t.closeMenu}
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
                                <Image src="/logo.png" alt={messages.header.logoAlt} width={36} height={36} />
                                <div>
                                    <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-white/56">
                                        {t.dashboardMenu}
                                    </p>
                                    <p className="font-display text-lg text-white">Burbites</p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setMenuOpen(false)}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-white"
                                aria-label={t.closeMenu}
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <SidebarContent
                            pathname={pathname}
                            mobile
                            primaryMenu={primaryMenu}
                            secondaryMenu={secondaryMenu}
                            onNavigate={() => setMenuOpen(false)}
                        />
                    </aside>
                </div>
            ) : null}

        </section>
    );
}

function SidebarContent({
    mobile = false,
    onNavigate,
    pathname,
    primaryMenu,
    secondaryMenu,
}: {
    mobile?: boolean;
    onNavigate?: () => void;
    pathname: string;
    primaryMenu: NavItem[];
    secondaryMenu: NavItem[];
}) {
    const { messages } = useI18n();
    const t = messages.admin;

    return (
        <div className="flex h-full w-full flex-col">
            <div className="hidden lg:block border-b border-white/8 px-5 pb-5 pt-6">
                <Link href="/" onClick={onNavigate} className="inline-flex items-center gap-3">
                    <Image src="/logo.png" alt={messages.header.logoAlt} width={44} height={44} />
                    <div>
                        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-white/56">
                            {t.internalWorkspace}
                        </p>
                        <p className="font-display text-xl text-white">Burbites</p>
                    </div>
                </Link>

                <div className="mt-5 rounded-[24px] border border-white/8 bg-white/6 p-4">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/52">
                        {t.controlCenter}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/72">
                        {t.controlCenterDescription}
                    </p>
                </div>

            </div>

            <div className="flex-1 overflow-y-auto px-4 py-5">
                <MenuGroup
                    label={t.mainMenu}
                    items={primaryMenu}
                    onNavigate={onNavigate}
                    pathname={pathname}
                />
                <MenuGroup
                    label={t.system}
                    items={secondaryMenu}
                    onNavigate={onNavigate}
                    pathname={pathname}
                />
            </div>

            <div className="border-t border-white/8 p-4 mb-20 lg:mb-0">
                <form action={signOutAction} className="mt-4">
                    <button
                        type="submit"
                        onClick={onNavigate}
                        className={`inline-flex w-full items-center justify-between rounded-[18px] border border-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/8 ${mobile ? "bg-white/8" : "bg-black/18"
                            }`}
                    >
                        {t.signOut}
                        <LogOut className="h-4 w-4" />
                    </button>
                </form>
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
                        key={item.key}
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
    const { messages } = useI18n();
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
                            {messages.admin.soon}
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
            <div className="mb-2">
                <Link href={item.href} onClick={onNavigate}>
                    {content}
                </Link>
            </div>
        );
    }

    return (
        <div aria-disabled="true" className="cursor-not-allowed opacity-90">
            {content}
        </div>
    );
}
