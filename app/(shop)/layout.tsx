// app/(shop)/layout.tsx
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { CartDrawer } from '@/components/cart/cart-drawer'

export default function ShopLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div id="top" className="">
      <SiteHeader />
      <main className="">
        {children}
      </main>
      <SiteFooter />
      <CartDrawer />
    </div>
  )
}