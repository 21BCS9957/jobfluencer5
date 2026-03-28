"use client";

import { useRef, useEffect } from "react";
import { IndiaMapSVG } from "@/components/map/IndiaMapSVG";
import { MapPanel } from "@/components/map/MapPanel";
import { getGsap } from "@/animations/gsapClient";

export function ExploreMapSection() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsap = getGsap();
    if (!headerRef.current) return;

    gsap.fromTo(
      headerRef.current.children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          once: true,
        },
      },
    );
  }, []);

  return (
    <section
      id="explore-map-section"
      className="relative py-24 md:py-32 overflow-hidden bg-black"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.02) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <div ref={headerRef} className="mb-14 max-w-2xl">
          <p className="mb-4 text-xs tracking-[0.28em] uppercase font-medium text-white/40">
            Explore by Location
          </p>
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl text-white">
            Discover Opportunities Across India
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/50">
            Find campaigns and creators near you. Click on any state to explore active listings and top influencers.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 items-start">
          <div className="lg:col-span-3 rounded-2xl border border-white/[0.06] bg-white/[0.01] p-6 md:p-8 relative min-h-[400px] flex items-center justify-center shadow-2xl overflow-hidden">
            <IndiaMapSVG />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none sm:hidden" />
          </div>

          <div className="lg:col-span-2 h-[600px] lg:h-auto lg:sticky lg:top-24">
            <MapPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
