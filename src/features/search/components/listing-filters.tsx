"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { Filter, RotateCcw, SlidersHorizontal, X } from "lucide-react";
import { tennesseeCities } from "@/config/tennessee-locations";
import { industries } from "@/config/industries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { listingSortValues } from "@/features/search/schemas/listing-search.schema";
import type { OpportunityKind } from "@/lib/constants";
import { cn } from "@/lib/utils";

const selectClass =
  "flex h-10 w-full rounded-[var(--radius-control)] border border-[var(--border-subtle)] bg-[var(--surface-page)] px-3 py-2 text-sm text-[var(--text-heading)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]";

const amountBandsByKind: Record<
  string,
  { label: string; min: string; max: string }[]
> = {
  sale: [
    { label: "Under $150k", min: "", max: "150000" },
    { label: "$150k–$400k", min: "150000", max: "400000" },
    { label: "$400k–$800k", min: "400000", max: "800000" },
    { label: "$800k+", min: "800000", max: "" },
  ],
  "business-rental": [
    { label: "Under $3k/mo", min: "", max: "3000" },
    { label: "$3k–$6k/mo", min: "3000", max: "6000" },
    { label: "$6k–$12k/mo", min: "6000", max: "12000" },
    { label: "$12k+/mo", min: "12000", max: "" },
  ],
  "premises-lease": [
    { label: "Under $2k/mo", min: "", max: "2000" },
    { label: "$2k–$5k/mo", min: "2000", max: "5000" },
    { label: "$5k–$10k/mo", min: "5000", max: "10000" },
    { label: "$10k+/mo", min: "10000", max: "" },
  ],
  default: [
    { label: "Under $150k", min: "", max: "150000" },
    { label: "$150k–$400k", min: "150000", max: "400000" },
    { label: "$400k+", min: "400000", max: "" },
  ],
};

export type ListingFilterDefaults = {
  q?: string;
  city?: string;
  region?: string;
  industry?: string;
  sort?: string;
  confidential?: string;
  status?: string;
  minAmount?: string;
  maxAmount?: string;
  disclosedOnly?: string;
  view?: string;
  pageSize?: number;
};

