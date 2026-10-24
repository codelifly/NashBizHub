import Link from "next/link";
import { notFound } from "next/navigation";
import { WorkspacePage } from "@/components/layout/workspace-page";
import { InquiryReplyForm } from "@/features/inquiries/components/inquiry-reply-form";
import { getDemoActor } from "@/server/demo/actor";
import { getOrCreateWorkspace } from "@/server/demo/workspace";
import {
  getInquiry,
  listInquiryMessages,
} from "@/server/repositories/memory/inquiries";
import { getListingById } from "@/server/repositories/sqlite/listings";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { workspaceId } = await getOrCreateWorkspace();
  const actor = await getDemoActor();
  const inquiry = getInquiry(workspaceId, id);
  if (!inquiry) notFound();

  const listing = getListingById(inquiry.listingId);
  const messages = listInquiryMessages(workspaceId, id);

  return (
    <WorkspacePage
      title={listing?.title ?? "Inquiry"}
      purpose={inquiry.message}
      demoNote={`Workspace ${workspaceId} · persona ${actor.label}`}
    >
      <div className="space-y-4">
        {listing ? (
          <Link
            href={`/listings/${listing.slug}`}
            className="text-sm text-[var(--brand-blue-accessible-light)] underline-offset-4 hover:underline"
          >
            View listing
          </Link>
        ) : null}
        <ul className="space-y-3 rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-4">
          {messages.map((m) => (
            <li key={m.id} className="border-b border-[var(--border-subtle)] pb-3 last:border-0 last:pb-0">
              <p className="text-xs text-[var(--text-body)]/70">
                {m.senderUserId} · {new Date(m.createdAt).toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-[var(--text-heading)]">{m.body}</p>
            </li>
          ))}
        </ul>
        <InquiryReplyForm inquiryId={id} />
      </div>
    </WorkspacePage>
  );
}
