"use client";

import { useEffect, useRef, useState } from "react";
import { getGsap } from "@/animations/gsapClient";
import { TrustBadge } from "@/components/trust/TrustBadge";
import { useTrustLocalAnimations } from "@/animations/useTrustLocalAnimations";

type CityData = {
  city: string;
  creatorsCount: number;
  categories: string[];
  dot: { x: number; y: number };
};

const cityData: CityData[] = [
  { city: "Delhi", creatorsCount: 120, categories: ["UGC", "Fashion", "Video"], dot: { x: 62, y: 28 } },
  { city: "Mumbai", creatorsCount: 180, categories: ["Luxury", "Film", "Influencer"], dot: { x: 50, y: 56 } },
  { city: "Bangalore", creatorsCount: 95, categories: ["Tech", "Reels", "Product"], dot: { x: 55, y: 71 } },
  { city: "Jaipur", creatorsCount: 64, categories: ["Lifestyle", "Photography"], dot: { x: 45, y: 38 } },
];

const trustItems = [
  {
    title: "Verified Creators",
    description: "Identity-checked creator profiles with reliable portfolio proof.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
        <path d="M12 3l7 3v5c0 5-3.4 8.5-7 10-3.6-1.5-7-5-7-10V6l7-3z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8.8 12.3l2.1 2.1 4.3-4.3" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    title: "Secure Messaging",
    description: "Protected conversations and clean collaboration workflows.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
        <rect x="4" y="5" width="16" height="12" rx="3" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 10h8M8 13h5" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    title: "Fast Hiring",
    description: "Move from shortlist to execution without weeks of overhead.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    title: "Top Brands",
    description: "Campaigns from premium, fast-moving brand teams.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
        <path d="M12 4l2.2 4.6 5 .8-3.6 3.6.9 5-4.5-2.4-4.5 2.4.9-5L4.8 9.4l5-.8L12 4z" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
];

export function TrustLocalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedCity, setSelectedCity] = useState(cityData[0]);
  const [displayCount, setDisplayCount] = useState(cityData[0].creatorsCount);
  const previousCountRef = useRef(cityData[0].creatorsCount);

  useTrustLocalAnimations(sectionRef);

  useEffect(() => {
    const gsap = getGsap();
    const value = { count: previousCountRef.current };
    const tween = gsap.to(value, {
      count: selectedCity.creatorsCount,
      duration: 0.6,
      ease: "power2.out",
      onUpdate: () => {
        const rounded = Math.round(value.count);
        previousCountRef.current = rounded;
        setDisplayCount(rounded);
      },
    });

    return () => {
      tween.kill();
    };
  }, [selectedCity]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#f7f7f7] px-6 py-20 text-black md:px-12 md:py-28"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-2">
        <div>
          <p data-trust-header className="text-xs tracking-[0.28em] uppercase text-zinc-600">
            Platform Trust
          </p>
          <h2 data-trust-header className="mt-4 text-4xl font-semibold tracking-tight text-black md:text-5xl">
            Trusted by Creators & Brands
          </h2>
          <p data-trust-header className="mt-4 max-w-xl text-base leading-relaxed text-zinc-600">
            Built for serious campaigns where trust, speed, and quality are non-negotiable.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {trustItems.map((item) => (
              <TrustBadge
                key={item.title}
                title={item.title}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </div>
        </div>

        <div>
          <p data-trust-header className="text-xs tracking-[0.28em] uppercase text-zinc-600">
            Local Hiring USP
          </p>
          <h3 data-trust-header className="mt-4 text-4xl font-semibold tracking-tight text-black md:text-5xl">
            Hire Locally. Execute Faster.
          </h3>
          <p data-trust-header className="mt-4 max-w-xl text-base leading-relaxed text-zinc-600">
            Find creators in your city. Collaborate in real life. Scale campaigns faster.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {cityData.map((item) => (
              <button
                key={item.city}
                type="button"
                data-city-chip
                onClick={() => setSelectedCity(item)}
                className={[
                  "rounded-full border px-4 py-2 text-xs tracking-[0.18em] uppercase transition-all",
                  item.city === selectedCity.city
                    ? "border-black bg-black text-white"
                    : "border-black/15 bg-white text-zinc-700 hover:border-black/35",
                ].join(" ")}
              >
                {item.city}
              </button>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-black/10 bg-white p-5 shadow-[0_10px_20px_rgba(0,0,0,0.04)]">
            <p className="text-sm text-zinc-600">Creators available in {selectedCity.city}</p>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-black">{displayCount}+ creators</p>
            <p className="mt-2 text-sm text-zinc-600">
              Categories: {selectedCity.categories.join(" • ")}
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-black/10 bg-white p-4 shadow-[0_10px_20px_rgba(0,0,0,0.04)]">
            <div className="relative h-44 w-full">
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-label="Miniature India map with city markers">
                <path
                  d="M48 10 L58 12 L66 20 L68 30 L73 38 L72 48 L66 55 L63 66 L57 75 L55 88 L46 85 L42 76 L36 69 L33 58 L29 50 L30 42 L35 35 L39 28 L42 18 Z"
                  fill="rgba(20,20,20,0.1)"
                  stroke="rgba(20,20,20,0.35)"
                  strokeWidth="0.8"
                />
                <path data-city-line d="M62 28 L50 56 L55 71" stroke="rgba(0,0,0,0.35)" strokeWidth="1.2" fill="none" />
                <path data-city-line d="M45 38 L62 28" stroke="rgba(0,0,0,0.3)" strokeWidth="1.05" fill="none" />
                <path data-city-line d="M45 38 L50 56" stroke="rgba(0,0,0,0.3)" strokeWidth="1.05" fill="none" />
                {cityData.map((item) => (
                  <g key={item.city} transform={`translate(${item.dot.x}, ${item.dot.y})`}>
                    <circle data-city-dot r="1.8" fill="#111111" />
                    <text x="3" y="-2.4" fontSize="3.2" fill="#52525b">
                      {item.city}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

