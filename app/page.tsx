import { HeroShop } from '@/components/site/hero-shop'
import { ProductMarquee } from '@/components/product/product-marquee'
import { PromoOverlay } from '@/components/site/promo-overlay'

export default function Page() {
  return (
    <>
      <HeroShop />
      <ProductMarquee />
      <PromoOverlay />
    </>
  )
}