export function ListingFilters({
  defaults,
  kind,
  lockCity,
  lockIndustry,
  variant = "sidebar",
}: {
  defaults?: ListingFilterDefaults;
  kind?: OpportunityKind;
  lockCity?: boolean;
  lockIndustry?: boolean;
  variant?: "sidebar" | "panel";
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [mobileOpen, setMobileOpen] = useState(false);

  const [q, setQ] = useState(defaults?.q ?? "");
  const [city, setCity] = useState(defaults?.city ?? "");
  const [region, setRegion] = useState(defaults?.region ?? "");
  const [industry, setIndustry] = useState(defaults?.industry ?? "");
  const [sort, setSort] = useState(defaults?.sort ?? "newest");
  const [confidential, setConfidential] = useState(defaults?.confidential ?? "");
  const [status, setStatus] = useState(defaults?.status ?? "");
  const [minAmount, setMinAmount] = useState(defaults?.minAmount ?? "");
  const [maxAmount, setMaxAmount] = useState(defaults?.maxAmount ?? "");
  const [disclosedOnly, setDisclosedOnly] = useState(
    defaults?.disclosedOnly === "1" ||
      defaults?.disclosedOnly === "true" ||
      defaults?.disclosedOnly === "yes",
  );
  const [view, setView] = useState(defaults?.view ?? "grid");
  const [pageSize, setPageSize] = useState(String(defaults?.pageSize ?? 12));

  useEffect(() => {
    setQ(defaults?.q ?? "");
    setCity(defaults?.city ?? "");
    setRegion(defaults?.region ?? "");
    setIndustry(defaults?.industry ?? "");
    setSort(defaults?.sort ?? "newest");
    setConfidential(defaults?.confidential ?? "");
    setStatus(defaults?.status ?? "");
    setMinAmount(defaults?.minAmount ?? "");
    setMaxAmount(defaults?.maxAmount ?? "");
    setDisclosedOnly(
      defaults?.disclosedOnly === "1" ||
        defaults?.disclosedOnly === "true" ||
        defaults?.disclosedOnly === "yes",
    );
    setView(defaults?.view ?? "grid");
    setPageSize(String(defaults?.pageSize ?? 12));
  }, [defaults]);

  const regions = useMemo(
    () => Array.from(new Set(tennesseeCities.map((c) => c.region))).sort(),
    [],
  );

  const citiesForRegion = useMemo(() => {
    if (!region) return tennesseeCities;
    return tennesseeCities.filter((c) => c.region === region);
  }, [region]);

  const amountBands =
    amountBandsByKind[kind ?? ""] ?? amountBandsByKind.default;

  const activeCount = useMemo(() => {
    let n = 0;
    if (q.trim()) n += 1;
    if (city && !lockCity) n += 1;
    if (region) n += 1;
    if (industry && !lockIndustry) n += 1;
    if (sort !== "newest") n += 1;
    if (confidential) n += 1;
    if (status) n += 1;
    if (minAmount || maxAmount) n += 1;
    if (disclosedOnly) n += 1;
    if (view !== "grid") n += 1;
    if (pageSize !== "12") n += 1;
    return n;
  }, [
    city,
    confidential,
    disclosedOnly,
    industry,
    lockCity,
    lockIndustry,
    maxAmount,
    minAmount,
    pageSize,
    q,
    region,
    sort,
    status,
    view,
  ]);

  const pushParams = useCallback(
    (next: {
      q: string;
      city: string;
      region: string;
      industry: string;
      sort: string;
      confidential: string;
      status: string;
      minAmount: string;
      maxAmount: string;
      disclosedOnly: boolean;
      view: string;
      pageSize: string;
    }) => {
      const params = new URLSearchParams();
      const setOrDelete = (key: string, value: string) => {
        if (value.trim()) params.set(key, value.trim());
      };
      setOrDelete("q", next.q);
      if (!lockCity) setOrDelete("city", next.city);
      setOrDelete("region", next.region);
      if (!lockIndustry) setOrDelete("industry", next.industry);
      if (next.sort && next.sort !== "newest") params.set("sort", next.sort);
      setOrDelete("confidential", next.confidential);
      setOrDelete("status", next.status);
      setOrDelete("minAmount", next.minAmount);
      setOrDelete("maxAmount", next.maxAmount);
      if (next.disclosedOnly) params.set("disclosedOnly", "1");
      if (next.view && next.view !== "grid") params.set("view", next.view);
      if (next.pageSize && next.pageSize !== "12") {
        params.set("pageSize", next.pageSize);
      }
      const qs = params.toString();
      startTransition(() => {
        router.push(qs ? `${pathname}?${qs}` : pathname);
        setMobileOpen(false);
      });
    },
    [lockCity, lockIndustry, pathname, router],
  );

  const apply = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      pushParams({
        q,
        city,
        region,
        industry,
        sort,
        confidential,
        status,
        minAmount,
        maxAmount,
        disclosedOnly,
        view,
        pageSize,
      });
    },
    [
      city,
      confidential,
      disclosedOnly,
      industry,
      maxAmount,
      minAmount,
      pageSize,
      pushParams,
      q,
      region,
      sort,
      status,
      view,
    ],
  );

  const clear = useCallback(() => {
    setQ("");
    if (!lockCity) setCity("");
    setRegion("");
    if (!lockIndustry) setIndustry("");
    setSort("newest");
    setConfidential("");
    setStatus("");
    setMinAmount("");
    setMaxAmount("");
    setDisclosedOnly(false);
    setView("grid");
    setPageSize("12");
    startTransition(() => {
      router.push(pathname);
      setMobileOpen(false);
    });
  }, [lockCity, lockIndustry, pathname, router]);

  const applyBand = (band: { min: string; max: string }) => {
    setMinAmount(band.min);
    setMaxAmount(band.max);
    pushParams({
      q,
      city,
      region,
      industry,
      sort,
      confidential,
      status,
      minAmount: band.min,
      maxAmount: band.max,
      disclosedOnly: true,
      view,
      pageSize,
    });
    setDisclosedOnly(true);
  };

  const form = (
    <form
      onSubmit={apply}
      className={cn(
        "flex h-full flex-col gap-5",
        variant === "sidebar" && "lg:sticky lg:top-[calc(var(--demo-banner-h,2.5rem)+4.5rem)]",
      )}
      aria-label="Listing filters"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <SlidersHorizontal
            className="h-4 w-4 text-[var(--brand-blue-accessible-light)]"
            aria-hidden
          />
          <h2 className="font-[family-name:var(--font-google-sans)] text-lg font-semibold text-[var(--text-heading)]">
            Filters
          </h2>
          {activeCount > 0 ? (
            <span className="rounded-full bg-[#1E6EF4] px-2 py-0.5 text-xs font-semibold !text-white">
              {activeCount}
            </span>
          ) : null}
        </div>
        <button
          type="button"
          className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-xl hover:bg-[var(--surface-subtle)]"
          aria-label="Close filters"
          onClick={() => setMobileOpen(false)}
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="listing-q">Keywords</Label>
        <Input
          id="listing-q"
          name="q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Café, laundry, code…"
          autoComplete="off"
        />
      </div>

      <fieldset className="space-y-3">
        <legend className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--text-heading)]">
          Location
        </legend>
        <div className="space-y-2">
          <Label htmlFor="listing-region">Region</Label>
          <select
            id="listing-region"
            className={selectClass}
            value={region}
            onChange={(e) => {
              const next = e.target.value;
              setRegion(next);
              if (city) {
                const stillValid = tennesseeCities.some(
                  (c) => c.slug === city && (!next || c.region === next),
                );
                if (!stillValid) setCity("");
              }
            }}
          >
            <option value="">All regions</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="listing-city">City</Label>
          <select
            id="listing-city"
            className={selectClass}
            value={city}
            disabled={lockCity}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">All cities</option>
            {citiesForRegion.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      <fieldset className="space-y-2">
        <legend className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--text-heading)]">
          Industry
        </legend>
        <select
          id="listing-industry"
          className={selectClass}
          value={industry}
          disabled={lockIndustry}
          onChange={(e) => setIndustry(e.target.value)}
        >
          <option value="">All industries</option>
          {industries.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--text-heading)]">
          Amount
        </legend>
        <div className="flex flex-wrap gap-1.5">
          {amountBands.map((band) => {
            const active = minAmount === band.min && maxAmount === band.max;
            return (
              <button
                key={band.label}
                type="button"
                onClick={() => applyBand(band)}
                className={cn(
                  "rounded-full px-2.5 py-1 text-xs font-semibold transition",
                  active
                    ? "bg-[#1E6EF4] !text-white"
                    : "border border-[var(--border-subtle)] bg-[var(--surface-page)] text-[var(--text-heading)] hover:border-[var(--brand-blue-accessible-light)]",
                )}
              >
                {band.label}
              </button>
            );
          })}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1.5">
            <Label htmlFor="listing-min">Min ($)</Label>
            <Input
              id="listing-min"
              inputMode="numeric"
              value={minAmount}
              onChange={(e) => setMinAmount(e.target.value)}
              placeholder="0"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="listing-max">Max ($)</Label>
            <Input
              id="listing-max"
              inputMode="numeric"
              value={maxAmount}
              onChange={(e) => setMaxAmount(e.target.value)}
              placeholder="Any"
            />
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm text-[var(--text-body)]">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-[var(--border-subtle)]"
            checked={disclosedOnly}
            onChange={(e) => setDisclosedOnly(e.target.checked)}
          />
          Only disclosed amounts
        </label>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--text-heading)]">
          Listing attributes
        </legend>
        <div className="space-y-2">
          <Label htmlFor="listing-status">Status</Label>
          <select
            id="listing-status"
            className={selectClass}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Active + negotiating</option>
            <option value="active">Active only</option>
            <option value="under-negotiation">Under negotiation</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="listing-confidential">Confidentiality</Label>
          <select
            id="listing-confidential"
            className={selectClass}
            value={confidential}
            onChange={(e) => setConfidential(e.target.value)}
          >
            <option value="">All listings</option>
            <option value="hide">Hide confidential</option>
            <option value="only">Confidential only</option>
          </select>
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--text-heading)]">
          Display
        </legend>
        <div className="space-y-2">
          <Label htmlFor="listing-sort">Sort</Label>
          <select
            id="listing-sort"
            className={selectClass}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            {listingSortValues.map((value) => (
              <option key={value} value={value}>
                {value === "newest"
                  ? "Newest first"
                  : value === "asking-asc"
                    ? "Amount: low to high"
                    : "Amount: high to low"}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="listing-view">Layout</Label>
          <div className="grid grid-cols-2 gap-2">
            {(["grid", "list"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setView(option)}
                className={cn(
                  "h-10 rounded-[var(--radius-control)] text-sm font-semibold capitalize transition",
                  view === option
                    ? "bg-[#1E6EF4] !text-white"
                    : "border border-[var(--border-subtle)] bg-[var(--surface-page)] text-[var(--text-heading)]",
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="listing-pagesize">Per page</Label>
          <select
            id="listing-pagesize"
            className={selectClass}
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value)}
          >
            {[12, 24, 36].map((n) => (
              <option key={n} value={n}>
                {n} results
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      <div className="mt-auto flex flex-col gap-2 border-t border-[var(--border-subtle)] pt-4">
        <Button type="submit" disabled={pending} className="w-full !text-white">
          {pending ? "Applying…" : "Apply filters"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={clear}
          disabled={pending}
          className="w-full"
        >
          <RotateCcw className="mr-2 h-4 w-4" aria-hidden />
          Clear all
        </Button>
      </div>
    </form>
  );

  if (variant === "panel") {
    return (
      <div className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-4 sm:p-5">
        {form}
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-3 lg:hidden">
        <Button
          type="button"
          variant="outline"
          className="inline-flex items-center gap-2"
          onClick={() => setMobileOpen(true)}
        >
          <Filter className="h-4 w-4" aria-hidden />
          Filters
          {activeCount > 0 ? (
            <span className="rounded-full bg-[#1E6EF4] px-1.5 text-[0.65rem] font-bold !text-white">
              {activeCount}
            </span>
          ) : null}
        </Button>
        {activeCount > 0 ? (
          <button
            type="button"
            className="text-sm font-semibold text-[var(--brand-blue-accessible-light)]"
            onClick={clear}
          >
            Clear
          </button>
        ) : null}
      </div>

      <aside className="hidden w-full shrink-0 lg:block lg:w-[17.5rem] xl:w-72">
        <div className="rounded-[1.25rem] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-5 shadow-[0_18px_40px_-32px_rgba(8,24,39,0.35)]">
          {form}
        </div>
      </aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-[#081827]/55"
            aria-label="Close filter drawer"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-[min(22rem,92vw)] overflow-y-auto bg-[var(--surface-card)] p-5 shadow-2xl">
            {form}
          </div>
        </div>
      ) : null}
    </>
  );
}

/** Active filter chips for the results toolbar. */
export function ActiveFilterChips({
  filters,
}: {
  filters: ListingFilterDefaults & { page?: number };
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const chips: { key: string; label: string }[] = [];
  if (filters.q) chips.push({ key: "q", label: `“${filters.q}”` });
  if (filters.region) chips.push({ key: "region", label: filters.region });
  if (filters.city) {
    const name = tennesseeCities.find((c) => c.slug === filters.city)?.name ?? filters.city;
    chips.push({ key: "city", label: name });
  }
  if (filters.industry) {
    const name =
      industries.find((i) => i.slug === filters.industry)?.name ?? filters.industry;
    chips.push({ key: "industry", label: name });
  }
  if (filters.minAmount || filters.maxAmount) {
    chips.push({
      key: "amount",
      label: `$${filters.minAmount || "0"}–$${filters.maxAmount || "∞"}`,
    });
  }
  if (filters.confidential === "hide") chips.push({ key: "confidential", label: "No confidential" });
  if (filters.confidential === "only") chips.push({ key: "confidential", label: "Confidential" });
  if (filters.status) chips.push({ key: "status", label: filters.status.replaceAll("-", " ") });
  if (filters.disclosedOnly === "1" || filters.disclosedOnly === "true") {
    chips.push({ key: "disclosedOnly", label: "Disclosed amounts" });
  }

  if (chips.length === 0) return null;

  function remove(key: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (key === "amount") {
      params.delete("minAmount");
      params.delete("maxAmount");
    } else {
      params.delete(key);
    }
    params.delete("page");
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  return (
    <ul className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <li key={chip.key + chip.label}>
          <button
            type="button"
            onClick={() => remove(chip.key)}
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-card)] px-3 py-1 text-xs font-semibold text-[var(--text-heading)] hover:border-[var(--brand-blue-accessible-light)]"
          >
            {chip.label}
            <X className="h-3 w-3" aria-hidden />
          </button>
        </li>
      ))}
    </ul>
  );
}
