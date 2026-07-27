// context/site-context.tsx
"use client";

import { createContext, useContext, useState } from "react";
import { PromoOverlay } from "@/components/site/promo-overlay";

interface SiteContextType {
  isPromoOpen: boolean;
  setIsPromoOpen: (open: boolean) => void;
  isUserMenuOpen: boolean;
  setIsUserMenuOpen: (open: boolean) => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [isPromoOpen, setIsPromoOpen] = useState(true);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <SiteContext.Provider
      value={{ isPromoOpen, setIsPromoOpen, isUserMenuOpen, setIsUserMenuOpen }}
    >
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