import { WorkspacePage } from "@/components/layout/workspace-page";

export default function Page() {
  return (
    <WorkspacePage
      title="Messages"
      purpose="Threaded conversations tied to inquiries and deals."
      emptyTitle="No threads"
      emptyDescription="Open an inquiry to begin a simulated message thread."
      actionHref="/dashboard/inquiries"
      actionLabel="Go to inquiries"
    />
  );
}
