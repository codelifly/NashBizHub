"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setPending(true);
    const { error: resetError } = await authClient.requestPasswordReset({
      email,
      redirectTo: "/reset-password",
    });
    setPending(false);
    if (resetError) {
      setError(resetError.message || "Could not start password reset.");
      return;
    }
    setMessage(
      "If that address exists, a simulated reset link was written to the private demo outbox.",
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-google-sans)] text-2xl font-bold text-[var(--text-heading)]">
          Forgot password
        </h1>
        <p className="mt-1 text-sm text-[var(--text-body)]">
          Password reset emails are simulated in demo mode — check the outbox, not your inbox.
        </p>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {error ? (
          <p className="text-sm text-[var(--color-error)]" role="alert">
            {error}
          </p>
        ) : null}
        {message ? (
          <p className="text-sm text-[var(--color-success)]" role="status">
            {message}
          </p>
        ) : null}
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Sending…" : "Send reset link (simulated)"}
        </Button>
      </form>
      <p className="text-center text-sm">
        <Link href="/demo/outbox" className="underline-offset-4 hover:underline">
          Demo outbox
        </Link>
        {" · "}
        <Link href="/login" className="underline-offset-4 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
