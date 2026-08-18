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
      bg: "bg-rose-500/10 border-rose-500/20 text-rose-400",
      label: "Critical Bottleneck",
    },
    warning: {
      bg: "bg-amber-500/10 border-amber-500/20 text-amber-400",
      label: "Needs Optimization",
    },
    optimized: {
      bg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
      label: "High Vitality",
    },
  }[diagnosis.severity || "warning"];

  return (
    <div className="space-y-4">
      {/* Diagnosis Overview Card */}
      <div className="rounded-xl border border-white/[0.08] bg-[#0c0c0f] p-5 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
          <div className="flex items-center space-x-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.04]">
              <Cpu className="h-3.5 w-3.5 text-white" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-white tracking-tight">
                AI Next-Best-Action Diagnosis
              </h3>
              <p className="text-[10px] font-mono text-neutral-500">
                Inference via {diagnosis.model_used || "Groq LPU"}
              </p>
            </div>
          </div>

          <span className={`rounded-md border px-2 py-0.5 text-[10px] font-mono font-medium ${severityBadge.bg}`}>
            {severityBadge.label}
          </span>
        </div>

        {/* Diagnosis Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-4">
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3.5">
            <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
              Vitality Summary
            </div>
            <p className="text-xs text-neutral-200 leading-relaxed font-sans">
              {diagnosis.status_summary}
            </p>
          </div>

          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3.5">
            <div className="text-[10px] font-mono text-rose-400 uppercase tracking-wider mb-1">
              Drop-off Cause (at 2.8s)
            </div>
            <p className="text-xs text-neutral-200 leading-relaxed font-sans">
              {diagnosis.key_bottleneck}
            </p>
          </div>
        </div>

        <div className="mt-3.5 rounded-lg border border-white/[0.08] bg-white/[0.03] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start space-x-2.5">
            <Sparkles className="h-4 w-4 text-white shrink-0 mt-0.5" />
            <div>
              <div className="text-[11px] font-semibold text-white">
                Prescribed Fix:
              </div>
              <p className="text-xs text-neutral-300 font-sans mt-0.5">
                {diagnosis.next_best_action}
              </p>
            </div>
          </div>

          <button
            onClick={handlePersonaApply}
            className="shrink-0 inline-flex items-center space-x-1.5 rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-xs text-white hover:bg-white/[0.08] active:scale-[0.98] transition-all cursor-pointer"
          >
            {appliedPersona ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-mono text-[11px]">Calibrated</span>
              </>
            ) : (
              <>
                <Sliders className="h-3.5 w-3.5 text-neutral-400" />
                <span className="font-mono text-[11px]">Sync WPM Pacing</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 3 High-Converting Hooks */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
            3 High-Converting Hook Variants
          </div>
          <span className="text-[10px] font-mono text-neutral-500">
            Click to Apply to Scheduler
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {diagnosis.improved_hooks.map((hook, idx) => (
            <div
              key={hook.id || idx}
              className={`rounded-xl border p-4 flex flex-col justify-between transition-all duration-200 ${
                appliedHookId === hook.id
                  ? "border-white/30 bg-white/[0.06] shadow-md"
                  : "border-white/[0.08] bg-[#0c0c0f] hover:border-white/[0.16] hover:bg-white/[0.02]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="rounded border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[9px] font-mono text-neutral-400">
                    Option {idx + 1}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                    {hook.expectedRetentionBoost}
                  </span>
                </div>

                <h4 className="text-xs font-semibold text-white mb-2">
                  {hook.headline}
                </h4>

                <p className="text-xs text-neutral-300 italic font-sans leading-relaxed mb-3">
                  &ldquo;{hook.openingScript}&rdquo;
                </p>

                {hook.visualCue && (
                  <div className="rounded border border-white/[0.04] bg-white/[0.02] p-2 text-[10px] text-neutral-400 mb-3">
                    <span className="font-mono text-neutral-500">Visual Cue: </span>
                    <span>{hook.visualCue}</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2">
                <button
                  onClick={() => handleCopyScript(hook.openingScript, hook.id)}
                  className="flex items-center space-x-1 text-[10px] font-mono text-neutral-400 hover:text-white transition-colors"
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
                  className="inline-flex items-center space-x-1.5 rounded-lg bg-white text-black px-3 py-1 text-xs font-medium hover:bg-neutral-200 active:scale-[0.98] transition-all cursor-pointer shadow-sm"
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
