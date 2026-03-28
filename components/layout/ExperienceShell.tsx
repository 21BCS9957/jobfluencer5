"use client";

import Lenis from "lenis";
import { useEffect, useMemo, useState } from "react";
import { ScrollTrigger } from "@/animations/gsapClient";

type ExperienceShellProps = {
  children: React.ReactNode;
};

export function ExperienceShell({ children }: ExperienceShellProps) {
  const [loading, setLoading] = useState(true);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const isDesktop = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches,
    [],
  );

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 600);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });

    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const moveCursor = (event: MouseEvent) => {
      setCursor({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", moveCursor);
    document.body.classList.add("hide-cursor");

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.classList.remove("hide-cursor");
    };
  }, [isDesktop]);

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed z-[120] hidden h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/55 bg-white/5 backdrop-blur-sm lg:block"
        style={{ left: cursor.x, top: cursor.y }}
      />

      <div
        className={[
          "pointer-events-none fixed inset-0 z-[130] flex items-center justify-center bg-black transition-opacity duration-700",
          loading ? "opacity-100" : "opacity-0",
        ].join(" ")}
      >
        <div className="h-10 w-10 rounded-full border border-white/40 border-t-white animate-spin" />
      </div>

      <div className={loading ? "opacity-0" : "opacity-100 transition-opacity duration-700"}>
        {children}
      </div>
    </>
  );
}
