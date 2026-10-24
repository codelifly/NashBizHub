"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function DemoResetButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onReset() {
    const confirmed = window.confirm(
      "Reset this demo workspace memory bag?\n\nInquiries, offers, applications, drafts, and agreements created in this session will be cleared and reseeded. SQLite catalogue fixtures are not deleted.",
    );
    if (!confirmed) return;

    setPending(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch("/api/demo/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirm: "RESET_DEMO_WORKSPACE" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Reset failed");
      setMessage(data.message ?? "Workspace reset.");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reset failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="space-y-2">
      <Button
        type="button"
        variant="outline"
        disabled={pending}
        onClick={() => void onReset()}
      >
        {pending ? "Resetting…" : "Reset demo workspace"}
      </Button>
      {message ? (
        <p className="text-sm text-[var(--text-body)]" role="status">
          {message}
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
