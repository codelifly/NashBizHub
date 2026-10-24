import { Suspense } from "react";
import {
  KindSearchFallback,
  KindSearchPage,
} from "@/features/listings/components/kind-search-page";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Service contracts & tenders in Tennessee",
  description:
    "Find fictional service tenders with deadlines, eligibility, deliverables, and clarification processes.",
  path: "/service-contracts",
});

const title = "Service contracts & tenders";
const description =
  "Open service tenders with proposal deadlines, eligibility criteria, and milestone schedules.";

export default function ServiceContractsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <Suspense fallback={<KindSearchFallback title={title} description={description} />}>
      <KindSearchPage
        kind="service-tender"
        path="/service-contracts"
        title={title}
        description={description}
        searchParams={searchParams}
      />
    </Suspense>
  );
}
