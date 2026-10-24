"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function MaintenanceRequestForm({
  agreementId,
  listingId,
}: {
  agreementId: string;
  listingId?: string | null;
}) {
  const router = useRouter();
  const [assetLabel, setAssetLabel] = useState("Washer bank A");
  const [description, setDescription] = useState(
    "Demo maintenance: vibration noise on cycle 3.",
  );
  const [urgency, setUrgency] = useState<"low" | "normal" | "high" | "emergency">(
    "normal",
  );
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdId, setCreatedId] = useState<string | null>(null);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/maintenance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agreementId,
          listingId: listingId ?? undefined,
          assetLabel,
          description,
          urgency,
          responsibleParty: "owner",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to create request");
      setCreatedId(data.request.id);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create request");
    } finally {
      setPending(false);
    }
  }

  if (createdId) {
    return (
      <p className="text-sm text-[var(--text-body)]" role="status">
        Maintenance request {createdId} reported.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <p className="text-sm font-medium text-[var(--text-heading)]">
        Report maintenance (demo)
      </p>
      <div className="space-y-1">
        <Label htmlFor="mnt-asset">Asset</Label>
        <Input
          id="mnt-asset"
          required
          value={assetLabel}
          onChange={(e) => setAssetLabel(e.target.value)}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="mnt-desc">Description</Label>
        <textarea
          id="mnt-desc"
          required
          minLength={10}
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-[var(--radius-control)] border border-[var(--border-subtle)] bg-[var(--surface-card)] px-3 py-2 text-sm"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="mnt-urgency">Urgency</Label>
        <select
          id="mnt-urgency"
          value={urgency}
          onChange={(e) =>
            setUrgency(e.target.value as typeof urgency)
          }
          className="w-full rounded-[var(--radius-control)] border border-[var(--border-subtle)] bg-[var(--surface-card)] px-3 py-2 text-sm"
        >
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
          <option value="emergency">Emergency</option>
        </select>
      </div>
      {error ? (
        <p className="text-sm text-[var(--color-error)]" role="alert">
          {error}
        </p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Submitting…" : "Create maintenance request"}
      </Button>
    </form>
  );
}
