import { WorkspacePage } from "@/components/layout/workspace-page";

export default async function Page({
  params,
}: {
  params: Promise<{ dealId: string }>;
}) {
  const { dealId } = await params;
  return (
    <WorkspacePage
      title={`Document room · ${dealId}`}
      purpose="Controlled document sharing for a deal. Uploads stay in private demo storage."
      emptyTitle="No documents granted"
      emptyDescription="Grant access from the deal overview when seeded."
      actionHref="/dashboard/deals"
      actionLabel="Back to deals"
    />
  );
}
