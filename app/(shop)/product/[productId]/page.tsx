import { notFound } from "next/navigation";
import { getProductById } from "@/lib/products"; // Adjust path if needed
import { ProductDetail } from "@/components/product/product-detail";
import { ProductMarquee } from "@/components/product/product-marquee";

interface Params {
  params: Promise<{
    productId: string;
  }>;
}

export default async function Page({ params }: Params) {
  // 1. Await the params (Required in newer versions of Next.js)
  const { productId } = await params;

  // 2. Fetch the product using your mock data function
  const product = getProductById(productId);

  // 3. If the user visits a URL with a fake ID (e.g., /products/fake-id),
  // trigger the Next.js 404 page
  if (!product) {
    notFound();
  }

  // 4. Pass the product data to your Client Component
  return (
    <main>
      <ProductDetail product={product} />
      <ProductMarquee />
    </main>
  );
}
