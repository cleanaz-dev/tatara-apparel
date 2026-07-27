import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function AdminDashboardPage() {
  // We still fetch the session here just to get the user's name for the UI.
  // Next.js request memoization makes this basically free since we called it in the layout already.
  const session = await auth.api.getSession({
    headers: await headers()
  });

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      
      {/* A nice shadcn-style placeholder card */}
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-10">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            Welcome back, {session?.user.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-md">
            This is your control center. Use the sidebar to manage your Tatara Blades products, view recent transactions, and generate content.
          </p>
        </div>
      </div>
    </>
  );
}