import { Header } from "./header";
import { ShellReveal } from "../animations/reveal";

export function AppShell({ children }: { children: React.ReactNode }) {
    return (
        <ShellReveal>
            <section className="flex flex-col min-h-screen shadow-2xl bg-white max-w-[480px] mx-auto">
                <Header />
                {children}
            </section>
        </ShellReveal>
    );
}