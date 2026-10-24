import Link from "next/link";
import Image from "next/image";
import {
  BadgeCheck,
  BriefcaseBusiness,
  ContactRound,
  LifeBuoy,
  ListTodo,
  Store,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DashboardPageHeader,
  Panel,
  QuickLink,
  StatCard,
} from "@/components/dashboard/ui";
import { StatusBadge } from "@/components/shared/status-badge";
import { demoPersonas } from "@/config/roles";
import { brokerFixtures } from "@/server/db/seeds/broker-fixtures";
import { listingFixtures } from "@/server/db/seeds/listing-fixtures";
import { kindLabels } from "@/features/listings/lib/kind-labels";
import { getOrCreateWorkspace } from "@/server/demo/workspace";
import { listModerationQueue } from "@/server/repositories/memory/listing-drafts";

const queues = [
  {
    href: "/admin/listings",
    label: "Listing moderation",
    detail: "Approve or request changes on submitted drafts",
    icon: Store,
  },
  {
    href: "/admin/verifications",
    label: "Verifications",
    detail: "Review fictional identity evidence",
    icon: BadgeCheck,
  },
  {
    href: "/admin/crm",
    label: "CRM pipeline",
    detail: "Assign advisers and follow up inquiries",
    icon: ContactRound,
  },
  {
    href: "/admin/support",
    label: "Support desk",
    detail: "Reply to customer tickets",
    icon: LifeBuoy,
  },
  {
    href: "/admin/tasks",
    label: "Staff tasks",
    detail: "Internal follow-ups and escalations",
    icon: ListTodo,
  },
  {
    href: "/admin/deals",
    label: "Deals register",
    detail: "Monitor negotiation workspaces",
    icon: BriefcaseBusiness,
  },
];

export default async function AdminHomePage() {
  const { workspaceId } = await getOrCreateWorkspace();
  const moderationQueue = listModerationQueue(workspaceId);
  const activeListings = listingFixtures.filter((l) => l.status === "active").length;
  const underNegotiation = listingFixtures.filter(
    (l) => l.status === "under-negotiation",
  ).length;
  const recentListings = listingFixtures
    .filter((l) => l.status === "active" || l.status === "under-negotiation")
    .slice(0, 6);

  return (
    <div className="mx-auto w-full max-w-[90rem] space-y-8">
      <DashboardPageHeader
        eyebrow="Admin console"
        title="Staff operations overview"
        description="Moderate listings, advise customers, and track demo queues — fictional sandbox only."
        actions={
          <>
            <Button asChild className="!text-white">
              <Link href="/admin/listings">Moderation queue</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/users">Manage users</Link>
            </Button>
          </>
        }
      />

      <section className="on-dark relative overflow-hidden rounded-[var(--radius-dialog)]">
        <Image
          src="/images/listings/office-1.webp"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(3,9,20,0.94),rgba(11,61,145,0.82))]" />
        <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] !text-[#5CB8FF]">
              Live demo queues
            </p>
            <h2 className="font-[family-name:var(--font-google-sans)] text-3xl font-bold !text-white">
              Keep marketplace quality high without blocking customer journeys
            </h2>
            <p className="max-w-xl !text-white/85">
              Workspace <span className="font-semibold">{workspaceId}</span> · moderation,
              CRM and support stay isolated to this presenter session.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              ["Queue", String(moderationQueue.length)],
              ["Active", String(activeListings)],
              ["Negotiating", String(underNegotiation)],
              ["Personas", String(demoPersonas.length)],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl bg-white/12 p-4 ring-1 ring-white/20"
              >
                <p className="text-xs !text-white/70">{label}</p>
                <p className="mt-1 font-[family-name:var(--font-google-sans)] text-2xl font-bold !text-white">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Moderation queue"
          value={moderationQueue.length}
          hint="Submitted drafts waiting"
          href="/admin/listings"
          tone="accent"
        />
        <StatCard
          label="Public listings"
          value={activeListings}
          hint="Active catalogue"
          href="/businesses-for-sale"
        />
        <StatCard
          label="Demo users"
          value={demoPersonas.length}
          hint="Seed personas"
          href="/admin/users"
        />
        <StatCard
          label="Brokers"
          value={brokerFixtures.length}
          hint="Directory profiles"
          href="/admin/organizations"
          tone="warning"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Panel title="Priority queues" description="Jump into the work that needs a staff decision.">
          <div className="grid gap-3 sm:grid-cols-2">
            {queues.map((q) => (
              <QuickLink
                key={q.href}
                href={q.href}
                icon={q.icon}
                label={q.label}
                description={q.detail}
              />
            ))}
          </div>
        </Panel>

        <Panel
          dark
          title="Staff shortcuts"
          description="Common console destinations."
        >
          <div className="space-y-2">
            <Link
              href="/admin/crm"
              className="inline-flex h-11 w-full items-center justify-center rounded-[var(--radius-control)] bg-[#1E6EF4] text-sm font-semibold !text-white"
            >
              Open CRM board
            </Link>
            <Link
              href="/admin/support"
              className="inline-flex h-11 w-full items-center justify-center rounded-[var(--radius-control)] border border-white/40 text-sm font-semibold !text-white hover:bg-white/10"
            >
              Support tickets
            </Link>
            <Link
              href="/admin/reports"
              className="inline-flex h-11 w-full items-center justify-center rounded-[var(--radius-control)] border border-white/40 text-sm font-semibold !text-white hover:bg-white/10"
            >
              View reports
            </Link>
            <Link
              href="/admin/audit"
              className="inline-flex h-11 w-full items-center justify-center rounded-[var(--radius-control)] border border-white/40 text-sm font-semibold !text-white hover:bg-white/10"
            >
              Audit trail
            </Link>
          </div>
        </Panel>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel
          title="Catalogue snapshot"
          description="Recent public opportunities from the seeded Tennessee inventory."
          action={
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/listings">Moderate</Link>
            </Button>
          }
        >
          <ul className="divide-y divide-[var(--border-subtle)]">
            {recentListings.map((listing) => (
              <li key={listing.id} className="flex items-start justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-[var(--text-heading)]">
                    {listing.title}
                  </p>
                  <p className="mt-0.5 text-sm text-[var(--text-body)]">
                    {kindLabels[listing.kind]} · {listing.citySlug}
                  </p>
                </div>
                <StatusBadge
                  label={listing.status}
                  tone={listing.status === "active" ? "success" : "warning"}
                />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel
          title="Demo accounts"
          description="Persona switcher identities used in presentations."
          action={
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/users">
                <Users className="mr-1.5 h-3.5 w-3.5" aria-hidden />
                All users
              </Link>
            </Button>
          }
        >
          <ul className="space-y-2">
            {demoPersonas.map((persona) => (
              <li
                key={persona.key}
                className="flex items-center justify-between gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-page)] px-3 py-2.5"
              >
                <div className="min-w-0">
                  <p className="truncate font-semibold text-[var(--text-heading)]">
                    {persona.label}
                  </p>
                  <p className="truncate text-xs text-[var(--text-body)]">{persona.email}</p>
                </div>
                <StatusBadge label={persona.roles[0] ?? "customer"} tone="info" />
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
