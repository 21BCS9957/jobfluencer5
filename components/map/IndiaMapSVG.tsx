"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import indiaMap from "@svg-maps/india";
import { useMapStore, STATES_DATA } from "@/store/mapStore";
import { getGsap } from "@/animations/gsapClient";

const CITY_DOTS = [
  { stateId: "dl", x: 289, y: 228, label: "Delhi" },
  { stateId: "mh", x: 218, y: 445, label: "Mumbai" },
  { stateId: "ka", x: 230, y: 520, label: "Bengaluru" },
  { stateId: "tg", x: 280, y: 470, label: "Hyderabad" },
  { stateId: "tn", x: 272, y: 580, label: "Chennai" },
  { stateId: "wb", x: 400, y: 350, label: "Kolkata" },
  { stateId: "gj", x: 165, y: 330, label: "Ahmedabad" },
  { stateId: "up", x: 330, y: 260, label: "Lucknow" },
  { stateId: "rj", x: 210, y: 270, label: "Jaipur" },
  { stateId: "pb", x: 258, y: 195, label: "Chandigarh" },
];

type TooltipInfo = {
  x: number;
  y: number;
  stateId: string;
} | null;

export function IndiaMapSVG() {
  const svgRef = useRef<SVGSVGElement>(null);
  const { selectedState, hoveredState, setSelectedState, setHoveredState } = useMapStore();
  const [tooltip, setTooltip] = useState<TooltipInfo>(null);

  useEffect(() => {
    const gsap = getGsap();
    if (!svgRef.current) return;

    const paths = svgRef.current.querySelectorAll("[data-state-path]");
    const dots = svgRef.current.querySelectorAll("[data-city-dot]");

    gsap.fromTo(
      paths,
      { opacity: 0, scale: 0.95, transformOrigin: "center center" },
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.02,
        ease: "power2.out",
        scrollTrigger: { trigger: svgRef.current, start: "top 80%", once: true },
      },
    );

    gsap.fromTo(
      dots,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.35,
        stagger: 0.04,
        delay: 0.6,
        ease: "back.out(2)",
        scrollTrigger: { trigger: svgRef.current, start: "top 80%", once: true },
      },
    );
  }, []);

  const getStateFill = useCallback(
    (id: string) => {
      const isSelected = selectedState === id;
      const isHovered = hoveredState === id;
      const data = STATES_DATA[id];

      if (isSelected) return "rgba(255,255,255,0.22)";
      if (isHovered) return "rgba(255,255,255,0.12)";
      if (!data) return "rgba(255,255,255,0.025)";
      if (data.activity === "high") return "rgba(255,255,255,0.08)";
      if (data.activity === "medium") return "rgba(255,255,255,0.05)";
      return "rgba(255,255,255,0.03)";
    },
    [selectedState, hoveredState]
  );

  const getStateStroke = useCallback(
    (id: string) => {
      const isSelected = selectedState === id;
      const isHovered = hoveredState === id;
      if (isSelected) return "rgba(255,255,255,0.55)";
      if (isHovered) return "rgba(255,255,255,0.35)";
      return "rgba(255,255,255,0.1)";
    },
    [selectedState, hoveredState]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGPathElement>, stateId: string) => {
      if (!svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const scaleX = 612 / rect.width;
      const scaleY = 696 / rect.height;
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;
      setTooltip({ x, y, stateId });
    },
    []
  );

  return (
    <svg
      ref={svgRef}
      viewBox={indiaMap.viewBox}
      className="w-full h-full mx-auto select-none overflow-visible touch-none"
      id="india-map-svg"
      aria-label="Interactive India Map"
    >
      <defs>
        <filter id="state-glow" x="-15%" y="-15%" width="130%" height="130%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feFlood floodColor="rgba(255,255,255,0.12)" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="shadow" />
          <feMerge><feMergeNode in="shadow" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <radialGradient id="pulse">
          <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      <g>
        {indiaMap.locations.map((loc: { id: string; name: string; path: string }) => {
          const isActive = selectedState === loc.id || hoveredState === loc.id;
          return (
            <path
              key={loc.id}
              data-state-path={loc.id}
              d={loc.path}
              fill={getStateFill(loc.id)}
              stroke={getStateStroke(loc.id)}
              strokeWidth={selectedState === loc.id ? 1.5 : 0.7}
              className="cursor-pointer transition-all duration-300 outline-none"
              style={{
                filter: isActive ? "url(#state-glow)" : "none",
                vectorEffect: "non-scaling-stroke",
              }}
              onClick={() => setSelectedState(selectedState === loc.id ? null : loc.id)}
              onMouseEnter={() => setHoveredState(loc.id)}
              onMouseMove={(e) => handleMouseMove(e, loc.id)}
              onMouseLeave={() => {
                setHoveredState(null);
                setTooltip(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedState(selectedState === loc.id ? null : loc.id);
                }
              }}
              tabIndex={0}
              role="button"
              aria-pressed={selectedState === loc.id}
            >
              <title>{loc.name}</title>
            </path>
          );
        })}
      </g>

      <g>
        {CITY_DOTS.map((dot) => {
          const data = STATES_DATA[dot.stateId];
          if (!data) return null;
          const isActive = selectedState === dot.stateId || hoveredState === dot.stateId;
          return (
            <g key={dot.stateId} data-city-dot className="pointer-events-none">
              <circle cx={dot.x} cy={dot.y} r="8" fill="url(#pulse)" opacity={0.6}>
                <animate attributeName="r" values="6;12;6" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0.15;0.6" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle
                cx={dot.x}
                cy={dot.y}
                r={isActive ? 4 : 2.8}
                fill="#fff"
                opacity={data.activity === "high" ? 0.85 : 0.45}
                style={{ transition: "r 0.25s ease, opacity 0.25s ease" }}
              />
              {isActive && (
                <text
                  x={dot.x}
                  y={dot.y - 12}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.85)"
                  fontSize="10"
                  fontWeight="600"
                  fontFamily="var(--font-geist-sans), system-ui, sans-serif"
                >
                  {dot.label}
                </text>
              )}
            </g>
          );
        })}
      </g>

      {tooltip && STATES_DATA[tooltip.stateId] && (() => {
        const data = STATES_DATA[tooltip.stateId];
        const tw = 170;
        const th = 44;
        const tx = Math.min(Math.max(tooltip.x - tw / 2, 8), 612 - tw - 8);
        const ty = tooltip.y - th - 14;
        return (
          <g className="pointer-events-none">
            <rect
              x={tx} y={ty} width={tw} height={th} rx={8}
              fill="rgba(18,18,18,0.96)"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={0.7}
            />
            <text x={tx + tw / 2} y={ty + 17} textAnchor="middle"
              fill="#fff" fontSize="10.5" fontWeight="600"
              fontFamily="var(--font-geist-sans), system-ui, sans-serif">
              {data.name}
            </text>
            <text x={tx + tw / 2} y={ty + 33} textAnchor="middle"
              fill="rgba(255,255,255,0.45)" fontSize="9"
              fontFamily="var(--font-geist-sans), system-ui, sans-serif">
              {data.creatorsCount} creators · {data.campaignsCount} campaigns
            </text>
          </g>
        );
      })()}
    </svg>
  );
}
