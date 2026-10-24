"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ReportPaymentButton({
  obligationId,
  disabled,
}: {
  obligationId: string;
  disabled?: boolean;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onClick() {
    setPending(true);
    setError(null);
    try {
      const res = await fetch(`/api/obligations/${obligationId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "report-payment",
          notes: "Manual report from operator dashboard (not bank verified).",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Report failed");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Report failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-1">
      <Button
        type="button"
        size="sm"
        variant="secondary"
        disabled={disabled || pending}
        onClick={() => void onClick()}
      >
        {pending ? "Reporting…" : "Mark payment reported"}
      </Button>
      {error ? (
        <p className="text-xs text-[var(--color-error)]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
