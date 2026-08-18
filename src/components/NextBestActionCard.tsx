"use client";

import React, { useState } from "react";
import {
  NextBestActionResponse,
  ImprovedHookVariant,
  PersonaParameterAdjustments,
} from "@/types/analytics";
import {
  Sparkles,
  AlertTriangle,
  Zap,
  ArrowRight,
  Sliders,
  Check,
  Flame,
  Volume2,
  Tv,
  Clock,
  CheckCircle2,
  Copy,
  TrendingUp,
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
      label: "Optimization Required",
    },
    optimized: {
      bg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
      label: "High Vitality",
    },
  }[diagnosis.severity || "warning"];

  const getHookBadge = (type: ImprovedHookVariant["type"]) => {
    switch (type) {
      case "curiosity_gap":
        return { label: "Curiosity Gap", color: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40" };
      case "contrarian_take":
        return { label: "Contrarian Hot-Take", color: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40" };
      case "problem_agitation":
        return { label: "Problem Agitation", color: "bg-rose-500/20 text-rose-300 border-rose-500/40" };
      default:
        return { label: "High-Converting", color: "bg-blue-500/20 text-blue-300 border-blue-500/40" };
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: The Growth Engine Prescriptive Strategy */}
      <div className="rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-[#131A2D] via-[#0A0E18] to-[#060911] p-6 sm:p-7 backdrop-blur-xl shadow-2xl shadow-indigo-950/40">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center space-x-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/40 border border-indigo-400/40">
              <Zap className="h-5 w-5 fill-white" />
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
              <p className="text-[11px] text-slate-400 mt-0.5">
                Engine: <span className="font-mono text-indigo-300 font-semibold">{diagnosis.model_used}</span> • Generated {new Date(diagnosis.generated_at).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>

        {/* Status Summary & Key Bottleneck Grid */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/[0.08] bg-[#0A0E18]/80 p-4.5">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              <span className="h-2 w-2 rounded-full bg-indigo-400"></span>
              <span>Vitality Health Diagnosis</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-sans">
              {diagnosis.status_summary}
            </p>
          </div>

          <div className="rounded-2xl border border-rose-500/20 bg-rose-950/20 p-4.5">
            <div className="flex items-center space-x-2 text-xs font-bold text-rose-300 uppercase tracking-wider mb-2">
              <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
              <span>Diagnosed Primary Bottleneck</span>
            </div>
            <p className="text-xs text-rose-100/90 leading-relaxed font-sans">
              {diagnosis.key_bottleneck}
            </p>
          </div>
        </div>

        {/* Strategic Next-Best-Action Callout */}
        <div className="mt-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/25 p-4.5">
          <div className="flex items-center space-x-2 text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1.5">
            <TrendingUp className="h-4 w-4 text-emerald-400" />
            <span>Prescribed High-Leverage Strategic Fix</span>
          </div>
          <p className="text-xs font-semibold text-emerald-100 leading-relaxed font-sans">
            {diagnosis.next_best_action}
          </p>
        </div>
      </div>

      {/* Section 2: 3 High-Converting Hook Variants */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <Flame className="h-4 w-4 text-amber-400" />
              <span>03 — 3 High-Converting Opening Hook Variants</span>
            </h4>
            <p className="text-[11px] text-slate-400">
              Custom scroll-stopping pattern interrupts generated specifically to eliminate the 3.0s drop-off.
            </p>
          </div>
          <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider hidden sm:inline">
            1-Click Load into Scheduler →
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {diagnosis.improved_hooks.map((hook, idx) => {
            const badge = getHookBadge(hook.type);
            const isApplied = appliedHookId === hook.id;

            return (
              <div
                key={hook.id || idx}
                className={`relative flex flex-col justify-between rounded-3xl border p-5 transition-all duration-200 ${
                  isApplied
                    ? "border-emerald-500 bg-emerald-950/20 shadow-xl shadow-emerald-950/50"
                    : "border-white/[0.08] bg-[#0D111A]/80 hover:border-indigo-500/50 hover:bg-[#0D111A]"
                }`}
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center space-x-1.5">
                      <span className="font-mono text-[10px] font-bold text-slate-500">0{idx + 1}</span>
                      <span className={`rounded-md border px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider ${badge.color}`}>
                        {badge.label}
                      </span>
                    </div>
                    <span className="rounded-md border border-emerald-500/30 bg-emerald-950/40 px-2 py-0.5 text-[10px] font-black text-emerald-400">
                      {hook.expectedRetentionBoost}
                    </span>
                  </div>

                  {/* Headline */}
                  <h5 className="text-xs font-extrabold text-white uppercase tracking-wider mb-2.5">
                    {hook.headline}
                  </h5>

                  {/* Spoken Hook Script */}
                  <div className="rounded-2xl border border-white/[0.06] bg-[#060911] p-3.5 mb-3">
                    <p className="text-xs text-slate-200 italic leading-relaxed font-sans font-medium">
                      &ldquo;{hook.openingScript}&rdquo;
                    </p>
                  </div>

                  {/* Visual Cue */}
                  <div className="flex items-start space-x-2 text-[11px] text-slate-400 mb-4 bg-[#060911]/60 p-2.5 rounded-xl border border-white/[0.04]">
                    <Tv className="h-3.5 w-3.5 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-300">0.0s Visual Disruptor:</strong> {hook.visualCue}
                    </span>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center space-x-2 pt-2.5 border-t border-white/[0.06]">
                  <button
                    onClick={() => handleCopyScript(hook.openingScript, hook.id)}
                    className="rounded-xl border border-white/[0.08] bg-[#060911] p-2.5 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                    title="Copy hook script"
                  >
                    {copiedScriptId === hook.id ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>

                  <button
                    onClick={() => handleHookClick(hook)}
                    className={`flex-1 flex items-center justify-center space-x-1.5 rounded-xl py-2.5 px-3 text-xs font-bold uppercase tracking-wider transition-all ${
                      isApplied
                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                        : "bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/25"
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Loaded in Scheduler</span>
                      </>
                    ) : (
                      <>
                        <span>Apply Hook</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 3: Persona Parameter Adjustments */}
      <div className="rounded-3xl border border-white/[0.08] bg-[#0D111A]/80 p-6 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <Sliders className="h-4 w-4 text-indigo-400" />
              <span>04 — AI Persona Parameter Calibrations</span>
            </h4>
            <p className="text-[11px] text-slate-400">
              Cadence and tone adjustments to eliminate mid-video retention drops.
            </p>
          </div>

          <button
            onClick={handlePersonaApply}
            className={`flex items-center space-x-1.5 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
              appliedPersona
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                : "border border-indigo-500/40 bg-indigo-950/40 text-indigo-300 hover:bg-indigo-900/50 hover:text-white"
            }`}
          >
            {appliedPersona ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Persona Calibrated!</span>
              </>
            ) : (
              <>
                <Zap className="h-3.5 w-3.5 text-amber-400" />
                <span>Calibrate All Parameters</span>
              </>
            )}
          </button>
        </div>

        {/* 4-Parameter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pacing WPM */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#060911] p-4.5">
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="text-slate-300 flex items-center space-x-1.5 uppercase tracking-wider text-[11px]">
                <Clock className="h-3.5 w-3.5 text-indigo-400" />
                <span>Verbal Cadence (WPM)</span>
              </span>
              <div className="flex items-center space-x-1.5">
                <span className="font-mono text-slate-500 line-through text-xs">
                  {diagnosis.persona_parameter_adjustments.pacingWpm.current} WPM
                </span>
                <ArrowRight className="h-3 w-3 text-emerald-400" />
                <span className="font-mono text-emerald-400 font-extrabold text-xs">
                  {diagnosis.persona_parameter_adjustments.pacingWpm.recommended} WPM
                </span>
              </div>
            </div>

            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden mb-2.5">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all"
                style={{
                  width: `${(diagnosis.persona_parameter_adjustments.pacingWpm.recommended / 260) * 100}%`,
                }}
              ></div>
            </div>
            <p className="text-[11px] text-slate-400 font-sans">
              {diagnosis.persona_parameter_adjustments.pacingWpm.reasoning}
            </p>
          </div>

          {/* Vocal Tone */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#060911] p-4.5">
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="text-slate-300 flex items-center space-x-1.5 uppercase tracking-wider text-[11px]">
                <Volume2 className="h-3.5 w-3.5 text-indigo-400" />
                <span>Vocal Tone &amp; Conviction</span>
              </span>
            </div>
            <div className="text-xs mb-2">
              <span className="text-slate-400">Target: </span>
              <span className="text-indigo-300 font-bold">
                {diagnosis.persona_parameter_adjustments.tone.recommended}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans">
              {diagnosis.persona_parameter_adjustments.tone.reasoning}
            </p>
          </div>

          {/* Energy Level */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#060911] p-4.5">
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="text-slate-300 flex items-center space-x-1.5 uppercase tracking-wider text-[11px]">
                <Flame className="h-3.5 w-3.5 text-amber-400" />
                <span>Energy State</span>
              </span>
              <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-black text-amber-300 uppercase border border-amber-500/40">
                {diagnosis.persona_parameter_adjustments.energyLevel.recommended}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans">
              {diagnosis.persona_parameter_adjustments.energyLevel.reasoning}
            </p>
          </div>

          {/* Visual Framing */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#060911] p-4.5">
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="text-slate-300 flex items-center space-x-1.5 uppercase tracking-wider text-[11px]">
                <Tv className="h-3.5 w-3.5 text-indigo-400" />
                <span>Framing &amp; Composition</span>
              </span>
            </div>
            <div className="text-xs text-emerald-300 font-bold mb-1">
              {diagnosis.persona_parameter_adjustments.framing.recommended}
            </div>
            <p className="text-[11px] text-slate-400 font-sans">
              {diagnosis.persona_parameter_adjustments.framing.reasoning}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
