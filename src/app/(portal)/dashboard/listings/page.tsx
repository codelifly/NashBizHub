import Link from "next/link";
import { WorkspacePage } from "@/components/layout/workspace-page";
import { kindLabels } from "@/features/listings/lib/kind-labels";
import { getDemoActor } from "@/server/demo/actor";
import { getOrCreateWorkspace } from "@/server/demo/workspace";
import { listListingDrafts } from "@/server/repositories/memory/listing-drafts";

export default async function Page() {
  const { workspaceId } = await getOrCreateWorkspace();
  const actor = await getDemoActor();
  const drafts = listListingDrafts(workspaceId);

  return (
    <WorkspacePage
      title="My listings"
      purpose="Draft, submit, and monitor opportunities you control."
      demoNote={`Workspace ${workspaceId} · persona ${actor.label}`}
      emptyTitle={drafts.length ? undefined : "No listings yet"}
      emptyDescription={
        drafts.length
          ? undefined
          : "Create a fictional listing with the demo wizard."
      }
      actionHref="/dashboard/listings/new"
      actionLabel="Create listing"
    >
      {drafts.length > 0 ? (
        <ul className="space-y-3">
          {drafts.map((draft) => (
            <li
              key={draft.id}
              className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-[var(--text-heading)]">
                    {draft.title || "Untitled draft"}
                  </p>
                  <p className="text-sm text-[var(--text-body)]">
                    {kindLabels[draft.kind]} · {draft.status}
                    {draft.publicCode ? ` · ${draft.publicCode}` : ""}
                  </p>
                  {draft.reviewNotes ? (
                    <p className="mt-1 text-sm text-[var(--color-warning)]">
                      Review: {draft.reviewNotes}
                    </p>
                  ) : null}
                </div>
                <Link
                  href={
                    draft.status === "draft" ||
                    draft.status === "changes-requested"
                      ? "/dashboard/listings/new"
                      : `/dashboard/listings/${draft.id}`
                  }
                  className="text-sm font-medium text-[var(--brand-blue-accessible-light)] underline-offset-4 hover:underline"
                >
                  {draft.status === "draft" ||
                  draft.status === "changes-requested"
                    ? "Continue wizard"
                    : "View"}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </WorkspacePage>
  );
}
