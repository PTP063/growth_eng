"use client";

import React, { useState } from "react";
import { PostPerformance, NextBestActionResponse, ImprovedHookVariant, PersonaParameterAdjustments } from "@/types/analytics";
import { RetentionChart } from "./RetentionChart";
import { NextBestActionCard } from "./NextBestActionCard";
import {
  Sparkles,
  TrendingUp,
  Eye,
  Clock,
  MousePointerClick,
  AlertCircle,
  Loader2,
  RefreshCw,
  Video,
  Share2,
  ChevronRight,
  ShieldCheck,
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

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "tiktok":
        return "TikTok";
      case "youtube":
        return "YT Shorts";
      case "instagram":
        return "IG Reels";
      default:
        return platform;
    }
  };

  const getRetentionColor = (retention: number) => {
    if (retention >= 60) return "text-emerald-400 border-emerald-500/30 bg-emerald-950/30";
    if (retention >= 45) return "text-amber-400 border-amber-500/30 bg-amber-950/30";
    return "text-rose-400 border-rose-500/30 bg-rose-950/30";
  };

  return (
    <div className="space-y-8">
      {/* Top Banner / Selector Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white tracking-tight sm:text-2xl">
            Creator Intelligence & Next-Best-Action
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time multi-channel post retention forensics powered by Grok xAI reasoning.
          </p>
        </div>

        {/* Action Button to run Grok analysis */}
        <button
          onClick={() => onRunDiagnosis(selectedPost)}
          disabled={isLoadingDiagnosis}
          className="relative inline-flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 transition-all cursor-pointer"
        >
          {isLoadingDiagnosis ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-white" />
              <span>Grok AI Diagnosing Bottlenecks...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 text-amber-300 animate-pulse" />
              <span>Run Grok Next-Best-Action Analysis</span>
            </>
          )}
        </button>
      </div>

      {/* Post Selector Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Select Active Short-Form Content Asset
          </div>
          <div className="flex items-center space-x-2 text-xs">
            {["all", "tiktok", "youtube", "instagram"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActivePlatformFilter(tab)}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all ${
                  activePlatformFilter === tab
                    ? "bg-slate-800 text-white"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredPosts.map((post) => {
            const isSelected = selectedPost.id === post.id;
            return (
              <div
                key={post.id}
                onClick={() => onSelectPost(post)}
                className={`cursor-pointer rounded-2xl border p-4 transition-all duration-200 ${
                  isSelected
                    ? "border-indigo-500 bg-gradient-to-b from-indigo-950/40 to-slate-900 shadow-lg shadow-indigo-950/40 ring-1 ring-indigo-500/50"
                    : "border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="rounded-md border border-slate-700 bg-slate-800 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-300">
                    {getPlatformIcon(post.platform)}
                  </span>
                  <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold ${getRetentionColor(post.retention3s)}`}>
                    {post.retention3s}% 3s Ret.
                  </span>
                </div>

                <h3 className="text-xs font-bold text-white line-clamp-1 mb-2">
                  {post.title}
                </h3>

                <div className="grid grid-cols-3 gap-2 text-center rounded-xl bg-slate-950/60 p-2 text-[11px]">
                  <div>
                    <div className="text-[10px] text-slate-500">Views</div>
                    <div className="font-mono font-semibold text-slate-200">
                      {(post.views / 1000).toFixed(1)}k
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500">Watch Time</div>
                    <div className="font-mono font-semibold text-slate-200">
                      {post.watchTimeSeconds}s
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500">CTR</div>
                    <div className="font-mono font-semibold text-slate-200">
                      {post.ctr}%
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Post KPI Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: 3s Retention */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4.5 backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">3-Second Retention</span>
            <TrendingUp className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
              {selectedPost.retention3s}%
            </span>
            <span className={`text-xs font-semibold ${selectedPost.retention3s >= 60 ? "text-emerald-400" : "text-rose-400"}`}>
              {selectedPost.retention3s >= 60 ? "+4.5% vs avg" : "-23.8% vs viral"}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Threshold for TikTok/Reels recommendation algorithm
          </p>
        </div>

        {/* Metric 2: Views */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4.5 backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Total Views</span>
            <Eye className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
              {selectedPost.views.toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-indigo-400">
              Live
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Cross-platform organic reach velocity
          </p>
        </div>

        {/* Metric 3: Avg Watch Time */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4.5 backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Avg Watch Time</span>
            <Clock className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
              {selectedPost.watchTimeSeconds}s
            </span>
            <span className="text-xs font-semibold text-slate-400">
              / 32s total
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Average seconds viewed before swipe-away
          </p>
        </div>

        {/* Metric 4: CTR / Engagement */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4.5 backdrop-blur-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Engagement & CTR</span>
            <MousePointerClick className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
              {selectedPost.engagementRate}%
            </span>
            <span className="text-xs font-semibold text-slate-400">
              CTR: {selectedPost.ctr}%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Comments, shares, and CTA link conversion
          </p>
        </div>
      </div>

      {/* Current Hook Inspector */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center space-x-2">
            <Video className="h-4 w-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">
              Current Opening Hook Inspector (0.0s – 3.0s)
            </h3>
          </div>
          <span className="rounded-md border border-slate-700 bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-300 uppercase">
            Hook Style: {selectedPost.currentHookType.replace("_", " ")}
          </span>
        </div>

        <div className="rounded-xl border border-slate-800/80 bg-slate-950 p-4">
          <p className="text-xs text-slate-300 italic leading-relaxed">
            &ldquo;{selectedPost.currentHook}&rdquo;
          </p>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
          <div>
            <strong>Active Persona:</strong> {selectedPost.personaSettings.name} ({selectedPost.personaSettings.pacingWpm} WPM)
          </div>
          <div className="text-indigo-400 font-medium">
            Framing: {selectedPost.personaSettings.framing}
          </div>
        </div>
      </div>

      {/* Retention Graph Visualization */}
      <RetentionChart
        data={selectedPost.retentionCurve}
        retention3s={selectedPost.retention3s}
      />

      {/* Dynamic Grok Next-Best-Action Result */}
      {diagnosis && (
        <div className="pt-2">
          <NextBestActionCard
            diagnosis={diagnosis}
            onApplyHook={onApplyHook}
            onApplyPersonaAdjustments={onApplyPersonaAdjustments}
          />
        </div>
      )}

      {!diagnosis && !isLoadingDiagnosis && (
        <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-8 text-center">
          <Sparkles className="mx-auto h-8 w-8 text-indigo-400 opacity-60 mb-3" />
          <h4 className="text-sm font-semibold text-white">
            No Active Grok Diagnosis for this Asset Yet
          </h4>
          <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 mb-4">
            Click &quot;Run Grok Next-Best-Action Analysis&quot; above to diagnose drop-off root causes, generate 3 high-converting hook variants, and calibrate persona pacing.
          </p>
          <button
            onClick={() => onRunDiagnosis(selectedPost)}
            className="inline-flex items-center space-x-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Generate Next-Best-Action with Grok</span>
          </button>
        </div>
      )}
    </div>
  );
};
