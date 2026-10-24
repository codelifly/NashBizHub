import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Filter } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";
import { tennesseeCities } from "@/config/tennessee-locations";
import { Button } from "@/components/ui/button";
import { BackToHome } from "@/components/shared/back-to-home";
import { ListingCard } from "@/features/listings/components/listing-card";
import { listPublicListings } from "@/server/repositories/sqlite/listings";

export const metadata = buildPageMetadata({
  title: `Rent out your business | ${siteConfig.name}`,
  description:
    "Publish fictional operating rental packages with rent, term, security, and handback expectations.",
  path: "/rent-out-your-business",
});

export default function RentOutYourBusinessPage() {
  const sample = listPublicListings({
    kind: "business-rental",
    pageSize: 6,
    sort: "newest",
  });

  return (
    <div>
      <section className="on-dark relative isolate overflow-hidden">
        <Image
          src="/images/listings/laundry-1.webp"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(3,9,20,0.93),rgba(30,110,244,0.7))]" />
        <div className="relative mx-auto max-w-[80rem] px-4 py-16 sm:py-22">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] !text-[#5CB8FF]">
            Operating rentals
          </p>
          <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-google-sans)] text-4xl font-bold !text-white sm:text-5xl">
            Rent out your business
          </h1>
          <p className="mt-4 max-w-2xl text-lg !text-white/85">
            Operators run a packaged business for a defined term. Publish rent, security,
            responsibilities and included assets — then filter live demo rentals by city and amount.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="!text-white">
              <Link href="/login?next=/dashboard/listings/new">Post an operating rental</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 !text-white hover:bg-white/10"
            >
              <Link href="/businesses-for-rent">
                <Filter className="mr-2 h-4 w-4" aria-hidden />
                Browse with filters
              </Link>
            </Button>
            <BackToHome className="!border-white/30 !bg-white/10 !text-white hover:!bg-white/20" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[80rem] px-4 py-14">
        <div className="grid gap-8 lg:grid-cols-[17.5rem_minmax(0,1fr)]">
          <aside className="rounded-[1.25rem] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-5 lg:sticky lg:top-[calc(var(--demo-banner-h,2.5rem)+4.5rem)] lg:self-start">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--text-heading)]">
              Filter rentals
            </p>
            <ul className="mt-4 space-y-1">
              {tennesseeCities.slice(0, 8).map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/businesses-for-rent?city=${city.slug}`}
                    className="flex items-center justify-between rounded-xl px-2.5 py-2 text-sm font-semibold hover:bg-[var(--surface-subtle)] hover:text-[var(--brand-blue-accessible-light)]"
                  >
                    {city.name}
                    <ArrowRight className="h-3.5 w-3.5 opacity-40" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-1.5 border-t border-[var(--border-subtle)] pt-4">
              {[
                { label: "Under $3k/mo", href: "/businesses-for-rent?maxAmount=3000&disclosedOnly=1" },
                {
                  label: "$3k–$6k/mo",
                  href: "/businesses-for-rent?minAmount=3000&maxAmount=6000&disclosedOnly=1",
                },
                { label: "$6k+/mo", href: "/businesses-for-rent?minAmount=6000&disclosedOnly=1" },
              ].map((band) => (
                <Link
                  key={band.label}
                  href={band.href}
                  className="block rounded-xl px-2.5 py-2 text-sm font-semibold text-[var(--brand-blue-accessible-light)] hover:bg-[var(--surface-subtle)]"
                >
                  {band.label}
                </Link>
              ))}
            </div>
            <Button asChild className="mt-4 w-full !text-white">
              <Link href="/businesses-for-rent">Open filter sidebar</Link>
            </Button>
          </aside>

          <div>
            <h2 className="text-2xl font-semibold text-[var(--text-heading)]">
              Example operating rentals
            </h2>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {sample.items.map((listing) => (
                <li key={listing.id} className="hover-lift">
                  <ListingCard listing={listing} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
