import { db } from "../prisma";

export async function getAllProducts() {
  const products = await db.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return products;
}
