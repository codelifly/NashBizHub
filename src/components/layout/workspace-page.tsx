import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DashboardPageHeader, EmptyPanel, Panel } from "@/components/dashboard/ui";

export type WorkspacePageProps = {
  title: string;
  purpose: string;
  eyebrow?: string;
  demoNote?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  actionHref?: string;
  actionLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  children?: React.ReactNode;
};

/**
 * Shared customer workspace page chrome — creative header + panel body.
 */
export function WorkspacePage({
  title,
  purpose,
  eyebrow = "Customer workspace",
  demoNote = "Interactive demo · fictional records only",
  emptyTitle,
  emptyDescription,
  actionHref,
  actionLabel,
  secondaryHref,
  secondaryLabel,
  children,
}: WorkspacePageProps) {
  const hasBody = Boolean(children);

  return (
    <div className="mx-auto w-full max-w-[90rem] space-y-6">
      <DashboardPageHeader
        eyebrow={eyebrow}
        title={title}
        description={purpose}
        actions={
          <>
            {actionHref && actionLabel ? (
              <Button asChild>
                <Link href={actionHref}>{actionLabel}</Link>
              </Button>
            ) : null}
            {secondaryHref && secondaryLabel ? (
              <Button asChild variant="outline">
                <Link href={secondaryHref}>{secondaryLabel}</Link>
              </Button>
            ) : null}
          </>
        }
      />

      <p
        className="rounded-xl bg-[var(--color-warning-bg)] px-4 py-2 text-sm text-[var(--color-warning)]"
        role="note"
      >
        {demoNote}
      </p>

      {hasBody ? <div className="space-y-6">{children}</div> : null}

      {emptyTitle && emptyDescription ? (
        <EmptyPanel
          title={emptyTitle}
          description={emptyDescription}
          href={actionHref ?? "/businesses-for-sale"}
          label={actionLabel ?? "Browse marketplace"}
        />
      ) : null}

      {!hasBody && !emptyTitle ? (
        <Panel title="Getting started" description="Useful shortcuts for this area of your account.">
          <div className="flex flex-wrap gap-3">
            {actionHref && actionLabel ? (
              <Button asChild>
                <Link href={actionHref}>{actionLabel}</Link>
              </Button>
            ) : null}
            <Button asChild variant="secondary">
              <Link href="/businesses-for-sale">Browse opportunities</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/dashboard">Back to overview</Link>
            </Button>
          </div>
        </Panel>
      ) : null}
    </div>
  );
}
