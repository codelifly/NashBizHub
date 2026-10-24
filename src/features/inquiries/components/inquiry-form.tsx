"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type InquiryFormProps = {
  listingId: string;
  listingSlug: string;
  listingTitle: string;
};

export function InquiryForm({
  listingId,
  listingSlug,
  listingTitle,
}: InquiryFormProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(
    `I am interested in learning more about ${listingTitle}. This is a demo inquiry.`,
  );
  const [experience, setExperience] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingId,
          listingSlug,
          message,
          experience: experience || undefined,
          timeframe: timeframe || undefined,
          idempotencyKey: `client-${listingId}-${Date.now()}`,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Unable to send inquiry");
      }
      setSuccessId(data.inquiry.id);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send inquiry");
    } finally {
      setPending(false);
    }
  }

  if (!open && !successId) {
    return (
      <Button type="button" className="w-full !text-white" onClick={() => setOpen(true)}>
        Inquire about this listing
      </Button>
    );
  }

  if (successId) {
    return (
      <div className="space-y-3 rounded-[var(--radius-control)] border border-[var(--border-subtle)] bg-[var(--surface-subtle)] p-3 text-sm">
        <p className="text-[var(--text-heading)]">Inquiry sent (demo).</p>
        <Button asChild variant="secondary" className="w-full">
          <a href={`/dashboard/inquiries/${successId}`}>View in dashboard</a>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="space-y-1">
        <Label htmlFor="inquiry-message">Message</Label>
        <textarea
          id="inquiry-message"
          required
          minLength={10}
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-[var(--radius-control)] border border-[var(--border-subtle)] bg-[var(--surface-card)] px-3 py-2 text-sm"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="inquiry-experience">Experience (optional)</Label>
        <Input
          id="inquiry-experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="inquiry-timeframe">Timeframe (optional)</Label>
        <Input
          id="inquiry-timeframe"
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
        />
      </div>
      {error ? (
        <p className="text-sm text-[var(--color-error)]" role="alert">
          {error}
        </p>
      ) : null}
      <div className="flex gap-2">
        <Button type="submit" className="flex-1 !text-white" disabled={pending}>
          {pending ? "Sending…" : "Send inquiry"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setOpen(false)}
          disabled={pending}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
