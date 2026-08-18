"use client";

import React, { useState } from "react";
import { X, Key, Check, Zap, ExternalLink, Cpu } from "lucide-react";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSaveApiKey: (key: string, model: string) => void;
  currentModel: string;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  apiKey,
  onSaveApiKey,
  currentModel,
}) => {
  const [inputKey, setInputKey] = useState(apiKey);
  const [selectedModel, setSelectedModel] = useState(currentModel || "llama-3.3-70b-versatile");
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveApiKey(inputKey.trim(), selectedModel);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const handleClear = () => {
    setInputKey("");
    onSaveApiKey("", "llama-3.3-70b-versatile");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl border border-white/[0.08] bg-[#0c0c0f] p-6 shadow-[0_0_50px_-12px_rgba(0,0,0,0.9)] text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
          <div className="flex items-center space-x-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.04]">
              <Cpu className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-tight">
                Groq LPU Engine Configuration
              </h3>
              <p className="text-[11px] text-neutral-400 font-mono">
                Ultra-fast inference (LPU)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 pt-4">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 text-xs text-neutral-300">
            <div className="flex items-center justify-between font-medium text-white mb-1">
              <span>Groq Cloud API Key</span>
              <a
                href="https://console.groq.com/keys"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 text-[11px] text-neutral-400 hover:text-white transition-colors"
              >
                <span>Get Free Key</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              If left blank, Osynth runs with zero latency using the built-in deterministic AI performance simulator.
            </p>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5">
              Groq API Key (gsk_...)
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500" />
              <input
                type="password"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder="gsk_xxxxxxxxxxxxxxxxxxxxxx"
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] pl-9 pr-3 py-2 text-xs font-mono text-white placeholder-neutral-600 focus:border-white/[0.25] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5">
              Inference Model
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full rounded-xl border border-white/[0.08] bg-[#111115] px-3 py-2 text-xs font-mono text-white focus:border-white/[0.25] focus:outline-none transition-colors cursor-pointer"
            >
              <option value="llama-3.3-70b-versatile">
                Llama 3.3 70B Versatile (Recommended • Highest Quality)
              </option>
              <option value="llama-3.1-8b-instant">
                Llama 3.1 8B Instant (Sub-100ms Ultra-Fast)
              </option>
              <option value="mixtral-8x7b-32768">
                Mixtral 8x7B 32k (High Context Window)
              </option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
          <button
            onClick={handleClear}
            className="text-[11px] font-mono text-neutral-400 hover:text-rose-400 transition-colors"
          >
            Clear Key (Use Simulator)
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-neutral-300 hover:bg-white/[0.08] hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center space-x-1.5 rounded-lg bg-white px-4 py-1.5 text-xs font-medium text-black hover:bg-neutral-200 active:scale-[0.98] transition-all"
            >
              {savedSuccess ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Saved</span>
                </>
              ) : (
                <>
                  <Zap className="h-3.5 w-3.5 fill-black" />
                  <span>Save Engine</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
