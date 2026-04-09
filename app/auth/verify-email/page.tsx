import { AuthShell } from "@/components/auth/auth-shell";
import { VerifyEmailForm } from "@/components/auth/verify-email-form";

export default function VerifyEmailPage() {
  return (
    <AuthShell mode="verify-email">
      <VerifyEmailForm />
    </AuthShell>
  );
}
