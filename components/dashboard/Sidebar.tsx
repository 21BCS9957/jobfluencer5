"use client";

import { useEffect, useRef } from "react";
import { useDashboardStore, type DashboardTab } from "@/store/dashboardStore";
import { getGsap } from "@/animations/gsapClient";
import {
  LayoutDashboard,
  MessageSquare,
  Briefcase,
  Compass,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const MENU_ITEMS: {
  id: DashboardTab;
  label: string;
  icon: typeof LayoutDashboard;
}[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "my-jobs", label: "My Jobs", icon: Briefcase },
  { id: "explore", label: "Explore Jobs", icon: Compass },
  { id: "profile", label: "Profile", icon: User },
  { id: "settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const activeTab = useDashboardStore((s) => s.activeTab);
  const setActiveTab = useDashboardStore((s) => s.setActiveTab);
  const collapsed = useDashboardStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useDashboardStore((s) => s.toggleSidebar);
  const stats = useDashboardStore((s) => s.stats);
  const profile = useDashboardStore((s) => s.profile);
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
        collapsed ? "w-[72px]" : "w-[240px]",
      ].join(" ")}
    >
      {/* Logo */}
      <div className={[
        "flex h-16 items-center border-b border-gray-200 dark:border-white/[0.06] px-5",
        collapsed ? "justify-center" : "",
      ].join(" ")}>
        {collapsed ? (
          <span className="text-lg font-bold text-gray-900 dark:text-white">J</span>
        ) : (
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-gray-900 dark:text-white">
            Jobfluencer
          </span>
        )}
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-1">
          {MENU_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            const badge =
              item.id === "messages" && stats.unreadMessages > 0
                ? stats.unreadMessages
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
                  <div className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-gray-900 dark:bg-white" />
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
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-semibold text-white">
                    {badge}
                  </span>
                )}
                {badge && collapsed && (
                  <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red-500" />
                )}

                {/* Tooltip for collapsed */}
                {collapsed && (
                  <div className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs text-white opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100 dark:bg-white/10 dark:backdrop-blur-md">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Profile section */}
      <div className={[
        "mt-auto border-t border-gray-200 p-3 dark:border-white/[0.06]",
        collapsed ? "flex justify-center" : "",
      ].join(" ")}>
        <ThemeToggle collapsed={collapsed} />
        
        <button
          onClick={() => setActiveTab("profile")}
          className={[
            "mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-white/50 dark:hover:bg-white/[0.04] dark:hover:text-white/70",
            collapsed ? "justify-center px-0" : "",
          ].join(" ")}
        >
          <img
            src={profile.avatar}
            alt={profile.name}
            className="h-8 w-8 flex-shrink-0 rounded-full object-cover ring-1 ring-gray-200 dark:ring-white/10"
          />
          {!collapsed && (
            <div className="flex-1 text-left">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-white/80">
                {profile.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-white/30">Creator</p>
            </div>
          )}
        </button>
      </div>

      {/* Collapse toggle */}
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
