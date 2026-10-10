import Link from "next/link";
import { prisma } from "../../../lib/prisma";

export default async function AdminDashboard() {
  const [
    packageCount,
    destinationCount,
    guideCount,
    enquiryCount,
    newEnquiryCount,
    recentEnquiries,
  ] = await Promise.all([
    prisma.package.count(),
    prisma.destination.count(),
    prisma.guide.count(),
    prisma.enquiry.count(),
    prisma.enquiry.count({ where: { status: "new" } }),
    prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold" style={{ color: "#0a0a0a" }}>
            Dashboard
          </h1>
          <p className="mt-1 text-sm" style={{ color: "#6b7280" }}>
            Overview of your site content and enquiries
          </p>
        </div>

        <Link href="/admin/packages/new" className="btn-accent text-sm">
          + New Package
        </Link>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="New enquiries"
          value={newEnquiryCount}
          hint={`${enquiryCount} total`}
          href="/admin/enquiries"
          highlight={newEnquiryCount > 0}
        />
        <StatCard
          label="Packages"
          value={packageCount}
          hint="All published"
          href="/admin/packages"
        />
        <StatCard
          label="Destinations"
          value={destinationCount}
          hint="All published"
          href="/admin/destinations"
        />
        <StatCard
          label="Travel guides"
          value={guideCount}
          hint="All published"
          href="/admin/guides"
        />
      </div>

      <div
        className="mt-6 overflow-hidden rounded-md"
        style={{
          backgroundColor: "var(--color-white)",
          border: "1px solid #e8eaed",
        }}
      >
        <div
          className="flex items-center justify-between border-b px-5 py-3"
          style={{ borderColor: "#e8eaed" }}
        >
          <h2 className="text-sm font-semibold" style={{ color: "#0a0a0a" }}>
            Recent Enquiries
          </h2>
          <Link
            href="/admin/enquiries"
            className="text-xs font-semibold"
            style={{ color: "#c68a00" }}
          >
            View all →
          </Link>
        </div>

        {recentEnquiries.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm" style={{ color: "#6b7280" }}>
            No enquiries yet.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead style={{ backgroundColor: "#f9fafb", color: "#6b7280" }}>
              <tr>
                <th className="px-5 py-2.5 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                <th className="px-5 py-2.5 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                <th className="px-5 py-2.5 text-left text-xs font-medium uppercase tracking-wider">Interest</th>
                <th className="px-5 py-2.5 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                <th className="px-5 py-2.5 text-left text-xs font-medium uppercase tracking-wider">Received</th>
              </tr>
            </thead>
            <tbody style={{ color: "#111827" }}>
              {recentEnquiries.map((e) => (
                <tr key={e.id} style={{ borderTop: "1px solid #f3f4f6" }}>
                  <td className="px-5 py-3 font-medium">{e.name}</td>
                  <td className="px-5 py-3" style={{ color: "#6b7280" }}>
                    {e.email}
                  </td>
                  <td className="px-5 py-3">{e.interest || "—"}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={e.status} />
                  </td>
                  <td className="px-5 py-3" style={{ color: "#9ca3af" }}>
                    {formatRelative(e.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Panel title="Quick Actions">
          <QuickLink href="/admin/packages/new" label="Add new package" />
          <QuickLink href="/admin/destinations/new" label="Add destination" />
          <QuickLink href="/admin/guides/new" label="Publish a travel guide" />
          <QuickLink href="/admin/enquiries" label="Review enquiries" />
        </Panel>

        <Panel title="Public Site">
          <QuickLink href="/" label="Open homepage" external />
          <QuickLink href="/all-tours" label="View safari packages" external />
          <QuickLink href="/destinations" label="View destinations" external />
          <QuickLink href="/travel-guides" label="View travel guides" external />
        </Panel>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  hint,
  href,
  highlight,
}: {
  label: string;
  value: number;
  hint: string;
  href: string;
  highlight?: boolean;
}) {
  return (
    <Link
      href={href}
      className="block rounded-md p-4 transition-shadow hover:shadow-sm"
      style={{
        backgroundColor: "var(--color-white)",
        border: "1px solid #e8eaed",
      }}
    >
      <div
        className="text-[0.7rem] font-semibold uppercase tracking-[0.12em]"
        style={{ color: "#6b7280" }}
      >
        {label}
      </div>
      <div
        className="mt-1.5 text-2xl font-semibold"
        style={{ color: highlight ? "#c68a00" : "#0a0a0a" }}
      >
        {value}
      </div>
      <div className="mt-0.5 text-xs" style={{ color: "#9ca3af" }}>
        {hint}
      </div>
    </Link>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colours: Record<string, string> = {
    new: "#c68a00",
    replied: "#2563eb",
    quoted: "#059669",
    closed: "#6b7280",
  };
  const colour = colours[status] ?? "#6b7280";

  return (
    <span
      className="rounded-full px-2 py-0.5 text-[0.7rem] font-semibold capitalize"
      style={{ color: colour, backgroundColor: `${colour}15` }}
    >
      {status}
    </span>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-md"
      style={{
        backgroundColor: "var(--color-white)",
        border: "1px solid #e8eaed",
      }}
    >
      <div className="border-b px-5 py-3" style={{ borderColor: "#e8eaed" }}>
        <h2 className="text-sm font-semibold" style={{ color: "#0a0a0a" }}>
          {title}
        </h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function QuickLink({
  href,
  label,
  external,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex items-center justify-between border-b py-2.5 last:border-b-0 transition-opacity hover:opacity-70"
      style={{ borderColor: "#f3f4f6" }}
    >
      <span className="text-sm" style={{ color: "#0a0a0a" }}>
        {label}
      </span>
      <span className="text-xs" style={{ color: "#c68a00" }}>
        →
      </span>
    </Link>
  );
}

function formatRelative(date: Date): string {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return date.toLocaleDateString("en-GB");
}