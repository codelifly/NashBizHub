import { Suspense } from "react";
import {
  KindSearchFallback,
  KindSearchPage,
} from "@/features/listings/components/kind-search-page";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Management contracts in Tennessee",
  description:
    "Review fictional management contract proposals with decision rights, duties, and reporting expectations.",
  path: "/management-contracts",
});

const title = "Management contracts";
const description =
  "Management proposals covering term, commercial model, duties, and performance measures.";

export default function ManagementContractsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <Suspense fallback={<KindSearchFallback title={title} description={description} />}>
      <KindSearchPage
        kind="management-contract"
        path="/management-contracts"
        title={title}
        description={description}
        searchParams={searchParams}
      />
    </Suspense>
  );
}
