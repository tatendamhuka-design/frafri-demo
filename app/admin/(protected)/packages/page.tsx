import Link from "next/link";
import { prisma } from "../../../../lib/prisma";

export default async function PackagesListPage() {
  const packages = await prisma.package.findMany({
    orderBy: { updatedAt: "desc" },
    include: { destinations: true },
  });

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold" style={{ color: "#0a0a0a" }}>
            Packages
          </h1>
          <p className="mt-1 text-sm" style={{ color: "#6b7280" }}>
            {packages.length} total
          </p>
        </div>

        <Link href="/admin/packages/new" className="btn-accent text-sm">
          + New Package
        </Link>
      </div>

      <div
        className="mt-6 overflow-hidden rounded-md"
        style={{
          backgroundColor: "var(--color-white)",
          border: "1px solid #e8eaed",
        }}
      >
        {packages.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <p className="text-sm" style={{ color: "#6b7280" }}>
              No packages yet.
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead style={{ backgroundColor: "#f9fafb", color: "#6b7280" }}>
              <tr>
                <th className="px-5 py-2.5 text-left text-xs font-medium uppercase tracking-wider">Title</th>
                <th className="px-5 py-2.5 text-left text-xs font-medium uppercase tracking-wider">Duration</th>
                <th className="px-5 py-2.5 text-left text-xs font-medium uppercase tracking-wider">Price from</th>
                <th className="px-5 py-2.5 text-left text-xs font-medium uppercase tracking-wider">Destinations</th>
                <th className="px-5 py-2.5 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                <th className="px-5 py-2.5 text-right text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody style={{ color: "#111827" }}>
              {packages.map((p) => (
                <tr key={p.id} style={{ borderTop: "1px solid #f3f4f6" }}>
                  <td className="px-5 py-3 font-medium">{p.title}</td>
                  <td className="px-5 py-3" style={{ color: "#6b7280" }}>{p.duration}</td>
                  <td className="px-5 py-3">${p.priceFrom.toLocaleString()}</td>
                  <td className="px-5 py-3" style={{ color: "#6b7280" }}>
                    {p.destinations.length}
                  </td>
                  <td className="px-5 py-3">
                    {p.published ? (
                      <span
                        className="rounded-full px-2 py-0.5 text-[0.7rem] font-semibold"
                        style={{ color: "#059669", backgroundColor: "#05966915" }}
                      >
                        Published
                      </span>
                    ) : (
                      <span
                        className="rounded-full px-2 py-0.5 text-[0.7rem] font-semibold"
                        style={{ color: "#6b7280", backgroundColor: "#6b728015" }}
                      >
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Link
                      href={`/admin/packages/${p.id}`}
                      className="text-xs font-semibold"
                      style={{ color: "#c68a00" }}
                    >
                      Edit →
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