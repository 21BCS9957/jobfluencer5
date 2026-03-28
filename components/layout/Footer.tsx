"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getGsap } from "@/animations/gsapClient";
import { ArrowUpRight } from "lucide-react";

const FOOTER_LINKS = {
  Product: [
    { label: "Explore Jobs", href: "/jobs" },
    { label: "Pricing", href: "/pricing" },
    { label: "For Creators", href: "/creators" },
    { label: "For Brands", href: "/hire" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};

const ROTATING_TEXTS = ["India", "creators", "brands"];

export function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [textIndex, setTextIndex] = useState(0);

  // Rotating text logic
  useEffect(() => {
    const interval = setInterval(() => {
      const gsap = getGsap();
      if (textRef.current) {
        gsap.to(textRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            setTextIndex((prev) => (prev + 1) % ROTATING_TEXTS.length);
            gsap.fromTo(
              textRef.current,
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.3 }
            );
          },
        });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Entrance animation
  useEffect(() => {
    const gsap = getGsap();
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll(".reveal-up"),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );
  }, []);

  // Cursor glow effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!bgRef.current) return;
    const rect = bgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    bgRef.current.style.setProperty("--x", `${x}px`);
    bgRef.current.style.setProperty("--y", `${y}px`);
  };

  return (
    <footer
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-black pt-32 pb-10 text-white border-t border-white/[0.05]"
    >
      {/* Subtle Grain Texture & Animated Gradient Glow */}
      <div
        ref={bgRef}
        className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle 600px at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.06), transparent 80%)",
        }}
      />
      
      {/* Background Dots Grid */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at center, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8 z-10">
        
        {/* ── SECTION 1: FINAL CTA ── */}
        <div className="reveal-up flex flex-col items-center justify-center text-center mb-32">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            Start building with <br className="hidden md:block" />
            creators near you.
          </h2>
          <p className="text-lg md:text-xl text-white/50 mb-10 max-w-md">
            Hire locally. Scale faster. Build real campaigns that actually convert.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/signup?role=creator"
              className="group relative flex h-14 w-full sm:w-auto items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 font-medium text-black transition-transform hover:scale-105"
            >
              <span>Get Hired</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/signup?role=brand"
              className="group relative flex h-14 w-full sm:w-auto items-center justify-center gap-2 overflow-hidden rounded-full border border-white/20 bg-white/5 px-8 font-medium text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/30 hover:scale-105"
            >
              <span>Post a Job</span>
            </Link>
          </div>
        </div>

        {/* ── Thin Divider ── */}
        <div className="reveal-up h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />

        {/* ── SECTION 2 & 3: BRAND, LINKS, SOCIALS ── */}
        <div className="reveal-up grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-3 group mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white transition-transform group-hover:scale-105">
                <span className="text-xl font-bold text-black leading-none">J</span>
              </div>
              <span className="text-2xl font-bold tracking-tight">Jobfluencer</span>
            </Link>
            <p className="text-white/50 mb-8 max-w-sm text-sm leading-relaxed">
              India’s premium local creator marketplace. Connecting forward-thinking brands with world-class freelance talent.
            </p>
            
            {/* Socials - Gen-Z Touch */}
            <div className="flex items-center gap-4">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white hover:-translate-y-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white hover:-translate-y-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white hover:-translate-y-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title} className="flex flex-col gap-4">
                <h4 className="text-sm font-semibold text-white/90">{title}</h4>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/50 transition-colors hover:text-white relative group inline-flex"
                      >
                        {link.label}
                        <span className="absolute -bottom-1 left-0 h-px w-0 bg-white/40 transition-all duration-300 group-hover:w-full" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── SECTION 4: BOTTOM & MICRO INTERACTION ── */}
        <div className="reveal-up flex flex-col sm:flex-row items-center justify-between border-t border-white/[0.05] pt-8">
          <p className="text-sm text-white/40 mb-4 sm:mb-0">
            © {new Date().getFullYear()} Jobfluencer. All rights reserved.
          </p>
          
          {/* Animated Rotating Text */}
          <div className="flex items-center gap-1.5 text-sm font-medium text-white/40 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <span>Built for</span>
            <span className="text-white inline-flex overflow-hidden relative w-[55px] justify-center">
              <span ref={textRef} className="block font-semibold whitespace-nowrap">
                {ROTATING_TEXTS[textIndex]}
              </span>
            </span>
            <span>🚀</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
