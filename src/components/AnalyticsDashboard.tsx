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
    <div className="space-y-6">
      {/* Top Console Header */}
      <div className="rounded-xl border border-white/[0.08] bg-[#0c0c0f] p-5 backdrop-blur-md">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 text-[11px] font-mono text-neutral-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              <span>Module 01: Retention Forensics &amp; Actionable Diagnosis</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Viewer Drop-off Intelligence
            </h2>
            <p className="text-xs text-neutral-400 font-sans max-w-xl">
              Inspect second-by-second audience retention curves, pinpoint 3.0s drop-off inflection points, and synthesize viral opening hook fixes.
            </p>
          </div>

          <button
            onClick={() => onRunDiagnosis(selectedPost)}
            disabled={isLoadingDiagnosis}
            className="inline-flex items-center justify-center space-x-2 rounded-lg bg-white text-black px-4 py-2.5 text-xs font-medium hover:bg-neutral-200 active:scale-[0.98] disabled:opacity-50 transition-all cursor-pointer shadow-sm"
          >
            {isLoadingDiagnosis ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin text-black" />
                <span>Running Groq Diagnosis...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5 text-black" />
                <span>Run Groq Diagnosis</span>
                <span className="kbd-shortcut bg-black/10 border-black/20 text-black">⌘ Enter</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Post Selector Matrix */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
            Active Video Campaigns ({filteredPosts.length})
          </span>
          <div className="flex items-center space-x-1.5 text-xs">
            {["all", "tiktok", "youtube", "instagram"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActivePlatformFilter(filter)}
                className={`rounded-md px-2.5 py-1 text-[10px] font-mono uppercase transition-all ${
                  activePlatformFilter === filter
                    ? "bg-white/[0.1] text-white border border-white/[0.16]"
                    : "text-neutral-500 hover:text-neutral-300 bg-white/[0.02] border border-white/[0.04]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {filteredPosts.map((post, idx) => {
            const isSelected = selectedPost.id === post.id;
            return (
              <div
                key={post.id}
                onClick={() => onSelectPost(post)}
                className={`cursor-pointer rounded-xl border p-3.5 transition-all ${
                  isSelected
                    ? "border-white/[0.3] bg-white/[0.05] shadow-lg shadow-black/50 ring-1 ring-white/[0.1]"
                    : "border-white/[0.08] bg-[#0c0c0f] hover:border-white/[0.16] hover:bg-white/[0.02]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1.5">
                    <span className="font-mono text-[10px] text-neutral-500">0{idx + 1}</span>
                    <span className="rounded border border-white/[0.08] bg-white/[0.03] px-1.5 py-0.5 text-[9px] font-mono text-neutral-300 uppercase">
                      {getPlatformLabel(post.platform)}
                    </span>
                  </div>
                  <span
                    className={`rounded border px-1.5 py-0.5 text-[9px] font-mono font-semibold ${
                      post.retention3s >= 60
                        ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                        : "border-rose-500/20 bg-rose-500/10 text-rose-400"
                    }`}
                  >
                    {post.retention3s}% 3s
                  </span>
                </div>

                <h3 className="text-xs font-medium text-white line-clamp-1 mb-2.5">
                  {post.title}
                </h3>

                <div className="grid grid-cols-3 gap-1.5 text-center rounded-lg bg-white/[0.02] p-2 border border-white/[0.04]">
                  <div>
                    <div className="text-[9px] text-neutral-500 font-mono">Views</div>
                    <div className="font-mono text-xs font-medium text-neutral-200 mt-0.5">
                      {(post.views / 1000).toFixed(1)}k
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] text-neutral-500 font-mono">Watch</div>
                    <div className="font-mono text-xs font-medium text-neutral-200 mt-0.5">
                      {post.watchTimeSeconds}s
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] text-neutral-500 font-mono">CTR</div>
                    <div className="font-mono text-xs font-medium text-neutral-200 mt-0.5">
                      {post.ctr}%
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* High-Density Key Metric Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-xl border border-white/[0.08] bg-[#0c0c0f] p-4 backdrop-blur-md">
          <div className="flex items-center justify-between text-neutral-400 mb-1.5">
            <span className="text-[11px] font-mono">3s Retention</span>
            <TrendingUp className="h-3.5 w-3.5 text-neutral-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-semibold font-mono text-white tracking-tight">
              {selectedPost.retention3s}%
            </span>
            <span className="text-[10px] font-mono text-rose-400">
              {selectedPost.retention3s < 60 ? "Below 60%" : "Viral"}
            </span>
          </div>
          <p className="text-[10px] text-neutral-500 mt-1 font-sans">
            Algorithm benchmark threshold is ≥60%
          </p>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-[#0c0c0f] p-4 backdrop-blur-md">
          <div className="flex items-center justify-between text-neutral-400 mb-1.5">
            <span className="text-[11px] font-mono">Total Views</span>
            <Eye className="h-3.5 w-3.5 text-neutral-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-semibold font-mono text-white tracking-tight">
              {selectedPost.views.toLocaleString()}
            </span>
            <span className="text-[10px] font-mono text-emerald-400">Verified</span>
          </div>
          <p className="text-[10px] text-neutral-500 mt-1 font-sans">
            Platform aggregate impressions
          </p>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-[#0c0c0f] p-4 backdrop-blur-md">
          <div className="flex items-center justify-between text-neutral-400 mb-1.5">
            <span className="text-[11px] font-mono">Avg Watch Time</span>
            <Clock className="h-3.5 w-3.5 text-neutral-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-semibold font-mono text-white tracking-tight">
              {selectedPost.watchTimeSeconds}s
            </span>
            <span className="text-[10px] font-mono text-neutral-500">/ 32s video</span>
          </div>
          <p className="text-[10px] text-neutral-500 mt-1 font-sans">
            Average retention before swipe
          </p>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-[#0c0c0f] p-4 backdrop-blur-md">
          <div className="flex items-center justify-between text-neutral-400 mb-1.5">
            <span className="text-[11px] font-mono">CTR &amp; Engage</span>
            <MousePointerClick className="h-3.5 w-3.5 text-neutral-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-semibold font-mono text-white tracking-tight">
              {selectedPost.engagementRate}%
            </span>
            <span className="text-[10px] font-mono text-neutral-400">CTR: {selectedPost.ctr}%</span>
          </div>
          <p className="text-[10px] text-neutral-500 mt-1 font-sans">
            Comments, shares &amp; profile clicks
          </p>
        </div>
      </div>

      {/* Current Hook Inspector */}
      <div className="rounded-xl border border-white/[0.08] bg-[#0c0c0f] p-4 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center space-x-2">
            <Tv className="h-3.5 w-3.5 text-neutral-400" />
            <h3 className="text-xs font-semibold text-white tracking-tight">
              Current Opening Hook Inspector (0.0s – 3.0s)
            </h3>
          </div>
          <span className="rounded border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[9px] font-mono text-neutral-400 uppercase">
            Archetype: {selectedPost.currentHookType}
          </span>
        </div>

        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
          <p className="text-xs text-neutral-300 italic font-sans leading-relaxed">
            &ldquo;{selectedPost.currentHook}&rdquo;
          </p>
        </div>

        <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-neutral-400">
          <div>
            Active Persona: <span className="text-neutral-200">{selectedPost.personaSettings.name}</span> ({selectedPost.personaSettings.pacingWpm} WPM)
          </div>
          <div className="text-neutral-400">
            Framing: <span className="text-neutral-300">{selectedPost.personaSettings.framing}</span>
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
