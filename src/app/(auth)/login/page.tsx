"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QuickDemoLoginButtons } from "@/features/demo/components/persona-switcher";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setPending(true);
    const { error: signInError } = await authClient.signIn.email({
      email,
      password,
      callbackURL: returnUrl,
    });
    setPending(false);
    if (signInError) {
      setError(signInError.message || "Unable to sign in.");
      return;
    }
    router.push(returnUrl);
  }

  return (
    <div className="space-y-7">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-blue-accessible-light)]">
          Welcome back
        </p>
        <h1 className="font-[family-name:var(--font-google-sans)] text-3xl font-bold text-[var(--text-heading)]">
          Sign in
        </h1>
        <p className="text-sm leading-relaxed text-[var(--text-body)]">
          Continue to your customer workspace — favorites, inquiries, offers and listings.
        </p>
      </header>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-body)]/50"
              aria-hidden
            />
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-[var(--brand-blue-accessible-light)] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-body)]/50"
              aria-hidden
            />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-10"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[var(--text-body)] hover:bg-[var(--surface-subtle)]"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {error ? (
          <p
            className="rounded-xl bg-[var(--color-error-bg)] px-3 py-2 text-sm text-[var(--color-error)]"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <Button type="submit" className="w-full !text-white" size="lg" disabled={pending}>
          {pending ? "Signing in…" : "Sign in"}
        </Button>
      </form>

      <p className="text-center text-sm text-[var(--text-body)]">
        No account?{" "}
        <Link
          href="/signup"
          className="font-semibold text-[var(--brand-blue-accessible-light)] hover:underline"
        >
          Create one
        </Link>
      </p>

      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden>
          <div className="w-full border-t border-[var(--border-subtle)]" />
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-wide">
          <span className="bg-[var(--surface-card)] px-3 text-[var(--text-body)]/70">
            Or try a demo persona
          </span>
        </div>
      </div>

      <QuickDemoLoginButtons />

      <p className="text-center text-xs text-[var(--text-body)]/70">
        Full walkthrough in the{" "}
        <Link href="/demo" className="font-medium text-[var(--brand-blue-accessible-light)] hover:underline">
          Demo Center
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="h-40 animate-pulse rounded-xl bg-[var(--surface-subtle)]" aria-busy="true" />
      }
    >
      <LoginForm />
    </Suspense>
  );
}
