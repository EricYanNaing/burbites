type LoadingStateProps = {
    label?: string;
    variant?: "cards" | "inline";
    count?: number;
};

export function LoadingState({
    label = "Loading dishes",
    variant = "cards",
    count = 3,
}: LoadingStateProps) {
    if (variant === "inline") {
        return (
            <div
                role="status"
                aria-live="polite"
                aria-busy="true"
                className="flex items-center justify-center gap-3 py-4 text-sm text-primary/80"
            >
                <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary" />
                    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary/70 [animation-delay:120ms]" />
                    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary/45 [animation-delay:240ms]" />
                </div>
                <span className="font-medium">{label}</span>
            </div>
        );
    }

    return (
        <div
            role="status"
            aria-live="polite"
            aria-busy="true"
            className="space-y-4 py-2"
        >
            <div className="rounded-2xl border border-primary/10 bg-white/80 px-4 py-3 shadow-sm">
                <div className="mb-2 h-3 w-28 animate-pulse rounded-full bg-primary/15" />
                <div className="h-4 w-40 animate-pulse rounded-full bg-primary/25" />
            </div>

            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className="overflow-hidden rounded-lg border border-primary/10 bg-white shadow-lg"
                >
                    <div className="h-48 w-full animate-pulse bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10" />
                    <div className="space-y-3 p-4">
                        <div className="h-6 w-2/3 animate-pulse rounded-full bg-primary/15" />
                        <div className="h-4 w-full animate-pulse rounded-full bg-secondary/10" />
                        <div className="h-4 w-5/6 animate-pulse rounded-full bg-secondary/10" />
                    </div>
                </div>
            ))}

            <span className="sr-only">{label}</span>
        </div>
    );
}
