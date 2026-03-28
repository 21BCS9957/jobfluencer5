"use client";

import { useEffect, useRef, useState } from "react";
import { useClientDashboardStore } from "@/store/clientDashboardStore";
import { getGsap } from "@/animations/gsapClient";
import {
  Settings,
  Building2,
  Globe,
  Mail,
  User,
  Camera,
  Save,
  Bell,
  Shield,
  CreditCard,
  Check,
} from "lucide-react";

export function ClientSettingsView() {
  const profile = useClientDashboardStore((s) => s.profile);
  const updateProfile = useClientDashboardStore((s) => s.updateProfile);
  const containerRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState(profile.name);
  const [company, setCompany] = useState(profile.company);
  const [email, setEmail] = useState(profile.email);
  const [bio, setBio] = useState(profile.bio);
  const [website, setWebsite] = useState(profile.website);
  const [industry, setIndustry] = useState(profile.industry);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const gsap = getGsap();
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    }
  }, []);

  const handleSave = () => {
    updateProfile({ name, company, email, bio, website, industry });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:border-violet-300 focus:bg-white focus:ring-2 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white dark:placeholder-white/20 dark:focus:border-violet-500/30 dark:focus:bg-white/[0.05]";

  return (
    <div ref={containerRef} className="px-8 py-8 lg:px-12 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <Settings size={14} className="text-violet-500" />
          <span className="text-xs tracking-[0.2em] uppercase text-gray-400 dark:text-white/30">
            Account
          </span>
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Profile & Settings
        </h1>
        <p className="mt-2 text-base text-gray-500 dark:text-white/40">
          Manage your brand profile and preferences
        </p>
      </div>

      <div className="space-y-6">
        {/* Avatar & Basic Info */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/[0.06] dark:bg-white/[0.02]">
          <h2 className="mb-5 text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-white/70">
            Brand Profile
          </h2>

          <div className="flex items-start gap-6">
            <div className="relative group">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-20 w-20 rounded-2xl object-cover ring-2 ring-violet-100 dark:ring-violet-500/20"
              />
              <button className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <Camera size={20} className="text-white" />
              </button>
            </div>

            <div className="flex-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-white/40">
                  <User size={12} />
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1 flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-white/40">
                  <Building2 size={12} />
                  Company
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1 flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-white/40">
                  <Mail size={12} />
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1 flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-white/40">
                  <Globe size={12} />
                  Website
                </label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-1 flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-white/40">
              Industry
            </label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="mt-4">
            <label className="mb-1 text-xs font-medium text-gray-500 dark:text-white/40">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className={inputClass + " resize-none"}
            />
          </div>

          <div className="mt-5 flex items-center justify-end gap-3">
            <button
              onClick={handleSave}
              className={[
                "flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold transition-all duration-300",
                saved
                  ? "bg-emerald-500 text-white"
                  : "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20 hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-px",
              ].join(" ")}
            >
              {saved ? (
                <>
                  <Check size={16} />
                  Saved!
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>

        {/* Preferences */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10">
                <Bell size={16} className="text-blue-500" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Notifications
                </h3>
                <p className="text-xs text-gray-500 dark:text-white/30">
                  Manage alerts
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                "New applications",
                "Messages",
                "Payment updates",
                "Campaign milestones",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-gray-700 dark:text-white/60">
                    {item}
                  </span>
                  <div className="flex h-5 w-9 items-center rounded-full bg-violet-600 p-0.5 dark:bg-violet-500">
                    <div className="h-4 w-4 translate-x-4 rounded-full bg-white shadow-sm transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10">
                <Shield size={16} className="text-emerald-500" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Security
                </h3>
                <p className="text-xs text-gray-500 dark:text-white/30">
                  Account security
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <button className="w-full rounded-xl border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50 dark:border-white/[0.08] dark:text-white/60 dark:hover:border-white/[0.12] dark:hover:bg-white/[0.03]">
                Change Password
              </button>
              <button className="w-full rounded-xl border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50 dark:border-white/[0.08] dark:text-white/60 dark:hover:border-white/[0.12] dark:hover:bg-white/[0.03]">
                Two-Factor Authentication
              </button>
              <button className="w-full rounded-xl border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50 dark:border-white/[0.08] dark:text-white/60 dark:hover:border-white/[0.12] dark:hover:bg-white/[0.03]">
                Connected Accounts
              </button>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/[0.06] dark:bg-white/[0.02]">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10">
              <CreditCard size={16} className="text-violet-500" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Payment Method
              </h3>
              <p className="text-xs text-gray-500 dark:text-white/30">
                Manage billing
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-white/[0.04] dark:bg-white/[0.02]">
            <div className="flex h-10 w-16 items-center justify-center rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600">
              <span className="text-xs font-bold text-white">VISA</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                •••• •••• •••• 4242
              </p>
              <p className="text-xs text-gray-500 dark:text-white/30">
                Expires 12/28
              </p>
            </div>
            <button className="ml-auto text-xs font-medium text-violet-600 transition-colors hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
