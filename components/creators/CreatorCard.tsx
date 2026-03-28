"use client";

import Link from "next/link";
import { useRef } from "react";
import { getGsap } from "@/animations/gsapClient";

export type Creator = {
  id: string;
  name: string;
  category: string;
  image: string;
  followers?: string;
};

type CreatorCardProps = {
  creator: Creator;
};

export function CreatorCard({ creator }: CreatorCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    const gsap = getGsap();
    if (!cardRef.current || !imageRef.current) return;

    gsap.to(cardRef.current, {
      scale: 1.03,
      y: -3,
      boxShadow: "0 22px 60px rgba(0, 0, 0, 0.14)",
      duration: 0.28,
      ease: "power2.out",
    });

    gsap.to(imageRef.current, {
      scale: 1.08,
      duration: 0.45,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    const gsap = getGsap();
    if (!cardRef.current || !imageRef.current) return;

    gsap.to(cardRef.current, {
      scale: 1,
      y: 0,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
      duration: 0.32,
      ease: "power2.out",
    });

    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div
      data-creator-card
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={[
        "group relative overflow-hidden rounded-2xl border border-black/10 bg-white",
        "shadow-[0_10px_30px_rgba(0,0,0,0.08)] will-change-transform",
      ].join(" ")}
    >
      <div className="relative h-64 overflow-hidden bg-zinc-100 md:h-72">
        <div
          ref={imageRef}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${creator.image})` }}
          aria-label={creator.name}
          role="img"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/0 to-white/0" />
      </div>

      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-base font-semibold tracking-tight text-black">
              {creator.name}
            </p>
            <p className="mt-1 text-sm text-zinc-600">{creator.category}</p>
          </div>
          {creator.followers ? (
            <p className="mt-1 text-xs tracking-[0.18em] uppercase text-zinc-500">
              {creator.followers}
            </p>
          ) : null}
        </div>

        <div className="mt-5 flex items-center gap-3">
          <Link
            href={`/profile/${creator.id}`}
            className={[
              "inline-flex h-10 items-center justify-center rounded-full px-4 text-xs tracking-[0.18em] uppercase",
              "border border-black/20 text-black transition-colors",
              "hover:bg-black hover:text-white",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
            ].join(" ")}
          >
            View Profile
          </Link>
          <Link
            href={`/messages/${creator.id}`}
            className={[
              "inline-flex h-10 items-center justify-center rounded-full px-4 text-xs tracking-[0.18em] uppercase",
              "border border-black/20 text-black transition-colors",
              "hover:bg-black hover:text-white",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
            ].join(" ")}
          >
            Message
          </Link>
        </div>
      </div>
    </div>
  );
}

