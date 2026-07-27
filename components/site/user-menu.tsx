"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const ADMIN_CONSOLE_URL =
  process.env.NODE_ENV === "production"
    ? "https://admin.tatara-apparel.vercel.app"
    : "http://admin.lvh.me:3000";

export function UserMenu({ onSuccess }: { onSuccess: () => void }) {
  const { data: session, isPending } = authClient.useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignIn() {
    setError(null);
    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      setError(error.message ?? "Sign in failed. Check your details.");
      return;
    }

    onSuccess();
  }

  async function handleSignOut() {
    await authClient.signOut();
    onSuccess();
  }

  if (isPending) {
    return (
      <div className="absolute right-0 top-12 w-72 rounded-xl border border-border bg-popover p-4 shadow-2xl">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (session) {
    const role = session.user.role;

    return (
      <div className="absolute right-0 top-12 w-72 rounded-xl border border-border bg-popover p-4 shadow-2xl">
        <h3 className="font-display text-base font-semibold text-popover-foreground">
          {session.user.name || session.user.email}
        </h3>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Signed in as {session.user.email}
        </p>

        <div className="mt-4 space-y-2">
          {role === "ADMIN" && (
            <a
              href={ADMIN_CONSOLE_URL}
              className="block h-9 w-full rounded-md bg-primary text-center text-sm font-semibold leading-9 text-primary-foreground transition-opacity hover:opacity-90"
            >
              Admin Console
            </a>
          )}

          {role === "CONSUMER" && (
            <>
              <a
                href="/orders"
                className="block h-9 w-full rounded-md border border-border text-center text-sm font-semibold leading-9 text-foreground transition-colors hover:bg-secondary"
              >
                View Orders
              </a>
              <a
                href="/rewards"
                className="block h-9 w-full rounded-md border border-border text-center text-sm font-semibold leading-9 text-foreground transition-colors hover:bg-secondary"
              >
                Rewards
              </a>
            </>
          )}

          <button
            onClick={handleSignOut}
            className="h-9 w-full rounded-md border border-border text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-9 w-full rounded-md border border-border bg-secondary/60 px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-9 w-full rounded-md border border-border bg-secondary/60 px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
        />
        {error && <p className="text-xs text-destructive">{error}</p>}
        <button
          onClick={handleSignIn}
          disabled={loading}
          className="h-9 w-full rounded-md bg-primary text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in"}
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