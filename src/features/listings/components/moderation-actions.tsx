"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function ModerationActions({
  draftId,
  status,
}: {
  draftId: string;
  status: string;
}) {
  const router = useRouter();
  const [notes, setNotes] = useState(
    "Please clarify commercial disclosures before approval.",
  );
  const [pending, setPending] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function run(action: "approve" | "request-changes") {
    setPending(action);
    setError(null);
    try {
      const res = await fetch(`/api/listing-drafts/${draftId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          action === "approve"
            ? { action, notes: "Approved for demo (memory active)." }
            : { action, notes },
        ),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Moderation failed");
      router.refresh();
      if (action === "approve") {
        router.push("/admin/listings");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Moderation failed");
    } finally {
      setPending(null);
    }
  }

  if (status !== "submitted") {
    return (
      <p className="text-sm text-[var(--text-body)]">
        Current status: <strong>{status}</strong>. Approve/request-changes apply
        to submitted drafts only.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label htmlFor="mod-notes">Change request notes</Label>
        <textarea
          id="mod-notes"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full rounded-[var(--radius-control)] border border-[var(--border-subtle)] bg-[var(--surface-card)] px-3 py-2 text-sm"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          disabled={pending !== null}
          onClick={() => void run("approve")}
        >
          {pending === "approve" ? "Approving…" : "Approve (set active)"}
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={pending !== null || notes.trim().length < 5}
          onClick={() => void run("request-changes")}
        >
          {pending === "request-changes" ? "Sending…" : "Request changes"}
        </Button>
      </div>
      {error ? (
        <p className="text-sm text-[var(--color-error)]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
