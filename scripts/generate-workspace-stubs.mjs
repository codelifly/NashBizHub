import fs from "node:fs";
import path from "node:path";

const root = path.resolve("src/app");

function write(rel, contents) {
  const full = path.join(root, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, contents, "utf8");
  console.log("wrote", rel);
}

function portalPage({ title, purpose, emptyTitle, emptyDescription, actionHref, actionLabel, extraImport = "", extraBody = "" }) {
  return `import { WorkspacePage } from "@/components/layout/workspace-page";
${extraImport}
export default function Page() {
  return (
    <WorkspacePage
      title=${JSON.stringify(title)}
      purpose=${JSON.stringify(purpose)}
      emptyTitle=${JSON.stringify(emptyTitle)}
      emptyDescription=${JSON.stringify(emptyDescription)}
      actionHref=${JSON.stringify(actionHref)}
      actionLabel=${JSON.stringify(actionLabel)}
    >
      ${extraBody}
    </WorkspacePage>
  );
}
`;
}

function portalDynamic(param, { titleExpr, purpose, emptyTitle, emptyDescription, actionHref, actionLabel }) {
  return `import { WorkspacePage } from "@/components/layout/workspace-page";

export default async function Page({
  params,
}: {
  params: Promise<{ ${param}: string }>;
}) {
  const { ${param} } = await params;
  return (
    <WorkspacePage
      title={${titleExpr}}
      purpose=${JSON.stringify(purpose)}
      emptyTitle=${JSON.stringify(emptyTitle)}
      emptyDescription=${JSON.stringify(emptyDescription)}
      actionHref=${JSON.stringify(actionHref)}
      actionLabel=${JSON.stringify(actionLabel)}
    />
  );
}
`;
}

write(
  "(portal)/dashboard/layout.tsx",
  `import { PortalShell } from "@/components/layout/portal-shell";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <PortalShell>{children}</PortalShell>;
}
`,
);

write(
  "(portal)/dashboard/page.tsx",
  `import Link from "next/link";
import { Button } from "@/components/ui/button";

const nextActions = [
  {
    role: "Buyer",
    title: "Browse opportunities",
    description: "Shortlist Tennessee businesses and save searches.",
    href: "/businesses-for-sale",
    label: "Explore for sale",
  },
  {
    role: "Owner / Broker",
    title: "Publish a listing",
    description: "Start the listing wizard with demo commercial fields.",
    href: "/dashboard/listings/new",
    label: "New listing",
  },
  {
    role: "Operator",
    title: "Review inquiries",
    description: "Respond to fictional buyer questions in the inbox.",
    href: "/dashboard/inquiries",
    label: "Open inquiries",
  },
  {
    role: "All roles",
    title: "Complete verification",
    description: "Walk through the simulated identity checks.",
    href: "/dashboard/verification",
    label: "Start verification",
  },
  {
    role: "Deal parties",
    title: "Continue a deal",
    description: "Open document rooms and obligations for demo deals.",
    href: "/dashboard/deals",
    label: "View deals",
  },
  {
    role: "Support",
    title: "Get help",
    description: "Raise a simulated support ticket or browse FAQ.",
    href: "/dashboard/support",
    label: "Support center",
  },
];

export default function DashboardHomePage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="font-[family-name:var(--font-google-sans)] text-3xl font-bold text-[var(--text-heading)]">
          Dashboard
        </h1>
        <p className="max-w-2xl text-[var(--text-body)]">
          Role-adaptive next actions for the NashBizHub demo. Cards link to real workspace routes;
          inventory and transactions remain fictional.
        </p>
        <p className="text-sm text-[var(--color-warning)]" role="note">
          Demo simulation — no live payments or production data.
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {nextActions.map((card) => (
          <article
            key={card.title}
            className="flex flex-col rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-body)]/70">
              {card.role}
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-google-sans)] text-xl font-semibold text-[var(--text-heading)]">
              {card.title}
            </h2>
            <p className="mt-2 flex-1 text-sm text-[var(--text-body)]">{card.description}</p>
            <Button asChild className="mt-4 self-start">
              <Link href={card.href}>{card.label}</Link>
            </Button>
          </article>
        ))}
      </div>
    </div>
  );
}
`,
);

