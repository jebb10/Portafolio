"use client";

import React from "react";
import { FolderGit2, Cpu, Activity, Sparkles, BookOpen, Layers } from "lucide-react";
import { SPACES_DATA } from "@/lib/data/spacesData";
import { AGENTS_TELEMETRY } from "@/lib/data/agentsData";

interface HerdrSidebarProps {
  selectedSpaceId: string | null;
  onSelectSpace: (spaceId: string | null) => void;
  onSelectAgentNode?: (agentId: string) => void;
}

export function HerdrSidebar({
  selectedSpaceId,
  onSelectSpace,
  onSelectAgentNode,
}: HerdrSidebarProps) {
  return (
    <aside className="w-full md:w-64 lg:w-72 border-r border-basalt-800 bg-basalt-900 flex flex-col shrink-0">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-basalt-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-obsidian-accent" />
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-basalt-300">
            Workspaces & Telemetry
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-basalt-800 text-basalt-400 border border-basalt-700">
          4 SPACES
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-6">
        {/* SPACES SECTION */}
        <div>
          <div className="px-2 mb-2 flex items-center justify-between text-xs font-mono text-basalt-400">
            <span className="flex items-center gap-1.5 font-medium text-basalt-300">
              <FolderGit2 className="w-3.5 h-3.5 text-obsidian-accent" />
              Vault Spaces (001)
            </span>
            <span className="text-[10px] text-basalt-500">Obsidian</span>
          </div>

          <div className="space-y-1">
            {SPACES_DATA.map((space) => {
              const isSelected = selectedSpaceId === space.id;
              return (
                <button
                  key={space.id}
                  onClick={() => onSelectSpace(isSelected ? null : space.id)}
                  className={`w-full text-left p-2.5 rounded-lg border transition-all ${
                    isSelected
                      ? "bg-basalt-800/90 border-obsidian-accent/60 shadow-sm"
                      : "bg-basalt-950/60 hover:bg-basalt-850/80 border-basalt-800/80 hover:border-basalt-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-semibold text-white flex items-center gap-1.5">
                      <span className="text-obsidian-accent text-[11px]">{space.code}</span>
                      <span className="truncate">{space.name}</span>
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-basalt-900 text-basalt-400 border border-basalt-800 shrink-0">
                      {space.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-basalt-400 line-clamp-2 leading-relaxed">
                    {space.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* AGENTS SECTION */}
        <div>
          <div className="px-2 mb-2 flex items-center justify-between text-xs font-mono text-basalt-400">
            <span className="flex items-center gap-1.5 font-medium text-basalt-300">
              <Cpu className="w-3.5 h-3.5 text-telemetry-live" />
              Herdr Agents (Live)
            </span>
            <span className="text-[10px] text-telemetry-live font-medium">HERDR_ENV</span>
          </div>

          <div className="space-y-1.5">
            {AGENTS_TELEMETRY.map((agent) => (
              <div
                key={agent.id}
                onClick={() => onSelectAgentNode?.(agent.id)}
                className="p-2.5 rounded-lg bg-basalt-950/60 border border-basalt-800 hover:border-basalt-700 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      {agent.status === "working" ? (
                        <>
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-telemetry-live opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-telemetry-live"></span>
                        </>
                      ) : agent.status === "mature" ? (
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-obsidian-accent"></span>
                      ) : (
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-basalt-500"></span>
                      )}
                    </span>
                    <span className="font-mono text-xs font-medium text-basalt-200 group-hover:text-white transition-colors">
                      {agent.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-basalt-400 bg-basalt-900 px-1 rounded">
                    {agent.paneId}
                  </span>
                </div>
                <p className="text-[10px] font-mono text-obsidian-accent/90 truncate mb-1">
                  {agent.role}
                </p>
                <p className="text-[11px] text-basalt-400 line-clamp-1 italic">
                  "{agent.lastAction}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* METRICS & PHILOSOPHY SUMMARY CARD */}
        <div className="p-3 rounded-lg bg-gradient-to-b from-basalt-850 to-basalt-950 border border-basalt-800">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-white mb-2">
            <Sparkles className="w-3.5 h-3.5 text-obsidian-accent" />
            <span>Axioma Arquitectural</span>
          </div>
          <p className="text-[11px] text-basalt-300 italic mb-3 leading-relaxed">
            "Filosofía como modo de apreciación e Ingeniería como modo de interacción."
          </p>
          <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono pt-2 border-t border-basalt-800/80">
            <div className="bg-basalt-900/80 p-1.5 rounded border border-basalt-800">
              <span className="block text-white font-bold">0</span>
              <span className="text-[9px] text-basalt-400">Islas Huérfanas</span>
            </div>
            <div className="bg-basalt-900/80 p-1.5 rounded border border-basalt-800">
              <span className="block text-telemetry-live font-bold">+500</span>
              <span className="text-[9px] text-basalt-400">Transmittals/Día</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
