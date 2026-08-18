<div align="center">

# ⚡ Osynth Growth Engine

### *Autonomous AI-Native Creator Growth & Next-Best-Action Operations Hub*

[![Live on Vercel](https://img.shields.io/badge/Production-Live%20on%20Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://growthengine-three.vercel.app)
[![Next.js 14](https://img.shields.io/badge/Next.js-14.2.35-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Groq LPU](https://img.shields.io/badge/AI_Engine-Groq_LPU_(Llama_3.3_70B)-F05A28?style=for-the-badge&logo=fastapi&logoColor=white)](https://groq.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-10B981?style=for-the-badge)](LICENSE)

<p align="center">
  <b>Osynth Growth Engine</b> turns short-form video analytics into compounding viral growth. It analyzes viewer drop-offs, generates high-converting opening hooks using ultra-fast <b>Groq LPU inference</b> (Llama 3.3 70B), and publishes across TikTok, Instagram Reels, and YouTube Shorts with 1 click.
</p>

[✨ Live Production App](https://growthengine-three.vercel.app) • [🚀 Deploy on Vercel](#-deployment-to-vercel) • [🛡️ Engineering Defense Doc](./OSYNTH_ENGINEERING_DEFENSE.md) • [📊 How It Works](#-how-it-works-in-3-simple-steps)

---

</div>

## 💡 How It Works (In 3 Simple Steps)

```mermaid
flowchart LR
    A["📊 1. Detect Drop-offs\nTrack 3s viewer retention"] --> B["🧠 2. Groq AI Diagnosis\nFind root cause & write 3 hooks"]
    B --> C["⚡ 3. 1-Click Apply\nSync viral hook & voice pacing"]
    C --> D["🚀 4. Multi-Channel Publish\nTikTok • Instagram • YouTube"]

    classDef step fill:#111114,stroke:#3f3f46,stroke-width:1.5px,color:#fff;
    classDef highlight fill:#18181b,stroke:#a1a1aa,stroke-width:1.5px,color:#fff;
    classDef success fill:#09090b,stroke:#10b981,stroke-width:1.5px,color:#fff;

    class A,B step;
    class C highlight;
    class D success;
```

| Step | What Happens | The Benefit |
| :--- | :--- | :--- |
| **01. Audit** | Analyzes second-by-second drop-off curve against the 60% viral benchmark | Pinpoints the exact second viewers lose interest |
| **02. Fix Hook** | Groq LPU writes 3 pattern-interrupt opening hooks (*Curiosity Gap*, *Contrarian*, *Problem*) in ~250ms | Replaces weak intros with high-converting hooks |
| **03. Publish** | 1-Click transfers new hook & pacing to multi-channel scheduler | Instantly stages for TikTok, Instagram Reels & YouTube Shorts |

---

## 🌟 Core Features

### 1. 📈 Performance & Next-Best-Action
- **Drop-off Forensics:** Interactive retention chart ($0.0\text{s} - 20.0\text{s}$) with the 60% viral benchmark.
- **AI Root Cause Diagnosis:** Explains why viewers swiped away within 3 seconds.
- **3 Tailored Hook Variants:** Generated with camera visual cues and expected retention boost ($+20\text{--}40\%$).
- **Persona Calibrations:** Recommended pacing (WPM), voice tone, and framing tweaks.

### 2. 📅 Multi-Channel Content Scheduler
- **Voice Cadence Studio:** Adjust speech speed from 100 to 240 WPM with real-time audio wave feedback.
- **Live 9:16 Mobile Mockup:** Authentic phone bezel rendering kinetic subtitles, TikTok UI overlay, and channel watermarks.
- **Multi-Platform Staging:** Simultaneous scheduling for **TikTok**, **Instagram Reels**, and **YouTube Shorts**.

### 3. ⚙️ Live Pipeline Execution Monitor
- **5-Stage Step Progress:** Payload Validation $\rightarrow$ UGC Prompt Synthesis $\rightarrow$ Voice & Avatar $\rightarrow$ Subtitles $\rightarrow$ Multi-Channel Dispatch.
- **Real-Time Terminal Logs:** Live worker status and synthesis stream.

---

## ⚡ API Endpoints (Quick Reference)

- **`POST /api/analytics/next-best-action`**: Pass post stats $\rightarrow$ Returns Groq diagnosis, 3 hooks, and persona adjustments.
- **`POST /api/schedule/validate`**: Pass video script & platforms $\rightarrow$ Validates constraints and generates deterministic job ID.

---

## 🚀 Quickstart

### 1. Clone & Install
```bash
git clone https://github.com/PTP063/growth_eng.git
cd growth_eng
npm install
```

### 2. Run Locally
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)**.

*(Optional: Add `GROQ_API_KEY` from [https://console.groq.com/keys](https://console.groq.com/keys) in `.env.local` for live LPU inference, or use the built-in deterministic simulator without any keys!)*

---

## 🚢 Deployment to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FPTP063%2Fgrowth_eng)

Live URL: **[https://growthengine-three.vercel.app](https://growthengine-three.vercel.app)**

---


<div align="center">

Made with ⚡ by the Prateek

</div>
