"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { getGsap } from "@/animations/gsapClient";

const PRODUCT_LINKS = [
  { label: "Explore Jobs", href: "/jobs" },
  { label: "Post a Job", href: "/hire" },
  { label: "Pricing", href: "/pricing" },
];

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://instagram.com/jobfluencer",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/jobfluencer",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://twitter.com/jobfluencer",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
      </svg>
    ),
  },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    const gsap = getGsap();
    if (!footerRef.current) return;

    const columns = footerRef.current.querySelectorAll("[data-footer-col]");
    const bottomBar = footerRef.current.querySelector("[data-footer-bottom]");

    gsap.fromTo(
      columns,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          once: true,
        },
      },
    );

    if (bottomBar) {
      gsap.fromTo(
        bottomBar,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          delay: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );
    }
  }, []);

  return (
    <footer
      ref={footerRef}
      id="footer-main"
      className={[
        "relative overflow-hidden",
        isDark ? "bg-black" : "bg-[#fafafa]",
      ].join(" ")}
    >
      {/* Top separator */}
      <div className={[
        "h-px",
        isDark ? "bg-white/[0.06]" : "bg-black/[0.06]",
      ].join(" ")} />

      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">

          {/* ── Column 1: Brand ── */}
          <div className="col-span-2 md:col-span-1" data-footer-col>
            <Link href="/" className="flex items-center gap-2.5 group mb-5">
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
            <p className={[
              "text-sm leading-relaxed max-w-[240px]",
              isDark ? "text-white/40" : "text-black/40",
            ].join(" ")}>
              Hire creators locally.<br />
              Scale faster.
            </p>
          </div>

          {/* ── Column 2: Product ── */}
          <div data-footer-col>
            <h4 className={[
              "mb-4 text-xs font-semibold tracking-[0.2em] uppercase",
              isDark ? "text-white/30" : "text-black/30",
            ].join(" ")}>
              Product
            </h4>
            <ul className="flex flex-col gap-3">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={[
                      "text-sm transition-colors duration-200",
                      isDark
                        ? "text-white/50 hover:text-white"
                        : "text-black/45 hover:text-black",
                    ].join(" ")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3: Company ── */}
          <div data-footer-col>
            <h4 className={[
              "mb-4 text-xs font-semibold tracking-[0.2em] uppercase",
              isDark ? "text-white/30" : "text-black/30",
            ].join(" ")}>
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={[
                      "text-sm transition-colors duration-200",
                      isDark
                        ? "text-white/50 hover:text-white"
                        : "text-black/45 hover:text-black",
                    ].join(" ")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 4: Legal ── */}
          <div data-footer-col>
            <h4 className={[
              "mb-4 text-xs font-semibold tracking-[0.2em] uppercase",
              isDark ? "text-white/30" : "text-black/30",
            ].join(" ")}>
              Legal
            </h4>
            <ul className="flex flex-col gap-3">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={[
                      "text-sm transition-colors duration-200",
                      isDark
                        ? "text-white/50 hover:text-white"
                        : "text-black/45 hover:text-black",
                    ].join(" ")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          data-footer-bottom
          className={[
            "mt-16 flex flex-col items-center justify-between gap-6 border-t pt-8 md:flex-row md:gap-4",
            isDark ? "border-white/[0.06]" : "border-black/[0.06]",
          ].join(" ")}
        >
          {/* Social links */}
          <div className="flex items-center gap-4" id="footer-socials">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  "flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300",
                  isDark
                    ? "text-white/30 hover:text-white hover:bg-white/[0.06]"
                    : "text-black/30 hover:text-black hover:bg-black/[0.04]",
                ].join(" ")}
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className={[
            "text-xs",
            isDark ? "text-white/25" : "text-black/25",
          ].join(" ")} id="footer-copyright">
            © {new Date().getFullYear()} Jobfluencer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
