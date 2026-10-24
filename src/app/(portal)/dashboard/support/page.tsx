import { WorkspacePage } from "@/components/layout/workspace-page";

export default function Page() {
  return (
    <WorkspacePage
      title="Support"
      purpose="Raise tickets with the demo adviser desk."
      emptyTitle="No open tickets"
      emptyDescription="Describe an issue to create a simulated support case."
      actionHref="/help"
      actionLabel="Browse help"
    />
  );
}
