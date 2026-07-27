// context/site-context.tsx
"use client";

import { createContext, useContext, useState } from "react";
import { PromoOverlay } from "@/components/site/promo-overlay";

interface SiteContextType {
  isPromoOpen: boolean;
  setIsPromoOpen: (open: boolean) => void;
  // later: isNewsletterOpen, isSizeGuideOpen, isMobileNavOpen, etc.
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [isPromoOpen, setIsPromoOpen] = useState(true);

  return (
    <SiteContext.Provider value={{ isPromoOpen, setIsPromoOpen }}>
      {children}
      <PromoOverlay open={isPromoOpen} onOpenChange={setIsPromoOpen} />
    </SiteContext.Provider>
  );
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error("useSite must be used within a SiteProvider");
  }
  return context;
}