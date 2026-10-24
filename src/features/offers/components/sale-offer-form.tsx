"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { dollarsToMinor, formatMoney } from "@/lib/money";

export function SaleOfferForm({
  listingId,
  listingTitle,
  suggestedDollars = 400000,
}: {
  listingId: string;
  listingTitle: string;
  suggestedDollars?: number;
}) {
  const [dollars, setDollars] = useState(String(suggestedDollars));
  const [message, setMessage] = useState(
    `Nonbinding demo offer for ${listingTitle}.`,
  );
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offerId, setOfferId] = useState<string | null>(null);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError(null);
    const amount = Number(dollars);
    if (!Number.isFinite(amount) || amount <= 0) {
      setError("Enter a positive dollar amount");
      setPending(false);
      return;
    }
    try {
      const res = await fetch("/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingId,
          amountMinor: dollarsToMinor(amount),
          message,
          submit: true,
          terms: { closingDays: 45, demo: true },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to submit offer");
      setOfferId(data.offer.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to submit offer");
    } finally {
      setPending(false);
    }
  }

  if (offerId) {
    return (
      <div className="space-y-2 rounded-[var(--radius-control)] border border-[var(--border-subtle)] bg-[var(--surface-subtle)] p-3 text-sm">
        <p>
          Offer submitted at{" "}
          {formatMoney({
            minorUnits: dollarsToMinor(Number(dollars)),
            currency: "USD",
          })}
          .
        </p>
        <Button asChild variant="secondary" className="w-full">
          <a href={`/dashboard/offers/${offerId}`}>Open offer</a>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <p className="text-sm font-medium text-[var(--text-heading)]">
        Draft sale offer (demo)
      </p>
      <div className="space-y-1">
        <Label htmlFor="offer-amount">Amount (USD)</Label>
        <Input
          id="offer-amount"
          type="number"
          min={1}
          step={1000}
          required
          value={dollars}
          onChange={(e) => setDollars(e.target.value)}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="offer-message">Message</Label>
        <textarea
          id="offer-message"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-[var(--radius-control)] border border-[var(--border-subtle)] bg-[var(--surface-card)] px-3 py-2 text-sm"
        />
      </div>
      {error ? (
        <p className="text-sm text-[var(--color-error)]" role="alert">
          {error}
        </p>
      ) : null}
      <Button type="submit" className="w-full !text-white" disabled={pending}>
        {pending ? "Submitting…" : "Submit offer"}
      </Button>
    </form>
  );
}
