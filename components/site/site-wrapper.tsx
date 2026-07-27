import { HeroShop } from "@/components/site/hero-shop";
import { ProductMarquee } from "@/components/product/product-marquee";
import { OurStory } from "@/components/site/our-story";
import { SiteFooter } from "./site-footer";

export default function SiteWrapper() {
  return (
    <div>
      <HeroShop />
      <ProductMarquee />
      <OurStory />
    </div>
  )
}