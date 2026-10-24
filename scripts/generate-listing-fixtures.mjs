import fs from "node:fs";

const path = new URL("../src/server/db/seeds/listing-fixtures.ts", import.meta.url);

const TZ = {
  nashville: "America/Chicago",
  memphis: "America/Chicago",
  knoxville: "America/New_York",
  chattanooga: "America/New_York",
  clarksville: "America/Chicago",
  murfreesboro: "America/Chicago",
  franklin: "America/Chicago",
  hendersonville: "America/Chicago",
  "johnson-city": "America/New_York",
  jackson: "America/Chicago",
};

const CITY = {
  nashville: "Nashville",
  memphis: "Memphis",
  knoxville: "Knoxville",
  chattanooga: "Chattanooga",
  clarksville: "Clarksville",
  murfreesboro: "Murfreesboro",
  franklin: "Franklin",
  hendersonville: "Hendersonville",
  "johnson-city": "Johnson City",
  jackson: "Jackson",
};

function usd(dollars) {
  return { minorUnits: Math.round(dollars * 100), currency: "USD" };
}
function monthly(dollars) {
  return { ...usd(dollars), period: "month" };
}
function disclosed(value) {
  return { status: "disclosed", value };
}
function undisclosed() {
  return { status: "undisclosed" };
}

function para(parts) {
  const text = parts.join(" ").replace(/\s+/g, " ").trim();
  const words = text.split(/\s+/).length;
  if (words < 150 || words > 300) {
    throw new Error(`Bad word count ${words}: ${parts[0].slice(0, 60)}`);
  }
  return text;
}

function desc(kind, title, city, industry, extras = []) {
  const cityName = CITY[city];
  return para([
    `This fictional NashBizHub demonstration listing presents ${title} as a sample ${kind.replace(/-/g, " ")} opportunity in ${cityName}, Tennessee.`,
    `The inventory is invented for product walkthroughs, training, and UI testing; it does not represent a live offering, and no real seller, landlord, or issuer is attached.`,
    `Operators exploring the ${industry.replace(/-/g, " ")} category can use the record to practice filtering, comparison, inquiry drafting, and document-request flows without touching production data.`,
    `The published summary highlights neighborhood context, staffing patterns, and the commercial structure buyers or operators typically review first when shortlisting Middle, West, or East Tennessee opportunities.`,
    `Demo advisers may walk stakeholders through asking price or rent disclosure, inclusion lists, exclusion notes, and the operations block that accompanies each seed record.`,
    `Because the marketplace mixes sales, operating rentals, premises leases, management contracts, and service tenders, this listing also shows how kind-specific commercial fields render on public cards and detail pages.`,
    `Confidential flags, negotiation status, and expiry timestamps elsewhere in the seed set are intentional so QA can exercise gated messaging and deadline banners.`,
    `All figures, square footage, machine counts, room counts, and deliverable lists are illustrative only and should be treated as placeholders for narrative demos.`,
    ...extras,
    `Prospective users should treat every inquiry, NDA acknowledgement, and simulated offer against this listing as nonbinding demonstration activity inside the NashBizHub sandbox.`,
  ]);
}

const listings = [];

listings.push({
  id: "lst_nbh_s_1001",
  publicCode: "NBH-S-1001",
  workspaceId: "base",
  kind: "sale",
  slug: "riverside-cafe-nashville",
  title: "Riverside Café",
  summary:
    "Fictional Nashville café sale with disclosed asking price, revenue, and stated owner benefit; inventory billed separately.",
  description: desc("sale", "Riverside Café", "nashville", "restaurants-cafes", [
    "The café seats roughly forty guests with a compact open kitchen, morning pastry program, and steady weekday lunch traffic from nearby offices along the fictional riverside corridor.",
    "Transition training is framed as a two-week owner handoff covering suppliers, POS routines, and seasonal menu planning so demo buyers can rehearse diligence checklists.",
  ]),
  status: "active",
  citySlug: "nashville",
  industrySlug: "restaurants-cafes",
  timeZone: TZ.nashville,
  confidential: false,
  locationLabel: "Riverside corridor, Nashville, TN",
  heroImage: "/images/listings/placeholder-cafe.svg",
  galleryJson: [
    "/images/listings/placeholder-cafe.svg",
    "/images/listings/placeholder-generic.svg",
  ],
  commercial: {
    kind: "sale",
    asking: disclosed(usd(420000)),
    revenue: disclosed({
      ...usd(780000),
      periodStart: "2025-01-01",
      periodEnd: "2025-12-31",
    }),
    earnings: disclosed({
      measure: "stated owner benefit",
      amount: usd(135000),
      adjustmentNote: "Owner salary add-back illustrated for demo only.",
    }),
    inventoryIncluded: false,
    propertyPosition:
      "Leased premises; assignment subject to landlord consent in the fictional scenario.",
    transitionTraining:
      "Two-week on-site training with optional thirty-day phone support.",
    conditions: [
      "Asset purchase of FF&E",
      "Inventory valued at closing and paid separately",
      "Standard due diligence period",
    ],
  },
  operations: {
    seats: 40,
    dayparts: ["breakfast", "lunch"],
    employees: 9,
    yearsOperating: 7,
  },
  inclusions: [
    "Point-of-sale system",
    "Kitchen equipment package",
    "Customer email list (demo)",
  ],
  exclusions: ["Real property", "Owner vehicle", "Cash on hand", "Inventory (separate)"],
  brokerSlug: "jordan-hale",
  publishedAt: "2026-08-01T14:00:00.000Z",
  expiresAt: null,
});

