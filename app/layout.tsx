// import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/cart-context'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { CartDrawer } from '@/components/cart/cart-drawer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Tatara — Apparel',
  description:
    'Tatara makes premium streetwear. Shop heavyweight hoodies, tees, jackets and everyday essentials built to last.',
  icons: {
    icon: [
      {
        url: '/tatara-logo.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/tatara-logo.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/tatara-logo.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/tatara-logo.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0b0d12',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`bg-background ${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased font-sans">
        {/* We keep CartProvider here so cart data persists across the whole app */}
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}