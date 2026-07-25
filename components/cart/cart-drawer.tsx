"use client";

import Image from "next/image";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, subtotal, count } =
    useCart();

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        className={cn(
          "fixed inset-0 z-[60] bg-background/70 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!isOpen}
      />

      {/* Panel */}
      <aside
        className={cn(
          "fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-border bg-card shadow-2xl transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-label="Shopping cart"
        aria-modal={isOpen}
      >
        <div className="flex items-center justify-between border-b border-border p-5">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold text-card-foreground">
            <ShoppingBag className="size-5" />
            Your cart
            <span className="text-muted-foreground">({count})</span>
          </h2>
          <button
            onClick={closeCart}
            className="flex size-9 items-center justify-center rounded-full text-card-foreground transition-colors hover:bg-secondary"
            aria-label="Close cart"
          >
            <X className="size-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-secondary">
              <ShoppingBag className="size-7 text-muted-foreground" />
            </div>
            <p className="font-display text-base font-semibold text-card-foreground">
              Your cart is empty
            </p>
            <p className="max-w-xs text-sm text-muted-foreground">
              Add a piece to your rotation to get started.
            </p>
            <button
              onClick={closeCart}
              className="mt-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Browse the collection
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-5">
              {items.map((item) => (
                <li key={item.key} className="flex gap-4 py-4">
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-lg border border-border bg-secondary">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="truncate font-display text-sm font-semibold text-card-foreground">
                          {item.name}
                        </h3>
                        <p className="truncate text-xs text-muted-foreground">
                          {item.category} · Size {item.size}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.key)}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                        aria-label={`Remove ${item.name}`}
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-full border border-border">
                        <button
                          onClick={() => updateQty(item.key, item.qty - 1)}
                          className="flex size-7 items-center justify-center text-card-foreground transition-colors hover:text-primary"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-7 text-center text-sm font-medium text-card-foreground">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.key, item.qty + 1)}
                          className="flex size-7 items-center justify-center text-card-foreground transition-colors hover:text-primary"
                          aria-label="Increase quantity"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <span className="font-display text-sm font-bold text-card-foreground">
                        ${item.price * item.qty}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-border p-5">
              <div className="mb-1 flex items-center justify-between text-sm text-muted-foreground">
                <span>Shipping</span>
                <span className="text-card-foreground">Free</span>
              </div>
              <div className="mb-4 flex items-center justify-between">
                <span className="font-medium text-card-foreground">
                  Subtotal
                </span>
                <span className="font-display text-xl font-bold text-card-foreground">
                  ${subtotal.toLocaleString()}
                </span>
              </div>
              <Link href="/checkout">
                <Button 
                  className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
                  onClick={closeCart}
                  size="lg">
                  Checkout
                </Button>
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
