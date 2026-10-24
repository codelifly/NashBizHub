import Link from "next/link";
import { Home } from "lucide-react";
import { cn } from "@/lib/utils";

type BackToHomeProps = {
  className?: string;
  /** Dark sidebar / on-dark surfaces */
  tone?: "light" | "dark";
  label?: string;
};

export function BackToHome({
  className,
  tone = "light",
  label = "Back to home",
}: BackToHomeProps) {
  const dark = tone === "dark";
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold transition",
        dark
          ? "w-full hover:bg-white/10 !text-white"
          : "border border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--text-heading)] hover:border-[var(--brand-blue-accessible-light)] hover:text-[var(--brand-blue-accessible-light)]",
        className,
      )}
    >
      <Home className={cn("h-4 w-4 shrink-0", dark && "nav-icon")} aria-hidden />
      {label}
    </Link>
  );
}
