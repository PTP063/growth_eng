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
  ArrowUpRight,
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
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#060911]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5">
        {/* Brand Logo - The Growth Engine Style */}
        <div className="flex items-center space-x-3.5">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 shadow-lg shadow-indigo-600/30 border border-indigo-400/30">
            <Zap className="h-5 w-5 text-white fill-white" />
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#060911] bg-emerald-400"></div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-base font-extrabold tracking-tight text-white uppercase">
                THE GROWTH ENGINE
              </span>
              <span className="rounded border border-indigo-500/40 bg-indigo-950/60 px-1.5 py-0.5 text-[9px] font-mono font-bold tracking-wider text-indigo-300 uppercase">
                AI OPS
              </span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-wide">
              Every metric. One screen. Always optimizing.
            </p>
          </div>
        </div>

        {/* Navigation Tabs - Clean uppercase style */}
        <nav className="hidden md:flex items-center rounded-xl border border-white/[0.08] bg-[#0D111A]/80 p-1 backdrop-blur-md">
          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex items-center space-x-2 rounded-lg px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-all duration-200 ${
              activeTab === "analytics"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/40"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
            }`}
          >
            <Activity className="h-3.5 w-3.5" />
            <span>01 — Performance &amp; Actions</span>
          </button>

          <button
            onClick={() => setActiveTab("scheduler")}
            className={`flex items-center space-x-2 rounded-lg px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-all duration-200 ${
              activeTab === "scheduler"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/40"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
            }`}
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>02 — Multi-Channel Scheduler</span>
          </button>

          <button
            onClick={() => setActiveTab("pipeline")}
            className={`flex items-center space-x-2 rounded-lg px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-all duration-200 ${
              activeTab === "pipeline"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/40"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>03 — Pipeline Monitor</span>
            {activeJobsCount > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-500/20 px-1 text-[9px] font-bold text-emerald-400 border border-emerald-500/40 animate-pulse">
                {activeJobsCount}
              </span>
            )}
          </button>
        </nav>

        {/* Right Actions / Grok Model Indicator */}
        <div className="flex items-center space-x-3">
          {/* Grok Model Badge */}
          <div className="hidden lg:flex items-center space-x-1.5 rounded-xl border border-white/[0.08] bg-[#0D111A] px-3 py-1.5 text-xs text-slate-300">
            <Cpu className="h-3.5 w-3.5 text-indigo-400" />
            <span className="text-slate-400 text-[11px] uppercase tracking-wider">Engine:</span>
            <span className="font-mono text-xs font-semibold text-indigo-300">{grokModel}</span>
          </div>

          {/* API Key Modal Button */}
          <button
            onClick={onOpenApiKeyModal}
            className={`flex items-center space-x-1.5 rounded-xl border px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all ${
              hasCustomKey
                ? "border-emerald-500/40 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-950/50"
                : "border-white/[0.1] bg-[#0D111A] text-slate-300 hover:border-indigo-500/50 hover:text-white"
            }`}
          >
            {hasCustomKey ? (
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <Key className="h-3.5 w-3.5 text-slate-400" />
            )}
            <span>{hasCustomKey ? "Live xAI Key" : "Grok Config"}</span>
          </button>

          {/* System Online Badge */}
          <div className="flex items-center space-x-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 -ml-2.5"></span>
            <span>SYSTEM ONLINE</span>
          </div>
        </div>
      </div>

      {/* Mobile Navigation bar */}
      <div className="flex md:hidden border-t border-white/[0.08] bg-[#060911]/95 px-2 py-2 justify-around">
        <button
          onClick={() => setActiveTab("analytics")}
          className={`flex flex-col items-center py-1 px-3 text-[10px] font-bold uppercase tracking-wider ${
            activeTab === "analytics" ? "text-indigo-400 font-extrabold" : "text-slate-400"
          }`}
        >
          <Activity className="h-4 w-4 mb-0.5" />
          <span>Analytics</span>
        </button>
        <button
          onClick={() => setActiveTab("scheduler")}
          className={`flex flex-col items-center py-1 px-3 text-[10px] font-bold uppercase tracking-wider ${
            activeTab === "scheduler" ? "text-indigo-400 font-extrabold" : "text-slate-400"
          }`}
        >
          <Calendar className="h-4 w-4 mb-0.5" />
          <span>Scheduler</span>
        </button>
        <button
          onClick={() => setActiveTab("pipeline")}
          className={`flex flex-col items-center py-1 px-3 text-[10px] font-bold uppercase tracking-wider ${
            activeTab === "pipeline" ? "text-indigo-400 font-extrabold" : "text-slate-400"
          }`}
        >
          <Layers className="h-4 w-4 mb-0.5" />
          <span>Pipeline ({activeJobsCount})</span>
        </button>
      </div>
    </header>
  );
};
