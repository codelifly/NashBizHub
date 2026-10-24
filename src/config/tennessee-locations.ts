export type TennesseeCity = {
  slug: string;
  name: string;
  region: string;
  state: "TN";
  timeZone: string;
  summary: string;
};

export const tennesseeCities: TennesseeCity[] = [
  {
    slug: "nashville",
    name: "Nashville",
    region: "Middle Tennessee",
    state: "TN",
    timeZone: "America/Chicago",
    summary:
      "Music City inventory spanning cafés, professional services and urban retail opportunities.",
  },
  {
    slug: "memphis",
    name: "Memphis",
    region: "West Tennessee",
    state: "TN",
    timeZone: "America/Chicago",
    summary:
      "Distribution, hospitality and neighborhood retail opportunities along the Mississippi corridor.",
  },
  {
    slug: "knoxville",
    name: "Knoxville",
    region: "East Tennessee",
    state: "TN",
    timeZone: "America/New_York",
    summary:
      "East Tennessee lodging, services and campus-adjacent commercial activity.",
  },
  {
    slug: "chattanooga",
    name: "Chattanooga",
    region: "East Tennessee",
    state: "TN",
    timeZone: "America/New_York",
    summary:
      "Riverfront commercial suites, cleaning contracts and outdoor-tourism related businesses.",
  },
  {
    slug: "clarksville",
    name: "Clarksville",
    region: "Middle Tennessee",
    state: "TN",
    timeZone: "America/Chicago",
    summary:
      "Growing Midstate market with laundry, convenience and service-operator opportunities.",
  },
  {
    slug: "murfreesboro",
    name: "Murfreesboro",
    region: "Middle Tennessee",
    state: "TN",
    timeZone: "America/Chicago",
    summary:
      "Fast-growing Middle Tennessee city with retail suites and family-owned sale inventory.",
  },
  {
    slug: "franklin",
    name: "Franklin",
    region: "Middle Tennessee",
    state: "TN",
    timeZone: "America/Chicago",
    summary:
      "Williamson County professional services, boutique retail and premium café concepts.",
  },
  {
    slug: "hendersonville",
    name: "Hendersonville",
    region: "Middle Tennessee",
    state: "TN",
    timeZone: "America/Chicago",
    summary:
      "Lakeside suburb opportunities including automotive services and neighborhood retail.",
  },
  {
    slug: "johnson-city",
    name: "Johnson City",
    region: "East Tennessee",
    state: "TN",
    timeZone: "America/New_York",
    summary:
      "Tri-Cities market covering lodging, healthcare-adjacent services and local retail.",
  },
  {
    slug: "jackson",
    name: "Jackson",
    region: "West Tennessee",
    state: "TN",
    timeZone: "America/Chicago",
    summary:
      "West Tennessee manufacturing support, convenience and regional service contracts.",
  },
];

export function getCityBySlug(slug: string): TennesseeCity | undefined {
  return tennesseeCities.find((city) => city.slug === slug);
}

export const approvedCityIntents = [
  "businesses-for-sale",
  "businesses-for-rent",
  "commercial-properties-for-lease",
  "management-contracts",
  "service-contracts",
] as const;

export type CityIntent = (typeof approvedCityIntents)[number];
