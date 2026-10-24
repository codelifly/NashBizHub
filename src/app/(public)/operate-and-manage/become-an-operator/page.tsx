import { buildPageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";
import { OperatePathPage } from "@/features/operate/components/operate-path-page";
import { operatorChecklist } from "@/config/operate-and-manage";
import { listPublicListings } from "@/server/repositories/sqlite/listings";

export const metadata = buildPageMetadata({
  title: `Become an operator | Operate & Manage | ${siteConfig.name}`,
  description:
    "Browse Tennessee management contracts and practice operator proposals with decision rights, duties and KPIs.",
  path: "/operate-and-manage/become-an-operator",
});

export default function BecomeAnOperatorPage() {
  const listings = listPublicListings({
    kind: "management-contract",
    pageSize: 6,
    sort: "newest",
  });

  return (
    <OperatePathPage
      eyebrow="Operators"
      title="Become the operator"
      lead="Step into an owner’s Tennessee business under a clear appointment — lodging, retail and service categories with realistic demo photos and commercial fields."
      heroImage="/images/listings/office-1.webp"
      primaryCta={{
        href: "/management-contracts",
        label: "Browse management contracts",
      }}
      secondaryCta={{
        href: "/how-it-works/operators",
        label: "Operator walkthrough",
      }}
      checklist={operatorChecklist}
      listings={listings.items}
      listingsHeading="Open management appointments"
      listingsHref="/management-contracts"
      listingsLabel="View full catalogue"
    />
  );
}
