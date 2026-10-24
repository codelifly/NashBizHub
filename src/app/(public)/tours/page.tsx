import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";
import { siteHeroImage } from "@/config/listing-images";
import { Button } from "@/components/ui/button";
import { BackToHome } from "@/components/shared/back-to-home";

export const metadata = buildPageMetadata({
  title: `Video tours | ${siteConfig.name}`,
  description:
    "Short walkthrough videos for buying, selling, renting and contracts on the NashBizHub demo.",
  path: "/tours",
});

const tours = [
  {
    id: "buyer",
    title: "Buyer journey",
    blurb: "Search · save · inquire · offer — from marketplace to customer panel.",
    poster: "/images/listings/cafe-1.webp",
    src: "/videos/demo-tour.mp4",
    href: "/how-it-works/buyers",
  },
  {
    id: "seller",
    title: "Seller journey",
    blurb: "Post a sale listing, qualify interest and move a deal forward.",
    poster: "/images/listings/restaurant-1.webp",
    src: "/videos/demo-tour.mp4",
    href: "/how-it-works/sellers",
  },
  {
    id: "operator",
    title: "Operator rental",
    blurb: "Apply to operate, compare duties and track handover obligations.",
    poster: "/images/listings/laundry-1.webp",
    src: "/videos/demo-tour.mp4",
    href: "/how-it-works/operators",
  },
  {
    id: "contracts",
    title: "Contracts hub",
    blurb: "Management appointments vs service tenders — separate forms and awards.",
    poster: "/images/listings/cleaning-1.webp",
    src: "/videos/demo-tour.mp4",
    href: "/contracts",
  },
] as const;

export default function ToursPage() {
  return (
    <div>
      <section className="on-dark relative isolate overflow-hidden">
        <Image src={siteHeroImage} alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(3,9,20,0.93),rgba(11,61,145,0.78))]" />
        <div className="relative mx-auto flex max-w-[80rem] flex-wrap items-end justify-between gap-6 px-4 py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] !text-[#5CB8FF]">
              Product tours
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-google-sans)] text-4xl font-bold !text-white sm:text-5xl">
              Watch how NashBizHub works
            </h1>
            <p className="mt-4 text-lg !text-white/85">
              Short demo reels with still posters from Tennessee inventory. Videos are illustrative —
              they do not depict real transactions.
            </p>
          </div>
          <BackToHome className="!border-white/30 !bg-white/10 !text-white hover:!bg-white/20" />
        </div>
      </section>

      <section className="mx-auto max-w-[80rem] px-4 py-14">
        <div className="grid gap-8 lg:grid-cols-2">
          {tours.map((tour, index) => (
            <article
              key={tour.id}
              className="rise-in overflow-hidden rounded-[1.25rem] border border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-sm"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative aspect-video bg-[#081827]">
                <video
                  className="h-full w-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                  poster={tour.poster}
                  aria-label={`${tour.title} demo video`}
                >
                  <source src={tour.src} />
                </video>
                <span className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[#081827]/75 px-2.5 py-1 text-xs font-semibold !text-white backdrop-blur">
                  <Play className="h-3 w-3" aria-hidden />
                  Demo reel
                </span>
              </div>
              <div className="p-5 sm:p-6">
                <h2 className="font-[family-name:var(--font-google-sans)] text-2xl font-semibold text-[var(--text-heading)]">
                  {tour.title}
                </h2>
                <p className="mt-2 text-[var(--text-body)]">{tour.blurb}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button asChild className="!text-white">
                    <Link href={tour.href}>Open walkthrough</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/demo">Demo Center</Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
