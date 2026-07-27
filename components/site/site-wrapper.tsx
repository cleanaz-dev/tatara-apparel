import { HeroShop } from "@/components/site/hero-shop";
import { ProductMarquee } from "@/components/product/product-marquee";
import { PromoOverlay } from "@/components/site/promo-overlay";
import { OurStory } from "@/components/site/our-story";
import { SiteFooter } from "./site-footer";

export default function SiteWrapper() {
  return (
    <>
      <HeroShop />
      <ProductMarquee />
      <PromoOverlay />
      <OurStory />
    </>
  )
}