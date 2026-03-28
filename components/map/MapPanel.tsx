"use client";

import { useMapStore, STATES_DATA } from "@/store/mapStore";
import { useEffect, useRef } from "react";
import { getGsap } from "@/animations/gsapClient";
import { MapPin, Users, Briefcase, ArrowRight } from "lucide-react";
import Image from "next/image";

export function MapPanel() {
  const { selectedState, panelTab, setPanelTab } = useMapStore();
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Animate panel height/fade when state is selected or tab changes
  useEffect(() => {
    const gsap = getGsap();
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [selectedState, panelTab]);

  if (!selectedState || !STATES_DATA[selectedState]) {
    return (
      <div className="h-full min-h-[400px] flex flex-col items-center justify-center border border-white/[0.06] bg-white/[0.01] rounded-2xl p-8 text-center ring-1 ring-white/[0.02]">
        <div className="w-16 h-16 rounded-full bg-white/[0.03] flex items-center justify-center mb-6">
          <MapPin className="w-6 h-6 text-white/40" />
        </div>
        <h3 className="text-xl font-medium text-white/80 mb-2">Select a State</h3>
        <p className="text-white/40 text-sm max-w-[250px] leading-relaxed">
          Click on any state on the map to explore active campaigns and available creators.
        </p>
      </div>
    );
  }

  const data = STATES_DATA[selectedState];

  return (
    <div
      ref={panelRef}
      className="h-full min-h-[500px] lg:min-h-0 flex flex-col border border-white/[0.08] bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden ring-1 ring-white/[0.02] shadow-2xl shadow-black/50"
    >
      {/* ── Header ── */}
      <div className="p-6 md:p-8 border-b border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-transparent">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white/80" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-white tracking-tight">{data.name}</h3>
              <p className="text-sm text-white/50">{data.capital}</p>
            </div>
          </div>
          <div className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.05]">
            <span className="text-xs font-medium text-white/70 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <p className="text-xs text-white/40 mb-1 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" /> Campaigns
            </p>
            <p className="text-xl font-medium text-white/90">{data.campaignsCount}</p>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <p className="text-xs text-white/40 mb-1 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" /> Creators
            </p>
            <p className="text-xl font-medium text-white/90">{data.creatorsCount}</p>
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="flex items-center border-b border-white/[0.06] px-2">
        <button
          onClick={() => setPanelTab("campaigns")}
          className={`flex-1 py-4 text-sm font-medium transition-all relative ${
            panelTab === "campaigns" ? "text-white" : "text-white/40 hover:text-white/60"
          }`}
        >
          Campaigns
          {panelTab === "campaigns" && (
            <span className="absolute bottom-0 left-0 w-full h-px bg-white shadow-[0_0_12px_rgba(255,255,255,0.5)]" />
          )}
        </button>
        <button
          onClick={() => setPanelTab("creators")}
          className={`flex-1 py-4 text-sm font-medium transition-all relative ${
            panelTab === "creators" ? "text-white" : "text-white/40 hover:text-white/60"
          }`}
        >
          Creators
          {panelTab === "creators" && (
            <span className="absolute bottom-0 left-0 w-full h-px bg-white shadow-[0_0_12px_rgba(255,255,255,0.5)]" />
          )}
        </button>
      </div>

      {/* ── Content Area ── */}
      <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/[0.08] scrollbar-track-transparent">
        <div ref={contentRef} className="flex flex-col gap-2 p-4">
          {panelTab === "campaigns" ? (
            <>
              {data.campaigns.map((camp) => (
                <div
                  key={camp.id}
                  className="group p-4 rounded-xl bg-white/[0.015] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all cursor-pointer flex flex-col gap-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-medium text-white/90 group-hover:text-white mb-1 transition-colors">
                        {camp.title}
                      </h4>
                      <p className="text-xs text-white/40">{camp.brand} • {camp.type}</p>
                    </div>
                    {camp.urgent && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                        Urgent
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
                    <span className="text-sm font-medium text-white/80">{camp.budget}</span>
                    <span className="text-xs flex items-center gap-1 text-white/40 group-hover:text-white/80 transition-colors">
                      View <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {data.creators.map((creator) => (
                <div
                  key={creator.id}
                  className="group flex items-center justify-between p-3 rounded-xl bg-white/[0.015] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-lg">
                      {creator.avatar}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">
                        {creator.name}
                      </h4>
                      <p className="text-xs text-white/40">{creator.handle}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-white/80 bg-white/[0.05] px-2 py-0.5 rounded-full inline-block mb-1">
                      {creator.followers}
                    </p>
                    <p className="text-[10px] text-white/30 truncate max-w-[60px]">{creator.niche}</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
