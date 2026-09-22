"use client";

import React, { useState } from "react";
import { Terminal, Copy, Check, ExternalLink, GitBranch, ShieldCheck } from "lucide-react";

interface HeaderMultiplexerProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function HeaderMultiplexer({ activeTab, onTabChange }: HeaderMultiplexerProps) {
  const [copied, setCopied] = useState(false);
  const command = "git clone https://github.com/jebb10/portafolio.git";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <header className="border-b border-basalt-800 bg-basalt-900/90 backdrop-blur sticky top-0 z-40">
      {/* Top Telemetry Strip */}
      <div className="px-4 py-1.5 flex items-center justify-between text-xs font-mono border-b border-basalt-800/60 text-basalt-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-telemetry-live font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-telemetry-live opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-telemetry-live"></span>
            </span>
            HERDR_ENV: 1
          </span>
          <span className="text-basalt-600">|</span>
          <span className="hidden sm:inline">Workspace: johan-benitez/portafolio</span>
          <span className="text-basalt-600 hidden sm:inline">|</span>
          <span className="text-obsidian-accent flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            EU AI Act Art. 14 Verified
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden md:inline text-basalt-400">
            Obsidian Vault: <span className="text-basalt-200">001.4 Portafolio</span>
          </span>
          <a
            href="https://github.com/jebb10"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-basalt-300 hover:text-white transition-colors"
          >
            <GitBranch className="w-3 h-3 text-obsidian-accent" />
            <span>jebb10/portafolio</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-obsidian-glow to-basalt-900 border border-obsidian-accent/40 flex items-center justify-center font-mono font-bold text-obsidian-accent shadow-subtle">
            JB
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white tracking-tight text-base sm:text-lg">Johan Benítez</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-basalt-800 text-obsidian-accent border border-basalt-700">
                Portafolio
              </span>
            </div>
            <p className="text-xs text-basalt-400 hidden sm:block">
              Filosofía (UNAD) × Ingeniería (UniMinuto) × Oracle Agentic AI
            </p>
          </div>
        </div>

        {/* Command Bar (Herdr style) */}
        <div className="hidden lg:flex items-center bg-basalt-950 border border-basalt-800 rounded-md px-3 py-1.5 text-xs font-mono text-basalt-300 max-w-md w-full justify-between shadow-inner">
          <div className="flex items-center gap-2 overflow-hidden truncate">
            <Terminal className="w-3.5 h-3.5 text-obsidian-accent shrink-0" />
            <span className="text-basalt-500">$</span>
            <span className="text-basalt-200 truncate">{command}</span>
          </div>
          <button
            onClick={handleCopy}
            className="ml-2 px-2 py-1 rounded bg-basalt-850 hover:bg-basalt-800 text-basalt-300 hover:text-white border border-basalt-700/80 transition-all flex items-center gap-1 shrink-0"
            title="Copiar comando al portapapeles"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-telemetry-live" />
                <span className="text-[10px] text-telemetry-live font-sans">Copiado</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span className="text-[10px] font-sans">Copiar</span>
              </>
            )}
          </button>
        </div>

        {/* Multiplexer Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-basalt-950 p-1 rounded-lg border border-basalt-800 text-xs font-medium">
          <button
            onClick={() => onTabChange("graph")}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === "graph"
                ? "bg-basalt-850 text-white border border-basalt-700 shadow-sm"
                : "text-basalt-400 hover:text-basalt-200"
            }`}
          >
            Knowledge Graph
          </button>
          <button
            onClick={() => onTabChange("cases")}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === "cases"
                ? "bg-basalt-850 text-white border border-basalt-700 shadow-sm"
                : "text-basalt-400 hover:text-basalt-200"
            }`}
          >
            Casos Tríada
          </button>
          <button
            onClick={() => onTabChange("governance")}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === "governance"
                ? "bg-basalt-850 text-white border border-basalt-700 shadow-sm"
                : "text-basalt-400 hover:text-basalt-200"
            }`}
          >
            Gobernanza HITL
          </button>
          <button
            onClick={() => onTabChange("spec")}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === "spec"
                ? "bg-basalt-850 text-white border border-basalt-700 shadow-sm"
                : "text-basalt-400 hover:text-basalt-200"
            }`}
          >
            ISO 29148 / BABOK
          </button>
        </nav>
      </div>
    </header>
  );
}
