"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/animations/gsapClient";
import { useJobsStore } from "@/store/jobsStore";
import {
  X,
  MapPin,
  Clock,
  Users,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  ArrowRight,
  Briefcase,
  CalendarClock,
  Target,
  Building2,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Platform gradient banners                                           */
/* ------------------------------------------------------------------ */

const PLATFORM_GRADIENTS: Record<string, string> = {
  Instagram: "from-pink-500/20 via-purple-500/20 to-orange-400/20",
  YouTube: "from-red-500/20 via-red-600/20 to-red-400/20",
  TikTok: "from-gray-800/30 via-gray-600/20 to-gray-400/20",
  LinkedIn: "from-blue-500/20 via-blue-600/20 to-blue-400/20",
  Twitter: "from-sky-400/20 via-sky-500/20 to-sky-300/20",
};

export function JobDetailModal() {
  const job = useJobsStore((s) => s.selectedJob);
  const setSelectedJob = useJobsStore((s) => s.setSelectedJob);
  const setApplyingJob = useJobsStore((s) => s.setApplyingJob);
  const toggleBookmark = useJobsStore((s) => s.toggleBookmark);
  const isBookmarked = useJobsStore((s) => s.isBookmarked);
  const hasApplied = useJobsStore((s) => s.hasApplied);

  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /* Animate in */
  useEffect(() => {
    if (!job) return;
    const gsap = getGsap();

    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    );
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, scale: 0.96, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out", delay: 0.05 }
    );

    /* Lock scroll */
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [job]);

  /* Close on escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  const close = () => {
    const gsap = getGsap();
    gsap.to(panelRef.current, {
      opacity: 0,
      scale: 0.97,
      y: 20,
      duration: 0.25,
      ease: "power2.in",
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => setSelectedJob(null),
    });
  };

  if (!job) return null;

  const bookmarked = isBookmarked(job.id);
  const applied = hasApplied(job.id);
  const gradient = PLATFORM_GRADIENTS[job.platform] || PLATFORM_GRADIENTS.Instagram;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto px-4 py-8 md:items-center md:py-0">
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={close}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm dark:bg-black/70"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl dark:border-white/[0.08] dark:bg-[#111111] md:my-8"
      >
        {/* Gradient banner */}
        <div
          className={`h-2 w-full bg-gradient-to-r ${gradient}`}
        />

        {/* Close */}
        <button
          onClick={close}
          className="absolute right-4 top-6 z-10 flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white/80 text-gray-400 backdrop-blur-sm transition-colors hover:text-gray-900 dark:border-white/[0.1] dark:bg-black/50 dark:text-white/30 dark:hover:text-white"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        <div className="max-h-[80vh] overflow-y-auto p-8">
          {/* Header */}
          <div className="flex items-start gap-4">
            <img
              src={job.brandLogo}
              alt={job.brand}
              className="h-14 w-14 flex-shrink-0 rounded-2xl object-cover ring-1 ring-gray-200 dark:ring-white/[0.08]"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-gray-600 dark:text-white/50">
                  {job.brand}
                </p>
                {applied && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
                    <CheckCircle2 size={10} />
                    Applied
                  </span>
                )}
              </div>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {job.title}
              </h2>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-xl bg-gray-100 px-3.5 py-2 text-sm dark:bg-white/[0.05]">
              <span className="text-gray-400 dark:text-white/30">Budget</span>
              <span className="font-semibold text-gray-900 dark:text-white/80">
                {job.budgetDisplay}
              </span>
            </div>
            <div className="flex items-center gap-1.5 rounded-xl bg-gray-100 px-3.5 py-2 text-sm dark:bg-white/[0.05]">
              <MapPin size={14} className="text-gray-400 dark:text-white/30" />
              <span className="text-gray-700 dark:text-white/60">{job.city}</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-xl bg-gray-100 px-3.5 py-2 text-sm dark:bg-white/[0.05]">
              <Clock size={14} className="text-gray-400 dark:text-white/30" />
              <span className="text-gray-700 dark:text-white/60">
                {job.postedAt}
              </span>
            </div>
            <div className="flex items-center gap-1.5 rounded-xl bg-gray-100 px-3.5 py-2 text-sm dark:bg-white/[0.05]">
              <Users size={14} className="text-gray-400 dark:text-white/30" />
              <span className="text-gray-700 dark:text-white/60">
                {job.applicants} applicants
              </span>
            </div>
          </div>

          {/* Average bids hint */}
          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 dark:border-emerald-500/20 dark:bg-emerald-500/5">
            <p className="text-xs text-emerald-700 dark:text-emerald-400">
              💡 Average bids for this job range from{" "}
              <span className="font-semibold">
                ₹{(job.avgBidLow / 1000).toFixed(0)}K
              </span>{" "}
              to{" "}
              <span className="font-semibold">
                ₹{(job.avgBidHigh / 1000).toFixed(0)}K
              </span>
            </p>
          </div>

          {/* Description */}
          <section className="mt-8">
            <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-white/25">
              <Briefcase size={14} />
              Description
            </h3>
            <div className="mt-3 whitespace-pre-line text-sm leading-relaxed text-gray-700 dark:text-white/50">
              {job.fullDescription}
            </div>
          </section>

          {/* Deliverables */}
          <section className="mt-8">
            <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-white/25">
              <Target size={14} />
              Deliverables
            </h3>
            <ul className="mt-3 space-y-2">
              {job.deliverables.map((d, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-white/50"
                >
                  <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0 text-emerald-500 dark:text-emerald-400" />
                  {d}
                </li>
              ))}
            </ul>
          </section>

          {/* Timeline */}
          <section className="mt-8">
            <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-white/25">
              <CalendarClock size={14} />
              Timeline
            </h3>
            <p className="mt-3 text-sm text-gray-700 dark:text-white/50">
              {job.timeline}
            </p>
          </section>

          {/* Expectations */}
          <section className="mt-8">
            <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-white/25">
              <Target size={14} />
              Requirements & Expectations
            </h3>
            <ul className="mt-3 space-y-2">
              {job.expectations.map((e, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-white/50"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-300 dark:bg-white/20" />
                  {e}
                </li>
              ))}
            </ul>
          </section>

          {/* About Brand */}
          <section className="mt-8 rounded-2xl border border-gray-100 bg-gray-50 p-5 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-white/25">
              <Building2 size={14} />
              About {job.brand}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-white/40">
              {job.brandDescription}
            </p>
          </section>
        </div>

        {/* Bottom action bar */}
        <div className="flex items-center justify-between border-t border-gray-100 px-8 py-5 dark:border-white/[0.06]">
          <button
            onClick={() => toggleBookmark(job.id)}
            className={[
              "flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
              bookmarked
                ? "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
                : "border border-gray-200 text-gray-500 hover:text-gray-900 dark:border-white/[0.1] dark:text-white/40 dark:hover:text-white/70",
            ].join(" ")}
          >
            {bookmarked ? (
              <BookmarkCheck size={16} />
            ) : (
              <Bookmark size={16} />
            )}
            {bookmarked ? "Saved" : "Save Job"}
          </button>

          {applied ? (
            <span className="flex items-center gap-2 rounded-xl bg-emerald-100 px-6 py-2.5 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
              <CheckCircle2 size={16} />
              Application Submitted
            </span>
          ) : (
            <button
              onClick={() => {
                setApplyingJob(job);
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-black hover:shadow-xl dark:bg-white dark:text-black dark:hover:bg-gray-100"
            >
              Apply Now
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
