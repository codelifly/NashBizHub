export type Industry = {
  slug: string;
  name: string;
  summary: string;
};

export const industries: Industry[] = [
  {
    slug: "restaurants-cafes",
    name: "Restaurants & cafés",
    summary: "Full-service, quick-serve and specialty beverage concepts.",
  },
  {
    slug: "convenience-stores",
    name: "Convenience stores",
    summary: "Neighborhood retail with fuel or grocery adjacency where noted.",
  },
  {
    slug: "gas-stations",
    name: "Gas stations",
    summary: "Fuel retail with c-store operations and site lease considerations.",
  },
  {
    slug: "laundromats",
    name: "Laundromats",
    summary: "Self-serve and hybrid laundry operations with equipment schedules.",
  },
  {
    slug: "hotels-motels",
    name: "Hotels & motels",
    summary: "Lodging assets, management contracts and limited-service properties.",
  },
  {
    slug: "retail",
    name: "Retail",
    summary: "Storefront retail, specialty shops and suite leases.",
  },
  {
    slug: "automotive-services",
    name: "Automotive services",
    summary: "Repair, detailing and related service businesses.",
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    summary: "Light manufacturing and production support operations.",
  },
  {
    slug: "professional-services",
    name: "Professional services",
    summary: "Office-based advisory, technical and client-service firms.",
  },
  {
    slug: "ecommerce",
    name: "Ecommerce",
    summary: "Online retail brands with inventory and fulfillment notes.",
  },
  {
    slug: "commercial-cleaning",
    name: "Commercial cleaning",
    summary: "Contract cleaning programs and facility maintenance tenders.",
  },
  {
    slug: "liquor-stores",
    name: "Liquor stores",
    summary:
      "Retail examples that highlight permission-transfer questions; not legal advice.",
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((item) => item.slug === slug);
}
