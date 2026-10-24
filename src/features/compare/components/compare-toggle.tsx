"use client";

import { GitCompareArrows } from "lucide-react";
import { useCompareStore } from "@/features/compare/store";
import { Button } from "@/components/ui/button";
import { COMPARE_LIMIT } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function CompareToggle({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const has = useCompareStore((s) => s.slugs.includes(slug));
  const count = useCompareStore((s) => s.slugs.length);
  const toggle = useCompareStore((s) => s.toggle);
  const full = !has && count >= COMPARE_LIMIT;

  return (
    <Button
      type="button"
      size="sm"
      variant={has ? "default" : "secondary"}
      disabled={full}
      aria-pressed={has}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      className={cn("justify-center gap-1.5", className)}
    >
      <GitCompareArrows className="h-3.5 w-3.5" aria-hidden />
      {has ? "In compare" : full ? "Full" : "Compare"}
    </Button>
  );
}
