import { getServerMessages } from "@/lib/i18n/server";

export default async function DashboardPage() {
    const t = await getServerMessages();

    return (
        <section className="p-6">
            <h1>{t.dashboard.dashboard}</h1>
        </section>
    );
}
