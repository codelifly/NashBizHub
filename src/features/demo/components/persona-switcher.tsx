"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { demoPersonas } from "@/config/roles";
import { Button } from "@/components/ui/button";

export function PersonaSwitcher({
  redirectTo = "/dashboard",
  compact = false,
}: {
  redirectTo?: string;
  compact?: boolean;
}) {
  const router = useRouter();
  const [pendingKey, setPendingKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function switchPersona(personaKey: string) {
    setPendingKey(personaKey);
    setError(null);
    try {
      const res = await fetch("/api/demo/persona", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ personaKey }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Persona switch failed");
      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Persona switch failed");
    } finally {
      setPendingKey(null);
    }
  }

  return (
    <div className="space-y-2">
      <div className={compact ? "flex flex-wrap gap-2" : "grid gap-2"}>
        {demoPersonas.map((persona) => (
          <Button
            key={persona.key}
            type="button"
            variant={compact ? "outline" : "secondary"}
            size={compact ? "sm" : "default"}
            disabled={pendingKey !== null}
            onClick={() => switchPersona(persona.key)}
          >
            {pendingKey === persona.key
              ? "Switching…"
              : compact
                ? persona.label
                : `Continue as ${persona.label}`}
          </Button>
        ))}
      </div>
      {error ? (
        <p className="text-sm text-[var(--color-error)]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function QuickDemoLoginButtons() {
  return (
    <div className="space-y-2 rounded-[var(--radius-card)] border border-dashed border-[var(--border-subtle)] bg-[var(--surface-subtle)] p-4">
      <p className="text-sm font-medium text-[var(--text-heading)]">
        Quick demo login
      </p>
      <p className="text-xs text-[var(--text-body)]">
        Sets the demo persona cookie (DEMO_MODE). No password hash required.
      </p>
      <PersonaSwitcher compact redirectTo="/dashboard" />
    </div>
  );
}
