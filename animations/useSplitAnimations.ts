"use client";

import { useLayoutEffect } from "react";
import { getGsap } from "./gsapClient";

export const useSplitAnimations = (ref: React.RefObject<HTMLElement | null>) => {
  useLayoutEffect(() => {
    const gsap = getGsap();
    const root = ref.current;
    if (!root) return;

    const cards = root.querySelectorAll("[data-split-card]");
    const media = root.querySelectorAll("[data-media-layer]");

    const ctx = gsap.context(() => {
      gsap.set(cards, { opacity: 0, y: 40 });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        stagger: 0.18,
        duration: 0.95,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 72%",
        },
      });

      gsap.to(media, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [ref]);
};
