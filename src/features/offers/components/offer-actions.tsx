"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { dollarsToMinor } from "@/lib/money";

export function OfferActions({
  offerId,
  status,
  currentVersion,
}: {
  offerId: string;
  status: string;
  currentVersion: number;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [counterDollars, setCounterDollars] = useState("410000");
  const [wrongVersionTest, setWrongVersionTest] = useState(false);

  async function run(action: unknown) {
    setPending(true);
    setError(null);
    try {
      const res = await fetch(`/api/offers/${offerId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(action),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Action failed");
      router.refresh();
      if (data.deal?.id) {
        router.push(`/dashboard/deals/${data.deal.id}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Action failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {status === "draft" || status === "countered" ? (
          <Button
            type="button"
            disabled={pending}
            onClick={() => run({ action: "submit" })}
          >
            Submit
          </Button>
        ) : null}
        {status === "submitted" || status === "countered" ? (
          <>
            <Button
              type="button"
              disabled={pending}
              onClick={() =>
                run({
                  action: "accept",
                  version: wrongVersionTest
                    ? currentVersion - 1 || 999
                    : currentVersion,
                })
              }
            >
              Accept current version
            </Button>
            <label className="flex items-center gap-2 text-xs text-[var(--text-body)]">
              <input
                type="checkbox"
                checked={wrongVersionTest}
                onChange={(e) => setWrongVersionTest(e.target.checked)}
              />
              Try non-current version (should fail)
            </label>
          </>
        ) : null}
      </div>
      {(status === "submitted" || status === "countered") && (
        <div className="space-y-2 rounded-[var(--radius-control)] border border-dashed border-[var(--border-subtle)] p-3">
          <Label htmlFor="counter-amount">Counter amount (USD)</Label>
          <Input
            id="counter-amount"
            type="number"
            value={counterDollars}
            onChange={(e) => setCounterDollars(e.target.value)}
          />
          <Button
            type="button"
            variant="secondary"
            disabled={pending}
            onClick={() =>
              run({
                action: "counter",
                amountMinor: dollarsToMinor(Number(counterDollars)),
                message: "Demo counter-offer",
              })
            }
          >
            Send counter
          </Button>
        </div>
      )}
      {error ? (
        <p className="text-sm text-[var(--color-error)]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
