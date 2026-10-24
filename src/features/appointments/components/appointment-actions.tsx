"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function AppointmentActions(
  props:
    | { mode: "confirm"; appointmentId: string }
    | { mode: "request"; listingId: string },
) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onClick() {
    setPending(true);
    setError(null);
    try {
      const body =
        props.mode === "confirm"
          ? { action: "confirm", appointmentId: props.appointmentId }
          : {
              action: "request",
              listingId: props.listingId,
              type: "site-visit",
              startsAtUtc: new Date(Date.now() + 3 * 86400000).toISOString(),
              endsAtUtc: new Date(Date.now() + 3 * 86400000 + 3600000).toISOString(),
              timeZone: "America/Chicago",
              notes: "Demo site visit request",
            };
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-1">
      <Button
        type="button"
        variant={props.mode === "confirm" ? "secondary" : "default"}
        disabled={pending}
        onClick={onClick}
      >
        {pending
          ? "Working…"
          : props.mode === "confirm"
            ? "Confirm appointment"
            : "Request site visit"}
      </Button>
      {error ? (
        <p className="text-xs text-[var(--color-error)]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
