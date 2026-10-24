"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (!token) {
      setError("Missing reset token. Open the link from the demo outbox.");
      return;
    }
    setPending(true);
    const { error: resetError } = await authClient.resetPassword({
      newPassword: password,
      token,
    });
    setPending(false);
    if (resetError) {
      setError(resetError.message || "Unable to reset password.");
      return;
    }
    router.push("/login");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-google-sans)] text-2xl font-bold text-[var(--text-heading)]">
          Reset password
        </h1>
        <p className="mt-1 text-sm text-[var(--text-body)]">
          Paste or follow the simulated token from the demo outbox to set a new password.
        </p>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">New password</Label>
          <Input
            id="password"
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm">Confirm password</Label>
          <Input
            id="confirm"
            type="password"
            required
            minLength={8}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>
        {!token ? (
          <p className="text-sm text-[var(--color-warning)]" role="note">
            No token in the URL yet. Retrieve the simulated link from{" "}
            <Link href="/demo/outbox" className="underline">
              /demo/outbox
            </Link>
            .
          </p>
        ) : null}
        {error ? (
          <p className="text-sm text-[var(--color-error)]" role="alert">
            {error}
          </p>
        ) : null}
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Updating…" : "Update password"}
        </Button>
      </form>
      <p className="text-center text-sm">
        <Link href="/login" className="underline-offset-4 hover:underline">
          Back to login
        </Link>
      </p>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p className="text-sm">Loading…</p>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
