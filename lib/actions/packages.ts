"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "../prisma";
import { requireAdmin } from "../auth";

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function createPackage(formData: FormData) {
  const user = await requireAdmin();
  if (!user) throw new Error("Unauthorized");

  const title = String(formData.get("title") || "").trim();
  const slug = String(formData.get("slug") || "").trim() || toSlug(title);

  const destinationIds = formData.getAll("destinationIds").map(String);

  const created = await prisma.package.create({
    data: {
      slug,
      title,
      duration: String(formData.get("duration") || ""),
      groupSize: String(formData.get("groupSize") || ""),
      location: String(formData.get("location") || ""),
      priceFrom: Number(formData.get("priceFrom") || 0),
      image: String(formData.get("image") || ""),
      summary: String(formData.get("summary") || ""),
      highlights: String(formData.get("highlights") || "")
        .split("\n")
        .map((h) => h.trim())
        .filter(Boolean),
      featured: formData.get("featured") === "on",
      published: formData.get("published") === "on",
      destinations: {
        connect: destinationIds.map((id) => ({ id })),
      },
    },
  });

  revalidatePath("/admin/packages");
  revalidatePath("/all-tours");
  revalidatePath("/");
  redirect(`/admin/packages/${created.id}`);
}

export async function updatePackage(id: string, formData: FormData) {
  const user = await requireAdmin();
  if (!user) throw new Error("Unauthorized");

  const title = String(formData.get("title") || "").trim();
  const slug = String(formData.get("slug") || "").trim() || toSlug(title);
  const destinationIds = formData.getAll("destinationIds").map(String);

  await prisma.package.update({
    where: { id },
    data: {
      slug,
      title,
      duration: String(formData.get("duration") || ""),
      groupSize: String(formData.get("groupSize") || ""),
      location: String(formData.get("location") || ""),
      priceFrom: Number(formData.get("priceFrom") || 0),
      image: String(formData.get("image") || ""),
      summary: String(formData.get("summary") || ""),
      highlights: String(formData.get("highlights") || "")
        .split("\n")
        .map((h) => h.trim())
        .filter(Boolean),
      featured: formData.get("featured") === "on",
      published: formData.get("published") === "on",
      destinations: {
        set: destinationIds.map((id) => ({ id })),
      },
    },
  });

  revalidatePath("/admin/packages");
  revalidatePath(`/admin/packages/${id}`);
  revalidatePath("/all-tours");
  revalidatePath("/");
  revalidatePath(`/${slug}`);
  redirect(`/admin/packages/${id}?saved=1`);
}

export async function deletePackage(id: string) {
  const user = await requireAdmin();
  if (!user) throw new Error("Unauthorized");

  await prisma.package.delete({ where: { id } });

  revalidatePath("/admin/packages");
  revalidatePath("/all-tours");
  revalidatePath("/");
  redirect("/admin/packages");
}