"use client";

import React from "react";
import { ArrowRight, Activity, Zap, Cpu, Sparkles } from "lucide-react";

interface HeroSectionProps {
  onExploreEngine: () => void;
  onRunAudit: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreEngine,
  onRunAudit,
}) => {
  return (
    <section className="relative pt-12 pb-14 md:pt-20 md:pb-20 overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6">
        {/* Pill Badge */}
        <div className="inline-flex items-center space-x-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1 text-xs text-neutral-300 backdrop-blur-md mb-6 hover:border-white/[0.18] transition-colors">
          <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
          <span className="font-mono text-[11px] text-neutral-300">
            Groq LPU Acceleration
          </span>
          <span className="text-neutral-600">/</span>
          <span className="text-[11px] text-neutral-400">Retention Forensics Engine</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl font-semibold text-white tracking-[-0.03em] leading-[1.1] mb-5">
          Eliminate video drop-offs. <br />
          <span className="text-neutral-400 font-normal">
            Engineer viral retention with AI.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-neutral-400 leading-relaxed font-sans mb-8">
          Osynth diagnoses second-by-second viewer friction at 3.0s, generates high-leverage opening hooks via Groq LPU, and stages cross-platform publishing in one seamless loop.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <button
            onClick={onRunAudit}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-lg bg-white text-black px-5 py-2.5 text-xs font-medium hover:bg-neutral-200 active:scale-[0.98] transition-all shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-black" />
            <span>Run Forensic Audit</span>
            <span className="kbd-shortcut bg-black/10 border-black/20 text-black">⌘ Enter</span>
          </button>

          <button
            onClick={onExploreEngine}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-lg border border-white/[0.08] bg-white/[0.03] text-neutral-300 px-5 py-2.5 text-xs font-medium hover:bg-white/[0.08] hover:text-white transition-all"
          >
            <Activity className="h-3.5 w-3.5 text-neutral-400" />
            <span>Open Command Console</span>
          </button>
        </div>

        {/* Tight Metric Bar (Raycast / Linear style) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left max-w-3xl mx-auto">
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3.5 backdrop-blur-md">
            <div className="flex items-center justify-between text-neutral-400 text-xs mb-1">
              <span className="text-[11px] font-mono">Benchmark</span>
              <span className="text-[10px] font-mono text-emerald-400">Target</span>
            </div>
            <div className="text-xl font-semibold font-mono text-white tracking-tight">
              ≥ 60.0%
            </div>
            <p className="text-[11px] text-neutral-400 mt-1">
              3s Retention threshold for algorithmic FYP distribution.
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3.5 backdrop-blur-md">
            <div className="flex items-center justify-between text-neutral-400 text-xs mb-1">
              <span className="text-[11px] font-mono">Inference</span>
              <span className="text-[10px] font-mono text-neutral-400">Groq LPU</span>
            </div>
            <div className="text-xl font-semibold font-mono text-white tracking-tight">
              ~250ms
            </div>
            <p className="text-[11px] text-neutral-400 mt-1">
              Real-time diagnosis and 3 hook variant generations.
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3.5 backdrop-blur-md">
            <div className="flex items-center justify-between text-neutral-400 text-xs mb-1">
              <span className="text-[11px] font-mono">Channels</span>
              <span className="text-[10px] font-mono text-neutral-400">Unified</span>
            </div>
            <div className="text-xl font-semibold font-mono text-white tracking-tight">
              3 Platforms
            </div>
            <p className="text-[11px] text-neutral-400 mt-1">
              Simultaneous dispatch to TikTok, IG Reels &amp; Shorts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
