import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackToHome } from "@/components/shared/back-to-home";
import { ListingCard } from "@/features/listings/components/listing-card";
import { OperateSubnav } from "@/features/operate/components/operate-subnav";
import {
  operateCitySpotlights,
  operateStats,
} from "@/config/operate-and-manage";
import type { ListingCardData } from "@/features/listings/types";

type ChecklistItem = { title: string; body: string };

export function OperatePathPage({
  eyebrow,
  title,
  lead,
  heroImage,
  primaryCta,
  secondaryCta,
  checklist,
  listings,
  listingsHeading,
  listingsHref,
  listingsLabel,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  heroImage: string;
  primaryCta: { href: string; label: string };
  secondaryCta: { href: string; label: string };
  checklist: readonly ChecklistItem[];
  listings: ListingCardData[];
  listingsHeading: string;
  listingsHref: string;
  listingsLabel: string;
}) {
  return (
    <div>
      <OperateSubnav />

      <section className="on-dark relative isolate overflow-hidden">
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          className="ken-burns object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(3,9,20,0.94)_0%,rgba(8,24,39,0.88)_48%,rgba(30,110,244,0.7)_100%)]" />
        <div className="relative mx-auto w-full max-w-[80rem] px-4 py-16 sm:py-22">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] !text-[#5CB8FF]">
            Operate & Manage · {eyebrow}
          </p>
          <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-google-sans)] text-4xl font-bold !text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg !text-white/85">{lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="!text-white">
              <Link href={primaryCta.href}>{primaryCta.label}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 !text-white hover:bg-white/10"
            >
              <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
            </Button>
            <BackToHome className="!border-white/30 !bg-white/10 !text-white hover:!bg-white/20" />
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border-subtle)] bg-[var(--surface-card)]">
        <div className="mx-auto grid w-full max-w-[80rem] gap-0 px-4 sm:grid-cols-2 lg:grid-cols-4">
          {operateStats.map((stat) => (
            <div
              key={stat.label}
              className="border-[var(--border-subtle)] px-4 py-6 sm:border-r sm:last:border-r-0"
            >
              <p className="font-[family-name:var(--font-google-sans)] text-3xl font-bold text-[var(--brand-blue-accessible-light)]">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-semibold text-[var(--text-heading)]">
                {stat.label}
              </p>
              <p className="mt-0.5 text-xs text-[var(--text-body)]">{stat.hint}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[80rem] px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--brand-blue-accessible-light)]">
              Checklist
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-google-sans)]">
              What to prepare
            </h2>
            <ul className="mt-8 space-y-4">
              {checklist.map((item) => (
                <li
                  key={item.title}
                  className="flex gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-4"
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-blue-accessible-light)]"
                    aria-hidden
                  />
                  <div>
                    <p className="font-semibold text-[var(--text-heading)]">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--text-body)]">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--brand-blue-accessible-light)]">
              Tennessee markets
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-google-sans)]">
              Where demo inventory lives
            </h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {operateCitySpotlights.slice(0, 4).map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/tennessee/${city.slug}`}
                    className="group relative block overflow-hidden rounded-2xl"
                  >
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={city.image}
                        alt=""
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 50vw, 20vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#081827]/90 via-[#081827]/35 to-transparent" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] !text-[#5CB8FF]">
                        {city.focus}
                      </p>
                      <p className="font-semibold !text-white">{city.name}</p>
                      <p className="mt-0.5 line-clamp-2 text-xs !text-white/80">
                        {city.blurb}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--border-subtle)] bg-[var(--surface-subtle)]">
        <div className="mx-auto w-full max-w-[80rem] px-4 py-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--brand-blue-accessible-light)]">
                Live demo inventory
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-google-sans)]">
                {listingsHeading}
              </h2>
            </div>
            <Button asChild variant="outline">
              <Link href={listingsHref}>
                {listingsLabel}
                <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
