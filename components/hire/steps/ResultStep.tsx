"use client";

import { useEffect, useRef, useState } from "react";
import { useHireStore } from "@/store/hireStore";
import { getGsap } from "@/animations/gsapClient";

export function ResultStep() {
  const generatedTitle = useHireStore((s) => s.generatedTitle);
  const generatedDescription = useHireStore((s) => s.generatedDescription);
  const goNext = useHireStore((s) => s.goNext);

  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  const [displayedTitle, setDisplayedTitle] = useState("");
  const [showDescription, setShowDescription] = useState(false);

  // Typewriter effect for title
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < generatedTitle.length) {
        setDisplayedTitle(generatedTitle.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowDescription(true), 200);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [generatedTitle]);

  // Animate description and CTA
  useEffect(() => {
    if (!showDescription) return;

    const gsap = getGsap();

    if (descRef.current) {
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }

    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", delay: 0.2 }
      );
    }
  }, [showDescription]);

  return (
    <div ref={containerRef} className="flex flex-col items-center">
      {/* Success badge */}
      <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5">
        <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        <span className="text-xs text-emerald-400/80">
          Job generated successfully
        </span>
      </div>

      {/* Title with typewriter */}
      <h2
        ref={titleRef}
        className="mb-8 text-center text-3xl font-semibold tracking-tight text-white md:text-4xl"
      >
        {displayedTitle}
        <span className="inline-block w-0.5 h-7 bg-white/60 ml-1 animate-pulse align-middle" />
      </h2>

      {/* Description card */}
      {showDescription && (
        <div
          ref={descRef}
          className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/[0.025] p-6 text-left opacity-0 md:p-8"
        >
          <div className="mb-4 flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-white/40" />
            <span className="text-xs tracking-[0.2em] uppercase text-white/30">
              Job Description
            </span>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-white/60 md:text-base">
            {generatedDescription.split("\n").map((line, i) => {
              if (!line.trim()) return <div key={i} className="h-2" />;
              if (line.startsWith("**") && line.endsWith("**")) {
                return (
                  <h3
                    key={i}
                    className="pt-2 text-sm font-semibold text-white/80"
                  >
                    {line.replace(/\*\*/g, "")}
                  </h3>
                );
              }
              if (line.startsWith("•")) {
                return (
                  <p key={i} className="pl-2 text-white/50">
                    {line}
                  </p>
                );
              }
              if (line.startsWith("📍")) {
                return (
                  <p key={i} className="text-white/50">
                    {line}
                  </p>
                );
              }
              return (
                <p key={i} className="text-white/55">
                  {line}
                </p>
              );
            })}
          </div>
        </div>
      )}

      {/* CTA */}
      {showDescription && (
        <button
          ref={ctaRef}
          onClick={goNext}
          className="mt-10 inline-flex h-14 items-center justify-center gap-3 rounded-full bg-white px-10 text-sm font-medium tracking-[0.15em] uppercase text-black opacity-0 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_50px_rgba(255,255,255,0.15)]"
        >
          Continue to Post Job
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M6 4L10 8L6 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
