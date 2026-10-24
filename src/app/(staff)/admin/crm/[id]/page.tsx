import Link from "next/link";
import { WorkspacePage } from "@/components/layout/workspace-page";
import { getDemoActor } from "@/server/demo/actor";
import { getOrCreateWorkspace } from "@/server/demo/workspace";
import { getCrmCustomer } from "@/server/repositories/memory/crm";
import {
  getInquiry,
  listInquiryMessages,
} from "@/server/repositories/memory/inquiries";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { workspaceId } = await getOrCreateWorkspace();
  const actor = await getDemoActor();
  const customer = getCrmCustomer(workspaceId, id);

  if (!customer) {
    return (
      <WorkspacePage
        title={`CRM ${id}`}
        purpose="Customer opportunity detail."
        emptyTitle="Not found"
        emptyDescription="No inquiry-backed CRM record for this id."
        actionHref="/admin/crm"
        actionLabel="Back to CRM"
      />
    );
  }

  const inquiry = getInquiry(workspaceId, customer.inquiryId);
  const messages = listInquiryMessages(workspaceId, customer.inquiryId);

  return (
    <WorkspacePage
      title={customer.listingTitle ?? customer.userId}
      purpose={`Stage ${customer.stage} · ${customer.userId}`}
      demoNote={`Workspace ${workspaceId} · persona ${actor.label}`}
      actionHref="/admin/crm"
      actionLabel="Back to CRM"
    >
      <div className="space-y-6">
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-[var(--text-body)]/80">Stage</dt>
            <dd className="font-medium">{customer.stage}</dd>
          </div>
          <div>
            <dt className="text-[var(--text-body)]/80">Inquiry status</dt>
            <dd className="font-medium">{customer.status}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-[var(--text-body)]/80">Assigned</dt>
            <dd>{customer.assignedTo ?? "Unassigned"}</dd>
          </div>
        </dl>
        {inquiry ? (
          <p className="text-sm whitespace-pre-wrap text-[var(--text-body)]">
            {inquiry.message}
          </p>
        ) : null}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Thread preview</h2>
          <ul className="space-y-2 text-sm">
            {messages.map((m) => (
              <li
                key={m.id}
                className="rounded-[var(--radius-control)] bg-[var(--surface-subtle)] px-3 py-2"
              >
                <span className="font-medium">{m.senderUserId}</span>: {m.body}
              </li>
            ))}
          </ul>
        </section>
        <Link
          href={`/dashboard/inquiries/${customer.inquiryId}`}
          className="text-sm font-medium text-[var(--brand-blue-accessible-light)] underline-offset-4 hover:underline"
        >
          Open full inquiry
        </Link>
      </div>
    </WorkspacePage>
  );
}
