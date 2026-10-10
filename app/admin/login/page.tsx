import { redirect } from "next/navigation";
import { getSession } from "../../../lib/auth";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect("/admin");

  return (
    <div
      className="flex min-h-screen items-center justify-center p-6"
      style={{ backgroundColor: "var(--color-ink)" }}
    >
      <div
        className="w-full max-w-md p-10"
        style={{
          backgroundColor: "var(--color-cream)",
          borderRadius: "var(--radius-lg)",
        }}
      >
        <div className="flex justify-center">
          <img
            src="/logo.webp"
            alt="FraFri Adventure Escapes"
            style={{ height: "84px", width: "auto", display: "block" }}
          />
        </div>

        <h1 className="mt-8 text-center font-display text-3xl">Admin Login</h1>
        <p
          className="mt-3 text-center text-sm"
          style={{ color: "var(--color-muted)" }}
        >
          Sign in to manage FraFri content
        </p>

        <LoginForm />
      </div>
    </div>
  );
}