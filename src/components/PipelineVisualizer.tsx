"use client";

import React, { useState } from "react";
import { ScheduledJob, PipelineStageInfo } from "@/types/scheduler";
import {
  Layers,
  CheckCircle2,
  Clock,
  AlertCircle,
  Loader2,
  Terminal,
  Share2,
  Tv,
  Cpu,
  Sparkles,
  RefreshCw,
  Zap,
} from "lucide-react";

interface PipelineVisualizerProps {
  jobs: ScheduledJob[];
  onRefresh?: () => void;
}

export const PipelineVisualizer: React.FC<PipelineVisualizerProps> = ({
  jobs,
  onRefresh,
}) => {
  const [selectedJobId, setSelectedJobId] = useState<string>(
    jobs[0]?.jobId || ""
  );

  const selectedJob = jobs.find((j) => j.jobId === selectedJobId) || jobs[0];

  const getStageStatusBadge = (status: PipelineStageInfo["status"]) => {
    switch (status) {
      case "COMPLETED":
        return {
          icon: <CheckCircle2 className="h-4 w-4 text-emerald-400" />,
          color: "text-emerald-400 bg-emerald-950/40 border-emerald-500/30",
          label: "Completed",
        };
      case "PROCESSING":
        return {
          icon: <Loader2 className="h-4 w-4 text-indigo-400 animate-spin" />,
          color: "text-indigo-300 bg-indigo-950/40 border-indigo-500/40",
          label: "In Progress",
        };
      case "FAILED":
        return {
          icon: <AlertCircle className="h-4 w-4 text-rose-400" />,
          color: "text-rose-400 bg-rose-950/40 border-rose-500/30",
          label: "Failed",
        };
      default:
        return {
          icon: <Clock className="h-4 w-4 text-slate-500" />,
          color: "text-slate-400 bg-[#060911] border-white/[0.08]",
          label: "Queued",
        };
    }
  };

  return (
    <div className="space-y-8">
      {/* The Growth Engine Hero Section */}
      <div className="relative rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#0F1523] via-[#0A0E18] to-[#060911] p-6 sm:p-8 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 rounded-full border border-indigo-500/30 bg-indigo-950/50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-indigo-300">
              <Zap className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
              <span>03 — Execution Command Center</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              Pipeline <span className="text-gradient-brand">Execution Stream</span>
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Real-time rendering status, voice synthesis progression, and cross-platform publishing logs. Every process is connected, every stage is optimized.
            </p>
          </div>

          {onRefresh && (
            <button
              onClick={onRefresh}
              className="inline-flex items-center space-x-2 rounded-2xl border border-white/[0.1] bg-[#0D111A] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white hover:border-indigo-500/50 transition-all cursor-pointer shadow-lg"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Refresh Execution DAG</span>
            </button>
          )}
        </div>
      </div>

      {jobs.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/[0.1] bg-[#0D111A]/40 p-12 text-center">
          <Layers className="mx-auto h-9 w-9 text-slate-600 mb-3" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">No Active Pipeline Jobs</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
            Schedule a new UGC asset in the &quot;Multi-Channel Scheduler&quot; tab to watch the automated synthesis pipeline in action.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Job Queue List (4 cols) */}
          <div className="lg:col-span-4 space-y-3.5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
              <span>Queued &amp; Active Jobs ({jobs.length})</span>
            </h3>

            <div className="space-y-3">
              {jobs.map((job) => {
                const isSelected = (selectedJob?.jobId || "") === job.jobId;
                const completedStages = job.stages.filter((s) => s.status === "COMPLETED").length;
                const totalStages = job.stages.length;
                const percent = Math.round((completedStages / totalStages) * 100);

                return (
                  <div
                    key={job.jobId}
                    onClick={() => setSelectedJobId(job.jobId)}
                    className={`cursor-pointer rounded-2xl border p-4.5 transition-all ${
                      isSelected
                        ? "border-indigo-500 bg-[#141A2B] shadow-xl shadow-indigo-950/60 ring-1 ring-indigo-500/50"
                        : "border-white/[0.08] bg-[#0D111A]/80 hover:border-slate-700 hover:bg-[#0D111A]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] text-indigo-400 font-bold truncate max-w-[150px]">
                        {job.jobId}
                      </span>
                      <span
                        className={`rounded-md border px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${
                          job.status === "READY" || job.status === "DISPATCHED"
                            ? "bg-emerald-950/40 text-emerald-300 border-emerald-500/30"
                            : "bg-indigo-950/40 text-indigo-300 border-indigo-500/30"
                        }`}
                      >
                        {job.status}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-white line-clamp-1 mb-2.5">
                      {job.payload.contentTitle}
                    </h4>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                        <span>Synthesis State</span>
                        <span className="text-slate-200 font-bold">{percent}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#060911] rounded-full overflow-hidden border border-white/[0.05]">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-300"
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detailed Pipeline DAG & Stage Tracker (8 cols) */}
          {selectedJob && (
            <div className="lg:col-span-8 space-y-6">
              {/* Job Summary Banner */}
              <div className="rounded-3xl border border-white/[0.08] bg-[#0D111A]/80 p-6 backdrop-blur-md">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold tracking-wider">
                      Job Ref: {selectedJob.jobId}
                    </span>
                    <h2 className="text-base font-extrabold text-white mt-1">
                      {selectedJob.payload.contentTitle}
                    </h2>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Target Schedule</span>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {new Date(selectedJob.scheduledFor).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Target Channels Matrix */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Staged Feeds:</span>
                  {selectedJob.payload.targetPlatforms
                    .filter((p) => p.enabled)
                    .map((p) => (
                      <span
                        key={p.channel}
                        className="rounded-lg border border-indigo-500/30 bg-indigo-950/40 px-3 py-1 text-[10px] font-bold text-indigo-300 uppercase tracking-wider font-mono"
                      >
                        {p.channel} (9:16)
                      </span>
                    ))}
                </div>
              </div>

              {/* Stage-by-Stage Stepper Graph */}
              <div className="rounded-3xl border border-white/[0.08] bg-[#0D111A]/80 p-6 backdrop-blur-md space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                  <Cpu className="h-4 w-4 text-indigo-400" />
                  <span>Pipeline Execution Stepper Graph</span>
                </h3>

                <div className="space-y-3">
                  {selectedJob.stages.map((stage, idx) => {
                    const badge = getStageStatusBadge(stage.status);
                    return (
                      <div
                        key={stage.id}
                        className="rounded-2xl border border-white/[0.06] bg-[#060911] p-4.5 transition-all"
                      >
                        <div className="flex items-center justify-between gap-3 mb-2">
                          <div className="flex items-center space-x-3">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#141A2B] text-[10px] font-mono font-bold text-indigo-400 border border-indigo-500/30">
                              0{idx + 1}
                            </span>
                            <h4 className="text-xs font-bold text-white uppercase tracking-wider">{stage.name}</h4>
                          </div>
                          <span
                            className={`flex items-center space-x-1.5 rounded-full border px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider ${badge.color}`}
                          >
                            {badge.icon}
                            <span>{badge.label}</span>
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-400 pl-8 font-sans">{stage.description}</p>

                        {stage.status === "PROCESSING" && (
                          <div className="mt-3 pl-8 space-y-1.5">
                            <div className="h-1.5 w-full bg-[#0D111A] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-indigo-500 rounded-full animate-pulse"
                                style={{ width: `${stage.progressPercent}%` }}
                              ></div>
                            </div>
                            <div className="text-[10px] text-right font-mono text-indigo-400 font-bold">
                              {stage.progressPercent}% completed
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Terminal Logs View */}
              <div className="rounded-3xl border border-white/[0.08] bg-[#060911] p-5 font-mono text-xs shadow-inner">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-3.5">
                  <div className="flex items-center space-x-2 text-slate-400">
                    <Terminal className="h-3.5 w-3.5 text-indigo-400" />
                    <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">Pipeline Worker Telemetry</span>
                  </div>
                  <div className="flex space-x-1.5">
                    <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                    <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                  </div>
                </div>

                <div className="space-y-1.5 text-[11px] text-slate-400">
                  <p className="text-slate-500">
                    [{selectedJob.createdAt.slice(11, 19)}] [INIT] Initializing The Growth Engine UGC Worker for {selectedJob.jobId}...
                  </p>
                  <p className="text-emerald-400">
                    [{selectedJob.createdAt.slice(11, 19)}] [VALIDATOR] Zod schema contracts enforced: 100% compliant.
                  </p>
                  <p className="text-indigo-300">
                    [{selectedJob.createdAt.slice(11, 19)}] [PERSONA] Loaded profile &quot;{selectedJob.payload.personaSettings.name}&quot; at {selectedJob.payload.personaSettings.pacingWpm} WPM.
                  </p>
                  <p className="text-slate-300">
                    [{selectedJob.createdAt.slice(11, 19)}] [HOOK] Injected 0.0s pattern interrupt: &quot;{selectedJob.payload.openingHook.slice(0, 60)}...&quot;
                  </p>
                  <p className="text-amber-400">
                    [{selectedJob.createdAt.slice(11, 19)}] [AUDIO] Dynamic audio mastering &amp; phoneme alignment active.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
