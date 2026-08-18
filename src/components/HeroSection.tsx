"use client";

import React from "react";
import { ArrowRight, Activity, Zap, Cpu, Sparkles, TrendingUp, Radio } from "lucide-react";

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
      {/* Dynamic Animated Ambient Glow Lights (Inspired by thegrowthengine.net) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[750px] rounded-full bg-gradient-to-tr from-indigo-600/25 via-purple-600/20 to-emerald-500/15 blur-[140px] pointer-events-none animate-pulse-glow"></div>
      <div className="absolute top-10 right-1/4 h-72 w-72 rounded-full bg-indigo-500/15 blur-[100px] pointer-events-none animate-float"></div>

      <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6">
        {/* Animated Top Pill Badge */}
        <div className="inline-flex items-center space-x-2 rounded-full border border-white/[0.12] bg-[#0D111A]/80 px-4 py-1.5 text-xs text-slate-200 backdrop-blur-md mb-6 hover:border-indigo-500/50 hover:bg-[#121827] transition-all duration-300 shadow-lg shadow-indigo-950/40 cursor-default">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 -ml-4"></span>
          <span className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">
            Groq LPU Acceleration
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-[11px] text-slate-300 font-sans">
            AI-Engineered Performance Platform
          </span>
        </div>

        {/* Dynamic Animated Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
          AI-powered performance engine that turns{" "}
          <span className="text-gradient-animated">
            drop-offs into viral retention.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-sm sm:text-lg text-slate-300 leading-relaxed font-sans mb-10">
          The complete AI system that diagnoses second-by-second viewer friction at 3.0s, writes high-converting pattern-interrupt hooks via Groq LPU, and auto-dispatches across TikTok, Reels, and Shorts.
        </p>

        {/* Glowing Interactive CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onRunAudit}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 rounded-full bg-white text-black px-8 py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] hover:bg-neutral-100 active:scale-[0.98] transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5"
          >
            <Sparkles className="h-4 w-4 text-indigo-600 fill-indigo-600 group-hover:rotate-12 transition-transform duration-300" />
            <span>Launch Live AI Audit</span>
            <ArrowRight className="h-4 w-4 text-black group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          <button
            onClick={onExploreEngine}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-full border border-white/[0.15] bg-[#0D111A]/80 text-white px-7 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider hover:border-indigo-500/50 hover:bg-[#141A2B] hover:shadow-[0_0_25px_rgba(99,102,241,0.2)] active:scale-[0.98] transition-all duration-300 cursor-pointer backdrop-blur-md transform hover:-translate-y-0.5"
          >
            <Activity className="h-4 w-4 text-indigo-400" />
            <span>Explore Command Center</span>
          </button>
        </div>

        {/* 3 Metric Value Pillars with Hover Lift & Glow */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/[0.08] text-left max-w-4xl mx-auto">
          <div className="growth-card group cursor-default rounded-2xl p-5 backdrop-blur-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Benchmark</span>
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <div className="text-3xl font-black font-mono text-white tracking-tight group-hover:text-emerald-400 transition-colors">
              ≥ 60.0%
            </div>
            <div className="text-xs font-bold text-slate-200 uppercase tracking-wider mt-1">
              3s Viral Retention Goal
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
              Guarantees algorithmic FYP push across TikTok, Reels &amp; Shorts feeds.
            </p>
          </div>

          <div className="growth-card group cursor-default rounded-2xl p-5 backdrop-blur-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Inference</span>
              <span className="rounded bg-indigo-500/20 px-1.5 py-0.5 text-[9px] font-mono text-indigo-300 font-bold">LPU</span>
            </div>
            <div className="text-3xl font-black font-mono text-indigo-400 tracking-tight group-hover:text-indigo-300 transition-colors">
              ~250ms
            </div>
            <div className="text-xs font-bold text-slate-200 uppercase tracking-wider mt-1">
              Sub-Second Groq Engine
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
              Real-time friction diagnosis &amp; 3 high-converting hook variants.
            </p>
          </div>

          <div className="growth-card group cursor-default rounded-2xl p-5 backdrop-blur-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Dispatch</span>
              <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-mono text-emerald-400 font-bold">1-Click</span>
            </div>
            <div className="text-3xl font-black font-mono text-emerald-400 tracking-tight group-hover:text-emerald-300 transition-colors">
              3 Feeds
            </div>
            <div className="text-xs font-bold text-slate-200 uppercase tracking-wider mt-1">
              Multi-Channel Staging
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
              Simultaneous automated deployment across TikTok, Reels &amp; Shorts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
