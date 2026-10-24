import { NextResponse } from "next/server";
import { isDemoMode } from "@/lib/env";
import { demoPersonas } from "@/config/roles";
import { personaToUserId } from "@/server/demo/actor";
import {
  assignWorkspaceCookieIfMissing,
  PERSONA_COOKIE,
  WORKSPACE_COOKIE,
} from "@/server/demo/workspace";

/**
 * Demo persona switch. Sets nbh_demo_persona cookie mapping to fixture emails.
 * Guarded: only available when DEMO_MODE is true.
 */
export async function GET() {
  if (!isDemoMode()) {
    return NextResponse.json({ error: "Demo persona API disabled" }, { status: 403 });
  }
  const { workspaceId } = await assignWorkspaceCookieIfMissing();
  return NextResponse.json({
    demo: true,
    workspaceId,
    personas: demoPersonas.map((p) => ({
      ...p,
      userId: personaToUserId(p.key),
    })),
  });
}

export async function POST(request: Request) {
  if (!isDemoMode()) {
    return NextResponse.json({ error: "Demo persona API disabled" }, { status: 403 });
  }

  let body: { personaKey?: string } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const persona = demoPersonas.find((p) => p.key === body.personaKey);
  if (!persona) {
    return NextResponse.json({ error: "Unknown personaKey" }, { status: 400 });
  }

  const { workspaceId } = await assignWorkspaceCookieIfMissing();

  const response = NextResponse.json({
    demo: true,
    simulated: true,
    workspaceId,
    activePersonaKey: persona.key,
    email: persona.email,
    userId: personaToUserId(persona.key),
    roles: persona.roles,
    message: `Demo session mapped to ${persona.label}. Use dashboard APIs with this cookie.`,
  });

  response.cookies.set(PERSONA_COOKIE, persona.key, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  response.cookies.set(WORKSPACE_COOKIE, workspaceId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
