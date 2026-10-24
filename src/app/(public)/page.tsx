import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Building2,
  Handshake,
  Search,
  Store,
  ClipboardList,
} from "lucide-react";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";
import { tennesseeCities } from "@/config/tennessee-locations";
import { industries } from "@/config/industries";
import { intentNav } from "@/config/navigation";

/** Home mosaic/tabs — service tenders stay under More / Contracts, not the main strip. */
const homeIntentNav = intentNav.filter(
  (item) => item.href !== "/service-contracts",
);
import { cityHeroImages, siteHeroImage } from "@/config/listing-images";
import { Button } from "@/components/ui/button";
import { FeaturedOpportunities } from "@/features/listings/components/featured-opportunities";
import { getFeaturedListings } from "@/server/repositories/sqlite/listings";
import { listArticles } from "@/server/repositories/sqlite/content";

export const metadata = buildPageMetadata({
  title: `Find your next business opportunity in Tennessee | ${siteConfig.name}`,
  description: siteConfig.description,
  path: "/",
});

const howSteps = [
  {
    icon: Search,
    title: "Discover the right type",
    body: "Choose sale, operating rental, premises, management or service tender — each with its own fields and next action.",
  },
  {
    icon: Handshake,
    title: "Inquire with context",
    body: "Save, compare and send a qualified inquiry. Return to the same listing after you sign in.",
  },
  {
    icon: ClipboardList,
    title: "Progress in one workspace",
    body: "Visits, offers, applications, documents and agreements stay attached to your customer account.",
  },
] as const;

