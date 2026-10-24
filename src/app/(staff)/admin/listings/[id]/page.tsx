import { WorkspacePage } from "@/components/layout/workspace-page";
import { ModerationActions } from "@/features/listings/components/moderation-actions";
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
        title={`Moderate listing ${id}`}
        purpose="Staff detail for a single listing draft."
        emptyTitle="Draft not found"
        emptyDescription="Bind to a submitted memory draft from the moderation queue."
        actionHref="/admin/listings"
        actionLabel="Back to queue"
      />
    );
  }

  return (
    <WorkspacePage
      title={draft.title}
      purpose={`Staff review · ${kindLabels[draft.kind]} · ${draft.status}`}
      demoNote={`Workspace ${workspaceId} · persona ${actor.label}`}
      actionHref="/admin/listings"
      actionLabel="Back to queue"
    >
      <div className="space-y-6">
        <div className="space-y-2 rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-5 text-sm">
          <p>{draft.summary}</p>
          <p className="whitespace-pre-wrap">{draft.description}</p>
          <pre className="overflow-x-auto rounded-[var(--radius-control)] bg-[var(--surface-subtle)] p-3 text-xs">
            {JSON.stringify(draft.commercial, null, 2)}
          </pre>
        </div>
        <ModerationActions draftId={draft.id} status={draft.status} />
      </div>
    </WorkspacePage>
  );
}
