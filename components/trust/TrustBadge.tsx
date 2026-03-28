"use client";

import { useRef } from "react";
import { getGsap } from "@/animations/gsapClient";

type TrustBadgeProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

export function TrustBadge({ title, description, icon }: TrustBadgeProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onEnter = () => {
    const gsap = getGsap();
    if (!ref.current) return;
    gsap.to(ref.current, {
      y: -3,
      scale: 1.015,
      boxShadow: "0 18px 34px rgba(0,0,0,0.08)",
      duration: 0.26,
      ease: "power2.out",
    });
  };

  const onLeave = () => {
    const gsap = getGsap();
    if (!ref.current) return;
    gsap.to(ref.current, {
      y: 0,
      scale: 1,
      boxShadow: "0 10px 20px rgba(0,0,0,0.04)",
      duration: 0.28,
      ease: "power2.out",
    });
  };

  return (
    <article
      ref={ref}
      data-trust-badge
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="rounded-2xl border border-black/10 bg-white p-4 shadow-[0_10px_20px_rgba(0,0,0,0.04)]"
    >
      <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-black/12 bg-black/2 text-black">
        {icon}
      </div>
      <h3 className="text-sm font-semibold tracking-tight text-black">{title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-zinc-600">{description}</p>
    </article>
  );
}

