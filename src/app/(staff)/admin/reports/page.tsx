import { WorkspacePage } from "@/components/layout/workspace-page";
import { Panel, StatCard } from "@/components/dashboard/ui";
import { listingFixtures } from "@/server/db/seeds/listing-fixtures";
import { brokerFixtures } from "@/server/db/seeds/broker-fixtures";
import { demoPersonas } from "@/config/roles";
import { OPPORTUNITY_KINDS } from "@/lib/constants";
import { kindLabels } from "@/features/listings/lib/kind-labels";

export default function Page() {
  const byKind = OPPORTUNITY_KINDS.map((kind) => ({
    kind,
    count: listingFixtures.filter((l) => l.kind === kind).length,
  }));
  const active = listingFixtures.filter((l) => l.status === "active").length;
  const confidential = listingFixtures.filter((l) => l.confidential).length;

  return (
    <WorkspacePage
      eyebrow="Overview"
      title="Reports"
      purpose="Counts derived from seeded records — not platform revenue."
      actionHref="/admin"
      actionLabel="Dashboard"
      secondaryHref="/admin/audit"
      secondaryLabel="Audit"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total listings" value={listingFixtures.length} hint="Seed catalogue" />
        <StatCard label="Active" value={active} hint="Publicly browsable" tone="accent" />
        <StatCard label="Confidential" value={confidential} hint="Area-only location" />
        <StatCard
          label="Brokers / personas"
          value={`${brokerFixtures.length} / ${demoPersonas.length}`}
          hint="Directory · accounts"
        />
      </div>

      <Panel title="Inventory by opportunity type" description="Useful for demo narration, not financial totals.">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {byKind.map((row) => (
            <li
              key={row.kind}
              className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-page)] px-4 py-4"
            >
              <p className="text-sm text-[var(--text-body)]">{kindLabels[row.kind]}</p>
              <p className="mt-1 font-[family-name:var(--font-google-sans)] text-3xl font-bold text-[var(--brand-blue-accessible-light)]">
                {row.count}
              </p>
            </li>
          ))}
        </ul>
      </Panel>
    </WorkspacePage>
  );
}
