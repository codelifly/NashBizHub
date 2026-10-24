import { WorkspacePage } from "@/components/layout/workspace-page";
import { kindLabels } from "@/features/listings/lib/kind-labels";
import { getDemoActor } from "@/server/demo/actor";
import { getOrCreateWorkspace } from "@/server/demo/workspace";
import { getListingDraft } from "@/server/repositories/memory/listing-drafts";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { workspaceId } = await getOrCreateWorkspace();
  const actor = await getDemoActor();
  const draft = getListingDraft(workspaceId, id);

  if (!draft) {
    return (
      <WorkspacePage
        title={`Listing ${id}`}
        purpose="Memory draft detail."
        emptyTitle="Draft not found"
        emptyDescription="This id is not in the current workspace bag."
        actionHref="/dashboard/listings"
        actionLabel="Back to listings"
      />
    );
  }

  return (
    <WorkspacePage
      title={draft.title}
      purpose={`${kindLabels[draft.kind]} · ${draft.status}`}
      demoNote={`Workspace ${workspaceId} · persona ${actor.label}`}
      actionHref="/dashboard/listings"
      actionLabel="All listings"
    >
      <div className="space-y-4 rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-5 text-sm">
        <p>{draft.summary}</p>
        <p className="whitespace-pre-wrap text-[var(--text-body)]">
          {draft.description}
        </p>
        <p>
          Location: {draft.locationLabel} · {draft.citySlug} ·{" "}
          {draft.industrySlug}
        </p>
        {draft.publicCode ? <p>Public code: {draft.publicCode}</p> : null}
        {draft.reviewNotes ? (
          <p className="text-[var(--color-warning)]">
            Review notes: {draft.reviewNotes}
          </p>
        ) : null}
        <pre className="overflow-x-auto rounded-[var(--radius-control)] bg-[var(--surface-subtle)] p-3 text-xs">
          {JSON.stringify(draft.commercial, null, 2)}
        </pre>
      </div>
    </WorkspacePage>
  );
}
