"use client";

import { useEffect, useRef } from "react";
import { useClientDashboardStore } from "@/store/clientDashboardStore";
import { getGsap } from "@/animations/gsapClient";
import {
  FolderKanban,
  Users,
  MapPin,
  Monitor,
  MoreHorizontal,
  Eye,
  Edit3,
  XCircle,
  PlusCircle,
} from "lucide-react";

const STATUS_CONFIG = {
  open: {
    label: "Open",
    bg: "bg-emerald-100 dark:bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  in_progress: {
    label: "In Progress",
    bg: "bg-blue-100 dark:bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
    dot: "bg-blue-500",
  },
  completed: {
    label: "Completed",
    bg: "bg-gray-100 dark:bg-white/[0.06]",
    text: "text-gray-500 dark:text-white/40",
    dot: "bg-gray-400",
  },
  closed: {
    label: "Closed",
    bg: "bg-red-100 dark:bg-red-500/10",
    text: "text-red-600 dark:text-red-400",
    dot: "bg-red-500",
  },
};

export function MyCampaignsView() {
  const campaigns = useClientDashboardStore((s) => s.campaigns);
  const setActiveTab = useClientDashboardStore((s) => s.setActiveTab);
  const setFilterCampaign = useClientDashboardStore(
    (s) => s.setFilterCampaign
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsap = getGsap();
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    }
    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 20, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: 0.06,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    }
  }, []);

  const handleViewApplications = (campaignId: string) => {
    setFilterCampaign(campaignId);
    setActiveTab("applications");
  };

  return (
    <div ref={containerRef} className="px-8 py-8 lg:px-12">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <FolderKanban size={14} className="text-violet-500" />
            <span className="text-xs tracking-[0.2em] uppercase text-gray-400 dark:text-white/30">
              Campaigns
            </span>
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
            My Campaigns
          </h1>
          <p className="mt-1 text-base text-gray-500 dark:text-white/40">
            {campaigns.length} campaigns total
          </p>
        </div>
        <button
          onClick={() => setActiveTab("post-job")}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-px"
        >
          <PlusCircle size={16} />
          New Campaign
        </button>
      </div>

      {/* Campaigns Grid */}
      <div ref={cardsRef} className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {campaigns.map((camp) => {
          const statusConfig = STATUS_CONFIG[camp.status];

          return (
            <div
              key={camp.id}
              className="group relative rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-lg dark:border-white/[0.06] dark:bg-white/[0.02] dark:hover:border-white/[0.12] dark:hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0 mr-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white leading-snug">
                    {camp.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-gray-500 dark:text-white/30 line-clamp-2">
                    {camp.description}
                  </p>
                </div>
                <span
                  className={`flex-shrink-0 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${statusConfig.bg} ${statusConfig.text}`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${statusConfig.dot}`}
                  />
                  {statusConfig.label}
                </span>
              </div>

              {/* Meta tags */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-white/30">
                  <Monitor size={12} />
                  {camp.platform}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-white/30">
                  <MapPin size={12} />
                  {camp.city}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-white/30">
                  <Users size={12} />
                  {camp.applicantCount} applicants
                </span>
              </div>

              {/* Budget + Actions */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-white/[0.04]">
                <div>
                  <p className="text-xs text-gray-400 dark:text-white/20">
                    Budget
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {camp.budget}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleViewApplications(camp.id)}
                    className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition-all duration-200 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-600 dark:border-white/[0.08] dark:text-white/50 dark:hover:border-violet-500/30 dark:hover:bg-violet-500/5 dark:hover:text-violet-400"
                  >
                    <Eye size={13} />
                    Applications
                  </button>
                  <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 dark:border-white/[0.08] dark:text-white/50 dark:hover:border-white/[0.12] dark:hover:bg-white/[0.03]">
                    <Edit3 size={13} />
                    Edit
                  </button>
                  {camp.status === "open" && (
                    <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-white/[0.08] dark:text-white/50 dark:hover:border-red-500/30 dark:hover:bg-red-500/5 dark:hover:text-red-400">
                      <XCircle size={13} />
                      Close
                    </button>
                  )}
                </div>
              </div>

              {/* Posted time */}
              <p className="mt-3 text-[10px] text-gray-400 dark:text-white/15">
                Posted {camp.createdAt}
              </p>
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {campaigns.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-200 dark:border-white/[0.08]">
            <FolderKanban
              size={24}
              strokeWidth={1.5}
              className="text-gray-300 dark:text-white/20"
            />
          </div>
          <p className="text-lg font-medium text-gray-900 dark:text-white/40">
            No campaigns yet
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-white/20">
            Post your first job to start finding the perfect creator
          </p>
          <button
            onClick={() => setActiveTab("post-job")}
            className="mt-5 flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-violet-700"
          >
            <PlusCircle size={16} />
            Post a Job
          </button>
        </div>
      )}
    </div>
  );
}
