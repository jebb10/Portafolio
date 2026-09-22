"use client";

import React, { useState } from "react";
import { EARS_REQUIREMENTS } from "@/lib/data/isoSpecData";
import { EarsRequirement } from "@/types";
import { BookOpen, CheckCircle, ShieldAlert, Zap, Layers, Sparkles } from "lucide-react";

export function IsoSpecificationViewer() {
  const [selectedType, setSelectedType] = useState<string>("all");

  const filtered =
    selectedType === "all"
      ? EARS_REQUIREMENTS
      : EARS_REQUIREMENTS.filter((r) => r.type === selectedType);

  const getTypeBadge = (type: EarsRequirement["type"]) => {
    switch (type) {
      case "ubiquitous":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-950 text-sky-400 border border-sky-800">Ubiquitous</span>;
      case "event-driven":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800">Event-Driven</span>;
      case "state-driven":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-950 text-amber-400 border border-amber-800">State-Driven</span>;
      case "unwanted-behavior":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-950 text-rose-400 border border-rose-800">Unwanted-Behavior</span>;
    }
  };

  return (
    <section className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Section Header */}
      <div className="space-y-2 border-b border-basalt-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-sky-400 uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Ingeniería de Requerimientos Formales: ISO/IEC/IEEE 29148:2018</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Especificación de Requerimientos de Software (SRS) & EARS
        </h1>
        <p className="text-sm text-basalt-400 max-w-3xl leading-relaxed">
          Requerimientos formulados bajo la sintaxis rigurosa Easy Approach to Requirements Syntax (EARS) y vinculados
          a las 5 Historias de Usuario BABOK v3 estructuradas en 11 secciones.
        </p>
      </div>

      {/* Syntax Guide Box */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-lg border border-basalt-800 bg-basalt-900 space-y-1">
          <span className="text-[10px] font-mono uppercase text-sky-400 font-bold block">1. Ubiquitous</span>
          <p className="text-xs font-mono text-basalt-200">The system shall &lt;action&gt;</p>
          <p className="text-[11px] text-basalt-400">Requerimientos siempre activos e invariantes del sistema.</p>
        </div>
        <div className="p-3.5 rounded-lg border border-basalt-800 bg-basalt-900 space-y-1">
          <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">2. Event-Driven</span>
          <p className="text-xs font-mono text-basalt-200">WHEN &lt;trigger&gt;, the system shall...</p>
          <p className="text-[11px] text-basalt-400">Desencadenados por eventos discretos de usuario o API.</p>
        </div>
        <div className="p-3.5 rounded-lg border border-basalt-800 bg-basalt-900 space-y-1">
          <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">3. State-Driven</span>
          <p className="text-xs font-mono text-basalt-200">WHILE &lt;state&gt;, the system shall...</p>
          <p className="text-[11px] text-basalt-400">Activos únicamente mientras persista un estado específico.</p>
        </div>
        <div className="p-3.5 rounded-lg border border-basalt-800 bg-basalt-900 space-y-1">
          <span className="text-[10px] font-mono uppercase text-rose-400 font-bold block">4. Unwanted-Behavior</span>
          <p className="text-xs font-mono text-basalt-200">IF &lt;error&gt;, THEN the system shall...</p>
          <p className="text-[11px] text-basalt-400">Tratamiento determinista de excepciones y casos límite.</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-basalt-800 pb-3 text-xs font-mono">
        <span className="text-basalt-500 mr-2">Filtrar por sintaxis:</span>
        {["all", "ubiquitous", "event-driven", "state-driven", "unwanted-behavior"].map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-2.5 py-1 rounded capitalize transition-all ${
              selectedType === type
                ? "bg-basalt-800 text-white font-medium border border-basalt-700"
                : "text-basalt-400 hover:text-white"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Requirements List */}
      <div className="space-y-4">
        {filtered.map((req) => (
          <div
            key={req.id}
            className="p-5 rounded-xl border border-basalt-800 bg-basalt-900 space-y-3 shadow-panel"
          >
            <div className="flex items-center justify-between gap-2 border-b border-basalt-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-white">{req.id}</span>
                {getTypeBadge(req.type)}
              </div>
              <span className="text-[10px] font-mono text-basalt-500">ISO/IEC/IEEE 29148:2018</span>
            </div>

            <div className="p-3 rounded-lg bg-basalt-950 border border-basalt-850 font-mono text-xs text-white leading-relaxed">
              "{req.statement}"
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-basalt-950/50 p-2.5 rounded border border-basalt-850">
                <span className="text-[10px] font-mono text-basalt-500 block mb-0.5">Racional Epistémico / Negocio:</span>
                <p className="text-basalt-300">{req.rationale}</p>
              </div>
              <div className="bg-basalt-950/50 p-2.5 rounded border border-basalt-850">
                <span className="text-[10px] font-mono text-telemetry-live block mb-0.5">Criterio de Verificación:</span>
                <p className="text-basalt-300">{req.verification}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
