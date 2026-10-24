export const customerRoles = [
  "visitor",
  "buyer",
  "owner",
  "operator",
  "contractor",
  "broker",
  "organization-manager",
] as const;

export const staffRoles = ["adviser", "moderator", "administrator"] as const;

export const allRoles = [...customerRoles, ...staffRoles] as const;

export type CustomerRole = (typeof customerRoles)[number];
export type StaffRole = (typeof staffRoles)[number];
export type AppRole = (typeof allRoles)[number];

export const signupSelectableRoles: CustomerRole[] = [
  "buyer",
  "owner",
  "operator",
  "contractor",
  "broker",
];

export const demoPersonas = [
  {
    key: "maya-chen",
    label: "Maya Chen (Buyer)",
    email: "maya.chen@example.com",
    roles: ["buyer"] as AppRole[],
  },
  {
    key: "harbor-owner",
    label: "Harbor Foods Demo (Owner)",
    email: "owner@harborfoods.example",
    roles: ["owner", "organization-manager"] as AppRole[],
  },
  {
    key: "daniel-brooks",
    label: "Daniel Brooks (Operator)",
    email: "daniel.brooks@example.com",
    roles: ["operator"] as AppRole[],
  },
  {
    key: "summit-broker",
    label: "Summit Business Partners Demo (Broker)",
    email: "broker@summitpartners.example",
    roles: ["broker"] as AppRole[],
  },
  {
    key: "brightcare",
    label: "BrightCare Services Demo (Contractor)",
    email: "bids@brightcare.example",
    roles: ["contractor"] as AppRole[],
  },
  {
    key: "admin",
    label: "Demo Administrator",
    email: "admin@nashbizhub.example",
    roles: ["administrator", "moderator", "adviser"] as AppRole[],
  },
] as const;
