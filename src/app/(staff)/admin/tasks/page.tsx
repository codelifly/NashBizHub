import { WorkspacePage } from "@/components/layout/workspace-page";
import { Panel } from "@/components/dashboard/ui";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";

const tasks = [
  {
    id: "task-1",
    title: "Follow up Riverside Café inquiry qualification",
    owner: "Summit Broker",
    due: "Today",
    status: "open",
  },
  {
    id: "task-2",
    title: "Review laundry operator application references",
    owner: "Adviser",
    due: "Tomorrow",
    status: "open",
  },
  {
    id: "task-3",
    title: "Approve Harbor Foods listing revision notes",
    owner: "Moderator",
    due: "This week",
    status: "in-progress",
  },
  {
    id: "task-4",
    title: "Close resolved support ticket tkt-1003",
    owner: "Support",
    due: "Done",
    status: "done",
  },
];

export default function Page() {
  return (
    <WorkspacePage
      eyebrow="Transactions"
      title="Staff tasks"
      purpose="Internal follow-ups that keep CRM, moderation and support moving."
      actionHref="/admin/crm"
      actionLabel="CRM"
      secondaryHref="/admin/support"
      secondaryLabel="Support"
    >
      <Panel title="Task board" description="Demo checklist for the presenter session.">
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-page)] px-4 py-3"
            >
              <div>
                <p className="font-semibold text-[var(--text-heading)]">{task.title}</p>
                <p className="text-sm text-[var(--text-body)]">
                  {task.owner} · Due {task.due}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge
                  label={task.status}
                  tone={task.status === "done" ? "success" : "warning"}
                />
                <Button type="button" size="sm" variant="outline">
                  Mark done
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </WorkspacePage>
  );
}
