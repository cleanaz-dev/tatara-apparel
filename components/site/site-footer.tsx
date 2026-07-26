import { NewsletterForm } from "./news-letter-form";

const SOCIALS = ["Instagram", "X", "YouTube"];

const FOOTER_COLS = [
  {
    title: "Shop",
    links: ["Hoodies", "Shirts", "Jackets", "Accessories"],
  },
  {
    title: "Company",
    links: ["Our Story", "The Workshop", "Sustainability", "Careers", "Press"],
  },
  {
    title: "Support",
    links: ["Shipping", "Returns", "Warranty", "Care Guide", "Contact"],
  },
];

export function SiteFooter() {
  return (
    <footer id="story" className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <a href="#top" className="flex items-center gap-2">
              <img
                src="/tatara-symbol-128.png"
                alt="Tatara"
                className="size-8 object-contain"
              />
              <span className="font-display text-xl font-bold tracking-tight text-card-foreground">
                TATARA
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground text-pretty">
              Premium apparel designed for comfort and performance. Elevated
              essentials crafted for your everyday life.
            </p>

            <NewsletterForm />
          </div>

          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-sm font-semibold text-card-foreground">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Tatara Apparel. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            {SOCIALS.map((name) => (
              <a
                key={name}
                href="#"
                className="rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
