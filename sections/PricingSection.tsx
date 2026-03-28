"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { getGsap } from "@/animations/gsapClient";

/* ─────────────── Plan data ─────────────── */

type Plan = {
  name: string;
  price: string;
  priceYearly?: string;
  period: string;
  features: string[];
  cta: string;
  popular?: boolean;
  accent: string;
};

const BRAND_PLANS: Plan[] = [
  {
    name: "Starter",
    price: "₹999",
    priceYearly: "₹799",
    period: "/month",
    accent: "emerald",
    cta: "Start Hiring",
    features: [
      "Post up to 3 jobs/month",
      "Basic creator filtering",
      "Limited messaging",
      "Standard support",
    ],
  },
  {
    name: "Growth",
    price: "₹2,999",
    priceYearly: "₹2,399",
    period: "/month",
    accent: "blue",
    popular: true,
    cta: "Get Growth",
    features: [
      "Unlimited job postings",
      "Full access to creators",
      "Messaging + shortlist",
      "Priority visibility",
      "Campaign analytics",
    ],
  },
  {
    name: "Pro",
    price: "₹6,999",
    priceYearly: "₹5,599",
    period: "/month",
    accent: "violet",
    cta: "Go Pro",
    features: [
      "Everything in Growth",
      "Featured campaigns",
      "Premium creator access",
      "Advanced analytics",
      "Dedicated support",
    ],
  },
];

const CREATOR_PLANS: Plan[] = [
  {
    name: "Free",
    price: "₹0",
    period: "",
    accent: "emerald",
    cta: "Get Started Free",
    features: [
      "5 job applications/month",
      "Basic profile",
      "Browse all jobs",
      "Community access",
    ],
  },
  {
    name: "Creator Pro",
    price: "₹499",
    priceYearly: "₹399",
    period: "/month",
    accent: "blue",
    popular: true,
    cta: "Go Pro",
    features: [
      "25 job applications/month",
      "Profile boost",
      "Priority listing",
      "Direct messaging",
      "Application analytics",
    ],
  },
  {
    name: "Creator Elite",
    price: "₹1,499",
    priceYearly: "₹1,199",
    period: "/month",
    accent: "violet",
    cta: "Go Elite",
    features: [
      "Unlimited applications",
      "Featured profile badge",
      "Direct brand invites",
      "Priority support",
      "Exclusive opportunities",
    ],
  },
];

/* ─────────────── Component ─────────────── */

export function PricingSection() {
  const [tab, setTab] = useState<"brands" | "creators">("brands");
  const [yearly, setYearly] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  /* ── Scroll-triggered entrance ── */
  useEffect(() => {
    const gsap = getGsap();
    if (!sectionRef.current || !headingRef.current) return;

    gsap.fromTo(
      headingRef.current.children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      },
    );
  }, []);

  /* ── Card stagger on tab change ── */
  useEffect(() => {
    const gsap = getGsap();
    if (!cardsRef.current) return;
    const cards = cardsRef.current.querySelectorAll("[data-pricing-card]");
    gsap.fromTo(
      cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.12,
        ease: "power3.out",
      },
    );
  }, [tab]);

  const plans = tab === "brands" ? BRAND_PLANS : CREATOR_PLANS;

  return (
    <section
      ref={sectionRef}
      id="pricing-section"
      className={[
        "relative py-24 md:py-32 overflow-hidden",
        isDark ? "bg-black" : "bg-white",
      ].join(" ")}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: isDark
          ? "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.02) 0%, transparent 60%)"
          : "radial-gradient(circle at 50% 0%, rgba(0,0,0,0.015) 0%, transparent 60%)",
      }} />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">

        {/* ── Header ── */}
        <div ref={headingRef} className="mx-auto max-w-2xl text-center mb-12">
          <p className={[
            "mb-4 text-xs tracking-[0.28em] uppercase font-medium",
            isDark ? "text-white/40" : "text-black/35",
          ].join(" ")}>
            Pricing
          </p>

          <h2 className={[
            "text-4xl font-semibold tracking-tight sm:text-5xl",
            isDark ? "text-white" : "text-black",
          ].join(" ")}>
            Simple, transparent pricing
          </h2>

          <p className={[
            "mt-4 text-lg leading-relaxed",
            isDark ? "text-white/50" : "text-black/45",
          ].join(" ")}>
            No commission. Direct hiring. Pick the plan that fits.
          </p>
        </div>

        {/* ── Tab Toggle ── */}
        <div className="flex justify-center mb-4" id="pricing-tab-toggle">
          <div className={[
            "inline-flex items-center rounded-full p-1 transition-colors duration-300",
            isDark ? "bg-white/[0.04] border border-white/[0.06]" : "bg-black/[0.03] border border-black/[0.05]",
          ].join(" ")}>
            <button
              onClick={() => setTab("brands")}
              className={[
                "relative px-6 py-2 text-sm font-medium rounded-full transition-all duration-300",
                tab === "brands"
                  ? isDark
                    ? "bg-white text-black shadow-[0_2px_12px_rgba(255,255,255,0.1)]"
                    : "bg-black text-white shadow-[0_2px_12px_rgba(0,0,0,0.1)]"
                  : isDark
                    ? "text-white/50 hover:text-white/80"
                    : "text-black/45 hover:text-black/70",
              ].join(" ")}
              id="pricing-tab-brands"
            >
              For Brands
            </button>
            <button
              onClick={() => setTab("creators")}
              className={[
                "relative px-6 py-2 text-sm font-medium rounded-full transition-all duration-300",
                tab === "creators"
                  ? isDark
                    ? "bg-white text-black shadow-[0_2px_12px_rgba(255,255,255,0.1)]"
                    : "bg-black text-white shadow-[0_2px_12px_rgba(0,0,0,0.1)]"
                  : isDark
                    ? "text-white/50 hover:text-white/80"
                    : "text-black/45 hover:text-black/70",
              ].join(" ")}
              id="pricing-tab-creators"
            >
              For Creators
            </button>
          </div>
        </div>

        {/* ── Yearly toggle ── */}
        <div className="flex items-center justify-center gap-3 mb-12" id="pricing-yearly-toggle">
          <span className={[
            "text-sm",
            !yearly
              ? isDark ? "text-white" : "text-black"
              : isDark ? "text-white/40" : "text-black/35",
          ].join(" ")}>
            Monthly
          </span>
          <button
            onClick={() => setYearly(!yearly)}
            className={[
              "relative h-6 w-11 rounded-full transition-colors duration-300",
              yearly
                ? isDark ? "bg-white" : "bg-black"
                : isDark ? "bg-white/15" : "bg-black/15",
            ].join(" ")}
            aria-label="Toggle yearly billing"
          >
            <span
              className={[
                "absolute top-0.5 h-5 w-5 rounded-full transition-all duration-300",
                yearly ? "left-[22px]" : "left-0.5",
                yearly
                  ? isDark ? "bg-black" : "bg-white"
                  : isDark ? "bg-white/60" : "bg-black/40",
              ].join(" ")}
            />
          </button>
          <span className={[
            "text-sm",
            yearly
              ? isDark ? "text-white" : "text-black"
              : isDark ? "text-white/40" : "text-black/35",
          ].join(" ")}>
            Yearly
          </span>
          {yearly && (
            <span className={[
              "ml-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
              isDark ? "bg-white/[0.08] text-white/70" : "bg-black/[0.05] text-black/60",
            ].join(" ")}>
              Save 20%
            </span>
          )}
        </div>

        {/* ── Pricing Cards ── */}
        <div
          ref={cardsRef}
          className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3"
          id="pricing-cards"
        >
          {plans.map((plan) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              yearly={yearly}
              isDark={isDark}
            />
          ))}
        </div>

        {/* ── Trust line ── */}
        <p className={[
          "mt-12 text-center text-sm",
          isDark ? "text-white/30" : "text-black/25",
        ].join(" ")} id="pricing-trust-line">
          No hidden fees · Cancel anytime · Secure payments
        </p>
      </div>
    </section>
  );
}

