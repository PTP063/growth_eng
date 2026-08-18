"use client";

import React from "react";
import { ArrowRight, Sparkles, Cpu, Github, ExternalLink } from "lucide-react";

interface CallToActionFooterProps {
  onGetStarted: () => void;
}

export const CallToActionFooter: React.FC<CallToActionFooterProps> = ({
  onGetStarted,
}) => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#0a0a0c] text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* Subtle CTA Banner */}
        <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 sm:p-12 text-center overflow-hidden mb-14 backdrop-blur-md">
          <div className="relative z-10 max-w-xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              Scale your video retention with Groq LPU.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-sans">
              Zero-latency diagnosis, 3 high-converting hooks, and multi-channel scheduling engineered for creator teams.
            </p>
            <div className="pt-3">
              <button
                onClick={onGetStarted}
                className="inline-flex items-center space-x-2 rounded-lg bg-white text-black px-5 py-2.5 text-xs font-medium hover:bg-neutral-200 active:scale-[0.98] transition-all cursor-pointer shadow-sm"
              >
                <Sparkles className="h-3.5 w-3.5 text-black" />
                <span>Launch Console Audit</span>
                <ArrowRight className="h-3.5 w-3.5 text-black" />
              </button>
            </div>
          </div>
        </div>

        {/* Directory Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-b border-white/[0.06] text-xs">
          <div className="space-y-2.5">
            <div className="font-semibold text-white uppercase text-[11px] font-mono">
              Engine Modules
            </div>
            <ul className="space-y-2 text-neutral-400 font-sans">
              <li><a href="#engine" className="hover:text-white transition-colors">Retention Forensics</a></li>
              <li><a href="#engine" className="hover:text-white transition-colors">3-Second Drop-off Diagnosis</a></li>
              <li><a href="#engine" className="hover:text-white transition-colors">Multi-Channel Video Studio</a></li>
              <li><a href="#engine" className="hover:text-white transition-colors">Topological Synthesis DAG</a></li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <div className="font-semibold text-white uppercase text-[11px] font-mono">
              Publishing Feeds
            </div>
            <ul className="space-y-2 text-neutral-400 font-sans">
              <li><span className="hover:text-white transition-colors">TikTok FYP 9:16</span></li>
              <li><span className="hover:text-white transition-colors">Instagram Reels</span></li>
              <li><span className="hover:text-white transition-colors">YouTube Shorts</span></li>
              <li><span className="hover:text-white transition-colors">AI Persona Voice Cadence</span></li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <div className="font-semibold text-white uppercase text-[11px] font-mono">
              Resources &amp; Specs
            </div>
            <ul className="space-y-2 text-neutral-400 font-sans">
              <li>
                <a
                  href="https://github.com/PTP063/growth_eng"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1 hover:text-white transition-colors"
                >
                  <Github className="h-3 w-3" />
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/PTP063/growth_eng/blob/main/OSYNTH_ENGINEERING_DEFENSE.md"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Engineering Defense Doc
                </a>
              </li>
              <li>
                <a
                  href="https://console.groq.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1 hover:text-white transition-colors"
                >
                  <span>Groq Cloud Console</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <div className="font-semibold text-white uppercase text-[11px] font-mono">
              Architecture
            </div>
            <p className="text-neutral-400 font-sans text-xs leading-relaxed">
              Built on Next.js 14 App Router, Groq LPU inference, and deterministic Zod runtime contracts.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500 font-mono">
          <div>
            © 2026 Osynth Growth Engine. All rights reserved.
          </div>
          <div className="flex items-center space-x-3 text-[11px]">
            <span>Next.js 14</span>
            <span>•</span>
            <span>Groq LPU (Llama 3.3 70B)</span>
            <span>•</span>
            <span>Vercel Edge</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
