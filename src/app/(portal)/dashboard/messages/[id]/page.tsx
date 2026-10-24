import { WorkspacePage } from "@/components/layout/workspace-page";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <WorkspacePage
      title={`Conversation ${id}`}
      purpose="Message thread linked to an inquiry or deal."
      emptyTitle="No messages"
      emptyDescription="Send a demo reply once the messaging adapter is connected."
      actionHref="/dashboard/messages"
      actionLabel="All messages"
    />
  );
}
