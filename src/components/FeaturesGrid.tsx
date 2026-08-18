"use client";

import React from "react";
import { Tv, Cpu, Video, Share2, ArrowRight } from "lucide-react";

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
        "Unified publishing across TikTok, Instagram Reels, and YouTube Shorts. Automated 9:16 aspect ratio, hashtag limits, and title validation.",
      icon: <Tv className="h-4 w-4 text-neutral-300" />,
      tag: "TikTok • Reels • Shorts",
      targetTab: "scheduler" as const,
    },
    {
      id: "feat_2",
      number: "02",
      title: "Groq LPU Retention Reasoning",
      description:
        "Sub-second analysis of viewer swipe-away telemetry. Formulates 3 high-converting hook variants with camera visual cues and persona WPM calibrations.",
      icon: <Cpu className="h-4 w-4 text-neutral-300" />,
      tag: "Groq LPU Engine",
      targetTab: "analytics" as const,
    },
    {
      id: "feat_3",
      number: "03",
      title: "Kinetic Captions & Pacing Studio",
      description:
        "Synchronize speech cadence from 100 to 240 WPM with real-time audio wave feedback, word-by-word kinetic subtitle staging, and authentic 9:16 phone preview.",
      icon: <Video className="h-4 w-4 text-neutral-300" />,
      tag: "Live UGC Studio",
      targetTab: "scheduler" as const,
    },
    {
      id: "feat_4",
      number: "04",
      title: "Topological Synthesis DAG",
      description:
        "5-stage deterministic execution graph with job hashing, audio mastering, and live streaming worker logs for continuous zero-loss deployment.",
      icon: <Share2 className="h-4 w-4 text-neutral-300" />,
      tag: "5-Stage DAG Engine",
      targetTab: "pipeline" as const,
    },
  ];

  return (
    <section className="py-14 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mb-8">
          <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5">
            Architecture Pillars
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            Engineered for high-velocity creator operations.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {features.map((f) => (
            <div
              key={f.id}
              onClick={() => onSelectFeature(f.targetTab)}
              className="linear-card group cursor-pointer rounded-xl p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03]">
                      {f.icon}
                    </div>
                    <span className="text-[11px] font-mono text-neutral-400">{f.number}</span>
                  </div>
                  <span className="rounded border border-white/[0.08] bg-white/[0.02] px-2 py-0.5 text-[10px] font-mono text-neutral-400">
                    {f.tag}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-white mb-1.5 group-hover:text-neutral-200 transition-colors">
                  {f.title}
                </h3>

                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  {f.description}
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <span className="text-[11px] text-neutral-400 font-mono">Open Module</span>
                <ArrowRight className="h-3.5 w-3.5 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
