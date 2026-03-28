"use client";

import { useLayoutEffect } from "react";
import { getGsap } from "@/animations/gsapClient";

export const useTrustLocalAnimations = (
  ref: React.RefObject<HTMLElement | null>,
) => {
  useLayoutEffect(() => {
    const gsap = getGsap();
    const root = ref.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const headers = root.querySelectorAll("[data-trust-header]");
      const badges = root.querySelectorAll("[data-trust-badge]");
      const chips = root.querySelectorAll("[data-city-chip]");
      const dots = root.querySelectorAll("[data-city-dot]");
      const lines = root.querySelectorAll("[data-city-line]");

      gsap.set(headers, { opacity: 0, y: 18, clipPath: "inset(0 0 100% 0)" });
      gsap.set(badges, { opacity: 0, y: 20 });
      gsap.set(chips, { opacity: 0, y: 16 });

      gsap.to(headers, {
        opacity: 1,
        y: 0,
        clipPath: "inset(0 0 0% 0)",
        duration: 0.82,
        ease: "power3.out",
        stagger: 0.07,
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
        },
      });

      gsap.to(badges, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 72%",
        },
      });

      gsap.to(chips, {
        opacity: 1,
        y: 0,
        stagger: 0.06,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
        },
      });

      lines.forEach((line) => {
        const path = line as SVGPathElement;
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root,
            start: "top 70%",
          },
        });
      });

      gsap.fromTo(
        dots,
        { scale: 0.65, opacity: 0.35 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: root,
            start: "top 70%",
          },
        },
      );

      gsap.to(dots, {
        scale: 1.08,
        opacity: 0.65,
        repeat: -1,
        yoyo: true,
        duration: 1.4,
        ease: "sine.inOut",
        stagger: 0.1,
      });
    }, root);

    return () => ctx.revert();
  }, [ref]);
};

