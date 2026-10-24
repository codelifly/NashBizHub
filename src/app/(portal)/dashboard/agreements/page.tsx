import Link from "next/link";
import { WorkspacePage } from "@/components/layout/workspace-page";
import { getDemoActor } from "@/server/demo/actor";
import { getOrCreateWorkspace } from "@/server/demo/workspace";
import { listAgreements } from "@/server/repositories/memory/agreements";
import { getListingById } from "@/server/repositories/sqlite/listings";

export default async function Page() {
  const { workspaceId } = await getOrCreateWorkspace();
  const actor = await getDemoActor();
  const agreements = listAgreements(workspaceId);

  return (
    <WorkspacePage
      title="Agreements"
      purpose="Executed and pending contracts for continuing operations."
      demoNote={`Workspace ${workspaceId} · persona ${actor.label}`}
      emptyTitle={agreements.length ? undefined : "No agreements"}
      emptyDescription={
        agreements.length
          ? undefined
          : "Award an application or use the seeded Cumberland Laundry agreement."
      }
      actionHref="/dashboard/applications"
      actionLabel="Applications"
    >
      {agreements.length > 0 ? (
        <ul className="space-y-3">
          {agreements.map((agr) => {
            const listing = agr.listingId
              ? getListingById(agr.listingId)
              : null;
            return (
              <li
                key={agr.id}
                className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-[var(--text-heading)]">
                      {agr.title}
                    </p>
                    <p className="text-sm text-[var(--text-body)]">
                      {agr.status}
                      {listing ? ` · ${listing.title}` : ""}
                      {agr.startDate ? ` · from ${agr.startDate}` : ""}
                    </p>
                  </div>
                  <Link
                    href={`/dashboard/agreements/${agr.id}`}
                    className="text-sm font-medium text-[var(--brand-blue-accessible-light)] underline-offset-4 hover:underline"
                  >
                    Open
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      ) : null}
    </WorkspacePage>
  );
}
