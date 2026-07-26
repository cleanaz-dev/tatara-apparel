import { ProductsPage } from "@/components/product/products-page";
import { getAllProducts } from "@/lib/actions/get-all-products";

export default async function Page() {
  const products = await getAllProducts();

  return <ProductsPage products={products} />;
}
