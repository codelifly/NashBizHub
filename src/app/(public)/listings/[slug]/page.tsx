import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ListingDetail } from "@/features/listings/components/listing-detail";
import { ListingCard } from "@/features/listings/components/listing-card";
import { Button } from "@/components/ui/button";
import { buildPageMetadata } from "@/lib/seo/metadata";
import {
  getListingBySlug,
  getRelatedListings,
} from "@/server/repositories/sqlite/listings";
import { getBrokerBySlug } from "@/server/repositories/sqlite/brokers";
import { kindRoutes } from "@/features/listings/lib/kind-labels";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = getListingBySlug(slug);
  if (!listing) {
    return buildPageMetadata({
      title: "Listing not found",
      description: "The requested listing could not be found.",
      path: `/listings/${slug}`,
      noIndex: true,
    });
  }
  return buildPageMetadata({
    title: `${listing.title} · ${listing.cityName}, TN`,
    description: listing.summary,
    path: `/listings/${listing.slug}`,
  });
}

async function ListingDetailBody({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = getListingBySlug(slug);
  if (!listing) notFound();

  const related = getRelatedListings(listing, 6);
  const broker = listing.brokerSlug ? getBrokerBySlug(listing.brokerSlug) : null;

  return (
    <>
      <ListingDetail listing={listing} broker={broker} />

      {related.length > 0 ? (
        <section className="space-y-6 border-t border-[var(--border-subtle)] pt-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--brand-blue-accessible-light)]">
                Keep exploring
              </p>
              <h2 className="mt-1 font-[family-name:var(--font-google-sans)] text-2xl font-semibold text-[var(--text-heading)]">
                Related opportunities
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href={`/tennessee/${listing.citySlug}`}>More in {listing.cityName}</Link>
              </Button>
              <Button asChild variant="secondary" size="sm">
                <Link href={kindRoutes[listing.kind]}>Same opportunity type</Link>
              </Button>
            </div>
          </div>
          <ul className="stagger-children grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <li key={item.id} className="hover-lift">
                <ListingCard listing={item} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="on-dark overflow-hidden rounded-[1.35rem] bg-[linear-gradient(120deg,#081827_0%,#0b3d91_55%,#1e6ef4_100%)] px-6 py-10 sm:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] !text-[#5CB8FF]">
              Demo tip
            </p>
            <h2 className="mt-2 text-2xl font-semibold !text-white">
              Save, compare, then open Demo Center
            </h2>
            <p className="mt-2 !text-white/80">
              Switch personas to see owner, broker and admin views of the same fictional inventory.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="!text-white">
              <Link href="/compare">Open compare tray</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/40 !text-white hover:bg-white/10"
            >
              <Link href="/demo">Demo Center</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default function ListingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <div className="listing-detail-body mx-auto w-full max-w-[80rem] space-y-12 px-4 py-8 text-[var(--text-body)] sm:py-10">
      <Suspense
        fallback={
          <div className="h-[32rem] animate-pulse rounded-[var(--radius-card)] bg-[var(--surface-subtle)]" />
        }
      >
        <ListingDetailBody params={params} />
      </Suspense>
    </div>
  );
}
