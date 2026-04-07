import { auth } from "@/lib/auth/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session } = await auth.getSession();

    if (!session?.user) {
        redirect("/auth/sign-in");
    }

    return children;
}
