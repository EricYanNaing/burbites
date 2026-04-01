"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
    children: ReactNode;
    className?: string;
    delay?: number;
    y?: number;
    scale?: number;
};

export function Reveal({
    children,
    className,
    delay = 0,
    y = 20,
    scale = 0.98,
}: RevealProps) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y, scale }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.58, delay, ease }}
        >
            {children}
        </motion.div>
    );
}

export function ShellReveal({ children }: { children: ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.68, ease }}
            className={"transform-gpu"}
        >
            {children}
        </motion.div>
    );
}
