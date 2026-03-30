"use client";

import AnimatedButton from "../animations/btn-hover";

type Variant = "primary" | "secondary" | "outline";

type CustomButtonProps = {
    label: string;
    onClick: () => void;
    className?: string;
    variant: Variant;
};

export function CustomButton({ label, onClick, className, variant }: CustomButtonProps) {
    const variantClasses = {
        primary: "bg-primary text-white",
        secondary: "bg-secondary text-white",
        outline: "border border-primary bg-transparent text-primary",
    };

    return (
        <AnimatedButton
            className={`px-4 py-2 cursor-pointer rounded-lg ${variantClasses[variant]} ${className ?? ""}`}
            onClick={onClick}
            type="button"
        >
            {label}
        </AnimatedButton>
    );
}
