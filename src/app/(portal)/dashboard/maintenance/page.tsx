import Link from "next/link";
import { WorkspacePage } from "@/components/layout/workspace-page";
import { Panel } from "@/components/dashboard/ui";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { BackToHome } from "@/components/shared/back-to-home";

const issues = [
  {
    id: "mnt-1",
    title: "Washer #7 vibration reported",
    listing: "Cumberland Laundry",
    severity: "normal",
    status: "open",
  },
  {
    id: "mnt-2",
    title: "Front awning light out",
    listing: "Riverside Café",
    severity: "low",
    status: "scheduled",
  },
  {
    id: "mnt-3",
    title: "HVAC filter change due",
    listing: "Volunteer Lodge",
    severity: "low",
    status: "done",
  },
];

export default function Page() {
  return (
    <WorkspacePage
      eyebrow="Listings & ops"
      title="Maintenance"
      purpose="Log and track operating issues against active rental or management agreements (demo records)."
      actionHref="/dashboard/obligations"
      actionLabel="Obligations"
      secondaryHref="/dashboard/agreements"
      secondaryLabel="Agreements"
    >
      <div className="mb-2 flex justify-end">
        <BackToHome />
      </div>
      <Panel
        title="Issue log"
        description="Operators and owners share a fictional maintenance trail — not a live work-order system."
      >
        <ul className="space-y-3">
          {issues.map((issue) => (
            <li
              key={issue.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-page)] px-4 py-3"
            >
              <div>
                <p className="font-semibold text-[var(--text-heading)]">{issue.title}</p>
                <p className="text-sm text-[var(--text-body)]">{issue.listing}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge label={issue.severity} tone="neutral" />
                <StatusBadge
                  label={issue.status}
                  tone={issue.status === "done" ? "success" : "warning"}
                />
                <Button type="button" size="sm" variant="outline">
                  Update
                </Button>
              </div>
            </li>
          ))}
        </ul>
        <Button asChild className="mt-4 !text-white">
          <Link href="/dashboard/support">Escalate via support</Link>
        </Button>
      </Panel>
    </WorkspacePage>
  );
}