listings.push({
  id: "lst_nbh_r_2001",
  publicCode: "NBH-R-2001",
  workspaceId: "base",
  kind: "business-rental",
  slug: "cumberland-laundry-clarksville",
  title: "Cumberland Laundry",
  summary:
    "Fictional Clarksville laundromat operating rental with 24 machines at USD 4,500 per month on a 24-month term.",
  description: desc(
    "business-rental",
    "Cumberland Laundry",
    "clarksville",
    "laundromats",
    [
      "The seed package lists twenty-four washers and dryers with card payment rails, folding tables, and a small vending area suitable for self-serve traffic near Clarksville neighborhoods.",
      "Operators can practice reviewing rent disclosure, security arrangements, handback expectations, and included-asset schedules before submitting a rental application in the demo workspace.",
    ],
  ),
  status: "active",
  citySlug: "clarksville",
  industrySlug: "laundromats",
  timeZone: TZ.clarksville,
  confidential: false,
  locationLabel: "Cumberland Drive area, Clarksville, TN",
  heroImage: "/images/listings/placeholder-laundry.svg",
  galleryJson: ["/images/listings/placeholder-laundry.svg"],
  commercial: {
    kind: "business-rental",
    rent: disclosed(monthly(4500)),
    termMonths: 24,
    availableFrom: "2026-11-01",
    securityArrangement:
      "Two months rent held as refundable security in the fictional agreement.",
    responsibilities: [
      "Daily opening and closing",
      "Machine cleaning cycles",
      "Customer support during posted hours",
      "Utilities payment",
    ],
    handbackExpectations:
      "Return equipment in good working order with normal wear; maintenance log required.",
    includedAssets: [
      "24 washers and dryers",
      "Card payment system",
      "Folding tables",
      "Security cameras",
    ],
  },
  operations: {
    machineCount: 24,
    hours: "6am–10pm",
    staffingModel: "owner-operator plus one attendant",
  },
  inclusions: [
    "Equipment package",
    "Existing utility accounts transfer guidance",
    "Opening cash float procedure (demo)",
  ],
  exclusions: [
    "Real property ownership",
    "Off-site storage units",
    "Personal tools of current operator",
  ],
  brokerSlug: "priya-nair",
  publishedAt: "2026-08-10T15:00:00.000Z",
  expiresAt: null,
});

listings.push({
  id: "lst_nbh_l_2101",
  publicCode: "NBH-L-2101",
  workspaceId: "base",
  kind: "premises-lease",
  slug: "market-square-retail-suite-murfreesboro",
  title: "Market Square Retail Suite",
  summary:
    "Fictional Murfreesboro retail suite lease of 1,800 sq ft with USD 3,200 monthly base rent for specialty or soft-goods use.",
  description: desc(
    "premises-lease",
    "Market Square Retail Suite",
    "murfreesboro",
    "retail",
    [
      "The 1,800-square-foot suite sits in a fictional Market Square block with storefront glass, a rear stockroom, and shared corridor restrooms typical of Midstate strip and downtown-adjacent inventory.",
      "Demo tenants can review base rent disclosure, fit-out notes, outgoings language, and viewing logistics before booking a simulated walkthrough with the assigned broker.",
    ],
  ),
  status: "active",
  citySlug: "murfreesboro",
  industrySlug: "retail",
  timeZone: TZ.murfreesboro,
  confidential: false,
  locationLabel: "Market Square district, Murfreesboro, TN",
  heroImage: "/images/listings/placeholder-retail.svg",
  galleryJson: [
    "/images/listings/placeholder-retail.svg",
    "/images/listings/placeholder-generic.svg",
  ],
  commercial: {
    kind: "premises-lease",
    baseRent: disclosed(monthly(3200)),
    areaSqFt: 1800,
    propertyUse:
      "Specialty retail or soft-goods boutique; food service requires landlord approval in the fictional scenario.",
    fitOut: "Vanilla shell with HVAC, lighting grid, and demised restroom stub-out.",
    outgoings: "Tenant pays pro-rata CAM and separately metered utilities as illustrated.",
    viewingNotes: "Weekday viewings preferred; broker escort required for after-hours access.",
  },
  operations: { frontageFt: 28, parking: "shared lot", deliveryAccess: "rear alley" },
  inclusions: ["Storefront signage band", "Existing lighting grid", "Shared dumpster access"],
  exclusions: ["Trade fixtures of prior tenant", "Exclusive parking stalls", "Roof rights"],
  brokerSlug: "priya-nair",
  publishedAt: "2026-08-12T16:00:00.000Z",
  expiresAt: null,
});

