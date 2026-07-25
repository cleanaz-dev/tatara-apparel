'use client'

import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { useCart } from '@/context/cart-context'
import { useEffect } from 'react'

export default function CheckoutSuccessPage() {
  const { items, removeItem } = useCart()

  // Optional: Empty the cart when they reach the success page
  useEffect(() => {
    items.forEach(item => removeItem(item.key))
  }, []) // Empty dependency array so it only runs once on mount

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <CheckCircle className="size-16 text-primary mb-6" />
      <h1 className="font-display text-4xl font-bold tracking-tight text-foreground">
        Order Confirmed
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        Thank you for your order! We've received it and are preparing it for the forge. You will receive an email confirmation shortly.
      </p>
      
      <div className="mt-8 rounded-2xl border border-border bg-card p-6 w-full max-w-sm">
        <p className="text-sm text-muted-foreground">Order Number</p>
        <p className="font-mono text-lg font-semibold text-foreground mt-1">
          #TB-{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}
        </p>
      </div>

      <Link
        href="/#featured"
        className="mt-8 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
      >
        Continue Shopping
      </Link>
    </div>
  )
}