import { NextResponse } from "next/server";
import { getDemoActor } from "@/server/demo/actor";
import { assignWorkspaceCookieIfMissing } from "@/server/demo/workspace";
import { readPrivateDocumentBytes } from "@/server/repositories/memory/documents";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const { workspaceId } = await assignWorkspaceCookieIfMissing();
  const actor = await getDemoActor();

  try {
    const { bytes, document } = readPrivateDocumentBytes(
      workspaceId,
      id,
      actor.userId,
    );
    return new NextResponse(new Uint8Array(bytes), {
      status: 200,
      headers: {
        "Content-Type": document.mimeType,
        "Content-Disposition": `attachment; filename="${document.fileName}"`,
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Download failed";
    const status = message.includes("grant") ? 403 : 404;
    return NextResponse.json({ error: message }, { status });
  }
}
