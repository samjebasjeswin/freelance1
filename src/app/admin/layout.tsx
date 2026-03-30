import { cookies } from "next/headers";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout(props: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  const isAuthed = session === "1";

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-white pt-20 md:pt-24">
        <AdminLoginForm />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20 md:pt-24">
      <div className="flex min-h-screen">
        <div className="hidden md:block">
          <AdminSidebar />
        </div>
        <main className="flex-1">
          {props.children}
        </main>
      </div>
    </div>
  );
}

