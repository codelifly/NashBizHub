import Link from "next/link";
import { WorkspacePage } from "@/components/layout/workspace-page";
import { Panel } from "@/components/dashboard/ui";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import {
  CatalogueTable,
  type CatalogueRow,
} from "@/features/listings/components/catalogue-table";
import { ModerationActions } from "@/features/listings/components/moderation-actions";
import { kindLabels } from "@/features/listings/lib/kind-labels";
import { getDemoActor } from "@/server/demo/actor";
import { getOrCreateWorkspace } from "@/server/demo/workspace";
import {
  listModerationQueue,
  listSubmittedRevisions,
} from "@/server/repositories/memory/listing-drafts";
import { listingFixtures } from "@/server/db/seeds/listing-fixtures";
import type { OpportunityKind } from "@/lib/constants";

export default async function Page() {
  const { workspaceId } = await getOrCreateWorkspace();
  const actor = await getDemoActor();
  const queue = listModerationQueue(workspaceId);
  const revisions = listSubmittedRevisions(workspaceId);

  const catalogue: CatalogueRow[] = listingFixtures.map((listing) => ({
    id: listing.id,
    publicCode: listing.publicCode,
    slug: listing.slug,
    title: listing.title,
    summary: listing.summary,
    kind: listing.kind as OpportunityKind,
    status: listing.status,
    citySlug: listing.citySlug,
    industrySlug: listing.industrySlug,
    confidential: listing.confidential,
    locationLabel: listing.locationLabel,
    publishedAt: listing.publishedAt,
  }));

  const byStatus = {
    active: listingFixtures.filter((l) => l.status === "active").length,
    negotiating: listingFixtures.filter((l) => l.status === "under-negotiation")
      .length,
    confidential: listingFixtures.filter((l) => l.confidential).length,
  };

  const byKind = catalogue.reduce(
    (acc, row) => {
      acc[row.kind] = (acc[row.kind] ?? 0) + 1;
      return acc;
    },
    {} as Partial<Record<OpportunityKind, number>>,
  );

  return (
    <WorkspacePage
      eyebrow="Moderation"
      title="Listings queue"
      purpose="Approve drafts, filter the full demo catalogue by coloured opportunity type, and inspect publication details from the proposal scope."
      demoNote={`Workspace ${workspaceId} · persona ${actor.label}`}
      actionHref="/dashboard/listings/new"
      actionLabel="Open wizard"
      secondaryHref="/businesses-for-sale"
      secondaryLabel="Public catalogue"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] px-4 py-3">
          <p className="text-sm text-[var(--text-body)]">Moderation queue</p>
          <p className="font-[family-name:var(--font-google-sans)] text-2xl font-bold text-[var(--text-heading)]">
            {queue.length}
          </p>
        </div>
        <div className="rounded-2xl border border-[#bbf7d0] bg-[#e8f7ef] px-4 py-3">
          <p className="text-sm text-[#0f7a45]">Active</p>
          <p className="font-[family-name:var(--font-google-sans)] text-2xl font-bold text-[#0f7a45]">
            {byStatus.active}
          </p>
        </div>
        <div className="rounded-2xl border border-[#fde68a] bg-[#fff6e0] px-4 py-3">
          <p className="text-sm text-[#9a6700]">Under negotiation</p>
          <p className="font-[family-name:var(--font-google-sans)] text-2xl font-bold text-[#9a6700]">
            {byStatus.negotiating}
          </p>
        </div>
        <div className="rounded-2xl border border-[#bfdbfe] bg-[#eff6ff] px-4 py-3">
          <p className="text-sm text-[#0b3d91]">Confidential</p>
          <p className="font-[family-name:var(--font-google-sans)] text-2xl font-bold text-[#0b3d91]">
            {byStatus.confidential}
          </p>
        </div>
      </div>

      <Panel
        title="Moderation queue"
        description={
          queue.length
            ? `${queue.length} draft${queue.length === 1 ? "" : "s"} awaiting review`
            : "Empty — submit a draft from the listing wizard to populate this queue."
        }
      >
        {queue.length === 0 ? (
          <p className="text-sm text-[var(--text-body)]">
            No submitted drafts in this workspace yet. Create one via{" "}
            <Link
              href="/dashboard/listings/new"
              className="font-semibold text-[var(--brand-blue-accessible-light)] underline-offset-4 hover:underline"
            >
              New listing
            </Link>
            .
          </p>
        ) : (
          <ul className="space-y-4">
            {queue.map((draft) => (
              <li
                key={draft.id}
                className="space-y-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-page)] p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-[var(--text-heading)]">
                      {draft.title}
                    </p>
                    <p className="mt-1 text-sm text-[var(--text-body)]">
                      {kindLabels[draft.kind]} · v{draft.version}
                    </p>
                    <p className="mt-1 text-sm text-[var(--text-body)]">
                      {draft.summary}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge label={draft.status} tone="warning" />
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/admin/listings/${draft.id}`}>Detail</Link>
                    </Button>
                  </div>
                </div>
                <ModerationActions draftId={draft.id} status={draft.status} />
              </li>
            ))}
          </ul>
        )}
      </Panel>

      {revisions.length > 0 ? (
        <Panel title="Recent revisions" description="Submitted change sets.">
          <ul className="divide-y divide-[var(--border-subtle)]">
            {revisions.map((rev) => (
              <li key={rev.id} className="flex justify-between gap-3 py-3 text-sm">
                <span className="font-medium text-[var(--text-heading)]">
                  {rev.draft?.title ?? rev.listingDraftId}
                </span>
                <StatusBadge label={`${rev.status} · v${rev.version}`} tone="info" />
              </li>
            ))}
          </ul>
        </Panel>
      ) : null}

      <Panel
        title="Full demo catalogue"
        description="Colour-coded opportunity filters, status chips, expandable row details and pagination across all seed listings (proposal §§7–8, 13)."
      >
        <div className="mb-4 flex flex-wrap gap-2 text-xs">
          {(
            Object.entries(byKind) as [OpportunityKind, number][]
          ).map(([k, count]) => (
            <span
              key={k}
              className="rounded-full border border-[var(--border-subtle)] bg-[var(--surface-subtle)] px-2.5 py-1 font-semibold text-[var(--text-heading)]"
            >
              {kindLabels[k]} · {count}
            </span>
          ))}
        </div>
        <CatalogueTable rows={catalogue} />
      </Panel>
    </WorkspacePage>
  );
}
