import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "../../../../../lib/prisma";
import DestinationForm from "../DestinationForm";
import { updateDestination, deleteDestination } from "../../../../../lib/actions/destinations";

export default async function EditDestinationPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { id } = await params;
  const { saved } = await searchParams;

  const destination = await prisma.destination.findUnique({ where: { id } });
  if (!destination) notFound();

  const boundUpdate = updateDestination.bind(null, id);
  const boundDelete = deleteDestination.bind(null, id);

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/admin/destinations"
            className="text-xs font-semibold"
            style={{ color: "#6b7280" }}
          >
            ← Back to destinations
          </Link>
          <h1 className="mt-3 text-xl font-semibold" style={{ color: "#0a0a0a" }}>
            Edit Destination
          </h1>
          <p className="mt-1 text-sm" style={{ color: "#6b7280" }}>
            {destination.name}
          </p>
        </div>

        <form action={boundDelete}>
          <button
            type="submit"
            className="text-xs font-semibold underline underline-offset-4"
            style={{ color: "#b91c1c" }}
          >
            Delete
          </button>
        </form>
      </div>

      {saved && (
        <div
          className="mt-5 rounded px-4 py-2.5 text-sm"
          style={{ backgroundColor: "#05966915", color: "#059669" }}
        >
          Changes saved.
        </div>
      )}

      <div className="mt-6">
        <DestinationForm
          action={boundUpdate}
          initial={{
            id: destination.id,
            slug: destination.slug,
            name: destination.name,
            region: destination.region,
            tagline: destination.tagline,
            blurb: destination.blurb,
            image: destination.image,
            published: destination.published,
          }}
        />
      </div>
    </div>
  );
}