import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "../../../../../lib/prisma";
import { updateEnquiryStatus, deleteEnquiry } from "../../../../../lib/actions/enquiries";

export default async function EnquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const enquiry = await prisma.enquiry.findUnique({ where: { id } });
  if (!enquiry) notFound();

  const updateStatus = updateEnquiryStatus.bind(null, id);
  const removeEnquiry = deleteEnquiry.bind(null, id);

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/admin/enquiries"
            className="text-xs font-semibold"
            style={{ color: "#6b7280" }}
          >
            ← Back to enquiries
          </Link>
          <h1 className="mt-3 text-xl font-semibold" style={{ color: "#0a0a0a" }}>
            {enquiry.name}
          </h1>
          <p className="mt-1 text-sm" style={{ color: "#6b7280" }}>
            Received {enquiry.createdAt.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>

        <form action={removeEnquiry}>
          <button
            type="submit"
            className="text-xs font-semibold underline underline-offset-4"
            style={{ color: "#b91c1c" }}
          >
            Delete
          </button>
        </form>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div
            className="rounded-md p-5"
            style={{ backgroundColor: "var(--color-white)", border: "1px solid #e8eaed" }}
          >
            <h2 className="text-sm font-semibold" style={{ color: "#0a0a0a" }}>
              Message
            </h2>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed" style={{ color: "#111827" }}>
              {enquiry.message}
            </p>
          </div>

          <div
            className="rounded-md p-5"
            style={{ backgroundColor: "var(--color-white)", border: "1px solid #e8eaed" }}
          >
            <h2 className="text-sm font-semibold" style={{ color: "#0a0a0a" }}>
              Contact
            </h2>
            <dl className="mt-3 space-y-2 text-sm">
              <Row label="Email" value={enquiry.email} href={`mailto:${enquiry.email}`} />
              {enquiry.country && <Row label="Country" value={enquiry.country} />}
              {enquiry.travelDates && <Row label="Travel dates" value={enquiry.travelDates} />}
              {enquiry.groupSize && <Row label="Group size" value={enquiry.groupSize} />}
              {enquiry.interest && <Row label="Interest" value={enquiry.interest} />}
            </dl>
          </div>
        </div>

        <aside className="space-y-4">
          <div
            className="rounded-md p-5"
            style={{ backgroundColor: "var(--color-white)", border: "1px solid #e8eaed" }}
          >
            <h2 className="text-sm font-semibold" style={{ color: "#0a0a0a" }}>
              Status
            </h2>
            <form action={updateStatus} className="mt-3 space-y-3">
              <select
                name="status"
                defaultValue={enquiry.status}
                className="w-full px-3 py-2 text-sm outline-none"
                style={{
                  backgroundColor: "var(--color-white)",
                  border: "1px solid #e8eaed",
                  borderRadius: "var(--radius-md)",
                  color: "#0a0a0a",
                }}
              >
                <option value="new">New</option>
                <option value="replied">Replied</option>
                <option value="quoted">Quoted</option>
                <option value="closed">Closed</option>
              </select>
              <button type="submit" className="btn-accent w-full text-sm">
                Update status
              </button>
            </form>
          </div>

          <div
            className="rounded-md p-5"
            style={{ backgroundColor: "var(--color-white)", border: "1px solid #e8eaed" }}
          >
            <h2 className="text-sm font-semibold" style={{ color: "#0a0a0a" }}>
              Quick actions
            </h2>
            <div className="mt-3 space-y-2">
              <a
                href={`mailto:${enquiry.email}`}
                className="block text-sm font-semibold transition-opacity hover:opacity-70"
                style={{ color: "#c68a00" }}
              >
                Reply by email →
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Hi ${enquiry.name}, thanks for your enquiry about ${enquiry.interest || "Tanzania"}. `)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm font-semibold transition-opacity hover:opacity-70"
                style={{ color: "#c68a00" }}
              >
                Reply on WhatsApp →
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="flex gap-4">
      <dt className="w-28 flex-shrink-0 text-xs font-semibold uppercase tracking-wider" style={{ color: "#6b7280" }}>
        {label}
      </dt>
      <dd>
        {href ? (
          <a href={href} className="underline underline-offset-4" style={{ color: "#0a0a0a" }}>
            {value}
          </a>
        ) : (
          <span style={{ color: "#0a0a0a" }}>{value}</span>
        )}
      </dd>
    </div>
  );
}