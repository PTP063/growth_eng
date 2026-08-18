<div align="center">

# ⚡ Osynth Growth Engine

### *Autonomous AI-Native Creator Growth & Next-Best-Action Operations Hub*

[![Live on Vercel](https://img.shields.io/badge/Production-Live%20on%20Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://growthengine-three.vercel.app)
[![Next.js 14](https://img.shields.io/badge/Next.js-14.2.35-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Grok xAI](https://img.shields.io/badge/AI_Engine-Grok--2_xAI-4F46E5?style=for-the-badge&logo=openai&logoColor=white)](https://x.ai/)
[![License: MIT](https://img.shields.io/badge/License-MIT-10B981?style=for-the-badge)](LICENSE)

<p align="center">
  <b>Osynth Growth Engine</b> connects short-form UGC synthesis to cross-platform publishing and an automated, cognitive <b>"Performance to Next-Best-Action"</b> recommendation engine powered by <b>xAI Grok-2</b>.
</p>

[✨ Live Production Demo](https://growthengine-three.vercel.app) • [🚀 Deploy on Vercel](#-deployment-to-vercel) • [🛡️ Engineering Defense Doc](./OSYNTH_ENGINEERING_DEFENSE.md) • [📊 Architecture](#-architecture-overview)

---

</div>

## 🌟 Core Feature Matrix

### 1. 📈 Analytics to "Next-Best-Action" Recommendation Engine
- **Viewer Retention Forensics:** Interactive SVG viewer retention curve ($0.0\text{s} - 20.0\text{s}$) plotted against the **60% Viral FYP Threshold**.
- **Drop-off Root Cause Diagnosis:** Grok analyzes drop-off spikes (e.g. at second 2.8) and isolates cognitive friction points.
- **3 High-Converting Hook Variants:** Generates tailored *Curiosity Gap*, *Contrarian Hot-Take*, and *Problem Agitation* hooks with visual camera cue descriptions and expected retention boosts ($+20\text{--}40\%$).
- **Persona Calibrations:** Prescribes exact verbal cadence tweaks (WPM), vocal tone shifts, energy modulation, and camera framing upgrades with 1-click apply.

### 2. 📅 Multi-Channel Content Scheduler & UGC Engine
- **AI Persona Studio:** Calibrate delivery speed from 100 to 240 WPM, configure energy states (*Subtle*, *Conversational*, *High Energy*, *Electrifying*), and adjust framing styles.
- **Cross-Platform Matrix:** Simultaneous publishing orchestration across **TikTok FYP**, **Instagram Reels**, and **YouTube Shorts** with platform constraint validation (9:16 aspect ratios, character limits, hashtag caps).
- **9:16 Live UGC Phone Mockup:** Real-time simulated phone viewport rendering kinetic subtitle overlays, vocal frequency audio waves, persona badges, and channel watermarks.
- **Dynamic Hashtags & CTA Engine:** Real-time tag injection and engagement trigger builder.

### 3. ⚙️ Topological Pipeline Monitor
- **5-Stage Synthesis DAG:** Tracks *Payload Validation* $\rightarrow$ *UGC Prompt Synthesis* $\rightarrow$ *Voice/Avatar Engine* $\rightarrow$ *Dynamic Kinetic Subtitles* $\rightarrow$ *Multi-Channel Staging*.
- **Real-Time Terminal Execution Stream:** Live streaming logs showing timestamped worker events, phoneme alignment progress, and bitrate encoding.

---

## 🏗️ Architecture Overview

### End-to-End System Architecture

```mermaid
flowchart TD
    subgraph Client["🖥️ Next.js 14 Client Layer (React 18 Concurrent)"]
        UI_Analytics["📊 Analytics Dashboard\n(Viewer Retention SVG Curve & 3s Forensics)"]
        UI_Scheduler["📅 Multi-Channel Scheduler\n(Persona Configurator & 9:16 UGC Preview)"]
        UI_Pipeline["⚙️ Pipeline Monitor\n(Topological DAG Stepper & Live Logs)"]
    end

    subgraph Serverless["⚡ Serverless Edge & Node.js Route Handlers"]
        API_Action["POST /api/analytics/next-best-action\n(Zod Schema & Context Sanitization)"]
        API_Schedule["POST /api/schedule/validate\n(Platform Policy Check & Deterministic Job Engine)"]
    end

    subgraph Intelligence["🧠 Grok xAI Cognitive Engine"]
        Grok_API["xAI API (grok-2-latest / grok-beta)\nwith Strict JSON Structured Mode"]
        Fallback["🛡️ Zero-Downtime Deterministic\nHeuristics Fallback Simulator"]
    end

    subgraph PipelineDAG["🚀 Synthesis & Dispatch Execution Graph"]
        Stage1["01: Payload Validation & Contract Check"]
        Stage2["02: UGC Prompt & Framing Synthesis"]
        Stage3["03: Voice & 4K Avatar Render Engine"]
        Stage4["04: Kinetic Subtitles & Audio FX Mastering"]
        Stage5["05: Multi-Channel Dispatch (TikTok / IG / YT)"]
    end

    UI_Analytics -->|"HTTP POST (Telemetry Payload)"| API_Action
    UI_Scheduler -->|"HTTP POST (Scheduler Payload)"| API_Schedule

    API_Action --> Grok_API
    Grok_API -.->|"On Failure / Timeout"| Fallback
    Grok_API -->|"Structured NextBestActionResponse"| UI_Analytics
    Fallback -->|"Heuristic Diagnosis"| UI_Analytics

    API_Schedule -->|"Generates Job ID & DAG"| Stage1
    Stage1 --> Stage2
    Stage2 --> Stage3
    Stage3 --> Stage4
    Stage4 --> Stage5
    Stage5 -->|"Streams Execution Progress"| UI_Pipeline

    UI_Analytics -->|"1-Click Apply Hook & Calibrate Persona"| UI_Scheduler
```

---

### Closed-Loop Creator Operations Workflow

```mermaid
sequenceDiagram
    autonumber
    actor Creator as 👤 Creator / Growth Lead
    participant Dashboard as 📊 Analytics Dashboard
    participant API as ⚡ Next.js Route Handler
    participant Grok as 🧠 Grok xAI Inference Engine
    participant Scheduler as 📅 Multi-Channel Scheduler
    participant Pipeline as ⚙️ DAG Execution Worker

    Creator->>Dashboard: Selects underperforming asset (e.g. 36.2% 3s Retention)
    Creator->>Dashboard: Clicks "Run Grok Performance Audit"
    Dashboard->>API: POST /api/analytics/next-best-action (telemetry + retention curve)
    API->>Grok: Enforces System Prompt & JSON Schema Contract
    Grok-->>API: Returns Bottleneck Diagnosis + 3 Hooks + Persona WPM Tweaks
    API-->>Dashboard: Hydrates Next-Best-Action Card
    Creator->>Dashboard: Clicks "Apply Hook & Calibrate Persona"
    Dashboard->>Scheduler: Injects new hook & syncs WPM cadence to 185 WPM
    Scheduler->>Scheduler: Renders 9:16 live mobile phone synthesis preview
    Creator->>Scheduler: Clicks "Validate & Schedule Pipeline Job"
    Scheduler->>API: POST /api/schedule/validate (TikTok, Reels, Shorts)
    API->>Pipeline: Enqueues 5-stage synthesis job with deterministic ID
    Pipeline-->>Dashboard: Streams real-time render telemetry to Pipeline Monitor
```

---

### 5-Stage Synthesis DAG Execution Flow

```mermaid
graph LR
    A["01: Schema Contract\n& Policy Check (100%)"] --> B["02: Diffusion Prompt\n& Pacing Synthesis (25%)"]
    B --> C["03: Voice Synthesis\n& 4K Avatar Sync (0%)"]
    C --> D["04: Kinetic Captions\n& Sound Drops (0%)"]
    D --> E1["05A: TikTok FYP\n(9:16 Video)"]
    D --> E2["05B: Instagram Reels\n(9:16 Video)"]
    D --> E3["05C: YouTube Shorts\n(9:16 Video)"]

    classDef done fill:#064e3b,stroke:#10b981,stroke-width:2px,color:#fff;
    classDef inprog fill:#1e1b4b,stroke:#6366f1,stroke-width:2px,color:#fff;
    classDef queue fill:#0f172a,stroke:#334155,stroke-width:1px,color:#94a3b8;

    class A done;
    class B inprog;
    class C,D,E1,E2,E3 queue;
```

---

## ⚡ Serverless API Contracts

### `POST /api/analytics/next-best-action`
Executes deep LLM reasoning over post telemetry and returns structured prescription metrics.

#### Request Payload:
```json
{
  "postId": "post_ugc_01",
  "title": "Why 99% of LLM wrappers will die in 6 months",
  "platform": "tiktok",
  "views": 48920,
  "watchTimeSeconds": 11.4,
  "retention3s": 36.2,
  "ctr": 2.1,
  "engagementRate": 4.8,
  "currentHook": "Hey guys, today I want to talk about why most AI startups are making a mistake...",
  "currentHookType": "statement",
  "personaSettings": {
    "name": "Alex V - The AI Maverick",
    "pacingWpm": 145,
    "tone": "Explanatory, casual introduction",
    "energyLevel": "conversational",
    "framing": "Medium shot with static background"
  }
}
```

#### Response:
```json
{
  "status_summary": "Critical front-loaded drop-off detected: Only 36.2% of viewers stayed past 3s...",
  "key_bottleneck": "Opening hook takes 2.8s to establish tension, causing high swipe-away.",
  "severity": "critical",
  "next_best_action": "Deploy a High-Velocity Contrarian Hook with an immediate visual disruption at 0.0s...",
  "improved_hooks": [
    {
      "id": "hook_1",
      "type": "contrarian_take",
      "headline": "The Unpopular Truth Disruptor",
      "openingScript": "Everyone is telling you to optimize your captions, but they're completely wrong...",
      "expectedRetentionBoost": "+32% 3s Retention",
      "visualCue": "Direct eye contact with aggressive camera zoom and bold red underline."
    }
  ],
  "persona_parameter_adjustments": {
    "pacingWpm": { "current": 145, "recommended": 185, "reasoning": "Eliminates dead air..." },
    "tone": { "current": "Explanatory", "recommended": "Urgent and authoritative", "reasoning": "..." },
    "energyLevel": { "current": "conversational", "recommended": "electrifying", "reasoning": "..." },
    "framing": { "current": "Medium shot", "recommended": "Tight dynamic crop with kinetic zooms", "reasoning": "..." }
  },
  "model_used": "Grok (grok-2-latest)",
  "generated_at": "2026-08-18T13:25:00.000Z"
}
```

---

### `POST /api/schedule/validate`
Validates multi-channel schema contracts and initializes deterministic pipeline DAG execution.

#### Request Payload:
```json
{
  "contentTitle": "3 AI Agents That Run an Entire E-Com Store",
  "openingHook": "Stop hiring $3,000/mo agencies: these three open-source agents do the same work in 4 minutes.",
  "scriptContent": "Scene 1: Architecture loop...",
  "personaId": "persona_alex_tech",
  "personaSettings": {
    "name": "Alex V - The AI Maverick",
    "tone": "Fast, authoritative",
    "pacingWpm": 185,
    "energyLevel": "high_energy",
    "framing": "Tight dynamic crop"
  },
  "targetPlatforms": [
    { "channel": "tiktok", "enabled": true, "aspectRatio": "9:16", "autoHashtags": true, "privacy": "public" },
    { "channel": "instagram", "enabled": true, "aspectRatio": "9:16", "autoHashtags": true, "privacy": "public" },
    { "channel": "youtube", "enabled": true, "aspectRatio": "9:16", "autoHashtags": true, "privacy": "public" }
  ],
  "scheduledTimestamp": "2026-08-18T18:00:00.000Z",
  "tags": ["ai", "automation", "growth"],
  "callToAction": "Comment 'AGENT' for the full repo"
}
```

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/PTP063/growth_eng.git
cd growth_eng
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment (Optional)
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your environment variables:
```env
# Optional: Add live xAI Grok API key from https://console.x.ai
# If left blank, the app runs flawlessly using the built-in deterministic AI simulator
XAI_API_KEY=your_xai_api_key_here
GROK_MODEL=grok-2-latest
```

### 4. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🚢 Deployment to Vercel

Deploy instantly to Vercel with zero configuration:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FPTP063%2Fgrowth_eng)

### Manual Deployment:
1. Go to **[vercel.com/new](https://vercel.com/new)**.
2. Select and import **`PTP063/growth_eng`**.
3. Add `XAI_API_KEY` under **Environment Variables** *(optional)*.
4. Click **Deploy**.

---

## 🛡️ Engineering Defense Document

Before pitching to founders or tech leads, review the exhaustive 4-part defense guide:  
👉 **[`OSYNTH_ENGINEERING_DEFENSE.md`](./OSYNTH_ENGINEERING_DEFENSE.md)**

It covers:
- **End-to-End Architectural Deep-Dive:** Schema contracts, edge handlers, and atomic state.
- **Edge Cases & Hardening:** LLM JSON repair, Redis Redlock idempotency, and OAuth2 token refresh queues.
- **Scale & Latency:** SSE streaming, optimistic UI rollbacks, and Kahn's algorithm for DAG cycle prevention.
- **15 Grilling Interview Questions & Senior Model Answers.**

---

## 🛠️ Technology Stack

| Domain | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) | High-performance React framework with serverless edge handlers |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Strict end-to-end type safety |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) | Design system inspired by [thegrowthengine.net](https://thegrowthengine.net/) |
| **AI Reasoning** | [xAI Grok-2](https://x.ai/) | LLM performance diagnosis & high-converting hook generation |
| **Validation** | [Zod](https://zod.dev/) | Edge runtime contract enforcement |
| **Diagrams** | [Mermaid.js](https://mermaid.js.org/) | Visual system architecture & sequence graphs |
| **Icons** | [Lucide React](https://lucide.dev/) | Modern, lightweight UI iconography |
| **Hosting** | [Vercel](https://vercel.com/) | Edge deployment with automatic CI/CD |

---

<div align="center">

Made with ⚡ by the **Osynth Engineering Team**

</div>
