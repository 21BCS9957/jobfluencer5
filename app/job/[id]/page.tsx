"use client";

import { use, useEffect, useRef } from "react";
import { getGsap } from "@/animations/gsapClient";
import { useJobsStore } from "@/store/jobsStore";
import { JobDetailModal } from "@/components/browse/JobDetailModal";
import { ApplyModal } from "@/components/browse/ApplyModal";
import Link from "next/link";
import {
  ArrowLeft,
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
  Sparkles,
} from "lucide-react";

type JobDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function JobDetailsPage({ params }: JobDetailsPageProps) {
  const { id } = use(params);
  const jobs = useJobsStore((s) => s.jobs);
  const toggleBookmark = useJobsStore((s) => s.toggleBookmark);
  const isBookmarked = useJobsStore((s) => s.isBookmarked);
  const hasApplied = useJobsStore((s) => s.hasApplied);
  const setApplyingJob = useJobsStore((s) => s.setApplyingJob);
  const applyingJob = useJobsStore((s) => s.applyingJob);
  const addToRecentlyViewed = useJobsStore((s) => s.addToRecentlyViewed);

  const job = jobs.find((j) => j.id === id);
  const bookmarked = job ? isBookmarked(job.id) : false;
  const applied = job ? hasApplied(job.id) : false;

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (job) addToRecentlyViewed(job.id);
  }, [job]);

  useEffect(() => {
    const gsap = getGsap();
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  }, []);

  if (!job) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAFAFA] dark:bg-black">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Job Not Found
          </h1>
          <p className="mt-2 text-gray-500 dark:text-white/40">
            This job listing may have been removed or does not exist.
          </p>
          <Link
            href="/jobs"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white dark:bg-white dark:text-black"
          >
            <ArrowLeft size={16} />
            Browse Jobs
          </Link>
        </div>
      </main>
    );
  }

  const PLATFORM_GRADIENTS: Record<string, string> = {
    Instagram: "from-pink-500/20 via-purple-500/20 to-orange-400/20",
    YouTube: "from-red-500/20 via-red-600/20 to-red-400/20",
    TikTok: "from-gray-800/30 via-gray-600/20 to-gray-400/20",
    LinkedIn: "from-blue-500/20 via-blue-600/20 to-blue-400/20",
    Twitter: "from-sky-400/20 via-sky-500/20 to-sky-300/20",
  };

  const gradient =
    PLATFORM_GRADIENTS[job.platform] || PLATFORM_GRADIENTS.Instagram;

  return (
    <main className="min-h-screen bg-[#FAFAFA] dark:bg-black transition-colors duration-300">
      {/* Nav */}
      <nav className="border-b border-gray-200 bg-white dark:border-white/[0.06] dark:bg-[#0A0A0A]">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/jobs"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-400 transition-colors hover:text-gray-900 dark:border-white/[0.1] dark:text-white/30 dark:hover:text-white"
            >
              <ArrowLeft size={16} />
            </Link>
            <span className="text-sm font-semibold tracking-[0.15em] uppercase text-gray-900 dark:text-white">
              Jobfluencer
            </span>
          </div>
          <span className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-white/25">
            <Sparkles size={12} />
            Job Details
          </span>
        </div>
      </nav>

      {/* Gradient banner */}
      <div className={`h-2 w-full bg-gradient-to-r ${gradient}`} />

      <div
        ref={containerRef}
        className="mx-auto max-w-4xl px-6 py-10"
      >
        {/* Header */}
        <div className="flex items-start gap-4">
          <img
            src={job.brandLogo}
            alt={job.brand}
            className="h-16 w-16 flex-shrink-0 rounded-2xl object-cover ring-1 ring-gray-200 dark:ring-white/[0.08]"
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
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              {job.title}
            </h1>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-sm ring-1 ring-gray-200 dark:bg-white/[0.03] dark:ring-white/[0.08]">
            <span className="text-gray-400 dark:text-white/30">Budget</span>
            <span className="font-semibold text-gray-900 dark:text-white/80">
              {job.budgetDisplay}
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-sm ring-1 ring-gray-200 dark:bg-white/[0.03] dark:ring-white/[0.08]">
            <MapPin size={14} className="text-gray-400 dark:text-white/30" />
            <span className="text-gray-700 dark:text-white/60">{job.city}</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-sm ring-1 ring-gray-200 dark:bg-white/[0.03] dark:ring-white/[0.08]">
            <Clock size={14} className="text-gray-400 dark:text-white/30" />
            <span className="text-gray-700 dark:text-white/60">
              {job.postedAt}
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-sm ring-1 ring-gray-200 dark:bg-white/[0.03] dark:ring-white/[0.08]">
            <Users size={14} className="text-gray-400 dark:text-white/30" />
            <span className="text-gray-700 dark:text-white/60">
              {job.applicants} applicants
            </span>
          </div>
        </div>

        {/* Average bids */}
        <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 dark:border-emerald-500/20 dark:bg-emerald-500/5">
          <p className="text-xs text-emerald-700 dark:text-emerald-400">
            💡 Average bids range from{" "}
            <span className="font-semibold">
              ₹{(job.avgBidLow / 1000).toFixed(0)}K
            </span>{" "}
            to{" "}
            <span className="font-semibold">
              ₹{(job.avgBidHigh / 1000).toFixed(0)}K
            </span>
          </p>
        </div>

        {/* Content */}
        <div className="mt-10 space-y-10">
          {/* Description */}
          <section>
            <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-white/25">
              <Briefcase size={14} />
              Description
            </h2>
            <div className="mt-3 whitespace-pre-line text-sm leading-relaxed text-gray-700 dark:text-white/50">
              {job.fullDescription}
            </div>
          </section>

          {/* Deliverables */}
          <section>
            <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-white/25">
              <Target size={14} />
              Deliverables
            </h2>
            <ul className="mt-3 space-y-2">
              {job.deliverables.map((d, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-white/50"
                >
                  <CheckCircle2
                    size={14}
                    className="mt-0.5 flex-shrink-0 text-emerald-500 dark:text-emerald-400"
                  />
                  {d}
                </li>
              ))}
            </ul>
          </section>

          {/* Timeline */}
          <section>
            <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-white/25">
              <CalendarClock size={14} />
              Timeline
            </h2>
            <p className="mt-3 text-sm text-gray-700 dark:text-white/50">
              {job.timeline}
            </p>
          </section>

          {/* Expectations */}
          <section>
            <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-white/25">
              <Target size={14} />
              Requirements & Expectations
            </h2>
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
          <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-white/25">
              <Building2 size={14} />
              About {job.brand}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-white/40">
              {job.brandDescription}
            </p>
          </section>
        </div>

        {/* Action bar */}
        <div className="mt-10 flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-8 py-5 dark:border-white/[0.06] dark:bg-white/[0.02]">
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
              onClick={() => setApplyingJob(job)}
              className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-black hover:shadow-xl dark:bg-white dark:text-black dark:hover:bg-gray-100"
            >
              Apply Now
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Apply modal */}
      {applyingJob && <ApplyModal />}
    </main>
  );
}
