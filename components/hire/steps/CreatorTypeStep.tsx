"use client";

import { useRef, useEffect } from "react";
import { useHireStore, type CreatorType } from "@/store/hireStore";
import { getGsap } from "@/animations/gsapClient";

const CREATOR_TYPES: { label: CreatorType; icon: string; desc: string }[] = [
  {
    label: "Social Media Influencer",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
    desc: "Reach audiences through social platforms",
  },
  {
    label: "Photographer",
    icon: "M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9zM9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3H4.5a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39z",
    desc: "Professional visual storytelling",
  },
  {
    label: "Videographer",
    icon: "M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z",
    desc: "Motion content & video production",
  },
  {
    label: "UGC Creator",
    icon: "M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 6.75 6.75 0 009 4.5a.75.75 0 01.75.75c0 2 1.5 3.5 3.5 3.5a.75.75 0 01.612 1.464z",
    desc: "Authentic user-generated content",
  },
];

export function CreatorTypeStep() {
  const creatorType = useHireStore((s) => s.creatorType);
  const setCreatorType = useHireStore((s) => s.setCreatorType);
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
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "power3.out",
            delay: 0.15 + i * 0.08,
          }
        );
      }
    });
  }, []);

  const handleSelect = (type: CreatorType) => {
    setCreatorType(type);

    const gsap = getGsap();
    const selectedIdx = CREATOR_TYPES.findIndex((c) => c.label === type);
    const card = cardsRef.current[selectedIdx];

    if (card) {
      gsap.to(card, {
        scale: 0.97,
        duration: 0.1,
        ease: "power2.in",
        onComplete: () => {
          gsap.to(card, {
            scale: 1,
            duration: 0.15,
            ease: "back.out(2)",
            onComplete: () => {
              setTimeout(goNext, 300);
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
        What type of creators do you need?
      </h2>
      <p className="mb-10 text-base text-white/40 md:text-lg">
        Select the talent that fits your campaign
      </p>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        {CREATOR_TYPES.map((type, i) => {
          const isSelected = creatorType === type.label;

          return (
            <button
              key={type.label}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              onClick={() => handleSelect(type.label)}
              className={[
                "group relative flex flex-col items-start gap-3 rounded-2xl border p-6 text-left opacity-0 transition-all duration-300",
                isSelected
                  ? "border-white/40 bg-white text-black shadow-[0_0_60px_rgba(255,255,255,0.08)]"
                  : "border-white/8 bg-white/[0.025] text-white hover:border-white/20 hover:bg-white/[0.05]",
              ].join(" ")}
            >
              <div
                className={[
                  "flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-300",
                  isSelected ? "bg-black/10" : "bg-white/8",
                ].join(" ")}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  className={isSelected ? "text-black/70" : "text-white/50"}
                >
                  <path
                    d={type.icon}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div>
                <h3
                  className={[
                    "text-base font-medium transition-colors duration-300",
                    isSelected ? "text-black" : "text-white/90",
                  ].join(" ")}
                >
                  {type.label}
                </h3>
                <p
                  className={[
                    "mt-1 text-sm transition-colors duration-300",
                    isSelected ? "text-black/60" : "text-white/35",
                  ].join(" ")}
                >
                  {type.desc}
                </p>
              </div>

              {/* Selection indicator */}
              <div
                className={[
                  "absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-300",
                  isSelected
                    ? "border-black/30 bg-black"
                    : "border-white/15 bg-transparent",
                ].join(" ")}
              >
                {isSelected && (
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
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
