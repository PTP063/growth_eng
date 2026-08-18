"use client";

import React, { useState } from "react";
import {
  PostPerformance,
  NextBestActionResponse,
  ImprovedHookVariant,
  PersonaParameterAdjustments,
} from "@/types/analytics";
import { RetentionChart } from "./RetentionChart";
import { NextBestActionCard } from "./NextBestActionCard";
import {
  Sparkles,
  TrendingUp,
  Eye,
  Clock,
  MousePointerClick,
  Loader2,
  Tv,
  Zap,
  ArrowRight,
} from "lucide-react";

interface AnalyticsDashboardProps {
  posts: PostPerformance[];
  selectedPost: PostPerformance;
  onSelectPost: (post: PostPerformance) => void;
  diagnosis: NextBestActionResponse | null;
  isLoadingDiagnosis: boolean;
  onRunDiagnosis: (post: PostPerformance) => void;
  onApplyHook: (hook: ImprovedHookVariant) => void;
  onApplyPersonaAdjustments: (adjustments: PersonaParameterAdjustments) => void;
  grokModel: string;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  posts,
  selectedPost,
  onSelectPost,
  diagnosis,
  isLoadingDiagnosis,
  onRunDiagnosis,
  onApplyHook,
  onApplyPersonaAdjustments,
  grokModel,
}) => {
  const [activePlatformFilter, setActivePlatformFilter] = useState<string>("all");

  const filteredPosts = posts.filter(
    (p) => activePlatformFilter === "all" || p.platform === activePlatformFilter
  );

  const getPlatformLabel = (platform: string) => {
    switch (platform) {
      case "tiktok":
        return "TikTok";
      case "youtube":
        return "Shorts";
      case "instagram":
        return "Reels";
      default:
        return platform;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Console Header with glowing gradient mesh */}
      <div className="relative rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#0F1523] via-[#0A0E18] to-[#060911] p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 h-64 w-64 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none animate-pulse-glow"></div>
        <div className="absolute bottom-0 left-1/3 -mb-6 h-48 w-48 rounded-full bg-violet-600/10 blur-3xl pointer-events-none animate-float"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center space-x-2 rounded-full border border-indigo-500/30 bg-indigo-950/50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-indigo-300">
              <Zap className="h-3.5 w-3.5 text-amber-400 fill-amber-400 animate-pulse" />
              <span>01 — Automated Drop-Off Forensics</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              Every metric. <span className="text-gradient-animated">One screen.</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              AI-engineered creator intelligence — we diagnose the exact 3.0s drop-off cause and prescribe the high-converting hook variant that compounds your viral retention.
            </p>
          </div>

          {/* High-Impact Action Button */}
          <button
            onClick={() => onRunDiagnosis(selectedPost)}
            disabled={isLoadingDiagnosis}
            className="group relative inline-flex items-center justify-center space-x-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 px-6 py-3.5 text-xs sm:text-sm font-extrabold text-white uppercase tracking-wider shadow-xl shadow-indigo-600/35 hover:shadow-indigo-600/55 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 transition-all duration-300 cursor-pointer border border-indigo-400/40 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoadingDiagnosis ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-white" />
                <span>Running Groq LPU Diagnosis...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 text-amber-300 fill-amber-300 group-hover:rotate-12 transition-transform duration-300" />
                <span>Run Groq Performance Audit</span>
                <ArrowRight className="h-4 w-4 text-white group-hover:translate-x-1 transition-transform duration-300" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Post Selector Matrix */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-2">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
            <span>Active Video Campaigns ({filteredPosts.length})</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            {["all", "tiktok", "youtube", "instagram"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActivePlatformFilter(filter)}
                className={`rounded-xl px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-200 ${
                  activePlatformFilter === filter
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-slate-200 bg-[#0D111A] border border-white/[0.05]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredPosts.map((post, idx) => {
            const isSelected = selectedPost.id === post.id;
            return (
              <div
                key={post.id}
                onClick={() => onSelectPost(post)}
                className={`cursor-pointer rounded-2xl border p-4.5 transition-all duration-300 transform hover:-translate-y-1 ${
                  isSelected
                    ? "border-indigo-500 bg-gradient-to-b from-[#141A2B] to-[#0A0E18] shadow-xl shadow-indigo-950/60 ring-1 ring-indigo-500/50"
                    : "border-white/[0.08] bg-[#0D111A]/80 hover:border-indigo-500/40 hover:bg-[#0D111A]"
                }`}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-[10px] font-bold text-slate-500">0{idx + 1}</span>
                    <span className="rounded-md border border-white/[0.1] bg-[#141A2B] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-300">
                      {getPlatformLabel(post.platform)}
                    </span>
                  </div>
                  <span
                    className={`rounded-md border px-2 py-0.5 text-[10px] font-extrabold ${
                      post.retention3s >= 60
                        ? "border-emerald-500/30 bg-emerald-950/30 text-emerald-400"
                        : "border-rose-500/30 bg-rose-950/30 text-rose-400"
                    }`}
                  >
                    {post.retention3s}% 3s Ret.
                  </span>
                </div>

                <h3 className="text-xs font-bold text-white line-clamp-1 mb-3">
                  {post.title}
                </h3>

                <div className="grid grid-cols-3 gap-2 text-center rounded-xl bg-[#060911]/80 p-2.5 text-[11px] border border-white/[0.05]">
                  <div>
                    <div className="text-[9px] text-slate-500 uppercase font-bold tracking-wider">Views</div>
                    <div className="font-mono font-bold text-slate-200 mt-0.5">
                      {(post.views / 1000).toFixed(1)}k
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] text-slate-500 uppercase font-bold tracking-wider">Watch</div>
                    <div className="font-mono font-bold text-slate-200 mt-0.5">
                      {post.watchTimeSeconds}s
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] text-slate-500 uppercase font-bold tracking-wider">CTR</div>
                    <div className="font-mono font-bold text-slate-200 mt-0.5">
                      {post.ctr}%
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* High-Density Key Metric Tiles with Hover Glow */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="growth-card rounded-2xl p-5 backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">3-Second Retention</span>
            <TrendingUp className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-black font-mono text-white">
              {selectedPost.retention3s}%
            </span>
            <span className="text-[11px] font-bold text-rose-400">
              {selectedPost.retention3s < 60 ? "-23.8% vs viral" : "+4.5% viral"}
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 font-sans">
            FYP algorithm trigger threshold is 60%+
          </p>
        </div>

        <div className="growth-card rounded-2xl p-5 backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Reach</span>
            <Eye className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-black font-mono text-white">
              {selectedPost.views.toLocaleString()}
            </span>
            <span className="text-[11px] font-bold text-indigo-400">Verified</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 font-sans">
            Cross-platform aggregate impressions
          </p>
        </div>

        <div className="growth-card rounded-2xl p-5 backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Avg Watch Time</span>
            <Clock className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-black font-mono text-white">
              {selectedPost.watchTimeSeconds}s
            </span>
            <span className="text-[11px] font-medium text-slate-400">/ 32s video</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 font-sans">
            Average seconds before swipe-away
          </p>
        </div>

        <div className="growth-card rounded-2xl p-5 backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Conversion &amp; CTR</span>
            <MousePointerClick className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-black font-mono text-white">
              {selectedPost.engagementRate}%
            </span>
            <span className="text-[11px] font-bold text-emerald-400">CTR: {selectedPost.ctr}%</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 font-sans">
            Comments, shares, and CTA clicks
          </p>
        </div>
      </div>

      {/* Current Hook Inspector Card */}
      <div className="growth-card rounded-2xl p-5 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center space-x-2">
            <Tv className="h-4 w-4 text-indigo-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Current Opening Hook Inspector (0.0s – 3.0s)
            </h3>
          </div>
          <span className="rounded-md border border-white/[0.1] bg-[#141A2B] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-300">
            Hook Style: {selectedPost.currentHookType}
          </span>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-[#060911] p-4">
          <p className="text-xs text-slate-200 italic leading-relaxed font-sans">
            &ldquo;{selectedPost.currentHook}&rdquo;
          </p>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
          <div>
            <strong className="text-slate-300">Active Persona:</strong> {selectedPost.personaSettings.name} ({selectedPost.personaSettings.pacingWpm} WPM)
          </div>
          <div className="text-indigo-400 font-semibold">
            Framing: {selectedPost.personaSettings.framing}
          </div>
        </div>
      </div>

      {/* SVG Retention Chart */}
      <RetentionChart
        data={selectedPost.retentionCurve}
        retention3s={selectedPost.retention3s}
      />

      {/* Next-Best-Action Diagnosis Output (if loaded) */}
      {diagnosis && (
        <NextBestActionCard
          diagnosis={diagnosis}
          onApplyHook={onApplyHook}
          onApplyPersonaAdjustments={onApplyPersonaAdjustments}
        />
      )}
    </div>
  );
};
