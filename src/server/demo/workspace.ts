import { cookies } from "next/headers";
import { nanoid } from "nanoid";
import {
  ensureWorkspaceBag,
  listWorkspaceIds,
} from "@/server/repositories/memory/store";

export const WORKSPACE_COOKIE = "nbh_workspace";
export const PERSONA_COOKIE = "nbh_demo_persona";

/**
 * Resolve the demo workspace from the nbh_workspace cookie.
 * Safe for Server Components: never writes cookies during render.
 * Missing cookie falls back to "base" until an API route assigns a unique id.
 */
export async function getOrCreateWorkspace(): Promise<{
  workspaceId: string;
  created: boolean;
}> {
  const jar = await cookies();
  const existing = jar.get(WORKSPACE_COOKIE)?.value;
  if (existing && existing.length > 0) {
    ensureWorkspaceBag(existing);
    return { workspaceId: existing, created: false };
  }
  ensureWorkspaceBag("base");
  return { workspaceId: "base", created: false };
}

/**
 * Ensure a unique presenter workspace cookie. Call only from Route Handlers.
 */
export async function assignWorkspaceCookieIfMissing(): Promise<{
  workspaceId: string;
  created: boolean;
}> {
  const jar = await cookies();
  const existing = jar.get(WORKSPACE_COOKIE)?.value;
  if (existing && existing.length > 0) {
    ensureWorkspaceBag(existing);
    return { workspaceId: existing, created: false };
  }

  const workspaceId = `ws_${nanoid(10)}`;
  ensureWorkspaceBag(workspaceId);
  jar.set(WORKSPACE_COOKIE, workspaceId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return { workspaceId, created: true };
}

export async function getWorkspaceIdOrNull(): Promise<string | null> {
  const jar = await cookies();
  return jar.get(WORKSPACE_COOKIE)?.value ?? null;
}

export async function listKnownWorkspaces(): Promise<
  { id: string; label: string }[]
> {
  const ids = listWorkspaceIds();
  return ids.map((id) => ({
    id,
    label: id === "base" ? "Base demo workspace" : `Presenter workspace ${id}`,
  }));
}
