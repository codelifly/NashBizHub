"use client";

import { useState } from "react";
import { Check, Flag, Link2, Printer, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ListingShareBar({
  title,
  path,
}: {
  title: string;
  path: string;
}) {
  const [copied, setCopied] = useState(false);
  const [reported, setReported] = useState(false);

  async function copyLink() {
    const url = `${window.location.origin}${path}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  async function share() {
    const url = `${window.location.origin}${path}`;
    if (navigator.share) {
      try {
        await navigator.share({ title, url, text: `Demo listing: ${title}` });
        return;
      } catch {
        /* fall through */
      }
    }
    await copyLink();
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button type="button" size="sm" variant="outline" onClick={share}>
        <Share2 className="mr-1.5 h-3.5 w-3.5" aria-hidden />
        Share
      </Button>
      <Button type="button" size="sm" variant="outline" onClick={copyLink}>
        {copied ? (
          <Check className="mr-1.5 h-3.5 w-3.5" aria-hidden />
        ) : (
          <Link2 className="mr-1.5 h-3.5 w-3.5" aria-hidden />
        )}
        {copied ? "Copied" : "Copy link"}
      </Button>
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={() => window.print()}
      >
        <Printer className="mr-1.5 h-3.5 w-3.5" aria-hidden />
        Print
      </Button>
      <Button
        type="button"
        size="sm"
        variant="ghost"
        onClick={() => setReported(true)}
        disabled={reported}
      >
        <Flag className="mr-1.5 h-3.5 w-3.5" aria-hidden />
        {reported ? "Report received (demo)" : "Report listing"}
      </Button>
    </div>
  );
}
