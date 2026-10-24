import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Clapperboard,
  LayoutDashboard,
  Shield,
  Sparkles,
  Store,
} from "lucide-react";
import { demoPersonas } from "@/config/roles";
import { siteHeroImage } from "@/config/listing-images";
import { Button } from "@/components/ui/button";
import { BackToHome } from "@/components/shared/back-to-home";
import { DemoResetButton } from "@/features/demo/components/demo-reset-button";
import { PersonaSwitchButton } from "@/features/demo/components/persona-switch-button";

const personaExplore = [
  {
    key: "maya-chen",
    exploreAs: "Buyer",
    href: "/dashboard",
    blurb: "Save searches, inquire, and submit sale offers.",
    image: "/images/listings/cafe-1.webp",
  },
  {
    key: "harbor-owner",
    exploreAs: "Owner",
    href: "/dashboard/listings",
    blurb: "Publish listings and respond to inquiries.",
    image: "/images/listings/restaurant-1.webp",
  },
  {
    key: "daniel-brooks",
    exploreAs: "Operator",
    href: "/dashboard/applications",
    blurb: "Apply to operating rentals and manage deals.",
    image: "/images/listings/laundry-1.webp",
  },
  {
    key: "summit-broker",
    exploreAs: "Broker",
    href: "/dashboard/listings/new",
    blurb: "Represent clients and advise transactions.",
    image: "/images/listings/office-1.webp",
  },
  {
    key: "admin",
    exploreAs: "Administrator",
    href: "/admin",
    blurb: "Moderate inventory, CRM, and support.",
    image: "/images/listings/store-1.webp",
  },
] as const;

const scenarios = [
  { slug: "buyer-inquiry", title: "Buyer inquiry", hint: "Qualify → NDA → documents" },
  { slug: "sale-offer", title: "Sale offer", hint: "Offer · counter · accept" },
  { slug: "rental-application", title: "Rental application", hint: "Operate · handover" },
  { slug: "tender-bid", title: "Tender bid", hint: "Service proposal" },
  { slug: "admin-moderation", title: "Admin moderation", hint: "Approve listings" },
] as const;

const quickLinks = [
  { href: "/", label: "Public marketplace", icon: Store },
  { href: "/dashboard", label: "Customer panel", icon: LayoutDashboard },
  { href: "/admin", label: "Admin console", icon: Shield },
  { href: "/tours", label: "Video tours", icon: Clapperboard },
] as const;

export default function DemoCenterPage() {
  return (
    <div className="space-y-12">
      <section className="on-dark relative overflow-hidden rounded-[1.5rem] rise-in">
        <Image
          src={siteHeroImage}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(3,9,20,0.94)_0%,rgba(8,24,39,0.88)_50%,rgba(30,110,244,0.75)_100%)]" />
        <div className="relative z-10 flex flex-col gap-6 p-8 sm:p-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] !text-[#5CB8FF] ring-1 ring-white/20">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Presenter sandbox
            </p>
            <h1 className="font-[family-name:var(--font-google-sans)] text-4xl font-bold !text-white sm:text-5xl">
              Demo Center
            </h1>
            <p className="text-lg !text-white/85">
              Explore NashBizHub with fictional personas and inventory. Email, signing, verification
              and billing adapters are simulated — nothing leaves this machine.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <BackToHome className="!border-white/30 !bg-white/10 !text-white hover:!bg-white/20" />
            <Button asChild className="!text-white">
              <Link href="/tours">
                Watch tours <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Quick links">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex items-center gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] px-4 py-4 transition hover:border-[var(--brand-blue-accessible-light)] hover:shadow-md"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface-subtle)] text-[var(--brand-blue-accessible-light)] transition group-hover:bg-[#1E6EF4] group-hover:!text-white">
              <link.icon className="h-5 w-5" aria-hidden />
            </span>
            <span className="font-semibold text-[var(--text-heading)]">{link.label}</span>
          </Link>
        ))}
      </section>

      <section className="space-y-4" aria-labelledby="personas-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="personas-heading" className="text-2xl font-semibold text-[var(--text-heading)]">
              Explore as…
            </h2>
            <p className="mt-1 text-sm text-[var(--text-body)]">
              One click sets the demo persona cookie and opens the right workspace.
            </p>
          </div>
          <BackToHome />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {personaExplore.map((card, index) => {
            const persona = demoPersonas.find((p) => p.key === card.key);
            return (
              <article
                key={card.key}
                className="rise-in flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transform-none"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative h-36">
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081827]/70 to-transparent" />
                  <p className="absolute bottom-3 left-4 text-xs font-semibold uppercase tracking-wide !text-[#5CB8FF]">
                    Explore as {card.exploreAs}
                  </p>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-[family-name:var(--font-google-sans)] text-xl font-semibold text-[var(--text-heading)]">
                    {persona?.label ?? card.exploreAs}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--text-body)]">{card.blurb}</p>
                  <p className="mt-2 font-mono text-xs text-[var(--text-body)]/80">{persona?.email}</p>
                  <div className="mt-4">
                    <PersonaSwitchButton
                      personaKey={card.key}
                      label={`Continue as ${card.exploreAs}`}
                      redirectTo={card.href}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <p className="text-sm text-[var(--text-body)]">
          Persona switch sets <code className="rounded bg-[var(--surface-subtle)] px-1">nbh_demo_persona</code>{" "}
          when <code className="rounded bg-[var(--surface-subtle)] px-1">DEMO_MODE=true</code>. Seeded
          users have no password hashes — use the switcher. Documented password:{" "}
          <code className="rounded bg-[var(--surface-subtle)] px-1">DemoPass123!</code>.
        </p>
      </section>

      <section className="space-y-4" aria-labelledby="services-heading">
        <h2 id="services-heading" className="text-2xl font-semibold">
          Simulated services
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {[
            "Email → private demo outbox (no SMTP)",
            "Document signing → demo signing adapter",
            "Identity verification → demo verification adapter",
            "Billing → demo billing adapter (no real payments)",
          ].map((item) => (
            <li
              key={item}
              className="rounded-[var(--radius-control)] border border-dashed border-[var(--border-subtle)] bg-[var(--surface-subtle)] px-4 py-3 text-sm"
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="secondary">
            <Link href="/demo/outbox">Open outbox</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
        <div className="rounded-[var(--radius-card)] border border-dashed border-[var(--border-subtle)] bg-[var(--surface-subtle)] p-4">
          <p className="mb-3 text-sm text-[var(--text-body)]">
            Reset clears the current workspace memory bag and reseeds demo anchors. DEMO_MODE only.
          </p>
          <DemoResetButton />
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="scenarios-heading">
        <h2 id="scenarios-heading" className="text-2xl font-semibold">
          Guided scenarios
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {scenarios.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/demo/scenarios/${s.slug}`}
                className="block rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)] px-4 py-4 transition hover:border-[var(--brand-blue-accessible-light)] hover:shadow-md"
              >
                <span className="font-semibold text-[var(--text-heading)]">{s.title}</span>
                <span className="mt-1 block text-sm text-[var(--text-body)]">{s.hint}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
