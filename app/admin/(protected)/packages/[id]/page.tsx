import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "../../../../../lib/prisma";
import PackageForm from "../PackageForm";
import { updatePackage, deletePackage } from "../../../../../lib/actions/packages";

export default async function EditPackagePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { id } = await params;
  const { saved } = await searchParams;

  const [pkg, destinations] = await Promise.all([
    prisma.package.findUnique({
      where: { id },
      include: { destinations: true },
    }),
    prisma.destination.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!pkg) notFound();

  const boundUpdate = updatePackage.bind(null, id);
  const boundDelete = deletePackage.bind(null, id);

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/admin/packages"
            className="text-xs font-semibold"
            style={{ color: "#6b7280" }}
          >
            ← Back to packages
          </Link>
          <h1 className="mt-3 text-xl font-semibold" style={{ color: "#0a0a0a" }}>
            Edit Package
          </h1>
          <p className="mt-1 text-sm" style={{ color: "#6b7280" }}>
            {pkg.title}
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
        <PackageForm
          destinations={destinations}
          action={boundUpdate}
          initial={{
            id: pkg.id,
            slug: pkg.slug,
            title: pkg.title,
            duration: pkg.duration,
            groupSize: pkg.groupSize,
            location: pkg.location,
            priceFrom: pkg.priceFrom,
            image: pkg.image,
            summary: pkg.summary,
            highlights: pkg.highlights,
            featured: pkg.featured,
            published: pkg.published,
            destinationIds: pkg.destinations.map((d) => d.id),
          }}
        />
      </div>
    </div>
  );
}