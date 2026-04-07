"use client";

import { MotionConfig } from "motion/react";
import { Header } from "./header";
import { ShellReveal } from "../animations/reveal";

export function AppShell({ children }: { children: React.ReactNode }) {
    return (
        <MotionConfig reducedMotion="user">
            <ShellReveal>
                <section className="min-h-screen shadow-2xl bg-white max-w-[480px] mx-auto">
                    <Header />
                    {children}
                </section>
            </ShellReveal>
        </MotionConfig>
    );
}
