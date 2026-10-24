import { WorkspacePage } from "@/components/layout/workspace-page";

export default function Page() {
  return (
    <WorkspacePage
      title="Notifications"
      purpose="In-app alerts for inquiries, documents, and deadlines."
      emptyTitle="All caught up"
      emptyDescription="Actions across the portal will feed this feed."
      actionHref="/dashboard"
      actionLabel="Back to dashboard"
    />
  );
}
