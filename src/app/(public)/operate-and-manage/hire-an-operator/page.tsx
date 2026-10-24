import { buildPageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";
import { OperatePathPage } from "@/features/operate/components/operate-path-page";
import { hireChecklist } from "@/config/operate-and-manage";
import { listPublicListings } from "@/server/repositories/sqlite/listings";

export const metadata = buildPageMetadata({
  title: `Hire an operator | Operate & Manage | ${siteConfig.name}`,
  description:
    "Publish a Tennessee management invitation with term, duties, decision rights and reporting — fictional demo workflow.",
  path: "/operate-and-manage/hire-an-operator",
});

export default function HireAnOperatorPage() {
  const listings = listPublicListings({
    kind: "management-contract",
    pageSize: 6,
    sort: "newest",
  });

  return (
    <OperatePathPage
      eyebrow="Owners"
      title="Hire an operator for your business"
      lead="Keep ownership while inviting operators to propose a term, commercial model and operating plan. Use demo management listings as examples of what applicants will see."
      heroImage="/images/listings/motel-2.webp"
      primaryCta={{
        href: "/post-a-contract",
        label: "Post a management invitation",
      }}
      secondaryCta={{
        href: "/rent-out-your-business",
        label: "Prefer renting it out?",
      }}
      checklist={hireChecklist}
      listings={listings.items}
      listingsHeading="Example management appointments"
      listingsHref="/management-contracts"
      listingsLabel="Browse all appointments"
    />
  );
}
