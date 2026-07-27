import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { UserRole } from "@/app/generated/prisma/enums";

import { ModalProvider } from "@/context/modal-context";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { MobileHeader } from "@/components/admin/mobile-header";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== UserRole.ADMIN) {
    const loginUrl =
      process.env.NODE_ENV === "production"
        ? "https://admin.tatara-apparel.vercel.app/admin-login"
        : "http://admin.lvh.me:3000/admin-login";

    redirect(loginUrl);
  }

  return (
    <ModalProvider>
      {/* SidebarProvider wraps everything and manages the open/close state */}
      <SidebarProvider>
        
        {/* Your new shadcn sidebar */}
        <AdminSidebar />
        
        {/* SidebarInset wraps the main content and adjusts its width automatically */}
        <SidebarInset>
          
          {/* Top Header Section */}
          <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4 lg:h-[60px] lg:px-6">
            {/* The Trigger is the hamburger menu on mobile, or collapse button on desktop */}
            <SidebarTrigger className="-ml-1" />
            
            {/* Space to push the MobileHeader/User Profile to the right side
            <div className="flex flex-1 items-center justify-end">
              <MobileHeader user={session.user} />
            </div> */}
          </header>

          {/* Main Content Area */}
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-8">
            {children}
          </main>
          
        </SidebarInset>
      </SidebarProvider>
    </ModalProvider>
  );
}