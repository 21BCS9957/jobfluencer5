"use client";

import { useLayoutEffect } from "react";
import { getGsap } from "@/animations/gsapClient";

type LiveOppRefs = {
  section: React.RefObject<HTMLElement | null>;
  track: React.RefObject<HTMLDivElement | null>;
};

export const useLiveOpportunitiesAnimations = ({
  section,
  track,
}: LiveOppRefs) => {
  useLayoutEffect(() => {
    const gsap = getGsap();
    const root = section.current;
    const row = track.current;
    if (!root || !row) return;

    const ctx = gsap.context(() => {
      const cards = root.querySelectorAll("[data-job-card]");
      const header = root.querySelectorAll("[data-live-header]");

      gsap.set(header, { opacity: 0, y: 18, clipPath: "inset(0 0 100% 0)" });
      gsap.set(cards, { opacity: 0, y: 14 });

      gsap.to(header, {
        opacity: 1,
        y: 0,
        clipPath: "inset(0 0 0% 0)",
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
        },
      });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: root,
          start: "top 72%",
        },
      });

      const update = () => {
        const scrollWidth = row.scrollWidth;
        const clientWidth = row.clientWidth;
        return Math.max(0, scrollWidth - clientWidth);
      };

      const getDistance = () => update();

      const tween = gsap.to(row, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${Math.max(700, getDistance())}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.to(root.querySelectorAll("[data-job-parallax]"), {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, root);

    return () => ctx.revert();
  }, [section, track]);
};

