"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { MultiChannelScheduler } from "@/components/MultiChannelScheduler";
import { PipelineVisualizer } from "@/components/PipelineVisualizer";
import { ApiKeyModal } from "@/components/ApiKeyModal";
import { samplePosts, initialPersonas, sampleInitialJobs } from "@/lib/mockData";
import {
  PostPerformance,
  NextBestActionResponse,
  ImprovedHookVariant,
  PersonaParameterAdjustments,
} from "@/types/analytics";
import {
  PersonaProfile,
  SchedulerPayload,
  ScheduledJob,
  ScheduleValidateResponse,
} from "@/types/scheduler";

export default function GrowthEngineApp() {
  const [activeTab, setActiveTab] = useState<"analytics" | "scheduler" | "pipeline">("analytics");
  const [posts, setPosts] = useState<PostPerformance[]>(samplePosts);
  const [selectedPost, setSelectedPost] = useState<PostPerformance>(samplePosts[0]);
  const [diagnosisMap, setDiagnosisMap] = useState<Record<string, NextBestActionResponse>>({});
  const [isLoadingDiagnosis, setIsLoadingDiagnosis] = useState(false);

  // Personas & Scheduler
  const [personas, setPersonas] = useState<PersonaProfile[]>(initialPersonas);
  const [selectedPersona, setSelectedPersona] = useState<PersonaProfile>(initialPersonas[0]);
  const [appliedFromGrok, setAppliedFromGrok] = useState(false);
  const [lastValidationResult, setLastValidationResult] = useState<ScheduleValidateResponse | null>(null);
  const [isSubmittingSchedule, setIsSubmittingSchedule] = useState(false);

  // Pipeline Jobs
  const [jobs, setJobs] = useState<ScheduledJob[]>(sampleInitialJobs);

  // Grok API Key and Model Settings
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [grokModel, setGrokModel] = useState("grok-2-latest");

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form Payload State for Scheduler
  const [formPayload, setFormPayload] = useState<SchedulerPayload>({
    contentTitle: "Why 99% of LLM Wrappers Will Die in 2026 (Fix & Strategy)",
    openingHook: "Stop scrolling if you're still building thin AI wrappers: here is what actually survives the platform shift.",
    scriptContent: "Scene 1: Show architecture diagram on screen with bold cross mark on simple proxies.\nScene 2: Explain deep contextual memory loops.\nScene 3: Reveal the high-leverage agent workflow.\nScene 4: Call to action for the architecture blueprint.",
    personaId: initialPersonas[0].id,
    personaSettings: {
      name: initialPersonas[0].name,
      tone: initialPersonas[0].defaultTone,
      pacingWpm: initialPersonas[0].pacingWpm,
      energyLevel: initialPersonas[0].energyLevel,
      framing: initialPersonas[0].framingStyle,
    },
    targetPlatforms: [
      { channel: "tiktok", enabled: true, aspectRatio: "9:16", autoHashtags: true, privacy: "public" },
      { channel: "instagram", enabled: true, aspectRatio: "9:16", autoHashtags: true, privacy: "public" },
      { channel: "youtube", enabled: true, aspectRatio: "9:16", autoHashtags: true, privacy: "public" },
    ],
    scheduledTimestamp: new Date(Date.now() + 3600 * 3000).toISOString(),
    tags: ["ai", "growth", "buildinpublic", "creatorops"],
    callToAction: "Comment 'BLUEPRINT' for the full architectural breakdown.",
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Run Next-Best-Action Diagnosis via Grok API
  const handleRunDiagnosis = async (post: PostPerformance) => {
    setIsLoadingDiagnosis(true);
    try {
      const response = await fetch("/api/analytics/next-best-action", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(apiKey ? { "x-grok-api-key": apiKey } : {}),
          "x-grok-model": grokModel,
        },
        body: JSON.stringify({
          postId: post.id,
          title: post.title,
          platform: post.platform,
          views: post.views,
          watchTimeSeconds: post.watchTimeSeconds,
          retention3s: post.retention3s,
          ctr: post.ctr,
          engagementRate: post.engagementRate,
          currentHook: post.currentHook,
          currentHookType: post.currentHookType,
          personaSettings: post.personaSettings,
          retentionCurve: post.retentionCurve,
          apiKey: apiKey || undefined,
          model: grokModel,
        }),
      });

      if (!response.ok) {
        throw new Error(`Diagnosis request failed with status ${response.status}`);
      }

      const data: NextBestActionResponse = await response.json();
      setDiagnosisMap((prev) => ({ ...prev, [post.id]: data }));
      showToast("✨ Grok Next-Best-Action Diagnosis generated successfully!");
    } catch (err: unknown) {
      console.error("Diagnosis error:", err);
      showToast("⚠️ Could not reach live Grok endpoint; switched to fallback diagnosis.");
    } finally {
      setIsLoadingDiagnosis(false);
    }
  };

  // 1-Click Action: Apply Hook to Scheduler & Navigate
  const handleApplyHook = (hook: ImprovedHookVariant) => {
    setFormPayload((prev) => ({
      ...prev,
      contentTitle: `[V2 Iteration] ${selectedPost.title}`,
      openingHook: hook.openingScript,
    }));
    setAppliedFromGrok(true);
    showToast(`⚡ Hook applied: "${hook.headline}". Transferred to Scheduler!`);
    setActiveTab("scheduler");
  };

  // Apply Persona Calibrations
  const handleApplyPersonaAdjustments = (adjustments: PersonaParameterAdjustments) => {
    setFormPayload((prev) => ({
      ...prev,
      personaSettings: {
        ...prev.personaSettings,
        pacingWpm: adjustments.pacingWpm.recommended,
        tone: adjustments.tone.recommended,
        energyLevel: adjustments.energyLevel.recommended,
        framing: adjustments.framing.recommended,
      },
    }));
    showToast(`🎯 Persona calibrated: Pacing increased to ${adjustments.pacingWpm.recommended} WPM!`);
  };

  // Submit Schedule & Validate Pipeline
  const handleScheduleSubmit = async (
    payload: SchedulerPayload
  ): Promise<ScheduleValidateResponse | null> => {
    setIsSubmittingSchedule(true);
    try {
      const response = await fetch("/api/schedule/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: ScheduleValidateResponse = await response.json();
      setLastValidationResult(data);

      if (data.valid) {
        // Create new pipeline job
        const newJob: ScheduledJob = {
          jobId: data.jobId,
          payload: payload,
          status: "PROCESSING",
          createdAt: new Date().toISOString(),
          scheduledFor: data.scheduledDispatchTime,
          stages: data.pipelineStages,
        };

        setJobs((prev) => [newJob, ...prev]);
        showToast(`🚀 Pipeline Job ${data.jobId} staged successfully!`);

        // Automatically switch to pipeline monitor to view progress
        setTimeout(() => {
          setActiveTab("pipeline");
        }, 1200);
      } else {
        showToast("⚠️ Validation rejected. Please resolve platform policy errors.");
      }

      return data;
    } catch (err: unknown) {
      console.error("Schedule error:", err);
      showToast("❌ Network error while validating pipeline payload.");
      return null;
    } finally {
      setIsSubmittingSchedule(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-600 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 rounded-2xl border border-indigo-500/40 bg-slate-900/95 px-4 py-3 text-xs font-semibold text-white shadow-2xl shadow-indigo-950 backdrop-blur-md animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        hasCustomKey={Boolean(apiKey && apiKey.length > 5)}
        grokModel={grokModel}
        activeJobsCount={jobs.filter((j) => j.status === "PROCESSING" || j.status === "QUEUED").length}
      />

      {/* Main Content Body */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {activeTab === "analytics" && (
          <AnalyticsDashboard
            posts={posts}
            selectedPost={selectedPost}
            onSelectPost={(p) => {
              setSelectedPost(p);
              // if not yet diagnosed, optionally trigger or let user click
            }}
            diagnosis={diagnosisMap[selectedPost.id] || null}
            isLoadingDiagnosis={isLoadingDiagnosis}
            onRunDiagnosis={handleRunDiagnosis}
            onApplyHook={handleApplyHook}
            onApplyPersonaAdjustments={handleApplyPersonaAdjustments}
            grokModel={grokModel}
          />
        )}

        {activeTab === "scheduler" && (
          <MultiChannelScheduler
            personas={personas}
            selectedPersona={selectedPersona}
            onSelectPersona={setSelectedPersona}
            formPayload={formPayload}
            setFormPayload={setFormPayload}
            onScheduleSubmit={handleScheduleSubmit}
            isSubmitting={isSubmittingSchedule}
            lastValidationResult={lastValidationResult}
            appliedFromGrok={appliedFromGrok}
          />
        )}

        {activeTab === "pipeline" && (
          <PipelineVisualizer
            jobs={jobs}
            onRefresh={() => showToast("🔄 Pipeline execution queue refreshed")}
          />
        )}
      </main>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={(key, model) => {
          setApiKey(key);
          setGrokModel(model);
          showToast(`⚡ Model set to ${model}${key ? " with live xAI key" : " (Simulation mode)"}`);
        }}
        currentModel={grokModel}
      />

      {/* Footer */}
      <footer className="border-t border-white/[0.08] bg-[#060911] py-8 text-center text-xs text-slate-500 mt-12">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-left">
            <div className="font-extrabold text-white uppercase tracking-wider text-xs">
              THE GROWTH ENGINE
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5 font-sans">
              AI-engineered performance marketing — turns strangers into compounding viral growth.
            </div>
          </div>
          <div className="flex items-center space-x-3 text-slate-400 font-mono text-[10px] uppercase tracking-wider">
            <span>Next.js 14 App Router</span>
            <span>•</span>
            <span>Grok xAI Engine</span>
            <span>•</span>
            <span>Vercel Edge</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