listings.push({
  id: "lst_nbh_m_3001",
  publicCode: "NBH-M-3001",
  workspaceId: "base",
  kind: "management-contract",
  slug: "volunteer-lodge-operations-knoxville",
  title: "Volunteer Lodge Operations",
  summary:
    "Fictional Knoxville 32-room motel management proposal with a 36-month term covering day-to-day operations and reporting.",
  description: desc(
    "management-contract",
    "Volunteer Lodge Operations",
    "knoxville",
    "hotels-motels",
    [
      "The thirty-two-room limited-service motel is framed as an East Tennessee lodging asset seeking an operator for guest services, housekeeping oversight, and revenue reporting under a thirty-six-month proposal.",
      "Candidates can rehearse evaluating decision rights, duty lists, performance measures, and commercial-model language before submitting a management application in the sandbox.",
    ],
  ),
  status: "active",
  citySlug: "knoxville",
  industrySlug: "hotels-motels",
  timeZone: TZ.knoxville,
  confidential: false,
  locationLabel: "Volunteer Parkway corridor, Knoxville, TN",
  heroImage: "/images/listings/placeholder-motel.svg",
  galleryJson: ["/images/listings/placeholder-motel.svg"],
  commercial: {
    kind: "management-contract",
    proposedTermMonths: 36,
    decisionRights: [
      "Daily staffing within approved budget",
      "Vendor selection under owner thresholds",
      "Rate adjustments within published bands",
    ],
    duties: [
      "Front desk coverage plan",
      "Housekeeping quality control",
      "Preventive maintenance scheduling",
      "Guest complaint escalation",
    ],
    reporting: [
      "Weekly occupancy snapshot",
      "Monthly P&L package",
      "Quarterly capital request list",
    ],
    performanceMeasures: [
      "Occupancy vs. market set",
      "Guest satisfaction score target",
      "Payroll percentage guardrail",
    ],
    commercialModel:
      "Base management fee plus incentive tied to GOP, illustrated for demo only.",
  },
  operations: { rooms: 32, brand: "independent (fictional)", FTE: 14 },
  inclusions: [
    "Property management software access",
    "Owner-approved operating manuals",
    "On-site manager housing note (demo)",
  ],
  exclusions: ["Capital expenditure funding", "Ownership equity", "Franchise licensing fees"],
  brokerSlug: "ellen-park",
  publishedAt: "2026-08-15T13:00:00.000Z",
  expiresAt: null,
});

listings.push({
  id: "lst_nbh_t_4001",
  publicCode: "NBH-T-4001",
  workspaceId: "base",
  kind: "service-tender",
  slug: "five-store-cleaning-program-chattanooga",
  title: "Five Store Cleaning Program",
  summary:
    "Fictional Chattanooga commercial cleaning tender covering five retail stores on a 12-month program with a clear proposal deadline.",
  description: desc(
    "service-tender",
    "Five Store Cleaning Program",
    "chattanooga",
    "commercial-cleaning",
    [
      "The issuer seeks nightly floor care, restroom service, and periodic deep cleans across five fictional retail locations in the Chattanooga metro for a twelve-month initial term.",
      "Vendors can practice eligibility checks, clarification questions, milestone planning, and proposal packaging against a hard deadline timestamp used by the demo tender board.",
    ],
  ),
  status: "active",
  citySlug: "chattanooga",
  industrySlug: "commercial-cleaning",
  timeZone: TZ.chattanooga,
  confidential: false,
  locationLabel: "Multi-site retail corridor, Chattanooga, TN",
  heroImage: "/images/listings/placeholder-cleaning.svg",
  galleryJson: [
    "/images/listings/placeholder-cleaning.svg",
    "/images/listings/placeholder-generic.svg",
  ],
  commercial: {
    kind: "service-tender",
    deadlineAt: "2026-11-15T23:59:00.000-05:00",
    durationMonths: 12,
    deliverables: [
      "Nightly floor care",
      "Restroom restocking",
      "Monthly deep clean",
      "Incident reporting within 24 hours",
    ],
    eligibility: [
      "Insured commercial cleaner",
      "Two years multi-site experience",
      "Background-checked crews",
    ],
    clarificationProcess:
      "Written questions via demo tender desk until seven days before deadline.",
    milestones: [
      "Kickoff site walks",
      "30-day quality review",
      "Mid-term KPI checkpoint",
      "Renewal recommendation memo",
    ],
  },
  operations: { sites: 5, serviceWindow: "after 9pm", estimatedWeeklyHours: 60 },
  inclusions: [
    "Site access credentials process",
    "Consumables specification sheet",
    "KPI dashboard template (demo)",
  ],
  exclusions: [
    "Window exterior high-rise work",
    "Hazardous waste handling",
    "Capital equipment purchase",
  ],
  brokerSlug: "devon-blake",
  publishedAt: "2026-09-01T12:00:00.000Z",
  expiresAt: "2026-11-15T23:59:00.000-05:00",
});

