"use client";

import { useEffect, useRef, useState } from "react";
import { useHireStore } from "@/store/hireStore";
import { getGsap } from "@/animations/gsapClient";

const STAGES = [
  "Understanding your requirements…",
  "Analyzing creator landscape…",
  "Matching niche & platform…",
  "Generating job description…",
  "Polishing final output…",
];

function generateJobContent(state: {
  intent: string;
  creatorType: string | null;
  platform: string | null;
  city: string;
  niche: string | null;
}) {
  const { creatorType, platform, city, niche, intent } = state;

  const title = `${niche || "Creative"} ${creatorType || "Creator"} for ${platform || "Social Media"} Campaign${city ? ` in ${city}` : ""}`;

  const description = `We are looking for a talented ${(creatorType || "creator").toLowerCase()} specializing in ${(niche || "creative content").toLowerCase()} to join our campaign on ${platform || "social media"}.

${city ? `📍 Location: ${city}\n` : ""}
**About the Role:**
${intent ? `Our brand needs: "${intent}"` : "We need a creator who can deliver high-quality content."}

**What You'll Do:**
• Create engaging ${(niche || "creative").toLowerCase()} content tailored for ${platform || "social platforms"}
• Produce authentic ${platform === "Instagram" ? "reels, stories, and carousel posts" : platform === "YouTube" ? "videos, shorts, and community content" : platform === "TikTok" ? "trending videos, challenges, and brand content" : "content pieces"} aligned with our brand voice
• Collaborate with our marketing team to develop campaign creatives
• Deliver content on schedule with professional quality standards

**What We're Looking For:**
• Proven experience as a ${(creatorType || "content creator").toLowerCase()} in the ${(niche || "creative").toLowerCase()} space
• Strong portfolio demonstrating ${platform || "social media"} content creation
• Authentic engagement with a relevant audience
• Professional communication and reliability
${city ? `• Based in or willing to create content from ${city}` : ""}

**Why Work With Us:**
• Competitive compensation for quality content
• Long-term collaboration opportunity for the right creator
• Creative freedom within brand guidelines
• Exposure to a growing brand community

This is a great opportunity for ${(creatorType || "creator").toLowerCase()}s who are passionate about ${(niche || "content creation").toLowerCase()} and want to build lasting brand partnerships.`;

  return { title, description };
}

export function GeneratingStep() {
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const intent = useHireStore((s) => s.intent);
  const creatorType = useHireStore((s) => s.creatorType);
  const platform = useHireStore((s) => s.platform);
  const city = useHireStore((s) => s.city);
  const niche = useHireStore((s) => s.niche);
  const setGenerated = useHireStore((s) => s.setGenerated);
  const setStep = useHireStore((s) => s.setStep);

  useEffect(() => {
    const gsap = getGsap();

    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }
      );
    }

    // Progress animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 1;
      });
    }, 40);

    // Stage cycling
    const stageTimers: NodeJS.Timeout[] = [];
    STAGES.forEach((_, i) => {
      stageTimers.push(
        setTimeout(() => {
          setCurrentStage(i);
          if (textRef.current) {
            gsap.fromTo(
              textRef.current,
              { opacity: 0, y: 8 },
              { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
            );
          }
        }, i * 800)
      );
    });

    // Complete after ~4 seconds
    const completeTimer = setTimeout(() => {
      const { title, description } = generateJobContent({
        intent,
        creatorType,
        platform,
        city,
        niche,
      });
      setGenerated(title, description);
      setStep("result");
    }, 4200);

    return () => {
      clearInterval(interval);
      stageTimers.forEach(clearTimeout);
      clearTimeout(completeTimer);
    };
  }, [intent, creatorType, platform, city, niche, setGenerated, setStep]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center text-center"
    >
      {/* Animated orb */}
      <div className="relative mb-12 h-24 w-24">
        <div className="absolute inset-0 rounded-full bg-white/5 blur-xl" />
        <div
          className="absolute inset-2 rounded-full border border-white/20"
          style={{
            animation: "orbPulse 2s ease-in-out infinite",
          }}
        />
        <div
          className="absolute inset-4 rounded-full border border-white/10"
          style={{
            animation: "orbPulse 2s ease-in-out infinite 0.3s",
          }}
        />
        <div
          className="absolute inset-6 rounded-full bg-white/10"
          style={{
            animation: "orbPulse 2s ease-in-out infinite 0.6s",
          }}
        />

        {/* Spinning arc */}
        <svg
          className="absolute -inset-2 h-[calc(100%+16px)] w-[calc(100%+16px)]"
          style={{ animation: "slowSpin 3s linear infinite" }}
        >
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
            strokeDasharray="60 200"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
        Creating your job…
      </h2>

      <p
        ref={textRef}
        className="mb-8 h-6 text-base text-white/40 transition-all"
      >
        {STAGES[currentStage]}
      </p>

      {/* Progress bar */}
      <div className="w-64 overflow-hidden rounded-full bg-white/8">
        <div
          className="h-1 rounded-full bg-gradient-to-r from-white/40 via-white to-white/40 transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-3 text-xs text-white/20 tabular-nums">{progress}%</p>

      <style jsx>{`
        @keyframes orbPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
        }
        @keyframes slowSpin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
