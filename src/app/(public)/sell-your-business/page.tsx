import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Filter } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";
import { tennesseeCities } from "@/config/tennessee-locations";
import { industries } from "@/config/industries";
import { Button } from "@/components/ui/button";
import { BackToHome } from "@/components/shared/back-to-home";
import { ListingCard } from "@/features/listings/components/listing-card";
import { listPublicListings } from "@/server/repositories/sqlite/listings";

export const metadata = buildPageMetadata({
  title: `Sell your business | ${siteConfig.name}`,
  description:
    "Learn how sellers publish fictional Tennessee sale listings, then browse live demo inventory with filters.",
  path: "/sell-your-business",
});

const steps = [
  {
    title: "Clarify what transfers",
    body: "Decide inventory treatment, property position, and which figures are disclosed on day one versus behind an NDA gate.",
  },
  {
    title: "Publish for review",
    body: "Submit a draft through the demonstration publication pipeline. Staff can request changes before the listing goes public.",
  },
  {
    title: "Respond to interest",
    body: "Practice inquiries, document requests, offers, and deal stages with fictional buyers in the sandbox.",
  },
] as const;

export default function SellYourBusinessPage() {
  const sample = listPublicListings({ kind: "sale", pageSize: 6, sort: "newest" });
  const spotlightCities = tennesseeCities.slice(0, 6);
  const spotlightIndustries = industries.slice(0, 8);

  return (
    <div>
      <section className="on-dark relative isolate overflow-hidden">
        <Image
          src="/images/listings/restaurant-1.webp"
          alt=""
          fill
          priority
          className="ken-burns object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(3,9,20,0.93)_0%,rgba(8,24,39,0.86)_48%,rgba(30,110,244,0.72)_100%)]" />
        <div className="relative mx-auto flex max-w-[80rem] flex-wrap items-end justify-between gap-6 px-4 py-16 sm:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] !text-[#5CB8FF]">
              Sell a business
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-google-sans)] text-4xl font-bold !text-white sm:text-5xl">
              Package a clear Tennessee sale opportunity
            </h1>
            <p className="mt-4 text-lg !text-white/85">
              Asking price, revenue context, inclusions and transition notes — then route buyer
              interest through a structured demo workspace.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="!text-white">
                <Link href="/login?next=/dashboard/listings/new">Start a sale listing</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 !text-white hover:bg-white/10"
              >
                <Link href="/businesses-for-sale">
                  <Filter className="mr-2 h-4 w-4" aria-hidden />
                  Browse sales with filters
                </Link>
              </Button>
              <BackToHome className="!border-white/30 !bg-white/10 !text-white hover:!bg-white/20" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[80rem] px-4 py-14">
        <div className="grid gap-8 lg:grid-cols-[17.5rem_minmax(0,1fr)] xl:grid-cols-[18rem_minmax(0,1fr)]">
          <aside className="space-y-5 lg:sticky lg:top-[calc(var(--demo-banner-h,2.5rem)+4.5rem)] lg:self-start">
            <div className="rounded-[1.25rem] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-5 shadow-[0_18px_40px_-32px_rgba(8,24,39,0.35)]">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--text-heading)]">
                <Filter className="h-3.5 w-3.5 text-[var(--brand-blue-accessible-light)]" aria-hidden />
                Filter marketplace
              </p>
              <p className="mt-2 text-sm text-[var(--text-body)]">
                Jump into the sales catalogue with region, city, industry and amount filters open.
              </p>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-body)]">
                    By city
                  </p>
                  <ul className="space-y-1">
                    {spotlightCities.map((city) => (
                      <li key={city.slug}>
                        <Link
                          href={`/businesses-for-sale?city=${city.slug}`}
                          className="flex items-center justify-between rounded-xl px-2.5 py-2 text-sm font-semibold text-[var(--text-heading)] transition hover:bg-[var(--surface-subtle)] hover:text-[var(--brand-blue-accessible-light)]"
                        >
                          {city.name}
                          <ArrowRight className="h-3.5 w-3.5 opacity-40" aria-hidden />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-[var(--border-subtle)] pt-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-body)]">
                    By industry
                  </p>
                  <ul className="flex flex-wrap gap-1.5">
                    {spotlightIndustries.map((industry) => (
                      <li key={industry.slug}>
                        <Link
                          href={`/businesses-for-sale?industry=${industry.slug}`}
                          className="inline-flex rounded-full border border-[var(--border-subtle)] bg-[var(--surface-page)] px-2.5 py-1 text-xs font-semibold text-[var(--text-heading)] hover:border-[var(--brand-blue-accessible-light)] hover:text-[var(--brand-blue-accessible-light)]"
                        >
                          {industry.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-[var(--border-subtle)] pt-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-body)]">
                    Amount bands
                  </p>
                  <ul className="space-y-1.5">
                    {[
                      { label: "Under $150k", href: "/businesses-for-sale?maxAmount=150000&disclosedOnly=1" },
                      {
                        label: "$150k–$400k",
                        href: "/businesses-for-sale?minAmount=150000&maxAmount=400000&disclosedOnly=1",
                      },
                      {
                        label: "$400k–$800k",
                        href: "/businesses-for-sale?minAmount=400000&maxAmount=800000&disclosedOnly=1",
                      },
                      {
                        label: "$800k+",
                        href: "/businesses-for-sale?minAmount=800000&disclosedOnly=1",
                      },
                    ].map((band) => (
                      <li key={band.label}>
                        <Link
                          href={band.href}
                          className="block rounded-xl px-2.5 py-2 text-sm font-semibold text-[var(--brand-blue-accessible-light)] hover:bg-[var(--surface-subtle)]"
                        >
                          {band.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button asChild className="w-full !text-white">
                  <Link href="/businesses-for-sale">Open full filter sidebar</Link>
                </Button>
              </div>
            </div>
          </aside>

          <div className="min-w-0 space-y-10">
            <section>
              <h2 className="font-[family-name:var(--font-google-sans)] text-2xl font-semibold text-[var(--text-heading)]">
                How selling works
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {steps.map((item, index) => (
                  <div
                    key={item.title}
                    className="rise-in rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-5"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-blue-accessible-light)]">
                      Step {index + 1}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold text-[var(--text-heading)]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--text-body)]">{item.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="font-[family-name:var(--font-google-sans)] text-2xl font-semibold text-[var(--text-heading)]">
                    Example sale inventory
                  </h2>
                  <p className="mt-1 text-sm text-[var(--text-body)]">
                    Fictional listings — use the sidebar to filter the full catalogue.
                  </p>
                </div>
                <Button asChild variant="outline">
                  <Link href="/businesses-for-sale">
                    View all with filters <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <ul className="stagger-children mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {sample.items.map((listing) => (
                  <li key={listing.id} className="hover-lift">
                    <ListingCard listing={listing} />
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-[1.25rem] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-[var(--text-heading)]">
                What belongs on a sale listing
              </h2>
              <ul className="mt-4 space-y-3">
                {[
                  "Public title, city, industry, and a concise summary buyers can scan.",
                  "Asking, revenue, and earnings disclosures when appropriate for the demo story.",
                  "Conditions, transition training, inclusions, and exclusions that do not contradict.",
                  "An assigned fictional broker when you want inquiry routing in adviser dashboards.",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-[var(--text-body)]">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-blue-accessible-light)]"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className="!text-white">
                  <Link href="/how-it-works/sellers">Seller walkthrough</Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link href="/resources/preparing-a-listing">Listing prep guide</Link>
                </Button>
                <BackToHome />
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
