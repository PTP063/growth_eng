"use client";

import React from "react";
import { Sparkles, ArrowRight, Zap, Mail, ShieldCheck } from "lucide-react";

interface CallToActionFooterProps {
  onGetStarted: () => void;
}

export const CallToActionFooter: React.FC<CallToActionFooterProps> = ({
  onGetStarted,
}) => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#060911] text-slate-300">
      {/* Big Final CTA Section from thegrowthengine.net */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="relative rounded-3xl border border-white/[0.1] bg-gradient-to-b from-[#141A2B] via-[#0D111A] to-[#060911] p-8 sm:p-14 text-center overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-1/4 h-64 w-64 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center space-x-2 rounded-full border border-indigo-500/30 bg-indigo-950/60 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-indigo-300">
              <Zap className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
              <span>Scale Your Channel Today</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
              Ready to start <span className="text-gradient-brand">scaling?</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-lg mx-auto">
              Run your video growth with AI across TikTok, Meta, and YouTube so you get compounding retention and lower acquisition costs.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                onClick={onGetStarted}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 rounded-full bg-white text-black px-8 py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-2xl hover:bg-slate-200 transition-all cursor-pointer"
              >
                <Sparkles className="h-4 w-4 text-indigo-600 fill-indigo-600" />
                <span>Launch Live Growth Engine</span>
                <ArrowRight className="h-4 w-4 text-black" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns from thegrowthengine.net */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-14 border-b border-white/[0.08] text-xs">
          <div className="space-y-3">
            <div className="font-extrabold text-white uppercase tracking-wider text-[11px]">
              Platform Modules
            </div>
            <ul className="space-y-2 text-slate-400 font-sans">
              <li><a href="#engine" className="hover:text-white transition-colors">Forensic Retention Audit</a></li>
              <li><a href="#engine" className="hover:text-white transition-colors">Grok Next-Best-Action</a></li>
              <li><a href="#engine" className="hover:text-white transition-colors">Multi-Channel Video Scheduler</a></li>
              <li><a href="#engine" className="hover:text-white transition-colors">Topological Synthesis DAG</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="font-extrabold text-white uppercase tracking-wider text-[11px]">
              Services &amp; Channels
            </div>
            <ul className="space-y-2 text-slate-400 font-sans">
              <li><span className="hover:text-white transition-colors">TikTok FYP Distribution</span></li>
              <li><span className="hover:text-white transition-colors">Instagram Reels Auto-Posting</span></li>
              <li><span className="hover:text-white transition-colors">YouTube Shorts Publishing</span></li>
              <li><span className="hover:text-white transition-colors">AI Persona Voice Cadence</span></li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="font-extrabold text-white uppercase tracking-wider text-[11px]">
              Documentation &amp; Specs
            </div>
            <ul className="space-y-2 text-slate-400 font-sans">
              <li><a href="https://github.com/PTP063/growth_eng" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub Repository</a></li>
              <li><a href="https://github.com/PTP063/growth_eng/blob/main/OSYNTH_ENGINEERING_DEFENSE.md" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Engineering Defense Doc</a></li>
              <li><a href="https://github.com/PTP063/growth_eng/blob/main/README.md" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Architecture Flowchart</a></li>
              <li><span className="hover:text-white transition-colors">Zod API Schema Contracts</span></li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="font-extrabold text-white uppercase tracking-wider text-[11px]">
              The Growth Engine
            </div>
            <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
              AI-powered performance marketing agency &amp; creator technology stack.
            </p>
            <div className="flex items-center space-x-1.5 text-indigo-400 font-mono text-[11px]">
              <Mail className="h-3.5 w-3.5" />
              <span>info@thegrowthengine.net</span>
            </div>
          </div>
        </div>

        {/* Copyright & Engine Signature */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-sans">
          <div>
            © 2026 The Growth Engine. All rights reserved.
          </div>
          <div className="flex items-center space-x-3 font-mono text-[11px]">
            <span>Next.js 14 App Router</span>
            <span>•</span>
            <span>Grok-2 Cognitive Engine</span>
            <span>•</span>
            <span>Vercel Edge</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
