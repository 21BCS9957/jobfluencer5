"use client";

import { useRef, useEffect } from "react";
import { useHireStore, type Niche } from "@/store/hireStore";
import { getGsap } from "@/animations/gsapClient";

const NICHES: { label: Niche; emoji: string }[] = [
  { label: "Fashion", emoji: "👗" },
  { label: "Beauty", emoji: "✨" },
  { label: "Fitness", emoji: "💪" },
  { label: "Tech", emoji: "⚡" },
  { label: "Food", emoji: "🍜" },
  { label: "Lifestyle", emoji: "🌿" },
];

export function NicheStep() {
  const niche = useHireStore((s) => s.niche);
  const setNiche = useHireStore((s) => s.setNiche);
  const goNext = useHireStore((s) => s.goNext);
  const cardsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);

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
          { opacity: 0, y: 24, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power3.out",
            delay: 0.12 + i * 0.06,
          }
        );
      }
    });
  }, []);

  const handleSelect = (n: Niche) => {
    setNiche(n);

    const gsap = getGsap();
    const idx = NICHES.findIndex((item) => item.label === n);
    const card = cardsRef.current[idx];

    if (card) {
      gsap.to(card, {
        scale: 0.95,
        duration: 0.1,
        onComplete: () => {
          gsap.to(card, {
            scale: 1,
            duration: 0.2,
            ease: "back.out(2)",
            onComplete: () => {
              void setTimeout(goNext, 300);
            },
          });
        },
      });
    }
  };

  return (
    <div className="flex flex-col items-center text-center">
      <h2
        ref={headingRef}
        className="mb-3 text-4xl font-semibold tracking-tight text-white opacity-0 md:text-5xl"
      >
        What niche are you targeting?
      </h2>
      <p className="mb-10 text-base text-white/40 md:text-lg">
        This helps us match the right creators
      </p>

      <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
        {NICHES.map((n, i) => {
          const isSelected = niche === n.label;

          return (
            <button
              key={n.label}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              onClick={() => handleSelect(n.label)}
              className={[
                "group relative flex flex-col items-center gap-3 rounded-2xl border py-8 opacity-0 transition-all duration-300",
                isSelected
                  ? "border-white/40 bg-white text-black"
                  : "border-white/8 bg-white/[0.025] text-white hover:border-white/20 hover:bg-white/[0.05]",
              ].join(" ")}
            >
              <span className="text-3xl">{n.emoji}</span>
              <span
                className={[
                  "text-sm font-medium tracking-wide",
                  isSelected ? "text-black" : "text-white/70",
                ].join(" ")}
              >
                {n.label}
              </span>

              {isSelected && (
                <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-black">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <path
                      d="M2 5L4 7L8 3"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
