"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  MapPin,
  Sparkles,
} from "lucide-react";
import { StatusBadge } from "@/components/shared/status-badge";
import { ListingShareBar } from "@/features/listings/components/listing-share-bar";
import {
  getHeadlineLabel,
  getHeadlineValue,
} from "@/features/listings/lib/listing-highlights";
import { formatStatusLabel } from "@/features/listings/lib/format-listing-copy";
import { kindLabels, kindRoutes } from "@/features/listings/lib/kind-labels";
import type { PublicListing } from "@/features/listings/types";
import { cn } from "@/lib/utils";

export function ListingHero({
  listing,
  images,
}: {
  listing: PublicListing;
  images: string[];
}) {
  const gallery = images.length > 0 ? images : [];
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const current = gallery[Math.min(active, Math.max(gallery.length - 1, 0))];

  function prev() {
    if (!gallery.length) return;
    setActive((i) => (i - 1 + gallery.length) % gallery.length);
  }
  function next() {
    if (!gallery.length) return;
    setActive((i) => (i + 1) % gallery.length);
  }

  return (
    <header className="space-y-4">
      <section className="on-dark relative isolate overflow-hidden rounded-[1.5rem] shadow-[0_32px_80px_-48px_rgba(8,24,39,0.7)]">
        <div className="relative min-h-[28rem] sm:min-h-[32rem] lg:min-h-[36rem]">
          {current ? (
            <Image
              src={current}
              alt=""
              fill
              priority
              className="ken-burns object-cover"
              sizes="100vw"
            />
          ) : (
            <div className="absolute inset-0 bg-[#081827]" />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(3,9,20,0.92)_0%,rgba(8,24,39,0.72)_48%,rgba(30,110,244,0.45)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(92,184,255,0.22),transparent_55%)]" />

          <div className="relative z-10 flex h-full min-h-[28rem] flex-col justify-between p-5 sm:min-h-[32rem] sm:p-8 lg:min-h-[36rem] lg:p-10">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <StatusBadge
                  label={kindLabels[listing.kind]}
                  tone="info"
                  icon={<Sparkles className="h-3.5 w-3.5" aria-hidden />}
                />
                <StatusBadge label="Fictional demo" tone="neutral" />
                {listing.confidential ? (
                  <StatusBadge label="Confidential area" tone="warning" />
                ) : null}
                <StatusBadge
                  label={formatStatusLabel(listing.status)}
                  tone={
                    listing.status === "under-negotiation" ? "warning" : "success"
                  }
                />
              </div>

              {gallery.length > 0 ? (
                <div className="flex items-center gap-2">
                  {gallery.length > 1 ? (
                    <>
                      <button
                        type="button"
                        onClick={prev}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/12 !text-white ring-1 ring-white/20 backdrop-blur hover:bg-white/20"
                        aria-label="Previous photo"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={next}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/12 !text-white ring-1 ring-white/20 backdrop-blur hover:bg-white/20"
                        aria-label="Next photo"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => setLightbox(true)}
                    className="inline-flex h-10 items-center gap-2 rounded-full bg-white/12 px-3 text-sm font-semibold !text-white ring-1 ring-white/20 backdrop-blur hover:bg-white/20"
                  >
                    <Expand className="h-4 w-4" aria-hidden />
                    {gallery.length} photos · {active + 1}/{gallery.length}
                  </button>
                </div>
              ) : null}
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
              <div className="max-w-3xl space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] !text-[#5CB8FF]">
                  <Link
                    href={kindRoutes[listing.kind]}
                    className="hover:underline"
                  >
                    {kindLabels[listing.kind]}
                  </Link>
                  <span className="mx-2 !text-white/40">·</span>
                  <Link
                    href={`/tennessee/${listing.citySlug}`}
                    className="hover:underline"
                  >
                    {listing.cityName}
                  </Link>
                </p>
                <h1 className="font-[family-name:var(--font-google-sans)] text-[clamp(2rem,1.4rem+2.4vw,3.4rem)] font-bold leading-[1.05] !text-white">
                  {listing.title}
                </h1>
                <p className="max-w-2xl text-base leading-relaxed !text-white/85 sm:text-lg">
                  {listing.summary}
                </p>
                <p className="inline-flex items-center gap-2 text-sm !text-white/75">
                  <MapPin className="h-4 w-4 !text-[#5CB8FF]" aria-hidden />
                  {listing.confidential
                    ? `${listing.cityName} area · exact address restricted`
                    : `${listing.locationLabel} · ${listing.cityName}, TN`}
                  <span className="!text-white/35">·</span>
                  <Link
                    href={`/industries/${listing.industrySlug}`}
                    className="font-medium !text-[#5CB8FF] hover:underline"
                  >
                    {listing.industryName}
                  </Link>
                </p>
                <p className="font-mono text-xs !text-white/55">
                  {listing.publicCode}
                  {listing.publishedAt
                    ? ` · Listed ${new Date(listing.publishedAt).toLocaleDateString("en-US")}`
                    : null}
                </p>
              </div>

              <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] !text-[#5CB8FF]">
                  {getHeadlineLabel(listing)}
                </p>
                <p className="mt-2 font-[family-name:var(--font-google-sans)] text-3xl font-bold leading-none !text-white">
                  {getHeadlineValue(listing)}
                </p>
                <p className="mt-3 text-sm leading-relaxed !text-white/75">
                  Demo figures only · not audited market values
                </p>
                <a
                  href="#contact-panel"
                  className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-[var(--radius-control)] bg-[#1E6EF4] text-sm font-semibold !text-white hover:bg-[#1E6EF4]/90"
                >
                  Contact / inquire
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {gallery.length > 1 ? (
        <ul className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:gap-3">
          {gallery.map((src, index) => (
            <li key={`${src}-${index}`}>
              <button
                type="button"
                onClick={() => setActive(index)}
                className={cn(
                  "relative aspect-[4/3] w-full overflow-hidden rounded-xl ring-2 transition",
                  index === active
                    ? "ring-[#1E6EF4]"
                    : "ring-transparent hover:ring-[var(--border-subtle)]",
                )}
                aria-label={`Show photo ${index + 1}`}
                aria-current={index === active}
              >
                <Image src={src} alt="" fill className="object-cover" sizes="140px" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <ListingShareBar title={listing.title} path={`/listings/${listing.slug}`} />

      {lightbox && current ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#081827]/92 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded gallery"
        >
          <button
            type="button"
            className="absolute inset-0"
            aria-label="Close gallery"
            onClick={() => setLightbox(false)}
          />
          <div className="relative z-10 w-full max-w-5xl">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
              <Image src={current} alt="" fill className="object-contain" sizes="100vw" />
            </div>
            <div className="mt-4 flex justify-center gap-3">
              <button
                type="button"
                onClick={prev}
                className="rounded-full bg-white/10 px-4 py-2 font-semibold !text-white"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setLightbox(false)}
                className="rounded-full bg-white/10 px-4 py-2 font-semibold !text-white"
              >
                Close
              </button>
              <button
                type="button"
                onClick={next}
                className="rounded-full bg-white/10 px-4 py-2 font-semibold !text-white"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
