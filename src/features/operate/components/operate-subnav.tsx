"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { operateSubnav } from "@/config/operate-and-manage";
import { cn } from "@/lib/utils";

export function OperateSubnav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Operate & Manage sections"
      className="border-b border-[var(--border-subtle)] bg-[var(--surface-card)]"
    >
      <div className="mx-auto flex w-full max-w-[80rem] gap-1 overflow-x-auto px-4 py-2">
        {operateSubnav.map((item) => {
          const exact = "exact" in item && item.exact;
          const active = exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-2 text-sm font-semibold transition",
                active
                  ? "bg-[var(--action-fill)] !text-white"
                  : "text-[var(--text-heading)] hover:bg-[var(--surface-subtle)]",
              )}
              aria-current={active ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
