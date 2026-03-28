"use client";

import { useRef, useEffect, useState } from "react";
import { useHireStore, type Platform } from "@/store/hireStore";
import { getGsap } from "@/animations/gsapClient";

const PLATFORMS: { label: Platform; color: string }[] = [
  { label: "Instagram", color: "#E1306C" },
  { label: "YouTube", color: "#FF0000" },
  { label: "TikTok", color: "#00F2EA" },
  { label: "Others", color: "#888888" },
];

const PLATFORM_ICONS: Record<Platform, React.ReactNode> = {
  Instagram: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
    </svg>
  ),
  YouTube: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-2A29 29 0 0023 12a29 29 0 00-.46-5.58z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9.75 15.02l5.75-3.27-5.75-3.27v6.54z" fill="currentColor" />
    </svg>
  ),
  TikTok: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 12a4 4 0 104 4V4a5 5 0 005 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Others: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <circle cx="5" cy="12" r="2" fill="currentColor" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <circle cx="19" cy="12" r="2" fill="currentColor" />
    </svg>
  ),
};

export function PlatformStep() {
  const platform = useHireStore((s) => s.platform);
  const setPlatform = useHireStore((s) => s.setPlatform);
  const platformOther = useHireStore((s) => s.platformOther);
  const setPlatformOther = useHireStore((s) => s.setPlatformOther);
  const goNext = useHireStore((s) => s.goNext);
  const [showOther, setShowOther] = useState(false);
  const cardsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const otherInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const gsap = getGsap();

    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.1 }
      );
    }

    cardsRef.current.forEach((card, i) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
            delay: 0.15 + i * 0.07,
          }
        );
      }
    });
  }, []);

  const handleSelect = (p: Platform) => {
    setPlatform(p);
    if (p === "Others") {
      setShowOther(true);
      setTimeout(() => otherInputRef.current?.focus(), 200);
    } else {
      setShowOther(false);

      const gsap = getGsap();
      const idx = PLATFORMS.findIndex((pl) => pl.label === p);
      const card = cardsRef.current[idx];
      if (card) {
        gsap.to(card, {
          scale: 0.97,
          duration: 0.1,
          onComplete: () => {
            gsap.to(card, {
              scale: 1,
              duration: 0.15,
              ease: "back.out(2)",
              onComplete: () => {
                void setTimeout(goNext, 300);
              },
            });
          },
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center text-center">
      <h2
        ref={headingRef}
        className="mb-3 text-4xl font-semibold tracking-tight text-white opacity-0 md:text-5xl"
      >
        Where should they create content?
      </h2>
      <p className="mb-10 text-base text-white/40 md:text-lg">
        Choose the platform that matters most
      </p>

      <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
        {PLATFORMS.map((p, i) => {
          const isSelected = platform === p.label;

          return (
            <button
              key={p.label}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              onClick={() => handleSelect(p.label)}
              className={[
                "group relative flex flex-col items-center gap-3 rounded-2xl border p-6 opacity-0 transition-all duration-300",
                isSelected
                  ? "border-white/40 bg-white text-black"
                  : "border-white/8 bg-white/[0.025] text-white hover:border-white/20 hover:bg-white/[0.05]",
              ].join(" ")}
            >
              <div className={isSelected ? "text-black/60" : "text-white/50"}>
                {PLATFORM_ICONS[p.label]}
              </div>
              <span
                className={[
                  "text-sm font-medium",
                  isSelected ? "text-black" : "text-white/80",
                ].join(" ")}
              >
                {p.label}
              </span>

              {/* Subtle platform color accent */}
              <div
                className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full opacity-0 transition-opacity duration-300"
                style={{
                  backgroundColor: p.color,
                  opacity: isSelected ? 0.6 : 0,
                }}
              />
            </button>
          );
        })}
      </div>

      {/* Others input */}
      {showOther && (
        <div className="mt-6 w-full">
          <input
            ref={otherInputRef}
            type="text"
            value={platformOther}
            onChange={(e) => setPlatformOther(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && platformOther.trim()) goNext();
            }}
            placeholder="Enter platform name..."
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-lg text-white placeholder-white/25 outline-none transition-all duration-300 focus:border-white/25 focus:bg-white/[0.05]"
          />
          <button
            onClick={goNext}
            disabled={!platformOther.trim()}
            className="mt-4 inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-medium tracking-[0.15em] uppercase text-black transition-all duration-300 hover:scale-[1.02] disabled:opacity-20"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
