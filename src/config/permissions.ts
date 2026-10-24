import type { AppRole } from "./roles";

export const permissions = {
  "listing:create": ["owner", "broker", "organization-manager", "administrator"],
  "listing:moderate": ["moderator", "administrator"],
  "inquiry:respond": ["owner", "broker", "organization-manager", "adviser", "administrator"],
  "offer:submit": ["buyer", "operator", "contractor"],
  "offer:decide": ["owner", "broker", "organization-manager", "administrator"],
  "deal:manage": ["owner", "broker", "buyer", "operator", "contractor", "adviser", "administrator"],
  "document:grant": ["owner", "broker", "organization-manager", "administrator"],
  "admin:access": ["administrator", "moderator", "adviser"],
  "crm:manage": ["broker", "adviser", "administrator"],
  "demo:persona-switch": ["administrator"],
} as const;

export type Permission = keyof typeof permissions;

export function hasPermission(roles: AppRole[], permission: Permission): boolean {
  const allowed = permissions[permission] as readonly string[];
  return roles.some((role) => allowed.includes(role));
}
