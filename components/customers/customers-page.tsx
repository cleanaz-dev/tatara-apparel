"use client"

import { usePageHeader } from "@/hooks/use-page-header"

export function CustomersPage() {
  const header = usePageHeader({
    title: "Customers",
    description: "View and manage your customer accounts.",
    action: {
      label: "Add Customer",
      onClick: () => {},
    },
  })

  return (
    <div className="space-y-6">
      {header}
    </div>
  )
}