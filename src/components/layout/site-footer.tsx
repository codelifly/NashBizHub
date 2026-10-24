import Link from "next/link";
import { footerNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { SiteLogo } from "@/components/brand/site-logo";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--border-subtle)] bg-[var(--surface-card)]">
      <div className="mx-auto grid w-full max-w-[80rem] gap-8 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <SiteLogo variant="footer" />
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-body)]">
            {siteConfig.tagline}
          </p>
          <p className="mt-4 text-xs text-[var(--text-body)]/80">{siteConfig.demoBanner}</p>
        </div>
        {(
          [
            ["Explore", footerNav.explore],
            ["Learn", footerNav.learn],
            ["Legal & demo", footerNav.legal],
          ] as const
        ).map(([title, items]) => (
          <div key={title}>
            <h2 className="text-sm font-semibold uppercase tracking-wide">{title}</h2>
            <ul className="mt-3 space-y-2">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--text-body)] hover:text-[var(--brand-blue-accessible-light)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
