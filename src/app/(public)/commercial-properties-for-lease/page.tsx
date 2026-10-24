import { Suspense } from "react";
import {
  KindSearchFallback,
  KindSearchPage,
} from "@/features/listings/components/kind-search-page";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Commercial properties for lease in Tennessee",
  description:
    "Browse fictional Tennessee premises leases with square footage, use, and base rent disclosures.",
  path: "/commercial-properties-for-lease",
});

const title = "Commercial properties for lease";
const description =
  "Premises lease opportunities with use, fit-out, outgoings, and viewing notes for sandbox demos.";

export default function CommercialPropertiesForLeasePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <Suspense fallback={<KindSearchFallback title={title} description={description} />}>
      <KindSearchPage
        kind="premises-lease"
        path="/commercial-properties-for-lease"
        title={title}
        description={description}
        searchParams={searchParams}
      />
    </Suspense>
  );
}
