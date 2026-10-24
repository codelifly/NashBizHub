import { buildPageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";
import { OperatePathPage } from "@/features/operate/components/operate-path-page";
import { leaseChecklist } from "@/config/operate-and-manage";
import { listPublicListings } from "@/server/repositories/sqlite/listings";

export const metadata = buildPageMetadata({
  title: `Lease premises | Operate & Manage | ${siteConfig.name}`,
  description:
    "Commercial premises for lease across Tennessee — space and permitted use without an assumed trading business.",
  path: "/operate-and-manage/lease-premises",
});

export default function LeasePremisesPage() {
  const listings = listPublicListings({
    kind: "premises-lease",
    pageSize: 6,
    sort: "newest",
  });

  return (
    <OperatePathPage
      eyebrow="Lease"
      title="Lease commercial premises"
      lead="Premises listings are about space, fit-out and permitted use. They do not transfer a brand, customers or operating business unless a linked sale or rental is published separately."
      heroImage="/images/listings/retail-1.webp"
      primaryCta={{
        href: "/commercial-properties-for-lease",
        label: "Browse premises for lease",
      }}
      secondaryCta={{
        href: "/operate-and-manage/rent-to-operate",
        label: "Need a trading business instead?",
      }}
      checklist={leaseChecklist}
      listings={listings.items}
      listingsHeading="Featured premises"
      listingsHref="/commercial-properties-for-lease"
      listingsLabel="Browse with filters"
    />
  );
}
