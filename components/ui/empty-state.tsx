type EmptyStateProps = {
    title?: string;
    description: string;
};

export function EmptyState({
    title = "No dishes found",
    description,
}: EmptyStateProps) {
    return (
        <div className="rounded-2xl border border-dashed border-primary/20 bg-white/80 px-6 py-10 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <circle cx="11" cy="11" r="7" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
            </div>

            <h3 className="text-lg font-semibold text-secondary">{title}</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-secondary/70">
                {description}
            </p>
        </div>
    );
}
