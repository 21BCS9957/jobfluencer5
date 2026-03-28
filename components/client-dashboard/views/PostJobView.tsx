"use client";

import { useEffect, useRef, useState } from "react";
import { useClientDashboardStore } from "@/store/clientDashboardStore";
import { getGsap } from "@/animations/gsapClient";
import {
  Sparkles,
  FileText,
  MapPin,
  Layers,
  DollarSign,
  Monitor,
  ChevronRight,
  Check,
  Loader2,
} from "lucide-react";

const PLATFORMS = ["Instagram", "YouTube", "TikTok", "Twitter/X", "LinkedIn"];
const NICHES = [
  "Fashion",
  "Beauty",
  "Fitness",
  "Tech",
  "Food",
  "Lifestyle",
  "Travel",
  "Gaming",
];
const CITIES = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Jaipur",
  "Remote",
];

export function PostJobView() {
  const postJobDraft = useClientDashboardStore((s) => s.postJobDraft);
  const updatePostJobDraft = useClientDashboardStore(
    (s) => s.updatePostJobDraft
  );
  const publishJob = useClientDashboardStore((s) => s.publishJob);
  const resetPostJobDraft = useClientDashboardStore(
    (s) => s.resetPostJobDraft
  );

  const [isPublishing, setIsPublishing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const isValid =
    postJobDraft.title.trim() &&
    postJobDraft.description.trim() &&
    postJobDraft.platform &&
    postJobDraft.city &&
    postJobDraft.budget;

  const handlePublish = async () => {
    if (!isValid) return;
    setIsPublishing(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    publishJob();
    setIsPublishing(false);
  };

  const completedSteps = [
    postJobDraft.title.trim(),
    postJobDraft.description.trim(),
    postJobDraft.platform,
    postJobDraft.niche,
    postJobDraft.city,
    postJobDraft.budget,
  ].filter(Boolean).length;

  return (
    <div ref={containerRef} className="px-8 py-8 lg:px-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <Sparkles size={14} className="text-violet-500" />
          <span className="text-xs tracking-[0.2em] uppercase text-gray-400 dark:text-white/30">
            Create Campaign
          </span>
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Post a New Job
        </h1>
        <p className="mt-2 text-base text-gray-500 dark:text-white/40">
          Describe what you&apos;re looking for and find the perfect creator
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
              <FileText size={16} className="text-violet-500" />
              Job Title
            </label>
            <input
              type="text"
              value={postJobDraft.title}
              onChange={(e) => updatePostJobDraft({ title: e.target.value })}
              placeholder="e.g. Instagram Reels for Summer Fashion Collection"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:border-violet-300 focus:bg-white focus:ring-2 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white dark:placeholder-white/20 dark:focus:border-violet-500/30 dark:focus:bg-white/[0.05]"
            />
          </div>

          {/* Description */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
              <Layers size={16} className="text-violet-500" />
              Description
            </label>
            <textarea
              value={postJobDraft.description}
              onChange={(e) =>
                updatePostJobDraft({ description: e.target.value })
              }
              placeholder="Describe the campaign goals, deliverables, timeline, and any specific requirements..."
              rows={6}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:border-violet-300 focus:bg-white focus:ring-2 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white dark:placeholder-white/20 dark:focus:border-violet-500/30 dark:focus:bg-white/[0.05] resize-none"
            />
          </div>

          {/* Platform & Niche */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/[0.06] dark:bg-white/[0.02]">
              <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                <Monitor size={16} className="text-violet-500" />
                Platform
              </label>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map((p) => (
                  <button
                    key={p}
                    onClick={() => updatePostJobDraft({ platform: p })}
                    className={[
                      "rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                      postJobDraft.platform === p
                        ? "bg-violet-600 text-white shadow-md shadow-violet-500/20"
                        : "border border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:bg-gray-100 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white/60 dark:hover:border-white/[0.15]",
                    ].join(" ")}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/[0.06] dark:bg-white/[0.02]">
              <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                <Layers size={16} className="text-violet-500" />
                Niche
              </label>
              <div className="flex flex-wrap gap-2">
                {NICHES.map((n) => (
                  <button
                    key={n}
                    onClick={() => updatePostJobDraft({ niche: n })}
                    className={[
                      "rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                      postJobDraft.niche === n
                        ? "bg-violet-600 text-white shadow-md shadow-violet-500/20"
                        : "border border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:bg-gray-100 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white/60 dark:hover:border-white/[0.15]",
                    ].join(" ")}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* City & Budget */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/[0.06] dark:bg-white/[0.02]">
              <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                <MapPin size={16} className="text-violet-500" />
                City
              </label>
              <div className="flex flex-wrap gap-2">
                {CITIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => updatePostJobDraft({ city: c })}
                    className={[
                      "rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                      postJobDraft.city === c
                        ? "bg-violet-600 text-white shadow-md shadow-violet-500/20"
                        : "border border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:bg-gray-100 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white/60 dark:hover:border-white/[0.15]",
                    ].join(" ")}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/[0.06] dark:bg-white/[0.02]">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                <DollarSign size={16} className="text-violet-500" />
                Budget (₹)
              </label>
              <input
                type="number"
                value={postJobDraft.budget}
                onChange={(e) =>
                  updatePostJobDraft({ budget: e.target.value })
                }
                placeholder="e.g. 150000"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:border-violet-300 focus:bg-white focus:ring-2 focus:ring-violet-500/10 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white dark:placeholder-white/20 dark:focus:border-violet-500/30 dark:focus:bg-white/[0.05]"
              />
              {postJobDraft.budget && (
                <p className="mt-2 text-xs text-gray-500 dark:text-white/30">
                  ₹{parseInt(postJobDraft.budget).toLocaleString("en-IN")}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Preview / Progress */}
        <div className="space-y-6">
          {/* Progress */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/[0.06] dark:bg-white/[0.02]">
            <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
              Completion
            </h3>
            <div className="mb-3 h-2 rounded-full bg-gray-100 dark:bg-white/[0.06] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-500"
                style={{ width: `${(completedSteps / 6) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-white/30">
              {completedSteps}/6 fields completed
            </p>

            <div className="mt-5 space-y-2.5">
              {[
                { label: "Title", done: !!postJobDraft.title.trim() },
                {
                  label: "Description",
                  done: !!postJobDraft.description.trim(),
                },
                { label: "Platform", done: !!postJobDraft.platform },
                { label: "Niche", done: !!postJobDraft.niche },
                { label: "City", done: !!postJobDraft.city },
                { label: "Budget", done: !!postJobDraft.budget },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2.5">
                  <div
                    className={[
                      "flex h-5 w-5 items-center justify-center rounded-full transition-all duration-300",
                      item.done
                        ? "bg-violet-600 text-white"
                        : "border border-gray-200 dark:border-white/[0.1]",
                    ].join(" ")}
                  >
                    {item.done && <Check size={12} strokeWidth={3} />}
                  </div>
                  <span
                    className={[
                      "text-sm transition-colors",
                      item.done
                        ? "text-gray-900 font-medium dark:text-white"
                        : "text-gray-400 dark:text-white/25",
                    ].join(" ")}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Preview Card */}
          {postJobDraft.title && (
            <div className="rounded-2xl border border-violet-200 bg-violet-50/50 p-6 dark:border-violet-500/20 dark:bg-violet-500/5">
              <h3 className="mb-3 text-xs font-semibold tracking-wide text-violet-600 uppercase dark:text-violet-400">
                Preview
              </h3>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                {postJobDraft.title}
              </h4>
              {postJobDraft.description && (
                <p className="mt-2 text-sm text-gray-600 dark:text-white/50 line-clamp-3">
                  {postJobDraft.description}
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                {postJobDraft.platform && (
                  <span className="rounded-md bg-violet-100 px-2 py-1 text-xs font-medium text-violet-700 dark:bg-violet-500/10 dark:text-violet-400">
                    {postJobDraft.platform}
                  </span>
                )}
                {postJobDraft.niche && (
                  <span className="rounded-md bg-violet-100 px-2 py-1 text-xs font-medium text-violet-700 dark:bg-violet-500/10 dark:text-violet-400">
                    {postJobDraft.niche}
                  </span>
                )}
                {postJobDraft.city && (
                  <span className="rounded-md bg-violet-100 px-2 py-1 text-xs font-medium text-violet-700 dark:bg-violet-500/10 dark:text-violet-400">
                    {postJobDraft.city}
                  </span>
                )}
              </div>
              {postJobDraft.budget && (
                <p className="mt-3 text-lg font-bold text-gray-900 dark:text-white">
                  ₹{parseInt(postJobDraft.budget).toLocaleString("en-IN")}
                </p>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={handlePublish}
              disabled={!isValid || isPublishing}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-px disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-lg disabled:cursor-not-allowed"
            >
              {isPublishing ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  Publish Campaign
                  <ChevronRight size={16} />
                </>
              )}
            </button>
            <button
              onClick={resetPostJobDraft}
              className="w-full rounded-xl border border-gray-200 px-6 py-3 text-sm font-medium text-gray-500 transition-all duration-200 hover:bg-gray-50 hover:text-gray-700 dark:border-white/[0.06] dark:text-white/30 dark:hover:bg-white/[0.03] dark:hover:text-white/50"
            >
              Reset Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
