type CustomBadgeProps = {
    label: string;
    className?: string;
    variant?: "primary" | "secondary" | "outline";
}

export function CustomBadge({ label, className, variant }: CustomBadgeProps) {
    const variantClass = {
        primary: "bg-primary text-white",
        secondary: "bg-secondary text-white",
        outline: "border border-primary text-primary",
    };
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs ${variantClass[variant ?? "primary"]} ${className ?? ""}`}>
            {label}
        </span>
    )
}
