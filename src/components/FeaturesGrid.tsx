"use client";

import React from "react";
import { Tv, Cpu, Video, Share2, ArrowRight, Zap, CheckCircle2 } from "lucide-react";

interface FeaturesGridProps {
  onSelectFeature: (tab: "analytics" | "scheduler" | "pipeline") => void;
}

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({ onSelectFeature }) => {
  const features = [
    {
      id: "feat_1",
      number: "01",
      title: "Multi-Channel Video Orchestration",
      description:
        "High-performance video campaigns deployed in parallel across TikTok, Instagram Reels, and YouTube Shorts. One algorithm change and the rest keep compounding.",
      icon: <Tv className="h-5 w-5 text-indigo-400" />,
      tag: "TikTok • Reels • Shorts",
      targetTab: "scheduler" as const,
      bullet: "Auto 9:16 aspect ratio & character limits",
    },
    {
      id: "feat_2",
      number: "02",
      title: "Groq LPU Retention Reasoning",
      description:
        "Custom cognitive engine built on Groq LPU (Llama 3.3 70B). Pinpoints exact second-by-second viewer friction and crafts 3 viral opening hook variants tailored to your persona.",
      icon: <Cpu className="h-5 w-5 text-purple-400" />,
      tag: "Groq LPU Engine",
      targetTab: "analytics" as const,
      bullet: "Curiosity gap, contrarian, & problem hooks",
    },
    {
      id: "feat_3",
      number: "03",
      title: "Kinetic Captions & Pacing Studio",
      description:
        "Platform-native video creative that stops passive scrolling. Synchronized speech cadence (100–240 WPM), word-by-word kinetic text, and camera micro-zooms.",
      icon: <Video className="h-5 w-5 text-emerald-400" />,
      tag: "Live 9:16 Phone Viewport",
      targetTab: "scheduler" as const,
      bullet: "Real-time speech WPM audio frequency wave",
    },
    {
      id: "feat_4",
      number: "04",
      title: "Automated DAG Execution & Publishing",
      description:
        "Topological pipeline with auto-validation, deterministic job hashing, audio mastering, and cross-platform staging. Your command center for scaling reach.",
      icon: <Share2 className="h-5 w-5 text-amber-400" />,
      tag: "5-Stage Synthesis DAG",
      targetTab: "pipeline" as const,
      bullet: "Live worker telemetry & zero-loss queue",
    },
  ];

  return (
    <section className="py-16 md:py-24 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">
            <Zap className="h-3.5 w-3.5 fill-indigo-400 animate-pulse" />
            <span>The Complete Growth Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            The entire system that turns strangers into <span className="text-gradient-animated">paying customers.</span>
          </h2>
          <p className="text-sm text-slate-300 mt-2 font-sans">
            Every tool is connected, every stage is optimized. Engineered to eliminate drop-offs and scale revenue.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f) => (
            <div
              key={f.id}
              onClick={() => onSelectFeature(f.targetTab)}
              className="growth-card group cursor-pointer rounded-3xl p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 rounded-2xl bg-[#060911] border border-white/[0.08] group-hover:border-indigo-500/50 group-hover:bg-[#121827] group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      {f.icon}
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-500">{f.number}</span>
                  </div>
                  <span className="rounded-full border border-white/[0.1] bg-[#060911] px-3 py-1 text-[10px] font-bold text-slate-300 uppercase tracking-wider group-hover:border-indigo-500/40 transition-colors">
                    {f.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-indigo-300 transition-colors">
                  {f.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-5">
                  {f.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2 text-slate-400">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-[11px] font-mono">{f.bullet}</span>
                </div>
                <div className="flex items-center space-x-1 text-indigo-400 font-bold uppercase tracking-wider text-[11px] group-hover:translate-x-1.5 transition-transform duration-300">
                  <span>Open Module</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
