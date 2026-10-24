import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Store } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { BackToHome } from "@/components/shared/back-to-home";
import { ListingCard } from "@/features/listings/components/listing-card";
import { OperateSubnav } from "@/features/operate/components/operate-subnav";
import { listPublicListings } from "@/server/repositories/sqlite/listings";
import {
  operateCitySpotlights,
  operateCompareRows,
  operatePathCards,
  operateStats,
} from "@/config/operate-and-manage";

export const metadata = buildPageMetadata({
  title: `Operate & Manage | ${siteConfig.name}`,
  description:
    "Appoint a manager for your Tennessee business — or operate for an owner under a management contract, operating rental, or premises lease.",
  path: "/operate-and-manage",
});

export default function OperateAndManagePage() {
  const management = listPublicListings({
    kind: "management-contract",
    pageSize: 3,
    sort: "newest",
  });
  const rentals = listPublicListings({
    kind: "business-rental",
    pageSize: 3,
    sort: "newest",
  });
  const premises = listPublicListings({
    kind: "premises-lease",
    pageSize: 3,
    sort: "newest",
  });

  return (
    <div>
      <OperateSubnav />

      <section className="on-dark relative isolate overflow-hidden">
        <Image
          src="/images/listings/motel-1.webp"
          alt=""
          fill
          priority
          className="ken-burns object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(3,9,20,0.94)_0%,rgba(8,24,39,0.88)_46%,rgba(30,110,244,0.7)_100%)]" />
        <div className="relative mx-auto w-full max-w-[80rem] px-4 py-16 sm:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] !text-[#5CB8FF]">
            Operate & Manage
          </p>
          <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-google-sans)] text-4xl font-bold !text-white sm:text-5xl">
            Keep ownership. Share operations.
          </h1>
          <p className="mt-4 max-w-2xl text-lg !text-white/85">
            Hire an operator, step into a management appointment, rent a packaged
            business, or lease premises — each path uses real demo listings and
            Tennessee city imagery.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="!text-white">
              <Link href="/operate-and-manage/become-an-operator">
                Become an operator
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 !text-white hover:bg-white/10"
            >
              <Link href="/operate-and-manage/hire-an-operator">
                Hire an operator
              </Link>
            </Button>
            <BackToHome className="!border-white/30 !bg-white/10 !text-white hover:!bg-white/20" />
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border-subtle)] bg-[var(--surface-card)]">
        <div className="mx-auto grid w-full max-w-[80rem] gap-0 px-4 sm:grid-cols-2 lg:grid-cols-4">
          {operateStats.map((stat) => (
            <div
              key={stat.label}
              className="border-[var(--border-subtle)] px-4 py-6 sm:border-r sm:last:border-r-0"
            >
              <p className="font-[family-name:var(--font-google-sans)] text-3xl font-bold text-[var(--brand-blue-accessible-light)]">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-semibold text-[var(--text-heading)]">
                {stat.label}
              </p>
              <p className="mt-0.5 text-xs text-[var(--text-body)]">{stat.hint}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[80rem] px-4 py-14 sm:py-16">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--brand-blue-accessible-light)]">
            Choose your path
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-google-sans)]">
            Four ways to operate — without buying
          </h2>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {operatePathCards.map((path) => (
            <article
              key={path.slug}
              className="group overflow-hidden rounded-[1.25rem] border border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-[0_18px_40px_-32px_rgba(8,24,39,0.35)]"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={path.image}
                  alt=""
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081827]/75 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-[var(--action-fill)] px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] !text-white">
                  {path.eyebrow}
                </span>
              </div>
              <div className="space-y-3 p-5">
                <h3 className="font-[family-name:var(--font-google-sans)] text-xl font-semibold text-[var(--text-heading)]">
                  {path.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--text-body)]">
                  {path.body}
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <Button asChild size="sm" className="!text-white">
                    <Link href={path.href}>{path.cta}</Link>
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <Link href={path.browseHref}>{path.browseLabel}</Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--border-subtle)] bg-[var(--surface-subtle)]">
        <div className="mx-auto w-full max-w-[80rem] px-4 py-14">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--brand-blue-accessible-light)]">
              Path comparison
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-google-sans)]">
              Rent is not lease. Management is not a sale.
            </h2>
          </div>
          <div className="mt-8 overflow-x-auto rounded-[1.15rem] border border-[var(--border-subtle)] bg-[var(--surface-card)]">
            <table className="min-w-[48rem] w-full text-left text-sm">
              <thead className="bg-[var(--surface-subtle)]">
                <tr className="border-b border-[var(--border-subtle)]">
                  <th className="px-4 py-3 font-semibold text-[var(--text-heading)]">
                    Topic
                  </th>
                  <th className="px-4 py-3 font-semibold text-[var(--text-heading)]">
                    Hire
                  </th>
                  <th className="px-4 py-3 font-semibold text-[var(--text-heading)]">
                    Become
                  </th>
                  <th className="px-4 py-3 font-semibold text-[var(--text-heading)]">
                    Rent
                  </th>
                  <th className="px-4 py-3 font-semibold text-[var(--text-heading)]">
                    Lease
                  </th>
                </tr>
              </thead>
              <tbody>
                {operateCompareRows.map((row) => (
                  <tr
                    key={row.topic}
                    className="border-b border-[var(--border-subtle)] last:border-b-0"
                  >
                    <td className="px-4 py-3 font-semibold text-[var(--text-heading)]">
                      {row.topic}
                    </td>
                    <td className="px-4 py-3 text-[var(--text-body)]">{row.hire}</td>
                    <td className="px-4 py-3 text-[var(--text-body)]">{row.become}</td>
                    <td className="px-4 py-3 text-[var(--text-body)]">{row.rent}</td>
                    <td className="px-4 py-3 text-[var(--text-body)]">{row.lease}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[80rem] px-4 py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--brand-blue-accessible-light)]">
              Tennessee markets
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-google-sans)]">
              City spotlights
            </h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/tennessee">All cities</Link>
          </Button>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {operateCitySpotlights.map((city) => (
            <li key={city.slug}>
              <Link
                href={`/tennessee/${city.slug}`}
                className="group relative block overflow-hidden rounded-[1.15rem]"
              >
                <div className="relative aspect-[5/3]">
                  <Image
                    src={city.image}
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081827]/92 via-[#081827]/4 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] !text-[#5CB8FF]">
                    {city.focus}
                  </p>
                  <p className="mt-1 font-[family-name:var(--font-google-sans)] text-xl font-semibold !text-white">
                    {city.name}
                  </p>
                  <p className="mt-1 text-sm !text-white/80">{city.blurb}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-[var(--border-subtle)] bg-[var(--surface-subtle)]">
        <div className="mx-auto w-full max-w-[80rem] space-y-12 px-4 py-14">
          <ListingStrip
            eyebrow="Management"
            title="Open appointments"
            href="/management-contracts"
            items={management.items}
          />
          <ListingStrip
            eyebrow="Rent"
            title="Operating rentals"
            href="/businesses-for-rent"
            items={rentals.items}
          />
          <ListingStrip
            eyebrow="Lease"
            title="Commercial premises"
            href="/commercial-properties-for-lease"
            items={premises.items}
          />

          <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.25rem] border border-[var(--border-subtle)] bg-[var(--surface-card)] px-5 py-5 sm:px-6">
            <div className="flex items-start gap-3">
              <Store className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-blue-accessible-light)]" />
              <div>
                <p className="font-semibold text-[var(--text-heading)]">
                  Looking to buy instead?
                </p>
                <p className="mt-1 text-sm text-[var(--text-body)]">
                  Ownership opportunities stay under Buy a Business — separate from
                  operate, rent and lease paths.
                </p>
              </div>
            </div>
            <Button asChild className="!text-white">
              <Link href="/businesses-for-sale">Browse businesses for sale</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ListingStrip({
  eyebrow,
  title,
  href,
  items,
}: {
  eyebrow: string;
  title: string;
  href: string;
  items: ReturnType<typeof listPublicListings>["items"];
}) {
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--brand-blue-accessible-light)]">
            {eyebrow}
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-google-sans)]">{title}</h2>
        </div>
        <Button asChild variant="outline">
          <Link href={href}>
            View all
            <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
          </Link>
        </Button>
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}
