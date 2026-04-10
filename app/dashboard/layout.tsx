import { auth } from "@/lib/auth/server";
import AdminShell from "@/components/layouts/admin-shell";
import { redirect } from "next/navigation";
import { ensureAppUser } from "@/lib/auth/ensure-app-user";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session } = await auth.getSession();
    await ensureAppUser();

    if (!session?.user) {
        redirect("/auth/sign-in");
    }

    return <AdminShell>{children}</AdminShell>;
}
