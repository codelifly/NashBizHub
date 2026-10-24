import { WorkspacePage } from "@/components/layout/workspace-page";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <WorkspacePage
      title={`Edit listing ${id}`}
      purpose="Edit shell for commercial fields, disclosures, and media."
      emptyTitle="Editor ready"
      emptyDescription="Save is simulated until the listing service is wired."
      actionHref="/dashboard/listings"
      actionLabel="Cancel"
    />
  );
}
