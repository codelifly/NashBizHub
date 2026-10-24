"use client";

import Link from "next/link";
import { FormEvent, Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function AcceptInvitationForm() {
  const searchParams = useSearchParams();
  const inviteToken = searchParams.get("token") ?? "";
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    // Demo shell: invitations are not wired to a live org invite service yet.
    setMessage(
      `Demo simulation: invitation ${inviteToken || "(no token)"} for ${name || "guest"} was acknowledged locally. No organization membership was changed.`,
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-google-sans)] text-2xl font-bold text-[var(--text-heading)]">
          Accept invitation
        </h1>
        <p className="mt-1 text-sm text-[var(--text-body)]">
          Organization invites are simulated. Emails land in the private demo outbox only.
        </p>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Your name</Label>
          <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Choose a password</Label>
          <Input
            id="password"
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {message ? (
          <p className="text-sm text-[var(--color-success)]" role="status">
            {message}
          </p>
        ) : null}
        <Button type="submit" className="w-full">
          Accept (demo)
        </Button>
      </form>
      <p className="text-center text-sm">
        <Link href="/login" className="underline-offset-4 hover:underline">
          Log in instead
        </Link>
      </p>
    </div>
  );
}

export default function AcceptInvitationPage() {
  return (
    <Suspense fallback={<p className="text-sm">Loading…</p>}>
      <AcceptInvitationForm />
    </Suspense>
  );
}
