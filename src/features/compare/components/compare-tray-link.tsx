"use client";

import Link from "next/link";
import { GitCompareArrows } from "lucide-react";
import { useCompareStore } from "@/features/compare/store";
import { Button } from "@/components/ui/button";

export function CompareTrayLink() {
  const slugs = useCompareStore((s) => s.slugs);
  if (slugs.length === 0) return null;

  return (
    <Button
      asChild
      variant="outline"
      size="sm"
      className="inline-flex shrink-0"
    >
      <Link href={`/compare?ids=${slugs.join(",")}`} className="gap-1.5">
        <GitCompareArrows className="h-4 w-4 shrink-0" aria-hidden />
        <span className="hidden md:inline">Compare ({slugs.length})</span>
        <span className="md:hidden">({slugs.length})</span>
      </Link>
    </Button>
  );
}
