"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut, Menu, Search, Shield, X } from "lucide-react";
import { staffNavIconed } from "@/config/staff-nav";
import { DemoBanner } from "@/components/shared/demo-banner";
import { BackToHome } from "@/components/shared/back-to-home";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { SiteLogo } from "@/components/brand/site-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

function NavGroups({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex flex-1 flex-col gap-6" aria-label="Staff console">
      {staffNavIconed.map((group) => (
        <div key={group.group}>
          <p className="nav-muted mb-2 px-3 text-[0.65rem] font-semibold uppercase tracking-[0.18em]">
            {group.group}
          </p>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const active =
                item.href === "/"
                  ? false
                  : pathname === item.href ||
                    (item.href !== "/admin" && pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition",
                      active ? "nav-active" : "hover:bg-white/10",
                    )}
                  >
                    <Icon className="nav-icon h-4 w-4 shrink-0" aria-hidden />
                    <span className="min-w-0 flex-1 truncate">{item.label}</span>
                    {active ? (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#5CB8FF]" aria-hidden />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function StaffShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userName, setUserName] = useState("Administrator");

  useEffect(() => {
    authClient.getSession().then((result) => {
      const name = result.data?.user?.name;
      if (name) setUserName(name);
    });
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/login";
        },
      },
    });
  }

  const sidebar = (
    <div className="flex h-full flex-col gap-5 p-4">
      <div className="space-y-3">
        <div>
          <SiteLogo href="/admin" variant="on-dark" />
          <span className="nav-icon mt-1.5 flex items-center gap-1.5 px-0.5 text-xs font-semibold tracking-normal">
            <Shield className="h-3.5 w-3.5" aria-hidden />
            Admin console
          </span>
        </div>
        <div className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/15">
          <p className="nav-muted text-xs">Signed in as</p>
          <p className="truncate font-semibold">{userName}</p>
          <p className="nav-muted mt-1 text-xs">Staff · demo permissions</p>
        </div>
        <Link
          href="/admin/listings"
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[var(--radius-control)] bg-[#1E6EF4] text-sm font-semibold !text-white hover:bg-[#1E6EF4]/90"
        >
          Open moderation queue
        </Link>
      </div>

      <NavGroups pathname={pathname} onNavigate={() => setMobileOpen(false)} />

      <div className="mt-auto space-y-2 border-t border-white/15 pt-4">
        <Link
          href="/dashboard"
          className="inline-flex h-10 w-full items-center gap-2 rounded-xl px-3 text-sm font-semibold hover:bg-white/10"
        >
          Customer panel
        </Link>
        <BackToHome tone="dark" />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex h-10 flex-1 items-center gap-2 rounded-xl px-3 text-sm font-semibold hover:bg-white/10"
          >
            <LogOut className="h-4 w-4" aria-hidden />
            Log out
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--surface-page)] text-[var(--text-body)]">
      <DemoBanner />
      <div className="flex min-h-[calc(100vh-2.5rem)] w-full">
        <aside className="portal-sidebar sticky top-[2.5rem] hidden h-[calc(100vh-2.5rem)] w-[17.5rem] shrink-0 overflow-y-auto lg:block xl:w-72">
          {sidebar}
        </aside>

        {mobileOpen ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-[#081827]/65"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            />
            <aside className="portal-sidebar absolute inset-y-0 left-0 w-[min(20rem,88vw)] overflow-y-auto shadow-2xl">
              <div className="flex justify-end p-3">
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-white/10"
                  aria-label="Close navigation"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {sidebar}
            </aside>
          </div>
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-[2.5rem] z-30 border-b border-[var(--border-subtle)] bg-[var(--surface-card)]">
            <div className="flex w-full items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="lg:hidden"
                aria-label="Open admin menu"
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="h-4 w-4" />
              </Button>
              <form
                action="/admin/users"
                method="get"
                className="relative hidden min-w-0 flex-1 md:block"
              >
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-body)]/55"
                  aria-hidden
                />
                <Input
                  name="q"
                  placeholder="Search users, orgs, listings…"
                  className="h-11 border-[var(--border-subtle)] bg-[var(--surface-page)] pl-10 text-[var(--text-heading)]"
                />
              </form>
              <div className="ml-auto flex items-center gap-2">
                <BackToHome className="hidden h-9 sm:inline-flex" />
                <Button asChild variant="secondary" className="hidden md:inline-flex">
                  <Link href="/admin/crm">CRM</Link>
                </Button>
                <Button asChild className="hidden md:inline-flex !text-white">
                  <Link href="/admin/listings">Moderation</Link>
                </Button>
                <ThemeToggle />
                <Button type="button" variant="outline" size="sm" onClick={handleSignOut}>
                  Log out
                </Button>
              </div>
            </div>
          </header>

          <main className="w-full flex-1 px-4 py-6 sm:px-6 lg:px-8 xl:px-10">{children}</main>
        </div>
      </div>
    </div>
  );
}
