import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function DashboardPageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-[var(--border-subtle)] pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-2">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-blue-accessible-light)]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-[family-name:var(--font-google-sans)] text-3xl font-bold tracking-tight text-[var(--text-heading)] sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="max-w-2xl text-[var(--text-body)]">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  href,
  tone = "default",
}: {
  label: string;
  value: string | number;
  hint?: string;
  href?: string;
  tone?: "default" | "accent" | "success" | "warning";
}) {
  const tones = {
    default: "from-[var(--surface-card)] to-[var(--surface-subtle)]",
    accent: "on-dark from-[#0b3d91] to-[#1e6ef4]",
    success: "from-[var(--color-success-bg)] to-[var(--surface-card)]",
    warning: "from-[var(--color-warning-bg)] to-[var(--surface-card)]",
  } as const;

  const inner = (
    <div
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-card)] bg-gradient-to-br p-5 ring-1 ring-[var(--border-subtle)]",
        tones[tone],
        href && "transition hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transform-none",
      )}
    >
      <p
        className={cn(
          "text-xs font-semibold uppercase tracking-wide",
          tone === "accent" ? "text-white/75" : "text-[var(--text-body)]/70",
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          "mt-2 font-[family-name:var(--font-google-sans)] text-3xl font-bold",
          tone === "accent" ? "text-white" : "text-[var(--text-heading)]",
        )}
      >
        {value}
      </p>
      {hint ? (
        <p className={cn("mt-1 text-sm", tone === "accent" ? "text-white/80" : "text-[var(--text-body)]")}>
          {hint}
        </p>
      ) : null}
    </div>
  );

  return href ? <Link href={href}>{inner}</Link> : inner;
}

export function Panel({
  title,
  description,
  action,
  children,
  className,
  dark = false,
}: {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <section
      className={cn(
        "rounded-[var(--radius-card)] ring-1",
        dark
          ? "on-dark bg-[linear-gradient(160deg,#06101c_0%,#0b3d91_100%)] ring-white/15"
          : "bg-[var(--surface-card)] text-[var(--text-body)] ring-[var(--border-subtle)]",
        className,
      )}
    >
      {(title || action) && (
        <div
          className={cn(
            "flex flex-wrap items-start justify-between gap-3 border-b px-5 py-4",
            dark ? "border-white/15" : "border-[var(--border-subtle)]",
          )}
        >
          <div>
            {title ? (
              <h2
                className={cn(
                  "font-[family-name:var(--font-google-sans)] text-lg font-semibold",
                  dark ? "!text-white" : "text-[var(--text-heading)]",
                )}
              >
                {title}
              </h2>
            ) : null}
            {description ? (
              <p
                className={cn(
                  "mt-1 text-sm",
                  dark ? "!text-white/80" : "text-[var(--text-body)]",
                )}
                data-muted={dark ? "true" : undefined}
              >
                {description}
              </p>
            ) : null}
          </div>
          {action}
        </div>
      )}
      <div className={cn("p-5", dark && "on-dark")}>{children}</div>
    </section>
  );
}

export function QuickLink({
  href,
  label,
  description,
  icon: Icon,
}: {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-3 rounded-[var(--radius-control)] border border-[var(--border-subtle)] bg-[var(--surface-page)] p-4 transition hover:border-[var(--brand-blue-accessible-light)] hover:bg-[var(--surface-subtle)]"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-subtle)] text-[var(--brand-blue-accessible-light)] group-hover:bg-[var(--brand-blue-accessible-light)] group-hover:text-white">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-2">
          <span className="font-semibold text-[var(--text-heading)]">{label}</span>
          <ArrowRight className="h-4 w-4 text-[var(--brand-blue-accessible-light)] opacity-0 transition group-hover:opacity-100" />
        </span>
        <span className="mt-0.5 block text-sm text-[var(--text-body)]">{description}</span>
      </span>
    </Link>
  );
}

export function EmptyPanel({
  title,
  description,
  href,
  label,
}: {
  title: string;
  description: string;
  href: string;
  label: string;
}) {
  return (
    <div className="rounded-[var(--radius-card)] border border-dashed border-[var(--border-subtle)] bg-[var(--surface-subtle)]/50 px-6 py-12 text-center">
      <h3 className="font-[family-name:var(--font-google-sans)] text-xl text-[var(--text-heading)]">
        {title}
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-[var(--text-body)]">{description}</p>
      <Button asChild className="mt-5">
        <Link href={href}>{label}</Link>
      </Button>
    </div>
  );
}
