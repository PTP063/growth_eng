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
  Cpu,
  Share2,
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
          icon: <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />,
          color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
          label: "Completed",
        };
      case "PROCESSING":
        return {
          icon: <Loader2 className="h-3.5 w-3.5 text-white animate-spin" />,
          color: "text-white bg-white/[0.08] border-white/[0.16]",
          label: "In Progress",
        };
      case "FAILED":
        return {
          icon: <AlertCircle className="h-3.5 w-3.5 text-rose-400" />,
          color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
          label: "Failed",
        };
      default:
        return {
          icon: <Clock className="h-3.5 w-3.5 text-neutral-500" />,
          color: "text-neutral-400 bg-white/[0.02] border-white/[0.06]",
          label: "Queued",
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Console Header */}
      <div className="rounded-xl border border-white/[0.08] bg-[#0c0c0f] p-5 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 text-[11px] font-mono text-neutral-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              <span>Module 03: Topological Synthesis DAG &amp; Worker Stream</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Execution Monitor &amp; Dispatch Graph
            </h2>
            <p className="text-xs text-neutral-400 font-sans max-w-xl">
              Inspect 5-stage synthesis pipelines, phoneme alignment progress, kinetic subtitle rendering, and multi-channel staging telemetry.
            </p>
          </div>

          {onRefresh && (
            <button
              onClick={onRefresh}
              className="inline-flex items-center space-x-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-neutral-300 hover:border-white/[0.18] hover:text-white transition-all cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Refresh Queue</span>
            </button>
          )}
        </div>
      </div>

      {jobs.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/[0.08] bg-white/[0.02] p-12 text-center">
          <Layers className="mx-auto h-8 w-8 text-neutral-600 mb-2.5" />
          <h3 className="text-xs font-semibold text-white">No Active Pipeline Jobs</h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-1">
            Stage a new video campaign in the Multi-Channel Scheduler to see the real-time execution DAG.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Job Queue List (4 cols) */}
          <div className="lg:col-span-4 space-y-2.5">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
              Job Queue ({jobs.length})
            </span>

            <div className="space-y-2">
              {jobs.map((job) => {
                const isSelected = selectedJob?.jobId === job.jobId;
                const completedCount = job.stages.filter((s) => s.status === "COMPLETED").length;
                const progressPct = Math.round((completedCount / job.stages.length) * 100);

                return (
                  <div
                    key={job.jobId}
                    onClick={() => setSelectedJobId(job.jobId)}
                    className={`cursor-pointer rounded-xl border p-3.5 transition-all ${
                      isSelected
                        ? "border-white/30 bg-white/[0.05] shadow-sm"
                        : "border-white/[0.08] bg-[#0c0c0f] hover:border-white/[0.16] hover:bg-white/[0.02]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-mono font-medium text-white truncate max-w-[170px]">
                        {job.jobId}
                      </span>
                      <span className="rounded border border-white/[0.08] bg-white/[0.03] px-1.5 py-0.5 text-[9px] font-mono text-neutral-400">
                        {progressPct}%
                      </span>
                    </div>

                    <p className="text-xs text-neutral-300 line-clamp-1 mb-2">
                      {job.payload.contentTitle}
                    </p>

                    {/* Progress Bar */}
                    <div className="h-1 w-full bg-neutral-800 rounded-full overflow-hidden mb-2">
                      <div
                        className="h-full bg-white transition-all duration-500 rounded-full"
                        style={{ width: `${progressPct}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
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
            <div className="lg:col-span-8 space-y-4">
              {/* DAG Stepper Card */}
              <div className="rounded-xl border border-white/[0.08] bg-[#0c0c0f] p-5 backdrop-blur-md space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/[0.06]">
                  <div>
                    <h3 className="text-xs font-semibold text-white tracking-tight">
                      Topological DAG Stages
                    </h3>
                    <p className="text-[10px] font-mono text-neutral-500">
                      Job: {selectedJob.jobId}
                    </p>
                  </div>

                  <span className="rounded border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[10px] font-mono text-neutral-300">
                    Scheduled: {new Date(selectedJob.scheduledFor).toLocaleString()}
                  </span>
                </div>

                {/* 5 Stages List */}
                <div className="space-y-2.5">
                  {selectedJob.stages.map((stage, i) => {
                    const badge = getStageStatusBadge(stage.status);

                    return (
                      <div
                        key={stage.id || i}
                        className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="font-mono text-xs text-neutral-500">0{i + 1}</span>
                          <div className="h-6 w-6 rounded-md border border-white/[0.08] bg-white/[0.02] flex items-center justify-center">
                            {badge.icon}
                          </div>
                          <div>
                            <div className="text-xs font-medium text-white">
                              {stage.name}
                            </div>
                            <div className="text-[10px] text-neutral-500 font-mono">
                              Stage {i + 1} of 5
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="text-[11px] font-mono text-neutral-400">
                            {stage.progressPercent}%
                          </span>
                          <span
                            className={`rounded border px-2 py-0.5 text-[9px] font-mono font-medium ${badge.color}`}
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
              <div className="rounded-xl border border-white/[0.08] bg-[#08080a] p-4 font-mono text-xs shadow-inner">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.06] text-neutral-500">
                  <div className="flex items-center space-x-1.5 text-[11px]">
                    <Terminal className="h-3.5 w-3.5 text-neutral-400" />
                    <span>Worker Telemetry Stream</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 flex items-center space-x-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Live Stream</span>
                  </span>
                </div>

                <div className="space-y-1 text-[11px] leading-relaxed text-neutral-300 max-h-48 overflow-y-auto">
                  <div className="text-neutral-500">
                    [{new Date().toISOString().slice(11, 19)}] [INIT] Initialized deterministic synthesis pipeline for {selectedJob.jobId}
                  </div>
                  <div className="text-emerald-400">
                    [{new Date().toISOString().slice(11, 19)}] [SCHEMA] Validated payload contracts across {selectedJob.payload.targetPlatforms.filter((p) => p.enabled).length} target platform feeds
                  </div>
                  <div className="text-neutral-300">
                    [{new Date().toISOString().slice(11, 19)}] [AUDIO] Modulating vocal frequencies: {selectedJob.payload.personaSettings.pacingWpm} WPM phoneme alignment
                  </div>
                  <div className="text-neutral-400">
                    [{new Date().toISOString().slice(11, 19)}] [SUBTITLE] Word-level kinetic timestamp sync: &ldquo;{selectedJob.payload.openingHook.slice(0, 35)}...&rdquo;
                  </div>
                  <div className="text-neutral-500">
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
