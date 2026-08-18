"use client";

import React from "react";
import { Sparkles, ArrowRight, Activity, Calendar, Layers } from "lucide-react";

interface StepProcessSectionProps {
  onSelectStep: (tab: "analytics" | "scheduler" | "pipeline") => void;
}

export const StepProcessSection: React.FC<StepProcessSectionProps> = ({ onSelectStep }) => {
  const steps = [
    {
      stepNumber: "01",
      name: "Audit",
      title: "Find what's leaking retention",
      description:
        "Deep scan of your 3-second retention drop-off curve against the 60% viral benchmark to pinpoint the exact millisecond viewers scroll away.",
      timeframe: "Real-time Telemetry",
      actionLabel: "Launch Forensic Audit",
      targetTab: "analytics" as const,
    },
    {
      stepNumber: "02",
      name: "Strategy",
      title: "Custom AI hooks, zero templates",
      description:
        "Grok-2 synthesizes 3 pattern-interrupt opening lines (Curiosity Gap, Contrarian, Problem) and recalibrates verbal delivery pacing to 185 WPM.",
      timeframe: "Single-Click Generation",
      actionLabel: "Calibrate Persona & Hook",
      targetTab: "scheduler" as const,
    },
    {
      stepNumber: "03",
      name: "Launch",
      title: "Deploy with multi-channel monitoring",
      description:
        "Automated 5-stage synthesis DAG validates platform constraints, master-renders audio, and stages content for TikTok, Reels, and Shorts.",
      timeframe: "Automated DAG Execution",
      actionLabel: "Monitor Pipeline Queue",
      targetTab: "pipeline" as const,
    },
  ];

  return (
    <section className="py-16 md:py-24 border-t border-white/[0.08] bg-[#060911]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">
            <span>The Compounding Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            From zero to <span className="text-gradient-brand">scaling in clicks.</span>
          </h2>
          <p className="text-sm text-slate-300 mt-2 font-sans">
            A battle-tested 3-step framework designed to eliminate guesswork and turn short-form video into predictable audience acquisition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div
              key={s.stepNumber}
              onClick={() => onSelectStep(s.targetTab)}
              className="cursor-pointer rounded-3xl border border-white/[0.08] bg-[#0D111A]/80 p-7 backdrop-blur-md hover:border-indigo-500/50 hover:bg-[#121827] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl font-black text-indigo-400">
                    {s.stepNumber}
                  </span>
                  <span className="rounded-full border border-white/[0.1] bg-[#060911] px-2.5 py-0.5 text-[10px] font-mono font-bold text-slate-400 uppercase">
                    {s.timeframe}
                  </span>
                </div>

                <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                  {s.stepNumber} — {s.name}
                </div>

                <h3 className="text-lg font-bold text-white mb-3">
                  {s.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed font-sans mb-6">
                  {s.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-indigo-400 font-bold uppercase tracking-wider">
                <span>{s.actionLabel}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
