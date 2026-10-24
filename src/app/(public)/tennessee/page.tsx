import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { tennesseeCities } from "@/config/tennessee-locations";
import { cityHeroImages, siteHeroImage } from "@/config/listing-images";
import { listPublicListings } from "@/server/repositories/sqlite/listings";
import { Button } from "@/components/ui/button";

export const metadata = buildPageMetadata({
  title: "Tennessee business opportunities",
  description:
    "Explore fictional NashBizHub inventory by Tennessee city across Middle, East, and West regions.",
  path: "/tennessee",
});

export default function TennesseeHubPage() {
  return (
    <div className="mx-auto max-w-[80rem] space-y-10 px-4 py-10">
      <header className="on-dark overflow-hidden rounded-[var(--radius-dialog)] bg-[linear-gradient(125deg,#081827_0%,#0b3d91_55%,#1e6ef4_100%)] px-6 py-10 text-white sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] !text-[#5CB8FF]">
          Explore Tennessee
        </p>
        <h1 className="mt-2 !text-white">Tennessee city hubs</h1>
        <p className="mt-3 max-w-2xl !text-white/85">
          Browse fictional demo inventory by city across Middle, East, and West Tennessee.
        </p>
        <Button asChild className="mt-6 !text-white">
          <Link href="/businesses-for-sale">Browse all sales</Link>
        </Button>
      </header>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tennesseeCities.map((city) => {
          const count = listPublicListings({ citySlug: city.slug, pageSize: 1 }).total;
          return (
            <li key={city.slug}>
              <Link
                href={`/tennessee/${city.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-[var(--surface-card)] ring-1 ring-[var(--border-subtle)] transition hover:-translate-y-0.5 hover:ring-[var(--brand-blue-accessible-light)] motion-reduce:transform-none"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={cityHeroImages[city.slug] ?? siteHeroImage}
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081827]/75 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h2 className="font-[family-name:var(--font-google-sans)] text-2xl font-bold !text-[#5CB8FF]">
                      {city.name}
                    </h2>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-blue-accessible-light)]">
                    <MapPin className="h-3.5 w-3.5" aria-hidden />
                    {city.region}
                  </p>
                  <p className="mt-2 flex-1 text-sm text-[var(--text-body)]">{city.summary}</p>
                  <p className="mt-4 flex items-center justify-between text-sm font-medium text-[var(--brand-blue-accessible-light)]">
                    <span>
                      {count} listing{count === 1 ? "" : "s"}
                    </span>
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
