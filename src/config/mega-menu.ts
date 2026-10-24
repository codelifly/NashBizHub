import { industries } from "@/config/industries";
import { tennesseeCities } from "@/config/tennessee-locations";

export const budgetBands = [
  { label: "Under $150k", href: "/businesses-for-sale?q=&sort=asking-asc" },
  { label: "$150k – $400k", href: "/businesses-for-sale?sort=newest" },
  { label: "$400k – $800k", href: "/businesses-for-sale?sort=asking-desc" },
  { label: "$800k+", href: "/businesses-for-sale?sort=asking-desc" },
  { label: "Undisclosed OK", href: "/businesses-for-sale" },
] as const;

export const rentBudgetBands = [
  { label: "Under $3k / mo", href: "/businesses-for-rent" },
  { label: "$3k – $6k / mo", href: "/businesses-for-rent" },
  { label: "$6k – $12k / mo", href: "/businesses-for-rent" },
  { label: "$12k+ / mo", href: "/businesses-for-rent" },
] as const;

/**
 * First primary nav item — owners appoint operators; operators run existing businesses.
 * Prefer this label over “We Manage Your Business” (implies the platform runs the company).
 */
export const operateMega = {
  id: "operate",
  label: "Operate & Manage",
  href: "/operate-and-manage",
  description:
    "Appoint a manager for your business — or step in as the operator under a clear contract.",
  featured: true,
  highlights: [
    {
      title: "Hire an operator",
      body: "Publish a management invitation with term, duties and reporting.",
      href: "/operate-and-manage/hire-an-operator",
      accent: "Owners",
    },
    {
      title: "Become the operator",
      body: "Browse open management appointments across Tennessee.",
      href: "/operate-and-manage/become-an-operator",
      accent: "Operators",
    },
    {
      title: "Rent to operate",
      body: "Run an existing business and its assets for a fixed term.",
      href: "/operate-and-manage/rent-to-operate",
      accent: "Rentals",
    },
    {
      title: "Lease the space",
      body: "Premises only — no trading business included.",
      href: "/operate-and-manage/lease-premises",
      accent: "Lease",
    },
  ],
  columns: [
    {
      title: "For owners",
      links: [
        {
          label: "Operate & Manage hub",
          href: "/operate-and-manage",
          hint: "Choose your path",
        },
        {
          label: "Hire an operator",
          href: "/operate-and-manage/hire-an-operator",
          hint: "Owner guide + samples",
        },
        {
          label: "Post a management invitation",
          href: "/post-a-contract",
          hint: "Define duties & term",
        },
        {
          label: "Rent out your business",
          href: "/rent-out-your-business",
          hint: "Operator takes the keys",
        },
        {
          label: "My agreements",
          href: "/dashboard/agreements",
          hint: "Active terms (demo)",
        },
      ],
    },
    {
      title: "For operators",
      links: [
        {
          label: "Become an operator",
          href: "/operate-and-manage/become-an-operator",
          hint: "Guide + appointments",
        },
        {
          label: "Browse management contracts",
          href: "/management-contracts",
          hint: "Decision rights & KPIs",
        },
        {
          label: "Rent to operate",
          href: "/operate-and-manage/rent-to-operate",
          hint: "Business + assets",
        },
        {
          label: "Lease premises",
          href: "/operate-and-manage/lease-premises",
          hint: "Space only",
        },
        {
          label: "Operator walkthrough",
          href: "/how-it-works/operators",
          hint: "Apply → handover",
        },
      ],
    },
    {
      title: "Live catalogues",
      links: [
        {
          label: "Management contracts",
          href: "/management-contracts",
          hint: "Open appointments",
        },
        {
          label: "Businesses for rent",
          href: "/businesses-for-rent",
          hint: "Operating packages",
        },
        {
          label: "Premises for lease",
          href: "/commercial-properties-for-lease",
          hint: "Commercial shells",
        },
        {
          label: "Contracts hub",
          href: "/contracts",
          hint: "Management vs tenders",
        },
        {
          label: "Tennessee cities",
          href: "/tennessee",
          hint: "Market landings",
        },
      ],
    },
  ],
  cta: {
    title: "Keep ownership. Share operations.",
    body: "Management appointments and operating rentals stay separate from buying a business — with clear inclusions and handback.",
    primary: { label: "Explore Operate & Manage", href: "/operate-and-manage" },
    secondary: { label: "Browse management contracts", href: "/management-contracts" },
  },
} as const;

