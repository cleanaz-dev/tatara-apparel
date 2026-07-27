"use client"

import Link from "next/link"
import { Menu, Sword } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { navItems } from "./admin-sidebar"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function MobileHeader({ user }: { user: any }) {
  const pathname = usePathname()

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 md:hidden">
      <Sheet>
        <SheetTrigger
          render={
            <Button variant="outline" size="icon" className="shrink-0 md:hidden" />
          }
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <nav className="grid gap-2 text-lg font-medium mt-6">
            <Link href="/admin" className="flex items-center gap-2 text-lg font-semibold mb-4">
              <Sword className="h-6 w-6" />
              <span>Tatara Admin</span>
            </Link>
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = item.href === '/admin' ? pathname === item.href : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                    isActive && "bg-muted text-primary"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="w-full flex justify-end">
         {/* You can add a User Avatar dropdown menu here later! */}
         <span className="text-sm text-muted-foreground">{user?.name}</span>
      </div>
    </header>
  )
}