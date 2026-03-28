"use client";

import { useLayoutEffect } from "react";
import { getGsap } from "@/animations/gsapClient";

export const useTopCreatorsAnimations = (
  ref: React.RefObject<HTMLElement | null>,
) => {
  useLayoutEffect(() => {
    const gsap = getGsap();
    const root = ref.current;
    if (!root) return;

    const header = root.querySelectorAll("[data-creators-header]");
    const cards = root.querySelectorAll("[data-creator-card]");

    const ctx = gsap.context(() => {
      gsap.set(header, { opacity: 0, y: 18, clipPath: "inset(0 0 100% 0)" });
      gsap.set(cards, { opacity: 0, y: 26 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root,
            start: "top 78%",
          },
          defaults: { ease: "power3.out" },
        })
        .to(header, {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.85,
          stagger: 0.08,
        })
        .to(
          cards,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
          },
          "-=0.35",
        );
    }, root);

    return () => ctx.revert();
  }, [ref]);
};

