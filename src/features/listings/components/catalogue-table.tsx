"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badge";
import { kindLabels } from "@/features/listings/lib/kind-labels";
import type { OpportunityKind } from "@/lib/constants";
import { OPPORTUNITY_KINDS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export type CatalogueRow = {
  id: string;
  publicCode: string;
  slug: string;
  title: string;
  summary: string;
  kind: OpportunityKind;
  status: string;
  citySlug: string;
  industrySlug: string;
  confidential: boolean;
  locationLabel: string;
  publishedAt: string | null;
};

const PAGE_SIZE = 8;

const statusTone = (status: string) => {
  if (status === "active") return "success" as const;
  if (status === "under-negotiation") return "warning" as const;
  if (status === "expired" || status === "withdrawn" || status === "suspended")
    return "error" as const;
  return "neutral" as const;
};

const kindFilterStyle: Record<
  OpportunityKind | "all",
  { idle: string; active: string }
> = {
  all: {
    idle: "border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--text-heading)]",
    active: "border-[var(--action-fill)] bg-[var(--action-fill)] !text-white",
  },
  sale: {
    idle: "border-[#bfdbfe] bg-[#eff6ff] text-[#0b3d91]",
    active: "border-[#1e6ef4] bg-[#1e6ef4] !text-white",
  },
  "business-rental": {
    idle: "border-[#bbf7d0] bg-[#e8f7ef] text-[#0f7a45]",
    active: "border-[#0f7a45] bg-[#0f7a45] !text-white",
  },
  "premises-lease": {
    idle: "border-[#fde68a] bg-[#fff6e0] text-[#9a6700]",
    active: "border-[#9a6700] bg-[#9a6700] !text-white",
  },
  "management-contract": {
    idle: "border-[#99f6e4] bg-[#ecfdf8] text-[#0f766e]",
    active: "border-[#0f766e] bg-[#0f766e] !text-white",
  },
  "service-tender": {
    idle: "border-[#fecaca] bg-[#fef3f2] text-[#b42318]",
    active: "border-[#b42318] bg-[#b42318] !text-white",
  },
};

const statusFilters = [
  { id: "all", label: "All statuses", tone: "neutral" as const },
  { id: "active", label: "Active", tone: "success" as const },
  {
    id: "under-negotiation",
    label: "Under negotiation",
    tone: "warning" as const,
  },
  { id: "confidential", label: "Confidential", tone: "info" as const },
] as const;

function cityLabel(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function CatalogueTable({ rows }: { rows: CatalogueRow[] }) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<OpportunityKind | "all">("all");
  const [status, setStatus] = useState<(typeof statusFilters)[number]["id"]>("all");
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((row) => {
      if (kind !== "all" && row.kind !== kind) return false;
      if (status === "active" && row.status !== "active") return false;
      if (status === "under-negotiation" && row.status !== "under-negotiation")
        return false;
      if (status === "confidential" && !row.confidential) return false;
      if (!q) return true;
      const hay = [
        row.title,
        row.summary,
        row.publicCode,
        row.locationLabel,
        kindLabels[row.kind],
        row.industrySlug,
        row.citySlug,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [rows, query, kind, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  function setKindFilter(next: OpportunityKind | "all") {
    setKind(next);
    setPage(1);
  }

  function setStatusFilter(next: (typeof statusFilters)[number]["id"]) {
    setStatus(next);
    setPage(1);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block min-w-0 flex-1 sm:max-w-sm">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-body)]"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search title, code, city, industry…"
            className="h-11 w-full rounded-[var(--radius-control)] border border-[var(--border-subtle)] bg-[var(--surface-card)] pl-10 pr-3 text-sm text-[var(--text-heading)]"
          />
        </label>
        <p className="text-sm text-[var(--text-body)]">
          <span className="font-semibold text-[var(--text-heading)]">
            {filtered.length}
          </span>{" "}
          of {rows.length} demo listings
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-body)]">
          Opportunity type
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setKindFilter("all")}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
              kindFilterStyle.all[kind === "all" ? "active" : "idle"],
            )}
          >
            All types
          </button>
          {OPPORTUNITY_KINDS.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setKindFilter(k)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                kindFilterStyle[k][kind === k ? "active" : "idle"],
              )}
            >
              {kindLabels[k]}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-body)]">
          Status & privacy
        </p>
        <div className="flex flex-wrap gap-2">
          {statusFilters.map((f) => {
            const active = status === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setStatusFilter(f.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                  active
                    ? "border-[var(--action-fill)] bg-[var(--action-fill)] !text-white"
                    : "border-[var(--border-subtle)] bg-[var(--surface-card)] text-[var(--text-heading)]",
                )}
              >
                {!active ? <StatusBadge label={f.label} tone={f.tone} /> : f.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="overflow-x-auto rounded-[1.15rem] border border-[var(--border-subtle)] bg-[var(--surface-card)]">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[var(--surface-subtle)]">
            <tr className="border-b border-[var(--border-subtle)]">
              <th className="px-3 py-3 font-semibold text-[var(--text-heading)]">
                Listing
              </th>
              <th className="px-3 py-3 font-semibold text-[var(--text-heading)]">
                Type
              </th>
              <th className="px-3 py-3 font-semibold text-[var(--text-heading)]">
                City
              </th>
              <th className="px-3 py-3 font-semibold text-[var(--text-heading)]">
                Status
              </th>
              <th className="px-3 py-3 font-semibold text-[var(--text-heading)]">
                Code
              </th>
              <th className="px-3 py-3 font-semibold text-[var(--text-heading)]">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-3 py-10 text-center text-[var(--text-body)]"
                >
                  No listings match these filters. Clear a color chip or search
                  term to widen results.
                </td>
              </tr>
            ) : (
              pageRows.map((row) => {
                const open = expanded === row.id;
                return (
                  <tr
                    key={row.id}
                    className="border-b border-[var(--border-subtle)] align-top last:border-b-0"
                  >
                    <td className="px-3 py-3">
                      <p className="font-semibold text-[var(--text-heading)]">
                        {row.title}
                      </p>
                      <p className="mt-1 line-clamp-2 max-w-xs text-xs text-[var(--text-body)]">
                        {row.summary}
                      </p>
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={cn(
                          "inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold",
                          kindFilterStyle[row.kind].idle,
                        )}
                      >
                        {kindLabels[row.kind]}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-[var(--text-body)]">
                      {cityLabel(row.citySlug)}
                      {row.confidential ? (
                        <span className="mt-1 block text-xs font-semibold text-[#9a6700]">
                          Approximate area
                        </span>
                      ) : null}
                    </td>
                    <td className="px-3 py-3">
                      <StatusBadge
                        label={row.status.replaceAll("-", " ")}
                        tone={statusTone(row.status)}
                      />
                    </td>
                    <td className="px-3 py-3 font-mono text-xs text-[var(--text-heading)]">
                      {row.publicCode}
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex flex-wrap gap-2">
                        <Button
                          type="button"
                          size="sm"
                          variant={open ? "default" : "outline"}
                          className={open ? "!text-white" : undefined}
                          onClick={() =>
                            setExpanded((id) => (id === row.id ? null : row.id))
                          }
                        >
                          {open ? "Hide" : "More"}
                          <ChevronDown
                            className={cn(
                              "h-3.5 w-3.5 transition",
                              open && "rotate-180",
                            )}
                          />
                        </Button>
                        <Button asChild size="sm" variant="ghost">
                          <Link href={`/listings/${row.slug}`}>Public</Link>
                        </Button>
                      </div>
                      {open ? (
                        <div className="mt-3 max-w-md space-y-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-subtle)] p-3 text-xs leading-relaxed text-[var(--text-body)]">
                          <p>
                            <span className="font-semibold text-[var(--text-heading)]">
                              Industry:
                            </span>{" "}
                            {row.industrySlug.replaceAll("-", " ")}
                          </p>
                          <p>
                            <span className="font-semibold text-[var(--text-heading)]">
                              Location label:
                            </span>{" "}
                            {row.locationLabel}
                          </p>
                          <p>
                            <span className="font-semibold text-[var(--text-heading)]">
                              Published:
                            </span>{" "}
                            {row.publishedAt
                              ? new Date(row.publishedAt).toLocaleDateString(
                                  "en-US",
                                )
                              : "—"}
                          </p>
                          <p>
                            <span className="font-semibold text-[var(--text-heading)]">
                              Pipeline note:
                            </span>{" "}
                            Active / negotiating listings stay visible; material
                            edits return to moderation before public replace.
                          </p>
                        </div>
                      ) : null}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[var(--text-body)]">
          Page {safePage} of {totalPages}
        </p>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={safePage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={safePage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
