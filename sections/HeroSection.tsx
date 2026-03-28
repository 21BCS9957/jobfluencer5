"use client";

import { useRef } from "react";
import { useHeroAnimations } from "@/animations/useHeroAnimations";
import { CinematicButton } from "@/components/ui/CinematicButton";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);

  useHeroAnimations({
    section: sectionRef,
    headline: headlineRef,
    copy: copyRef,
    ctas: ctasRef,
  });

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24 md:px-12"
    >
      <div data-parallax className="noise" />
      <div className="vignette" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-start">
        <p className="mb-6 text-xs tracking-[0.28em] uppercase text-white/60">
          Creator Marketplace
        </p>

        <h1
          ref={headlineRef}
          className="text-balance max-w-5xl text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Where Brands Meet Talent
        </h1>

        <p
          ref={copyRef}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-white/72 md:text-xl"
        >
          Hire creators. Get hired by the best brands.
        </p>

        <div
          ref={ctasRef}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <CinematicButton href="/signup?role=freelancer" variant="solid">
            Get Hired
          </CinematicButton>
          <CinematicButton href="/hire" variant="outline">
            Post a Job
          </CinematicButton>
        </div>
      </div>
    </section>
  );
}