/* ─────────────── Card Component ─────────────── */

function PricingCard({
  plan,
  yearly,
  isDark,
}: {
  plan: Plan;
  yearly: boolean;
  isDark: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    const gsap = getGsap();
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      y: -6,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    const gsap = getGsap();
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      y: 0,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const displayPrice = yearly && plan.priceYearly ? plan.priceYearly : plan.price;

  return (
    <div
      ref={cardRef}
      data-pricing-card
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={[
        "group relative flex flex-col rounded-2xl p-7 transition-all duration-300",
        plan.popular
          ? isDark
            ? "bg-white/[0.04] border-[1.5px] border-white/[0.12] shadow-[0_0_40px_rgba(255,255,255,0.03)]"
            : "bg-black/[0.02] border-[1.5px] border-black/[0.08] shadow-[0_0_40px_rgba(0,0,0,0.03)]"
          : isDark
            ? "border border-white/[0.06] hover:border-white/[0.1]"
            : "border border-black/[0.06] hover:border-black/[0.1]",
      ].join(" ")}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div className={[
          "absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide",
          isDark
            ? "bg-white text-black"
            : "bg-black text-white",
        ].join(" ")}>
          Recommended
        </div>
      )}

      {/* Plan name */}
      <p className={[
        "text-xs font-semibold tracking-[0.2em] uppercase mb-5",
        isDark ? "text-white/35" : "text-black/35",
      ].join(" ")}>
        {plan.name}
      </p>

      {/* Price */}
      <div className="flex items-baseline gap-1 mb-6">
        <span className={[
          "text-4xl font-bold tracking-tight",
          isDark ? "text-white" : "text-black",
        ].join(" ")}>
          {displayPrice}
        </span>
        {plan.period && (
          <span className={[
            "text-sm",
            isDark ? "text-white/35" : "text-black/30",
          ].join(" ")}>
            {plan.period}
          </span>
        )}
      </div>

      {/* Divider */}
      <div className={[
        "h-px mb-6",
        isDark ? "bg-white/[0.06]" : "bg-black/[0.06]",
      ].join(" ")} />

      {/* Features */}
      <ul className="flex-1 flex flex-col gap-3 mb-8">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className={[
                "mt-0.5 flex-shrink-0",
                isDark ? "text-white/40" : "text-black/35",
              ].join(" ")}
            >
              <path
                d="M3.5 8.5L6.5 11.5L12.5 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={[
              "text-sm leading-relaxed",
              isDark ? "text-white/55" : "text-black/50",
            ].join(" ")}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        className={[
          "flex h-11 w-full items-center justify-center rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
          plan.popular
            ? isDark
              ? "bg-white text-black hover:shadow-[0_4px_20px_rgba(255,255,255,0.15)]"
              : "bg-black text-white hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
            : isDark
              ? "border border-white/[0.12] text-white/70 hover:text-white hover:border-white/[0.2] hover:bg-white/[0.03]"
              : "border border-black/[0.1] text-black/60 hover:text-black hover:border-black/[0.18] hover:bg-black/[0.02]",
        ].join(" ")}
      >
        {plan.cta}
      </button>
    </div>
  );
}
