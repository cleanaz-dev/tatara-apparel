'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { carouselProducts, type Product } from '@/lib/products'

export function ProductMarquee() {
  // Duplicate the list so the -50% translate loops seamlessly.
  const loop = [...carouselProducts, ...carouselProducts]

  return (
    <section id="collection" className="overflow-hidden py-16 sm:py-24">
      <div className="mx-auto mb-8 flex max-w-7xl items-end justify-between px-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-primary">The Collection</p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Made for every day
          </h2>
        </div>
        <p className="hidden max-w-xs text-sm text-muted-foreground sm:block text-pretty">
          Considered essentials, cut and finished to last well beyond a single season.
        </p>
      </div>

      <div className="marquee-paused group relative">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-32" />

        <ul className="animate-marquee flex w-max gap-5">
          {loop.map((product, i) => (
            <MarqueeCard key={`${product.id}-${i}`} product={product} />
          ))}
        </ul>
      </div>
    </section>
  )
}

function MarqueeCard({ product }: { product: Product }) {
  return (
    <li className="w-64 shrink-0 sm:w-72">
      <Link href={`/product/${product.id}`} className="group/card block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-card transition-colors group-hover/card:border-primary/50">
          <Image
            src={product.image || '/placeholder.svg'}
            alt={product.name}
            fill
            sizes="288px"
            className="object-cover transition-transform duration-700 group-hover/card:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
          <span className="absolute bottom-4 right-4 flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 transition-opacity group-hover/card:opacity-100">
            <ArrowUpRight className="size-5" />
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate font-display text-base font-semibold text-foreground">
              {product.name}
            </h3>
            <p className="truncate text-xs text-muted-foreground">{product.category}</p>
          </div>
          <span className="shrink-0 font-display text-base font-bold text-foreground">
            ${product.price}
          </span>
        </div>
      </Link>
    </li>
  )
}
