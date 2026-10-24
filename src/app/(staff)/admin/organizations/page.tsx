import Link from "next/link";
import { WorkspacePage } from "@/components/layout/workspace-page";
import { Panel } from "@/components/dashboard/ui";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { brokerFixtures } from "@/server/db/seeds/broker-fixtures";

const orgs = [
  {
    id: "harbor-foods",
    name: "Harbor Foods Demo",
    kind: "Owner organization",
    city: "Nashville",
    contact: "owner@harborfoods.example",
  },
  {
    id: "summit",
    name: "Summit Business Partners Demo",
    kind: "Broker firm",
    city: "Nashville",
    contact: "broker@summitpartners.example",
  },
  {
    id: "brightcare",
    name: "BrightCare Services Demo",
    kind: "Contractor",
    city: "Chattanooga",
    contact: "bids@brightcare.example",
  },
  {
    id: "volunteer-hospitality",
    name: "Volunteer Hospitality Demo",
    kind: "Owner organization",
    city: "Knoxville",
    contact: "ops@volunteerlodge.example",
  },
];

export default function Page() {
  return (
    <WorkspacePage
      eyebrow="Customers"
      title="Organizations"
      purpose="Owner, broker and contractor organizations linked to demo listings and agreements."
      actionHref="/admin/users"
      actionLabel="Users"
      secondaryHref="/brokers"
      secondaryLabel="Public broker directory"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Registered organizations" description="Fictional company accounts.">
          <ul className="space-y-3">
            {orgs.map((org) => (
              <li
                key={org.id}
                className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-page)] p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-[var(--text-heading)]">{org.name}</p>
                    <p className="mt-1 text-sm text-[var(--text-body)]">
                      {org.city} · {org.contact}
                    </p>
                  </div>
                  <StatusBadge label={org.kind} tone="info" />
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel
          title="Broker profiles"
          description={`${brokerFixtures.length} directory entries on the public site.`}
          action={
            <Button asChild size="sm" variant="outline">
              <Link href="/brokers">View public</Link>
            </Button>
          }
        >
          <ul className="divide-y divide-[var(--border-subtle)]">
            {brokerFixtures.map((broker) => (
              <li key={broker.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate font-medium text-[var(--text-heading)]">{broker.name}</p>
                  <p className="truncate text-sm text-[var(--text-body)]">{broker.firm}</p>
                </div>
                <Button asChild size="sm" variant="ghost">
                  <Link href={`/brokers/${broker.slug}`}>Profile</Link>
                </Button>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </WorkspacePage>
  );
}
