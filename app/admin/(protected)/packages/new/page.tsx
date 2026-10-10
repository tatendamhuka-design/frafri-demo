import { prisma } from "../../../../../lib/prisma";
import PackageForm from "../PackageForm";

export default async function NewPackagePage() {
  const destinations = await prisma.destination.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <h1 className="text-xl font-semibold" style={{ color: "#0a0a0a" }}>
        New Package
      </h1>
      <p className="mt-1 text-sm" style={{ color: "#6b7280" }}>
        Fill in the details below.
      </p>
      <div className="mt-6">
        <PackageForm destinations={destinations} />
      </div>
    </div>
  );
}