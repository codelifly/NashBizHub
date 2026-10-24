import { WorkspacePage } from "@/components/layout/workspace-page";
import { Panel } from "@/components/dashboard/ui";
import { StatusBadge } from "@/components/shared/status-badge";

const events = [
  {
    id: "aud-1",
    action: "listing.submitted",
    actor: "Harbor Foods Demo",
    entity: "Draft listing",
    when: "2 hours ago",
  },
  {
    id: "aud-2",
    action: "inquiry.replied",
    actor: "Summit Broker",
    entity: "Riverside Café inquiry",
    when: "3 hours ago",
  },
  {
    id: "aud-3",
    action: "offer.countered",
    actor: "Harbor Foods Demo",
    entity: "Offer v2 · $405,000",
    when: "Yesterday",
  },
  {
    id: "aud-4",
    action: "document.grant.revoked",
    actor: "Harbor Foods Demo",
    entity: "PFS demo PDF",
    when: "Yesterday",
  },
  {
    id: "aud-5",
    action: "persona.switched",
    actor: "Presenter",
    entity: "maya-chen → harbor-owner",
    when: "Today",
  },
];

export default function Page() {
  return (
    <WorkspacePage
      eyebrow="Overview"
      title="Audit log"
      purpose="Sensitive actions retain an actor, entity and timestamp for demo accountability."
      actionHref="/admin/reports"
      actionLabel="Reports"
    >
      <Panel title="Recent events" description="Redacted demo trail — no secrets stored in plain UI.">
        <ul className="divide-y divide-[var(--border-subtle)]">
          {events.map((event) => (
            <li key={event.id} className="flex flex-wrap items-start justify-between gap-3 py-3">
              <div>
                <p className="font-semibold text-[var(--text-heading)]">{event.action}</p>
                <p className="text-sm text-[var(--text-body)]">
                  {event.actor} · {event.entity}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge label={event.when} tone="neutral" />
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </WorkspacePage>
  );
}
