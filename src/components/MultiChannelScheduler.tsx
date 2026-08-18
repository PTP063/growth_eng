"use client";

import React, { useState } from "react";
import {
  PersonaProfile,
  PlatformConfig,
  SchedulerPayload,
  SocialPlatform,
  ScheduleValidateResponse,
} from "@/types/scheduler";
import {
  Calendar,
  Clock,
  Sparkles,
  Sliders,
  Send,
  AlertCircle,
  CheckCircle2,
  Tv,
  Hash,
  MessageSquare,
  Flame,
  Volume2,
  Layers,
  Loader2,
  Check,
  Smartphone,
  Info,
  Zap,
} from "lucide-react";

interface MultiChannelSchedulerProps {
  personas: PersonaProfile[];
  selectedPersona: PersonaProfile;
  onSelectPersona: (persona: PersonaProfile) => void;
  formPayload: SchedulerPayload;
  setFormPayload: React.Dispatch<React.SetStateAction<SchedulerPayload>>;
  onScheduleSubmit: (payload: SchedulerPayload) => Promise<ScheduleValidateResponse | null>;
  isSubmitting: boolean;
  lastValidationResult: ScheduleValidateResponse | null;
  appliedFromGrok: boolean;
}

export const MultiChannelScheduler: React.FC<MultiChannelSchedulerProps> = ({
  personas,
  selectedPersona,
  onSelectPersona,
  formPayload,
  setFormPayload,
  onScheduleSubmit,
  isSubmitting,
  lastValidationResult,
  appliedFromGrok,
}) => {
  const [activePreviewTab, setActivePreviewTab] = useState<SocialPlatform>("tiktok");
  const [hashtagInput, setHashtagInput] = useState("");

  const handlePlatformToggle = (channel: SocialPlatform) => {
    setFormPayload((prev) => ({
      ...prev,
      targetPlatforms: prev.targetPlatforms.map((p) =>
        p.channel === channel ? { ...p, enabled: !p.enabled } : p
      ),
    }));
  };

  const handleAddHashtag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && hashtagInput.trim()) {
      e.preventDefault();
      const cleaned = hashtagInput.replace(/^#/, "").trim();
      if (cleaned && !formPayload.tags.includes(cleaned)) {
        setFormPayload((prev) => ({
          ...prev,
          tags: [...prev.tags, cleaned],
        }));
      }
      setHashtagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormPayload((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToRemove),
    }));
  };

  const handleQuickPresetTime = (hoursFromNow: number) => {
    const d = new Date(Date.now() + hoursFromNow * 3600 * 1000);
    const formatted = d.toISOString().slice(0, 16);
    setFormPayload((prev) => ({
      ...prev,
      scheduledTimestamp: formatted,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onScheduleSubmit(formPayload);
  };

  return (
    <div className="space-y-8">
      {/* The Growth Engine Hero Section */}
      <div className="relative rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#0F1523] via-[#0A0E18] to-[#060911] p-6 sm:p-8 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 rounded-full border border-indigo-500/30 bg-indigo-950/50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-indigo-300">
              <Zap className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
              <span>02 — Multi-Channel Deployment Engine</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              Multi-Channel <span className="text-gradient-brand">Content Pipeline</span>
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              High-performance video generation deployed in parallel across TikTok, Instagram Reels, and YouTube Shorts. One algorithm shift and the rest keep converting.
            </p>
          </div>

          {appliedFromGrok && (
            <div className="flex items-center space-x-2 rounded-2xl border border-emerald-500/40 bg-emerald-950/40 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-emerald-300 shadow-lg animate-pulse">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span>Grok Hook Active</span>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Editor & Persona Config (8 cols) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          {/* Persona Settings Drawer Card */}
          <div className="rounded-3xl border border-white/[0.08] bg-[#0D111A]/80 p-6 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Sliders className="h-4 w-4 text-indigo-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  01 — AI Persona Configuration
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">
                Pacing &amp; Voice Studio
              </span>
            </div>

            {/* Persona Preset Selector */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {personas.map((p, idx) => {
                const isSelected = selectedPersona.id === p.id;
                return (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => {
                      onSelectPersona(p);
                      setFormPayload((prev) => ({
                        ...prev,
                        personaId: p.id,
                        personaSettings: {
                          name: p.name,
                          tone: p.defaultTone,
                          pacingWpm: p.pacingWpm,
                          energyLevel: p.energyLevel,
                          framing: p.framingStyle,
                        },
                      }));
                    }}
                    className={`rounded-2xl border p-3.5 text-left transition-all ${
                      isSelected
                        ? "border-indigo-500 bg-[#141A2B] text-white ring-1 ring-indigo-500 shadow-lg shadow-indigo-950/40"
                        : "border-white/[0.06] bg-[#060911] text-slate-400 hover:border-slate-700 hover:text-slate-300"
                    }`}
                  >
                    <div className="text-[10px] font-mono text-slate-500 mb-1">0{idx + 1}</div>
                    <div className="text-xs font-bold truncate text-white">{p.name}</div>
                    <div className="text-[10px] text-slate-400 truncate mt-0.5">{p.niche}</div>
                  </button>
                );
              })}
            </div>

            {/* Pacing & Energy Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-2xl bg-[#060911] border border-white/[0.06] p-4.5">
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-slate-300 font-bold uppercase tracking-wider text-[11px] flex items-center space-x-1.5">
                    <Clock className="h-3.5 w-3.5 text-indigo-400" />
                    <span>Verbal Cadence (WPM)</span>
                  </span>
                  <span className="font-mono text-emerald-400 font-black">
                    {formPayload.personaSettings.pacingWpm} WPM
                  </span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="240"
                  step="5"
                  value={formPayload.personaSettings.pacingWpm}
                  onChange={(e) =>
                    setFormPayload((prev) => ({
                      ...prev,
                      personaSettings: {
                        ...prev.personaSettings,
                        pacingWpm: Number(e.target.value),
                      },
                    }))
                  }
                  className="w-full accent-indigo-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1.5 font-mono">
                  <span>100 WPM</span>
                  <span className="text-indigo-400 font-bold">185 WPM Optimal</span>
                  <span>240 WPM</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center space-x-1.5">
                  <Flame className="h-3.5 w-3.5 text-amber-400" />
                  <span>Energy State</span>
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(["subtle", "conversational", "high_energy", "electrifying"] as const).map((energy) => (
                    <button
                      type="button"
                      key={energy}
                      onClick={() =>
                        setFormPayload((prev) => ({
                          ...prev,
                          personaSettings: {
                            ...prev.personaSettings,
                            energyLevel: energy,
                          },
                        }))
                      }
                      className={`rounded-xl border px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all ${
                        formPayload.personaSettings.energyLevel === energy
                          ? "border-amber-500/50 bg-amber-950/40 text-amber-300 font-black"
                          : "border-white/[0.06] bg-[#0D111A] text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {energy.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Vocal Tone &amp; Framing Description
                </label>
                <input
                  type="text"
                  value={formPayload.personaSettings.tone}
                  onChange={(e) =>
                    setFormPayload((prev) => ({
                      ...prev,
                      personaSettings: {
                        ...prev.personaSettings,
                        tone: e.target.value,
                      },
                    }))
                  }
                  placeholder="e.g. Urgent, authoritative, unfiltered insider"
                  className="w-full rounded-xl border border-white/[0.08] bg-[#0D111A] px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none font-sans"
                />
              </div>
            </div>
          </div>

          {/* Content & Hook Script Editor */}
          <div className="rounded-3xl border border-white/[0.08] bg-[#0D111A]/80 p-6 backdrop-blur-md space-y-4.5">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <MessageSquare className="h-4 w-4 text-indigo-400" />
              <span>02 — Script &amp; Dynamic Hook Editor</span>
            </h3>

            {/* Video Title */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Video Title
              </label>
              <input
                type="text"
                value={formPayload.contentTitle}
                onChange={(e) =>
                  setFormPayload((prev) => ({ ...prev, contentTitle: e.target.value }))
                }
                placeholder="e.g. 3 AI Agents That Run an Entire E-Com Store"
                className="w-full rounded-xl border border-white/[0.08] bg-[#060911] px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
                required
              />
            </div>

            {/* Opening Hook (Crucial!) */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
                  <Flame className="h-3.5 w-3.5 text-amber-400" />
                  <span className="text-white">Opening Hook (0.0s – 3.0s Pattern Disruptor)</span>
                </label>
                <span className="text-[10px] text-slate-400 font-mono">
                  {formPayload.openingHook.length}/250 chars
                </span>
              </div>
              <textarea
                rows={2}
                value={formPayload.openingHook}
                onChange={(e) =>
                  setFormPayload((prev) => ({ ...prev, openingHook: e.target.value }))
                }
                placeholder="e.g. Stop scrolling: if you run an e-com store in 2026, you're wasting 40 hours a week on manual edits."
                className={`w-full rounded-2xl border px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-all font-sans ${
                  appliedFromGrok
                    ? "border-emerald-500/80 bg-emerald-950/20 ring-1 ring-emerald-500/50"
                    : "border-white/[0.08] bg-[#060911] focus:border-indigo-500"
                }`}
                required
              />
            </div>

            {/* Full Script & Scene Breakdown */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Full Video Script &amp; Scene Markers
              </label>
              <textarea
                rows={4}
                value={formPayload.scriptContent}
                onChange={(e) =>
                  setFormPayload((prev) => ({ ...prev, scriptContent: e.target.value }))
                }
                placeholder="Scene 1: Pointing at screen showing live architecture.&#10;Scene 2: Demonstrating 1-click execution.&#10;Scene 3: Final outcome and call to action."
                className="w-full rounded-2xl border border-white/[0.08] bg-[#060911] px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none font-mono"
                required
              />
            </div>

            {/* Call To Action & Hashtags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Call to Action (CTA)
                </label>
                <input
                  type="text"
                  value={formPayload.callToAction}
                  onChange={(e) =>
                    setFormPayload((prev) => ({ ...prev, callToAction: e.target.value }))
                  }
                  placeholder="e.g. Comment 'AGENT' for the complete architecture"
                  className="w-full rounded-xl border border-white/[0.08] bg-[#060911] px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Dynamic Hashtags (Press Enter)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={hashtagInput}
                    onChange={(e) => setHashtagInput(e.target.value)}
                    onKeyDown={handleAddHashtag}
                    placeholder="ai, creator, fyp, viral"
                    className="w-full rounded-xl border border-white/[0.08] bg-[#060911] px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
                  />
                  <Hash className="absolute right-3 top-3 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Tag Pills */}
            {formPayload.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {formPayload.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center space-x-1.5 rounded-lg border border-indigo-500/30 bg-indigo-950/40 px-2.5 py-1 text-[11px] font-bold text-indigo-300 font-mono"
                  >
                    <span>#{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-indigo-400 hover:text-white ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Publishing Channels Matrix */}
          <div className="rounded-3xl border border-white/[0.08] bg-[#0D111A]/80 p-6 backdrop-blur-md">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3.5 flex items-center space-x-2">
              <Tv className="h-4 w-4 text-indigo-400" />
              <span>03 — Target Publishing Channels</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {formPayload.targetPlatforms.map((platform) => {
                const isEnabled = platform.enabled;
                const titles = {
                  tiktok: "TikTok FYP",
                  instagram: "Instagram Reels",
                  youtube: "YouTube Shorts",
                };

                return (
                  <div
                    key={platform.channel}
                    onClick={() => handlePlatformToggle(platform.channel)}
                    className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                      isEnabled
                        ? "border-indigo-500 bg-[#141A2B] ring-1 ring-indigo-500/50 shadow-lg shadow-indigo-950/40"
                        : "border-white/[0.06] bg-[#060911] opacity-60 hover:opacity-80"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        {titles[platform.channel]}
                      </span>
                      <input
                        type="checkbox"
                        checked={isEnabled}
                        onChange={() => {}}
                        className="rounded accent-indigo-500"
                      />
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center justify-between font-mono">
                      <span>Aspect: {platform.aspectRatio}</span>
                      <span className="text-emerald-400 font-bold">9:16 Feed</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Date & Time Scheduler */}
          <div className="rounded-3xl border border-white/[0.08] bg-[#0D111A]/80 p-6 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-indigo-400" />
                <span>04 — Publication Schedule</span>
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => handleQuickPresetTime(2)}
                  className="rounded-xl border border-white/[0.08] bg-[#060911] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-300 hover:border-slate-700"
                >
                  +2 Hours
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickPresetTime(24)}
                  className="rounded-xl border border-white/[0.08] bg-[#060911] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-300 hover:border-slate-700"
                >
                  Tomorrow 6 PM
                </button>
              </div>
            </div>

            <input
              type="datetime-local"
              value={formPayload.scheduledTimestamp.slice(0, 16)}
              onChange={(e) =>
                setFormPayload((prev) => ({
                  ...prev,
                  scheduledTimestamp: new Date(e.target.value).toISOString(),
                }))
              }
              className="w-full rounded-2xl border border-white/[0.08] bg-[#060911] px-4 py-3 text-xs text-white focus:border-indigo-500 focus:outline-none font-mono"
              required
            />
          </div>

          {/* Validation Warnings / Feedback */}
          {lastValidationResult && (
            <div
              className={`rounded-3xl border p-5 backdrop-blur-md ${
                lastValidationResult.valid
                  ? "border-emerald-500/40 bg-emerald-950/30 text-emerald-200"
                  : "border-rose-500/40 bg-rose-950/30 text-rose-200"
              }`}
            >
              <div className="flex items-start space-x-3.5">
                {lastValidationResult.valid ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-rose-400 flex-shrink-0 mt-0.5" />
                )}
                <div className="space-y-1.5">
                  <div className="text-xs font-extrabold uppercase tracking-wider">
                    {lastValidationResult.message}
                  </div>
                  {lastValidationResult.jobId && (
                    <div className="text-[11px] font-mono text-emerald-300">
                      Deterministic Job ID: {lastValidationResult.jobId} (Est. {lastValidationResult.estimatedRenderDurationSec}s render)
                    </div>
                  )}
                  {lastValidationResult.validationWarnings && lastValidationResult.validationWarnings.length > 0 && (
                    <div className="mt-2.5 space-y-1 border-t border-white/[0.08] pt-2.5">
                      <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                        Platform Policy Warnings:
                      </div>
                      {lastValidationResult.validationWarnings.map((warning, i) => (
                        <div key={i} className="text-[10px] text-slate-300">
                          • {warning}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center space-x-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 py-4 px-6 text-sm font-extrabold text-white uppercase tracking-wider shadow-2xl shadow-indigo-600/40 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 transition-all cursor-pointer border border-indigo-400/40"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Validating Schema &amp; Staging Pipeline...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Validate &amp; Schedule Pipeline Job</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Dynamic UGC 9:16 Phone Mockup Preview (4-5 cols) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-4">
          <div className="sticky top-24">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                <Smartphone className="h-3.5 w-3.5 text-indigo-400" />
                <span>9:16 Live UGC Synthesis</span>
              </h3>
              <div className="flex space-x-1 text-[10px]">
                {(["tiktok", "instagram", "youtube"] as const).map((channel) => (
                  <button
                    key={channel}
                    type="button"
                    onClick={() => setActivePreviewTab(channel)}
                    className={`rounded-lg px-2 py-1 uppercase font-bold tracking-wider ${
                      activePreviewTab === channel
                        ? "bg-indigo-600 text-white shadow"
                        : "bg-[#0D111A] text-slate-400 border border-white/[0.05]"
                    }`}
                  >
                    {channel.slice(0, 2)}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Phone Mockup */}
            <div className="relative mx-auto w-full max-w-[280px] aspect-[9/16] rounded-[40px] border-4 border-white/[0.1] bg-[#060911] p-3.5 shadow-2xl overflow-hidden flex flex-col justify-between">
              {/* Top notch */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 h-3.5 w-20 bg-[#0D111A] rounded-full z-30 border border-white/[0.05]"></div>

              {/* Background gradient simulating UGC video */}
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/70 via-[#0A0E18] to-black z-0"></div>

              {/* Persona Avatar Badge top left */}
              <div className="relative z-10 flex items-center space-x-2 pt-4">
                <div className="h-8 w-8 rounded-full border border-indigo-400/50 bg-indigo-900 flex items-center justify-center text-[10px] font-bold text-white shadow-md">
                  {selectedPersona.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white truncate max-w-[140px]">
                    @{selectedPersona.name.toLowerCase().replace(/[^a-z0-9]/g, "_")}
                  </div>
                  <div className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider">● Live Synthesis</div>
                </div>
              </div>

              {/* Center Kinetic Dynamic Captions */}
              <div className="relative z-10 text-center my-auto px-2">
                <div className="rounded-2xl bg-black/70 backdrop-blur-md p-3.5 border border-white/[0.1] shadow-xl">
                  <div className="text-[9px] font-black text-amber-300 uppercase tracking-widest mb-1.5 flex items-center justify-center space-x-1">
                    <Sparkles className="h-2.5 w-2.5" />
                    <span>Pattern Interrupt (0.0s – 3.0s)</span>
                  </div>
                  <p className="text-xs font-black text-white leading-snug drop-shadow-md font-sans">
                    &ldquo;{formPayload.openingHook || "Opening hook will render dynamically here..."}&rdquo;
                  </p>
                </div>

                {/* Animated Vocal Wave */}
                <div className="flex justify-center items-center space-x-1 mt-3.5">
                  <span className="h-2 w-1 bg-indigo-400 rounded animate-pulse"></span>
                  <span className="h-4 w-1 bg-indigo-400 rounded animate-pulse delay-75"></span>
                  <span className="h-6 w-1 bg-indigo-400 rounded animate-pulse delay-150"></span>
                  <span className="h-3 w-1 bg-indigo-400 rounded animate-pulse delay-100"></span>
                  <span className="h-5 w-1 bg-indigo-400 rounded animate-pulse delay-200"></span>
                </div>
                <div className="text-[9px] text-slate-400 font-mono mt-1 font-semibold">
                  Cadence: {formPayload.personaSettings.pacingWpm} WPM
                </div>
              </div>

              {/* Bottom Post Info & CTA */}
              <div className="relative z-10 space-y-1.5 pb-2">
                <div className="text-[11px] font-bold text-white truncate">
                  {formPayload.contentTitle || "Untitled Campaign"}
                </div>
                <p className="text-[10px] text-slate-300 line-clamp-2 font-sans">
                  {formPayload.callToAction} {formPayload.tags.map((t) => `#${t}`).join(" ")}
                </p>
                <div className="flex items-center justify-between text-[9px] text-slate-400 pt-1.5 border-t border-white/[0.08] font-mono">
                  <span className="capitalize">{activePreviewTab} Feed</span>
                  <span>{formPayload.scheduledTimestamp.slice(11, 16)} UTC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
