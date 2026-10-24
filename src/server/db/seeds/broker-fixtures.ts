export type SeedBroker = {
  id: string;
  slug: string;
  name: string;
  firm: string;
  citySlug: string;
  summary: string;
  specialties: string[];
  email: string;
  image: string | null;
};

/**
 * Fictional demonstration brokers for NashBizHub seed data.
 * All names, firms, and .example emails are invented for the interactive demo.
 */
export const brokerFixtures: SeedBroker[] = [
  {
    id: "brk_jordan_hale",
    slug: "jordan-hale",
    name: "Jordan Hale",
    firm: "Cumberland Corridor Advisors",
    citySlug: "nashville",
    summary:
      "Fictional Middle Tennessee adviser focused on café, retail, and light-service sales. Demo contact only.",
    specialties: ["sale", "restaurants-cafes", "retail"],
    email: "jordan.hale@cumberlandcorridor.example",
    image: null,
  },
  {
    id: "brk_maya_ortiz",
    slug: "maya-ortiz",
    name: "Maya Ortiz",
    firm: "River City Business Brokers",
    citySlug: "memphis",
    summary:
      "Fictional West Tennessee broker covering convenience, fuel, and neighborhood retail transfers.",
    specialties: ["sale", "convenience-stores", "gas-stations"],
    email: "maya.ortiz@rivercitybrokers.example",
    image: null,
  },
  {
    id: "brk_ellen_park",
    slug: "ellen-park",
    name: "Ellen Park",
    firm: "Volunteer Lease Desk",
    citySlug: "knoxville",
    summary:
      "Fictional East Tennessee specialist in operating rentals, premises leases, and lodging management proposals.",
    specialties: ["business-rental", "premises-lease", "management-contract"],
    email: "ellen.park@volunteerleasedesk.example",
    image: null,
  },
  {
    id: "brk_devon_blake",
    slug: "devon-blake",
    name: "Devon Blake",
    firm: "Scenic City Commercial",
    citySlug: "chattanooga",
    summary:
      "Fictional Chattanooga adviser for service tenders, cleaning programs, and riverfront suite leases.",
    specialties: ["service-tender", "premises-lease", "commercial-cleaning"],
    email: "devon.blake@sceniccitycommercial.example",
    image: null,
  },
  {
    id: "brk_priya_nair",
    slug: "priya-nair",
    name: "Priya Nair",
    firm: "Midstate Operator Exchange",
    citySlug: "murfreesboro",
    summary:
      "Fictional Midstate broker helping operators evaluate laundry rentals, retail suites, and small-business sales.",
    specialties: ["business-rental", "sale", "laundromats"],
    email: "priya.nair@midstateoperator.example",
    image: null,
  },
  {
    id: "brk_caleb_whitman",
    slug: "caleb-whitman",
    name: "Caleb Whitman",
    firm: "Williamson Professional Desk",
    citySlug: "franklin",
    summary:
      "Fictional Franklin-area contact for professional services, boutique retail, and confidential sale inquiries.",
    specialties: ["sale", "professional-services", "retail"],
    email: "caleb.whitman@williamsondesk.example",
    image: null,
  },
  {
    id: "brk_sofia_reed",
    slug: "sofia-reed",
    name: "Sofia Reed",
    firm: "Lakeside Transition Group",
    citySlug: "hendersonville",
    summary:
      "Fictional Sumner County adviser covering automotive services, neighborhood retail, and operating rentals.",
    specialties: ["sale", "business-rental", "automotive-services"],
    email: "sofia.reed@lakesidetransition.example",
    image: null,
  },
  {
    id: "brk_marcus_glenn",
    slug: "marcus-glenn",
    name: "Marcus Glenn",
    firm: "Tri-Cities Deal Desk",
    citySlug: "johnson-city",
    summary:
      "Fictional Tri-Cities broker supporting lodging management contracts, manufacturing support sales, and regional tenders.",
    specialties: ["management-contract", "sale", "service-tender"],
    email: "marcus.glenn@tricitiesdealdesk.example",
    image: null,
  },
];
