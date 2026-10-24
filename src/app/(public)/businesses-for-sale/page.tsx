import { Suspense } from "react";
import {
  KindSearchFallback,
  KindSearchPage,
} from "@/features/listings/components/kind-search-page";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Businesses for sale in Tennessee",
  description:
    "Browse fictional Tennessee businesses for sale across cafés, retail, lodging, and professional services.",
  path: "/businesses-for-sale",
});

const title = "Businesses for sale";
const description =
  "Fictional asset and enterprise sale opportunities across Tennessee demonstration inventory.";

export default function BusinessesForSalePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <Suspense fallback={<KindSearchFallback title={title} description={description} />}>
      <KindSearchPage
        kind="sale"
        path="/businesses-for-sale"
        title={title}
        description={description}
        searchParams={searchParams}
      />
    </Suspense>
  );
}
