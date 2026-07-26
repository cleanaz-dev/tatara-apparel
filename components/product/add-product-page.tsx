"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createProductAction } from "@/lib/actions/create-product";

export function AddProductPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const result = await createProductAction(formData);
      
      if (result.success) {
        // Redirect back to the products list when done!
        router.push("/admin-app/products");
      } else {
        alert("Failed to create product.");
      }
    });
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Product Name</Label>
        <Input id="name" name="name" placeholder="Tatara Katana V2" required disabled={isPending} />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" placeholder="Blade specifications..." required disabled={isPending} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input id="image" name="image" type="url" placeholder="https://example.com/blade.png" disabled={isPending} />
        <p className="text-xs text-muted-foreground">Paste a direct link to the image (we will add file uploading later).</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price (USD)</Label>
          <Input id="price" name="price" type="number" step="0.01" placeholder="299.99" required disabled={isPending} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stock">Initial Stock</Label>
          <Input id="stock" name="stock" type="number" placeholder="10" required disabled={isPending} />
        </div>
      </div>

      <div className="pt-4 flex justify-end gap-4 border-t mt-6">
        <Button 
          type="button" 
          variant="ghost" 
          onClick={() => router.push("/admin-app/products")}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating in Stripe..." : "Create Product"}
        </Button>
      </div>
    </form>
  );
}