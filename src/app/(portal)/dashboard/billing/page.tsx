import { WorkspacePage } from "@/components/layout/workspace-page";

export default function Page() {
  return (
    <WorkspacePage
      title="Billing (demo)"
      purpose="Membership and featured placement charges — simulated only. No real payments."
      emptyTitle="No invoices"
      emptyDescription="Demo billing adapter records fictional charges only."
      actionHref="/membership"
      actionLabel="View membership"
    />
  );
}
