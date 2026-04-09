import { getServerMessages } from "@/lib/i18n/server";

export default async function Shops() {
    const t = await getServerMessages();

    return (
        <div>
            <h1>{t.dashboard.shops}</h1>
        </div>
    );
}