const salesExtra = [
  {
    code: "NBH-S-1002",
    slug: "beale-street-deli-memphis",
    title: "Beale Street Deli",
    city: "memphis",
    industry: "restaurants-cafes",
    asking: 310000,
    rev: 520000,
    earn: 92000,
    status: "active",
    confidential: false,
    broker: "maya-ortiz",
    img: "placeholder-cafe.svg",
  },
  {
    code: "NBH-S-1003",
    slug: "orange-grove-market-knoxville",
    title: "Orange Grove Market",
    city: "knoxville",
    industry: "convenience-stores",
    asking: 275000,
    rev: 890000,
    earn: 78000,
    status: "active",
    confidential: true,
    broker: "ellen-park",
    img: "placeholder-retail.svg",
    note: "undisclosed-asking",
  },
  {
    code: "NBH-S-1004",
    slug: "lookout-fuel-stop-chattanooga",
    title: "Lookout Fuel Stop",
    city: "chattanooga",
    industry: "gas-stations",
    asking: 890000,
    rev: 2400000,
    earn: 165000,
    status: "under-negotiation",
    confidential: false,
    broker: "devon-blake",
    img: "placeholder-generic.svg",
  },
  {
    code: "NBH-S-1005",
    slug: "fort-campbell-wash-clarksville",
    title: "Fort Campbell Wash Hub",
    city: "clarksville",
    industry: "laundromats",
    asking: 195000,
    rev: 210000,
    earn: 62000,
    status: "active",
    confidential: false,
    broker: "priya-nair",
    img: "placeholder-laundry.svg",
  },
  {
    code: "NBH-S-1006",
    slug: "stones-river-apparel-murfreesboro",
    title: "Stones River Apparel",
    city: "murfreesboro",
    industry: "retail",
    asking: 165000,
    rev: 340000,
    earn: 54000,
    status: "active",
    confidential: false,
    broker: "priya-nair",
    img: "placeholder-retail.svg",
  },
  {
    code: "NBH-S-1007",
    slug: "main-street-boutique-franklin",
    title: "Main Street Boutique",
    city: "franklin",
    industry: "retail",
    asking: 240000,
    rev: 410000,
    earn: 71000,
    status: "active",
    confidential: true,
    broker: "caleb-whitman",
    img: "placeholder-retail.svg",
  },
  {
    code: "NBH-S-1008",
    slug: "lakeview-auto-care-hendersonville",
    title: "Lakeview Auto Care",
    city: "hendersonville",
    industry: "automotive-services",
    asking: 385000,
    rev: 620000,
    earn: 98000,
    status: "active",
    confidential: false,
    broker: "sofia-reed",
    img: "placeholder-generic.svg",
  },
  {
    code: "NBH-S-1009",
    slug: "buffalo-mountain-inn-johnson-city",
    title: "Buffalo Mountain Inn",
    city: "johnson-city",
    industry: "hotels-motels",
    asking: 1250000,
    rev: 980000,
    earn: 210000,
    status: "under-negotiation",
    confidential: false,
    broker: "marcus-glenn",
    img: "placeholder-motel.svg",
  },
  {
    code: "NBH-S-1010",
    slug: "west-tn-packaging-jackson",
    title: "West TN Packaging Cell",
    city: "jackson",
    industry: "manufacturing",
    asking: 560000,
    rev: 1100000,
    earn: 145000,
    status: "active",
    confidential: false,
    broker: "maya-ortiz",
    img: "placeholder-generic.svg",
  },
  {
    code: "NBH-S-1011",
    slug: "gulch-advisory-desk-nashville",
    title: "Gulch Advisory Desk",
    city: "nashville",
    industry: "professional-services",
    asking: 190000,
    rev: 280000,
    earn: 88000,
    status: "completed",
    confidential: false,
    broker: "jordan-hale",
    img: "placeholder-generic.svg",
  },
  {
    code: "NBH-S-1012",
    slug: "music-city-merch-online-nashville",
    title: "Music City Merch Online",
    city: "nashville",
    industry: "ecommerce",
    asking: 145000,
    rev: 390000,
    earn: 67000,
    status: "active",
    confidential: false,
    broker: "jordan-hale",
    img: "placeholder-generic.svg",
  },
  {
    code: "NBH-S-1013",
    slug: "sparkle-route-memphis",
    title: "Sparkle Route Services",
    city: "memphis",
    industry: "commercial-cleaning",
    asking: 120000,
    rev: 260000,
    earn: 72000,
    status: "active",
    confidential: false,
    broker: "maya-ortiz",
    img: "placeholder-cleaning.svg",
  },
  {
    code: "NBH-S-1014",
    slug: "highland-spirits-knoxville",
    title: "Highland Spirits Shop",
    city: "knoxville",
    industry: "liquor-stores",
    asking: 430000,
    rev: 980000,
    earn: 112000,
    status: "active",
    confidential: true,
    broker: "ellen-park",
    img: "placeholder-retail.svg",
  },
  {
    code: "NBH-S-1015",
    slug: "tri-cities-detail-johnson-city",
    title: "Tri-Cities Detail Works",
    city: "johnson-city",
    industry: "automotive-services",
    asking: 175000,
    rev: 295000,
    earn: 58000,
    status: "active",
    confidential: false,
    broker: "marcus-glenn",
    img: "placeholder-generic.svg",
  },
  {
    code: "NBH-S-1016",
    slug: "jackson-corner-mart",
    title: "Jackson Corner Mart",
    city: "jackson",
    industry: "convenience-stores",
    asking: 255000,
    rev: 740000,
    earn: 69000,
    status: "completed",
    confidential: false,
    broker: "maya-ortiz",
    img: "placeholder-retail.svg",
  },
];

