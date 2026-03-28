"use client";

import { useEffect, useRef, useState } from "react";
import { getGsap } from "@/animations/gsapClient";
import { useJobsStore } from "@/store/jobsStore";
import {
  X,
  Send,
  IndianRupee,
  MessageSquareText,
  Link2,
  CalendarClock,
  Loader2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export function ApplyModal() {
  const job = useJobsStore((s) => s.applyingJob);
  const setApplyingJob = useJobsStore((s) => s.setApplyingJob);
  const submitApplication = useJobsStore((s) => s.submitApplication);
  const setSelectedJob = useJobsStore((s) => s.setSelectedJob);

  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const [bidAmount, setBidAmount] = useState("");
  const [proposal, setProposal] = useState("");
  const [instagram, setInstagram] = useState("");
  const [website, setWebsite] = useState("");
  const [previousWork, setPreviousWork] = useState("");
  const [timeline, setTimeline] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  /* Reset form on open */
  useEffect(() => {
    if (job) {
      setBidAmount("");
      setProposal("");
      setInstagram("");
      setWebsite("");
      setPreviousWork("");
      setTimeline("");
      setSubmitted(false);
      setErrors({});
    }
  }, [job]);

  /* Animate in */
  useEffect(() => {
    if (!job) return;
    const gsap = getGsap();

    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    );
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, scale: 0.95, y: 40 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.45,
        ease: "power3.out",
        delay: 0.05,
      }
    );

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [job]);

  /* Escape close */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  const close = () => {
    const gsap = getGsap();
    gsap.to(panelRef.current, {
      opacity: 0,
      scale: 0.97,
      y: 20,
      duration: 0.25,
      ease: "power2.in",
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => setApplyingJob(null),
    });
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!bidAmount || isNaN(Number(bidAmount)) || Number(bidAmount) <= 0) {
      errs.bidAmount = "Please enter a valid bid amount";
    }
    if (!proposal.trim() || proposal.trim().length < 20) {
      errs.proposal = "Proposal must be at least 20 characters";
    }
    if (!timeline.trim()) {
      errs.timeline = "Please specify your delivery timeline";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!job) return;
    if (!validate()) return;

    setSubmitting(true);

    /* Simulate API call */
    await new Promise((r) => setTimeout(r, 1500));

    submitApplication({
      jobId: job.id,
      userId: "current-user",
      bidAmount: Number(bidAmount),
      proposal: proposal.trim(),
      portfolioLinks: {
        instagram: instagram || undefined,
        website: website || undefined,
        previousWork: previousWork || undefined,
      },
      timeline: timeline.trim(),
    });

    setSubmitting(false);
    setSubmitted(true);

    /* Auto close after success */
    setTimeout(() => {
      close();
      /* Also close job detail behind */
      setSelectedJob(null);
    }, 2000);
  };

  if (!job) return null;

  /* ---- Success State ---- */
  if (submitted) {
    return (
      <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm dark:bg-black/70"
        />
        <div
          ref={panelRef}
          className="relative z-10 flex w-full max-w-md flex-col items-center rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-2xl dark:border-white/[0.08] dark:bg-[#111111]"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/15">
            <CheckCircle2 size={32} className="text-emerald-500" />
          </div>
          <h3 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">
            Application Submitted!
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-white/40">
            Your bid of ₹{Number(bidAmount).toLocaleString("en-IN")} has been
            sent to {job.brand}. You&apos;ll be notified when they respond.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-start justify-center overflow-y-auto px-4 py-8 md:items-center md:py-0">
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={close}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm dark:bg-black/70"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="relative z-10 w-full max-w-xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl dark:border-white/[0.08] dark:bg-[#111111] md:my-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-8 py-5 dark:border-white/[0.06]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-white/25">
              Apply to
            </p>
            <h2 className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
              {job.title}
            </h2>
            <p className="mt-0.5 text-sm text-gray-500 dark:text-white/40">
              {job.brand} · {job.budgetDisplay}
            </p>
          </div>
          <button
            onClick={close}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-400 transition-colors hover:text-gray-900 dark:border-white/[0.1] dark:text-white/30 dark:hover:text-white"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <div className="max-h-[65vh] overflow-y-auto p-8">
          {/* Average bids hint */}
          <div className="mb-6 flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50/50 px-4 py-3 dark:border-amber-500/20 dark:bg-amber-500/5">
            <Sparkles size={14} className="flex-shrink-0 text-amber-500" />
            <p className="text-xs text-amber-700 dark:text-amber-400">
              Average bids:{" "}
              <span className="font-semibold">
                ₹{(job.avgBidLow / 1000).toFixed(0)}K – ₹
                {(job.avgBidHigh / 1000).toFixed(0)}K
              </span>
            </p>
          </div>

          {/* 1. Bid Amount */}
          <div className="mb-6">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-white/70">
              <IndianRupee size={15} />
              Your Expected Price
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 dark:text-white/30">
                ₹
              </span>
              <input
                type="number"
                placeholder="e.g. 125000"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className={[
                  "w-full rounded-xl border py-3.5 pl-8 pr-4 text-sm outline-none transition-all duration-200",
                  errors.bidAmount
                    ? "border-red-300 bg-red-50 text-red-900 dark:border-red-500/30 dark:bg-red-500/5 dark:text-red-400"
                    : "border-gray-200 bg-gray-50 text-gray-900 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-200 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white dark:focus:border-white/[0.15] dark:focus:ring-white/[0.05]",
                ].join(" ")}
              />
            </div>
            {errors.bidAmount && (
              <p className="mt-1.5 text-xs text-red-500">{errors.bidAmount}</p>
            )}
          </div>

          {/* 2. Proposal */}
          <div className="mb-6">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-white/70">
              <MessageSquareText size={15} />
              Why are you a good fit for this job?
            </label>
            <textarea
              placeholder="Share your experience, approach, and what makes you the perfect creator for this campaign..."
              rows={5}
              value={proposal}
              onChange={(e) => setProposal(e.target.value)}
              className={[
                "w-full resize-none rounded-xl border py-3.5 px-4 text-sm leading-relaxed outline-none transition-all duration-200",
                errors.proposal
                  ? "border-red-300 bg-red-50 text-red-900 dark:border-red-500/30 dark:bg-red-500/5 dark:text-red-400"
                  : "border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-200 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white dark:placeholder-white/20 dark:focus:border-white/[0.15] dark:focus:ring-white/[0.05]",
              ].join(" ")}
            />
            {errors.proposal && (
              <p className="mt-1.5 text-xs text-red-500">{errors.proposal}</p>
            )}
            <p className="mt-1 text-right text-[10px] text-gray-400 dark:text-white/20">
              {proposal.length} characters
            </p>
          </div>

          {/* 3. Portfolio Links */}
          <div className="mb-6">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-white/70">
              <Link2 size={15} />
              Portfolio Links
              <span className="text-xs font-normal text-gray-400 dark:text-white/25">
                (optional)
              </span>
            </label>
            <div className="space-y-3">
              <input
                type="url"
                placeholder="Instagram profile URL"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 px-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-200 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white dark:placeholder-white/20 dark:focus:border-white/[0.15] dark:focus:ring-white/[0.05]"
              />
              <input
                type="url"
                placeholder="Website / Portfolio URL"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 px-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-200 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white dark:placeholder-white/20 dark:focus:border-white/[0.15] dark:focus:ring-white/[0.05]"
              />
              <input
                type="url"
                placeholder="Previous work / Case study URL"
                value={previousWork}
                onChange={(e) => setPreviousWork(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 px-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-200 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white dark:placeholder-white/20 dark:focus:border-white/[0.15] dark:focus:ring-white/[0.05]"
              />
            </div>
          </div>

          {/* 4. Delivery Timeline */}
          <div className="mb-6">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-white/70">
              <CalendarClock size={15} />
              How soon can you complete this?
            </label>
            <input
              type="text"
              placeholder="e.g. 2 weeks, 10 days"
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              className={[
                "w-full rounded-xl border py-3.5 px-4 text-sm outline-none transition-all duration-200",
                errors.timeline
                  ? "border-red-300 bg-red-50 text-red-900 dark:border-red-500/30 dark:bg-red-500/5 dark:text-red-400"
                  : "border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-200 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white dark:placeholder-white/20 dark:focus:border-white/[0.15] dark:focus:ring-white/[0.05]",
              ].join(" ")}
            />
            {errors.timeline && (
              <p className="mt-1.5 text-xs text-red-500">{errors.timeline}</p>
            )}
          </div>
        </div>

        {/* Submit bar */}
        <div className="flex items-center justify-between border-t border-gray-100 px-8 py-5 dark:border-white/[0.06]">
          <button
            onClick={close}
            className="rounded-xl px-5 py-2.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-white/35 dark:hover:text-white/60"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-7 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-black hover:shadow-xl disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-gray-100"
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send size={16} />
                Submit Bid
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
