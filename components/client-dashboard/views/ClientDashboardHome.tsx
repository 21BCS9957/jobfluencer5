"use client";

import { useEffect, useRef } from "react";
import { useClientDashboardStore } from "@/store/clientDashboardStore";
import { getGsap } from "@/animations/gsapClient";
import {
  FolderKanban,
  Users,
  MessageSquare,
  Wallet,
  ArrowUpRight,
  Clock,
  PlusCircle,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export function ClientDashboardHome() {
  const profile = useClientDashboardStore((s) => s.profile);
  const stats = useClientDashboardStore((s) => s.stats);
  const campaigns = useClientDashboardStore((s) => s.campaigns);
  const applicants = useClientDashboardStore((s) => s.applicants);
  const conversations = useClientDashboardStore((s) => s.conversations);
  const setActiveTab = useClientDashboardStore((s) => s.setActiveTab);

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
      label: "Active Campaigns",
      value: stats.activeCampaigns,
      icon: FolderKanban,
      change: "+2 this month",
      gradient: "from-violet-500/10 to-indigo-500/10",
      iconColor: "text-violet-500 dark:text-violet-400",
      onClick: () => setActiveTab("campaigns"),
    },
    {
      label: "Pending Applications",
      value: stats.totalApplications,
      icon: Users,
      change: "Awaiting review",
      gradient: "from-amber-500/10 to-orange-500/10",
      iconColor: "text-amber-500 dark:text-amber-400",
      onClick: () => setActiveTab("applications"),
    },
    {
      label: "Messages",
      value: stats.unreadMessages,
      icon: MessageSquare,
      change: `${stats.unreadMessages} unread`,
      gradient: "from-blue-500/10 to-cyan-500/10",
      iconColor: "text-blue-500 dark:text-blue-400",
      onClick: () => setActiveTab("messages"),
    },
    {
      label: "Funds in Escrow",
      value: stats.fundsInEscrow,
      icon: Wallet,
      change: "Secured",
      gradient: "from-emerald-500/10 to-teal-500/10",
      iconColor: "text-emerald-500 dark:text-emerald-400",
      onClick: () => setActiveTab("payments"),
    },
  ];

  // Build activity feed
  const activityItems = [
    ...applicants
      .filter((a) => a.status === "pending")
      .slice(0, 3)
      .map((a) => ({
        id: `act-app-${a.id}`,
        type: "application" as const,
        icon: Users,
        title: `${a.name} applied`,
        subtitle: campaigns.find((c) => c.id === a.jobId)?.title || "",
        time: a.appliedAt,
        color: "text-amber-500",
        bgColor: "bg-amber-500/10",
      })),
    ...conversations
      .filter((c) => c.unread > 0)
      .map((c) => ({
        id: `act-msg-${c.id}`,
        type: "message" as const,
        icon: MessageSquare,
        title: `New message from ${c.creatorName}`,
        subtitle: c.lastMessage,
        time: c.lastTimestamp,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
      })),
    ...campaigns
      .filter((c) => c.status === "in_progress")
      .map((c) => ({
        id: `act-camp-${c.id}`,
        type: "campaign" as const,
        icon: TrendingUp,
        title: `Campaign in progress`,
        subtitle: c.title,
        time: c.createdAt,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
      })),
  ].slice(0, 6);

  return (
    <div className="px-8 py-8 lg:px-12">
      {/* Greeting */}
      <div ref={headerRef} className="mb-10">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
          <span className="text-xs tracking-[0.2em] uppercase text-gray-400 dark:text-white/30">
            Brand Dashboard
          </span>
        </div>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Welcome back, {profile.name.split(" ")[0]}
        </h1>
        <p className="mt-2 text-lg text-gray-500 dark:text-white/40">
          Here&apos;s your campaign overview for today
        </p>
      </div>

      {/* Stats Grid */}
      <div
        ref={cardsRef}
        className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {STAT_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.label}
              onClick={card.onClick}
              className="group relative flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-lg dark:border-white/[0.06] dark:bg-white/[0.02] dark:hover:border-white/[0.12] dark:hover:bg-white/[0.04] dark:hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${card.gradient}`}
                >
                  <Icon
                    size={18}
                    strokeWidth={1.5}
                    className={card.iconColor}
                  />
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-gray-300 transition-all duration-200 group-hover:text-gray-600 dark:text-white/20 dark:group-hover:text-white/50"
                />
              </div>

              <div>
                <p className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {card.value}
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-white/30">
                  {card.label}
                </p>
              </div>

              <p className="text-xs text-gray-400 dark:text-white/20">
                {card.change}
              </p>
            </button>
          );
        })}
      </div>

      {/* Activity + Quick Actions */}
      <div ref={activityRef} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Activity Feed */}
        <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/[0.06] dark:bg-white/[0.02]">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-white/70">
              Activity Feed
            </h2>
            <div className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <div className="space-y-1">
            {activityItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="group flex items-start gap-4 rounded-xl p-3 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-white/[0.03]"
                >
                  <div
                    className={`mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${item.bgColor}`}
                  >
                    <Icon size={16} className={item.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white/80">
                      {item.title}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-gray-500 dark:text-white/30">
                      {item.subtitle}
                    </p>
                  </div>
                  <span className="flex-shrink-0 flex items-center gap-1 text-[10px] text-gray-400 dark:text-white/20">
                    <Clock size={10} />
                    {item.time}
                  </span>
                </div>
              );
            })}

            {activityItems.length === 0 && (
              <div className="flex flex-col items-center py-8 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-200 dark:border-white/[0.08] mb-3">
                  <AlertCircle
                    size={20}
                    className="text-gray-300 dark:text-white/20"
                  />
                </div>
                <p className="text-sm text-gray-500 dark:text-white/30">
                  No recent activity
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <h2 className="mb-4 text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-white/70">
              Quick Actions
            </h2>
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab("post-job")}
                className="flex w-full items-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 p-4 text-left text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-px"
              >
                <PlusCircle size={20} />
                <div>
                  <p className="text-sm font-semibold">Post a New Job</p>
                  <p className="text-xs text-white/60">
                    Find the perfect creator
                  </p>
                </div>
              </button>
              <button
                onClick={() => setActiveTab("applications")}
                className="flex w-full items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 text-left transition-all duration-200 hover:border-gray-300 hover:shadow-sm dark:border-white/[0.06] dark:bg-white/[0.02] dark:hover:border-white/[0.12]"
              >
                <Users
                  size={20}
                  className="text-amber-500 dark:text-amber-400"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Review Applications
                  </p>
                  <p className="text-xs text-gray-500 dark:text-white/30">
                    {stats.totalApplications} pending
                  </p>
                </div>
              </button>
              <button
                onClick={() => setActiveTab("payments")}
                className="flex w-full items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 text-left transition-all duration-200 hover:border-gray-300 hover:shadow-sm dark:border-white/[0.06] dark:bg-white/[0.02] dark:hover:border-white/[0.12]"
              >
                <CheckCircle2
                  size={20}
                  className="text-emerald-500 dark:text-emerald-400"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Manage Payments
                  </p>
                  <p className="text-xs text-gray-500 dark:text-white/30">
                    {stats.fundsInEscrow} in escrow
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Recent Campaigns Mini */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-white/70">
                Campaigns
              </h2>
              <button
                onClick={() => setActiveTab("campaigns")}
                className="text-xs text-gray-400 transition-colors hover:text-gray-700 dark:text-white/30 dark:hover:text-white/60"
              >
                View all →
              </button>
            </div>
            <div className="space-y-3">
              {campaigns.slice(0, 3).map((camp) => (
                <div
                  key={camp.id}
                  className="flex items-center gap-3 rounded-xl p-2 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-white/[0.03]"
                >
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white/80">
                      {camp.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-white/30">
                      {camp.budget} · {camp.applicantCount} applicants
                    </p>
                  </div>
                  <span
                    className={[
                      "flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                      camp.status === "open"
                        ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : camp.status === "in_progress"
                          ? "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                          : "bg-gray-100 text-gray-500 dark:bg-white/[0.06] dark:text-white/40",
                    ].join(" ")}
                  >
                    {camp.status.replace("_", " ")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
