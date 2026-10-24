"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ApplicationActions({
  applicationId,
  status,
}: {
  applicationId: string;
  status: string;
}) {
  const router = useRouter();
  const [pending, setPending] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);

  async function decide(action: "accept" | "reject" | "award") {
    setPending(action);
    setError(null);
    setNote(null);
    try {
      const res = await fetch(`/api/applications/${applicationId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          notes: `Demo ${action} decision`,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Decision failed");
      if (data.agreement?.id) {
        setNote(`Awarded — agreement stub ${data.agreement.id}`);
      } else if (data.deal?.id) {
        setNote(`Accepted — deal shell ${data.deal.id}`);
      } else {
        setNote(`Marked ${action}`);
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Decision failed");
    } finally {
      setPending(null);
    }
  }

  const canDecide =
    status === "submitted" ||
    status === "under-review" ||
    status === "accepted";

  if (!canDecide) {
    return (
      <p className="text-sm text-[var(--text-body)]">
        Status <strong>{status}</strong> — no further demo decisions.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {status !== "accepted" ? (
          <Button
            type="button"
            variant="secondary"
            disabled={pending !== null}
            onClick={() => void decide("accept")}
          >
            {pending === "accept" ? "Accepting…" : "Accept"}
          </Button>
        ) : null}
        <Button
          type="button"
          disabled={pending !== null}
          onClick={() => void decide("award")}
        >
          {pending === "award" ? "Awarding…" : "Award (create agreement)"}
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={pending !== null}
          onClick={() => void decide("reject")}
        >
          {pending === "reject" ? "Rejecting…" : "Reject"}
        </Button>
      </div>
      {note ? (
        <p className="text-sm text-[var(--text-body)]" role="status">
          {note}
        </p>
      ) : null}
      {error ? (
        <p className="text-sm text-[var(--color-error)]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
