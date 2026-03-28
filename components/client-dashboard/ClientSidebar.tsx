"use client";

import { useEffect, useRef } from "react";
import {
  useClientDashboardStore,
  type ClientDashboardTab,
} from "@/store/clientDashboardStore";
import { getGsap } from "@/animations/gsapClient";
import {
  LayoutDashboard,
  PlusCircle,
  FolderKanban,
  Users,
  MessageSquare,
  Wallet,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ThemeToggle } from "@/components/dashboard/ThemeToggle";

const MENU_ITEMS: {
  id: ClientDashboardTab;
  label: string;
  icon: typeof LayoutDashboard;
}[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "post-job", label: "Post Job", icon: PlusCircle },
  { id: "campaigns", label: "My Campaigns", icon: FolderKanban },
  { id: "applications", label: "Applications", icon: Users },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "payments", label: "Payments", icon: Wallet },
  { id: "settings", label: "Settings", icon: Settings },
];

export function ClientSidebar() {
  const activeTab = useClientDashboardStore((s) => s.activeTab);
  const setActiveTab = useClientDashboardStore((s) => s.setActiveTab);
  const collapsed = useClientDashboardStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useClientDashboardStore((s) => s.toggleSidebar);
  const stats = useClientDashboardStore((s) => s.stats);
  const profile = useClientDashboardStore((s) => s.profile);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const gsap = getGsap();
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <nav
      ref={navRef}
      className={[
        "fixed left-0 top-0 z-40 flex h-full flex-col border-r border-gray-200 dark:border-white/[0.06] bg-white dark:bg-[#0A0A0A] transition-all duration-300",
        collapsed ? "w-[72px]" : "w-[256px]",
      ].join(" ")}
    >
      {/* Logo */}
      <div
        className={[
          "flex h-16 items-center border-b border-gray-200 dark:border-white/[0.06] px-5",
          collapsed ? "justify-center" : "",
        ].join(" ")}
      >
        {collapsed ? (
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            J
          </span>
        ) : (
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black dark:bg-white">
              <span className="text-sm font-bold text-white dark:text-black">
                J
              </span>
            </div>
            <div>
              <span className="text-sm font-semibold tracking-tight text-gray-900 dark:text-white">
                Jobfluencer
              </span>
              <span className="ml-1.5 rounded-md bg-gradient-to-r from-violet-500/10 to-indigo-500/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                Brand
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-0.5">
          {MENU_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            const badge =
              item.id === "messages" && stats.unreadMessages > 0
                ? stats.unreadMessages
                : item.id === "applications" && stats.totalApplications > 0
                  ? stats.totalApplications
                  : null;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={[
                  "group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200",
                  isActive
                    ? "bg-gray-100 text-gray-900 dark:bg-white/[0.08] dark:text-white"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-white/40 dark:hover:bg-white/[0.04] dark:hover:text-white/70",
                  collapsed ? "justify-center" : "",
                ].join(" ")}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-violet-600 dark:bg-violet-400" />
                )}

                <Icon
                  size={20}
                  strokeWidth={isActive ? 2 : 1.5}
                  className="flex-shrink-0"
                />

                {!collapsed && (
                  <span className="flex-1 text-left font-medium">
                    {item.label}
                  </span>
                )}

                {/* Badge */}
                {badge && !collapsed && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-600 px-1.5 text-[10px] font-semibold text-white dark:bg-violet-500">
                    {badge}
                  </span>
                )}
                {badge && collapsed && (
                  <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-violet-500" />
                )}

                {/* Tooltip */}
                {collapsed && (
                  <div className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs text-white opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100 dark:bg-white/10 dark:backdrop-blur-md">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Quick Action */}
        {!collapsed && (
          <div className="mt-6 px-1">
            <button
              onClick={() => setActiveTab("post-job")}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-px active:translate-y-0"
            >
              <PlusCircle size={16} />
              Post a Job
            </button>
          </div>
        )}
      </div>

      {/* Bottom section */}
      <div
        className={[
          "mt-auto border-t border-gray-200 p-3 dark:border-white/[0.06]",
          collapsed ? "flex flex-col items-center" : "",
        ].join(" ")}
      >
        <ThemeToggle collapsed={collapsed} />

        <button
          onClick={() => setActiveTab("settings")}
          className={[
            "mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-white/50 dark:hover:bg-white/[0.04] dark:hover:text-white/70",
            collapsed ? "justify-center px-0" : "",
          ].join(" ")}
        >
          <img
            src={profile.avatar}
            alt={profile.name}
            className="h-8 w-8 flex-shrink-0 rounded-full object-cover ring-2 ring-violet-100 dark:ring-violet-500/20"
          />
          {!collapsed && (
            <div className="flex-1 text-left">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-white/80">
                {profile.name}
              </p>
              <p className="text-[10px] font-medium text-violet-600 dark:text-violet-400">
                {profile.company}
              </p>
            </div>
          )}
        </button>
      </div>

      {/* Collapse pin */}
      <button
        onClick={toggleSidebar}
        className="flex h-10 items-center justify-center border-t border-gray-200 text-gray-400 transition-colors duration-200 hover:text-gray-600 dark:border-white/[0.06] dark:text-white/25 dark:hover:text-white/50"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </nav>
  );
}
