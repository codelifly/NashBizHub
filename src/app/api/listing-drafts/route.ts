import { NextResponse } from "next/server";
import { z } from "zod";
import { OPPORTUNITY_KINDS } from "@/lib/constants";
import { getDemoActor } from "@/server/demo/actor";
import { assignWorkspaceCookieIfMissing } from "@/server/demo/workspace";
import {
  createListingDraft,
  listListingDrafts,
  submitListingDraft,
  updateListingDraft,
} from "@/server/repositories/memory/listing-drafts";

export async function GET() {
  const { workspaceId } = await assignWorkspaceCookieIfMissing();
  const actor = await getDemoActor();
  const drafts = listListingDrafts(workspaceId);
  return NextResponse.json({ workspaceId, actor, drafts });
}

const upsertSchema = z.object({
  id: z.string().min(1).optional(),
  kind: z.enum(OPPORTUNITY_KINDS),
  title: z.string().min(3).max(200),
  summary: z.string().min(10).max(500),
  description: z.string().min(20).max(8000),
  citySlug: z.string().min(2).max(80),
  industrySlug: z.string().min(2).max(80),
  locationLabel: z.string().min(2).max(200),
  confidential: z.boolean().optional(),
  commercial: z.record(z.string(), z.unknown()).optional(),
  operations: z.record(z.string(), z.unknown()).optional(),
  inclusions: z.array(z.string()).optional(),
  exclusions: z.array(z.string()).optional(),
  submit: z.boolean().optional(),
});

export async function POST(request: Request) {
  const { workspaceId } = await assignWorkspaceCookieIfMissing();
  const actor = await getDemoActor();
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = upsertSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 });
  }

  try {
    let draft = parsed.data.id
      ? updateListingDraft(workspaceId, parsed.data.id, {
          kind: parsed.data.kind,
          title: parsed.data.title,
          summary: parsed.data.summary,
          description: parsed.data.description,
          citySlug: parsed.data.citySlug,
          industrySlug: parsed.data.industrySlug,
          locationLabel: parsed.data.locationLabel,
          confidential: parsed.data.confidential,
          commercial: parsed.data.commercial,
          operations: parsed.data.operations,
          inclusions: parsed.data.inclusions,
          exclusions: parsed.data.exclusions,
        })
      : createListingDraft({
          workspaceId,
          createdBy: actor.userId,
          kind: parsed.data.kind,
          title: parsed.data.title,
          summary: parsed.data.summary,
          description: parsed.data.description,
          citySlug: parsed.data.citySlug,
          industrySlug: parsed.data.industrySlug,
          locationLabel: parsed.data.locationLabel,
          confidential: parsed.data.confidential,
          commercial: parsed.data.commercial,
          operations: parsed.data.operations,
          inclusions: parsed.data.inclusions,
          exclusions: parsed.data.exclusions,
        });

    let revision = null;
    if (parsed.data.submit) {
      const result = submitListingDraft(workspaceId, draft.id, actor.userId);
      draft = result.draft;
      revision = result.revision;
    }

    return NextResponse.json(
      { workspaceId, draft, revision },
      { status: parsed.data.id ? 200 : 201 },
    );
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Save failed" },
      { status: 400 },
    );
  }
}
