"use client"

export function NewsletterForm() {
  return (
    <form className="mt-6 flex max-w-sm gap-2" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="Email for 10% off"
        className="h-11 flex-1 rounded-full border border-border bg-secondary/60 px-4 text-sm text-card-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
      />
      <button className="h-11 shrink-0 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
        Join
      </button>
    </form>
  )
}