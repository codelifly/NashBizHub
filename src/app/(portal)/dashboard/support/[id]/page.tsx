import { WorkspacePage } from "@/components/layout/workspace-page";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <WorkspacePage
      title={`Ticket ${id}`}
      purpose="Support ticket conversation with the demo desk."
      emptyTitle="No replies yet"
      emptyDescription="Staff can mirror this ticket in /admin/support."
      actionHref="/dashboard/support"
      actionLabel="All tickets"
    />
  );
}