const portalStubs = [
  ["profile", "Profile", "Manage your display name, contact details, and marketplace persona.", "Profile incomplete", "Add your preferred contact details to personalize inquiries.", "/dashboard/settings", "Open settings"],
  ["organization", "Organization", "View the organization attached to your demo workspace.", "No organization linked", "Join or create an organization when invites are seeded.", "/dashboard/team", "View team"],
  ["team", "Team", "Invite colleagues and assign marketplace roles within your organization.", "No teammates yet", "Send a simulated invitation once seeding is available.", "/dashboard/organization", "Organization"],
  ["security", "Security", "Review sessions, password, and sign-in protections for this demo account.", "Security checklist", "Rotate your demo password after shared walkthroughs.", "/forgot-password", "Reset password"],
  ["verification", "Verification", "Complete simulated identity and business verification steps.", "Verification not started", "Kick off the demo verification adapter flow.", "/dashboard/profile", "Update profile first"],
  ["favorites", "Favorites", "Saved opportunities across sale, rental, premises, management, and tenders.", "No favorites yet", "Heart listings from public search results to collect them here.", "/businesses-for-sale", "Browse listings"],
  ["saved-searches", "Saved searches", "Replay filter sets for Tennessee cities and industries.", "No saved searches", "Create a search on the public marketplace, then save it.", "/tennessee", "Explore Tennessee"],
  ["requirements", "Buyer requirements", "Publish what you are looking for so owners and brokers can respond.", "No requirements posted", "Describe your target industry, budget, and geography.", "/requirements", "View public board"],
  ["listings", "My listings", "Draft, submit, and monitor opportunities you control.", "No listings yet", "Create a fictional listing with the demo wizard.", "/dashboard/listings/new", "Create listing"],
  ["listings/new", "New listing", "Wizard shell for composing a demo marketplace opportunity.", "Ready to draft", "Capture kind, commercial terms, and disclosure flags.", "/dashboard/listings", "Back to listings"],
  ["inquiries", "Inquiries", "Inbound and outbound questions about listings.", "Inbox empty", "Start from a public listing detail page.", "/businesses-for-sale", "Find a listing"],
  ["messages", "Messages", "Threaded conversations tied to inquiries and deals.", "No threads", "Open an inquiry to begin a simulated message thread.", "/dashboard/inquiries", "Go to inquiries"],
  ["applications", "Applications", "Rental and operator applications in progress.", "No applications", "Apply from a business-for-rent listing to seed this list.", "/businesses-for-rent", "Browse rentals"],
  ["appointments", "Appointments", "Site visits and video diligence calls (demo scheduling).", "No appointments scheduled", "Propose a visit from an active inquiry or deal.", "/dashboard/inquiries", "Open inquiries"],
  ["offers", "Offers", "Sale offers, rental proposals, and tender bids.", "No offers yet", "Submit a simulated offer from a deal or listing.", "/dashboard/deals", "View deals"],
  ["deals", "Deals", "Active transaction workspaces after an accepted offer.", "No deals open", "Accept a demo offer to materialize a deal room.", "/dashboard/offers", "Review offers"],
  ["agreements", "Agreements", "Executed and pending contracts for continuing operations.", "No agreements", "Deals that close will surface agreements here.", "/dashboard/deals", "Open deals"],
  ["obligations", "Obligations", "Post-close tasks, reporting, and payment schedules (demo only).", "Nothing due", "Obligations appear after agreements are signed in the sandbox.", "/dashboard/agreements", "Agreements"],
  ["billing", "Billing (demo)", "Membership and featured placement charges — simulated only. No real payments.", "No invoices", "Demo billing adapter records fictional charges only.", "/membership", "View membership"],
  ["notifications", "Notifications", "In-app alerts for inquiries, documents, and deadlines.", "All caught up", "Actions across the portal will feed this feed.", "/dashboard", "Back to dashboard"],
  ["support", "Support", "Raise tickets with the demo adviser desk.", "No open tickets", "Describe an issue to create a simulated support case.", "/help", "Browse help"],
  ["settings", "Settings", "Notification preferences, theme, and workspace defaults.", "Preferences ready", "Tune how the demo workspace behaves for your persona.", "/dashboard/profile", "Edit profile"],
];

