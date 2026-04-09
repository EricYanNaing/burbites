import { getServerMessages } from "@/lib/i18n/server";

export default async function Loading() {
    const t = await getServerMessages();

    return (
        <div className="relative isolate flex min-h-[72vh] w-full items-center justify-center overflow-hidden px-6 py-10">
            <div className="pointer-events-none absolute -left-20 top-20 h-56 w-56 rounded-full bg-primary/12 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 bottom-12 h-60 w-60 rounded-full bg-[#f3b19d]/32 blur-3xl" />

            <section
                role="status"
                aria-live="polite"
                aria-busy="true"
                className="relative w-full max-w-[380px] rounded-[30px] border border-[#ead9cf] bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(255,247,241,0.92)_100%)] px-6 py-8 text-center shadow-[0_26px_60px_rgba(96,34,44,0.16)] backdrop-blur"
            >
                <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center">
                    <div className="relative h-24 w-24">
                        <div className="absolute inset-0 rounded-full border-[3px] border-primary/20" />
                        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-primary border-r-primary/70 animate-spin" />
                        <div className="absolute inset-[10px] rounded-full border-[3px] border-transparent border-b-secondary/65 border-l-secondary/45 animate-[spin_1.8s_linear_infinite_reverse]" />
                        <div className="absolute inset-[26px] rounded-full bg-primary/12 ring-1 ring-primary/25 animate-pulse" />
                    </div>
                </div>

                <div className="space-y-2">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-primary/78">
                        {t.loadingPage.loading}
                    </p>
                    <h2 className="text-xl font-black text-secondary">
                        {t.loadingPage.discoverDishes}
                    </h2>
                    <p className="text-sm text-secondary/62">
                        {t.loadingPage.preparingMenu}
                    </p>
                </div>

                <div className="mt-5 flex items-center justify-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/70 animate-pulse [animation-delay:160ms]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-pulse [animation-delay:320ms]" />
                </div>

                <span className="sr-only">{t.loadingPage.loading}</span>
            </section>
        </div>
    );
}
