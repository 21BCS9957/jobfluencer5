"use client";

import { useRef } from "react";
import { JobCard, type Job } from "@/components/jobs/JobCard";
import { useLiveOpportunitiesAnimations } from "@/animations/useLiveOpportunitiesAnimations";

const jobs: Job[] = [
  {
    id: "celestine-watch-ugc",
    brand: "Celestine Watches",
    title: "Luxury Watch Campaign Shoot",
    budget: "₹50,000 – ₹1,20,000",
    category: "Influencer / Video Shoot / UGC",
    postedAt: "Posted 2h ago",
  },
  {
    id: "noir-parfum-reels",
    brand: "NOIR Parfum",
    title: "Editorial Reel Series (Dark Studio)",
    budget: "₹80,000 – ₹1,60,000",
    category: "Influencer / Reels / Creative Direction",
    postedAt: "Posted 5h ago",
  },
  {
    id: "atlas-luggage-photo",
    brand: "ATLAS Luggage",
    title: "Travel-Lux Product Photography",
    budget: "₹60,000 – ₹1,40,000",
    category: "Photographer / Studio / Retouching",
    postedAt: "Posted 9h ago",
  },
  {
    id: "vitra-skin-ugc",
    brand: "VITRA Skin",
    title: "Skincare UGC Pack (High Contrast)",
    budget: "₹40,000 – ₹95,000",
    category: "UGC / Beauty Creator",
    postedAt: "Posted 1d ago",
  },
  {
    id: "monochrome-hotel-film",
    brand: "Monochrome Hotels",
    title: "Short-Form Film: Suite Launch",
    budget: "₹1,10,000 – ₹2,40,000",
    category: "Cinematographer / Editor / Sound",
    postedAt: "Posted 1d ago",
  },
  {
    id: "silkline-fashion-cast",
    brand: "Silkline Atelier",
    title: "Fashion Lookbook Casting",
    budget: "₹70,000 – ₹1,80,000",
    category: "Actor / Model / Fashion Influencer",
    postedAt: "Posted 2d ago",
  },
  {
    id: "obsidian-auto-launch",
    brand: "Obsidian Auto",
    title: "Performance Launch Teaser",
    budget: "₹1,40,000 – ₹3,20,000",
    category: "Director / DP / Motion Editor",
    postedAt: "Posted 3d ago",
  },
  {
    id: "verre-frames-stills",
    brand: "Verre Frames",
    title: "Premium Eyewear Stills + Reels",
    budget: "₹55,000 – ₹1,30,000",
    category: "Photographer / UGC / Influencer",
    postedAt: "Posted 4d ago",
  },
];

export function LiveOpportunitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLiveOpportunitiesAnimations({
    section: sectionRef,
    track: trackRef,
  });

  return (
    <section ref={sectionRef} className="relative bg-black px-6 py-20 md:px-12">
      <div data-job-parallax className="noise" />
      <div className="vignette" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="max-w-2xl">
          <p
            data-live-header
            className="text-xs tracking-[0.28em] uppercase text-white/60"
          >
            Live Opportunities
          </p>
          <h2
            data-live-header
            className="mt-4 text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl"
          >
            High-Paying Campaigns Happening Now
          </h2>
          <p
            data-live-header
            className="mt-4 text-base leading-relaxed text-white/70 md:text-lg"
          >
            Join campaigns from brands actively hiring creators
          </p>
        </div>

      </div>

      <div className="relative z-10 mt-10">
        <div className="mx-auto w-full max-w-6xl overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-6 pr-10 will-change-transform"
          >
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

