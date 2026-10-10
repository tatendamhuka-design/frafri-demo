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

export async function createGuide(formData: FormData) {
  const user = await requireAdmin();
  if (!user) throw new Error("Unauthorized");

  const title = String(formData.get("title") || "").trim();
  const slug = String(formData.get("slug") || "").trim() || toSlug(title);
  const destinationId = String(formData.get("destinationId") || "").trim();

  const created = await prisma.guide.create({
    data: {
      slug,
      title,
      category: String(formData.get("category") || "Travel Guide"),
      readTime: String(formData.get("readTime") || "5 min read"),
      excerpt: String(formData.get("excerpt") || ""),
      content: String(formData.get("content") || ""),
      image: String(formData.get("image") || ""),
      published: formData.get("published") === "on",
      destinationId: destinationId || null,
    },
  });

  revalidatePath("/admin/guides");
  revalidatePath("/travel-guides");
  revalidatePath("/");
  redirect(`/admin/guides/${created.id}`);
}

export async function updateGuide(id: string, formData: FormData) {
  const user = await requireAdmin();
  if (!user) throw new Error("Unauthorized");

  const title = String(formData.get("title") || "").trim();
  const slug = String(formData.get("slug") || "").trim() || toSlug(title);
  const destinationId = String(formData.get("destinationId") || "").trim();

  await prisma.guide.update({
    where: { id },
    data: {
      slug,
      title,
      category: String(formData.get("category") || "Travel Guide"),
      readTime: String(formData.get("readTime") || "5 min read"),
      excerpt: String(formData.get("excerpt") || ""),
      content: String(formData.get("content") || ""),
      image: String(formData.get("image") || ""),
      published: formData.get("published") === "on",
      destinationId: destinationId || null,
    },
  });

  revalidatePath("/admin/guides");
  revalidatePath(`/admin/guides/${id}`);
  revalidatePath("/travel-guides");
  revalidatePath("/");
  revalidatePath(`/${slug}`);
  redirect(`/admin/guides/${id}?saved=1`);
}

export async function deleteGuide(id: string) {
  const user = await requireAdmin();
  if (!user) throw new Error("Unauthorized");

  await prisma.guide.delete({ where: { id } });

  revalidatePath("/admin/guides");
  revalidatePath("/travel-guides");
  revalidatePath("/");
  redirect("/admin/guides");
}