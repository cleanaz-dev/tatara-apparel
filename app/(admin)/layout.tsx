import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { UserRole } from "../generated/prisma/enums";

// Pulling from your exact folder structure
import { ModalProvider } from "@/context/modal-context";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { MobileHeader } from "@/components/admin/mobile-header";


export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session || session.user.role !== UserRole.ADMIN) {
    redirect("https://admin.tatara-apparel.vercel.app/login");
  }

  return (
    /* 1. ModalProvider WRAPS EVERYTHING */
    <ModalProvider>ta
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        
        {/* Sidebar is now INSIDE the provider, so it can trigger the modal */}
        <div className="hidden border-r bg-muted/40 md:block">
          <AdminSidebar />
        </div>

        <div className="flex flex-col">
          <MobileHeader user={session.user} />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-8">
            {children}
          </main>
        </div>

      </div>
    </ModalProvider>
  );
}