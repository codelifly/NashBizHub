import Link from "next/link";
import { WorkspacePage } from "@/components/layout/workspace-page";
import { Panel } from "@/components/dashboard/ui";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";

const tickets = [
  {
    id: "tkt-1001",
    subject: "Cannot download demo document after grant",
    customer: "Maya Chen",
    status: "open",
    priority: "high",
  },
  {
    id: "tkt-1002",
    subject: "Listing wizard save failed once",
    customer: "Harbor Foods Demo",
    status: "waiting",
    priority: "normal",
  },
  {
    id: "tkt-1003",
    subject: "How do membership entitlements work?",
    customer: "Daniel Brooks",
    status: "resolved",
    priority: "low",
  },
  {
    id: "tkt-1004",
    subject: "Appointment reminder arrived twice",
    customer: "Summit Broker",
    status: "open",
    priority: "normal",
  },
];

export default function Page() {
  return (
    <WorkspacePage
      eyebrow="Customers"
      title="Support desk"
      purpose="Assign, reply, request information and close customer support tickets."
      actionHref="/admin/crm"
      actionLabel="CRM"
      secondaryHref="/help"
      secondaryLabel="Help center"
    >
      <Panel title="Ticket queue" description="Fictional support cases for the demo console.">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--border-subtle)]">
                <th className="px-2 py-3 font-semibold">ID</th>
                <th className="px-2 py-3 font-semibold">Subject</th>
                <th className="px-2 py-3 font-semibold">Customer</th>
                <th className="px-2 py-3 font-semibold">Status</th>
                <th className="px-2 py-3 font-semibold">Priority</th>
                <th className="px-2 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-[var(--border-subtle)]">
                  <td className="px-2 py-3 font-mono text-xs">{ticket.id}</td>
                  <td className="px-2 py-3 font-medium text-[var(--text-heading)]">
                    {ticket.subject}
                  </td>
                  <td className="px-2 py-3">{ticket.customer}</td>
                  <td className="px-2 py-3">
                    <StatusBadge
                      label={ticket.status}
                      tone={
                        ticket.status === "open"
                          ? "warning"
                          : ticket.status === "resolved"
                            ? "success"
                            : "info"
                      }
                    />
                  </td>
                  <td className="px-2 py-3 capitalize">{ticket.priority}</td>
                  <td className="px-2 py-3">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/admin/support#${ticket.id}`}>Review</Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </WorkspacePage>
  );
}
