"use client"
import { usePageHeader } from "@/hooks/use-page-header"

export function TransactionsPage() {
  const header = usePageHeader({
    title: "Transactions",
    description: "View and manage all payment transactions.",
    action: {
      label: "Export",
      onClick: () => {},
    },
  })

  return (
    <div className="space-y-6">
      {header}
    </div>
  )
}