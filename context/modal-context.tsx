"use client";

import { createContext, useContext, useState } from "react";
import { AddProductModal } from "@/components/product/add-product-modal";

interface ModalContextType {
  isAddProductOpen: boolean;
  setIsAddProductOpen: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isAddProductOpen, setIsAddProductOpen }}>
      {children}
      {/* The modal is mounted here at the root of the admin layout */}
      <AddProductModal open={isAddProductOpen} onOpenChange={setIsAddProductOpen} />
    </ModalContext.Provider>
  );
}

export function useAdminModals() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useAdminModals must be used within a ModalProvider");
  }
  return context;
}