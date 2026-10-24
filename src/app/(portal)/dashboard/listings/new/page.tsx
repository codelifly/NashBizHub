import { WorkspacePage } from "@/components/layout/workspace-page";
import { ListingWizard } from "@/features/listings/components/listing-wizard";
import { getDemoActor } from "@/server/demo/actor";
import { getOrCreateWorkspace } from "@/server/demo/workspace";

export default async function Page() {
  const { workspaceId } = await getOrCreateWorkspace();
  const actor = await getDemoActor();

  return (
    <WorkspacePage
      title="New listing"
      purpose="Multi-step wizard: type → basics → commercial fields → review → submit for moderation."
      demoNote={`Workspace ${workspaceId} · persona ${actor.label}. Drafts persist in memory until reset.`}
      actionHref="/dashboard/listings"
      actionLabel="Back to listings"
    >
      <ListingWizard />
    </WorkspacePage>
  );
}
