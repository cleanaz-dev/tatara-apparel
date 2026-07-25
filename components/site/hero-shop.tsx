'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { featuredProduct, sideProducts, type Product } from '@/lib/products'

export function HeroShop() {
  return (
    <section
      id="featured"
      className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 lg:grid lg:grid-cols-4 lg:gap-6 lg:px-8"
    >
      {/* Featured — large */}
      <article className="group relative flex flex-1 flex-col overflow-hidden rounded-3xl border border-border bg-card lg:col-span-2 lg:row-span-2">
        <div className="absolute left-6 top-6 z-10 flex items-center gap-2">
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            Flagship
          </span>
          <span className="rounded-full bg-background/60 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
            {featuredProduct.material}
          </span>
        </div>

        <Link
          href={`/product/${featuredProduct.id}`}
          className="relative flex-1 min-h-64 overflow-hidden"
          aria-label={`View ${featuredProduct.name}`}
        >
          <Image
            src={featuredProduct.image || '/placeholder.svg'}
            alt={featuredProduct.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        </Link>

        <div className="relative flex flex-col gap-4 p-6 sm:p-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-primary">
              {featuredProduct.category}
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-card-foreground text-balance sm:text-4xl">
              {featuredProduct.name}
            </h1>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground text-pretty">
              {featuredProduct.tagline}
            </p>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="font-display text-2xl font-bold text-card-foreground">
              ${featuredProduct.price}
            </span>
            <Link
              href={`/product/${featuredProduct.id}`}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Shop now
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </article>

      {/* Two side products */}
      {sideProducts.map((product) => (
        <SideCard key={product.id} product={product} />
      ))}
    </section>
  )
}

function SideCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-colors hover:border-primary/50 lg:col-span-2"
    >
      <div className="relative min-h-44 flex-1 overflow-hidden">
        <Image
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          fill
          sizes="(max-width: 1024px) 100vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        <span className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
          <ArrowUpRight className="size-5" />
        </span>
      </div>
      <div className="flex items-center justify-between gap-3 p-5">
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-widest text-primary">
            {product.category}
          </p>
          <h2 className="mt-1 truncate font-display text-lg font-semibold text-card-foreground">
            {product.name}
          </h2>
          <p className="truncate text-xs text-muted-foreground">{product.tagline}</p>
        </div>
        <span className="shrink-0 font-display text-lg font-bold text-card-foreground">
          ${product.price}
        </span>
      </div>
    </Link>
  )
}
