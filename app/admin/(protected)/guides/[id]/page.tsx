import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "../../../../../lib/prisma";
import GuideForm from "../GuideForm";
import { updateGuide, deleteGuide } from "../../../../../lib/actions/guides";

export default async function EditGuidePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { id } = await params;
  const { saved } = await searchParams;

  const [guide, destinations] = await Promise.all([
    prisma.guide.findUnique({ where: { id } }),
    prisma.destination.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!guide) notFound();

  const boundUpdate = updateGuide.bind(null, id);
  const boundDelete = deleteGuide.bind(null, id);

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/admin/guides"
            className="text-xs font-semibold"
            style={{ color: "#6b7280" }}
          >
            ← Back to guides
          </Link>
          <h1 className="mt-3 text-xl font-semibold" style={{ color: "#0a0a0a" }}>
            Edit Travel Guide
          </h1>
          <p className="mt-1 text-sm" style={{ color: "#6b7280" }}>
            {guide.title}
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
        <GuideForm
          destinations={destinations}
          action={boundUpdate}
          initial={{
            id: guide.id,
            slug: guide.slug,
            title: guide.title,
            category: guide.category,
            readTime: guide.readTime,
            excerpt: guide.excerpt,
            content: guide.content,
            image: guide.image,
            published: guide.published,
            destinationId: guide.destinationId,
          }}
        />
      </div>
    </div>
  );
}