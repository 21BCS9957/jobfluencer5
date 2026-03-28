"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { useHireStore } from "@/store/hireStore";
import { getGsap } from "@/animations/gsapClient";

const CITIES = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Jaipur",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Kolkata",
  "Ahmedabad",
  "Lucknow",
  "Chandigarh",
  "Goa",
  "Indore",
  "Bhopal",
  "Kochi",
  "Surat",
  "Noida",
  "Gurgaon",
];

export function LocationStep() {
  const city = useHireStore((s) => s.city);
  const setCity = useHireStore((s) => s.setCity);
  const goNext = useHireStore((s) => s.goNext);
  const [search, setSearch] = useState(city);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const chipsContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCities = useMemo(() => {
    if (!search.trim()) return CITIES;
    const lower = search.toLowerCase();
    return CITIES.filter((c) => c.toLowerCase().includes(lower));
  }, [search]);

  useEffect(() => {
    const gsap = getGsap();
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.1 }
      );
    }

    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const gsap = getGsap();
    if (chipsContainerRef.current) {
      const chips = chipsContainerRef.current.children;
      gsap.fromTo(
        chips,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.35,
          ease: "power2.out",
          stagger: 0.03,
        }
      );
    }
  }, [filteredCities]);

  const handleSelectCity = (c: string) => {
    setCity(c);
    setSearch(c);

    const gsap = getGsap();
    if (chipsContainerRef.current) {
      gsap.to(chipsContainerRef.current, {
        opacity: 0.5,
        duration: 0.15,
        onComplete: () => {
          gsap.to(chipsContainerRef.current, {
            opacity: 1,
            duration: 0.15,
          });
          setTimeout(goNext, 350);
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
        Where do you need them?
      </h2>
      <p className="mb-4 text-base text-white/40 md:text-lg">
        Hire locally from your city
      </p>

      {/* USP badge */}
      <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5">
        <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        <span className="text-xs text-white/50">
          Local creators = Better ROI
        </span>
      </div>

      {/* Search input */}
      <div className="group relative mb-6 w-full">
        <div className="absolute -inset-px rounded-xl bg-gradient-to-b from-white/15 to-white/5 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100" />
        <div className="relative flex items-center">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className="absolute left-4 text-white/30"
          >
            <circle
              cx="8"
              cy="8"
              r="5.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M12.5 12.5L16 16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCity(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && city.trim()) goNext();
            }}
            placeholder="Search city..."
            className="relative w-full rounded-xl border border-white/10 bg-white/[0.03] py-4 pl-12 pr-5 text-lg text-white placeholder-white/25 outline-none transition-all duration-300 focus:border-white/25 focus:bg-white/[0.05]"
          />
        </div>
      </div>

      {/* City chips */}
      <div
        ref={chipsContainerRef}
        className="flex flex-wrap justify-center gap-2.5"
      >
        {filteredCities.map((c) => {
          const isSelected = city === c;

          return (
            <button
              key={c}
              onClick={() => handleSelectCity(c)}
              className={[
                "rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-250",
                isSelected
                  ? "border-white/50 bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.06)]"
                  : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/20 hover:bg-white/[0.06] hover:text-white/80",
              ].join(" ")}
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* Manual entry note */}
      {filteredCities.length === 0 && (
        <div className="mt-4 flex flex-col items-center gap-3">
          <p className="text-sm text-white/30">
            Can&apos;t find your city? Type it and press Enter
          </p>
          <button
            onClick={goNext}
            disabled={!city.trim()}
            className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-medium tracking-[0.15em] uppercase text-black transition-all duration-300 hover:scale-[1.02] disabled:opacity-20"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
