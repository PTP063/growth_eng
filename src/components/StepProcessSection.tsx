"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface StepProcessSectionProps {
  onSelectStep: (tab: "analytics" | "scheduler" | "pipeline") => void;
}

export const StepProcessSection: React.FC<StepProcessSectionProps> = ({ onSelectStep }) => {
  const steps = [
    {
      stepNumber: "01",
      name: "Audit",
      title: "Isolate 3.0s Drop-off Cause",
      description:
        "Evaluate viewer swipe-away spikes against the 60% viral benchmark to detect weak pattern interrupts and friction in the initial 1.5s.",
      timeframe: "Instant Telemetry",
      targetTab: "analytics" as const,
    },
    {
      stepNumber: "02",
      name: "Synthesize",
      title: "Groq LPU Hook Generation",
      description:
        "Generate 3 high-converting hook variants (Curiosity Gap, Contrarian, Problem) and recalibrate persona speech delivery to 185 WPM.",
      timeframe: "~250ms LPU",
      targetTab: "scheduler" as const,
    },
    {
      stepNumber: "03",
      name: "Dispatch",
      title: "5-Stage Synthesis Execution",
      description:
        "Trigger deterministic pipeline validation, master kinetic subtitles, and stage automated distribution to TikTok, Reels, and Shorts.",
      timeframe: "Deterministic DAG",
      targetTab: "pipeline" as const,
    },
  ];

  return (
    <section className="py-14 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mb-8">
          <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5">
            Operational Workflow
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            From retention forensics to multi-channel deployment.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {steps.map((s) => (
            <div
              key={s.stepNumber}
              onClick={() => onSelectStep(s.targetTab)}
              className="linear-card group cursor-pointer rounded-xl p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-semibold text-white">
                    {s.stepNumber} — {s.name}
                  </span>
                  <span className="rounded border border-white/[0.08] bg-white/[0.02] px-2 py-0.5 text-[10px] font-mono text-neutral-400">
                    {s.timeframe}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-white mb-1.5 group-hover:text-neutral-200 transition-colors">
                  {s.title}
                </h3>

                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  {s.description}
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <span className="text-[11px] text-neutral-400 font-mono">Launch Step</span>
                <ArrowRight className="h-3.5 w-3.5 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
