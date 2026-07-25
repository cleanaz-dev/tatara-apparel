'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Check, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/cart-context'
import { cn } from '@/lib/utils'
import type { Product } from '@/lib/products'

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart()
  const singleSize = product.sizes.length === 1
  const [size, setSize] = useState<string | null>(singleSize ? product.sizes[0] : null)
  const [qty, setQty] = useState(1)
  const [error, setError] = useState(false)

  const handleAdd = () => {
    if (!size) {
      setError(true)
      return
    }
    addItem(product, size, qty)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <Link
        href="/#featured"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to shop
      </Link>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-card">
          <Image
            src={product.image || '/placeholder.svg'}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <span className="absolute left-6 top-6 rounded-full bg-background/60 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
            {product.material}
          </span>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <p className="text-xs font-medium uppercase tracking-widest text-primary">
            {product.category}
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-3 font-display text-2xl font-bold text-foreground">${product.price}</p>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground text-pretty">
            {product.description}
          </p>

          {/* Size selector */}
          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">
                {singleSize ? 'Size' : 'Select size'}
              </span>
              {error && !size && (
                <span className="text-xs font-medium text-destructive">Please choose a size</span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setSize(s)
                    setError(false)
                  }}
                  className={cn(
                    'min-w-14 rounded-xl border px-4 py-3 text-sm font-medium transition-colors',
                    size === s
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card text-card-foreground hover:border-primary/50',
                  )}
                  aria-pressed={size === s}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + add to cart */}
          <div className="mt-8 flex items-center gap-3">
            <div className="flex items-center rounded-full border border-border">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex size-11 items-center justify-center text-foreground transition-colors hover:text-primary"
                aria-label="Decrease quantity"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-8 text-center text-sm font-semibold text-foreground">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="flex size-11 items-center justify-center text-foreground transition-colors hover:text-primary"
                aria-label="Increase quantity"
              >
                <Plus className="size-4" />
              </button>
            </div>
            <button
              onClick={handleAdd}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              <ShoppingBag className="size-4" />
              Add to cart
            </button>
          </div>

          {/* Trust points */}
          <ul className="mt-8 space-y-2 border-t border-border pt-6">
            {['Free shipping over $150', 'Easy 30-day returns', 'Ethically made in limited runs'].map(
              (point) => (
                <li key={point} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="size-4 text-primary" />
                  {point}
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
