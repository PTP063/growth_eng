"use client";

import React, { useState } from "react";
import { X, Key, Shield, Sparkles, Check, AlertCircle, Cpu } from "lucide-react";

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
  const [tempKey, setTempKey] = useState(apiKey);
  const [tempModel, setTempModel] = useState(currentModel);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveApiKey(tempKey.trim(), tempModel);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const handleClear = () => {
    setTempKey("");
    onSaveApiKey("", tempModel);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-indigo-950/50">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-950/60 text-indigo-400">
            <Cpu className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">
              Grok (xAI) Engine Configuration
            </h2>
            <p className="text-xs text-slate-400">
              Configure live xAI API access or utilize the built-in deterministic simulator.
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4 pt-2">
          {/* Notice banner */}
          <div className="rounded-xl border border-indigo-500/20 bg-indigo-950/30 p-3 text-xs text-indigo-200 flex items-start space-x-2">
            <Sparkles className="h-4 w-4 text-indigo-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-indigo-300">Live xAI API / Free Simulation</p>
              <p className="text-[11px] text-slate-300 mt-0.5">
                If you provide your xAI key from <a href="https://console.x.ai" target="_blank" rel="noreferrer" className="underline text-indigo-400 hover:text-indigo-300">console.x.ai</a>, live Grok LLM inference is triggered. If left blank, the app operates flawlessly using high-fidelity deterministic heuristics.
              </p>
            </div>
          </div>

          {/* Model Selection */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Grok Model Architecture
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTempModel("grok-2-latest")}
                className={`rounded-xl border p-3 text-left transition-all ${
                  tempModel === "grok-2-latest"
                    ? "border-indigo-500 bg-indigo-950/40 text-white ring-1 ring-indigo-500"
                    : "border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-300"
                }`}
              >
                <div className="text-xs font-semibold">grok-2-latest</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Flagship reasoning engine</div>
              </button>

              <button
                type="button"
                onClick={() => setTempModel("grok-beta")}
                className={`rounded-xl border p-3 text-left transition-all ${
                  tempModel === "grok-beta"
                    ? "border-indigo-500 bg-indigo-950/40 text-white ring-1 ring-indigo-500"
                    : "border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-300"
                }`}
              >
                <div className="text-xs font-semibold">grok-beta</div>
                <div className="text-[10px] text-slate-400 mt-0.5">High-speed inference</div>
              </button>
            </div>
          </div>

          {/* API Key Input */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-slate-300">
                xAI API Key (Optional)
              </label>
              {tempKey && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-[10px] text-rose-400 hover:underline"
                >
                  Clear Key
                </button>
              )}
            </div>
            <div className="relative">
              <input
                type="password"
                value={tempKey}
                onChange={(e) => setTempKey(e.target.value)}
                placeholder="xai-..."
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
              />
              <Key className="absolute right-3 top-3 h-4 w-4 text-slate-500 pointer-events-none" />
            </div>
            <p className="mt-1 text-[10px] text-slate-500">
              Keys are stored securely in browser session storage and transmitted directly via server headers.
            </p>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-800 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center space-x-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all"
            >
              {savedSuccess ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-300" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Shield className="h-3.5 w-3.5" />
                  <span>Save Configuration</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
