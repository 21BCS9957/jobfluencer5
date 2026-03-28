"use client";

import { useRef } from "react";
import { getGsap } from "@/animations/gsapClient";
import { useJobsStore, type BrowseJob } from "@/store/jobsStore";
import {
  MapPin,
  Clock,
  Users,
  Bookmark,
  BookmarkCheck,
  ArrowUpRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Platform icons (colored pills)                                      */
/* ------------------------------------------------------------------ */

const PLATFORM_COLORS: Record<string, string> = {
  Instagram:
    "bg-gradient-to-r from-pink-500/10 to-purple-500/10 text-pink-600 dark:from-pink-500/15 dark:to-purple-500/15 dark:text-pink-400",
  YouTube:
    "bg-red-500/10 text-red-600 dark:bg-red-500/15 dark:text-red-400",
  TikTok:
    "bg-gray-900/10 text-gray-900 dark:bg-white/10 dark:text-white/70",
  LinkedIn:
    "bg-blue-500/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400",
  Twitter:
    "bg-sky-500/10 text-sky-600 dark:bg-sky-500/15 dark:text-sky-400",
};

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */

export function BrowseJobCard({ job }: { job: BrowseJob }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const setSelectedJob = useJobsStore((s) => s.setSelectedJob);
  const toggleBookmark = useJobsStore((s) => s.toggleBookmark);
  const isBookmarked = useJobsStore((s) => s.isBookmarked);
  const hasApplied = useJobsStore((s) => s.hasApplied);
  const bookmarked = isBookmarked(job.id);
  const applied = hasApplied(job.id);

  const enter = () => {
    const gsap = getGsap();
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      y: -6,
      scale: 1.015,
      duration: 0.3,
      ease: "power2.out",
    });
    if (shineRef.current) {
      gsap.to(shineRef.current, {
        opacity: 1,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  };

  const leave = () => {
    const gsap = getGsap();
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      duration: 0.35,
      ease: "power2.out",
    });
    if (shineRef.current) {
      gsap.to(shineRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  };

  return (
    <article
      ref={cardRef}
      onMouseEnter={enter}
      onMouseLeave={leave}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white will-change-transform dark:border-white/[0.06] dark:bg-white/[0.02]"
      style={{
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      {/* Hover shine */}
      <div
        ref={shineRef}
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.08), transparent 60%)",
        }}
      />

      {/* Applied badge */}
      {applied && (
        <div className="absolute right-4 top-4 z-10 rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
          Applied ✓
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        {/* Top: Brand + Bookmark */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
              src={job.brandLogo}
              alt={job.brand}
              className="h-10 w-10 rounded-xl object-cover ring-1 ring-gray-200 dark:ring-white/[0.08]"
            />
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-white/70">
                {job.brand}
              </p>
              <p className="mt-0.5 flex items-center gap-1 text-[11px] text-gray-400 dark:text-white/25">
                <MapPin size={10} strokeWidth={2} />
                {job.city}
              </p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark(job.id);
            }}
            className={[
              "flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200",
              bookmarked
                ? "bg-amber-50 text-amber-500 dark:bg-amber-500/10 dark:text-amber-400"
                : "text-gray-300 hover:bg-gray-50 hover:text-gray-500 dark:text-white/15 dark:hover:bg-white/[0.04] dark:hover:text-white/40",
            ].join(" ")}
            aria-label={bookmarked ? "Remove bookmark" : "Bookmark job"}
          >
            {bookmarked ? (
              <BookmarkCheck size={16} />
            ) : (
              <Bookmark size={16} />
            )}
          </button>
        </div>

        {/* Title */}
        <h3 className="mt-4 text-base font-semibold leading-snug text-gray-900 dark:text-white/90">
          {job.title}
        </h3>

        {/* Description */}
        <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500 dark:text-white/35 line-clamp-2">
          {job.description}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span
            className={[
              "rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
              PLATFORM_COLORS[job.platform] || "",
            ].join(" ")}
          >
            {job.platform}
          </span>
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:bg-white/[0.05] dark:text-white/35">
            {job.niche}
          </span>
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:bg-white/[0.05] dark:text-white/35">
            {job.category}
          </span>
        </div>

        {/* Meta */}
        <div className="mt-4 flex items-center gap-4 text-[11px] text-gray-400 dark:text-white/20">
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {job.postedAt}
          </span>
          <span className="flex items-center gap-1">
            <Users size={11} />
            {job.applicants} applicants
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4 dark:border-white/[0.04]">
        <span className="text-base font-semibold text-gray-900 dark:text-white/70">
          {job.budgetDisplay}
        </span>
        <button
          onClick={() => setSelectedJob(job)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-gray-900 px-5 py-2.5 text-xs font-semibold text-white transition-all duration-200 hover:bg-black hover:shadow-lg dark:bg-white/[0.08] dark:text-white/70 dark:hover:bg-white dark:hover:text-black"
        >
          View Details
          <ArrowUpRight
            size={13}
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </button>
      </div>
    </article>
  );
}