for (const [seg, title, purpose, emptyTitle, emptyDescription, actionHref, actionLabel] of portalStubs) {
  write(
    `(portal)/dashboard/${seg}/page.tsx`,
    portalPage({ title, purpose, emptyTitle, emptyDescription, actionHref, actionLabel }),
  );
}

const portalDynamics = [
  ["listings/[id]", "id", "`Listing ${id}`", "Detail shell for an owned listing. Public code and status will load from fixtures later.", "Listing stub", "Connect this page to listing fixtures for full detail.", "/dashboard/listings", "All listings"],
  ["listings/[id]/edit", "id", "`Edit listing ${id}`", "Edit shell for commercial fields, disclosures, and media.", "Editor ready", "Save is simulated until the listing service is wired.", "/dashboard/listings", "Cancel"],
  ["inquiries/[id]", "id", "`Inquiry ${id}`", "Single inquiry thread with NDA and document request placeholders.", "Waiting for messages", "Reply flows are simulated in demo mode.", "/dashboard/inquiries", "All inquiries"],
  ["messages/[id]", "id", "`Conversation ${id}`", "Message thread linked to an inquiry or deal.", "No messages", "Send a demo reply once the messaging adapter is connected.", "/dashboard/messages", "All messages"],
  ["applications/[id]", "id", "`Application ${id}`", "Rental or operator application packet review.", "Packet incomplete", "Upload placeholders only — private storage is demo-local.", "/dashboard/applications", "All applications"],
  ["offers/[id]", "id", "`Offer ${id}`", "Offer terms, contingencies, and decision actions.", "Awaiting decision", "Accept/decline is simulated with no legal effect.", "/dashboard/offers", "All offers"],
  ["deals/[id]", "id", "`Deal ${id}`", "Deal workspace overview with milestones and parties.", "Deal shell", "Open the document room for diligence files.", "/dashboard/document-rooms/demo-deal", "Document room"],
  ["document-rooms/[dealId]", "dealId", "`Document room · ${dealId}`", "Controlled document sharing for a deal. Uploads stay in private demo storage.", "No documents granted", "Grant access from the deal overview when seeded.", "/dashboard/deals", "Back to deals"],
  ["agreements/[id]", "id", "`Agreement ${id}`", "Agreement detail with signing status from the demo signing adapter.", "Unsigned draft", "Signing is simulated — no real e-sign provider.", "/dashboard/agreements", "All agreements"],
  ["support/[id]", "id", "`Ticket ${id}`", "Support ticket conversation with the demo desk.", "No replies yet", "Staff can mirror this ticket in /admin/support.", "/dashboard/support", "All tickets"],
];

for (const [seg, param, titleExpr, purpose, emptyTitle, emptyDescription, actionHref, actionLabel] of portalDynamics) {
  write(
    `(portal)/dashboard/${seg}/page.tsx`,
    portalDynamic(param, { titleExpr, purpose, emptyTitle, emptyDescription, actionHref, actionLabel }),
  );
}

write(
  "(staff)/admin/layout.tsx",
  `import { StaffShell } from "@/components/layout/staff-shell";

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return <StaffShell>{children}</StaffShell>;
}
`,
);

write(
  "(staff)/admin/page.tsx",
  `import Link from "next/link";
import { Button } from "@/components/ui/button";

const queues = [
  { href: "/admin/listings", label: "Moderation queue", detail: "Review submitted listings" },
  { href: "/admin/verifications", label: "Verifications", detail: "Approve identity checks" },
  { href: "/admin/crm", label: "CRM pipeline", detail: "Advise demo opportunities" },
  { href: "/admin/support", label: "Support desk", detail: "Respond to tickets" },
  { href: "/admin/tasks", label: "Tasks", detail: "Internal follow-ups" },
  { href: "/admin/audit", label: "Audit log", detail: "Inspect demo actions" },
];

export default function AdminHomePage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="font-[family-name:var(--font-google-sans)] text-3xl font-bold text-[var(--text-heading)]">
          Staff overview
        </h1>
        <p className="max-w-2xl text-[var(--text-body)]">
          Administrator, moderator, and adviser workspace for the NashBizHub sandbox.
        </p>
        <p className="text-sm text-[var(--color-warning)]" role="note">
          Demo simulation — moderation and CRM actions do not affect a live market.
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {queues.map((q) => (
          <article
            key={q.href}
            className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-5"
          >
            <h2 className="font-[family-name:var(--font-google-sans)] text-lg font-semibold">{q.label}</h2>
            <p className="mt-1 text-sm text-[var(--text-body)]">{q.detail}</p>
            <Button asChild className="mt-4" variant="secondary">
              <Link href={q.href}>Open</Link>
            </Button>
          </article>
        ))}
      </div>
    </div>
  );
}
`,
);

