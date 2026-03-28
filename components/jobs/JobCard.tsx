"use client";

import Link from "next/link";
import { useRef } from "react";
import { getGsap } from "@/animations/gsapClient";

export type Job = {
  id: string;
  brand: string;
  title: string;
  budget: string;
  category: string;
  postedAt: string;
};

type JobCardProps = {
  job: Job;
};

export function JobCard({ job }: JobCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const edgeRef = useRef<HTMLDivElement>(null);

  const enter = () => {
    const gsap = getGsap();
    if (!cardRef.current) return;

    gsap.to(cardRef.current, {
      y: -4,
      scale: 1.02,
      duration: 0.28,
      ease: "power2.out",
      boxShadow: "0 26px 70px rgba(0,0,0,0.55)",
    });
    if (edgeRef.current) {
      gsap.to(edgeRef.current, { opacity: 1, duration: 0.25, ease: "power2.out" });
    }
  };

  const leave = () => {
    const gsap = getGsap();
    if (!cardRef.current) return;

    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      duration: 0.32,
      ease: "power2.out",
      boxShadow: "0 18px 50px rgba(0,0,0,0.38)",
    });
    if (edgeRef.current) {
      gsap.to(edgeRef.current, { opacity: 0, duration: 0.25, ease: "power2.out" });
    }
  };

  return (
    <article
      data-job-card
      ref={cardRef}
      onMouseEnter={enter}
      onMouseLeave={leave}
      className={[
        "relative w-[320px] shrink-0 overflow-hidden rounded-2xl",
        "border border-white/12 bg-white/5 backdrop-blur-xl",
        "shadow-[0_18px_50px_rgba(0,0,0,0.38)]",
        "will-change-transform",
      ].join(" ")}
    >
      <div
        ref={edgeRef}
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0) 55%)",
        }}
      />

      <div className="p-6">
        <p className="text-[0.7rem] tracking-[0.26em] uppercase text-white/60">
          {job.brand}
        </p>
        <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">
          {job.title}
        </h3>

        <div className="mt-5 grid gap-2 text-sm">
          <p className="text-white/80">
            <span className="text-white/55">Budget</span>{" "}
            <span className="font-medium">{job.budget}</span>
          </p>
          <p className="text-white/75">
            <span className="text-white/55">Type</span> {job.category}
          </p>
          <p className="text-white/65">
            <span className="text-white/55">Time</span> {job.postedAt}
          </p>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <Link
            href={`/job/${job.id}`}
            className={[
              "inline-flex h-10 items-center justify-center rounded-full px-4 text-[0.7rem] tracking-[0.18em] uppercase",
              "border border-white/20 text-white/90 transition-colors",
              "hover:bg-white hover:text-black",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
            ].join(" ")}
          >
            View Details
          </Link>
          <Link
            href={`/apply/${job.id}`}
            className={[
              "inline-flex h-10 items-center justify-center rounded-full px-4 text-[0.7rem] tracking-[0.18em] uppercase",
              "border border-white/20 text-white/90 transition-colors",
              "hover:bg-white hover:text-black",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
            ].join(" ")}
          >
            Apply Now
          </Link>
        </div>
      </div>
    </article>
  );
}

