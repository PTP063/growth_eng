"use client";

import React from "react";
import { Sparkles, ArrowRight, Activity, Zap, Layers, Play } from "lucide-react";

interface HeroSectionProps {
  onExploreEngine: () => void;
  onRunAudit: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreEngine,
  onRunAudit,
}) => {
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[700px] rounded-full bg-gradient-to-tr from-indigo-600/15 via-purple-600/10 to-emerald-500/10 blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6">
        {/* Top pill badge */}
        <div className="inline-flex items-center space-x-2 rounded-full border border-white/[0.12] bg-[#0D111A]/80 px-4 py-1.5 text-xs font-semibold text-slate-300 backdrop-blur-md mb-6 shadow-lg">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="uppercase tracking-widest text-[10px] text-emerald-400 font-bold">
            AI-Engineered Performance Platform
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-[11px] text-slate-300">Grok-2 Cognitive Engine</span>
        </div>

        {/* Main Headline styled exactly after thegrowthengine.net */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
          AI-powered performance engine that turns{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400">
            drop-offs into viral retention.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-sm sm:text-lg text-slate-300 leading-relaxed font-sans mb-9">
          The complete AI system that diagnoses second-by-second viewer friction, generates high-converting opening hooks, and auto-dispatches across TikTok, Reels, and Shorts.
        </p>

        {/* Hero CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14">
          <button
            onClick={onRunAudit}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 rounded-full bg-white text-black px-8 py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-2xl hover:bg-slate-200 transition-all cursor-pointer transform hover:scale-[1.02]"
          >
            <Sparkles className="h-4 w-4 text-indigo-600 fill-indigo-600" />
            <span>Launch Live AI Audit</span>
            <ArrowRight className="h-4 w-4 text-black" />
          </button>

          <button
            onClick={onExploreEngine}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-full border border-white/[0.15] bg-[#0D111A]/80 text-white px-7 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-white/[0.08] hover:border-white/[0.3] transition-all cursor-pointer backdrop-blur-md"
          >
            <Activity className="h-4 w-4 text-indigo-400" />
            <span>Explore Command Center</span>
          </button>
        </div>

        {/* 3 Metric Value Pillars from thegrowthengine.net */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/[0.08] text-left max-w-4xl mx-auto">
          <div className="rounded-2xl border border-white/[0.06] bg-[#0D111A]/60 p-4.5 backdrop-blur-md">
            <div className="text-2xl font-black font-mono text-white mb-1">60%+</div>
            <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              3s Viral Retention Threshold
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Guarantees FYP algorithmic push across TikTok &amp; Shorts feeds.
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-[#0D111A]/60 p-4.5 backdrop-blur-md">
            <div className="text-2xl font-black font-mono text-indigo-400 mb-1">3 Hooks</div>
            <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              AI Pattern Interrupts
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Curiosity Gap, Contrarian Hot-Take &amp; Problem Agitation scripts.
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-[#0D111A]/60 p-4.5 backdrop-blur-md">
            <div className="text-2xl font-black font-mono text-emerald-400 mb-1">1-Click</div>
            <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Multi-Channel Staging
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Simultaneous automated deployment across TikTok, Reels &amp; Shorts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
