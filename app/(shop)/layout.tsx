// app/(shop)/layout.tsx
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { CartDrawer } from '@/components/cart/cart-drawer'
import { SiteProvider } from '@/context/site-context'

export default function ShopLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SiteProvider>
      <div id="top">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <CartDrawer />
      </div>
    </SiteProvider>
  )
}