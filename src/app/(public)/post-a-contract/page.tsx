import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { BackToHome } from "@/components/shared/back-to-home";
import { ListingCard } from "@/features/listings/components/listing-card";
import { listPublicListings } from "@/server/repositories/sqlite/listings";

export const metadata = buildPageMetadata({
  title: `Post a contract | ${siteConfig.name}`,
  description:
    "Publish fictional management invitations or service tenders with Tennessee demo imagery and realistic commercial fields.",
  path: "/post-a-contract",
});

export default function PostAContractPage() {
  const management = listPublicListings({
    kind: "management-contract",
    pageSize: 3,
    sort: "newest",
  });

  return (
    <div>
      <section className="on-dark relative isolate overflow-hidden">
        <Image
          src="/images/listings/office-1.webp"
          alt=""
          fill
          priority
          className="ken-burns object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(3,9,20,0.94)_0%,rgba(11,61,145,0.85)_55%,rgba(30,110,244,0.7)_100%)]" />
        <div className="relative mx-auto w-full max-w-[80rem] px-4 py-16 sm:py-22">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] !text-[#5CB8FF]">
            Operate & Manage · Owners
          </p>
          <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-google-sans)] text-4xl font-bold !text-white sm:text-5xl">
            Post a management invitation
          </h1>
          <p className="mt-4 max-w-2xl text-lg !text-white/85">
            Define term, commercial model, duties and reporting. Operators see the same
            public fields used on Volunteer Lodge, Music Row Extended Stay and other demo
            appointments.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="!text-white">
              <Link href="/login?next=/dashboard/listings/new">
                Create a contract listing
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 !text-white hover:bg-white/10"
            >
              <Link href="/operate-and-manage/hire-an-operator">Owner guide</Link>
            </Button>
            <BackToHome className="!border-white/30 !bg-white/10 !text-white hover:!bg-white/20" />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[80rem] px-4 py-14">
        <div className="grid gap-6 md:grid-cols-2">
          <article className="overflow-hidden rounded-[1.25rem] border border-[var(--border-subtle)] bg-[var(--surface-card)]">
            <div className="relative aspect-[16/9]">
              <Image
                src="/images/listings/motel-1.webp"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            <div className="space-y-3 p-6">
              <h2 className="font-[family-name:var(--font-google-sans)] text-xl font-semibold">
                Management contracts
              </h2>
              <p className="text-sm leading-relaxed text-[var(--text-body)]">
                Outline proposed term, commercial model, duties, reporting cadence and
                performance measures so operators can evaluate fit before inquiring.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button asChild size="sm" className="!text-white">
                  <Link href="/management-contracts">Browse examples</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href="/operate-and-manage/hire-an-operator">
                    Hire checklist
                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </article>

          <article className="overflow-hidden rounded-[1.25rem] border border-[var(--border-subtle)] bg-[var(--surface-card)]">
            <div className="relative aspect-[16/9]">
              <Image
                src="/images/listings/cleaning-1.webp"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            <div className="space-y-3 p-6">
              <h2 className="font-[family-name:var(--font-google-sans)] text-xl font-semibold">
                Service tenders
              </h2>
              <p className="text-sm leading-relaxed text-[var(--text-body)]">
                Separate from management appointments: deadlines, deliverables, eligibility
                and milestones for defined work programs.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button asChild size="sm" className="!text-white">
                  <Link href="/service-contracts">Browse tenders</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href="/contracts">Contracts hub</Link>
                </Button>
              </div>
            </div>
          </article>
        </div>

        <div className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--brand-blue-accessible-light)]">
                Sample appointments
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-google-sans)]">
                What operators will see
              </h2>
            </div>
            <Button asChild variant="outline">
              <Link href="/management-contracts">View all</Link>
            </Button>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {management.items.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}