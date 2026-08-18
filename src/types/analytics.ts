export interface RetentionDataPoint {
  second: number;
  retentionRate: number; // 0 to 100
  note?: string;
  isDropoffSpike?: boolean;
}

export interface PostPerformance {
  id: string;
  title: string;
  platform: "tiktok" | "instagram" | "youtube";
  thumbnailUrl: string;
  publishedAt: string;
  views: number;
  watchTimeSeconds: number;
  retention3s: number; // percentage (e.g. 42%)
  ctr: number; // click through rate percentage (e.g. 2.8%)
  engagementRate: number; // percentage (e.g. 6.4%)
  currentHook: string;
  currentHookType: "question" | "statement" | "shock_value" | "story";
  retentionCurve: RetentionDataPoint[];
  personaSettings: {
    name: string;
    pacingWpm: number;
    tone: string;
    energyLevel: "subtle" | "conversational" | "high_energy" | "electrifying";
    framing: string;
  };
}

export interface ImprovedHookVariant {
  id: string;
  type: "curiosity_gap" | "contrarian_take" | "problem_agitation" | "story_cliffhanger";
  headline: string;
  openingScript: string;
  expectedRetentionBoost: string;
  visualCue: string;
  applied?: boolean;
}

export interface PersonaParameterAdjustments {
  pacingWpm: {
    current: number;
    recommended: number;
    reasoning: string;
  };
  tone: {
    current: string;
    recommended: string;
    reasoning: string;
  };
  energyLevel: {
    current: string;
    recommended: "subtle" | "conversational" | "high_energy" | "electrifying";
    reasoning: string;
  };
  framing: {
    current: string;
    recommended: string;
    reasoning: string;
  };
}

export interface NextBestActionResponse {
  status_summary: string;
  key_bottleneck: string;
  severity: "critical" | "warning" | "optimized";
  next_best_action: string;
  improved_hooks: ImprovedHookVariant[];
  persona_parameter_adjustments: PersonaParameterAdjustments;
  model_used: string;
  generated_at: string;
}
