"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function ApplicationForm({
  listingId,
  listingTitle,
  kind,
}: {
  listingId: string;
  listingTitle: string;
  kind: "business-rental" | "service-tender";
}) {
  const [message, setMessage] = useState(
    kind === "business-rental"
      ? `Demo operating application for ${listingTitle}.`
      : `Demo tender bid package for ${listingTitle}.`,
  );
  const [experience, setExperience] = useState("");
  const [proposedTerms, setProposedTerms] = useState(
    kind === "business-rental"
      ? "24-month term; security as posted (demo)"
      : "Fixed monthly fee within tender range (demo)",
  );
  const [capacityNotes, setCapacityNotes] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [applicationId, setApplicationId] = useState<string | null>(null);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingId,
          message,
          experience: experience || undefined,
          proposedTerms: proposedTerms || undefined,
          capacityNotes: capacityNotes || undefined,
          submit: true,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to submit application");
      setApplicationId(data.application.id);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to submit application",
      );
    } finally {
      setPending(false);
    }
  }

  if (applicationId) {
    return (
      <div className="space-y-2 rounded-[var(--radius-control)] border border-[var(--border-subtle)] bg-[var(--surface-subtle)] p-3 text-sm">
        <p>
          {kind === "business-rental" ? "Rental application" : "Tender bid"}{" "}
          submitted.
        </p>
        <Button asChild variant="secondary" className="w-full">
          <a href={`/dashboard/applications/${applicationId}`}>
            Open application
          </a>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <p className="text-sm font-medium text-[var(--text-heading)]">
        {kind === "business-rental"
          ? "Apply to operate (demo)"
          : "Submit tender bid (demo)"}
      </p>
      <div className="space-y-1">
        <Label htmlFor="app-message">Cover message</Label>
        <textarea
          id="app-message"
          required
          minLength={10}
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-[var(--radius-control)] border border-[var(--border-subtle)] bg-[var(--surface-card)] px-3 py-2 text-sm"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="app-exp">Relevant experience</Label>
        <textarea
          id="app-exp"
          rows={2}
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="w-full rounded-[var(--radius-control)] border border-[var(--border-subtle)] bg-[var(--surface-card)] px-3 py-2 text-sm"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="app-terms">Proposed terms</Label>
        <textarea
          id="app-terms"
          rows={2}
          value={proposedTerms}
          onChange={(e) => setProposedTerms(e.target.value)}
          className="w-full rounded-[var(--radius-control)] border border-[var(--border-subtle)] bg-[var(--surface-card)] px-3 py-2 text-sm"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="app-capacity">Capacity / staffing notes</Label>
        <textarea
          id="app-capacity"
          rows={2}
          value={capacityNotes}
          onChange={(e) => setCapacityNotes(e.target.value)}
          className="w-full rounded-[var(--radius-control)] border border-[var(--border-subtle)] bg-[var(--surface-card)] px-3 py-2 text-sm"
        />
      </div>
      {error ? (
        <p className="text-sm text-[var(--color-error)]" role="alert">
          {error}
        </p>
      ) : null}
      <Button type="submit" className="w-full" disabled={pending}>
        {pending
          ? "Submitting…"
          : kind === "business-rental"
            ? "Submit application"
            : "Submit bid"}
      </Button>
    </form>
  );
}
