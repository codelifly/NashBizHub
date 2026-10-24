"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { megaMenus } from "@/config/mega-menu";
import { Button } from "@/components/ui/button";
import { SiteLogo } from "@/components/brand/site-logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { CustomerAuthActions } from "@/components/layout/customer-auth-actions";
import { CompareTrayLink } from "@/features/compare/components/compare-tray-link";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [openId, setOpenId] = useState<string | null>(null);
  const baseId = useId();
  const active = megaMenus.find((menu) => menu.id === openId) ?? null;

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenId(null);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-[var(--demo-banner-h,2.5rem)] z-40 bg-[var(--surface-card)]",
        active ? "border-b-0" : "border-b border-[var(--border-subtle)]",
      )}
      onMouseLeave={() => setOpenId(null)}
    >
      <div className="relative mx-auto flex w-full max-w-[80rem] items-center justify-between gap-3 px-4 py-3">
        <SiteLogo variant="mark" className="shrink-0 sm:hidden" />
        <SiteLogo className="hidden shrink-0 sm:inline-flex" />

        <div className="ml-auto flex min-w-0 shrink-0 items-center justify-end gap-1 sm:gap-2">
          <nav
            className="relative hidden items-center justify-end gap-1 xl:flex"
            aria-label="Primary"
          >
            {megaMenus.map((menu) => {
              const open = openId === menu.id;
              return (
                <button
                  key={menu.id}
                  type="button"
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1 rounded-[var(--radius-control)] px-2 py-2 text-sm font-semibold leading-snug tracking-tight transition-colors 2xl:px-2.5",
                    open
                      ? "bg-[var(--surface-subtle)] text-[var(--brand-blue-accessible-light)]"
                      : "text-[var(--text-heading)] hover:bg-[var(--surface-subtle)] hover:text-[var(--brand-blue-accessible-light)]",
                  )}
                  aria-expanded={open}
                  aria-controls={`${baseId}-panel`}
                  onClick={() => setOpenId(open ? null : menu.id)}
                  onMouseEnter={() => setOpenId(menu.id)}
                >
                  {menu.label}
                  <ChevronDown
                    className={cn("h-4 w-4 shrink-0 transition", open && "rotate-180")}
                    aria-hidden
                  />
                </button>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
            <CompareTrayLink />
            <ThemeToggle />
            <CustomerAuthActions />
            <MobileNavigation />
          </div>
        </div>
      </div>

      {/* Mega panel — flush under header bar (no gap) */}
      {active ? (
        <div
          id={`${baseId}-panel`}
          role="region"
          aria-label={`${active.label} menu`}
          className="border-t border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-[0_24px_48px_-28px_rgba(8,24,39,0.45)]"
        >
          <div className="mx-auto w-full max-w-[80rem] px-4 py-5">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
              <div className="min-w-0 max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--brand-blue-accessible-light)]">
                  {active.label}
                </p>
                <p className="mt-1 text-base leading-relaxed text-[var(--text-body)]">
                  {active.description}
                </p>
              </div>
              <Button asChild size="sm" className="shrink-0 !text-white">
                <Link href={active.href} onClick={() => setOpenId(null)}>
                  Open {active.label}
                </Link>
              </Button>
            </div>

            {"highlights" in active && active.highlights ? (
              <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {active.highlights.map((card) => (
                  <Link
                    key={card.href + card.title}
                    href={card.href}
                    onClick={() => setOpenId(null)}
                    className="group relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-subtle)] p-4 transition hover:-translate-y-0.5 hover:border-[var(--brand-blue-accessible-light)] hover:shadow-[0_20px_40px_-28px_rgba(30,110,244,0.45)]"
                  >
                    <span className="inline-flex rounded-full bg-[var(--action-fill)] px-2.5 py-0.5 text-xs font-bold uppercase tracking-[0.12em] !text-white">
                      {card.accent}
                    </span>
                    <span className="mt-3 block font-[family-name:var(--font-google-sans)] text-lg font-semibold text-[var(--text-heading)] group-hover:text-[var(--brand-blue-accessible-light)]">
                      {card.title}
                    </span>
                    <span className="mt-1.5 block text-sm leading-relaxed text-[var(--text-body)]">
                      {card.body}
                    </span>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-blue-accessible-light)]">
                      Explore
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                ))}
              </div>
            ) : null}

            <div className="grid gap-6 lg:grid-cols-4">
              {active.columns.map((column) => (
                <div key={column.title} className="min-w-0">
                  <p className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-[var(--text-heading)]">
                    {column.title}
                  </p>
                  <ul className="space-y-1">
                    {column.links.map((link) => (
                      <li key={link.href + link.label}>
                        <Link
                          href={link.href}
                          onClick={() => setOpenId(null)}
                          className="block rounded-xl px-2 py-2 transition hover:bg-[var(--surface-subtle)]"
                        >
                          <span className="block text-sm font-semibold text-[var(--text-heading)]">
                            {link.label}
                          </span>
                          {"hint" in link && link.hint ? (
                            <span className="mt-0.5 block text-xs leading-snug text-[var(--text-body)]">
                              {link.hint}
                            </span>
                          ) : null}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="on-dark min-w-0 rounded-2xl bg-[linear-gradient(145deg,#081827_0%,#0b3d91_70%,#1e6ef4_100%)] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] !text-[#5CB8FF]">
                  Next step
                </p>
                <h3 className="mt-2 font-[family-name:var(--font-google-sans)] text-lg font-semibold !text-white">
                  {active.cta.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed !text-white/85" data-muted="true">
                  {active.cta.body}
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <Button asChild className="w-full !text-white">
                    <Link href={active.cta.primary.href} onClick={() => setOpenId(null)}>
                      {active.cta.primary.label}
                    </Link>
                  </Button>
                  <Link
                    href={active.cta.secondary.href}
                    onClick={() => setOpenId(null)}
                    className="inline-flex items-center gap-1 text-sm font-semibold !text-[#9DD4FF] hover:underline"
                  >
                    {active.cta.secondary.label}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
