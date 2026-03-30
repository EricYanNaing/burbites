import { Header } from "./header";

export function AppShell({ children }: { children: React.ReactNode }) {
    return (
        <section className="flex flex-col min-h-screen min-w-screen max-w-[480px] mx-auto">
            <Header />
            {children}
        </section>
    );
}