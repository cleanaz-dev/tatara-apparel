import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth"; // Your Better Auth config
import { UserRole } from "../generated/prisma/enums";

export default async function AdminDashboard() {
  // 1. Check if the user is logged in
  const session = await auth.api.getSession({
    headers: await headers()
  });

  // 2. If no session, kick them to a login page
  if (!session) {
    redirect("https://admin.tatarablades.com/login");
  }

  // 3. Check if they have the "admin" role (added by the plugin!)
  if (session.user.role !== UserRole.ADMIN ) {
    return <div>Access Denied. You are not an admin.</div>;
  }

  // 4. Show the dashboard
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p>Welcome back, {session.user.name}</p>
      
      {/* Here is where you will add your forms to add/edit products */}
    </div>
  );
}