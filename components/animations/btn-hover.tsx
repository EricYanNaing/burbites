"use client";

import { motion } from "motion/react";
import type { HTMLMotionProps } from "motion/react";

type AnimatedButtonProps = HTMLMotionProps<"button">;

export default function AnimatedButton({
    children,
    type = "button",
    ...props
}: AnimatedButtonProps) {
    return (
        <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            type={type}
            {...props}
        >
            {children}
        </motion.button>
    );
}
