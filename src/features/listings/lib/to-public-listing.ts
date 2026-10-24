import { industries } from "@/config/industries";
import { imagesForListing } from "@/config/listing-images";
import { tennesseeCities } from "@/config/tennessee-locations";
import type { SeedListing } from "@/server/db/seeds/listing-fixtures";
import type { ListingCardData, PublicListing } from "@/features/listings/types";

function cityName(slug: string) {
  return tennesseeCities.find((c) => c.slug === slug)?.name ?? slug;
}

function industryName(slug: string) {
  return industries.find((i) => i.slug === slug)?.name ?? slug;
}

/** Maps a seed fixture to the public listing DTO (no private/owner fields). */
export function toPublicListing(seed: SeedListing): PublicListing {
  const photos = imagesForListing({
    industrySlug: seed.industrySlug,
    kind: seed.kind,
    publicCode: seed.publicCode,
  });

  return {
    id: seed.id,
    publicCode: seed.publicCode,
    kind: seed.kind,
    slug: seed.slug,
    title: seed.title,
    summary: seed.summary,
    description: seed.description,
    status: seed.status,
    citySlug: seed.citySlug,
    cityName: cityName(seed.citySlug),
    industrySlug: seed.industrySlug,
    industryName: industryName(seed.industrySlug),
    timeZone: seed.timeZone,
    confidential: seed.confidential,
    locationLabel: seed.locationLabel,
    heroImage: photos.heroImage,
    gallery: photos.gallery,
    commercial: seed.commercial,
    operations: seed.operations,
    inclusions: seed.inclusions,
    exclusions: seed.exclusions,
    brokerSlug: seed.brokerSlug ?? null,
    publishedAt: seed.publishedAt,
    expiresAt: seed.expiresAt ?? null,
  };
}

export function toListingCardData(seed: SeedListing): ListingCardData {
  const full = toPublicListing(seed);
  return {
    id: full.id,
    publicCode: full.publicCode,
    kind: full.kind,
    slug: full.slug,
    title: full.title,
    summary: full.summary,
    status: full.status,
    citySlug: full.citySlug,
    cityName: full.cityName,
    industrySlug: full.industrySlug,
    industryName: full.industryName,
    confidential: full.confidential,
    locationLabel: full.locationLabel,
    heroImage: full.heroImage,
    commercial: full.commercial,
  };
}
