import Link from "next/link";
import { WorkspacePage } from "@/components/layout/workspace-page";
import { Panel } from "@/components/dashboard/ui";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";

const contracts = [
  {
    id: "agr-laundry",
    title: "Cumberland Laundry operating agreement",
    parties: "Daniel Brooks · Harbor Foods",
    status: "active",
    href: "/dashboard/agreements",
  },
  {
    id: "agr-cleaning",
    title: "Five Store Cleaning award (pending)",
    parties: "BrightCare · Owner",
    status: "pending",
    href: "/dashboard/applications",
  },
  {
    id: "agr-lodge",
    title: "Volunteer Lodge management proposal",
    parties: "Operator shortlist",
    status: "draft",
    href: "/management-contracts",
  },
];

export default function Page() {
  return (
    <WorkspacePage
      eyebrow="Transactions"
      title="Contracts"
      purpose="Agreement register for operating rentals, management awards and service contracts."
      actionHref="/admin/deals"
      actionLabel="Deals"
      secondaryHref="/dashboard/obligations"
      secondaryLabel="Obligations"
    >
      <Panel title="Agreement register" description="Demo agreements with responsibility matrices.">
        <ul className="space-y-3">
          {contracts.map((c) => (
            <li
              key={c.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-page)] px-4 py-3"
            >
              <div>
                <p className="font-semibold text-[var(--text-heading)]">{c.title}</p>
                <p className="text-sm text-[var(--text-body)]">{c.parties}</p>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge
                  label={c.status}
                  tone={c.status === "active" ? "success" : "warning"}
                />
                <Button asChild size="sm" variant="outline">
                  <Link href={c.href}>Open</Link>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </WorkspacePage>
  );
}
