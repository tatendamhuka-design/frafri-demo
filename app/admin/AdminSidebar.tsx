"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { label: "Dashboard", href: "/admin" },
  { label: "Packages", href: "/admin/packages" },
  { label: "Destinations", href: "/admin/destinations" },
  { label: "Travel Guides", href: "/admin/guides" },
  { label: "Enquiries", href: "/admin/enquiries" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="w-56 flex-shrink-0 px-4 py-5"
      style={{
        backgroundColor: "var(--color-olive)",
        color: "var(--color-white)",
        minHeight: "100vh",
      }}
    >
      <Link href="/admin" className="flex items-center gap-2">
        <img
          src="/logo.webp"
          alt="FraFri"
          style={{ height: "44px", width: "auto", display: "block" }}
        />
      </Link>
      <div
        className="mt-3 text-[0.6rem] font-bold uppercase tracking-[0.2em]"
        style={{ color: "var(--color-accent)" }}
      >
        Admin
      </div>

      <nav className="mt-8 space-y-0.5">
        {NAV.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin" || pathname === "/admin/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded px-2.5 py-1.5 text-sm transition-colors"
              style={{
                backgroundColor: active
                  ? "rgba(255,255,255,0.14)"
                  : "transparent",
                color: active ? "#fff" : "rgba(255,255,255,0.72)",
                fontWeight: active ? 600 : 400,
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
        <Link
          href="/"
          target="_blank"
          className="block text-xs transition-opacity hover:opacity-80"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          View public site →
        </Link>
      </div>
    </aside>
  );
}