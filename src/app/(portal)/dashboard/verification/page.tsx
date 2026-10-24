import { WorkspacePage } from "@/components/layout/workspace-page";

export default function Page() {
  return (
    <WorkspacePage
      title="Verification"
      purpose="Complete simulated identity and business verification steps."
      emptyTitle="Verification not started"
      emptyDescription="Kick off the demo verification adapter flow."
      actionHref="/dashboard/profile"
      actionLabel="Update profile first"
    />
  );
}
