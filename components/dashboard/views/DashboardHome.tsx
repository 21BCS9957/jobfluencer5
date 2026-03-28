"use client";

import { useEffect, useRef } from "react";
import { useDashboardStore } from "@/store/dashboardStore";
import { getGsap } from "@/animations/gsapClient";
import {
  Briefcase,
  MessageSquare,
  Eye,
  TrendingUp,
  ArrowUpRight,
  Clock,
} from "lucide-react";

export function DashboardHome() {
  const profile = useDashboardStore((s) => s.profile);
  const stats = useDashboardStore((s) => s.stats);
  const myJobs = useDashboardStore((s) => s.myJobs);
  const conversations = useDashboardStore((s) => s.conversations);
  const setActiveTab = useDashboardStore((s) => s.setActiveTab);

  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const activityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsap = getGsap();

    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }

    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.15,
        }
      );
    }

    if (activityRef.current) {
      gsap.fromTo(
        activityRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", delay: 0.4 }
      );
    }
  }, []);

  const STAT_CARDS = [
    {
      label: "Active Jobs",
      value: stats.activeJobs,
      icon: Briefcase,
      change: "+1 this week",
      onClick: () => setActiveTab("my-jobs"),
    },
    {
      label: "Messages",
      value: stats.unreadMessages,
      icon: MessageSquare,
      change: "3 unread",
      onClick: () => setActiveTab("messages"),
    },
    {
      label: "Profile Views",
      value: stats.profileViews.toLocaleString(),
      icon: Eye,
      change: "+12% this month",
      onClick: () => setActiveTab("profile"),
    },
    {
      label: "Earnings",
      value: stats.earnings,
      icon: TrendingUp,
      change: "All time",
      onClick: undefined,
    },
  ];

  return (
    <div className="px-8 py-8 lg:px-12">
      {/* Greeting */}
      <div ref={headerRef} className="mb-10">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="text-xs tracking-[0.2em] uppercase text-white/30">
            Creator Dashboard
          </span>
        </div>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Welcome back, {profile.name.split(" ")[0]}
        </h1>
        <p className="mt-2 text-lg text-gray-500 dark:text-white/40">
          Here&apos;s what&apos;s happening today
        </p>
      </div>

      {/* Stats Grid */}
      <div ref={cardsRef} className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STAT_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.label}
              onClick={card.onClick}
              className="group relative flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-lg dark:border-white/[0.06] dark:bg-white/[0.02] dark:hover:border-white/[0.12] dark:hover:bg-white/[0.04] dark:hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 dark:bg-white/[0.06]">
                  <Icon size={18} strokeWidth={1.5} className="text-gray-500 dark:text-white/50" />
                </div>
                {card.onClick && (
                  <ArrowUpRight
                    size={16}
                    className="text-gray-300 transition-all duration-200 group-hover:text-gray-600 dark:text-white/20 dark:group-hover:text-white/50"
                  />
                )}
              </div>

              <div>
                <p className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {card.value}
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-white/30">{card.label}</p>
              </div>

              <p className="text-xs text-gray-400 dark:text-white/20">{card.change}</p>
            </button>
          );
        })}
      </div>

      {/* Activity Section */}
      <div ref={activityRef} className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Jobs */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/[0.06] dark:bg-white/[0.02]">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-white/70">
              Recent Jobs
            </h2>
            <button
              onClick={() => setActiveTab("my-jobs")}
              className="text-xs text-gray-400 transition-colors hover:text-gray-700 dark:text-white/30 dark:hover:text-white/60"
            >
              View all →
            </button>
          </div>

          <div className="space-y-3">
            {myJobs.slice(0, 3).map((job) => (
              <div
                key={job.id}
                className="group flex items-center gap-4 rounded-xl p-3 transition-all duration-200 hover:bg-white/[0.03]"
              >
                <img
                  src={job.brandAvatar}
                  alt={job.brandName}
                  className="h-10 w-10 rounded-xl object-cover ring-1 ring-white/[0.06]"
                />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white/80">
                    {job.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-white/30">{job.brandName}</p>
                </div>
                <span
                  className={[
                    "flex-shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider",
                    job.status === "accepted"
                      ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                      : job.status === "completed"
                        ? "bg-gray-100 text-gray-600 dark:bg-white/[0.06] dark:text-white/40"
                        : "bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
                  ].join(" ")}
                >
                  {job.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/[0.06] dark:bg-white/[0.02]">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-white/70">
              Recent Messages
            </h2>
            <button
              onClick={() => setActiveTab("messages")}
              className="text-xs text-gray-400 transition-colors hover:text-gray-700 dark:text-white/30 dark:hover:text-white/60"
            >
              View all →
            </button>
          </div>

          <div className="space-y-3">
            {conversations.slice(0, 4).map((conv) => (
              <button
                key={conv.id}
                onClick={() => {
                  useDashboardStore.getState().setActiveConversation(conv.id);
                  setActiveTab("messages");
                }}
                className="group flex w-full items-center gap-4 rounded-xl p-3 text-left transition-all duration-200 hover:bg-gray-50 dark:hover:bg-white/[0.03]"
              >
                <div className="relative">
                  <img
                    src={conv.brandAvatar}
                    alt={conv.brandName}
                    className="h-10 w-10 rounded-full object-cover ring-1 ring-white/[0.06]"
                  />
                  {conv.unread > 0 && (
                    <div className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0A0A0A] bg-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white/80">
                    {conv.brandName}
                  </p>
                  <p className="truncate text-xs text-gray-500 dark:text-white/30">
                    {conv.lastMessage}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="flex items-center gap-1 text-[10px] text-gray-400 dark:text-white/20">
                    <Clock size={10} />
                    {conv.lastTimestamp}
                  </span>
                  {conv.unread > 0 && (
                    <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
