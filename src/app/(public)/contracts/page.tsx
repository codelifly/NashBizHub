import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ClipboardList, FileSignature } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { ListingCard } from "@/features/listings/components/listing-card";
import { listPublicListings } from "@/server/repositories/sqlite/listings";

export const metadata = buildPageMetadata({
  title: `Contracts | ${siteConfig.name}`,
  description:
    "Management contracts and service tenders — two distinct opportunity types with separate applications and award records.",
  path: "/contracts",
});

export default function ContractsHubPage() {
  const management = listPublicListings({
    kind: "management-contract",
    pageSize: 3,
  }).items;
  const tenders = listPublicListings({
    kind: "service-tender",
    pageSize: 3,
  }).items;

  return (
    <div>
      <section className="on-dark relative isolate overflow-hidden">
        <Image
          src="/images/listings/motel-1.webp"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(3,9,20,0.92)_0%,rgba(8,24,39,0.85)_55%,rgba(30,110,244,0.7)_100%)]" />
        <div className="relative mx-auto max-w-[80rem] px-4 py-20 sm:py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] !text-[#5CB8FF]">
            Contracts hub
          </p>
          <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-google-sans)] text-4xl font-bold !text-white sm:text-5xl">
            Management appointments and service tenders
          </h1>
          <p className="mt-4 max-w-2xl text-lg !text-white/85">
            The proposal keeps these separate: run someone else&apos;s business under a management
            arrangement, or bid to deliver defined work. Shared messaging — different forms and
            awards.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="!text-white">
              <Link href="/management-contracts">Browse management</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 !text-white hover:bg-white/10"
            >
              <Link href="/service-contracts">Browse service tenders</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="!text-white hover:bg-white/10">
              <Link href="/">← Back to home</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[80rem] gap-6 px-4 py-14 md:grid-cols-2">
        <article className="rise-in overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)]">
          <div className="relative h-44">
            <Image
              src="/images/listings/motel-2.webp"
              alt=""
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
          <div className="p-6">
            <FileSignature className="h-6 w-6 text-[var(--brand-blue-accessible-light)]" aria-hidden />
            <h2 className="mt-3 text-2xl">Management contracts</h2>
            <p className="mt-2 text-[var(--text-body)]">
              Owners invite operators to run a business for a term — fee or revenue share, decision
              rights and handback rules.
            </p>
            <Button asChild className="mt-5 !text-white">
              <Link href="/management-contracts">
                Open management search <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </article>
        <article
          className="rise-in overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)]"
          style={{ animationDelay: "60ms" }}
        >
          <div className="relative h-44">
            <Image
              src="/images/listings/cleaning-1.webp"
              alt=""
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
          <div className="p-6">
            <ClipboardList className="h-6 w-6 text-[var(--brand-blue-accessible-light)]" aria-hidden />
            <h2 className="mt-3 text-2xl">Service tenders</h2>
            <p className="mt-2 text-[var(--text-body)]">
              Publish a scope of work, closing date and evaluation checklist. Contractors submit
              sealed proposals — competitors stay private.
            </p>
            <Button asChild className="mt-5 !text-white">
              <Link href="/service-contracts">
                Open tender search <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </article>
      </section>

      {management.length > 0 ? (
        <section className="mx-auto max-w-[80rem] px-4 pb-10">
          <h2 className="text-2xl">Featured management opportunities</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {management.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>
      ) : null}

      {tenders.length > 0 ? (
        <section className="mx-auto max-w-[80rem] px-4 pb-16">
          <h2 className="text-2xl">Featured service tenders</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tenders.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
