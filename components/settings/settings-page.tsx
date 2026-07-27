"use client"
import { usePageHeader } from "@/hooks/use-page-header"

export function SettingsPage() {
  const header = usePageHeader({
    title: "Settings",
    description: "Manage your account and application preferences.",
    action: {
      label: "Save Changes",
      onClick: () => {},
    },
  })

  return (
    <div className="space-y-6">
      {header}
    </div>
  )
}