import Link from "next/link";
import { WorkspacePage } from "@/components/layout/workspace-page";
import { getDemoActor } from "@/server/demo/actor";
import { getOrCreateWorkspace } from "@/server/demo/workspace";
import { listApplications } from "@/server/repositories/memory/applications";
import { getListingById } from "@/server/repositories/sqlite/listings";

export default async function Page() {
  const { workspaceId } = await getOrCreateWorkspace();
  const actor = await getDemoActor();
  const applications = listApplications(workspaceId);

  return (
    <WorkspacePage
      title="Applications"
      purpose="Rental and tender applications in progress."
      demoNote={`Workspace ${workspaceId} · persona ${actor.label}`}
      emptyTitle={applications.length ? undefined : "No applications"}
      emptyDescription={
        applications.length
          ? undefined
          : "Apply from Cumberland Laundry (NBH-R-2001) or the Five Store Cleaning tender (NBH-T-4001)."
      }
      actionHref="/businesses-for-rent"
      actionLabel="Browse rentals"
    >
      {applications.length > 0 ? (
        <ul className="space-y-3">
          {applications.map((app) => {
            const listing = getListingById(app.listingId);
            return (
              <li
                key={app.id}
                className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-[var(--text-heading)]">
                      {listing?.title ?? app.listingId}
                    </p>
                    <p className="text-sm text-[var(--text-body)]">
                      {app.kind} · {app.status}
                      {listing?.publicCode ? ` · ${listing.publicCode}` : ""}
                    </p>
                  </div>
                  <Link
                    href={`/dashboard/applications/${app.id}`}
                    className="text-sm font-medium text-[var(--brand-blue-accessible-light)] underline-offset-4 hover:underline"
                  >
                    Review
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
