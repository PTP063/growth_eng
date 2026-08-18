"use client";

import React from "react";
import {
  Sparkles,
  Zap,
  Activity,
  Layers,
  Calendar,
  Key,
  ShieldCheck,
  Cpu,
} from "lucide-react";

interface NavbarProps {
  activeTab: "analytics" | "scheduler" | "pipeline";
  setActiveTab: (tab: "analytics" | "scheduler" | "pipeline") => void;
  onOpenApiKeyModal: () => void;
  hasCustomKey: boolean;
  grokModel: string;
  activeJobsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenApiKeyModal,
  hasCustomKey,
  grokModel,
  activeJobsCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/25">
            <Sparkles className="h-5 w-5 text-white" />
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-slate-950 bg-emerald-400"></div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold tracking-tight text-white">
                Osynth<span className="text-indigo-400">.ai</span>
              </span>
              <span className="rounded-md border border-indigo-500/30 bg-indigo-950/50 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-300">
                GROWTH ENGINE
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Autonomous Creator Ops & Recommendation Platform
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center rounded-xl border border-slate-800 bg-slate-900/60 p-1">
          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex items-center space-x-2 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
              activeTab === "analytics"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            <Activity className="h-3.5 w-3.5" />
            <span>Performance & Next-Best-Action</span>
          </button>

          <button
            onClick={() => setActiveTab("scheduler")}
            className={`flex items-center space-x-2 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
              activeTab === "scheduler"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Multi-Channel Scheduler</span>
          </button>

          <button
            onClick={() => setActiveTab("pipeline")}
            className={`flex items-center space-x-2 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
              activeTab === "pipeline"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Pipeline Monitor</span>
            {activeJobsCount > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-500/20 px-1 text-[10px] font-bold text-emerald-400 border border-emerald-500/40 animate-pulse">
                {activeJobsCount}
              </span>
            )}
          </button>
        </nav>

        {/* Right Actions / Grok Model Indicator */}
        <div className="flex items-center space-x-3">
          {/* Grok Model Badge */}
          <div className="hidden sm:flex items-center space-x-1.5 rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1 text-xs text-slate-300">
            <Cpu className="h-3.5 w-3.5 text-indigo-400" />
            <span className="text-slate-400">Model:</span>
            <span className="font-mono font-medium text-indigo-300">{grokModel}</span>
          </div>

          {/* API Key Modal Button */}
          <button
            onClick={onOpenApiKeyModal}
            className={`flex items-center space-x-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
              hasCustomKey
                ? "border-emerald-500/40 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-950/50"
                : "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700 hover:text-white"
            }`}
          >
            {hasCustomKey ? (
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <Key className="h-3.5 w-3.5 text-slate-400" />
            )}
            <span>{hasCustomKey ? "xAI Live Key" : "Grok Config"}</span>
          </button>

          {/* Fast Pipeline Status */}
          <div className="flex items-center space-x-1 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-2 py-0.5 text-[11px] font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 -ml-2"></span>
            <span>Online</span>
          </div>
        </div>
      </div>

      {/* Mobile Navigation bar */}
      <div className="flex md:hidden border-t border-slate-800 bg-slate-950/95 px-2 py-1.5 justify-around">
        <button
          onClick={() => setActiveTab("analytics")}
          className={`flex flex-col items-center py-1 px-3 text-[10px] font-medium ${
            activeTab === "analytics" ? "text-indigo-400 font-bold" : "text-slate-400"
          }`}
        >
          <Activity className="h-4 w-4 mb-0.5" />
          <span>Analytics</span>
        </button>
        <button
          onClick={() => setActiveTab("scheduler")}
          className={`flex flex-col items-center py-1 px-3 text-[10px] font-medium ${
            activeTab === "scheduler" ? "text-indigo-400 font-bold" : "text-slate-400"
          }`}
        >
          <Calendar className="h-4 w-4 mb-0.5" />
          <span>Scheduler</span>
        </button>
        <button
          onClick={() => setActiveTab("pipeline")}
          className={`flex flex-col items-center py-1 px-3 text-[10px] font-medium ${
            activeTab === "pipeline" ? "text-indigo-400 font-bold" : "text-slate-400"
          }`}
        >
          <Layers className="h-4 w-4 mb-0.5" />
          <span>Pipeline ({activeJobsCount})</span>
        </button>
      </div>
    </header>
  );
};
