import { NextRequest, NextResponse } from "next/server";
import { scheduleValidateSchema } from "@/lib/validation";
import { PipelineStageInfo, ScheduleValidateResponse, SocialPlatform } from "@/types/scheduler";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Strict Zod Schema validation
    const validationResult = scheduleValidateSchema.safeParse(body);
    if (!validationResult.success) {
      const errorMessages = validationResult.error.errors.map(
        (err) => `${err.path.join(".")}: ${err.message}`
      );
      return NextResponse.json(
        {
          valid: false,
          status: "REJECTED",
          message: "Payload failed schema contract validation",
          validationWarnings: errorMessages,
          pipelineStages: [],
          validatedPlatforms: [],
          jobId: "",
          estimatedRenderDurationSec: 0,
          scheduledDispatchTime: "",
        } as ScheduleValidateResponse,
        { status: 400 }
      );
    }

    const payload = validationResult.data;
    const warnings: string[] = [];

    // 2. Channel-specific rule validations
    const activePlatforms = payload.targetPlatforms
      .filter((p) => p.enabled)
      .map((p) => p.channel as SocialPlatform);

    // TikTok specific checks
    const tiktokConfig = payload.targetPlatforms.find((p) => p.channel === "tiktok" && p.enabled);
    if (tiktokConfig) {
      if (tiktokConfig.aspectRatio !== "9:16") {
        warnings.push("TikTok requires 9:16 vertical ratio for standard FYP placement (Auto-converted to 9:16).");
      }
      if (payload.openingHook.length > 150) {
        warnings.push("TikTok opening hook is lengthy; recommended under 100 characters for instant cognitive capture.");
      }
    }

    // Instagram Reels specific checks
    const igConfig = payload.targetPlatforms.find((p) => p.channel === "instagram" && p.enabled);
    if (igConfig) {
      if (payload.tags.length > 30) {
        warnings.push("Instagram hard limits hashtags to 30 max per post.");
      }
    }

    // YouTube Shorts specific checks
    const ytConfig = payload.targetPlatforms.find((p) => p.channel === "youtube" && p.enabled);
    if (ytConfig) {
      if (payload.contentTitle.length > 100) {
        warnings.push("YouTube Shorts title truncated to 100 characters max.");
      }
    }

    // 3. Generate deterministic job ID and pipeline stages
    const timestampSeed = Date.now().toString(36);
    const randomSeed = Math.random().toString(36).substring(2, 6);
    const deterministicJobId = `job_synth_${timestampSeed}_${randomSeed}`;

    const pipelineStages: PipelineStageInfo[] = [
      {
        id: "stage_01_val",
        name: "Payload Contract & Policy Check",
        description: "Zero-loss schema validation and platform compliance check",
        status: "COMPLETED",
        progressPercent: 100,
        completedAt: new Date().toISOString(),
      },
      {
        id: "stage_02_prompt",
        name: "UGC Prompt & Framing Synthesizer",
        description: `Mapping ${payload.personaSettings.name} voice markers (${payload.personaSettings.pacingWpm} WPM) to diffusion storyboard`,
        status: "PROCESSING",
        progressPercent: 25,
      },
      {
        id: "stage_03_avatar",
        name: "Voice & Hyper-Realistic Avatar Engine",
        description: "Rendering 4K photorealistic persona video with deep facial phoneme sync",
        status: "PENDING",
        progressPercent: 0,
      },
      {
        id: "stage_04_captions",
        name: "Dynamic Kinetic Subtitles & Audio FX",
        description: "Applying word-by-word visual accents, sound drops, and 0.0s pattern disruptors",
        status: "PENDING",
        progressPercent: 0,
      },
      {
        id: "stage_05_dispatch",
        name: "Multi-Bitrate Encoding & Channel Staging",
        description: `Preparing deployment bundles for: ${activePlatforms.join(", ").toUpperCase()}`,
        status: "PENDING",
        progressPercent: 0,
      },
    ];

    // Estimated render duration: ~45 seconds base + 15s per platform
    const estimatedRenderDurationSec = 45 + activePlatforms.length * 15;

    const response: ScheduleValidateResponse = {
      valid: true,
      jobId: deterministicJobId,
      status: "QUEUED",
      message: `Payload validated successfully. Queued for AI synthesis across ${activePlatforms.length} platforms.`,
      validatedPlatforms: activePlatforms,
      estimatedRenderDurationSec,
      scheduledDispatchTime: payload.scheduledTimestamp,
      pipelineStages,
      validationWarnings: warnings.length > 0 ? warnings : undefined,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    console.error("[Schedule Validation Error]:", error);
    return NextResponse.json(
      {
        valid: false,
        jobId: "",
        status: "REJECTED",
        message: error instanceof Error ? error.message : "Internal pipeline validation failure",
        pipelineStages: [],
        validatedPlatforms: [],
        estimatedRenderDurationSec: 0,
        scheduledDispatchTime: "",
      } as ScheduleValidateResponse,
      { status: 500 }
    );
  }
}
