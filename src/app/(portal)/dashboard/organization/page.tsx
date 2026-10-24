import { WorkspacePage } from "@/components/layout/workspace-page";

export default function Page() {
  return (
    <WorkspacePage
      title="Organization"
      purpose="View the organization attached to your demo workspace."
      emptyTitle="No organization linked"
      emptyDescription="Join or create an organization when invites are seeded."
      actionHref="/dashboard/team"
      actionLabel="View team"
    />
  );
}
