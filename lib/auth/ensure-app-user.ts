import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth/server";

export async function ensureAppUser() {
  const { data: session } = await auth.getSession();
  const user = session?.user;
  if (!user?.id || !user.email) return null;

  return prisma.appUser.upsert({
    where: { id: user.id },
    update: { email: user.email, name: user.name ?? null },
    create: { id: user.id, email: user.email, name: user.name ?? null },
  });
}
