import { WorkspacePage } from "@/components/layout/workspace-page";

export default function Page() {
  return (
    <WorkspacePage
      title="Buyer requirements"
      purpose="Publish what you are looking for so owners and brokers can respond."
      emptyTitle="No requirements posted"
      emptyDescription="Describe your target industry, budget, and geography."
      actionHref="/requirements"
      actionLabel="View public board"
    />
  );
}
