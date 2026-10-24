/** Local Unsplash-licensed illustrative photos (fictional listing visuals). */

export const LISTING_GALLERY_SIZE = 5;

const cafe = [
  "/images/listings/cafe-1.webp",
  "/images/listings/cafe-2.webp",
  "/images/listings/cafe-3.webp",
  "/images/listings/restaurant-1.webp",
  "/images/listings/retail-1.webp",
];
const laundry = [
  "/images/listings/laundry-1.webp",
  "/images/listings/laundry-2.webp",
  "/images/listings/store-1.webp",
  "/images/listings/retail-2.webp",
  "/images/listings/office-1.webp",
];
const retail = [
  "/images/listings/retail-1.webp",
  "/images/listings/retail-2.webp",
  "/images/listings/store-1.webp",
  "/images/listings/gas-1.webp",
  "/images/listings/office-1.webp",
];
const motel = [
  "/images/listings/motel-1.webp",
  "/images/listings/motel-2.webp",
  "/images/listings/office-1.webp",
  "/images/listings/retail-1.webp",
  "/images/listings/cafe-2.webp",
];
const cleaning = [
  "/images/listings/cleaning-1.webp",
  "/images/listings/office-1.webp",
  "/images/listings/store-1.webp",
  "/images/listings/retail-2.webp",
  "/images/listings/laundry-1.webp",
];
const gas = [
  "/images/listings/gas-1.webp",
  "/images/listings/store-1.webp",
  "/images/listings/retail-1.webp",
  "/images/listings/auto-1.webp",
  "/images/listings/office-1.webp",
];
const auto = [
  "/images/listings/auto-1.webp",
  "/images/listings/gas-1.webp",
  "/images/listings/factory-1.webp",
  "/images/listings/retail-2.webp",
  "/images/listings/office-1.webp",
];
const office = [
  "/images/listings/office-1.webp",
  "/images/listings/retail-1.webp",
  "/images/listings/store-1.webp",
  "/images/listings/cafe-1.webp",
  "/images/listings/cleaning-1.webp",
];
const factory = [
  "/images/listings/factory-1.webp",
  "/images/listings/auto-1.webp",
  "/images/listings/office-1.webp",
  "/images/listings/gas-1.webp",
  "/images/listings/retail-2.webp",
];

/** Shared filler pool so every listing can always reach 5 distinct photos. */
const catalog = [
  "/images/listings/cafe-1.webp",
  "/images/listings/cafe-2.webp",
  "/images/listings/cafe-3.webp",
  "/images/listings/restaurant-1.webp",
  "/images/listings/laundry-1.webp",
  "/images/listings/laundry-2.webp",
  "/images/listings/retail-1.webp",
  "/images/listings/retail-2.webp",
  "/images/listings/store-1.webp",
  "/images/listings/motel-1.webp",
  "/images/listings/motel-2.webp",
  "/images/listings/cleaning-1.webp",
  "/images/listings/gas-1.webp",
  "/images/listings/auto-1.webp",
  "/images/listings/office-1.webp",
  "/images/listings/factory-1.webp",
];

const byIndustry: Record<string, string[]> = {
  "restaurants-cafes": cafe,
  laundromats: laundry,
  retail: retail,
  "hotels-motels": motel,
  "commercial-cleaning": cleaning,
  "gas-stations": gas,
  "convenience-stores": gas,
  "automotive-services": auto,
  "professional-services": office,
  ecommerce: retail,
  manufacturing: factory,
  "liquor-stores": retail,
};

function hashCode(value: string): number {
  let hash = 0;
  for (const ch of value) hash = (hash + ch.charCodeAt(0) * 17) % 997;
  return hash;
}

function rotate<T>(items: T[], start: number): T[] {
  if (items.length === 0) return [];
  const i = ((start % items.length) + items.length) % items.length;
  return [...items.slice(i), ...items.slice(0, i)];
}

/** Always returns exactly {@link LISTING_GALLERY_SIZE} photos for listing detail galleries. */
export function imagesForListing(input: {
  industrySlug: string;
  kind: string;
  publicCode: string;
}): { heroImage: string; gallery: string[] } {
  const hash = hashCode(input.publicCode);
  const preferred = byIndustry[input.industrySlug] ?? retail;

  const kindExtras =
    input.kind === "service-tender"
      ? cleaning
      : input.kind === "management-contract"
        ? motel
        : input.kind === "premises-lease"
          ? retail
          : input.kind === "business-rental"
            ? laundry
            : cafe;

  const seed = Array.from(
    new Set([...rotate(preferred, hash), ...rotate(kindExtras, hash + 3)]),
  );

  const fillers = rotate(catalog, hash + 11).filter((src) => !seed.includes(src));
  const gallery = [...seed, ...fillers].slice(0, LISTING_GALLERY_SIZE);

  while (gallery.length < LISTING_GALLERY_SIZE) {
    gallery.push(catalog[gallery.length % catalog.length]!);
  }

  return { heroImage: gallery[0]!, gallery };
}

export const cityHeroImages: Record<string, string> = {
  nashville: "/images/tennessee/nashville.webp",
  memphis: "/images/tennessee/memphis.webp",
  knoxville: "/images/tennessee/knoxville.webp",
  chattanooga: "/images/tennessee/chattanooga.webp",
  clarksville: "/images/tennessee/clarksville.webp",
  franklin: "/images/tennessee/franklin.webp",
  murfreesboro: "/images/tennessee/franklin.webp",
  hendersonville: "/images/tennessee/nashville.webp",
  "johnson-city": "/images/tennessee/knoxville.webp",
  jackson: "/images/tennessee/memphis.webp",
};

export const siteHeroImage = "/images/hero/tennessee-skyline.webp";
