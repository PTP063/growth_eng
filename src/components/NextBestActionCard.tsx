"use client";

import React, { useState } from "react";
import {
  NextBestActionResponse,
  ImprovedHookVariant,
  PersonaParameterAdjustments,
} from "@/types/analytics";
import {
  Sparkles,
  ArrowRight,
  Check,
  Copy,
  Sliders,
  CheckCircle2,
  Cpu,
  Zap,
} from "lucide-react";

interface NextBestActionCardProps {
  diagnosis: NextBestActionResponse;
  onApplyHook: (hook: ImprovedHookVariant) => void;
  onApplyPersonaAdjustments: (adjustments: PersonaParameterAdjustments) => void;
}

export const NextBestActionCard: React.FC<NextBestActionCardProps> = ({
  diagnosis,
  onApplyHook,
  onApplyPersonaAdjustments,
}) => {
  const [appliedHookId, setAppliedHookId] = useState<string | null>(null);
  const [appliedPersona, setAppliedPersona] = useState(false);
  const [copiedScriptId, setCopiedScriptId] = useState<string | null>(null);

  const handleHookClick = (hook: ImprovedHookVariant) => {
    setAppliedHookId(hook.id);
    onApplyHook(hook);
  };

  const handleCopyScript = (script: string, id: string) => {
    navigator.clipboard.writeText(script);
    setCopiedScriptId(id);
    setTimeout(() => setCopiedScriptId(null), 1500);
  };

  const handlePersonaApply = () => {
    setAppliedPersona(true);
    onApplyPersonaAdjustments(diagnosis.persona_parameter_adjustments);
    setTimeout(() => setAppliedPersona(false), 2500);
  };

  const severityBadge = {
    critical: {
      bg: "bg-rose-500/10 border-rose-500/30 text-rose-400",
      label: "Critical Bottleneck",
    },
    warning: {
      bg: "bg-amber-500/10 border-amber-500/30 text-amber-400",
      label: "Needs Optimization",
    },
    optimized: {
      bg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
      label: "High Vitality",
    },
  }[diagnosis.severity || "warning"];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner: Prescriptive Strategy */}
      <div className="growth-card rounded-3xl p-6 sm:p-7 backdrop-blur-xl border border-indigo-500/30 bg-gradient-to-b from-[#131A2D] via-[#0A0E18] to-[#060911] shadow-2xl shadow-indigo-950/40">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center space-x-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/40 border border-indigo-400/40">
              <Zap className="h-5 w-5 fill-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2.5">
                <h3 className="text-base font-extrabold text-white uppercase tracking-wider">
                  02 — Next-Best-Action Prescription
                </h3>
                <span className={`rounded-md border px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ${severityBadge.bg}`}>
                  {severityBadge.label}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Engine: {diagnosis.model_used || "Groq LPU (Llama 3.3 70B)"}
              </p>
            </div>
          </div>
        </div>

        {/* Diagnosis Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5">
          <div className="rounded-2xl border border-white/[0.06] bg-[#060911]/80 p-4.5">
            <div className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider mb-1 font-bold">
              01 — Vitality Health Assessment
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-sans">
              {diagnosis.status_summary}
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-[#060911]/80 p-4.5">
            <div className="text-[10px] font-mono text-rose-400 uppercase tracking-wider mb-1 font-bold">
              02 — Identified Drop-Off Bottleneck
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-sans">
              {diagnosis.key_bottleneck}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-indigo-500/20 bg-indigo-950/20 p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-3">
            <Sparkles className="h-4 w-4 text-amber-300 fill-amber-300 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                Prescribed Strategic Fix:
              </div>
              <p className="text-xs text-slate-200 font-sans mt-0.5 leading-relaxed">
                {diagnosis.next_best_action}
              </p>
            </div>
          </div>

          <button
            onClick={handlePersonaApply}
            className="shrink-0 inline-flex items-center space-x-2 rounded-xl border border-indigo-400/40 bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-indigo-600/30"
          >
            {appliedPersona ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-300" />
                <span className="text-emerald-300 font-mono text-[11px]">Calibrated</span>
              </>
            ) : (
              <>
                <Sliders className="h-3.5 w-3.5 text-white" />
                <span className="font-mono text-[11px]">Sync Persona Pacing</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 3 High-Converting Hooks */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>3 High-Converting Hook Variants</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            Click to Transfer to Scheduler
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {diagnosis.improved_hooks.map((hook, idx) => (
            <div
              key={hook.id || idx}
              className={`growth-card rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1 ${
                appliedHookId === hook.id
                  ? "border-emerald-500/80 bg-emerald-950/20 shadow-xl shadow-emerald-950/50 ring-1 ring-emerald-500/50"
                  : "border-white/[0.08] bg-[#0D111A]/80 hover:border-indigo-500/50 hover:bg-[#121827]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="rounded-md border border-white/[0.1] bg-[#141A2B] px-2 py-0.5 text-[10px] font-bold font-mono text-slate-300 uppercase">
                    Option 0{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">
                    {hook.expectedRetentionBoost}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-white mb-2">
                  {hook.headline}
                </h4>

                <p className="text-xs text-slate-200 italic font-sans leading-relaxed mb-3">
                  &ldquo;{hook.openingScript}&rdquo;
                </p>

                {hook.visualCue && (
                  <div className="rounded-xl border border-white/[0.04] bg-[#060911] p-2.5 text-[10px] text-slate-400 mb-3">
                    <span className="font-mono text-indigo-400 font-bold">Camera Visual: </span>
                    <span>{hook.visualCue}</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2">
                <button
                  onClick={() => handleCopyScript(hook.openingScript, hook.id)}
                  className="flex items-center space-x-1 text-[10px] font-mono text-slate-400 hover:text-white transition-colors"
                >
                  {copiedScriptId === hook.id ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleHookClick(hook)}
                  className="inline-flex items-center space-x-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider hover:from-indigo-500 hover:to-violet-500 active:scale-[0.98] transition-all cursor-pointer shadow-md shadow-indigo-600/30"
                >
                  <span>Apply Hook</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
