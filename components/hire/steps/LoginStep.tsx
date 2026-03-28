"use client";

import { useEffect, useRef, useState } from "react";
import { useHireStore } from "@/store/hireStore";
import { getGsap } from "@/animations/gsapClient";

export function LoginStep() {
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const intent = useHireStore((s) => s.intent);
  const creatorType = useHireStore((s) => s.creatorType);
  const platform = useHireStore((s) => s.platform);
  const city = useHireStore((s) => s.city);
  const niche = useHireStore((s) => s.niche);
  const generatedTitle = useHireStore((s) => s.generatedTitle);

  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const gsap = getGsap();

    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  }, []);

  useEffect(() => {
    const gsap = getGsap();
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Collect all data for API submission
    const payload = {
      auth: { email, password, name: mode === "signup" ? name : undefined },
      job: {
        intent,
        creatorType,
        platform,
        city,
        niche,
        generatedTitle,
      },
    };

    console.log("🚀 Submit payload:", payload);
    // TODO: API call — POST /api/hire
    alert(
      "✅ Job posted successfully! (API integration placeholder)\n\nCheck console for payload."
    );
  };

  return (
    <div ref={containerRef} className="flex flex-col items-center">
      {/* Lock icon */}
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-white/50"
        >
          <rect
            x="5"
            y="11"
            width="14"
            height="10"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M8 11V7a4 4 0 018 0v4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <h2 className="mb-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
        {mode === "login" ? "Welcome back" : "Almost there"}
      </h2>
      <p className="mb-2 text-base text-white/40">
        {mode === "login"
          ? "Sign in to post your job"
          : "Create an account to post your job"}
      </p>

      {/* Preserved data badge */}
      <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.02] px-4 py-1.5">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M2 7L5.5 10.5L12 3.5"
            stroke="rgba(134, 239, 172, 0.7)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-xs text-white/30">
          Your job details are saved — &ldquo;{generatedTitle.slice(0, 40)}
          {generatedTitle.length > 40 ? "…" : ""}&rdquo;
        </span>
      </div>

      {/* Form */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4"
      >
        {mode === "signup" && (
          <div className="group relative">
            <div className="absolute -inset-px rounded-xl bg-gradient-to-b from-white/15 to-white/5 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="relative w-full rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3.5 text-base text-white placeholder-white/25 outline-none transition-all duration-300 focus:border-white/25 focus:bg-white/[0.05]"
            />
          </div>
        )}

        <div className="group relative">
          <div className="absolute -inset-px rounded-xl bg-gradient-to-b from-white/15 to-white/5 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
            className="relative w-full rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3.5 text-base text-white placeholder-white/25 outline-none transition-all duration-300 focus:border-white/25 focus:bg-white/[0.05]"
          />
        </div>

        <div className="group relative">
          <div className="absolute -inset-px rounded-xl bg-gradient-to-b from-white/15 to-white/5 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="relative w-full rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3.5 text-base text-white placeholder-white/25 outline-none transition-all duration-300 focus:border-white/25 focus:bg-white/[0.05]"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-white py-3.5 text-sm font-medium tracking-[0.15em] uppercase text-black transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_8px_50px_rgba(255,255,255,0.12)]"
        >
          {mode === "login" ? "Sign In & Post Job" : "Create Account & Post Job"}
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex w-full max-w-sm items-center gap-4">
        <div className="h-px flex-1 bg-white/8" />
        <span className="text-xs text-white/25">or</span>
        <div className="h-px flex-1 bg-white/8" />
      </div>

      {/* Google OAuth placeholder */}
      <button className="flex w-full max-w-sm items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] py-3.5 text-sm text-white/60 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:text-white/80">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
            fill="#4285F4"
          />
          <path
            d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.26c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
            fill="#34A853"
          />
          <path
            d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
            fill="#FBBC05"
          />
          <path
            d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </button>

      {/* Toggle mode */}
      <p className="mt-6 text-sm text-white/30">
        {mode === "login" ? (
          <>
            Don&apos;t have an account?{" "}
            <button
              onClick={() => setMode("signup")}
              className="text-white/60 underline underline-offset-4 transition-colors hover:text-white"
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              onClick={() => setMode("login")}
              className="text-white/60 underline underline-offset-4 transition-colors hover:text-white"
            >
              Sign in
            </button>
          </>
        )}
      </p>
    </div>
  );
}