for (const s of salesExtra) {
  const undisclosedAsking = s.note === "undisclosed-asking";
  listings.push({
    id: "lst_" + s.code.toLowerCase().replace(/-/g, "_"),
    publicCode: s.code,
    workspaceId: "base",
    kind: "sale",
    slug: s.slug,
    title: s.title,
    summary:
      `Fictional ${CITY[s.city]} ${s.industry.replace(/-/g, " ")} business for sale. Demonstration inventory only.` +
      (undisclosedAsking ? " Asking price undisclosed pending NDA." : ""),
    description: desc("sale", s.title, s.city, s.industry, [
      `Illustrative asking economics reference roughly USD ${(s.asking / 1000).toFixed(0)}k with annual revenue near USD ${(s.rev / 1000).toFixed(0)}k for walkthrough math, except where the asking field is intentionally undisclosed.`,
      "Buyers can exercise favorite lists, compare drawers, and confidential inquiry forms against this seed while brokers demonstrate revision and negotiation status changes.",
    ]),
    status: s.status,
    citySlug: s.city,
    industrySlug: s.industry,
    timeZone: TZ[s.city],
    confidential: s.confidential,
    locationLabel: CITY[s.city] + ", TN",
    heroImage: "/images/listings/" + s.img,
    galleryJson: ["/images/listings/" + s.img],
    commercial: {
      kind: "sale",
      asking: undisclosedAsking ? undisclosed() : disclosed(usd(s.asking)),
      revenue: disclosed({
        ...usd(s.rev),
        periodStart: "2025-01-01",
        periodEnd: "2025-12-31",
      }),
      earnings: disclosed({ measure: "stated owner benefit", amount: usd(s.earn) }),
      inventoryIncluded: !(s.industry === "ecommerce" || s.industry === "retail"),
      propertyPosition: "Leased or assigned premises depending on fictional file notes.",
      transitionTraining:
        "Up to ten business days of owner-assisted transition in the demo script.",
      conditions: [
        "Proof of funds",
        "NDA before detailed books",
        "Standard asset sale structure",
      ],
    },
    operations: {
      employees: 4 + (s.code.charCodeAt(7) % 10),
      yearsOperating: 3 + (s.code.charCodeAt(8) % 12),
    },
    inclusions: ["Trade name (demo)", "Customer records (anonymized demo)", "FF&E schedule"],
    exclusions: ["Real estate unless noted", "Owner personal guarantees transfer", "Cash"],
    brokerSlug: s.broker,
    publishedAt:
      s.status === "completed"
        ? "2025-11-01T12:00:00.000Z"
        : "2026-07-15T12:00:00.000Z",
    expiresAt: null,
  });
}

const rentalsExtra = [
  {
    code: "NBH-R-2002",
    slug: "poplar-avenue-laundry-memphis",
    title: "Poplar Avenue Laundry",
    city: "memphis",
    machines: 30,
    rent: 5200,
    term: 36,
    status: "active",
    confidential: false,
    broker: "maya-ortiz",
  },
  {
    code: "NBH-R-2003",
    slug: "university-wash-knoxville",
    title: "University Wash House",
    city: "knoxville",
    machines: 18,
    rent: 3800,
    term: 24,
    status: "active",
    confidential: true,
    broker: "ellen-park",
  },
  {
    code: "NBH-R-2004",
    slug: "riverfront-cafe-ops-chattanooga",
    title: "Riverfront Café Ops Rental",
    city: "chattanooga",
    machines: 0,
    rent: 6500,
    term: 18,
    status: "under-negotiation",
    confidential: false,
    broker: "devon-blake",
    industry: "restaurants-cafes",
    img: "placeholder-cafe.svg",
  },
  {
    code: "NBH-R-2005",
    slug: "battle-ground-cstore-ops-clarksville",
    title: "Battleground C-Store Ops",
    city: "clarksville",
    machines: 0,
    rent: 4800,
    term: 24,
    status: "active",
    confidential: false,
    broker: "priya-nair",
    industry: "convenience-stores",
    img: "placeholder-retail.svg",
  },
  {
    code: "NBH-R-2006",
    slug: "cool-springs-suite-ops-franklin",
    title: "Cool Springs Suite Ops",
    city: "franklin",
    machines: 0,
    rent: 7200,
    term: 12,
    status: "active",
    confidential: false,
    broker: "caleb-whitman",
    industry: "professional-services",
    img: "placeholder-generic.svg",
  },
  {
    code: "NBH-R-2007",
    slug: "old-hickory-detail-bay-hendersonville",
    title: "Old Hickory Detail Bay",
    city: "hendersonville",
    machines: 0,
    rent: 2900,
    term: 24,
    status: "active",
    confidential: false,
    broker: "sofia-reed",
    industry: "automotive-services",
    img: "placeholder-generic.svg",
  },
  {
    code: "NBH-R-2008",
    slug: "jackson-express-laundry",
    title: "Jackson Express Laundry",
    city: "jackson",
    machines: 22,
    rent: 4100,
    term: 36,
    status: "completed",
    confidential: false,
    broker: "maya-ortiz",
  },
];

