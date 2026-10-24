import { buildPageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";
import { OperatePathPage } from "@/features/operate/components/operate-path-page";
import { rentChecklist } from "@/config/operate-and-manage";
import { listPublicListings } from "@/server/repositories/sqlite/listings";

export const metadata = buildPageMetadata({
  title: `Rent to operate | Operate & Manage | ${siteConfig.name}`,
  description:
    "Run a packaged Tennessee business and its assets for a fixed term — laundry, café and retail demo rentals.",
  path: "/operate-and-manage/rent-to-operate",
});

export default function RentToOperatePage() {
  const listings = listPublicListings({
    kind: "business-rental",
    pageSize: 6,
    sort: "newest",
  });

  return (
    <OperatePathPage
      eyebrow="Rent"
      title="Rent to operate a business"
      lead="Operating rentals include the trading business and specified assets for a term. This is not a premises-only lease and not a purchase — review inclusions, security and handback on each demo card."
      heroImage="/images/listings/laundry-1.webp"
      primaryCta={{
        href: "/businesses-for-rent",
        label: "Browse operating rentals",
      }}
      secondaryCta={{
        href: "/rent-out-your-business",
        label: "Owners: rent yours out",
      }}
      checklist={rentChecklist}
      listings={listings.items}
      listingsHeading="Featured operating rentals"
      listingsHref="/businesses-for-rent"
      listingsLabel="Browse with filters"
    />
  );
}