export const buyMega = {
  id: "buy",
  label: "Buy a Business",
  href: "/businesses-for-sale",
  description: "Ownership opportunities with asking price, revenue and earnings labels.",
  columns: [
    {
      title: "Industries",
      links: industries.slice(0, 8).map((i) => ({
        label: i.name,
        href: `/businesses-for-sale?industry=${i.slug}`,
        hint: i.summary,
      })),
    },
    {
      title: "Cities",
      links: tennesseeCities.slice(0, 8).map((c) => ({
        label: c.name,
        href: `/tennessee/${c.slug}`,
        hint: c.region,
      })),
    },
    {
      title: "Budget & tools",
      links: [
        ...budgetBands.map((b) => ({ label: b.label, href: b.href, hint: "Sale search" })),
        { label: "Compare shortlist", href: "/compare", hint: "Up to 4 listings" },
        { label: "Buyer requirements", href: "/requirements", hint: "Publish what you seek" },
        { label: "How buying works", href: "/how-it-works/buyers", hint: "Step-by-step" },
      ],
    },
  ],
  cta: {
    title: "Ready to shortlist?",
    body: "Save favorites, compare side by side, then inquire with funding context.",
    primary: { label: "Browse businesses for sale", href: "/businesses-for-sale" },
    secondary: { label: "Buyer guide", href: "/how-it-works/buyers" },
  },
} as const;

export const sellMega = {
  id: "sell",
  label: "Sell a Business",
  href: "/sell-your-business",
  description: "List ownership or assets with a guided wizard and moderation review.",
  columns: [
    {
      title: "Get started",
      links: [
        { label: "Seller overview", href: "/sell-your-business", hint: "Plain-language steps" },
        { label: "Post a sale listing", href: "/dashboard/listings/new", hint: "Start wizard" },
        { label: "My listings", href: "/dashboard/listings", hint: "Drafts & live" },
        { label: "Prepare a listing guide", href: "/resources/preparing-a-listing", hint: "Checklist" },
      ],
    },
    {
      title: "Popular industries",
      links: industries.slice(0, 6).map((i) => ({
        label: i.name,
        href: `/industries/${i.slug}`,
        hint: "Category page",
      })),
    },
    {
      title: "Seller tools",
      links: [
        { label: "Inquiries inbox", href: "/dashboard/inquiries", hint: "Respond to buyers" },
        { label: "Offers & counters", href: "/dashboard/offers", hint: "Negotiate versions" },
        { label: "Document room", href: "/dashboard/deals", hint: "After NDA simulation" },
        { label: "How selling works", href: "/how-it-works/sellers", hint: "Walkthrough" },
      ],
    },
  ],
  cta: {
    title: "List with clear inclusions",
    body: "Separate sale fields from rentals and premises so buyers know what they are buying.",
    primary: { label: "Post an opportunity", href: "/dashboard/listings/new" },
    secondary: { label: "Seller guide", href: "/how-it-works/sellers" },
  },
} as const;

