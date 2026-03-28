"use client";

import { useEffect, useRef, useState } from "react";
import { useDashboardStore } from "@/store/dashboardStore";
import { useJobsStore, type BrowseJob } from "@/store/jobsStore";
import { getGsap } from "@/animations/gsapClient";
import {
  MapPin,
  Bookmark,
  BookmarkCheck,
  ArrowUpRight,
  ExternalLink,
  Clock,
  Users,
} from "lucide-react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/* Platform colors                                                     */
/* ------------------------------------------------------------------ */

const PLATFORM_COLORS: Record<string, string> = {
  Instagram:
    "bg-gradient-to-r from-pink-500/10 to-purple-500/10 text-pink-600 dark:from-pink-500/15 dark:to-purple-500/15 dark:text-pink-400",
  YouTube: "bg-red-500/10 text-red-600 dark:bg-red-500/15 dark:text-red-400",
  TikTok: "bg-gray-900/10 text-gray-900 dark:bg-white/10 dark:text-white/70",
  LinkedIn:
    "bg-blue-500/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400",
  Twitter: "bg-sky-500/10 text-sky-600 dark:bg-sky-500/15 dark:text-sky-400",
};

export function ExploreJobsView() {
  const exploreJobs = useJobsStore((s) => s.filteredJobs).slice(0, 6);
  const toggleBookmark = useJobsStore((s) => s.toggleBookmark);
  const isBookmarked = useJobsStore((s) => s.isBookmarked);
  const setSelectedJob = useJobsStore((s) => s.setSelectedJob);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const FILTERS = [
    "All",
    "Instagram",
    "YouTube",
    "TikTok",
    "Fashion",
    "Tech",
    "Food",
    "Beauty",
  ];

  useEffect(() => {
    const gsap = getGsap();
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    }
    if (gridRef.current) {
      const cards = gridRef.current.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 25, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          ease: "power3.out",
          stagger: 0.06,
          delay: 0.15,
        }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="px-8 py-8 lg:px-12">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Explore Jobs
          </h1>
          <p className="mt-2 text-base text-gray-500 dark:text-white/40">
            Discover campaigns looking for your talent
          </p>
        </div>
        <Link
          href="/jobs"
          className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-xs font-semibold text-white transition-all duration-200 hover:bg-black hover:shadow-lg dark:bg-white/[0.08] dark:text-white/70 dark:hover:bg-white dark:hover:text-black"
        >
          <ExternalLink size={14} />
          Browse All Jobs
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={[
              "rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200",
              filter === activeFilter
                ? "bg-gray-900 text-white dark:bg-white dark:text-black"
                : "border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-900 dark:border-white/[0.08] dark:text-white/40 dark:hover:border-white/[0.15] dark:hover:text-white/60",
            ].join(" ")}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
      >
        {exploreJobs.map((job) => {
          const bookmarked = isBookmarked(job.id);

          return (
            <div
              key={job.id}
              className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md dark:border-white/[0.06] dark:bg-white/[0.02] dark:hover:border-white/[0.12] dark:hover:bg-white/[0.04] dark:hover:shadow-none"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={job.brandLogo}
                    alt={job.brand}
                    className="h-10 w-10 rounded-xl object-cover ring-1 ring-gray-200 dark:ring-white/[0.06]"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-white/70">
                      {job.brand}
                    </p>
                    <p className="flex items-center gap-1 text-[10px] text-gray-400 dark:text-white/25">
                      <MapPin size={10} />
                      {job.city}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toggleBookmark(job.id)}
                  className={[
                    "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                    bookmarked
                      ? "bg-amber-50 text-amber-500 dark:bg-amber-500/10 dark:text-amber-400"
                      : "text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:text-white/20 dark:hover:bg-white/[0.05] dark:hover:text-white/50",
                  ].join(" ")}
                >
                  {bookmarked ? (
                    <BookmarkCheck size={14} />
                  ) : (
                    <Bookmark size={14} />
                  )}
                </button>
              </div>

              <h3 className="mt-4 text-base font-semibold leading-snug text-gray-900 dark:text-white/85">
                {job.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500 dark:text-white/30 line-clamp-2">
                {job.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span
                  className={[
                    "rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                    PLATFORM_COLORS[job.platform] || "",
                  ].join(" ")}
                >
                  {job.platform}
                </span>
                <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[10px] font-medium text-gray-600 dark:bg-white/[0.05] dark:text-white/35">
                  {job.niche}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-3 text-[10px] text-gray-400 dark:text-white/20">
                <span className="flex items-center gap-1">
                  <Clock size={10} />
                  {job.postedAt}
                </span>
                <span className="flex items-center gap-1">
                  <Users size={10} />
                  {job.applicants}
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-white/[0.04]">
                <span className="text-sm font-semibold text-gray-900 dark:text-white/50">
                  {job.budgetDisplay}
                </span>
                <button
                  onClick={() => setSelectedJob(job)}
                  className="flex items-center gap-1.5 rounded-lg bg-gray-900 px-4 py-2 text-xs font-medium text-white transition-all duration-200 hover:bg-black hover:shadow-md dark:bg-white/[0.06] dark:text-white/60 dark:hover:bg-white dark:hover:text-black"
                >
                  View Details
                  <ArrowUpRight size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
