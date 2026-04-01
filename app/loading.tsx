import { CustomBadge } from "@/components/ui/custom-badge";
import { LoadingState } from "@/components/ui/loading-state";

export default function Loading() {
    return (
        <div className="w-full p-5 flex flex-col gap-8">
            <section className="relative h-60 w-full overflow-hidden rounded-2xl bg-gradient-to-b from-[#2b070d] via-[#6f0d20] to-[#d01c3a] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_16%,rgba(255,184,198,0.2),transparent_28%),radial-gradient(circle_at_18%_88%,rgba(255,125,150,0.22),transparent_34%)]" />
                <div className="relative flex h-full w-full flex-col items-start justify-end gap-3 p-5">
                    <CustomBadge
                        label="Loading"
                        className="font-bold uppercase tracking-[0.12em]"
                    />
                    <div className="h-10 w-44 animate-pulse rounded-full bg-white/20" />
                    <div className="h-4 w-52 animate-pulse rounded-full bg-white/15" />
                    <div className="h-4 w-36 animate-pulse rounded-full bg-white/10" />
                </div>
            </section>

            <section className="flex flex-col gap-3">
                <div className="rounded-2xl border border-primary/10 bg-white px-4 py-4 shadow-sm">
                    <div className="mb-3 h-3 w-24 animate-pulse rounded-full bg-primary/15" />
                    <div className="h-12 w-full animate-pulse rounded-2xl bg-gradient-to-r from-primary/8 via-primary/12 to-primary/8" />
                </div>

                <div>
                    <p className="text-sm font-medium font-display text-primary">
                        Discover our delicious dishes
                    </p>
                    <LoadingState label="Preparing your menu" count={4} />
                </div>
            </section>
        </div>
    );
}
