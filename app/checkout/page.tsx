"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Lock, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { push } = useRouter();

  // Based on your product page trust points: "Free shipping over $150"
  const shipping = subtotal === 0 ? 0 : subtotal >= 150 ? 0 : 15;
  const taxes = subtotal * 0.13; // Mock 13% tax
  const total = subtotal + shipping + taxes;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate the time it takes to generate a Stripe Checkout URL
    setTimeout(() => {
      // Clear the cart (optional, since they "paid") and redirect
      // For now, we'll just redirect to the success page
      push("/checkout/success");
    }, 1500);
  };

  // Handle empty cart state
  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
          Your cart is empty
        </h1>
        <p className="mt-4 text-muted-foreground">
          Add some forged blades to get started.
        </p>
        <Link
          href="/#featured"
          className="mt-8 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/#featured"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to shopping
      </Link>

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* LEFT COLUMN: Checkout Form */}
        <div className="lg:col-span-7">
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
            Checkout
          </h1>

          <form onSubmit={handleCheckout} className="mt-8 space-y-8">
            {/* Contact Info */}
            <section>
              <h2 className="text-lg font-semibold text-foreground">
                Contact Information
              </h2>
              <div className="mt-4">
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-card-foreground outline-none focus:border-primary"
                />
              </div>
            </section>

            {/* Shipping Info */}
            <section>
              <h2 className="text-lg font-semibold text-foreground">
                Shipping Address
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  required
                  placeholder="First name"
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-card-foreground outline-none focus:border-primary"
                />
                <input
                  type="text"
                  required
                  placeholder="Last name"
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-card-foreground outline-none focus:border-primary"
                />
                <input
                  type="text"
                  required
                  placeholder="Address"
                  className="w-full sm:col-span-2 rounded-xl border border-border bg-card px-4 py-3 text-sm text-card-foreground outline-none focus:border-primary"
                />
                <input
                  type="text"
                  required
                  placeholder="City"
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-card-foreground outline-none focus:border-primary"
                />
                <input
                  type="text"
                  required
                  placeholder="Postal / Zip Code"
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-card-foreground outline-none focus:border-primary"
                />
              </div>
            </section>

            {/* Payment (Mock) */}
            <section>
              <h2 className="text-lg font-semibold text-foreground">Payment</h2>
              <div className="mt-4 rounded-xl border border-border bg-card p-6 flex flex-col items-center justify-center gap-2 text-muted-foreground">
                <Lock className="size-6 text-muted-foreground/60" />
                <p className="text-sm text-center">
                  This is a mock checkout. No payment details are required.
                </p>
              </div>
            </section>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-transform hover:scale-[1.01] disabled:opacity-70 disabled:hover:scale-100 cursor-pointer"
            >
              {isSubmitting ? "Processing..." : `Pay $${total.toFixed(2)}`}
              {!isSubmitting && <Lock className="size-4" />}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: Order Summary */}
        <div className="lg:col-span-5">
          <div className="sticky top-8 rounded-3xl border border-border bg-card p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-foreground">
              Order Summary
            </h2>

            {/* Items List */}
            <div className="mt-6 flex flex-col gap-6 border-b border-border pb-6">
              {items.map((item) => (
                <div key={item.key} className="flex gap-4">
                  <div className="relative aspect-square size-20 overflow-hidden rounded-xl border border-border bg-secondary">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background shadow-sm">
                      {item.qty}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Size: {item.size}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-foreground">
                      ${(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Cost Breakdown */}
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="text-foreground">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="text-foreground">
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Estimated Tax</span>
                <span className="text-foreground">${taxes.toFixed(2)}</span>
              </div>
              <div className="mt-4 flex justify-between border-t border-border pt-4 text-base font-semibold text-foreground">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Trust badge */}
            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-4" />
              Secure encrypted checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
