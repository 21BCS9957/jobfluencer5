"use client";

import { useEffect, useRef } from "react";
import { useDashboardStore } from "@/store/dashboardStore";
import { getGsap } from "@/animations/gsapClient";
import { Edit3, Camera, Play, ExternalLink } from "lucide-react";

export function ProfileView() {
  const profile = useDashboardStore((s) => s.profile);
  const stats = useDashboardStore((s) => s.stats);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsap = getGsap();
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    }
  }, []);

  const socialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return <Camera size={16} />;
      case "youtube":
        return <Play size={16} />;
      default:
        return <ExternalLink size={16} />;
    }
  };

  return (
    <div ref={containerRef} className="px-8 py-8 lg:px-12">
      <div className="mx-auto max-w-3xl">
        {/* Profile Header */}
        <div className="relative rounded-2xl border border-gray-200 bg-white p-8 transition-colors duration-300 dark:border-white/[0.06] dark:bg-white/[0.02]">
          {/* Edit button */}
          <button className="absolute right-6 top-6 flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-500 transition-colors hover:border-gray-300 hover:text-gray-900 dark:border-white/[0.08] dark:text-white/40 dark:hover:border-white/[0.15] dark:hover:text-white/60">
            <Edit3 size={12} />
            Edit Profile
          </button>

          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            {/* Avatar */}
            <div className="relative">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-24 w-24 rounded-2xl object-cover ring-2 ring-gray-100 dark:ring-white/[0.08]"
              />
              <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-500 dark:border-[#0A0A0A] dark:bg-emerald-400" />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {profile.name}
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-white/35">Creator • Freelancer</p>

              {/* Categories */}
              <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                {profile.categories.map((cat) => (
                  <span
                    key={cat}
                    className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-medium text-gray-600 dark:bg-white/[0.06] dark:text-white/40"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-6 border-t border-gray-200 pt-6 dark:border-white/[0.04]">
            <p className="text-sm leading-relaxed text-gray-600 dark:text-white/40">
              {profile.bio}
            </p>
          </div>

          {/* Social Links */}
          <div className="mt-6 flex flex-wrap gap-3">
            {profile.socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-xs font-medium text-gray-600 transition-all duration-200 hover:border-gray-300 hover:text-gray-900 dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-white/40 dark:hover:border-white/[0.15] dark:hover:text-white/60"
              >
                {socialIcon(link.platform)}
                {link.platform}
              </a>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          {[
            { label: "Profile Views", value: stats.profileViews.toLocaleString() },
            { label: "Active Jobs", value: stats.activeJobs },
            { label: "Total Earnings", value: stats.earnings },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-gray-200 bg-white p-5 text-center transition-colors duration-300 dark:border-white/[0.06] dark:bg-white/[0.02]"
            >
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="mt-1 text-xs text-gray-500 dark:text-white/30">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Portfolio placeholder */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-8 text-center transition-colors duration-300 dark:border-white/[0.06] dark:bg-white/[0.02]">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-gray-100 bg-gray-50 dark:border-white/[0.08] dark:bg-white/[0.03]">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="text-gray-400 dark:text-white/25"
            >
              <rect
                x="2"
                y="2"
                width="16"
                height="16"
                rx="3"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M7 13L10 9L13 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="14"
                cy="6"
                r="1.5"
                fill="currentColor"
              />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-600 dark:text-white/40">Portfolio</p>
          <p className="mt-1 text-xs text-gray-400 dark:text-white/20">
            Add your best work to showcase to brands
          </p>
          <button className="mt-4 rounded-lg border border-gray-200 px-5 py-2 text-xs font-medium text-gray-500 transition-colors hover:border-gray-300 hover:text-gray-900 dark:border-white/[0.1] dark:text-white/40 dark:hover:border-white/[0.2] dark:hover:text-white/60">
            Upload Work
          </button>
        </div>
      </div>
    </div>
  );
}
