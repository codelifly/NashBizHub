import Link from "next/link";
import Image from "next/image";
import {
  Bookmark,
  Building2,
  CalendarDays,
  FileSignature,
  HandCoins,
  MessageSquare,
  PlusCircle,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DashboardPageHeader,
  Panel,
  QuickLink,
  StatCard,
} from "@/components/dashboard/ui";
import { getFeaturedListings } from "@/server/repositories/sqlite/listings";
import { ListingCard } from "@/features/listings/components/listing-card";

const journey = [
  {
    icon: Search,
    label: "Discover",
    description: "Filter Tennessee sales, rentals, premises and contracts.",
    href: "/businesses-for-sale",
  },
  {
    icon: Bookmark,
    label: "Shortlist",
    description: "Save favorites and compare up to four opportunities.",
    href: "/dashboard/favorites",
  },
  {
    icon: MessageSquare,
    label: "Inquire",
    description: "Message owners and track qualification requests.",
    href: "/dashboard/inquiries",
  },
  {
    icon: HandCoins,
    label: "Negotiate",
    description: "Submit offers or applications with version history.",
    href: "/dashboard/offers",
  },
  {
    icon: FileSignature,
    label: "Agree",
    description: "Review agreements, obligations and maintenance.",
    href: "/dashboard/agreements",
  },
];

export default function DashboardHomePage() {
  const featured = getFeaturedListings(3);

  return (
    <div className="mx-auto w-full max-w-[90rem] space-y-8">
      <DashboardPageHeader
        eyebrow="Customer panel"
        title="Your Tennessee workspace"
        description="One account for buying, selling, renting, managing or bidding — with clear next actions."
        actions={
          <>
            <Button asChild>
              <Link href="/dashboard/listings/new" className="gap-2">
                <PlusCircle className="h-4 w-4" aria-hidden />
                Post opportunity
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/businesses-for-sale">Browse market</Link>
            </Button>
          </>
        }
      />

      {/* Hero strip */}
      <section className="on-dark relative overflow-hidden rounded-[var(--radius-dialog)]">
        <Image
          src="/images/tennessee/nashville.webp"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(3,9,20,0.94)_0%,rgba(8,24,39,0.88)_45%,rgba(11,61,145,0.82)_100%)]" />
        <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
          <div className="space-y-4">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] !text-[#5CB8FF] ring-1 ring-white/20">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Guided customer journey
            </p>
            <h2 className="font-[family-name:var(--font-google-sans)] text-3xl font-bold !text-white sm:text-4xl">
              Progress from discovery to agreement in one panel
            </h2>
            <p className="max-w-xl !text-white/85" data-muted="true">
              Favorites, inquiries, visits, offers, applications and obligations stay attached to
              your customer identity — fictional demo data only.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/dashboard/inquiries"
                className="inline-flex h-11 items-center justify-center rounded-[var(--radius-control)] bg-[#1E6EF4] px-4 text-sm font-semibold !text-white hover:bg-[#1E6EF4]/90"
              >
                Open inquiries
              </Link>
              <Link
                href="/dashboard/appointments"
                className="inline-flex h-11 items-center justify-center rounded-[var(--radius-control)] border border-white/45 px-4 text-sm font-semibold !text-white hover:bg-white/10"
              >
                Upcoming visits
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              ["Saved", "Favorites & compares"],
              ["Inbox", "Inquiries & messages"],
              ["Pipeline", "Offers & deals"],
              ["Ops", "Agreements & rent"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="rounded-2xl bg-white/12 p-4 ring-1 ring-white/20 backdrop-blur"
              >
                <p className="text-sm font-semibold !text-white">{k}</p>
                <p className="mt-1 text-xs !text-white/75" data-muted="true">
                  {v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Marketplace" value="40+" hint="Fictional opportunities" href="/businesses-for-sale" tone="accent" />
        <StatCard label="Cities" value="10" hint="Tennessee hubs" href="/tennessee" />
        <StatCard label="Your shortlist" value="—" hint="Open saved items" href="/dashboard/favorites" />
        <StatCard label="Open threads" value="—" hint="Inquiries & offers" href="/dashboard/inquiries" tone="warning" />
      </div>

      {/* Journey + quick links */}
      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Panel
          title="Your journey"
          description="Follow the same path buyers and operators use in the proposal walkthrough."
        >
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {journey.map((step, index) => (
              <li key={step.label}>
                <Link
                  href={step.href}
                  className="flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-page)] p-4 transition hover:border-[var(--brand-blue-accessible-light)] hover:shadow-md"
                >
                  <span className="text-xs font-semibold text-[var(--brand-blue-accessible-light)]">
                    0{index + 1}
                  </span>
                  <step.icon className="mt-3 h-5 w-5 text-[var(--brand-blue-accessible-light)]" aria-hidden />
                  <span className="mt-2 font-semibold text-[var(--text-heading)]">{step.label}</span>
                  <span className="mt-1 text-xs leading-relaxed text-[var(--text-body)]">
                    {step.description}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </Panel>

        <Panel dark title="Need help deciding?" description="Start with the clearest action for your goal.">
          <div className="space-y-3">
            <Link
              href="/how-it-works/buyers"
              className="inline-flex h-11 w-full items-center justify-center rounded-[var(--radius-control)] bg-[#1E6EF4] text-sm font-semibold !text-white hover:bg-[#1E6EF4]/90"
            >
              Buyer guide
            </Link>
            <Link
              href="/how-it-works/sellers"
              className="inline-flex h-11 w-full items-center justify-center rounded-[var(--radius-control)] border border-white/40 text-sm font-semibold !text-white hover:bg-white/10"
            >
              Seller guide
            </Link>
            <Link
              href="/how-it-works/operators"
              className="inline-flex h-11 w-full items-center justify-center rounded-[var(--radius-control)] border border-white/40 text-sm font-semibold !text-white hover:bg-white/10"
            >
              Operator guide
            </Link>
            <Link
              href="/dashboard/support"
              className="inline-flex h-11 w-full items-center justify-center rounded-[var(--radius-control)] border border-white/40 text-sm font-semibold !text-white hover:bg-white/10"
            >
              Contact support
            </Link>
          </div>
        </Panel>
      </div>

      {/* Shortcuts */}
      <Panel title="Shortcuts" description="Jump into the most used customer tools.">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <QuickLink
            href="/dashboard/favorites"
            icon={Bookmark}
            label="Saved opportunities"
            description="Favorites that persist in your workspace"
          />
          <QuickLink
            href="/dashboard/appointments"
            icon={CalendarDays}
            label="Visits & calendar"
            description="Request, confirm and reschedule viewings"
          />
          <QuickLink
            href="/dashboard/offers"
            icon={HandCoins}
            label="Offers pipeline"
            description="Draft, counter and accept sale versions"
          />
          <QuickLink
            href="/dashboard/listings"
            icon={Building2}
            label="My listings"
            description="Drafts, submissions and live posts"
          />
          <QuickLink
            href="/dashboard/agreements"
            icon={FileSignature}
            label="Agreements"
            description="Active terms, rent reports, maintenance"
          />
          <QuickLink
            href="/dashboard/verification"
            icon={ShieldCheck}
            label="Verification"
            description="Demo badge and evidence status"
          />
        </div>
      </Panel>

      {/* Suggested inventory */}
      <Panel
        title="Suggested for you"
        description="Featured fictional listings from the Tennessee catalogue."
        action={
          <Button asChild variant="outline" size="sm">
            <Link href="/businesses-for-sale">View all</Link>
          </Button>
        }
      >
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {featured.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </Panel>
    </div>
  );
}
