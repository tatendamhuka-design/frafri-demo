"use client";

import { useRouter } from "next/navigation";

export default function AdminTopbar({
  userName,
  userEmail,
}: {
  userName: string;
  userEmail: string;
}) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header
      className="flex items-center justify-between border-b px-6 py-3 lg:px-8"
      style={{
        backgroundColor: "var(--color-white)",
        borderColor: "#e8eaed",
      }}
    >
      <div className="text-xs" style={{ color: "#6b7280" }}>
        Signed in as <strong style={{ color: "#0a0a0a" }}>{userEmail}</strong>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold" style={{ color: "#0a0a0a" }}>
          {userName}
        </span>
        <button
          type="button"
          onClick={handleLogout}
          className="text-xs font-semibold underline underline-offset-4 transition-opacity hover:opacity-70"
          style={{ color: "#c68a00" }}
        >
          Log out
        </button>
      </div>
    </header>
  );
}