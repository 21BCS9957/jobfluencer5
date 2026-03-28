"use client";

import { useEffect, useRef, useState } from "react";
import { useClientDashboardStore } from "@/store/clientDashboardStore";
import { getGsap } from "@/animations/gsapClient";
import {
  Wallet,
  Lock,
  CheckCircle2,
  Clock,
  ArrowRight,
  Shield,
  AlertCircle,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

const ESCROW_STATUS_CONFIG = {
  pending: {
    label: "Pending",
    bg: "bg-amber-100 dark:bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
    icon: Clock,
    iconColor: "text-amber-500",
  },
  in_escrow: {
    label: "In Escrow",
    bg: "bg-blue-100 dark:bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
    icon: Lock,
    iconColor: "text-blue-500",
  },
  released: {
    label: "Released",
    bg: "bg-emerald-100 dark:bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    icon: CheckCircle2,
    iconColor: "text-emerald-500",
  },
  disputed: {
    label: "Disputed",
    bg: "bg-red-100 dark:bg-red-500/10",
    text: "text-red-600 dark:text-red-400",
    icon: AlertCircle,
    iconColor: "text-red-500",
  },
};

export function PaymentsView() {
  const escrowPayments = useClientDashboardStore((s) => s.escrowPayments);
  const releasePayment = useClientDashboardStore((s) => s.releasePayment);

  const [releaseConfirmId, setReleaseConfirmId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsap = getGsap();
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    }
    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.3,
        }
      );
    }
  }, []);

  const totalInEscrow = escrowPayments
    .filter((p) => p.status === "in_escrow")
    .reduce((a, p) => a + p.amountNum, 0);

  const totalReleased = escrowPayments
    .filter((p) => p.status === "released")
    .reduce((a, p) => a + p.amountNum, 0);

  const totalPending = escrowPayments
    .filter((p) => p.status === "pending")
    .reduce((a, p) => a + p.amountNum, 0);

  const releaseTarget = escrowPayments.find((p) => p.id === releaseConfirmId);

  const handleRelease = () => {
    if (releaseConfirmId) {
      releasePayment(releaseConfirmId);
      setReleaseConfirmId(null);
    }
  };

  return (
    <div ref={containerRef} className="px-8 py-8 lg:px-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <Shield size={14} className="text-violet-500" />
          <span className="text-xs tracking-[0.2em] uppercase text-gray-400 dark:text-white/30">
            Escrow Payments
          </span>
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Payment Management
        </h1>
        <p className="mt-2 text-base text-gray-500 dark:text-white/40">
          Secure escrow system for all your creator payments
        </p>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            label: "Locked in Escrow",
            value: `₹${totalInEscrow.toLocaleString("en-IN")}`,
            icon: Lock,
            gradient: "from-blue-500/10 to-cyan-500/10",
            iconColor: "text-blue-500 dark:text-blue-400",
            borderColor: "border-blue-200 dark:border-blue-500/20",
          },
          {
            label: "Total Released",
            value: `₹${totalReleased.toLocaleString("en-IN")}`,
            icon: CheckCircle2,
            gradient: "from-emerald-500/10 to-teal-500/10",
            iconColor: "text-emerald-500 dark:text-emerald-400",
            borderColor: "border-emerald-200 dark:border-emerald-500/20",
          },
          {
            label: "Pending Deposit",
            value: `₹${totalPending.toLocaleString("en-IN")}`,
            icon: Clock,
            gradient: "from-amber-500/10 to-orange-500/10",
            iconColor: "text-amber-500 dark:text-amber-400",
            borderColor: "border-amber-200 dark:border-amber-500/20",
          },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className={`rounded-2xl border bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:bg-white/[0.02] ${card.borderColor}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${card.gradient}`}
                >
                  <Icon size={18} className={card.iconColor} />
                </div>
                <ArrowUpRight
                  size={14}
                  className="text-gray-300 dark:text-white/15"
                />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {card.value}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-white/30">
                {card.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Escrow security notice */}
      <div className="mb-8 rounded-2xl border border-violet-200 bg-violet-50/50 p-5 dark:border-violet-500/20 dark:bg-violet-500/5">
        <div className="flex items-start gap-3">
          <Shield size={20} className="flex-shrink-0 text-violet-600 dark:text-violet-400 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-violet-900 dark:text-violet-300">
              Escrow Protection
            </p>
            <p className="mt-1 text-xs text-violet-700/70 dark:text-violet-400/50 leading-relaxed">
              All funds are securely held in escrow until you approve the completed work. 
              This ensures both you and the creator are protected throughout the campaign.
            </p>
          </div>
        </div>
      </div>

      {/* Payments List */}
      <div className="mb-4">
        <h2 className="text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-white/70">
          All Transactions
        </h2>
      </div>

      <div ref={cardsRef} className="space-y-3">
        {escrowPayments.map((payment) => {
          const statusConfig = ESCROW_STATUS_CONFIG[payment.status];
          const StatusIcon = statusConfig.icon;

          return (
            <div
              key={payment.id}
              className="group rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:border-gray-300 hover:shadow-sm dark:border-white/[0.06] dark:bg-white/[0.02] dark:hover:border-white/[0.12]"
            >
              <div className="flex items-center gap-5">
                {/* Creator avatar */}
                <img
                  src={payment.creatorAvatar}
                  alt={payment.creatorName}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-100 dark:ring-white/[0.06]"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {payment.campaignTitle}
                      </p>
                      <p className="mt-0.5 text-sm text-gray-500 dark:text-white/40">
                        Creator: {payment.creatorName}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        {payment.amount}
                      </p>
                      <span
                        className={`mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${statusConfig.bg} ${statusConfig.text}`}
                      >
                        <StatusIcon size={10} />
                        {statusConfig.label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline + Actions */}
              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-white/[0.04]">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-white/20">
                    <Clock size={11} />
                    Created {payment.createdAt}
                  </span>
                  {payment.releasedAt && (
                    <span className="flex items-center gap-1 text-xs text-emerald-500">
                      <CheckCircle2 size={11} />
                      Released {payment.releasedAt}
                    </span>
                  )}
                </div>

                {payment.status === "in_escrow" && (
                  <button
                    onClick={() => setReleaseConfirmId(payment.id)}
                    className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-emerald-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-px"
                  >
                    <CheckCircle2 size={13} />
                    Approve & Release
                  </button>
                )}

                {payment.status === "pending" && (
                  <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-4 py-2 text-xs font-medium text-gray-500 transition-all duration-200 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-600 dark:border-white/[0.08] dark:text-white/40 dark:hover:border-violet-500/30 dark:hover:bg-violet-500/5 dark:hover:text-violet-400">
                    <Wallet size={13} />
                    Deposit to Escrow
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {escrowPayments.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-200 dark:border-white/[0.08]">
            <Wallet
              size={24}
              strokeWidth={1.5}
              className="text-gray-300 dark:text-white/20"
            />
          </div>
          <p className="text-lg font-medium text-gray-900 dark:text-white/40">
            No payments yet
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-white/20">
            Payments will appear here when you hire creators
          </p>
        </div>
      )}

      {/* Release Confirmation Modal */}
      {releaseConfirmId && releaseTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl dark:border-white/[0.08] dark:bg-[#111]">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
                <Wallet size={28} className="text-emerald-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Release Payment
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-white/40">
                Release{" "}
                <strong className="text-gray-900 dark:text-white">
                  {releaseTarget.amount}
                </strong>{" "}
                to{" "}
                <strong className="text-gray-900 dark:text-white">
                  {releaseTarget.creatorName}
                </strong>
              </p>
            </div>

            <div className="mb-6 rounded-xl bg-gray-50 p-4 dark:bg-white/[0.03] space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-white/40">
                  Campaign
                </span>
                <span className="font-medium text-gray-900 dark:text-white text-right max-w-[200px] truncate">
                  {releaseTarget.campaignTitle}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-white/40">
                  Amount
                </span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {releaseTarget.amount}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-white/40">To</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {releaseTarget.creatorName}
                </span>
              </div>
            </div>

            <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-3 dark:border-amber-500/20 dark:bg-amber-500/5">
              <p className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-400">
                <AlertCircle size={14} />
                This action cannot be undone. Funds will be transferred immediately.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setReleaseConfirmId(null)}
                className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-gray-50 dark:border-white/[0.08] dark:text-white/50 dark:hover:bg-white/[0.03]"
              >
                Cancel
              </button>
              <button
                onClick={handleRelease}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:shadow-xl"
              >
                Release Payment
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
