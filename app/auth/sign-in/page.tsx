import { AuthForm } from "@/components/auth/auth-form";
import { AuthShell } from "@/components/auth/auth-shell";

export default function SignInPage() {
  return (
    <AuthShell mode="sign-in">
      <AuthForm mode="sign-in" />
    </AuthShell>
  );
}
