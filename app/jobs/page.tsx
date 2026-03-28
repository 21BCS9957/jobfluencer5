"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/animations/gsapClient";
import { useJobsStore } from "@/store/jobsStore";
import { FilterBar } from "@/components/browse/FilterBar";
import { BrowseJobCard } from "@/components/browse/BrowseJobCard";
import { JobDetailModal } from "@/components/browse/JobDetailModal";
import { ApplyModal } from "@/components/browse/ApplyModal";
import {
  Briefcase,
  ArrowLeft,
  Sparkles,
  SearchX,
} from "lucide-react";
import Link from "next/link";

export default function BrowseJobsPage() {
  const filteredJobs = useJobsStore((s) => s.filteredJobs);
  const selectedJob = useJobsStore((s) => s.selectedJob);
  const applyingJob = useJobsStore((s) => s.applyingJob);
  const activeFilterCount = useJobsStore((s) => s.activeFilterCount);
  const clearFilters = useJobsStore((s) => s.clearFilters);

  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  /* Stagger animate cards on load & filter change */
  useEffect(() => {
    const gsap = getGsap();
    if (gridRef.current) {
      const cards = gridRef.current.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power3.out",
          stagger: 0.06,
          delay: 0.1,
        }
      );
    }
  }, [filteredJobs]);

  /* Animate header */
  useEffect(() => {
    const gsap = getGsap();
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  }, []);

  const count = activeFilterCount();

  return (
    <main className="min-h-screen bg-[#FAFAFA] dark:bg-black transition-colors duration-300">
      {/* Navigation bar */}
      <nav className="border-b border-gray-200 bg-white dark:border-white/[0.06] dark:bg-[#0A0A0A]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-400 transition-colors hover:text-gray-900 dark:border-white/[0.1] dark:text-white/30 dark:hover:text-white"
              aria-label="Back to Dashboard"
            >
              <ArrowLeft size={16} />
            </Link>
            <div>
              <span className="text-sm font-semibold tracking-[0.15em] uppercase text-gray-900 dark:text-white">
                Jobfluencer
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-white/25">
              <Sparkles size={12} />
              Premium Marketplace
            </span>
          </div>
        </div>
      </nav>

      {/* Filter bar */}
      <FilterBar />

      {/* Page content */}
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {/* Section header */}
        <div ref={headerRef} className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 dark:bg-white/[0.08]">
              <Briefcase size={18} className="text-white dark:text-white/60" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Browse Jobs
              </h1>
              <p className="mt-0.5 text-sm text-gray-500 dark:text-white/35">
                Discover high-value campaigns from top brands
              </p>
            </div>
          </div>
        </div>

        {/* Grid */}
        {filteredJobs.length > 0 ? (
          <div
            ref={gridRef}
            className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            {filteredJobs.map((job) => (
              <BrowseJobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-20">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 dark:bg-white/[0.05]">
              <SearchX size={28} className="text-gray-300 dark:text-white/20" />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-gray-900 dark:text-white/70">
              No jobs match your filters
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-white/30">
              Try adjusting your filters or search terms
            </p>
            {count > 0 && (
              <button
                onClick={clearFilters}
                className="mt-5 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-black dark:bg-white dark:text-black dark:hover:bg-gray-100"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedJob && <JobDetailModal />}
      {applyingJob && <ApplyModal />}
    </main>
  );
}
