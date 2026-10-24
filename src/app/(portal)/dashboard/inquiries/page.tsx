import Link from "next/link";
import { WorkspacePage } from "@/components/layout/workspace-page";
import { getDemoActor } from "@/server/demo/actor";
import { getOrCreateWorkspace } from "@/server/demo/workspace";
import { listInquiries } from "@/server/repositories/memory/inquiries";
import { getListingById } from "@/server/repositories/sqlite/listings";

export default async function Page() {
  const { workspaceId } = await getOrCreateWorkspace();
  const actor = await getDemoActor();
  const inquiries = listInquiries(workspaceId);

  return (
    <WorkspacePage
      title="Inquiries"
      purpose="Inbound and outbound questions about listings."
      demoNote={`Workspace ${workspaceId} · persona ${actor.label}`}
      emptyTitle={inquiries.length ? undefined : "Inbox empty"}
      emptyDescription={
        inquiries.length
          ? undefined
          : "Start from a public listing detail page."
      }
      actionHref="/businesses-for-sale"
      actionLabel="Find a listing"
    >
      {inquiries.length > 0 ? (
        <ul className="space-y-3">
          {inquiries.map((inq) => {
            const listing = getListingById(inq.listingId);
            return (
              <li
                key={inq.id}
                className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1">
                    <p className="font-medium text-[var(--text-heading)]">
                      {listing?.title ?? inq.listingId}
                    </p>
                    <p className="text-sm text-[var(--text-body)] line-clamp-2">
                      {inq.message}
                    </p>
                    <p className="text-xs text-[var(--text-body)]/70">
                      Status {inq.status} · from {inq.fromUserId}
                    </p>
                  </div>
                  <Link
                    href={`/dashboard/inquiries/${inq.id}`}
                    className="text-sm font-medium text-[var(--brand-blue-accessible-light)] underline-offset-4 hover:underline"
                  >
                    Open thread
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