export default function HomePage() {
  const featured = getFeaturedListings(9);
  const resources = listArticles().slice(0, 3);
  const spotlightCities = tennesseeCities.slice(0, 6);

  return (
    <div>
      {/* Full-bleed editorial hero */}
      <section className="on-dark relative isolate min-h-[min(92vh,52rem)] overflow-hidden">
        <Image
          src={siteHeroImage}
          alt=""
          fill
          priority
          className="ken-burns object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(3,9,20,0.92)_0%,rgba(8,24,39,0.82)_42%,rgba(11,61,145,0.72)_100%)]" />

        <div className="relative mx-auto flex min-h-[min(92vh,52rem)] max-w-[80rem] flex-col justify-end px-4 pb-14 pt-28 sm:pb-20 sm:pt-32">
          <p className="fade-in mb-4 font-[family-name:var(--font-google-sans)] text-sm font-semibold uppercase tracking-[0.22em] !text-[#5CB8FF]">
            {siteConfig.name}
          </p>
          <h1 className="rise-in max-w-3xl font-[family-name:var(--font-google-sans)] text-[clamp(2.35rem,1.4rem+3.5vw,4.25rem)] font-bold leading-[1.05] !text-white">
            Find your next business opportunity in Tennessee
          </h1>
          <p
            className="rise-in mt-5 max-w-xl text-lg leading-relaxed !text-white/90"
            data-muted="true"
            style={{ animationDelay: "80ms" }}
          >
            One customer account for buying, selling, renting, managing or bidding —
            with clear opportunity types and guided next steps.
          </p>

          <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Opportunity types">
            {homeIntentNav.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                role="tab"
                className="rounded-full border border-white/35 bg-white/12 px-4 py-2 text-sm font-semibold !text-white backdrop-blur transition hover:bg-[#1E6EF4] hover:!text-white"
              >
                {tab.label}
              </Link>
            ))}
          </div>

          <form
            action="/businesses-for-sale"
            method="get"
            className="hero-search mt-8 grid w-full max-w-3xl gap-2 rounded-[var(--radius-dialog)] bg-white p-2 shadow-2xl shadow-[#081827]/45 sm:grid-cols-[1.2fr_1fr_auto]"
          >
            <label className="sr-only" htmlFor="home-q">
              Search keywords
            </label>
            <input
              id="home-q"
              name="q"
              placeholder="Café, laundry, retail…"
              className="h-12 rounded-[var(--radius-control)] border-0 bg-[#F7F9FC] px-4 text-base font-medium text-[#3A3A3C] outline-none placeholder:text-[#3A3A3C]/55 focus:ring-2 focus:ring-[#1E6EF4]"
            />
            <label className="sr-only" htmlFor="home-city">
              City
            </label>
            <select
              id="home-city"
              name="city"
              defaultValue=""
              className="h-12 rounded-[var(--radius-control)] border-0 bg-[#F7F9FC] px-3 text-base font-medium text-[#3A3A3C] outline-none focus:ring-2 focus:ring-[#1E6EF4]"
            >
              <option value="">All Tennessee cities</option>
              {tennesseeCities.map((city) => (
                <option key={city.slug} value={city.slug}>
                  {city.name}
                </option>
              ))}
            </select>
            <Button
              type="submit"
              size="lg"
              className="h-12 w-full !bg-[#1E6EF4] !text-white sm:w-auto"
            >
              Search
            </Button>
          </form>
        </div>
      </section>

      {/* Opportunity type mosaic */}
      <section className="border-b border-[var(--border-subtle)] bg-[var(--surface-card)]">
        <div className="mx-auto grid max-w-[80rem] gap-0 md:grid-cols-5">
          {homeIntentNav.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative overflow-hidden border-[var(--border-subtle)] px-5 py-8 transition hover:bg-[var(--surface-subtle)] md:border-r md:last:border-r-0"
              style={{ animationDelay: `${index * 40}ms` }}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-blue-accessible-light)]">
                0{index + 1}
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-google-sans)] text-lg font-semibold text-[var(--text-heading)] group-hover:text-[var(--brand-blue-accessible-light)]">
                {item.label}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-body)]">{item.description}</p>
              <ArrowRight className="mt-4 h-4 w-4 text-[var(--brand-blue-accessible-light)] opacity-0 transition group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </section>

      <FeaturedOpportunities listings={featured} />

      {/* How it works */}
      <section className="on-dark bg-[var(--ink-on-bright-blue)] text-white">
        <div className="mx-auto max-w-[80rem] px-4 py-16 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#5CB8FF]">
              How NashBizHub works
            </p>
            <h2 className="mt-2 text-white">From discovery to a clear next step</h2>
            <p className="mt-3 text-white/80">
              The public site helps you compare. Your private workspace keeps inquiries, visits and
              agreements in one place.
            </p>
          </div>
          <ol className="stagger-children mt-12 grid gap-8 md:grid-cols-3">
            {howSteps.map((step, i) => (
              <li key={step.title} className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand-blue-accessible-light)] text-white">
                  <step.icon className="h-5 w-5" aria-hidden />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#5CB8FF]">
                  Step {i + 1}
                </p>
                <h3 className="mt-2 text-xl text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg" className="!text-white">
              <Link href="/how-it-works/buyers">Buyer walkthrough</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 !text-white hover:bg-white/10">
              <Link href="/how-it-works/sellers">Seller walkthrough</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="!text-white hover:bg-white/10">
              <Link href="/tours">Watch video tours</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Video spotlight */}
      <section className="border-b border-[var(--border-subtle)] bg-[var(--surface-card)]">
        <div className="mx-auto grid max-w-[80rem] gap-10 px-4 py-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--brand-blue-accessible-light)]">
              Watch & learn
            </p>
            <h2 className="mt-2">Product tours with Tennessee atmosphere</h2>
            <p className="mt-3 text-[var(--text-body)]">
              Short demo reels for buyers, sellers, operators and contracts — paired with stills from
              the fictional catalogue.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="!text-white">
                <Link href="/tours">Open video tours</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/glossary">Read the glossary</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/contracts">Contracts hub</Link>
              </Button>
            </div>
          </div>
          <div className="scale-in relative aspect-video overflow-hidden rounded-[1.25rem] bg-[#081827] shadow-xl ring-1 ring-[var(--border-subtle)]">
            <video
              className="h-full w-full object-cover"
              controls
              playsInline
              preload="metadata"
              poster="/images/listings/cafe-2.webp"
              aria-label="NashBizHub buyer journey demo video"
            >
              <source src="/videos/demo-tour.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="mx-auto max-w-[80rem] px-4 py-16 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--brand-blue-accessible-light)]">
              Explore Tennessee
            </p>
            <h2 className="mt-2">City hubs with real demo inventory</h2>
          </div>
          <Button asChild variant="link">
            <Link href="/tennessee">
              All cities <ArrowRight className="ml-1 inline h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {spotlightCities.map((city) => (
            <Link
              key={city.slug}
              href={`/tennessee/${city.slug}`}
              className="group relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)]"
            >
              <Image
                src={cityHeroImages[city.slug] ?? siteHeroImage}
                alt=""
                fill
                className="object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081827]/90 via-[#081827]/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-[family-name:var(--font-google-sans)] text-2xl font-bold !text-[#5CB8FF]">
                  {city.name}
                </h3>
                <p className="mt-1 text-sm font-medium !text-white/90">{city.region}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Industries strip */}
      <section className="border-y border-[var(--border-subtle)] bg-[var(--surface-subtle)]">
        <div className="mx-auto max-w-[80rem] px-4 py-14">
          <div className="flex items-center gap-3">
            <Store className="h-5 w-5 text-[var(--brand-blue-accessible-light)]" aria-hidden />
            <h2 className="text-2xl">Browse by industry</h2>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="rounded-full border border-[var(--border-subtle)] bg-[var(--surface-card)] px-4 py-2 text-sm font-medium text-[var(--text-heading)] transition hover:border-[var(--brand-blue-accessible-light)] hover:text-[var(--brand-blue-accessible-light)]"
              >
                {industry.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Broker + resources */}
      <section className="mx-auto grid max-w-[80rem] gap-10 px-4 py-16 lg:grid-cols-2 lg:py-20">
        <div className="overflow-hidden rounded-[var(--radius-dialog)] bg-[var(--surface-card)] ring-1 ring-[var(--border-subtle)]">
          <div className="relative h-48">
            <Image
              src="/images/listings/office-1.webp"
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-[#081827]/45" />
            <Building2 className="absolute bottom-4 left-4 h-8 w-8 text-white" aria-hidden />
          </div>
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl">Work with a broker</h2>
            <p className="mt-2 text-[var(--text-body)]">
              Browse fictional broker profiles and start a contact workflow when you need
              representation across multiple listings.
            </p>
            <Button asChild className="mt-6">
              <Link href="/brokers">Find a broker</Link>
            </Button>
          </div>
        </div>
        <div>
          <h2 className="text-2xl">Guides for Tennessee buyers & sellers</h2>
          <ul className="mt-6 space-y-4">
            {resources.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/resources/${article.slug}`}
                  className="group block rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-5 transition hover:border-[var(--brand-blue-accessible-light)]"
                >
                  <h3 className="text-lg group-hover:text-[var(--brand-blue-accessible-light)]">
                    {article.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-[var(--text-body)]">{article.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
          <Button asChild variant="link" className="mt-4 px-0">
            <Link href="/resources">
              All resources <ArrowRight className="ml-1 inline h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Seller CTA */}
      <section className="on-dark relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/listings/restaurant-1.webp"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,24,39,0.92),rgba(30,110,244,0.75))]" />
        </div>
        <div className="relative mx-auto flex max-w-[80rem] flex-col gap-6 px-4 py-20 text-white lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl text-white sm:text-4xl">Ready to list your Tennessee business?</h2>
            <p className="mt-3 text-white/85">
              Post a sale, operating rental, premises lease, management invitation or service tender
              with a guided wizard — fictional demo data only.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/sell-your-business">Sell your business</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10">
              <Link href="/signup">Create free account</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
