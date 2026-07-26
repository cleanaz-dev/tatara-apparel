"use server";

import { stripe } from "@/lib/stripe"; // The clean import!
import { revalidatePath } from "next/cache";
import { db } from "../prisma";

export async function createProductAction(formData: FormData) {
  try {
    // 1. Extract data from the form
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const priceInput = formData.get("price") as string;
    const stockInput = formData.get("stock") as string;

    if (!name || !priceInput) throw new Error("Missing required fields");

    // Convert price to cents (e.g. 299.99 -> 29999) 
    const priceInCents = Math.round(parseFloat(priceInput) * 100);
    const stock = parseInt(stockInput) || 0;
    
    // Create a URL-friendly slug
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    // 2. Create the Product in Stripe
    const stripeProduct = await stripe.products.create({
      name,
      description,
    });

    // 3. Create the Price in Stripe attached to that Product
    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: priceInCents,
      currency: "usd",
    });

    // 4. Save everything to your Prisma database
    await db.product.create({
      data: {
        name,
        slug,
        description,
        price: priceInCents,
        stock,
        stripeProductId: stripeProduct.id,
        stripePriceId: stripePrice.id,
      },
    });

    // 5. Tell Next.js to refresh the UI
    revalidatePath("/admin-app/products");

    return { success: true };
  } catch (error) {
    console.error("Failed to create product:", error);
    return { success: false, error: "Failed to create product" };
  }
}