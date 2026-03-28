"use client";

import { useEffect, useRef, useState } from "react";
import { useClientDashboardStore } from "@/store/clientDashboardStore";
import { getGsap } from "@/animations/gsapClient";
import {
  Users,
  Star,
  Clock,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Briefcase,
  ChevronDown,
  ExternalLink,
  Wallet,
  ArrowRight,
} from "lucide-react";

export function ApplicationsView() {
  const campaigns = useClientDashboardStore((s) => s.campaigns);
  const applicants = useClientDashboardStore((s) => s.applicants);
  const selectedApplicantId = useClientDashboardStore(
    (s) => s.selectedApplicantId
  );
  const filterCampaignId = useClientDashboardStore((s) => s.filterCampaignId);
  const setSelectedApplicant = useClientDashboardStore(
    (s) => s.setSelectedApplicant
  );
  const setFilterCampaign = useClientDashboardStore(
    (s) => s.setFilterCampaign
  );
  const updateApplicationStatus = useClientDashboardStore(
    (s) => s.updateApplicationStatus
  );
  const setActiveTab = useClientDashboardStore((s) => s.setActiveTab);

  const [showConfirmAccept, setShowConfirmAccept] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const filteredApplicants = filterCampaignId
    ? applicants.filter((a) => a.jobId === filterCampaignId)
    : applicants;

  const selectedApplicant = applicants.find(
    (a) => a.id === selectedApplicantId
  );
  const selectedCampaign = selectedApplicant
    ? campaigns.find((c) => c.id === selectedApplicant.jobId)
    : null;

  useEffect(() => {
    const gsap = getGsap();
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    const gsap = getGsap();
    if (detailRef.current && selectedApplicantId) {
      gsap.fromTo(
        detailRef.current,
        { opacity: 0, x: 10 },
        { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [selectedApplicantId]);

  const handleAccept = (id: string) => {
    updateApplicationStatus(id, "accepted");
    setShowConfirmAccept(false);
  };

  const handleReject = (id: string) => {
    updateApplicationStatus(id, "rejected");
  };

  return (
    <div ref={containerRef} className="flex h-screen">
      {/* LEFT: Applicant List */}
      <div className="flex w-[380px] flex-shrink-0 flex-col border-r border-gray-200 dark:border-white/[0.06] bg-[#FAFAFA] dark:bg-black">
        {/* Header */}
        <div className="flex h-auto flex-col border-b border-gray-200 dark:border-white/[0.06] px-5 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-violet-500" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Applications
              </h2>
            </div>
            <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-semibold text-violet-700 dark:bg-violet-500/10 dark:text-violet-400">
              {filteredApplicants.length}
            </span>
          </div>

          {/* Campaign filter */}
          <div className="relative">
            <select
              value={filterCampaignId || ""}
              onChange={(e) =>
                setFilterCampaign(e.target.value || null)
              }
              className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2 pr-8 text-xs text-gray-600 outline-none transition-colors focus:border-violet-300 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white/60 dark:focus:border-violet-500/30"
            >
              <option value="">All Campaigns</option>
              {campaigns.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
            <ChevronDown
              size={12}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {filteredApplicants.map((app) => {
            const isActive = app.id === selectedApplicantId;
            const campaign = campaigns.find((c) => c.id === app.jobId);

            return (
              <button
                key={app.id}
                onClick={() => setSelectedApplicant(app.id)}
                className={[
                  "flex w-full items-start gap-3 px-5 py-4 text-left transition-all duration-200 border-b border-gray-100 dark:border-white/[0.03]",
                  isActive
                    ? "bg-violet-50 dark:bg-violet-500/5"
                    : "hover:bg-gray-50 dark:hover:bg-white/[0.03]",
                ].join(" ")}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={app.avatar}
                    alt={app.name}
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-white dark:ring-[#0A0A0A]"
                  />
                  {app.status === "pending" && (
                    <div className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-amber-500 dark:border-[#0A0A0A]" />
                  )}
                  {app.status === "accepted" && (
                    <div className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 dark:border-[#0A0A0A]" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p
                      className={[
                        "truncate text-sm font-semibold",
                        isActive
                          ? "text-violet-900 dark:text-violet-300"
                          : "text-gray-900 dark:text-white/80",
                      ].join(" ")}
                    >
                      {app.name}
                    </p>
                    <span className="flex-shrink-0 text-sm font-bold text-gray-900 dark:text-white">
                      {app.bidAmount}
                    </span>
                  </div>

                  <p className="mt-0.5 truncate text-xs text-gray-500 dark:text-white/30">
                    {campaign?.title}
                  </p>

                  <div className="mt-1.5 flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[10px] text-amber-500">
                      <Star size={10} fill="currentColor" />
                      {app.rating}
                    </span>
                    <span className="text-[10px] text-gray-400 dark:text-white/20">
                      {app.completedJobs} jobs
                    </span>
                    <span
                      className={[
                        "rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase",
                        app.status === "pending"
                          ? "bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
                          : app.status === "accepted"
                            ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                            : "bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400",
                      ].join(" ")}
                    >
                      {app.status}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}

          {filteredApplicants.length === 0 && (
            <div className="flex flex-col items-center py-16 text-center px-6">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-200 dark:border-white/[0.08]">
                <Users
                  size={20}
                  className="text-gray-300 dark:text-white/20"
                />
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-white/40">
                No applications
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-white/20">
                Applications will appear here when creators apply
              </p>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: Selected Applicant Detail */}
      {selectedApplicant ? (
        <div
          ref={detailRef}
          className="flex flex-1 flex-col overflow-y-auto bg-[#FAFAFA] dark:bg-black"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-white/[0.06] dark:bg-black/80 px-8 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={selectedApplicant.avatar}
                  alt={selectedApplicant.name}
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-violet-100 dark:ring-violet-500/20"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {selectedApplicant.name}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-white/40">
                    Applied for:{" "}
                    <span className="font-medium text-gray-700 dark:text-white/60">
                      {selectedCampaign?.title}
                    </span>
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              {selectedApplicant.status === "pending" && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleReject(selectedApplicant.id)}
                    className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-white/[0.08] dark:text-white/50 dark:hover:border-red-500/30 dark:hover:bg-red-500/5 dark:hover:text-red-400"
                  >
                    <XCircle size={16} />
                    Reject
                  </button>
                  <button
                    onClick={() => setActiveTab("messages")}
                    className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-white/[0.08] dark:text-white/50 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/5 dark:hover:text-blue-400"
                  >
                    <MessageSquare size={16} />
                    Message
                  </button>
                  <button
                    onClick={() => setShowConfirmAccept(true)}
                    className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-px"
                  >
                    <CheckCircle2 size={16} />
                    Accept & Hire
                  </button>
                </div>
              )}

              {selectedApplicant.status === "accepted" && (
                <span className="flex items-center gap-2 rounded-xl bg-emerald-100 px-4 py-2.5 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <CheckCircle2 size={16} />
                  Hired
                </span>
              )}

              {selectedApplicant.status === "rejected" && (
                <span className="flex items-center gap-2 rounded-xl bg-red-100 px-4 py-2.5 text-sm font-semibold text-red-700 dark:bg-red-500/10 dark:text-red-400">
                  <XCircle size={16} />
                  Rejected
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-8 space-y-6">
            {/* Key Stats */}
            <div className="grid grid-cols-4 gap-4">
              {[
                {
                  label: "Bid Amount",
                  value: selectedApplicant.bidAmount,
                  icon: Wallet,
                },
                {
                  label: "Timeline",
                  value: selectedApplicant.timeline,
                  icon: Clock,
                },
                {
                  label: "Rating",
                  value: `${selectedApplicant.rating}/5`,
                  icon: Star,
                },
                {
                  label: "Completed",
                  value: `${selectedApplicant.completedJobs} jobs`,
                  icon: Briefcase,
                },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-gray-200 bg-white p-4 dark:border-white/[0.06] dark:bg-white/[0.02]"
                  >
                    <Icon
                      size={16}
                      className="mb-2 text-gray-400 dark:text-white/30"
                    />
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-white/30">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Proposal */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/[0.06] dark:bg-white/[0.02]">
              <h3 className="mb-3 text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-white/70">
                Proposal
              </h3>
              <p className="text-sm leading-relaxed text-gray-700 dark:text-white/60">
                {selectedApplicant.proposal}
              </p>
            </div>

            {/* Categories */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/[0.06] dark:bg-white/[0.02]">
              <h3 className="mb-3 text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-white/70">
                Specializations
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedApplicant.categories.map((cat) => (
                  <span
                    key={cat}
                    className="rounded-lg bg-violet-100 px-3 py-1.5 text-xs font-medium text-violet-700 dark:bg-violet-500/10 dark:text-violet-400"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* Portfolio */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/[0.06] dark:bg-white/[0.02]">
              <h3 className="mb-4 text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-white/70">
                Portfolio
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {selectedApplicant.portfolio.map((img, idx) => (
                  <div
                    key={idx}
                    className="group relative aspect-square overflow-hidden rounded-xl"
                  >
                    <img
                      src={img}
                      alt={`Portfolio ${idx + 1}`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/20 flex items-center justify-center">
                      <ExternalLink
                        size={20}
                        className="text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Accept Confirmation Modal */}
          {showConfirmAccept && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="mx-4 w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl dark:border-white/[0.08] dark:bg-[#111]">
                <div className="mb-6 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
                    <CheckCircle2
                      size={28}
                      className="text-emerald-500"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Accept & Hire
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-white/40">
                    You&apos;re about to hire{" "}
                    <strong className="text-gray-900 dark:text-white">
                      {selectedApplicant.name}
                    </strong>{" "}
                    for{" "}
                    <strong className="text-gray-900 dark:text-white">
                      {selectedApplicant.bidAmount}
                    </strong>
                  </p>
                  <p className="mt-1 text-xs text-gray-400 dark:text-white/25">
                    Funds will be deposited into escrow
                  </p>
                </div>

                <div className="mb-6 rounded-xl bg-gray-50 p-4 dark:bg-white/[0.03]">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-white/40">
                      Amount
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {selectedApplicant.bidAmount}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-gray-400 dark:text-white/25">
                    <Wallet size={12} />
                    Secured via Escrow — released on approval
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowConfirmAccept(false)}
                    className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-gray-50 dark:border-white/[0.08] dark:text-white/50 dark:hover:bg-white/[0.03]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleAccept(selectedApplicant.id)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:shadow-xl"
                  >
                    Confirm & Deposit
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Empty state */
        <div className="flex flex-1 items-center justify-center bg-[#FAFAFA] dark:bg-black">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-200 dark:border-white/[0.08]">
              <Users
                size={24}
                strokeWidth={1.5}
                className="text-gray-300 dark:text-white/20"
              />
            </div>
            <p className="text-base font-medium text-gray-900 dark:text-white/40">
              Select an applicant
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-white/20">
              Choose from the list to review their proposal and portfolio
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
