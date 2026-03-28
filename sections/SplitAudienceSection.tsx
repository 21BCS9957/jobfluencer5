"use client";

import { useRef } from "react";
import { useSplitAnimations } from "@/animations/useSplitAnimations";
import { CinematicButton } from "@/components/ui/CinematicButton";
import { MediaPanel } from "@/components/ui/MediaPanel";
import { RevealText } from "@/components/ui/RevealText";

export function SplitAudienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useSplitAnimations(sectionRef);

  return (
    <section ref={sectionRef} className="relative px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-2">
        <article
          data-split-card
          className="glass-panel rounded-3xl p-6 md:p-8 lg:p-10"
        >
          <p className="text-xs tracking-[0.24em] uppercase text-white/55">
            Freelancers
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            I&apos;m a Creator
          </h2>
          <RevealText
            text="Step into premium campaigns with brands that value craft, discipline, and visual storytelling."
            className="mt-4 max-w-md text-base leading-relaxed text-white/72"
          />
          <div className="mt-8">
            <CinematicButton href="/signup?role=freelancer" variant="solid">
              Get Hired
            </CinematicButton>
          </div>
          <div className="mt-8">
            <MediaPanel
              imageUrl="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1600&q=80"
              alt="Creator operating a cinematic camera rig in a dark studio."
              eyebrow="Creative Set"
            />
          </div>
        </article>

        <article
          data-split-card
          className="glass-panel rounded-3xl p-6 md:p-8 lg:p-10"
        >
          <p className="text-xs tracking-[0.24em] uppercase text-white/55">
            Brands & Agencies
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            I&apos;m a Brand
          </h2>
          <RevealText
            text="Find trusted creators, photographers, and editors to launch campaign-ready productions faster."
            className="mt-4 max-w-md text-base leading-relaxed text-white/72"
          />
          <div className="mt-8">
            <CinematicButton href="/signup?role=brand" variant="outline">
              Post a Job
            </CinematicButton>
          </div>
          <div className="mt-8">
            <MediaPanel
              imageUrl="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80"
              alt="Brand team reviewing campaign visuals in a moody studio office."
              eyebrow="Campaign Room"
            />
          </div>
        </article>
      </div>
    </section>
  );
}
