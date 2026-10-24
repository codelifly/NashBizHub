/** Operate & Manage section — public paths with demo imagery and copy. */

export const operateSubnav = [
  { href: "/operate-and-manage", label: "Overview", exact: true },
  { href: "/operate-and-manage/hire-an-operator", label: "Hire an operator" },
  { href: "/operate-and-manage/become-an-operator", label: "Become an operator" },
  { href: "/operate-and-manage/rent-to-operate", label: "Rent to operate" },
  { href: "/operate-and-manage/lease-premises", label: "Lease premises" },
] as const;

export const operateStats = [
  { label: "Open management appointments", value: "5", hint: "Demo catalogue" },
  { label: "Operating rentals", value: "8", hint: "Business + assets" },
  { label: "Premises for lease", value: "6", hint: "Space only" },
  { label: "Tennessee markets", value: "10", hint: "City landings" },
] as const;

export const operateCitySpotlights = [
  {
    slug: "nashville",
    name: "Nashville",
    blurb: "Music Row lodging ops and café rentals near tourist corridors.",
    image: "/images/tennessee/nashville.webp",
    focus: "Management · Rentals",
  },
  {
    slug: "memphis",
    name: "Memphis",
    blurb: "Downtown inns, retail shells, and cleaning-adjacent tenders.",
    image: "/images/tennessee/memphis.webp",
    focus: "Management · Lease",
  },
  {
    slug: "knoxville",
    name: "Knoxville",
    blurb: "Lodge operations and suburban premises with clear use language.",
    image: "/images/tennessee/knoxville.webp",
    focus: "Management · Lease",
  },
  {
    slug: "clarksville",
    name: "Clarksville",
    blurb: "Anchor laundry rentals and packaged operating assets.",
    image: "/images/tennessee/clarksville.webp",
    focus: "Rent to operate",
  },
  {
    slug: "chattanooga",
    name: "Chattanooga",
    blurb: "Riverfront retail shells and hospitality management invites.",
    image: "/images/tennessee/chattanooga.webp",
    focus: "Lease · Management",
  },
  {
    slug: "franklin",
    name: "Franklin",
    blurb: "Boutique premises and owner-operated retail packages.",
    image: "/images/tennessee/franklin.webp",
    focus: "Lease · Rentals",
  },
] as const;

export const operatePathCards = [
  {
    slug: "hire",
    href: "/operate-and-manage/hire-an-operator",
    eyebrow: "Owners",
    title: "Hire an operator",
    body: "Keep ownership. Publish term, duties, decision rights and reporting so operators can propose with confidence.",
    image: "/images/listings/motel-2.webp",
    cta: "Owner guide",
    browseHref: "/management-contracts",
    browseLabel: "See open appointments",
  },
  {
    slug: "become",
    href: "/operate-and-manage/become-an-operator",
    eyebrow: "Operators",
    title: "Become an operator",
    body: "Step into an owner’s business under a management appointment — without buying the company.",
    image: "/images/listings/office-1.webp",
    cta: "Operator guide",
    browseHref: "/management-contracts",
    browseLabel: "Browse appointments",
  },
  {
    slug: "rent",
    href: "/operate-and-manage/rent-to-operate",
    eyebrow: "Rent",
    title: "Rent to operate",
    body: "Run a packaged trading business and its included assets for a fixed term, then hand back cleanly.",
    image: "/images/listings/laundry-1.webp",
    cta: "Rental guide",
    browseHref: "/businesses-for-rent",
    browseLabel: "Browse rentals",
  },
  {
    slug: "lease",
    href: "/operate-and-manage/lease-premises",
    eyebrow: "Lease",
    title: "Lease the premises",
    body: "Commercial space without an assumed brand, customers or operating business transfer.",
    image: "/images/listings/retail-1.webp",
    cta: "Premises guide",
    browseHref: "/commercial-properties-for-lease",
    browseLabel: "Browse premises",
  },
] as const;

export const operateCompareRows = [
  {
    topic: "What you get",
    hire: "Operator proposals to run your owned business",
    become: "Authority to operate under agreed duties",
    rent: "Trading business + included assets for a term",
    lease: "Premises / shell only",
  },
  {
    topic: "Ownership",
    hire: "Stays with you",
    become: "Stays with the owner",
    rent: "Stays with the owner",
    lease: "Landlord retains property",
  },
  {
    topic: "Primary action",
    hire: "Post invitation / review proposals",
    become: "Submit operator proposal",
    rent: "Apply to rent & operate",
    lease: "Request viewing / lease application",
  },
  {
    topic: "Demo listings",
    hire: "Management contracts",
    become: "Management contracts",
    rent: "Businesses for rent",
    lease: "Commercial premises",
  },
] as const;

export const hireChecklist = [
  {
    title: "Confirm what the operator controls",
    body: "Staffing within budget, vendors, pricing bands and guest experience — vs what stays with you.",
  },
  {
    title: "Set term and commercial model",
    body: "Fixed fee, revenue share or hybrid. Label periods clearly (monthly vs annual).",
  },
  {
    title: "List reporting and KPIs",
    body: "P&L cadence, occupancy, guest scores or production metrics — whatever fits the industry.",
  },
  {
    title: "Separate private evidence",
    body: "Upload public photos for the gallery; keep identity docs and full financials behind demo NDA gates.",
  },
] as const;

export const operatorChecklist = [
  {
    title: "Match experience to the category",
    body: "Lodging, laundry, café or retail each need different operating evidence in the demo application.",
  },
  {
    title: "Read decision rights carefully",
    body: "Know what you can change day-to-day versus what needs owner approval.",
  },
  {
    title: "Plan your first 90 days",
    body: "Staffing, vendors, reporting rhythm and guest/customer continuity — practice in the proposal form.",
  },
  {
    title: "Track obligations after award",
    body: "Demo agreements carry recurring reports and handback tasks in your workspace.",
  },
] as const;

export const rentChecklist = [
  {
    title: "Inclusions vs exclusions",
    body: "Equipment, brand rights, stock and premises arrangements must be explicit — rent is not a sale.",
  },
  {
    title: "Security and handback",
    body: "Deposit language, condition expectations and return of assets at term end.",
  },
  {
    title: "Rent basis and period",
    body: "Fixed monthly, revenue share or combination — never leave the period unlabeled.",
  },
  {
    title: "Operator responsibilities",
    body: "Day-to-day ops, maintenance bands and insurance evidence in the demo packet.",
  },
] as const;

export const leaseChecklist = [
  {
    title: "Space and permitted use",
    body: "Square footage, zoning-friendly use notes and fit-out condition (as-is shell vs fixtures).",
  },
  {
    title: "No implied trading business",
    body: "Premises listings must not claim customers, brand or operating history unless separately offered.",
  },
  {
    title: "Outgoings clarity",
    body: "Demo NNN-style estimates and viewing notes so applicants know what to ask next.",
  },
  {
    title: "Schedule a viewing",
    body: "Use the appointments flow after inquiry — keep times in the listing’s local zone.",
  },
] as const;
