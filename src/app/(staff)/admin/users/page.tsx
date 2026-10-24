import Link from "next/link";
import { WorkspacePage } from "@/components/layout/workspace-page";
import { Panel } from "@/components/dashboard/ui";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { demoPersonas } from "@/config/roles";

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = searchParams ? await searchParams : {};
  const q = (Array.isArray(params.q) ? params.q[0] : params.q)?.toLowerCase() ?? "";
  const users = demoPersonas.filter(
    (p) =>
      !q ||
      p.label.toLowerCase().includes(q) ||
      p.email.toLowerCase().includes(q) ||
      p.roles.some((r) => r.toLowerCase().includes(q)),
  );

  return (
    <WorkspacePage
      eyebrow="Customers"
      title="Users"
      purpose="Search and inspect demo customer and staff personas used in presentations."
      actionHref="/admin/organizations"
      actionLabel="Organizations"
      secondaryHref="/demo"
      secondaryLabel="Demo Center"
    >
      <Panel title="Search" description="Filter by name, email, or role.">
        <form method="get" className="flex flex-wrap gap-3">
          <Input
            name="q"
            defaultValue={q}
            placeholder="Search personas…"
            className="min-w-[16rem] flex-1"
            aria-label="Search users"
          />
          <Button type="submit" className="!text-white">
            Search
          </Button>
          {q ? (
            <Button asChild type="button" variant="outline">
              <Link href="/admin/users">Clear</Link>
            </Button>
          ) : null}
        </form>
      </Panel>

      <Panel
        title={`${users.length} account${users.length === 1 ? "" : "s"}`}
        description={q ? `Filtered by “${q}”` : "Seed personas · switch via Demo Center"}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--border-subtle)] text-[var(--text-body)]">
                <th className="px-2 py-3 font-semibold">Name</th>
                <th className="px-2 py-3 font-semibold">Email</th>
                <th className="px-2 py-3 font-semibold">Roles</th>
                <th className="px-2 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.key} className="border-b border-[var(--border-subtle)]">
                  <td className="px-2 py-3 font-medium text-[var(--text-heading)]">
                    {user.label}
                  </td>
                  <td className="px-2 py-3 text-[var(--text-body)]">{user.email}</td>
                  <td className="px-2 py-3">
                    <div className="flex flex-wrap gap-1">
                      {user.roles.map((role) => (
                        <StatusBadge key={role} label={role} tone="info" />
                      ))}
                    </div>
                  </td>
                  <td className="px-2 py-3">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/admin/crm?user=${user.key}`}>Open in CRM</Link>
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
