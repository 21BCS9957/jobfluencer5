"use client";

import { useLayoutEffect, useRef } from "react";
import { getGsap } from "@/animations/gsapClient";

type RevealTextProps = {
  text: string;
  className?: string;
};

export function RevealText({ text, className }: RevealTextProps) {
  const textRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const gsap = getGsap();
    if (!textRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 0.2 },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );
    }, textRef);

    return () => ctx.revert();
  }, []);

  return (
    <p ref={textRef} className={className}>
      {text}
    </p>
  );
}
