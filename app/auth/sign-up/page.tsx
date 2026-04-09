import { AuthForm } from "@/components/auth/auth-form";
import { AuthShell } from "@/components/auth/auth-shell";

export default function SignUpPage() {
  return (
    <AuthShell mode="sign-up">
      <AuthForm mode="sign-up" />
    </AuthShell>
  );
}
