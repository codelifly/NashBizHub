import { cookies } from "next/headers";
import { demoPersonas } from "@/config/roles";
import type { AppRole } from "@/config/roles";
import { PERSONA_COOKIE } from "@/server/demo/workspace";

export type DemoActor = {
  userId: string;
  email: string;
  label: string;
  personaKey: string;
  roles: AppRole[];
};

export function personaToUserId(personaKey: string): string {
  return `user_${personaKey.replace(/-/g, "_")}`;
}

export function getPersonaByKey(key: string) {
  return demoPersonas.find((p) => p.key === key);
}

/**
 * Active demo actor from nbh_demo_persona cookie (DEMO_MODE flows).
 * Defaults to Maya Chen so public inquiry forms work without a prior switch.
 */
export async function getDemoActor(): Promise<DemoActor> {
  const jar = await cookies();
  const key = jar.get(PERSONA_COOKIE)?.value ?? "maya-chen";
  const persona = getPersonaByKey(key) ?? demoPersonas[0]!;
  return {
    userId: personaToUserId(persona.key),
    email: persona.email,
    label: persona.label,
    personaKey: persona.key,
    roles: [...persona.roles],
  };
}
