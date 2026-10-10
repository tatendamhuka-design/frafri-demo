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

export async function createDestination(formData: FormData) {
  const user = await requireAdmin();
  if (!user) throw new Error("Unauthorized");

  const name = String(formData.get("name") || "").trim();
  const slug = String(formData.get("slug") || "").trim() || toSlug(name);

  const created = await prisma.destination.create({
    data: {
      slug,
      name,
      region: String(formData.get("region") || ""),
      tagline: String(formData.get("tagline") || ""),
      blurb: String(formData.get("blurb") || ""),
      image: String(formData.get("image") || ""),
      published: formData.get("published") === "on",
    },
  });

  revalidatePath("/admin/destinations");
  revalidatePath("/destinations");
  revalidatePath("/");
  redirect(`/admin/destinations/${created.id}`);
}

export async function updateDestination(id: string, formData: FormData) {
  const user = await requireAdmin();
  if (!user) throw new Error("Unauthorized");

  const name = String(formData.get("name") || "").trim();
  const slug = String(formData.get("slug") || "").trim() || toSlug(name);

  await prisma.destination.update({
    where: { id },
    data: {
      slug,
      name,
      region: String(formData.get("region") || ""),
      tagline: String(formData.get("tagline") || ""),
      blurb: String(formData.get("blurb") || ""),
      image: String(formData.get("image") || ""),
      published: formData.get("published") === "on",
    },
  });

  revalidatePath("/admin/destinations");
  revalidatePath(`/admin/destinations/${id}`);
  revalidatePath("/destinations");
  revalidatePath("/");
  revalidatePath(`/destinations/${slug}`);
  redirect(`/admin/destinations/${id}?saved=1`);
}

export async function deleteDestination(id: string) {
  const user = await requireAdmin();
  if (!user) throw new Error("Unauthorized");

  await prisma.destination.delete({ where: { id } });

  revalidatePath("/admin/destinations");
  revalidatePath("/destinations");
  revalidatePath("/");
  redirect("/admin/destinations");
}