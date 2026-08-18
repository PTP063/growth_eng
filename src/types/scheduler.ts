export type SocialPlatform = "tiktok" | "instagram" | "youtube";

export interface PersonaProfile {
  id: string;
  name: string;
  avatarUrl: string;
  niche: string;
  defaultTone: string;
  pacingWpm: number;
  energyLevel: "subtle" | "conversational" | "high_energy" | "electrifying";
  framingStyle: string;
  voiceStyle: string;
}

export interface PlatformConfig {
  channel: SocialPlatform;
  enabled: boolean;
  aspectRatio: "9:16" | "1:1" | "16:9";
  captionOverride?: string;
  firstCommentCta?: string;
  autoHashtags: boolean;
  privacy: "public" | "unlisted" | "private";
}

export interface SchedulerPayload {
  contentTitle: string;
  openingHook: string;
  scriptContent: string;
  personaId: string;
  personaSettings: {
    name: string;
    tone: string;
    pacingWpm: number;
    energyLevel: "subtle" | "conversational" | "high_energy" | "electrifying";
    framing: string;
  };
  targetPlatforms: PlatformConfig[];
  scheduledTimestamp: string;
  tags: string[];
  callToAction: string;
}

export type PipelineStage =
  | "PAYLOAD_VALIDATED"
  | "UGC_PROMPT_SYNTHESIS"
  | "VOICE_AVATAR_RENDER"
  | "DYNAMIC_SUBTITLES"
  | "CROSS_PLATFORM_ENCODE"
  | "DISPATCH_SCHEDULED";

export type PipelineStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";

export interface PipelineStageInfo {
  id: string;
  name: string;
  description: string;
  status: PipelineStatus;
  progressPercent: number;
  completedAt?: string;
  error?: string;
}

export interface ScheduledJob {
  jobId: string;
  payload: SchedulerPayload;
  status: "QUEUED" | "PROCESSING" | "READY" | "DISPATCHED" | "ERROR";
  createdAt: string;
  scheduledFor: string;
  stages: PipelineStageInfo[];
  generatedPreviewUrl?: string;
  channelResults?: {
    platform: SocialPlatform;
    targetSlot: string;
    status: "CONFIRMED" | "QUEUED";
  }[];
}

export interface ScheduleValidateResponse {
  valid: boolean;
  jobId: string;
  status: "QUEUED" | "PROCESSING" | "REJECTED";
  message: string;
  validatedPlatforms: SocialPlatform[];
  estimatedRenderDurationSec: number;
  scheduledDispatchTime: string;
  pipelineStages: PipelineStageInfo[];
  validationWarnings?: string[];
}
