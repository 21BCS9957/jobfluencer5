"use client";

import { useRef, useCallback, useEffect } from "react";
import { useHireStore, type HireStep } from "@/store/hireStore";
import { getGsap } from "@/animations/gsapClient";
import { IntentStep } from "./steps/IntentStep";
import { CreatorTypeStep } from "./steps/CreatorTypeStep";
import { PlatformStep } from "./steps/PlatformStep";
import { LocationStep } from "./steps/LocationStep";
import { NicheStep } from "./steps/NicheStep";
import { GeneratingStep } from "./steps/GeneratingStep";
import { ResultStep } from "./steps/ResultStep";
import { LoginStep } from "./steps/LoginStep";
import { ProgressDots } from "./ProgressDots";

const STEP_ORDER: HireStep[] = [
  "intent",
  "creatorType",
  "platform",
  "location",
  "niche",
  "generating",
  "result",
  "login",
];

const STEP_COMPONENTS: Record<HireStep, React.ComponentType> = {
  intent: IntentStep,
  creatorType: CreatorTypeStep,
  platform: PlatformStep,
  location: LocationStep,
  niche: NicheStep,
  generating: GeneratingStep,
  result: ResultStep,
  login: LoginStep,
};

export function HireFlow() {
  const step = useHireStore((s) => s.step);
  const direction = useHireStore((s) => s.direction);
  const goBack = useHireStore((s) => s.goBack);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const currentIdx = STEP_ORDER.indexOf(step);
  const showBack = currentIdx > 0 && step !== "generating";
  const showDots = step !== "generating" && step !== "result" && step !== "login";

  const animateTransition = useCallback(
    (newContent: React.ReactNode) => {
      const gsap = getGsap();
      const el = contentRef.current;
      if (!el) return;

      const tl = gsap.timeline();
      tl.to(el, {
        opacity: 0,
        y: direction === 1 ? -30 : 30,
        duration: 0.3,
        ease: "power3.in",
      });
    },
    [direction]
  );

  useEffect(() => {
    const gsap = getGsap();
    const el = contentRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: direction === 1 ? 40 : -40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        delay: 0.05,
      }
    );
  }, [step, direction]);

  const StepComponent = STEP_COMPONENTS[step];

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-6 py-12"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-white/[0.015] blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Back button */}
      {showBack && (
        <button
          onClick={goBack}
          className="fixed left-6 top-6 z-50 flex items-center gap-2 text-sm text-white/40 transition-colors duration-200 hover:text-white/80 md:left-10 md:top-10"
          aria-label="Go back"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="transition-transform duration-200 group-hover:-translate-x-1"
          >
            <path
              d="M12.5 15L7.5 10L12.5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="hidden md:inline">Back</span>
        </button>
      )}

      {/* Logo / Brand */}
      <div className="fixed right-6 top-6 z-50 md:right-10 md:top-10">
        <span className="text-xs tracking-[0.3em] uppercase text-white/30">
          Jobfluencer
        </span>
      </div>

      {/* Content area */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto w-full max-w-2xl"
      >
        <StepComponent />
      </div>

      {/* Progress dots */}
      {showDots && (
        <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2">
          <ProgressDots
            total={STEP_ORDER.filter(
              (s) => s !== "generating" && s !== "result" && s !== "login"
            ).length}
            current={Math.min(currentIdx, 4)}
          />
        </div>
      )}
    </div>
  );
}