const staffStubs = [
  ["users", "Users", "Search and inspect demo customer accounts.", "No user filter applied", "Seed personas appear after demo:seed.", "/admin/organizations", "Organizations"],
  ["organizations", "Organizations", "Company and brokerage shells attached to listings.", "No organizations listed", "Harbor Foods and Summit Partners load from fixtures.", "/admin/users", "Users"],
  ["listings", "Listings moderation", "Approve, request changes, or suspend marketplace inventory.", "Queue empty", "Submitted drafts will appear here after seeding.", "/admin/listings/NBH-S-1001", "Open sample"],
  ["verifications", "Verifications", "Review simulated identity and business verification cases.", "No cases pending", "Kick off checks from the portal verification page.", "/admin/users", "Find users"],
  ["crm", "CRM", "Pipeline of advised opportunities and follow-ups.", "Pipeline empty", "Create CRM records when working demo deals.", "/admin/tasks", "Tasks"],
  ["tasks", "Tasks", "Internal staff to-dos across moderation and advising.", "No open tasks", "Tasks can be spawned from CRM and support.", "/admin/crm", "CRM"],
  ["deals", "Deals (staff)", "Staff view of transaction workspaces.", "No deals", "Accepted offers create deal shells for advisers.", "/admin/contracts", "Contracts"],
  ["contracts", "Contracts", "Agreement oversight with demo signing status.", "No contracts", "Signing adapter marks documents simulated.", "/admin/deals", "Deals"],
  ["support", "Support desk", "Customer tickets routed to advisers.", "Inbox clear", "Portal support tickets mirror here.", "/admin/tasks", "Create task"],
  ["content", "Content", "Resource articles and marketing pages for the demo library.", "Library ready", "Six seed articles ship with content fixtures.", "/resources", "Public resources"],
  ["masters", "Masters", "Reference data: cities, industries, statuses.", "Masters loaded from config", "Edit code configs; admin UI is read-oriented in the shell.", "/admin/settings", "Settings"],
  ["reports", "Reports", "Aggregate demo metrics — fictional counts only.", "No live analytics", "Charts will bind to seeded activity later.", "/admin/audit", "Audit"],
  ["audit", "Audit log", "Immutable-style trail of demo administrative actions.", "Log empty until actions occur", "Persona switches and resets will appear here.", "/demo", "Demo Center"],
  ["settings", "Staff settings", "Console preferences and feature flags for the sandbox.", "Defaults applied", "DEMO_MODE gates dangerous endpoints.", "/admin", "Overview"],
];

for (const [seg, title, purpose, emptyTitle, emptyDescription, actionHref, actionLabel] of staffStubs) {
  write(
    `(staff)/admin/${seg}/page.tsx`,
    portalPage({ title, purpose, emptyTitle, emptyDescription, actionHref, actionLabel }),
  );
}

write(
  "(staff)/admin/listings/[id]/page.tsx",
  portalDynamic("id", {
    titleExpr: "`Moderate listing ${id}`",
    purpose: "Staff detail for a single listing — approve, request changes, or suspend (demo only).",
    emptyTitle: "Listing stub",
    emptyDescription: "Bind to listing fixtures for commercial review panels.",
    actionHref: "/admin/listings",
    actionLabel: "Back to queue",
  }),
);

write(
  "(staff)/admin/crm/[id]/page.tsx",
  portalDynamic("id", {
    titleExpr: "`CRM record ${id}`",
    purpose: "Opportunity advising notes, next steps, and linked parties.",
    emptyTitle: "Record stub",
    emptyDescription: "Attach notes when CRM seeding is available.",
    actionHref: "/admin/crm",
    actionLabel: "All CRM",
  }),
);

console.log("done");
