"use client";

import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { megaMenus } from "@/config/mega-menu";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>("operate");

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  }

  return (
    <div className="xl:hidden">
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>
      {open ? (
        <div
          id="mobile-nav-drawer"
          className="absolute inset-x-0 top-[calc(2.5rem+3.75rem)] z-40 max-h-[min(82vh,40rem)] overflow-y-auto border-b border-[var(--border-subtle)] bg-[var(--surface-card)] p-4 shadow-xl"
        >
          <nav aria-label="Mobile primary" className="flex flex-col gap-2">
            {megaMenus.map((menu) => {
              const isOpen = expanded === menu.id;
              return (
                <div key={menu.id} className="rounded-2xl border border-[var(--border-subtle)]">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-3 py-3 text-left text-sm font-semibold text-[var(--text-heading)]"
                    aria-expanded={isOpen}
                    onClick={() => setExpanded(isOpen ? null : menu.id)}
                  >
                    {menu.label}
                    <ChevronDown className={cn("h-4 w-4 transition", isOpen && "rotate-180")} />
                  </button>
                  {isOpen ? (
                    <div className="space-y-3 border-t border-[var(--border-subtle)] px-3 py-3">
                      <Link
                        href={menu.href}
                        className="block text-sm font-medium text-[var(--brand-blue-accessible-light)]"
                        onClick={() => setOpen(false)}
                      >
                        View all →
                      </Link>
                      {menu.columns.map((column) => (
                        <div key={column.title}>
                          <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[var(--text-body)]">
                            {column.title}
                          </p>
                          <ul className="space-y-1">
                            {column.links.slice(0, 6).map((link) => (
                              <li key={link.href + link.label}>
                                <Link
                                  href={link.href}
                                  className="block rounded-lg px-2 py-1.5 text-sm font-medium text-[var(--text-heading)] hover:bg-[var(--surface-subtle)]"
                                  onClick={() => setOpen(false)}
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}

            <div className="mt-2 grid gap-2 border-t border-[var(--border-subtle)] pt-4">
              <Button asChild variant="secondary">
                <Link href="/dashboard" onClick={() => setOpen(false)}>
                  My workspace
                </Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/login" onClick={() => setOpen(false)}>
                  Sign in
                </Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/signup" onClick={() => setOpen(false)}>
                  Register
                </Link>
              </Button>
              <Button type="button" variant="outline" onClick={signOut}>
                Log out
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