for (const r of rentalsExtra) {
  const industry = r.industry || "laundromats";
  const img = r.img || "placeholder-laundry.svg";
  listings.push({
    id: "lst_" + r.code.toLowerCase().replace(/-/g, "_"),
    publicCode: r.code,
    workspaceId: "base",
    kind: "business-rental",
    slug: r.slug,
    title: r.title,
    summary: `Fictional ${CITY[r.city]} operating rental in ${industry.replace(/-/g, " ")}. Demo economics only.`,
    description: desc("business-rental", r.title, r.city, industry, [
      r.machines
        ? `The seed lists ${r.machines} machines and monthly rent near USD ${r.rent.toLocaleString()} on a ${r.term}-month term for operator practice.`
        : `Monthly operating rent is illustrated near USD ${r.rent.toLocaleString()} with a ${r.term}-month term so applicants can rehearse affordability checks.`,
      "Handback expectations, included assets, and security arrangements are populated so rental workflows feel complete during facilitator-led sessions.",
    ]),
    status: r.status,
    citySlug: r.city,
    industrySlug: industry,
    timeZone: TZ[r.city],
    confidential: r.confidential,
    locationLabel: CITY[r.city] + ", TN",
    heroImage: "/images/listings/" + img,
    galleryJson: ["/images/listings/" + img],
    commercial: {
      kind: "business-rental",
      rent: disclosed(monthly(r.rent)),
      termMonths: r.term,
      availableFrom: "2026-12-01",
      securityArrangement:
        "One to two months rent as refundable security in the fictional file.",
      responsibilities: [
        "Operate during posted hours",
        "Maintain cleanliness",
        "Report equipment faults within 24 hours",
      ],
      handbackExpectations:
        "Return keys, access devices, and equipment in serviceable condition.",
      includedAssets: r.machines
        ? [r.machines + " machines", "Payment system", "Furniture"]
        : ["FF&E package", "POS terminal", "Opening procedures binder"],
    },
    operations: r.machines
      ? { machineCount: r.machines }
      : { model: "turnkey operating rental" },
    inclusions: ["Operating manuals", "Vendor contact list (demo)"],
    exclusions: ["Ownership of real property", "Personal guarantees of prior operator"],
    brokerSlug: r.broker,
    publishedAt: "2026-07-20T12:00:00.000Z",
    expiresAt: null,
  });
}

const leasesExtra = [
  {
    code: "NBH-L-2102",
    slug: "south-main-studio-memphis",
    title: "South Main Studio Suite",
    city: "memphis",
    sqft: 1200,
    rent: 2400,
    use: "Gallery or boutique retail",
    status: "active",
    confidential: false,
    broker: "maya-ortiz",
    industry: "retail",
  },
  {
    code: "NBH-L-2103",
    slug: "market-square-office-knoxville",
    title: "Market Square Office Bay",
    city: "knoxville",
    sqft: 950,
    rent: 2100,
    use: "Professional services office",
    status: "active",
    confidential: true,
    broker: "ellen-park",
    industry: "professional-services",
  },
  {
    code: "NBH-L-2104",
    slug: "mlk-boulevard-shopfront-chattanooga",
    title: "MLK Boulevard Shopfront",
    city: "chattanooga",
    sqft: 1600,
    rent: 2900,
    use: "General retail",
    status: "under-negotiation",
    confidential: false,
    broker: "devon-blake",
    industry: "retail",
  },
  {
    code: "NBH-L-2105",
    slug: "downtown-franklin-corner",
    title: "Downtown Franklin Corner",
    city: "franklin",
    sqft: 2100,
    rent: 5500,
    use: "Boutique retail or café (subject to approval)",
    status: "active",
    confidential: false,
    broker: "caleb-whitman",
    industry: "retail",
  },
  {
    code: "NBH-L-2106",
    slug: "state-street-flex-bay-jackson",
    title: "State Street Flex Bay",
    city: "jackson",
    sqft: 3200,
    rent: 3600,
    use: "Light assembly or distribution support",
    status: "active",
    confidential: false,
    broker: "maya-ortiz",
    industry: "manufacturing",
  },
];

for (const l of leasesExtra) {
  listings.push({
    id: "lst_" + l.code.toLowerCase().replace(/-/g, "_"),
    publicCode: l.code,
    workspaceId: "base",
    kind: "premises-lease",
    slug: l.slug,
    title: l.title,
    summary: `Fictional ${CITY[l.city]} premises lease of ${l.sqft.toLocaleString()} sq ft. Demonstration listing only.`,
    description: desc("premises-lease", l.title, l.city, l.industry, [
      `Base rent is illustrated at USD ${l.rent.toLocaleString()} per month for ${l.sqft.toLocaleString()} square feet configured for ${l.use.toLowerCase()}.`,
      "Fit-out notes, outgoings language, and viewing logistics are included so leasing journeys can be demoed end to end without live landlord systems.",
    ]),
    status: l.status,
    citySlug: l.city,
    industrySlug: l.industry,
    timeZone: TZ[l.city],
    confidential: l.confidential,
    locationLabel: CITY[l.city] + ", TN",
    heroImage: "/images/listings/placeholder-retail.svg",
    galleryJson: ["/images/listings/placeholder-retail.svg"],
    commercial: {
      kind: "premises-lease",
      baseRent: disclosed(monthly(l.rent)),
      areaSqFt: l.sqft,
      propertyUse: l.use,
      fitOut: "As-is with HVAC; tenant improvements negotiable in the fictional LOI.",
      outgoings: "Pro-rata CAM and utilities as illustrated.",
      viewingNotes: "Broker-accompanied viewings weekdays 10am–4pm local time.",
    },
    operations: { loading: "street or rear alley", parking: "shared" },
    inclusions: ["Base building systems", "Directory listing (demo)"],
    exclusions: ["Furniture", "Exclusive parking unless noted"],
    brokerSlug: l.broker,
    publishedAt: "2026-07-25T12:00:00.000Z",
    expiresAt: null,
  });
}

