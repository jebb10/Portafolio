"use client";

import React, { useState } from "react";
import { HITL_POLICIES } from "@/lib/data/governanceData";
import { HitlPolicy, HitlDecisionMode } from "@/types";
import { ShieldCheck, AlertTriangle, XCircle, CheckCircle, Play, Sparkles, Terminal } from "lucide-react";

export function HitlMatrixSimulator() {
  const [filterMode, setFilterMode] = useState<HitlDecisionMode | "ALL">("ALL");
  const [simulatedAction, setSimulatedAction] = useState<string>("");
  const [simulationResult, setSimulationResult] = useState<{
    mode: HitlDecisionMode;
    decision: string;
    standard: string;
    rationale: string;
  } | null>(null);

  const filteredPolicies =
    filterMode === "ALL"
      ? HITL_POLICIES
      : HITL_POLICIES.filter((p) => p.mode === filterMode);

  const handleSimulate = (actionText: string) => {
    const text = actionText.toLowerCase();
    if (text.includes("drop") || text.includes("reset --hard") || text.includes("rm -rf") || text.includes("purge")) {
      setSimulationResult({
        mode: "MUST_NEVER",
        decision: "BLOQUEADO CATEGÓRICAMENTE (Guardrail Activo)",
        standard: "NIST AI RMF GOVERN 1.2 & GDPR Art. 17",
        rationale: "Acción destructiva irreversible prohibida por diseño para cualquier agente autónomo.",
      });
    } else if (text.includes("db") || text.includes("push") || text.includes("deploy") || text.includes("migracion") || text.includes("esquema")) {
      setSimulationResult({
        mode: "MUST_ASK",
        decision: "PAUSA EN ESPERA DE CONFIRMACIÓN HUMANA (HITL)",
        standard: "EU AI Act Art. 14 (Supervisión Humana Obligatoria)",
        rationale: "La mutación tiene impacto en persistencia o despliegue productivo. Requiere consentimiento explícito.",
      });
    } else {
      setSimulationResult({
        mode: "MAY_ACT",
        decision: "AUTORIZADO PARA EJECUCIÓN AUTÓNOMA",
        standard: "EU AI Act Art. 13 (Transparencia & Low Risk)",
        rationale: "Operación idempotente dentro del workspace local de desarrollo o lectura de contexto.",
      });
    }
  };

  const getModeBadge = (mode: HitlDecisionMode) => {
    switch (mode) {
      case "MAY_ACT":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
            <CheckCircle className="w-3 h-3" />
            MAY ACT
          </span>
        );
      case "MUST_ASK":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950 text-amber-400 border border-amber-800">
            <AlertTriangle className="w-3 h-3" />
            MUST ASK
          </span>
        );
      case "MUST_NEVER":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-950 text-rose-400 border border-rose-800">
            <XCircle className="w-3 h-3" />
            MUST NEVER
          </span>
        );
    }
  };

  return (
    <section className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Section Header */}
      <div className="space-y-2 border-b border-basalt-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-telemetry-live uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Cumplimiento Regulatorio: EU AI Act Art. 14 & NIST AI RMF</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Matriz de Gobernanza & Supervisión Humana (HITL)
        </h1>
        <p className="text-sm text-basalt-400 max-w-3xl leading-relaxed">
          Diseño formal de barreras de contención y autorización para agentes autónomos.
          Garantiza que la delegación algorítmica preserve la soberanía decisional humana y la trazabilidad auditable.
        </p>
      </div>

      {/* Interactive Simulator Box */}
      <div className="rounded-xl border border-basalt-800 bg-basalt-900 p-5 sm:p-6 space-y-4 shadow-panel">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-obsidian-accent" />
          <h2 className="text-base font-semibold text-white">Simulador de Decisión en Tiempo de Ejecución</h2>
        </div>
        <p className="text-xs text-basalt-400">
          Ingresa una acción propuesta o haz clic en los ejemplos para evaluar su autorización bajo las políticas activas:
        </p>

        <div className="flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => {
              setSimulatedAction("Leer notas de Obsidian para generar plan de arquitectura");
              handleSimulate("Leer notas de Obsidian para generar plan de arquitectura");
            }}
            className="px-2.5 py-1 rounded bg-basalt-950 border border-basalt-800 hover:border-basalt-700 text-basalt-300 font-mono text-[11px]"
          >
            Ejemplo 1: Lectura de Contexto
          </button>
          <button
            onClick={() => {
              setSimulatedAction("Ejecutar migración DDL en Supabase PostgreSQL");
              handleSimulate("Ejecutar migración DDL en Supabase PostgreSQL");
            }}
            className="px-2.5 py-1 rounded bg-basalt-950 border border-basalt-800 hover:border-basalt-700 text-basalt-300 font-mono text-[11px]"
          >
            Ejemplo 2: Modificar Esquema DB
          </button>
          <button
            onClick={() => {
              setSimulatedAction("git reset --hard y borrado de base de datos");
              handleSimulate("git reset --hard y borrado de base de datos");
            }}
            className="px-2.5 py-1 rounded bg-basalt-950 border border-basalt-800 hover:border-basalt-700 text-basalt-300 font-mono text-[11px]"
          >
            Ejemplo 3: Comando Destructivo
          </button>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={simulatedAction}
            onChange={(e) => setSimulatedAction(e.target.value)}
            placeholder="Ejemplo: git push origin main, crear componente Next.js..."
            className="flex-1 bg-basalt-950 border border-basalt-800 rounded-lg px-3 py-2 text-xs font-mono text-white placeholder-basalt-600 focus:outline-none focus:border-obsidian-accent"
          />
          <button
            onClick={() => handleSimulate(simulatedAction)}
            className="px-4 py-2 rounded-lg bg-obsidian-glow hover:bg-obsidian-glow/90 text-white font-medium text-xs flex items-center gap-1.5 transition-colors shrink-0"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Evaluar</span>
          </button>
        </div>

        {simulationResult && (
          <div className="p-4 rounded-lg bg-basalt-950 border border-basalt-800 space-y-2 mt-3">
            <div className="flex items-center justify-between">
              {getModeBadge(simulationResult.mode)}
              <span className="text-[10px] font-mono text-basalt-500">
                {simulationResult.standard}
              </span>
            </div>
            <p className="text-sm font-semibold text-white">{simulationResult.decision}</p>
            <p className="text-xs text-basalt-300">{simulationResult.rationale}</p>
          </div>
        )}
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xs font-mono uppercase tracking-wider text-basalt-400 font-semibold">
          Capas de Control Activas ({filteredPolicies.length})
        </h3>
        <div className="flex items-center gap-1 bg-basalt-900 p-1 rounded-lg border border-basalt-800 text-xs font-mono">
          <button
            onClick={() => setFilterMode("ALL")}
            className={`px-2.5 py-1 rounded ${filterMode === "ALL" ? "bg-basalt-800 text-white" : "text-basalt-400"}`}
          >
            TODAS
          </button>
          <button
            onClick={() => setFilterMode("MAY_ACT")}
            className={`px-2.5 py-1 rounded ${filterMode === "MAY_ACT" ? "bg-emerald-950 text-emerald-400" : "text-basalt-400"}`}
          >
            MAY ACT
          </button>
          <button
            onClick={() => setFilterMode("MUST_ASK")}
            className={`px-2.5 py-1 rounded ${filterMode === "MUST_ASK" ? "bg-amber-950 text-amber-400" : "text-basalt-400"}`}
          >
            MUST ASK
          </button>
          <button
            onClick={() => setFilterMode("MUST_NEVER")}
            className={`px-2.5 py-1 rounded ${filterMode === "MUST_NEVER" ? "bg-rose-950 text-rose-400" : "text-basalt-400"}`}
          >
            MUST NEVER
          </button>
        </div>
      </div>

      {/* Policies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPolicies.map((p) => (
          <div
            key={p.id}
            className="p-5 rounded-xl border border-basalt-800 bg-basalt-900 space-y-3 shadow-panel"
          >
            <div className="flex items-center justify-between gap-2 border-b border-basalt-800 pb-2">
              <span className="font-mono text-xs font-semibold text-white">
                {p.layerTitle}
              </span>
              {getModeBadge(p.mode)}
            </div>

            <div>
              <span className="text-[10px] font-mono text-basalt-500 uppercase block mb-1">
                Acción Evaluada:
              </span>
              <p className="text-xs font-medium text-basalt-200">{p.action}</p>
            </div>

            <div className="bg-basalt-950 p-2.5 rounded-lg border border-basalt-850 space-y-1">
              <span className="text-[10px] font-mono text-obsidian-accent block">
                Fundamentación Normativa ({p.standard}):
              </span>
              <p className="text-xs text-basalt-300 leading-relaxed">{p.rationale}</p>
            </div>

            <div className="text-[11px] text-basalt-400 italic">
              <span className="font-mono text-[10px] text-basalt-500 not-italic block">Evidencia de Auditoría:</span>
              "{p.auditEvidence}"
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
