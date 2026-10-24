import Link from "next/link";
import { siteConfig } from "@/config/site";

export function DemoBanner() {
  return (
    <div
      className="sticky top-0 z-50 border-b border-white/10 bg-[var(--demo-banner-bg)] text-[var(--demo-banner-fg)] [--demo-banner-h:2.5rem]"
      role="status"
      style={{ ["--demo-banner-h" as string]: "2.5rem" }}
    >
      <div className="mx-auto flex w-full max-w-[80rem] items-center justify-between gap-3 px-4 py-2 text-sm">
        <p>{siteConfig.demoBanner}</p>
        <Link
          href="/demo"
          className="shrink-0 rounded-[var(--radius-control)] px-2 py-1 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-blue-accessible-dark)]"
        >
          Demo Center
        </Link>
      </div>
    </div>
  );
}
