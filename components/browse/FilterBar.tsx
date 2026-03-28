"use client";

import { useRef, useState, useEffect } from "react";
import { getGsap } from "@/animations/gsapClient";
import {
  useJobsStore,
  CATEGORIES,
  PLATFORMS,
  CITIES,
  NICHES,
  BUDGET_RANGES,
  type JobCategory,
  type JobPlatform,
  type JobCity,
  type JobNiche,
} from "@/store/jobsStore";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  MapPin,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Dropdown                                                            */
/* ------------------------------------------------------------------ */

function Dropdown<T extends string>({
  label,
  icon,
  options,
  value,
  onChange,
}: {
  label: string;
  icon?: React.ReactNode;
  options: T[];
  value: T | null;
  onChange: (val: T | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={[
          "flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
          value
            ? "bg-gray-900 text-white dark:bg-white dark:text-black"
            : "border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900 dark:border-white/[0.1] dark:text-white/50 dark:hover:border-white/[0.2] dark:hover:text-white/70",
        ].join(" ")}
      >
        {icon}
        <span>{value || label}</span>
        <ChevronDown
          size={14}
          className={[
            "transition-transform duration-200",
            open ? "rotate-180" : "",
          ].join(" ")}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 min-w-[200px] overflow-hidden rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl dark:border-white/[0.1] dark:bg-[#141414]">
          {value && (
            <button
              onClick={() => {
                onChange(null);
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-500 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
            >
              <X size={13} />
              Clear
            </button>
          )}
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={[
                "flex w-full items-center rounded-lg px-3 py-2 text-sm transition-colors",
                opt === value
                  ? "bg-gray-100 font-medium text-gray-900 dark:bg-white/[0.08] dark:text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-white/50 dark:hover:bg-white/[0.04] dark:hover:text-white/70",
              ].join(" ")}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Budget Dropdown                                                     */
/* ------------------------------------------------------------------ */

function BudgetDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const filters = useJobsStore((s) => s.filters);
  const setFilter = useJobsStore((s) => s.setFilter);

  const activeLabel = BUDGET_RANGES.find(
    (r) => r.min === filters.budgetMin && r.max === filters.budgetMax
  )?.label;

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={[
          "flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
          activeLabel
            ? "bg-gray-900 text-white dark:bg-white dark:text-black"
            : "border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900 dark:border-white/[0.1] dark:text-white/50 dark:hover:border-white/[0.2] dark:hover:text-white/70",
        ].join(" ")}
      >
        <span>{activeLabel || "Budget"}</span>
        <ChevronDown
          size={14}
          className={[
            "transition-transform duration-200",
            open ? "rotate-180" : "",
          ].join(" ")}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 min-w-[180px] overflow-hidden rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl dark:border-white/[0.1] dark:bg-[#141414]">
          {activeLabel && (
            <button
              onClick={() => {
                setFilter("budgetMin", null);
                setFilter("budgetMax", null);
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-500 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
            >
              <X size={13} />
              Clear
            </button>
          )}
          {BUDGET_RANGES.map((range) => (
            <button
              key={range.label}
              onClick={() => {
                setFilter("budgetMin", range.min);
                setFilter("budgetMax", range.max);
                setOpen(false);
              }}
              className={[
                "flex w-full items-center rounded-lg px-3 py-2 text-sm transition-colors",
                range.min === filters.budgetMin &&
                range.max === filters.budgetMax
                  ? "bg-gray-100 font-medium text-gray-900 dark:bg-white/[0.08] dark:text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-white/50 dark:hover:bg-white/[0.04] dark:hover:text-white/70",
              ].join(" ")}
            >
              {range.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Filter Bar                                                          */
/* ------------------------------------------------------------------ */

export function FilterBar() {
  const filters = useJobsStore((s) => s.filters);
  const setFilter = useJobsStore((s) => s.setFilter);
  const clearFilters = useJobsStore((s) => s.clearFilters);
  const activeFilterCount = useJobsStore((s) => s.activeFilterCount);
  const filteredJobs = useJobsStore((s) => s.filteredJobs);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsap = getGsap();
    if (barRef.current) {
      gsap.fromTo(
        barRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    }
  }, []);

  const count = activeFilterCount();

  return (
    <div
      ref={barRef}
      className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur-xl dark:border-white/[0.06] dark:bg-black/80"
    >
      <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
        {/* Search bar */}
        <div className="relative mb-4">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/30"
          />
          <input
            type="text"
            placeholder="Search jobs, brands, skills..."
            value={filters.search}
            onChange={(e) => setFilter("search", e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-200 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white dark:placeholder-white/25 dark:focus:border-white/[0.15] dark:focus:bg-white/[0.05] dark:focus:ring-white/[0.05]"
          />
        </div>

        {/* Filters row */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="mr-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-white/25">
            <SlidersHorizontal size={14} />
            <span className="hidden sm:inline">Filters</span>
          </div>

          <Dropdown<JobCategory>
            label="Category"
            options={CATEGORIES}
            value={filters.category}
            onChange={(val) => setFilter("category", val)}
          />

          <Dropdown<JobPlatform>
            label="Platform"
            options={PLATFORMS}
            value={filters.platform}
            onChange={(val) => setFilter("platform", val)}
          />

          <Dropdown<JobCity>
            label="City"
            icon={<MapPin size={14} />}
            options={CITIES}
            value={filters.city}
            onChange={(val) => setFilter("city", val)}
          />

          <BudgetDropdown />

          <Dropdown<JobNiche>
            label="Niche"
            options={NICHES}
            value={filters.niche}
            onChange={(val) => setFilter("niche", val)}
          />

          {/* Clear All + Count */}
          <div className="ml-auto flex items-center gap-3">
            <span className="text-xs text-gray-400 dark:text-white/25">
              {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""}
            </span>
            {count > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-red-500 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
              >
                <X size={13} />
                Clear All ({count})
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
