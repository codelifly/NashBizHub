import { WorkspacePage } from "@/components/layout/workspace-page";

export default function Page() {
  return (
    <WorkspacePage
      title="Saved searches"
      purpose="Replay filter sets for Tennessee cities and industries."
      emptyTitle="No saved searches"
      emptyDescription="Create a search on the public marketplace, then save it."
      actionHref="/tennessee"
      actionLabel="Explore Tennessee"
    />
  );
}
