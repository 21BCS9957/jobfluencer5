"use client";

import { useEffect, useRef } from "react";
import { useDashboardStore } from "@/store/dashboardStore";
import { getGsap } from "@/animations/gsapClient";
import {
  MapPin,
  Calendar,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

export function MyJobsView() {
  const myJobs = useDashboardStore((s) => s.myJobs);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsap = getGsap();
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    }
    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.15,
        }
      );
    }
  }, []);

  const statusConfig = {
    applied: {
      bg: "bg-amber-100 dark:bg-amber-500/10",
      text: "text-amber-600 dark:text-amber-400",
      dot: "bg-amber-500 dark:bg-amber-400",
    },
    accepted: {
      bg: "bg-emerald-100 dark:bg-emerald-500/10",
      text: "text-emerald-600 dark:text-emerald-400",
      dot: "bg-emerald-500 dark:bg-emerald-400",
    },
    completed: {
      bg: "bg-gray-100 dark:bg-white/[0.06]",
      text: "text-gray-600 dark:text-white/40",
      dot: "bg-gray-400 dark:bg-white/40",
    },
  };

  return (
    <div ref={containerRef} className="px-8 py-8 lg:px-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
          My Jobs
        </h1>
        <p className="mt-2 text-base text-gray-500 dark:text-white/40">
          Track and manage your active campaigns
        </p>
      </div>

      {/* Filter pills */}
      <div className="mb-6 flex items-center gap-2">
        {["All", "Applied", "Accepted", "Completed"].map((filter, i) => (
          <button
            key={filter}
            className={[
              "rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200",
              i === 0
                ? "bg-gray-900 text-white dark:bg-white dark:text-black"
                : "border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-900 dark:border-white/[0.08] dark:text-white/40 dark:hover:border-white/[0.15] dark:hover:text-white/60",
            ].join(" ")}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Jobs List */}
      <div ref={cardsRef} className="space-y-4">
        {myJobs.map((job) => {
          const status = statusConfig[job.status];

          return (
            <div
              key={job.id}
              className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-gray-300 hover:shadow-md dark:border-white/[0.06] dark:bg-white/[0.02] dark:hover:border-white/[0.12] dark:hover:bg-white/[0.04] dark:hover:shadow-none"
            >
              <div className="flex items-start gap-5">
                <img
                  src={job.brandAvatar}
                  alt={job.brandName}
                  className="h-12 w-12 flex-shrink-0 rounded-xl object-cover ring-1 ring-gray-200 dark:ring-white/[0.06]"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white/90">
                        {job.title}
                      </h3>
                      <p className="mt-0.5 text-sm text-gray-500 dark:text-white/40">
                        {job.brandName}
                      </p>
                    </div>

                    <span
                      className={[
                        "flex flex-shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider",
                        status.bg,
                        status.text,
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "h-1.5 w-1.5 rounded-full",
                          status.dot,
                        ].join(" ")}
                      />
                      {job.status}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-white/30">
                    {job.description}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    <span className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-white/25">
                      <MapPin size={12} />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-white/25">
                      <Calendar size={12} />
                      {job.postedAt}
                    </span>
                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[10px] text-gray-500 dark:bg-white/[0.04] dark:text-white/30">
                      {job.platform}
                    </span>
                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[10px] text-gray-500 dark:bg-white/[0.04] dark:text-white/30">
                      {job.niche}
                    </span>
                    <span className="ml-auto text-sm font-medium text-gray-900 dark:text-white/50">
                      {job.budget}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-5 flex items-center justify-end gap-3 border-t border-gray-100 pt-4 dark:border-white/[0.04]">
                <button className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-white/40 dark:hover:bg-white/[0.04] dark:hover:text-white/60">
                  <ExternalLink size={13} />
                  View Details
                </button>
                <button className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-4 py-2 text-xs font-medium text-gray-900 transition-colors hover:bg-gray-200 dark:bg-white/[0.06] dark:text-white/60 dark:hover:bg-white/[0.1] dark:hover:text-white/80">
                  Open Chat
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
