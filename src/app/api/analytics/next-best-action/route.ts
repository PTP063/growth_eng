import { NextRequest, NextResponse } from "next/server";
import { analyticsAnalyzeSchema } from "@/lib/validation";
import { analyzePerformanceWithGroq } from "@/lib/grokClient";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Check optional header or body API key / model override (supporting Groq and legacy headers)
    const userApiKey =
      req.headers.get("x-groq-api-key") ||
      req.headers.get("x-grok-api-key") ||
      body.apiKey;
    const customModel =
      req.headers.get("x-groq-model") ||
      req.headers.get("x-grok-model") ||
      body.model;

    // Strict schema parse
    const parseResult = analyticsAnalyzeSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Invalid request payload",
          details: parseResult.error.errors.map((e) => `${e.path.join(".")}: ${e.message}`),
        },
        { status: 400 }
      );
    }

    const payload = parseResult.data;

    // Execute Groq LPU analysis (live Groq API or high-fidelity deterministic simulator)
    const diagnosis = await analyzePerformanceWithGroq({
      postId: payload.postId,
      title: payload.title,
      platform: payload.platform,
      views: payload.views,
      watchTimeSeconds: payload.watchTimeSeconds,
      retention3s: payload.retention3s,
      ctr: payload.ctr,
      engagementRate: payload.engagementRate,
      currentHook: payload.currentHook,
      currentHookType: payload.currentHookType,
      personaSettings: payload.personaSettings,
      retentionCurve: payload.retentionCurve,
      userApiKey,
      customModel,
    });

    return NextResponse.json(diagnosis, { status: 200 });
  } catch (error: unknown) {
    console.error("[Analytics Next-Best-Action Error]:", error);
    return NextResponse.json(
      {
        error: "Failed to generate AI next-best-action diagnosis",
        message: error instanceof Error ? error.message : "Internal engine error",
      },
      { status: 500 }
    );
  }
}
