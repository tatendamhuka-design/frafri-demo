import { redirect } from "next/navigation";
import { requireAdmin } from "../../../lib/auth";
import AdminSidebar from "../AdminSidebar";
import AdminTopbar from "../AdminTopbar";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdmin();
  if (!user) redirect("/admin/login");

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#f7f8fa" }}>
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopbar userName={user.name} userEmail={user.email} />
        <main className="flex-1 px-6 py-6 lg:px-10 lg:py-8">{children}</main>
      </div>
    </div>
  );
}