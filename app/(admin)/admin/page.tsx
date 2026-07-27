import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { 
  Package, 
  Users, 
  Settings, 
  ShoppingCart, 
  TrendingUp, 
  CreditCard, 
  FileText
} from "lucide-react";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userName = session?.user?.name || "Admin";

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* 1. Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Overview
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Welcome back, <span className="font-medium text-foreground">{userName}</span>. 
              Here is what's happening with Tatara Blades today.
            </p>
          </div>
          <div className="flex gap-3">
            <Link 
              href="/admin/products/new" 
              className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              + Add New Product
            </Link>
          </div>
        </header>

        {/* 2. Quick Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Revenue" value="$24,563.00" trend="+12.5%" icon={<TrendingUp className="w-4 h-4 text-muted-foreground" />} />
          <StatCard title="Active Orders" value="142" trend="+5.2%" icon={<ShoppingCart className="w-4 h-4 text-muted-foreground" />} />
          <StatCard title="Total Customers" value="3,492" trend="+18.1%" icon={<Users className="w-4 h-4 text-muted-foreground" />} />
          <StatCard title="Total Sales" value="892" trend="+2.4%" icon={<CreditCard className="w-4 h-4 text-muted-foreground" />} />
        </div>

        {/* 3. Main Management Modules */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-foreground">
            Control Center
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Module: Orders */}
            <DashboardCard
              title="Orders & Transactions"
              description="Fulfill active orders, view recent transactions, and handle refunds."
              icon={<ShoppingCart className="w-6 h-6 text-foreground" />}
              href="/admin/transactions"
              linkText="Manage Orders"
            />

            {/* Module: Products */}
            <DashboardCard
              title="Products & Inventory"
              description="Manage your Tatara Blades catalog, update pricing, and track stock levels."
              icon={<Package className="w-6 h-6 text-foreground" />}
              href="/admin/products"
              linkText="Manage Products"
            />

            {/* Module: Customers */}
            <DashboardCard
              title="Customers"
              description="View customer profiles, purchase history, and manage accounts."
              icon={<Users className="w-6 h-6 text-foreground" />}
              href="/admin/customers"
              linkText="View Customers"
            />

            {/* Module: Content */}
            <DashboardCard
              title="Content & Marketing"
              description="Manage blog posts, promotional banners, and SEO metadata."
              icon={<FileText className="w-6 h-6 text-foreground" />}
              href="/admin/content"
              linkText="Manage Content"
            />

            {/* Module: Settings */}
            <DashboardCard
              title="System Settings"
              description="Configure store settings, payment gateways, and API keys."
              icon={<Settings className="w-6 h-6 text-foreground" />}
              href="/admin/settings"
              linkText="Open Settings"
            />
            
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Reusable UI Components ---

function StatCard({ title, value, trend, icon }: { title: string, value: string, trend: string, icon: React.ReactNode }) {
  return (
    <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon}
      </div>
      <div className="text-2xl font-bold text-card-foreground">{value}</div>
      <p className="text-xs font-medium text-emerald-500 mt-1">
        {trend} from last month
      </p>
    </div>
  );
}

function DashboardCard({ 
  title, 
  description, 
  icon, 
  href, 
  linkText 
}: { 
  title: string, 
  description: string, 
  icon: React.ReactNode, 
  href: string, 
  linkText: string 
}) {
  return (
    <div className="bg-card p-6 rounded-xl shadow-sm border border-border flex flex-col hover:border-muted-foreground/30 transition-colors duration-200 group">
      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4">
        {icon}
      </div>
      <h2 className="text-lg font-semibold text-card-foreground">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground flex-grow leading-relaxed">
        {description}
      </p>
      <div className="mt-6 pt-4 border-t border-border">
        <Link 
          href={href}
          className="flex w-full items-center justify-center px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors"
        >
          {linkText}
        </Link>
      </div>
    </div>
  );
}