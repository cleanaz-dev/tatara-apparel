"use client";

import { useEffect, useRef, useState } from "react";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/brand";

const NAV_LINKS = [
  { label: "Clothing", href: "#featured" },
  { label: "Collection", href: "#collection" },
  // { label: 'Story', href: '#story' },
];

export function SiteHeader() {
  const { count, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [query, setQuery] = useState("");
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Left: logo + nav */}
        <div className="flex items-center gap-8">
          <button
            className="lg:hidden text-foreground"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>

          <a
            href="#top"
            className="flex items-center gap-2"
            aria-label="Tatara home"
          >
            <img
              src="/tatara-symbol-128.png"
              alt="Tatara"
              className="size-8 object-contain"
            />
            <span className="font-display text-xl font-bold tracking-tight text-foreground">
              {BRAND.styledName}
            </span>
          </a>

          <nav
            className="hidden items-center gap-6 lg:flex"
            aria-label="Products"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Center: search */}
        <div className="mx-auto hidden w-full max-w-md md:block">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search blades, steel, collections..."
              className="h-10 w-full rounded-full border border-border bg-secondary/60 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary focus:bg-secondary"
            />
          </div>
        </div>

        {/* Right: cart + user */}
        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <button
            className="flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary md:hidden"
            aria-label="Search"
          >
            <Search className="size-5" />
          </button>

          <button
            onClick={openCart}
            className="relative flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary"
            aria-label={`Cart with ${count} items`}
          >
            <ShoppingBag className="size-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </button>

          <div className="relative" ref={userRef}>
            <button
              onClick={() => setUserOpen((v) => !v)}
              className="flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary"
              aria-label="Account"
              aria-expanded={userOpen}
            >
              <User className="size-5" />
            </button>
            {userOpen && <UserMenu />}
          </div>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <div
        className={cn(
          "overflow-hidden border-t border-border transition-all duration-300 lg:hidden",
          mobileOpen ? "max-h-96" : "max-h-0",
        )}
      >
        <div className="space-y-1 px-4 py-4">
          <div className="relative mb-3 md:hidden">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="h-10 w-full rounded-full border border-border bg-secondary/60 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
            />
          </div>
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

function UserMenu() {
  return (
    <div className="absolute right-0 top-12 w-72 rounded-xl border border-border bg-popover p-4 shadow-2xl">
      <h3 className="font-display text-base font-semibold text-popover-foreground">
        Welcome back
      </h3>
      <p className="mt-0.5 text-xs text-muted-foreground">
        Sign in to track orders and save blades.
      </p>
      <div className="mt-4 space-y-2">
        <input
          type="email"
          placeholder="Email"
          className="h-9 w-full rounded-md border border-border bg-secondary/60 px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
        />
        <input
          type="password"
          placeholder="Password"
          className="h-9 w-full rounded-md border border-border bg-secondary/60 px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
        />
        <button className="h-9 w-full rounded-md bg-primary text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
          Sign in
        </button>
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        New here?{" "}
        <a href="#" className="font-medium text-primary hover:underline">
          Create an account
        </a>
      </p>
    </div>
  );
}
