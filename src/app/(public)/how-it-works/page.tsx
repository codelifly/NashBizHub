import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { Button } from "@/components/ui/button";

export const metadata = buildPageMetadata({
  title: "How it works",
  description:
    "Overview of the NashBizHub demonstration marketplace for buyers, sellers, operators, contractors, and brokers.",
  path: "/how-it-works",
});

const audiences = [
  { slug: "buyers", label: "Buyers", blurb: "Search, compare, inquire, and practice diligence." },
  { slug: "sellers", label: "Sellers", blurb: "Publish sale listings and respond to interest." },
  { slug: "operators", label: "Operators", blurb: "Evaluate rentals, leases, and management roles." },
  { slug: "contractors", label: "Contractors", blurb: "Respond to service tenders with proposals." },
  { slug: "brokers", label: "Brokers", blurb: "Manage assigned inventory and demo client threads." },
] as const;

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-[80rem] space-y-10 px-4 py-10">
      <header className="max-w-3xl space-y-4">
        <h1>How it works</h1>
        <p className="text-lg text-[var(--text-body)]">
          NashBizHub is an interactive demonstration of a Tennessee business opportunity
          marketplace. Browse public fictional inventory, then sign in to continue workflows in a
          private workspace.
        </p>
      </header>

      <ol className="grid gap-6 md:grid-cols-3">
        {[
          "Discover listings by kind, city, and industry.",
          "Shortlist opportunities and open a listing detail.",
          "Log in to inquire, message, and advance demo deals.",
        ].map((step, index) => (
          <li
            key={step}
            className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-5"
          >
            <p className="text-sm font-semibold text-[var(--brand-blue-accessible-light)]">
              Step {index + 1}
            </p>
            <p className="mt-2 text-[var(--text-heading)]">{step}</p>
          </li>
        ))}
      </ol>

      <section className="space-y-4">
        <h2>Choose your path</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((audience) => (
            <li key={audience.slug}>
              <Link
                href={`/how-it-works/${audience.slug}`}
                className="block h-full rounded-[var(--radius-control)] border border-[var(--border-subtle)] p-5 hover:border-[var(--brand-blue-accessible-light)]"
              >
                <h3 className="text-lg">{audience.label}</h3>
                <p className="mt-2 text-sm text-[var(--text-body)]">{audience.blurb}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Button asChild>
        <Link href="/businesses-for-sale">Start browsing</Link>
      </Button>
    </div>
  );
}
