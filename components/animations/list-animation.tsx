"use client";

import { motion } from "motion/react";
import type { Key, ReactNode } from "react";

const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0 },
};

type AnimatedListProps<T> = {
    items: T[];
    children: (item: T, index: number) => ReactNode;
    className?: string;
    itemClassName?: string;
    getKey?: (item: T, index: number) => Key;
};

function defaultKey<T>(item: T, index: number): Key {
    if (typeof item === "string" || typeof item === "number") {
        return `${item}-${index}`;
    }

    return index;
}

export default function AnimatedList<T>({
    items,
    children,
    className = "space-y-3",
    itemClassName,
    getKey,
}: AnimatedListProps<T>) {
    return (
        <motion.ul
            variants={container}
            initial="hidden"
            animate="show"
            className={className}
        >
            {items.map((listItem, index) => (
                <motion.li
                    key={getKey ? getKey(listItem, index) : defaultKey(listItem, index)}
                    variants={item}
                    className={itemClassName}
                >
                    {children(listItem, index)}
                </motion.li>
            ))}
        </motion.ul>
    );
}
