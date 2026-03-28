"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useHireStore } from "@/store/hireStore";
import { getGsap } from "@/animations/gsapClient";

const SMART_SUGGESTIONS: Record<string, string> = {
  instagram:
    "We can help you hire Instagram influencers for brand promotions, reels, stories, and campaign collaborations.",
  youtube:
    "We'll connect you with top YouTube creators for reviews, vlogs, shorts, and long-form brand integrations.",
  tiktok:
    "Find trending TikTok creators for viral content, challenges, and brand awareness campaigns.",
  influencer:
    "We specialize in connecting brands with vetted influencers across all major platforms.",
  photographer:
    "Hire professional photographers for product shoots, lifestyle content, and brand imagery.",
  video:
    "Get matched with skilled videographers for commercials, reels, and professional video content.",
  ugc: "Find authentic UGC creators who produce genuine, trust-building content for your brand.",
  content:
    "We'll match you with the perfect content creators tailored to your brand's voice and vision.",
  brand:
    "Our marketplace connects your brand with top-tier creators for impactful campaigns.",
  promotion:
    "Launch high-converting promotion campaigns with creators who resonate with your audience.",
  reel: "Hire creators who specialize in short-form, high-impact reels that drive engagement.",
  campaign:
    "Build end-to-end creator campaigns with talent perfectly matched to your goals.",
};

function getSuggestion(input: string): string | null {
  const lower = input.toLowerCase();
  for (const [keyword, suggestion] of Object.entries(SMART_SUGGESTIONS)) {
    if (lower.includes(keyword)) return suggestion;
  }
  if (lower.length > 10) {
    return "We'll find the perfect creators for your needs — tell us more to get personalized matches.";
  }
  return null;
}

export function IntentStep() {
  const intent = useHireStore((s) => s.intent);
  const setIntent = useHireStore((s) => s.setIntent);
  const goNext = useHireStore((s) => s.goNext);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const suggestionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    // Animate heading on mount
    const gsap = getGsap();
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.2 }
      );
    }
  }, []);

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setIntent(value);

      const newSuggestion = getSuggestion(value);
      setSuggestion(newSuggestion);

      if (newSuggestion && suggestionRef.current) {
        const gsap = getGsap();
        gsap.fromTo(
          suggestionRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        );
      }
    },
    [setIntent]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && intent.trim().length > 0) {
      e.preventDefault();
      goNext();
    }
  };

  const canContinue = intent.trim().length > 0;

  return (
    <div className="flex flex-col items-center text-center">
      <h2
        ref={headingRef}
        className="mb-3 text-4xl font-semibold tracking-tight text-white opacity-0 md:text-5xl lg:text-6xl"
      >
        Tell us what you need
      </h2>

      <p className="mb-10 max-w-md text-base text-white/40 md:text-lg">
        Describe the creator or campaign you have in mind
      </p>

      <div className="group relative w-full">
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/20 to-white/5 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100" />

        <textarea
          ref={inputRef}
          value={intent}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="I want an Instagram influencer for..."
          rows={3}
          className="relative w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 text-lg text-white placeholder-white/25 outline-none transition-all duration-300 focus:border-white/25 focus:bg-white/[0.05] md:text-xl"
        />
      </div>

      {/* Smart suggestion */}
      {suggestion && (
        <div
          ref={suggestionRef}
          className="mt-6 flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.025] px-5 py-4 text-left"
        >
          <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white/10">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="text-white/70"
            >
              <path
                d="M6 1V11M1 6H11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <p className="text-sm leading-relaxed text-white/50">{suggestion}</p>
        </div>
      )}

      {/* Continue button */}
      <button
        onClick={goNext}
        disabled={!canContinue}
        className="mt-10 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white px-10 text-sm font-medium tracking-[0.15em] uppercase text-black transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_40px_rgba(255,255,255,0.15)] disabled:cursor-not-allowed disabled:opacity-20 disabled:hover:scale-100 disabled:hover:shadow-none"
      >
        Continue
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="transition-transform duration-200"
        >
          <path
            d="M6 4L10 8L6 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <p className="mt-4 text-xs text-white/20">
        Press Enter ↵ to continue
      </p>
    </div>
  );
}
