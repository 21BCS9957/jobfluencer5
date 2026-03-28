"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { getGsap } from "@/animations/gsapClient";

const NAV_LINKS = [
  { label: "Explore Jobs", href: "/jobs" },
  { label: "For Creators", href: "/creators" },
  { label: "For Brands", href: "/hire" },
  { label: "Pricing", href: "/pricing" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  /* ── scroll listener ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── entry animation ── */
  useEffect(() => {
    const gsap = getGsap();
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.6 },
    );
  }, []);

  /* ── mobile menu animation ── */
  useEffect(() => {
    const gsap = getGsap();
    if (!mobileMenuRef.current) return;
    if (mobileOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
      );
    }
  }, [mobileOpen]);

  const isDark = resolvedTheme === "dark";

  return (
    <>
      <nav
        ref={navRef}
        id="navbar-main"
        className={[
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
          scrolled
            ? isDark
              ? "bg-black/70 border-b border-white/[0.06]"
              : "bg-white/70 border-b border-black/[0.06]"
            : isDark
              ? "bg-black/30 border-b border-white/[0.03]"
              : "bg-white/30 border-b border-black/[0.03]",
        ].join(" ")}
        style={{ backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "blur(12px) saturate(140%)" }}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">

          {/* ── LEFT: Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 group" id="navbar-logo">
            <div className={[
              "flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-105",
              isDark ? "bg-white" : "bg-black",
            ].join(" ")}>
              <span className={[
                "text-sm font-bold leading-none",
                isDark ? "text-black" : "text-white",
              ].join(" ")}>J</span>
            </div>
            <span className={[
              "text-lg font-semibold tracking-tight",
              isDark ? "text-white" : "text-black",
            ].join(" ")}>
              Jobfluencer
            </span>
          </Link>

          {/* ── CENTER: Nav Links (desktop) ── */}
          <div className="hidden items-center gap-1 md:flex" id="navbar-links">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "group relative px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-200",
                  isDark
                    ? "text-white/60 hover:text-white"
                    : "text-black/55 hover:text-black",
                ].join(" ")}
              >
                {link.label}
                {/* animated underline */}
                <span className={[
                  "absolute bottom-0.5 left-4 right-4 h-px origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100",
                  isDark ? "bg-white/50" : "bg-black/40",
                ].join(" ")} />
              </Link>
            ))}
          </div>

          {/* ── RIGHT: Actions ── */}
          <div className="hidden items-center gap-3 md:flex" id="navbar-actions">
            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className={[
                  "flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300",
                  isDark
                    ? "text-white/50 hover:text-white hover:bg-white/[0.06]"
                    : "text-black/45 hover:text-black hover:bg-black/[0.04]",
                ].join(" ")}
                aria-label="Toggle theme"
                id="theme-toggle"
              >
                {isDark ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
            )}

            {/* Login */}
            <Link
              href="/login"
              className={[
                "px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-200",
                isDark
                  ? "text-white/60 hover:text-white"
                  : "text-black/55 hover:text-black",
              ].join(" ")}
              id="navbar-login"
            >
              Login
            </Link>

            {/* Get Started CTA */}
            <Link
              href="/signup"
              className={[
                "inline-flex h-9 items-center justify-center rounded-full px-5 text-[13px] font-medium tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
                isDark
                  ? "bg-white text-black hover:bg-white/90 hover:shadow-[0_4px_20px_rgba(255,255,255,0.15)]"
                  : "bg-black text-white hover:bg-black/85 hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)]",
              ].join(" ")}
              id="navbar-get-started"
            >
              Get Started
            </Link>
          </div>

          {/* ── MOBILE: Hamburger ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={[
              "flex h-9 w-9 items-center justify-center rounded-lg md:hidden transition-colors duration-200",
              isDark
                ? "text-white/70 hover:bg-white/[0.06]"
                : "text-black/60 hover:bg-black/[0.04]",
            ].join(" ")}
            aria-label="Toggle menu"
            id="navbar-mobile-toggle"
          >
            <div className="flex flex-col gap-[5px]">
              <span className={[
                "block h-[1.5px] w-5 rounded-full transition-all duration-300",
                isDark ? "bg-white" : "bg-black",
                mobileOpen ? "translate-y-[3.25px] rotate-45" : "",
              ].join(" ")} />
              <span className={[
                "block h-[1.5px] w-5 rounded-full transition-all duration-300",
                isDark ? "bg-white" : "bg-black",
                mobileOpen ? "-translate-y-[3.25px] -rotate-45" : "",
              ].join(" ")} />
            </div>
          </button>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className={[
            "fixed inset-x-0 top-16 z-[99] border-b md:hidden",
            isDark
              ? "bg-black/90 border-white/[0.06]"
              : "bg-white/90 border-black/[0.06]",
          ].join(" ")}
          style={{ backdropFilter: "blur(24px) saturate(180%)" }}
          id="navbar-mobile-menu"
        >
          <div className="mx-auto max-w-7xl px-5 py-6">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={[
                    "rounded-lg px-4 py-3 text-[15px] font-medium transition-colors duration-200",
                    isDark
                      ? "text-white/70 hover:text-white hover:bg-white/[0.04]"
                      : "text-black/60 hover:text-black hover:bg-black/[0.03]",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className={[
              "my-4 h-px",
              isDark ? "bg-white/[0.06]" : "bg-black/[0.06]",
            ].join(" ")} />

            <div className="flex flex-col gap-3">
              {mounted && (
                <button
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  className={[
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-[15px] font-medium transition-colors duration-200",
                    isDark
                      ? "text-white/70 hover:text-white hover:bg-white/[0.04]"
                      : "text-black/60 hover:text-black hover:bg-black/[0.03]",
                  ].join(" ")}
                >
                  {isDark ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="5" />
                      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                  )}
                  {isDark ? "Light Mode" : "Dark Mode"}
                </button>
              )}
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className={[
                  "rounded-lg px-4 py-3 text-[15px] font-medium transition-colors duration-200",
                  isDark
                    ? "text-white/70 hover:text-white hover:bg-white/[0.04]"
                    : "text-black/60 hover:text-black hover:bg-black/[0.03]",
                ].join(" ")}
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileOpen(false)}
                className={[
                  "flex h-11 items-center justify-center rounded-full text-[15px] font-medium tracking-wide transition-all duration-300",
                  isDark
                    ? "bg-white text-black"
                    : "bg-black text-white",
                ].join(" ")}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