export const rentMega = {
  id: "rent",
  label: "Rent or Lease",
  href: "/businesses-for-rent",
  description:
    "Rent an operating business — or lease commercial premises. Filters and forms keep the difference clear.",
  columns: [
    {
      title: "Rent vs lease",
      links: [
        {
          label: "Rent a business",
          href: "/businesses-for-rent",
          hint: "Trading business + included assets",
        },
        {
          label: "Lease premises",
          href: "/commercial-properties-for-lease",
          hint: "Space only — no business transfer",
        },
        {
          label: "Management contracts",
          href: "/management-contracts",
          hint: "Operate for an owner",
        },
        {
          label: "Rent out your business",
          href: "/rent-out-your-business",
          hint: "Owner path",
        },
        {
          label: "Operate & Manage hub",
          href: "/operate-and-manage",
          hint: "All operator paths",
        },
      ],
    },
    {
      title: "Industries",
      links: industries
        .filter((i) =>
          ["laundromats", "restaurants-cafes", "retail", "convenience-stores", "gas-stations", "hotels-motels"].includes(
            i.slug,
          ),
        )
        .map((i) => ({
          label: i.name,
          href: `/businesses-for-rent?industry=${i.slug}`,
          hint: i.summary,
        })),
    },
    {
      title: "Budget & cities",
      links: [
        ...rentBudgetBands.map((b) => ({ label: b.label, href: b.href, hint: "Rental search" })),
        { label: "Nashville rentals", href: "/businesses-for-rent?city=nashville", hint: "Middle TN" },
        { label: "Clarksville rentals", href: "/businesses-for-rent?city=clarksville", hint: "Anchor laundry" },
        { label: "Operator guide", href: "/how-it-works/operators", hint: "Apply & handover" },
      ],
    },
  ],
  cta: {
    title: "Apply as an operator",
    body: "Submit experience, proposed start date and operating plan — then track obligations.",
    primary: { label: "Browse operating rentals", href: "/businesses-for-rent" },
    secondary: { label: "Operator guide", href: "/how-it-works/operators" },
  },
} as const;

export const moreMega = {
  id: "more",
  label: "More",
  href: "/resources",
  description: "Contracts, brokers, guides and help.",
  columns: [
    {
      title: "Contracts",
      links: [
        { label: "Contracts hub", href: "/contracts", hint: "Management + tenders" },
        { label: "Management contracts", href: "/management-contracts", hint: "Operate an owner's business" },
        { label: "Service tenders", href: "/service-contracts", hint: "Bid on defined work" },
        { label: "Post a contract", href: "/post-a-contract", hint: "Choose management or service" },
        { label: "Contractor guide", href: "/how-it-works/contractors", hint: "Bidding walkthrough" },
      ],
    },
    {
      title: "Find a Broker",
      links: [
        { label: "Broker directory", href: "/brokers", hint: "Fictional advisers" },
        { label: "How brokers help", href: "/how-it-works/brokers", hint: "Representation" },
        { label: "Contact Summit Demo", href: "/brokers/summit-business-partners-demo", hint: "Sample profile" },
      ],
    },
    {
      title: "Resources & help",
      links: [
        { label: "Guides & articles", href: "/resources", hint: "Tennessee preparation" },
        { label: "Video tours", href: "/tours", hint: "Watch walkthroughs" },
        { label: "Glossary", href: "/glossary", hint: "Opportunity terms" },
        { label: "Help center", href: "/help", hint: "FAQs & support" },
        { label: "Membership", href: "/membership", hint: "Demo entitlements" },
        { label: "About NashBizHub", href: "/about", hint: "Platform purpose" },
        { label: "Contact", href: "/contact", hint: "General inquiry" },
        { label: "Tennessee hub", href: "/tennessee", hint: "All cities" },
        { label: "Demo Center", href: "/demo", hint: "Personas & scenarios" },
      ],
    },
  ],
  cta: {
    title: "Need a guided path?",
    body: "Use How it works for buyers, sellers, operators, contractors or brokers.",
    primary: { label: "How it works", href: "/how-it-works" },
    secondary: { label: "Open help", href: "/help" },
  },
} as const;

export const megaMenus = [operateMega, buyMega, sellMega, rentMega, moreMega] as const;