const mgmtExtra = [
  {
    code: "NBH-M-3002",
    slug: "music-row-extended-stay-nashville",
    title: "Music Row Extended Stay Ops",
    city: "nashville",
    rooms: 48,
    term: 24,
    status: "active",
    confidential: false,
    broker: "jordan-hale",
  },
  {
    code: "NBH-M-3003",
    slug: "delta-inn-management-memphis",
    title: "Delta Inn Management",
    city: "memphis",
    rooms: 60,
    term: 36,
    status: "under-negotiation",
    confidential: false,
    broker: "maya-ortiz",
  },
  {
    code: "NBH-M-3004",
    slug: "cumberland-suites-ops-clarksville",
    title: "Cumberland Suites Ops",
    city: "clarksville",
    rooms: 40,
    term: 24,
    status: "active",
    confidential: true,
    broker: "priya-nair",
  },
  {
    code: "NBH-M-3005",
    slug: "tri-cities-lodge-ops-johnson-city",
    title: "Tri-Cities Lodge Ops",
    city: "johnson-city",
    rooms: 28,
    term: 36,
    status: "active",
    confidential: false,
    broker: "marcus-glenn",
  },
];

for (const m of mgmtExtra) {
  listings.push({
    id: "lst_" + m.code.toLowerCase().replace(/-/g, "_"),
    publicCode: m.code,
    workspaceId: "base",
    kind: "management-contract",
    slug: m.slug,
    title: m.title,
    summary: `Fictional ${CITY[m.city]} lodging management proposal for a ${m.rooms}-room property over ${m.term} months.`,
    description: desc("management-contract", m.title, m.city, "hotels-motels", [
      `The proposal frames day-to-day operation of ${m.rooms} rooms under a ${m.term}-month management term with reporting and incentive language suitable for demo negotiations.`,
      "Decision rights, duties, and performance measures are populated so operators can rehearse application packets and owner interviews inside the sandbox.",
    ]),
    status: m.status,
    citySlug: m.city,
    industrySlug: "hotels-motels",
    timeZone: TZ[m.city],
    confidential: m.confidential,
    locationLabel: CITY[m.city] + ", TN",
    heroImage: "/images/listings/placeholder-motel.svg",
    galleryJson: ["/images/listings/placeholder-motel.svg"],
    commercial: {
      kind: "management-contract",
      proposedTermMonths: m.term,
      decisionRights: [
        "Staffing within budget",
        "Vendor selection under caps",
        "Rate strategy within owner bands",
      ],
      duties: [
        "Guest services",
        "Housekeeping oversight",
        "Maintenance coordination",
        "Compliance logging (demo)",
      ],
      reporting: ["Weekly flash", "Monthly financials", "Quarterly owner call"],
      performanceMeasures: ["Occupancy", "ADR", "Guest score"],
      commercialModel: "Base fee plus incentive on GOP, fictional illustration only.",
    },
    operations: { rooms: m.rooms },
    inclusions: ["PMS access", "Brand standards binder (demo)"],
    exclusions: ["Capex funding", "Ownership interest"],
    brokerSlug: m.broker,
    publishedAt: "2026-08-05T12:00:00.000Z",
    expiresAt: null,
  });
}

const tendersExtra = [
  {
    code: "NBH-T-4002",
    slug: "metro-office-nightly-clean-nashville",
    title: "Metro Office Nightly Clean",
    city: "nashville",
    months: 24,
    deadline: "2026-10-30T23:59:00.000-05:00",
    status: "active",
    confidential: false,
    broker: "jordan-hale",
    expiring: true,
  },
  {
    code: "NBH-T-4003",
    slug: "distribution-floor-care-memphis",
    title: "Distribution Floor Care Tender",
    city: "memphis",
    months: 12,
    deadline: "2026-12-01T23:59:00.000-06:00",
    status: "active",
    confidential: false,
    broker: "maya-ortiz",
  },
  {
    code: "NBH-T-4004",
    slug: "campus-facility-support-knoxville",
    title: "Campus Facility Support Tender",
    city: "knoxville",
    months: 18,
    deadline: "2027-01-15T23:59:00.000-05:00",
    status: "under-negotiation",
    confidential: false,
    broker: "ellen-park",
  },
  {
    code: "NBH-T-4005",
    slug: "west-tn-plant-janitorial-jackson",
    title: "West TN Plant Janitorial",
    city: "jackson",
    months: 12,
    deadline: "2026-12-20T23:59:00.000-06:00",
    status: "active",
    confidential: true,
    broker: "marcus-glenn",
  },
];

