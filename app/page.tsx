import { HeroShop } from '@/components/site/hero-shop'
import { ProductMarquee } from '@/components/product/product-marquee'
import { PromoOverlay } from '@/components/site/promo-overlay'
import { OurStory } from '@/components/site/our-story'

export default function Page() {
  return (
    <>
      <HeroShop />
      <ProductMarquee />
      <PromoOverlay />
      <OurStory />
    </>
  )
}
