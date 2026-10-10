import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard Preview",
  robots: { index: false, follow: false },
};

export default function AdminPreviewPage() {
  return (
    <main style={{ backgroundColor: "#f6f7f9", minHeight: "100vh" }}>
      {/* Browser chrome mock */}
      <div className="flex items-center gap-2 px-5 py-3" style={{ backgroundColor: "#e4e6eb" }}>
        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: "#ff5f57" }} />
        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: "#febc2e" }} />
        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: "#28c840" }} />
        <div
          className="ml-4 flex-1 rounded px-3 py-1.5 text-xs"
          style={{ backgroundColor: "#fff", color: "#5f6368" }}
        >
          admin.frafriadventuresescapes.com
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 p-5" style={{ backgroundColor: "#0f0e0c", color: "#fff", minHeight: "calc(100vh - 44px)" }}>
          <div className="font-display text-lg font-semibold">FraFri</div>
          <div className="text-[0.65rem] uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.5)" }}>
            Admin
          </div>

          <nav className="mt-10 space-y-1 text-sm">
            <NavItem label="Dashboard" active />
            <NavItem label="Packages" badge="2" />
            <NavItem label="Destinations" badge="6" />
            <NavItem label="Travel Guides" badge="1" />
            <NavItem label="Enquiries" badge="12" highlight />
            <NavItem label="Media Library" />
            <NavItem label="Settings" />
          </nav>
        </aside>

        {/* Main */}
        <div className="flex-1 p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl" style={{ color: "#0f0e0c" }}>Dashboard</h1>
              <p className="text-sm" style={{ color: "#6b7280" }}>Welcome back. Here's what's happening.</p>
            </div>
            <button className="btn-accent text-sm">+ New Package</button>
          </div>

          {/* Stats */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="New enquiries" value="12" hint="Last 7 days" />
            <Stat label="Active packages" value="2" hint="1 draft" />
            <Stat label="Destinations" value="6" hint="All published" />
            <Stat label="Travel guides" value="1" hint="1 draft" />
          </div>

          {/* Enquiries table */}
          <div className="mt-8 overflow-hidden rounded-lg" style={{ backgroundColor: "#fff", boxShadow: "0 1px 2px rgba(0,0,0,0.06)" }}>
            <div className="flex items-center justify-between border-b px-6 py-4" style={{ borderColor: "#e5e7eb" }}>
              <h2 className="text-sm font-semibold" style={{ color: "#0f0e0c" }}>Recent Enquiries</h2>
              <a className="text-xs font-semibold" style={{ color: "#c25a1f" }}>View all →</a>
            </div>

            <table className="w-full text-sm">
              <thead style={{ backgroundColor: "#f9fafb", color: "#6b7280" }}>
                <tr>
                  <Th>Name</Th>
                  <Th>Country</Th>
                  <Th>Interest</Th>
                  <Th>Dates</Th>
                  <Th>Status</Th>
                  <Th>Received</Th>
                </tr>
              </thead>
              <tbody style={{ color: "#111827" }}>
                <Row name="Sarah Mitchell" country="United Kingdom" interest="10-Day Safari + Zanzibar" dates="Jul 2027" status="New" when="2 hours ago" />
                <Row name="Michael Reyes" country="United States" interest="6-Day Tanzania Safari" dates="Sep 2027" status="Replied" when="6 hours ago" />
                <Row name="Anja Kohl" country="Germany" interest="Kilimanjaro · Machame" dates="Aug 2027" status="New" when="Yesterday" />
                <Row name="Pierre Laurent" country="France" interest="Day trip from Arusha" dates="Nov 2026" status="Quoted" when="2 days ago" />
              </tbody>
            </table>
          </div>

          {/* Packages + quick actions */}
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <Panel title="Packages" action="Manage →">
              <PackageRow title="10-Day Luxury Safari & Zanzibar" meta="10 days · $4,200 pp" status="Published" />
              <PackageRow title="6-Day Tanzania Safari" meta="6 days · $2,400 pp" status="Published" />
            </Panel>

            <Panel title="Quick Actions" action="">
              <QuickAction label="Add new package" />
              <QuickAction label="Add destination" />
              <QuickAction label="Publish a travel guide" />
              <QuickAction label="Upload photos" />
            </Panel>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ---------- Helper components ---------- */

function NavItem({ label, active, badge, highlight }: { label: string; active?: boolean; badge?: string; highlight?: boolean }) {
  return (
    <div
      className="flex items-center justify-between rounded px-3 py-2"
      style={{
        backgroundColor: active ? "rgba(255,255,255,0.08)" : "transparent",
        color: active ? "#fff" : "rgba(255,255,255,0.7)",
        fontWeight: active ? 600 : 400,
      }}
    >
      <span>{label}</span>
      {badge && (
        <span
          className="rounded-full px-2 text-[0.65rem] font-semibold"
          style={{
            backgroundColor: highlight ? "#c25a1f" : "rgba(255,255,255,0.12)",
            color: "#fff",
          }}
        >
          {badge}
        </span>
      )}
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-lg p-5" style={{ backgroundColor: "#fff", boxShadow: "0 1px 2px rgba(0,0,0,0.06)" }}>
      <div className="text-xs uppercase tracking-[0.15em]" style={{ color: "#6b7280" }}>{label}</div>
      <div className="mt-2 font-display text-3xl" style={{ color: "#0f0e0c" }}>{value}</div>
      <div className="mt-1 text-xs" style={{ color: "#9ca3af" }}>{hint}</div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-6 py-3 text-left font-medium">{children}</th>;
}

function Row({ name, country, interest, dates, status, when }: { name: string; country: string; interest: string; dates: string; status: string; when: string }) {
  const statusColor =
    status === "New" ? "#c25a1f" : status === "Replied" ? "#2563eb" : "#059669";

  return (
    <tr style={{ borderTop: "1px solid #f3f4f6" }}>
      <td className="px-6 py-4 font-medium">{name}</td>
      <td className="px-6 py-4" style={{ color: "#6b7280" }}>{country}</td>
      <td className="px-6 py-4">{interest}</td>
      <td className="px-6 py-4" style={{ color: "#6b7280" }}>{dates}</td>
      <td className="px-6 py-4">
        <span
          className="rounded-full px-2.5 py-1 text-xs font-semibold"
          style={{ color: statusColor, backgroundColor: `${statusColor}15` }}
        >
          {status}
        </span>
      </td>
      <td className="px-6 py-4" style={{ color: "#9ca3af" }}>{when}</td>
    </tr>
  );
}

function Panel({ title, action, children }: { title: string; action: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg" style={{ backgroundColor: "#fff", boxShadow: "0 1px 2px rgba(0,0,0,0.06)" }}>
      <div className="flex items-center justify-between border-b px-6 py-4" style={{ borderColor: "#e5e7eb" }}>
        <h2 className="text-sm font-semibold" style={{ color: "#0f0e0c" }}>{title}</h2>
        {action && <a className="text-xs font-semibold" style={{ color: "#c25a1f" }}>{action}</a>}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function PackageRow({ title, meta, status }: { title: string; meta: string; status: string }) {
  return (
    <div className="flex items-center justify-between border-b py-3 last:border-b-0" style={{ borderColor: "#f3f4f6" }}>
      <div>
        <div className="text-sm font-medium" style={{ color: "#111827" }}>{title}</div>
        <div className="text-xs" style={{ color: "#6b7280" }}>{meta}</div>
      </div>
      <span className="rounded-full px-2.5 py-1 text-xs font-semibold" style={{ color: "#059669", backgroundColor: "#05966915" }}>
        {status}
      </span>
    </div>
  );
}

function QuickAction({ label }: { label: string }) {
  return (
    <div
      className="flex items-center justify-between border-b py-3 last:border-b-0"
      style={{ borderColor: "#f3f4f6" }}
    >
      <span className="text-sm" style={{ color: "#111827" }}>{label}</span>
      <span className="text-xs" style={{ color: "#c25a1f" }}>→</span>
    </div>
  );
}