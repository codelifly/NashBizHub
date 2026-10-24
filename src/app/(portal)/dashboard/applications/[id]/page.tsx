import { WorkspacePage } from "@/components/layout/workspace-page";
import { ApplicationActions } from "@/features/applications/components/application-actions";
import { getDemoActor } from "@/server/demo/actor";
import { getOrCreateWorkspace } from "@/server/demo/workspace";
import { getApplication } from "@/server/repositories/memory/applications";
import { getListingById } from "@/server/repositories/sqlite/listings";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { workspaceId } = await getOrCreateWorkspace();
  const actor = await getDemoActor();
  const application = getApplication(workspaceId, id);

  if (!application) {
    return (
      <WorkspacePage
        title={`Application ${id}`}
        purpose="Rental or tender application packet."
        emptyTitle="Not found"
        emptyDescription="This application is not in the current workspace."
        actionHref="/dashboard/applications"
        actionLabel="All applications"
      />
    );
  }

  const listing = getListingById(application.listingId);
  let payload: Record<string, unknown> = {};
  try {
    payload = JSON.parse(application.payloadJson) as Record<string, unknown>;
  } catch {
    payload = {};
  }

  return (
    <WorkspacePage
      title={listing?.title ?? `Application ${id}`}
      purpose={`${application.kind} · ${application.status}`}
      demoNote={`Workspace ${workspaceId} · persona ${actor.label}`}
      actionHref="/dashboard/applications"
      actionLabel="All applications"
    >
      <div className="space-y-6">
        <dl className="grid gap-3 rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-5 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-[var(--text-body)]/80">Applicant</dt>
            <dd className="font-medium">{application.userId}</dd>
          </div>
          <div>
            <dt className="text-[var(--text-body)]/80">Listing</dt>
            <dd className="font-medium">
              {listing?.publicCode ?? application.listingId}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-[var(--text-body)]/80">Message</dt>
            <dd className="mt-1 whitespace-pre-wrap">
              {String(payload.message ?? "")}
            </dd>
          </div>
          {payload.proposedTerms ? (
            <div className="sm:col-span-2">
              <dt className="text-[var(--text-body)]/80">Proposed terms</dt>
              <dd className="mt-1">{String(payload.proposedTerms)}</dd>
            </div>
          ) : null}
        </dl>
        <ApplicationActions
          applicationId={application.id}
          status={application.status}
        />
      </div>
    </WorkspacePage>
  );
}
