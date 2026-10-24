"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type ListingNavSection = {
  id: string;
  label: string;
};

export function ListingSectionNav({ sections }: { sections: ListingNavSection[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "overview");
  const sectionKey = sections.map((s) => s.id).join("|");

  useEffect(() => {
    const ids = sectionKey ? sectionKey.split("|") : [];
    if (!ids.length) return;
    setActive(ids[0]!);

    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) setActive(id);
        },
        { rootMargin: "-35% 0px -50% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sectionKey]);

  if (sections.length === 0) return null;

  return (
    <nav
      aria-label="On this page"
      className="sticky top-[calc(var(--demo-banner-h,2.5rem)+4.25rem)] z-20 border-b border-[var(--border-subtle)] bg-[var(--surface-page)]/95 backdrop-blur"
    >
      <ul className="-mx-1 flex gap-1 overflow-x-auto px-1 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {sections.map((item) => (
          <li key={item.id} className="shrink-0">
            <a
              href={`#${item.id}`}
              className={cn(
                "inline-flex rounded-full px-3.5 py-1.5 text-sm font-semibold whitespace-nowrap transition",
                active === item.id
                  ? "bg-[#1E6EF4] !text-white"
                  : "!text-[var(--text-heading)] hover:bg-[var(--surface-subtle)]",
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
