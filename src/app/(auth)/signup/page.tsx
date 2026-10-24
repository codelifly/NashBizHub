"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Building2, Handshake, Search, Store, UserRound } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const interests = [
  { value: "buyer", label: "Buy", icon: Search, hint: "Find opportunities" },
  { value: "owner", label: "Sell", icon: Store, hint: "List a business" },
  { value: "operator", label: "Rent / operate", icon: Handshake, hint: "Run a business" },
  { value: "contractor", label: "Contracts", icon: Building2, hint: "Bid on work" },
  { value: "broker", label: "Broker", icon: UserRound, hint: "Represent clients" },
] as const;

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("US");
  const [primaryInterest, setPrimaryInterest] = useState<string>("buyer");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    if (!termsAccepted) {
      setError("You must accept the terms to continue.");
      return;
    }
    setPending(true);
    const { error: signUpError } = await authClient.signUp.email({
      name,
      email,
      password,
      callbackURL: "/verify-email",
      ...({
        country,
        primaryInterest,
        marketingConsent,
      } as Record<string, unknown>),
    });
    setPending(false);
    if (signUpError) {
      setError(signUpError.message || "Unable to create account.");
      return;
    }
    router.push("/verify-email");
  }

  return (
    <div className="space-y-7">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-blue-accessible-light)]">
          Get started
        </p>
        <h1 className="font-[family-name:var(--font-google-sans)] text-3xl font-bold text-[var(--text-heading)]">
          Create your account
        </h1>
        <p className="text-sm leading-relaxed text-[var(--text-body)]">
          One customer identity for Tennessee opportunities. Email verification is simulated in
          this demo.
        </p>
      </header>

      <form onSubmit={onSubmit} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Maya Chen"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
            />
            <p className="text-xs text-[var(--text-body)]/70">Use 8+ characters for this demo account.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="US"
            />
          </div>
        </div>

        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-[var(--text-heading)]">
            Primary interest
          </legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {interests.map((item) => {
              const selected = primaryInterest === item.value;
              const Icon = item.icon;
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setPrimaryInterest(item.value)}
                  className={cn(
                    "rounded-2xl border px-3 py-3 text-left transition",
                    selected
                      ? "border-[var(--brand-blue-accessible-light)] bg-[var(--surface-subtle)] ring-2 ring-[var(--brand-blue-accessible-light)]/30"
                      : "border-[var(--border-subtle)] hover:border-[var(--brand-blue-accessible-light)]/50",
                  )}
                  aria-pressed={selected}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4",
                      selected
                        ? "text-[var(--brand-blue-accessible-light)]"
                        : "text-[var(--text-body)]",
                    )}
                    aria-hidden
                  />
                  <span className="mt-2 block text-sm font-semibold text-[var(--text-heading)]">
                    {item.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-[var(--text-body)]">{item.hint}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="space-y-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-page)] p-4">
          <label className="flex items-start gap-3 text-sm text-[var(--text-body)]">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 accent-[var(--action-fill)]"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              required
            />
            <span>
              I agree to the{" "}
              <Link
                href="/legal/terms"
                className="font-medium text-[var(--brand-blue-accessible-light)] hover:underline"
              >
                terms
              </Link>{" "}
              and{" "}
              <Link
                href="/legal/privacy"
                className="font-medium text-[var(--brand-blue-accessible-light)] hover:underline"
              >
                privacy notice
              </Link>{" "}
              (draft demo copy).
            </span>
          </label>
          <label className="flex items-start gap-3 text-sm text-[var(--text-body)]">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 accent-[var(--action-fill)]"
              checked={marketingConsent}
              onChange={(e) => setMarketingConsent(e.target.checked)}
            />
            <span>Send me product updates (optional — not preselected).</span>
          </label>
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
          {pending ? "Creating account…" : "Create account"}
        </Button>
      </form>

      <p className="text-center text-sm text-[var(--text-body)]">
        Already registered?{" "}
        <Link
          href="/login"
          className="font-semibold text-[var(--brand-blue-accessible-light)] hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
