"use client";

import React, { useState, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { StepProcessSection } from "@/components/StepProcessSection";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { MultiChannelScheduler } from "@/components/MultiChannelScheduler";
import { PipelineVisualizer } from "@/components/PipelineVisualizer";
import { CallToActionFooter } from "@/components/CallToActionFooter";
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

  // Reference to scroll to interactive engine
  const engineRef = useRef<HTMLDivElement>(null);

  const scrollToEngine = (tab?: "analytics" | "scheduler" | "pipeline") => {
    if (tab) setActiveTab(tab);
    engineRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
    scrollToEngine("scheduler");
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

        setTimeout(() => {
          setActiveTab("pipeline");
          scrollToEngine("pipeline");
        }, 1000);
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
    <div className="min-h-screen bg-[#060911] text-slate-100 flex flex-col selection:bg-indigo-600 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 rounded-2xl border border-indigo-500/40 bg-[#0D111A]/95 px-4 py-3 text-xs font-bold text-white shadow-2xl shadow-indigo-950 backdrop-blur-md animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          scrollToEngine(tab);
        }}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        hasCustomKey={Boolean(apiKey && apiKey.length > 5)}
        grokModel={grokModel}
        activeJobsCount={jobs.filter((j) => j.status === "PROCESSING" || j.status === "QUEUED").length}
      />

      {/* Section 1: Hero Section (The Growth Engine Design) */}
      <HeroSection
        onExploreEngine={() => scrollToEngine("analytics")}
        onRunAudit={() => {
          scrollToEngine("analytics");
          handleRunDiagnosis(selectedPost);
        }}
      />

      {/* Section 2: 4-Pillar Features Grid */}
      <FeaturesGrid
        onSelectFeature={(tab) => {
          setActiveTab(tab);
          scrollToEngine(tab);
        }}
      />

      {/* Section 3: 3-Step Process Section */}
      <StepProcessSection
        onSelectStep={(tab) => {
          setActiveTab(tab);
          scrollToEngine(tab);
        }}
      />

      {/* Section 4: Interactive Command Center / Live Engine */}
      <div id="engine" ref={engineRef} className="py-16 md:py-24 border-t border-white/[0.08] bg-[#060911]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header with Navigation Pills */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest mb-1">
                // COMMAND CENTER WORKSPACE
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
                Live AI Growth Engine
              </h2>
            </div>

            {/* Quick Engine Tabs */}
            <div className="flex items-center rounded-2xl border border-white/[0.08] bg-[#0D111A] p-1.5 backdrop-blur-md">
              <button
                onClick={() => setActiveTab("analytics")}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === "analytics"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                01 — Analytics
              </button>
              <button
                onClick={() => setActiveTab("scheduler")}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === "scheduler"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                02 — Scheduler
              </button>
              <button
                onClick={() => setActiveTab("pipeline")}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === "pipeline"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                03 — Pipeline ({jobs.length})
              </button>
            </div>
          </div>

          {/* Tab 1: Performance Analytics */}
          {activeTab === "analytics" && (
            <AnalyticsDashboard
              posts={posts}
              selectedPost={selectedPost}
              onSelectPost={(p) => setSelectedPost(p)}
              diagnosis={diagnosisMap[selectedPost.id] || null}
              isLoadingDiagnosis={isLoadingDiagnosis}
              onRunDiagnosis={handleRunDiagnosis}
              onApplyHook={handleApplyHook}
              onApplyPersonaAdjustments={handleApplyPersonaAdjustments}
              grokModel={grokModel}
            />
          )}

          {/* Tab 2: Multi-Channel Scheduler */}
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

          {/* Tab 3: Pipeline Execution Monitor */}
          {activeTab === "pipeline" && (
            <PipelineVisualizer
              jobs={jobs}
              onRefresh={() => showToast("🔄 Pipeline execution queue refreshed")}
            />
          )}
        </div>
      </div>

      {/* Section 5: Call to Action & Footer */}
      <CallToActionFooter onGetStarted={() => scrollToEngine("analytics")} />

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
    </div>
  );
}
