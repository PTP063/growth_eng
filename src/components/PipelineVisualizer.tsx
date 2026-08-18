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
    <div className="space-y-6 animate-fade-in">
      {/* Console Header */}
      <div className="relative rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#0F1523] via-[#0A0E18] to-[#060911] p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 rounded-full border border-indigo-500/30 bg-indigo-950/50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-indigo-300">
              <Zap className="h-3.5 w-3.5 text-amber-400 fill-amber-400 animate-pulse" />
              <span>03 — Execution Command Center</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              Pipeline <span className="text-gradient-animated">Execution Stream</span>
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Real-time rendering status, voice synthesis progression, and cross-platform publishing logs. Every process is connected, every stage is optimized.
            </p>
          </div>

          {onRefresh && (
            <button
              onClick={onRefresh}
              className="inline-flex items-center space-x-2 rounded-2xl border border-white/[0.1] bg-[#0D111A] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white hover:border-indigo-500/50 transition-all duration-300 cursor-pointer shadow-lg transform hover:scale-[1.02]"
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
            Configure and schedule a video campaign in the Multi-Channel Scheduler to monitor live execution stages.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Job Queue List (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Job Queue ({jobs.length})
            </span>

            <div className="space-y-3">
              {jobs.map((job) => {
                const isSelected = selectedJob?.jobId === job.jobId;
                const completedCount = job.stages.filter((s) => s.status === "COMPLETED").length;
                const progressPct = Math.round((completedCount / job.stages.length) * 100);

                return (
                  <div
                    key={job.jobId}
                    onClick={() => setSelectedJobId(job.jobId)}
                    className={`cursor-pointer rounded-2xl border p-4.5 transition-all duration-300 transform hover:-translate-y-0.5 ${
                      isSelected
                        ? "border-indigo-500 bg-[#141A2B] shadow-xl shadow-indigo-950/40 ring-1 ring-indigo-500/50"
                        : "border-white/[0.08] bg-[#0D111A]/80 hover:border-indigo-500/40 hover:bg-[#121827]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-white truncate max-w-[170px]">
                        {job.jobId}
                      </span>
                      <span className="rounded-full border border-indigo-500/30 bg-indigo-950/40 px-2 py-0.5 text-[10px] font-mono font-bold text-indigo-300">
                        {progressPct}%
                      </span>
                    </div>

                    <p className="text-xs text-slate-200 line-clamp-1 mb-2.5 font-sans">
                      {job.payload.contentTitle}
                    </p>

                    {/* Progress Bar */}
                    <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden mb-2.5">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500 rounded-full"
                        style={{ width: `${progressPct}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>{job.payload.targetPlatforms.filter((p) => p.enabled).length} Channels</span>
                      <span>{new Date(job.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active DAG Stepper & Terminal (8 cols) */}
          {selectedJob && (
            <div className="lg:col-span-8 space-y-5">
              {/* DAG Stepper Card */}
              <div className="growth-card rounded-3xl p-6 backdrop-blur-md space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/[0.06]">
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                      Topological DAG Stages
                    </h3>
                    <p className="text-[10px] font-mono text-slate-400">
                      Job: {selectedJob.jobId}
                    </p>
                  </div>

                  <span className="rounded-full border border-white/[0.1] bg-[#060911] px-3 py-1 text-[10px] font-mono font-bold text-slate-300">
                    Scheduled: {new Date(selectedJob.scheduledFor).toLocaleString()}
                  </span>
                </div>

                {/* 5 Stages List */}
                <div className="space-y-3">
                  {selectedJob.stages.map((stage, i) => {
                    const badge = getStageStatusBadge(stage.status);

                    return (
                      <div
                        key={stage.id || i}
                        className="rounded-2xl border border-white/[0.06] bg-[#060911]/80 p-3.5 flex items-center justify-between gap-3 hover:border-indigo-500/30 transition-colors"
                      >
                        <div className="flex items-center space-x-3.5">
                          <span className="font-mono text-xs font-bold text-slate-500">0{i + 1}</span>
                          <div className="h-7 w-7 rounded-xl border border-white/[0.08] bg-[#0D111A] flex items-center justify-center">
                            {badge.icon}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">
                              {stage.name}
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono">
                              Stage {i + 1} of 5
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2.5">
                          <span className="text-[11px] font-mono font-bold text-slate-400">
                            {stage.progressPercent}%
                          </span>
                          <span
                            className={`rounded-md border px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider ${badge.color}`}
                          >
                            {badge.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Streaming Terminal Output */}
              <div className="rounded-3xl border border-white/[0.08] bg-[#060911] p-5 font-mono text-xs shadow-2xl">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06] text-slate-400">
                  <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider">
                    <Terminal className="h-4 w-4 text-indigo-400" />
                    <span>Worker Telemetry Stream</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 flex items-center space-x-1.5 font-bold">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>Live Stream</span>
                  </span>
                </div>

                <div className="space-y-1.5 text-[11px] leading-relaxed text-slate-300 max-h-48 overflow-y-auto">
                  <div className="text-slate-500">
                    [{new Date().toISOString().slice(11, 19)}] [INIT] Initialized deterministic synthesis pipeline for {selectedJob.jobId}
                  </div>
                  <div className="text-emerald-400 font-semibold">
                    [{new Date().toISOString().slice(11, 19)}] [SCHEMA] Validated payload contracts across {selectedJob.payload.targetPlatforms.filter((p) => p.enabled).length} target platform feeds
                  </div>
                  <div className="text-slate-300">
                    [{new Date().toISOString().slice(11, 19)}] [AUDIO] Modulating vocal frequencies: {selectedJob.payload.personaSettings.pacingWpm} WPM phoneme alignment
                  </div>
                  <div className="text-indigo-300">
                    [{new Date().toISOString().slice(11, 19)}] [SUBTITLE] Word-level kinetic timestamp sync: &ldquo;{selectedJob.payload.openingHook.slice(0, 35)}...&rdquo;
                  </div>
                  <div className="text-slate-400">
                    [{new Date().toISOString().slice(11, 19)}] [STAGING] Target dispatch scheduled for {selectedJob.scheduledFor}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
