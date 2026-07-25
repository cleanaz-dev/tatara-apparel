'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type Slide = {
  type: 'image' | 'video'
  src: string
  poster?: string
  eyebrow: string
  title: string
  copy: string
}

const SLIDES: Slide[] = [
  {
    type: 'image',
    src: '/slides/slide-forge.png',
    eyebrow: 'New Season',
    title: 'Forged in Fire',
    copy: 'Hand-hammered damascus steel, folded 67 times for an edge that lasts a lifetime.',
  },
  {
    type: 'image',
    src: '/slides/slide-collection.png',
    eyebrow: 'The Ronin Line',
    title: 'A Blade for Every Cut',
    copy: 'From nakiri to gyuto — precision instruments built for the modern kitchen.',
  },
]

export function PromoOverlay() {
  const [open, setOpen] = useState(true)
  const [index, setIndex] = useState(0)

  const go = useCallback((dir: number) => {
    setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length)
  }, [])

  // Auto-advance
  useEffect(() => {
    if (!open) return
    const id = setInterval(() => go(1), 6000)
    return () => clearInterval(id)
  }, [open, index, go])

  // Keyboard controls
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, go])

  if (!open) return null

  const slide = SLIDES[index]

  return (
    <div
      className="fixed inset-x-0 top-16 z-40 h-[80vh] w-full overflow-hidden bg-background"
      role="dialog"
      aria-modal="true"
      aria-label="Featured promotions"
    >
      {/* Slides */}
      {SLIDES.map((s, i) => (
        <div
          key={s.src}
          className={cn(
            'absolute inset-0 transition-opacity duration-700 ease-out',
            i === index ? 'opacity-100' : 'opacity-0',
          )}
          aria-hidden={i !== index}
        >
          {s.type === 'video' ? (
            <video
              className="size-full object-cover"
              src={s.src}
              poster={s.poster}
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <Image
              src={s.src || '/placeholder.svg'}
              alt={s.title}
              fill
              priority={i === 0}
              className="object-cover"
              sizes="100vw"
            />
          )}
        </div>
      ))}

      {/* Readability gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />

      {/* Content */}
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <span className="inline-block rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            {slide.eyebrow}
          </span>
          <h2 className="mt-4 text-balance font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {slide.title}
          </h2>
          <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {slide.copy}
          </p>
          <button
            onClick={() => setOpen(false)}
            className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* Close (Shop) button */}
      <button
        onClick={() => setOpen(false)}
        className="absolute right-4 top-4 z-10 inline-flex h-10 items-center gap-2 rounded-full border border-border bg-background/70 px-4 text-sm font-medium text-foreground backdrop-blur-md transition-colors hover:bg-secondary sm:right-6 lg:right-8"
        aria-label="Close and go to shop"
      >
        Shop
        <X className="size-4" />
      </button>

      {/* Prev / Next */}
      <button
        onClick={() => go(-1)}
        className="absolute left-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur-md transition-colors hover:bg-secondary sm:left-6"
        aria-label="Previous slide"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        onClick={() => go(1)}
        className="absolute right-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur-md transition-colors hover:bg-secondary sm:right-6"
        aria-label="Next slide"
      >
        <ChevronRight className="size-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.src}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              'h-2 rounded-full transition-all',
              i === index ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/40 hover:bg-muted-foreground',
            )}
          />
        ))}
      </div>
    </div>
  )
}
