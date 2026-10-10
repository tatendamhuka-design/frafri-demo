"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "../prisma";
import { requireAdmin } from "../auth";

export async function updateEnquiryStatus(id: string, formData: FormData) {
  const user = await requireAdmin();
  if (!user) throw new Error("Unauthorized");

  const status = String(formData.get("status") || "new");

  await prisma.enquiry.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/admin/enquiries");
  revalidatePath(`/admin/enquiries/${id}`);
  revalidatePath("/admin");
  redirect(`/admin/enquiries/${id}?saved=1`);
}

export async function deleteEnquiry(id: string) {
  const user = await requireAdmin();
  if (!user) throw new Error("Unauthorized");

  await prisma.enquiry.delete({ where: { id } });

  revalidatePath("/admin/enquiries");
  revalidatePath("/admin");
  redirect("/admin/enquiries");
}