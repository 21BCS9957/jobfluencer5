"use client";

import Link from "next/link";
import { useRef } from "react";
import { getGsap } from "@/animations/gsapClient";

type CinematicButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
};

export function CinematicButton({
  href,
  children,
  variant = "outline",
}: CinematicButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const handleEnter = () => {
    const gsap = getGsap();
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, {
      y: -2,
      scale: 1.01,
      boxShadow:
        variant === "solid"
          ? "0 12px 40px rgba(255, 255, 255, 0.22)"
          : "0 10px 28px rgba(255, 255, 255, 0.12)",
      duration: 0.28,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    const gsap = getGsap();
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, {
      y: 0,
      scale: 1,
      boxShadow: "0 0 0 rgba(255, 255, 255, 0)",
      duration: 0.32,
      ease: "power2.out",
    });
  };

  return (
    <Link
      ref={buttonRef}
      href={href}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={[
        "group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full px-6 text-sm tracking-[0.18em] uppercase transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        variant === "solid"
          ? "bg-white text-black"
          : "border border-white/30 bg-transparent text-white hover:bg-white/6",
      ].join(" ")}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 border border-white/35 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Link>
  );
}
