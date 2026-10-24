import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { StatusBadge } from "@/components/shared/status-badge";
import { ListingCard } from "@/features/listings/components/listing-card";
import { EmptyState } from "@/components/shared/empty-state";
import {
  getBrokerBySlug,
  getBrokerListings,
} from "@/server/repositories/sqlite/brokers";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const broker = getBrokerBySlug(slug);
  if (!broker) {
    return buildPageMetadata({
      title: "Broker not found",
      description: "Unknown broker profile.",
      path: `/brokers/${slug}`,
      noIndex: true,
    });
  }
  return buildPageMetadata({
    title: `${broker.name} · ${broker.firm}`,
    description: broker.summary,
    path: `/brokers/${broker.slug}`,
  });
}

async function BrokerDetailBody({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const broker = getBrokerBySlug(slug);
  if (!broker) notFound();

  const listings = getBrokerListings(broker.slug, 12);

  return (
    <>
      <header className="space-y-4">
        <p className="text-sm text-[var(--text-body)]">
          <Link href="/brokers" className="hover:text-[var(--brand-blue-accessible-light)]">
            Brokers
          </Link>{" "}
          / {broker.name}
        </p>
        <StatusBadge label="Fictional demo adviser" tone="neutral" />
        <h1>{broker.name}</h1>
        <p className="text-lg text-[var(--brand-blue-accessible-light)]">{broker.firm}</p>
        <p className="text-[var(--text-body)]">
          {broker.cityName}, TN · {broker.email}
        </p>
        <p className="max-w-3xl text-[var(--text-body)]">{broker.summary}</p>
        <ul className="flex flex-wrap gap-2">
          {broker.specialties.map((item) => (
            <li key={item}>
              <StatusBadge label={item.replaceAll("-", " ")} tone="info" />
            </li>
          ))}
        </ul>
      </header>

      <section className="space-y-6">
        <h2>Assigned listings</h2>
        {listings.length === 0 ? (
          <EmptyState
            title="No public listings assigned"
            description="This fictional broker does not currently have active demonstration inventory."
            actionHref="/businesses-for-sale"
            actionLabel="Browse marketplace"
          />
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <li key={listing.id}>
                <ListingCard listing={listing} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

export default function BrokerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <div className="mx-auto max-w-[80rem] space-y-10 px-4 py-10">
      <Suspense
        fallback={
          <div className="h-96 animate-pulse rounded-[var(--radius-card)] bg-[var(--surface-subtle)]" />
        }
      >
        <BrokerDetailBody params={params} />
      </Suspense>
    </div>
  );
}
