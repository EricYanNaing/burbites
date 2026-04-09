"use client";

import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { useI18n } from "@/components/i18n/locale-provider";

export function Header() {
    const { messages } = useI18n();

    return (
        <header className="flex items-center justify-between p-4 shadow-lg">
            <div className="flex items-center gap-2">
                <img src="/logo.png" alt={messages.header.logoAlt} className="w-15 h-15" />
                <h1 className="text-2xl font-bold text-primary font-display">Burbites</h1>
            </div>
            <LanguageSwitcher />
        </header>
    );
}
