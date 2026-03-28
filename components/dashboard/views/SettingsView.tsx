"use client";

import { useEffect, useRef, useState } from "react";
import { useDashboardStore } from "@/store/dashboardStore";
import { getGsap } from "@/animations/gsapClient";
import {
  Bell,
  Shield,
  Moon,
  Globe,
  LogOut,
  ChevronRight,
  User,
  Mail,
} from "lucide-react";
import { useTheme } from "next-themes";

export function SettingsView() {
  const profile = useDashboardStore((s) => s.profile);
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);

  useEffect(() => {
    setMounted(true);
    const gsap = getGsap();
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="px-8 py-8 lg:px-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="mb-8 text-base text-gray-500 dark:text-white/40">
          Manage your account preferences
        </p>

        {/* Account Section */}
        <div className="mb-8">
          <h2 className="mb-4 text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 dark:text-white/30">
            Account
          </h2>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition-colors duration-300 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <SettingRow
              icon={<User size={18} />}
              label="Display Name"
              value={profile.name}
            />
            <SettingRow
              icon={<Mail size={18} />}
              label="Email"
              value="satyam@example.com"
            />
            <SettingRow
              icon={<Shield size={18} />}
              label="Password"
              value="••••••••"
            />
          </div>
        </div>

        {/* Preferences */}
        <div className="mb-8">
          <h2 className="mb-4 text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 dark:text-white/30">
            Preferences
          </h2>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition-colors duration-300 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <ToggleRow
              icon={<Moon size={18} />}
              label="Dark Mode"
              description="Use dark theme"
              enabled={mounted ? resolvedTheme === "dark" : true}
              onToggle={() => {
                if (!mounted) return;
                setTheme(resolvedTheme === "dark" ? "light" : "dark");
              }}
            />
            <ToggleRow
              icon={<Bell size={18} />}
              label="Email Notifications"
              description="Get updates via email"
              enabled={emailNotifs}
              onToggle={() => setEmailNotifs(!emailNotifs)}
            />
            <ToggleRow
              icon={<Bell size={18} />}
              label="Push Notifications"
              description="Browser push notifications"
              enabled={pushNotifs}
              onToggle={() => setPushNotifs(!pushNotifs)}
            />
            <SettingRow
              icon={<Globe size={18} />}
              label="Language"
              value="English"
            />
          </div>
        </div>

        {/* Danger Zone */}
        <div>
          <h2 className="mb-4 text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 dark:text-white/30">
            Account Actions
          </h2>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition-colors duration-300 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <button className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-gray-50 dark:hover:bg-white/[0.03]">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-100 text-red-500 dark:bg-red-500/10 dark:text-red-400/60">
                <LogOut size={18} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-red-500 dark:text-red-400/70">Sign Out</p>
                <p className="text-xs text-gray-400 dark:text-white/20">
                  Log out of your account
                </p>
              </div>
              <ChevronRight size={16} className="text-gray-300 dark:text-white/15" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sub-components                                                      */
/* ------------------------------------------------------------------ */

function SettingRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <button className="flex w-full items-center gap-4 border-b border-gray-100 px-5 py-4 text-left transition-colors last:border-b-0 hover:bg-gray-50 dark:border-white/[0.04] dark:hover:bg-white/[0.03]">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 text-gray-500 dark:bg-white/[0.05] dark:text-white/35">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900 dark:text-white/60">{label}</p>
      </div>
      <span className="text-sm text-gray-400 dark:text-white/25">{value}</span>
      <ChevronRight size={16} className="text-gray-300 dark:text-white/15" />
    </button>
  );
}

function ToggleRow({
  icon,
  label,
  description,
  enabled,
  onToggle,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="flex w-full items-center gap-4 border-b border-gray-100 px-5 py-4 text-left transition-colors last:border-b-0 hover:bg-gray-50 dark:border-white/[0.04] dark:hover:bg-white/[0.03]"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 text-gray-500 dark:bg-white/[0.05] dark:text-white/35">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900 dark:text-white/60">{label}</p>
        <p className="text-xs text-gray-400 dark:text-white/20">{description}</p>
      </div>
      {/* Toggle switch */}
      <div
        className={[
          "flex h-6 w-11 items-center rounded-full p-0.5 transition-colors duration-200",
          enabled ? "bg-black dark:bg-white" : "bg-gray-200 dark:bg-white/[0.1]",
        ].join(" ")}
      >
        <div
          className={[
            "h-5 w-5 rounded-full transition-all duration-200",
            enabled
              ? "translate-x-5 bg-white dark:bg-black"
              : "translate-x-0 bg-white shadow-sm dark:bg-white/25 dark:shadow-none",
          ].join(" ")}
        />
      </div>
    </button>
  );
}
