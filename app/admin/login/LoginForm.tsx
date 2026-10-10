"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-xs font-bold uppercase tracking-[0.15em]"
          style={{ color: "var(--color-muted)" }}
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="w-full px-4 py-3 text-sm outline-none"
          style={{
            backgroundColor: "var(--color-white)",
            border: "1px solid var(--color-sand-deep)",
            borderRadius: "var(--radius-md)",
            color: "var(--color-ink)",
          }}
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-xs font-bold uppercase tracking-[0.15em]"
          style={{ color: "var(--color-muted)" }}
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          className="w-full px-4 py-3 text-sm outline-none"
          style={{
            backgroundColor: "var(--color-white)",
            border: "1px solid var(--color-sand-deep)",
            borderRadius: "var(--radius-md)",
            color: "var(--color-ink)",
          }}
        />
      </div>

      {error && (
        <p className="text-sm" style={{ color: "#b91c1c" }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-accent w-full disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}