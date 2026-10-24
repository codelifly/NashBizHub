import Link from "next/link";
import { DemoBanner } from "@/components/shared/demo-banner";
import { BackToHome } from "@/components/shared/back-to-home";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { SiteLogo } from "@/components/brand/site-logo";
import { Button } from "@/components/ui/button";

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--surface-page)]">
      <DemoBanner />
      <header className="sticky top-[2.5rem] z-30 border-b border-[var(--border-subtle)] bg-[var(--surface-card)]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[80rem] flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div className="flex flex-wrap items-center gap-3">
            <SiteLogo href="/demo" />
            <span className="hidden text-sm font-semibold text-[var(--text-body)] sm:inline">
              Demo Center
            </span>
          </div>
          <nav className="flex flex-wrap items-center gap-2 text-sm">
            <BackToHome className="h-9" />
            <Button asChild variant="ghost" size="sm">
              <Link href="/demo/outbox">Outbox</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/tours">Video tours</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/login">Log in</Link>
            </Button>
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-[80rem] px-4 py-8">{children}</main>
    </div>
  );
}
