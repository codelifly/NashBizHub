import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { Button } from "@/components/ui/button";

export const metadata = buildPageMetadata({
  title: "Membership",
  description:
    "Overview of NashBizHub demonstration membership tiers for browsing and publishing fictional opportunities.",
  path: "/membership",
});

const tiers = [
  {
    name: "Browse",
    body: "Public discovery across Tennessee listings, city hubs, industries, brokers, and resources. No account required.",
    cta: { href: "/businesses-for-sale", label: "Start browsing" },
  },
  {
    name: "Member workspace",
    body: "Sign in to inquire, favorite listings, save searches, message counterparts, and advance demo deals.",
    cta: { href: "/login", label: "Log in" },
  },
  {
    name: "Publisher",
    body: "Create sale, rental, premises, management, or tender listings and submit them through the demo publication pipeline.",
    cta: { href: "/dashboard/listings/new", label: "Post an opportunity" },
  },
] as const;

export default function MembershipPage() {
  return (
    <div className="mx-auto max-w-[80rem] space-y-8 px-4 py-10">
      <header className="max-w-3xl space-y-3">
        <h1>Membership</h1>
        <p className="text-lg text-[var(--text-body)]">
          Membership in this environment is a demonstration concept. Billing adapters are demo-only
          and do not charge real payment methods.
        </p>
      </header>
      <ul className="grid gap-4 md:grid-cols-3">
        {tiers.map((tier) => (
          <li
            key={tier.name}
            className="flex h-full flex-col rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6"
          >
            <h2 className="text-xl">{tier.name}</h2>
            <p className="mt-3 flex-1 text-sm text-[var(--text-body)]">{tier.body}</p>
            <Button asChild className="mt-6">
              <Link href={tier.cta.href}>{tier.cta.label}</Link>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
