"use client";

import React from "react";
import { Activity, Calendar, Layers, Cpu, Key, Command } from "lucide-react";

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
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#0a0a0c]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.04]">
            <div className="h-2 w-2 rounded-sm bg-white rotate-45"></div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold tracking-tight text-white font-sans">
              Osynth Growth Engine
            </span>
            <span className="rounded border border-white/[0.1] bg-white/[0.04] px-1.5 py-0.5 text-[9px] font-mono font-medium text-neutral-400">
              LPU
            </span>
          </div>
        </div>

        {/* Center Tab Switcher (Linear style segmented control) */}
        <nav className="hidden md:flex items-center rounded-lg border border-white/[0.08] bg-[#111114] p-0.5">
          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex items-center space-x-1.5 rounded-md px-3 py-1 text-xs font-medium transition-all ${
              activeTab === "analytics"
                ? "bg-white/[0.08] text-white shadow-sm"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <Activity className="h-3.5 w-3.5 text-neutral-300" />
            <span>01 Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab("scheduler")}
            className={`flex items-center space-x-1.5 rounded-md px-3 py-1 text-xs font-medium transition-all ${
              activeTab === "scheduler"
                ? "bg-white/[0.08] text-white shadow-sm"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <Calendar className="h-3.5 w-3.5 text-neutral-300" />
            <span>02 Scheduler</span>
          </button>

          <button
            onClick={() => setActiveTab("pipeline")}
            className={`flex items-center space-x-1.5 rounded-md px-3 py-1 text-xs font-medium transition-all ${
              activeTab === "pipeline"
                ? "bg-white/[0.08] text-white shadow-sm"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <Layers className="h-3.5 w-3.5 text-neutral-300" />
            <span>03 Pipeline</span>
            {activeJobsCount > 0 && (
              <span className="flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-emerald-500/20 px-1 text-[8px] font-mono font-bold text-emerald-400 border border-emerald-500/30">
                {activeJobsCount}
              </span>
            )}
          </button>
        </nav>

        {/* Right Tools & Engine Status */}
        <div className="flex items-center space-x-2.5">
          {/* Groq Engine Badge */}
          <div className="hidden lg:flex items-center space-x-1.5 rounded-lg border border-white/[0.08] bg-[#111114] px-2.5 py-1 text-[11px] text-neutral-300">
            <Cpu className="h-3.5 w-3.5 text-neutral-400" />
            <span className="text-neutral-500 font-mono text-[10px]">Groq:</span>
            <span className="font-mono text-[11px] text-neutral-200 truncate max-w-[120px]">
              {grokModel.replace("llama-", "").replace("-versatile", "")}
            </span>
          </div>

          {/* Config Key Trigger */}
          <button
            onClick={onOpenApiKeyModal}
            className={`flex items-center space-x-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-all ${
              hasCustomKey
                ? "border-emerald-500/30 bg-emerald-950/20 text-emerald-400"
                : "border-white/[0.08] bg-[#111114] text-neutral-300 hover:border-white/[0.18] hover:text-white"
            }`}
          >
            <Key className="h-3 w-3 text-neutral-400" />
            <span>Groq Key</span>
          </button>

          {/* Online Indicator */}
          <div className="flex items-center space-x-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-2 py-1 text-[11px] font-mono text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Online</span>
          </div>
        </div>
      </div>

      {/* Mobile Tab Bar */}
      <div className="flex md:hidden border-t border-white/[0.08] bg-[#0a0a0c] px-2 py-1.5 justify-around">
        <button
          onClick={() => setActiveTab("analytics")}
          className={`flex items-center space-x-1 py-1 px-3 text-xs font-medium ${
            activeTab === "analytics" ? "text-white" : "text-neutral-500"
          }`}
        >
          <Activity className="h-3.5 w-3.5" />
          <span>Analytics</span>
        </button>
        <button
          onClick={() => setActiveTab("scheduler")}
          className={`flex items-center space-x-1 py-1 px-3 text-xs font-medium ${
            activeTab === "scheduler" ? "text-white" : "text-neutral-500"
          }`}
        >
          <Calendar className="h-3.5 w-3.5" />
          <span>Scheduler</span>
        </button>
        <button
          onClick={() => setActiveTab("pipeline")}
          className={`flex items-center space-x-1 py-1 px-3 text-xs font-medium ${
            activeTab === "pipeline" ? "text-white" : "text-neutral-500"
          }`}
        >
          <Layers className="h-3.5 w-3.5" />
          <span>Pipeline</span>
        </button>
      </div>
    </header>
  );
};
