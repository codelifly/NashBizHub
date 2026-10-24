import Link from "next/link";
import { WorkspacePage } from "@/components/layout/workspace-page";
import { Panel } from "@/components/dashboard/ui";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { demoPersonas } from "@/config/roles";
import { getDemoActor } from "@/server/demo/actor";
import { getOrCreateWorkspace } from "@/server/demo/workspace";
import { listCrmCustomers } from "@/server/repositories/memory/crm";

const pipelineStages = [
  { id: "new", label: "New" },
  { id: "qualified", label: "Qualified" },
  { id: "meeting", label: "Meeting" },
  { id: "negotiation", label: "Negotiation" },
  { id: "won", label: "Won" },
];

export default async function Page() {
  const { workspaceId } = await getOrCreateWorkspace();
  const actor = await getDemoActor();
  const customers = listCrmCustomers(workspaceId);

  return (
    <WorkspacePage
      eyebrow="Customers"
      title="CRM"
      purpose="Pipeline of inquiry customers derived from workspace inquiries."
      demoNote={`Workspace ${workspaceId} · persona ${actor.label}`}
      actionHref="/admin/tasks"
      actionLabel="Tasks"
      secondaryHref="/admin/support"
      secondaryLabel="Support"
    >
      <Panel title="Pipeline stages" description="Demo stage labels for adviser walkthroughs.">
        <div className="flex flex-wrap gap-2">
          {pipelineStages.map((stage) => (
            <span
              key={stage.id}
              className="rounded-full border border-[var(--border-subtle)] bg-[var(--surface-page)] px-3 py-1.5 text-sm font-semibold text-[var(--text-heading)]"
            >
              {stage.label}
            </span>
          ))}
        </div>
      </Panel>

      <Panel
        title="Active customers"
        description={
          customers.length
            ? `${customers.length} inquiry-linked record${customers.length === 1 ? "" : "s"}`
            : "Empty — create inquiries from a listing detail page to seed CRM rows."
        }
      >
        {customers.length === 0 ? (
          <p className="text-sm text-[var(--text-body)]">
            No CRM customers in this workspace yet. Browse a listing as a buyer persona and send an
            inquiry.
          </p>
        ) : (
          <ul className="space-y-3">
            {customers.map((c) => (
              <li
                key={c.id}
                className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-page)] p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-[var(--text-heading)]">{c.userId}</p>
                    <p className="mt-1 text-sm text-[var(--text-body)]">
                      {c.listingTitle ? `${c.listingTitle} · ` : ""}
                      inquiry {c.status}
                    </p>
                    <p className="mt-1 text-sm text-[var(--text-body)]">{c.messagePreview}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge label={c.stage} tone="info" />
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/admin/crm/${c.id}`}>Open</Link>
                    </Button>
                    <Button asChild size="sm" variant="ghost">
                      <Link href={`/dashboard/inquiries/${c.inquiryId}`}>Thread</Link>
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel title="Assignable personas" description="Demo accounts advisers can reference.">
        <ul className="divide-y divide-[var(--border-subtle)]">
          {demoPersonas.map((persona) => (
            <li key={persona.key} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <div>
                <p className="font-medium text-[var(--text-heading)]">{persona.label}</p>
                <p className="text-sm text-[var(--text-body)]">{persona.email}</p>
              </div>
              <div className="flex flex-wrap gap-1">
                {persona.roles.map((role) => (
                  <StatusBadge key={role} label={role} tone="neutral" />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </WorkspacePage>
  );
}
