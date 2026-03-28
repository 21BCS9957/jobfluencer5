"use client";

import { useLayoutEffect } from "react";
import { getGsap } from "./gsapClient";

type HeroAnimationRefs = {
  section: React.RefObject<HTMLElement | null>;
  headline: React.RefObject<HTMLHeadingElement | null>;
  copy: React.RefObject<HTMLParagraphElement | null>;
  ctas: React.RefObject<HTMLDivElement | null>;
};

export const useHeroAnimations = ({
  section,
  headline,
  copy,
  ctas,
}: HeroAnimationRefs) => {
  useLayoutEffect(() => {
    const gsap = getGsap();
    const root = section.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.set([headline.current, copy.current, ctas.current], {
        opacity: 0,
        y: 32,
      });

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(headline.current, { opacity: 1, y: 0, duration: 1 })
        .to(copy.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
        .to(ctas.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.45");

      gsap.to(root.querySelectorAll("[data-parallax]"), {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: 0.7,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [section, headline, copy, ctas]);
};
