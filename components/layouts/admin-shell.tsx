"use client";

export default function AdminShell({ children }: { children: React.ReactNode }) {
    return (
        <section className="min-h-screen bg-[#f4eee8]">
            <div className="mx-auto min-h-screen w-full bg-white">
                {children}
            </div>
        </section>
    );
}
