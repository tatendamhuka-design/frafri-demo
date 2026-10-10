import Link from "next/link";
import { prisma } from "../../../../lib/prisma";

export default async function EnquiriesPage() {
  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold" style={{ color: "#0a0a0a" }}>
            Enquiries
          </h1>
          <p className="mt-1 text-sm" style={{ color: "#6b7280" }}>
            {enquiries.length} total
          </p>
        </div>
      </div>

      <div
        className="mt-6 overflow-hidden rounded-md"
        style={{
          backgroundColor: "var(--color-white)",
          border: "1px solid #e8eaed",
        }}
      >
        {enquiries.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <p className="text-sm" style={{ color: "#6b7280" }}>
              No enquiries yet. They&apos;ll appear here when someone submits
              the contact form.
            </p>
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
                <th className="px-5 py-2.5 text-right text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody style={{ color: "#111827" }}>
              {enquiries.map((e) => (
                <tr key={e.id} style={{ borderTop: "1px solid #f3f4f6" }}>
                  <td className="px-5 py-3 font-medium">{e.name}</td>
                  <td className="px-5 py-3" style={{ color: "#6b7280" }}>{e.email}</td>
                  <td className="px-5 py-3">{e.interest || "—"}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={e.status} />
                  </td>
                  <td className="px-5 py-3" style={{ color: "#9ca3af" }}>
                    {e.createdAt.toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Link
                      href={`/admin/enquiries/${e.id}`}
                      className="text-xs font-semibold"
                      style={{ color: "#c68a00" }}
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
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