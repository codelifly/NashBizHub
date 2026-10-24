"use client";

import { useState } from "react";
import { FileLock2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ListingDocumentRequest({ listingId }: { listingId: string }) {
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onRequest() {
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/documents/nda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to acknowledge NDA");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="rounded-2xl border border-dashed border-[var(--border-subtle)] bg-[var(--surface-page)] p-4">
      <div className="flex items-start gap-3">
        <FileLock2
          className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-blue-accessible-light)]"
          aria-hidden
        />
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-[var(--text-heading)]">Request documents</p>
          <p className="mt-1 text-sm text-[var(--text-body)]">
            Acknowledge the nonbinding demo NDA, then practice grant-based private downloads.
          </p>
          {done ? (
            <p className="mt-3 text-sm font-medium text-[var(--color-success)]">
              Demo NDA recorded. Open your deals workspace for document grants.
            </p>
          ) : (
            <Button
              type="button"
              size="sm"
              className="mt-3 !text-white"
              disabled={pending}
              onClick={onRequest}
            >
              {pending ? "Recording…" : "Acknowledge demo NDA"}
            </Button>
          )}
          {error ? (
            <p className="mt-2 text-xs text-[var(--color-error)]" role="alert">
              {error}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
