
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AddProductPage } from "@/components/product/add-product-page";

export default function Page() {
  return (
    <div className="max-w-2xl w-full flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon">
          <Link href="/admin-app/products">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Add New Product</h1>
      </div>
      
      <div className="rounded-md border bg-card p-6">
        <AddProductPage />
      </div>
    </div>
  );
}