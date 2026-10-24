/** Customer-facing navigation — proposal language (no staff/admin). */

/** Top-level labels are rendered via mega menu (Operate · Buy · Sell · Rent or Lease · More). */
export const primaryNav = [
  { href: "/operate-and-manage", label: "Operate & Manage" },
  { href: "/businesses-for-sale", label: "Buy a Business" },
  { href: "/sell-your-business", label: "Sell a Business" },
  { href: "/businesses-for-rent", label: "Rent or Lease" },
  { href: "/resources", label: "More" },
] as const;

export const intentNav = [
  {
    href: "/operate-and-manage",
    label: "Operate & Manage",
    description: "Appoint a manager — or operate for an owner",
  },
  {
    href: "/businesses-for-sale",
    label: "For sale",
    description: "Ownership of a business or specified assets",
  },
  {
    href: "/businesses-for-rent",
    label: "Rent a business",
    description: "Run an existing business for a fixed term",
  },
  {
    href: "/commercial-properties-for-lease",
    label: "Lease premises",
    description: "Commercial space without a trading business",
  },
  {
    href: "/management-contracts",
    label: "Management",
    description: "Operate an owner’s business under contract",
  },
  {
    href: "/service-contracts",
    label: "Service tenders",
    description: "Bid on defined work programs",
  },
] as const;

export const footerNav = {
  explore: [
    { href: "/operate-and-manage", label: "Operate & Manage" },
    { href: "/businesses-for-sale", label: "Buy a business" },
    { href: "/businesses-for-rent", label: "Rent a business" },
    { href: "/commercial-properties-for-lease", label: "Lease premises" },
    { href: "/management-contracts", label: "Management contracts" },
    { href: "/service-contracts", label: "Service contracts" },
    { href: "/requirements", label: "Buyer requirements" },
    { href: "/compare", label: "Compare shortlist" },
  ],
  learn: [
    { href: "/how-it-works/buyers", label: "How it works — buyers" },
    { href: "/how-it-works/sellers", label: "How it works — sellers" },
    { href: "/how-it-works/operators", label: "How it works — operators" },
    { href: "/contracts", label: "Contracts hub" },
    { href: "/tours", label: "Video tours" },
    { href: "/glossary", label: "Glossary" },
    { href: "/resources", label: "Guides & checklists" },
    { href: "/tennessee", label: "Tennessee cities" },
    { href: "/membership", label: "Membership" },
    { href: "/help", label: "Help" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/demo", label: "Demo Center" },
  ],
  legal: [
    { href: "/legal/privacy", label: "Privacy (draft)" },
    { href: "/legal/terms", label: "Terms (draft)" },
    { href: "/legal/cookies", label: "Cookies (draft)" },
    { href: "/legal/accessibility", label: "Accessibility (draft)" },
    { href: "/sitemap", label: "Sitemap" },
  ],
} as const;

/** Customer workspace only — no admin CRM. */
export const portalNav = [
  {
    group: "Your workspace",
    items: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/dashboard/favorites", label: "Saved opportunities" },
      { href: "/dashboard/saved-searches", label: "Saved searches" },
      { href: "/dashboard/notifications", label: "Notifications" },
    ],
  },
  {
    group: "Conversations & deals",
    items: [
      { href: "/dashboard/inquiries", label: "Inquiries" },
      { href: "/dashboard/messages", label: "Messages" },
      { href: "/dashboard/appointments", label: "Visits" },
      { href: "/dashboard/offers", label: "Offers" },
      { href: "/dashboard/applications", label: "Applications" },
      { href: "/dashboard/deals", label: "Deals" },
    ],
  },
  {
    group: "Your listings",
    items: [
      { href: "/dashboard/listings", label: "My listings" },
      { href: "/dashboard/listings/new", label: "Post an opportunity" },
      { href: "/dashboard/requirements", label: "My requirements" },
      { href: "/dashboard/agreements", label: "Agreements" },
      { href: "/dashboard/obligations", label: "Obligations" },
    ],
  },
  {
    group: "Account",
    items: [
      { href: "/dashboard/profile", label: "Profile & interests" },
      { href: "/dashboard/verification", label: "Verification" },
      { href: "/dashboard/security", label: "Security" },
      { href: "/dashboard/billing", label: "Membership (demo)" },
      { href: "/dashboard/support", label: "Support" },
      { href: "/dashboard/settings", label: "Settings" },
    ],
  },
] as const;

/** Prefer staffNavIconed from @/config/staff-nav for the admin shell. */
export const staffNav = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/listings", label: "Listings" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/organizations", label: "Organizations" },
  { href: "/admin/crm", label: "CRM" },
  { href: "/admin/verifications", label: "Verifications" },
  { href: "/admin/deals", label: "Deals" },
  { href: "/admin/contracts", label: "Contracts" },
  { href: "/admin/tasks", label: "Tasks" },
  { href: "/admin/support", label: "Support" },
  { href: "/admin/content", label: "Content" },
  { href: "/admin/masters", label: "Masters" },
  { href: "/admin/reports", label: "Reports" },
  { href: "/admin/audit", label: "Audit" },
  { href: "/admin/settings", label: "Settings" },
] as const;
