import { WorkspacePage } from "@/components/layout/workspace-page";

export default function Page() {
  return (
    <WorkspacePage
      title="Team"
      purpose="Invite colleagues and assign marketplace roles within your organization."
      emptyTitle="No teammates yet"
      emptyDescription="Send a simulated invitation once seeding is available."
      actionHref="/dashboard/organization"
      actionLabel="Organization"
    />
  );
}
