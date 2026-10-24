import { WorkspacePage } from "@/components/layout/workspace-page";
import { Panel } from "@/components/dashboard/ui";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";

const requests = [
  {
    id: "ver-1",
    name: "Maya Chen",
    evidence: "Demo passport scan (fictional)",
    status: "submitted",
  },
  {
    id: "ver-2",
    name: "Harbor Foods Demo",
    evidence: "Company registration extract (demo PDF)",
    status: "changes-requested",
  },
  {
    id: "ver-3",
    name: "Daniel Brooks",
    evidence: "Operator licence note (fictional)",
    status: "approved",
  },
];

export default function Page() {
  return (
    <WorkspacePage
      eyebrow="Moderation"
      title="Verifications"
      purpose="Review fictional evidence, request corrections, or approve demo badges."
      actionHref="/admin/users"
      actionLabel="Users"
    >
      <Panel title="Verification queue" description="Badges are demonstration-only.">
        <ul className="space-y-3">
          {requests.map((req) => (
            <li
              key={req.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-page)] px-4 py-3"
            >
              <div>
                <p className="font-semibold text-[var(--text-heading)]">{req.name}</p>
                <p className="text-sm text-[var(--text-body)]">{req.evidence}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge
                  label={req.status}
                  tone={
                    req.status === "approved"
                      ? "success"
                      : req.status === "changes-requested"
                        ? "warning"
                        : "info"
                  }
                />
                <Button type="button" size="sm" className="!text-white">
                  Approve
                </Button>
                <Button type="button" size="sm" variant="outline">
                  Request changes
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </WorkspacePage>
  );
}
