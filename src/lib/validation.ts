import { z } from "zod";

export const platformConfigSchema = z.object({
  channel: z.enum(["tiktok", "instagram", "youtube"]),
  enabled: z.boolean(),
  aspectRatio: z.enum(["9:16", "1:1", "16:9"]).default("9:16"),
  captionOverride: z.string().max(2200).optional(),
  firstCommentCta: z.string().max(500).optional(),
  autoHashtags: z.boolean().default(true),
  privacy: z.enum(["public", "unlisted", "private"]).default("public"),
});

export const personaSettingsSchema = z.object({
  name: z.string().min(1, "Persona name is required"),
  tone: z.string().min(1, "Persona tone is required"),
  pacingWpm: z.number().min(80).max(300),
  energyLevel: z.enum(["subtle", "conversational", "high_energy", "electrifying"]),
  framing: z.string().min(1, "Framing description is required"),
});

export const scheduleValidateSchema = z.object({
  contentTitle: z.string().min(3, "Title must be at least 3 characters").max(120),
  openingHook: z.string().min(5, "Opening hook is critical for short-form retention (min 5 chars)").max(250),
  scriptContent: z.string().min(10, "Script content is required (min 10 chars)"),
  personaId: z.string().default("persona_default"),
  personaSettings: personaSettingsSchema,
  targetPlatforms: z.array(platformConfigSchema).refine(
    (platforms) => platforms.some((p) => p.enabled),
    "At least one target platform (TikTok, Instagram Reels, or YouTube Shorts) must be selected"
  ),
  scheduledTimestamp: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid timestamp format",
  }),
  tags: z.array(z.string()).default([]),
  callToAction: z.string().max(200).default("Follow for more high-leverage growth tactics"),
});

export const analyticsAnalyzeSchema = z.object({
  postId: z.string(),
  title: z.string(),
  platform: z.enum(["tiktok", "instagram", "youtube"]),
  views: z.number().nonnegative(),
  watchTimeSeconds: z.number().nonnegative(),
  retention3s: z.number().min(0).max(100),
  ctr: z.number().min(0).max(100),
  engagementRate: z.number().min(0).max(100),
  currentHook: z.string().min(1),
  currentHookType: z.enum(["question", "statement", "shock_value", "story"]),
  personaSettings: personaSettingsSchema,
  retentionCurve: z.array(
    z.object({
      second: z.number(),
      retentionRate: z.number(),
      note: z.string().optional(),
      isDropoffSpike: z.boolean().optional(),
    })
  ).optional(),
});
