import { getCityBySlug } from "@/config/tennessee-locations";
import { brokerFixtures, type SeedBroker } from "@/server/db/seeds/broker-fixtures";
import {
  getListingsByBrokerSlug,
} from "@/server/repositories/sqlite/listings";
import type { ListingCardData } from "@/features/listings/types";

export type PublicBroker = SeedBroker & {
  cityName: string;
};

function toPublicBroker(broker: SeedBroker): PublicBroker {
  return {
    ...broker,
    cityName: getCityBySlug(broker.citySlug)?.name ?? broker.citySlug,
  };
}

export function listBrokers(): PublicBroker[] {
  return brokerFixtures.map(toPublicBroker);
}

export function getBrokerBySlug(slug: string): PublicBroker | null {
  const found = brokerFixtures.find((broker) => broker.slug === slug);
  return found ? toPublicBroker(found) : null;
}

export function getBrokerListings(slug: string, limit = 12): ListingCardData[] {
  return getListingsByBrokerSlug(slug, limit);
}
