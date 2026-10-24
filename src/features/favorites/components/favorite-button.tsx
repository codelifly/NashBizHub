"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FavoriteButton({
  listingId,
  initialFavorited = false,
  className,
}: {
  listingId: string;
  initialFavorited?: boolean;
  className?: string;
}) {
  const [favorited, setFavorited] = useState(initialFavorited);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function toggle() {
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to update favorite");
      setFavorited(Boolean(data.favorited));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className={cn("space-y-1", className)}>
      <Button
        type="button"
        size="sm"
        variant={favorited ? "secondary" : "outline"}
        className="w-full justify-center"
        disabled={pending}
        onClick={toggle}
        aria-pressed={favorited}
      >
        {favorited ? "Saved" : "Save"}
      </Button>
      {error ? (
        <p className="text-xs text-[var(--color-error)]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
