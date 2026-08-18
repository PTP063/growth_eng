"use client";

import React, { useState } from "react";
import {
  PersonaProfile,
  SchedulerPayload,
  SocialPlatform,
  ScheduleValidateResponse,
} from "@/types/scheduler";
import {
  Calendar,
  Sparkles,
  Sliders,
  Send,
  AlertCircle,
  CheckCircle2,
  Tv,
  Hash,
  Loader2,
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Disc3,
  Flame,
  Smartphone,
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
    <div className="space-y-6 animate-fade-in">
      {/* Console Header */}
      <div className="relative rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#0F1523] via-[#0A0E18] to-[#060911] p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-[11px] font-bold font-mono text-indigo-300 uppercase tracking-wider">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Module 02 — Multi-Channel Studio &amp; Kinetic UGC Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
              Content Pipeline &amp; UGC Staging
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-xl">
              Configure speech pacing, inject Groq viral hooks, enforce platform contracts, and render a live 9:16 mobile viewport simulation.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="rounded-xl border border-indigo-500/30 bg-indigo-950/50 px-3.5 py-2 text-xs font-mono font-bold text-indigo-300 shadow-md">
              {formPayload.personaSettings.pacingWpm} WPM Cadence
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Controls (7-8 cols) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-5">
          {/* Persona Configuration Card */}
          <div className="growth-card rounded-3xl p-6 backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center space-x-2">
                <Sliders className="h-4 w-4 text-indigo-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  01 — AI Persona Speech Calibration
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                Pacing &amp; Voice Modulation
              </span>
            </div>

            {/* Persona Quick Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {personas.map((p) => {
                const isSelected = selectedPersona.id === p.id;
                return (
                  <div
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
                    className={`cursor-pointer rounded-2xl border p-3.5 transition-all duration-200 ${
                      isSelected
                        ? "border-indigo-500 bg-[#141A2B] ring-1 ring-indigo-500/50 shadow-lg shadow-indigo-950/40"
                        : "border-white/[0.06] bg-[#060911] hover:border-indigo-500/30 hover:bg-[#0D111A]"
                    }`}
                  >
                    <div className="text-xs font-bold text-white line-clamp-1">
                      {p.name}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {p.pacingWpm} WPM • {p.defaultTone.slice(0, 16)}...
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Speech Pacing Slider */}
            <div className="pt-2">
              <div className="flex justify-between items-center text-xs mb-2">
                <label className="text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider">
                  Verbal Delivery Cadence (WPM)
                </label>
                <span className="font-mono text-xs font-black text-indigo-400 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-500/30">
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
                className="w-full accent-indigo-500 bg-neutral-800 h-2 rounded-lg cursor-pointer"
              />

              <div className="flex justify-between text-[9px] font-mono text-slate-500 mt-1.5">
                <span>100 (Deliberate)</span>
                <span>150 (Conversational)</span>
                <span className="text-emerald-400 font-bold">185 (Optimal Viral)</span>
                <span>240 (Rapid Fire)</span>
              </div>
            </div>
          </div>

          {/* Script & Hook Configuration Card */}
          <div className="growth-card rounded-3xl p-6 backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center space-x-2">
                <Tv className="h-4 w-4 text-indigo-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  02 — Script &amp; Dynamic Pattern Interrupt
                </h3>
              </div>
              {appliedFromGrok && (
                <span className="rounded-full border border-emerald-500/30 bg-emerald-950/40 px-2.5 py-0.5 text-[9px] font-mono font-bold text-emerald-400">
                  ● Hook Synced from Groq
                </span>
              )}
            </div>

            {/* Campaign Title */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Campaign Title / Internal Slug
              </label>
              <input
                type="text"
                value={formPayload.contentTitle}
                onChange={(e) =>
                  setFormPayload((prev) => ({ ...prev, contentTitle: e.target.value }))
                }
                placeholder="e.g. 3 Open Source AI Agents That Run an E-Com Store"
                className="w-full rounded-2xl border border-white/[0.08] bg-[#060911] px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none transition-colors"
                required
              />
            </div>

            {/* Opening Hook */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
                  <Flame className="h-3.5 w-3.5 text-amber-400 fill-amber-400 animate-pulse" />
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
                className="w-full rounded-2xl border border-white/[0.08] bg-[#060911] px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none transition-colors font-sans"
                required
              />
            </div>

            {/* Full Script */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Full Video Script &amp; Scene Markers
              </label>
              <textarea
                rows={3}
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
                  placeholder="e.g. Comment 'AGENT' for the full repo"
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

          {/* Platform Channels Matrix */}
          <div className="growth-card rounded-3xl p-6 backdrop-blur-md space-y-3.5">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-2">
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
                    className={`cursor-pointer rounded-2xl border p-4 transition-all duration-200 transform hover:-translate-y-0.5 ${
                      isEnabled
                        ? "border-indigo-500 bg-[#141A2B] ring-1 ring-indigo-500/50 shadow-lg shadow-indigo-950/40"
                        : "border-white/[0.06] bg-[#060911] opacity-60 hover:opacity-80"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
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
                    <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between">
                      <span>Aspect: {platform.aspectRatio}</span>
                      <span className="text-emerald-400 font-bold">9:16 Vertical</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Date & Time Schedule */}
          <div className="growth-card rounded-3xl p-6 backdrop-blur-md space-y-3">
            <div className="flex items-center justify-between">
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
                  Tomorrow
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

          {/* Validation Feedback */}
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
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1.5 text-xs">
                  <div className="font-extrabold uppercase tracking-wider">
                    {lastValidationResult.message}
                  </div>
                  {lastValidationResult.jobId && (
                    <div className="text-[11px] font-mono text-emerald-300">
                      Deterministic Job ID: {lastValidationResult.jobId} (Est. {lastValidationResult.estimatedRenderDurationSec}s render)
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
            className="w-full flex items-center justify-center space-x-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 py-4 px-6 text-sm font-extrabold text-white uppercase tracking-wider shadow-2xl shadow-indigo-600/40 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 transition-all duration-300 cursor-pointer border border-indigo-400/40 transform hover:scale-[1.01] active:scale-[0.98]"
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
                <span className="kbd-shortcut bg-white/20 border-white/30 text-white">⌘S</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Sleek 9:16 Phone Mockup with Authentic TikTok Overlay */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="sticky top-20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
                <Smartphone className="h-3.5 w-3.5 text-indigo-400" />
                <span>9:16 UGC Synthesis</span>
              </span>
              <div className="flex space-x-1 text-[10px] font-mono">
                {(["tiktok", "instagram", "youtube"] as const).map((channel) => (
                  <button
                    key={channel}
                    type="button"
                    onClick={() => setActivePreviewTab(channel)}
                    className={`rounded-lg px-2.5 py-1 uppercase font-bold tracking-wider transition-all ${
                      activePreviewTab === channel
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                        : "bg-[#0D111A] text-slate-400 border border-white/[0.05]"
                    }`}
                  >
                    {channel.slice(0, 2)}
                  </button>
                ))}
              </div>
            </div>

            {/* Sleek Mobile Phone Bezel (border-[6px] border-neutral-800 rounded-[32px]) */}
            <div className="relative mx-auto w-full max-w-[270px] aspect-[9/16] rounded-[32px] border-[6px] border-neutral-800 bg-[#09090b] shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col justify-between select-none">
              {/* Dynamic Island / Top Speaker Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 h-3 w-16 bg-neutral-900 rounded-full z-30 border border-white/[0.08]"></div>

              {/* Background gradient simulating UGC video stage */}
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/70 via-[#0A0E18] to-black z-0"></div>

              {/* Top Bar: Feed Navigation */}
              <div className="relative z-10 flex items-center justify-center space-x-3 pt-5 text-[11px] font-semibold text-neutral-400">
                <span>Following</span>
                <span className="text-white border-b-2 border-white pb-0.5 font-bold">For You</span>
              </div>

              {/* Center Kinetic Word Subtitle Overlay */}
              <div className="relative z-10 px-3 text-center my-auto">
                <div className="rounded-2xl bg-black/75 backdrop-blur-md p-3.5 border border-white/[0.1] shadow-2xl">
                  <div className="text-[8px] font-mono text-amber-300 uppercase tracking-widest mb-1 flex items-center justify-center space-x-1 font-bold">
                    <Sparkles className="h-2.5 w-2.5 animate-pulse" />
                    <span>0.0s – 3.0s Pattern Disruptor</span>
                  </div>
                  <p className="text-xs font-black text-white leading-snug font-sans drop-shadow-md">
                    &ldquo;{formPayload.openingHook || "Opening hook script will render dynamically here..."}&rdquo;
                  </p>
                </div>

                {/* Animated Speech Equalizer */}
                <div className="flex justify-center items-center space-x-1 mt-3">
                  <span className="w-1 bg-indigo-400 rounded animate-eq-1"></span>
                  <span className="w-1 bg-indigo-400 rounded animate-eq-2"></span>
                  <span className="w-1 bg-indigo-400 rounded animate-eq-3"></span>
                  <span className="w-1 bg-indigo-400 rounded animate-eq-1"></span>
                  <span className="w-1 bg-indigo-400 rounded animate-eq-2"></span>
                </div>
                <div className="text-[9px] text-slate-400 font-mono mt-1 font-semibold">
                  Cadence: {formPayload.personaSettings.pacingWpm} WPM
                </div>
              </div>

              {/* Right Vertical TikTok Action Bar */}
              <div className="absolute right-2 bottom-16 z-20 flex flex-col items-center space-y-3.5 text-white">
                {/* Creator Avatar with follow (+) */}
                <div className="relative">
                  <div className="h-8 w-8 rounded-full border border-indigo-400/50 bg-indigo-900 flex items-center justify-center text-[10px] font-bold text-white shadow-md">
                    {selectedPersona.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-rose-500 flex items-center justify-center text-[8px] text-white font-bold leading-none">
                    +
                  </div>
                </div>

                {/* Like */}
                <div className="flex flex-col items-center">
                  <Heart className="h-5 w-5 text-white fill-white/10 hover:text-rose-500 hover:fill-rose-500 transition-colors" />
                  <span className="text-[9px] font-mono text-neutral-300 mt-0.5">48.9k</span>
                </div>

                {/* Comment */}
                <div className="flex flex-col items-center">
                  <MessageCircle className="h-5 w-5 text-white fill-white/10" />
                  <span className="text-[9px] font-mono text-neutral-300 mt-0.5">1,280</span>
                </div>

                {/* Bookmark */}
                <div className="flex flex-col items-center">
                  <Bookmark className="h-5 w-5 text-white fill-white/10" />
                  <span className="text-[9px] font-mono text-neutral-300 mt-0.5">4.5k</span>
                </div>

                {/* Share */}
                <div className="flex flex-col items-center">
                  <Share2 className="h-5 w-5 text-white" />
                  <span className="text-[9px] font-mono text-neutral-300 mt-0.5">890</span>
                </div>

                {/* Vinyl Audio Disc Rotating */}
                <div className="h-6 w-6 rounded-full border border-white/20 bg-neutral-900 flex items-center justify-center animate-spin-slow shadow-md">
                  <Disc3 className="h-4 w-4 text-neutral-400" />
                </div>
              </div>

              {/* Bottom Post Metadata & Audio Track */}
              <div className="relative z-10 p-3 space-y-1 bg-gradient-to-t from-black via-black/80 to-transparent pr-12">
                <div className="text-[11px] font-bold text-white">
                  @{selectedPersona.name.toLowerCase().replace(/[^a-z0-9]/g, "")}
                </div>
                <p className="text-[10px] text-slate-200 line-clamp-2 font-sans">
                  {formPayload.contentTitle} {formPayload.tags.map((t) => `#${t}`).join(" ")}
                </p>
                <div className="flex items-center space-x-1.5 text-[9px] font-mono text-slate-400 pt-0.5">
                  <Disc3 className="h-2.5 w-2.5 text-slate-400" />
                  <span className="truncate">Original Audio • {selectedPersona.name} ({formPayload.personaSettings.pacingWpm} WPM)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