for (const t of tendersExtra) {
  listings.push({
    id: "lst_" + t.code.toLowerCase().replace(/-/g, "_"),
    publicCode: t.code,
    workspaceId: "base",
    kind: "service-tender",
    slug: t.slug,
    title: t.title,
    summary:
      `Fictional ${CITY[t.city]} commercial cleaning service tender (${t.months} months).` +
      (t.expiring ? " Proposal deadline approaching." : ""),
    description: desc("service-tender", t.title, t.city, "commercial-cleaning", [
      `Vendors prepare proposals for a ${t.months}-month cleaning program with eligibility gates, clarification windows, and milestone reviews mirrored in the commercial block.`,
      t.expiring
        ? "This seed intentionally carries an imminent deadline so UI banners and digest emails can surface expiring tender states during demos."
        : "Deadline and duration fields support calendar widgets and reminder jobs in the demonstration environment.",
    ]),
    status: t.status,
    citySlug: t.city,
    industrySlug: "commercial-cleaning",
    timeZone: TZ[t.city],
    confidential: t.confidential,
    locationLabel: CITY[t.city] + ", TN",
    heroImage: "/images/listings/placeholder-cleaning.svg",
    galleryJson: ["/images/listings/placeholder-cleaning.svg"],
    commercial: {
      kind: "service-tender",
      deadlineAt: t.deadline,
      durationMonths: t.months,
      deliverables: [
        "Scheduled cleaning",
        "Supply restocking",
        "Quality audits",
        "Incident reports",
      ],
      eligibility: [
        "Insurance certificate",
        "Prior commercial references",
        "Crew background checks",
      ],
      clarificationProcess:
        "Questions accepted through the demo tender desk until one week before deadline.",
      milestones: ["Award notice", "Mobilization", "90-day review", "Renewal decision"],
    },
    operations: { serviceWindow: "nights/weekends as specified" },
    inclusions: ["Scope of work PDF (demo)", "Site map package"],
    exclusions: ["Capital repairs", "Security guarding"],
    brokerSlug: t.broker,
    publishedAt: "2026-09-10T12:00:00.000Z",
    expiresAt: t.expiring ? t.deadline : null,
  });
}

const byKind = {};
for (const L of listings) byKind[L.kind] = (byKind[L.kind] || 0) + 1;
console.log(JSON.stringify(byKind));
console.log("total", listings.length);
if (listings.length < 40) throw new Error("Need 40+");
if (byKind.sale !== 16) throw new Error("sales " + byKind.sale);
if (byKind["business-rental"] !== 8) throw new Error("rentals");
if (byKind["premises-lease"] !== 6) throw new Error("leases");
if (byKind["management-contract"] !== 5) throw new Error("mgmt");
if (byKind["service-tender"] !== 5) throw new Error("tenders");

function serialize(value, indent) {
  const pad = "  ".repeat(indent);
  const padIn = "  ".repeat(indent + 1);
  if (value === null) return "null";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    if (value.every((v) => typeof v === "string")) {
      return (
        "[\n" +
        value.map((v) => padIn + JSON.stringify(v)).join(",\n") +
        ",\n" +
        pad +
        "]"
      );
    }
    return (
      "[\n" +
      value.map((v) => padIn + serialize(v, indent + 1)).join(",\n") +
      ",\n" +
      pad +
      "]"
    );
  }
  if (typeof value === "object") {
    const keys = Object.keys(value);
    return (
      "{\n" +
      keys
        .map((k) => {
          const key = /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(k) ? k : JSON.stringify(k);
          return padIn + key + ": " + serialize(value[k], indent + 1);
        })
        .join(",\n") +
      ",\n" +
      pad +
      "}"
    );
  }
  throw new Error("bad value");
}

const header = `import type { ListingCommercial } from "@/features/listings/types";
import type { ListingPublicationStatus, OpportunityKind } from "@/lib/constants";

export type SeedListing = {
  id: string;
  publicCode: string;
  workspaceId: "base";
  kind: OpportunityKind;
  slug: string;
  title: string;
  summary: string;
  description: string;
  status: ListingPublicationStatus;
  citySlug: string;
  industrySlug: string;
  timeZone: string;
  confidential: boolean;
  locationLabel: string;
  heroImage: string;
  galleryJson: string[];
  commercial: ListingCommercial;
  operations: Record<string, unknown>;
  inclusions: string[];
  exclusions: string[];
  brokerSlug?: string;
  publishedAt: string | null;
  expiresAt?: string | null;
};

/**
 * Fictional demonstration listings for NashBizHub.
 * Includes five ANCHOR records with stable publicCode values used by product demos.
 */
export const listingFixtures: SeedListing[] = `;

const footer = `

export const anchorListingSlugs = [
  "riverside-cafe-nashville",
  "cumberland-laundry-clarksville",
  "market-square-retail-suite-murfreesboro",
  "volunteer-lodge-operations-knoxville",
  "five-store-cleaning-program-chattanooga",
] as const;

export function listingsByKind(): Record<OpportunityKind, number> {
  return listingFixtures.reduce(
    (acc, listing) => {
      acc[listing.kind] = (acc[listing.kind] ?? 0) + 1;
      return acc;
    },
    {
      sale: 0,
      "business-rental": 0,
      "premises-lease": 0,
      "management-contract": 0,
      "service-tender": 0,
    } satisfies Record<OpportunityKind, number>,
  );
}
`;

fs.writeFileSync(path, header + serialize(listings, 0) + " satisfies SeedListing[];" + footer);
console.log("Wrote", path.pathname, "bytes", fs.statSync(path).size);
