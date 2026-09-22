"use client";

import React, { useState } from "react";
import { CASE_STUDIES } from "@/lib/data/caseStudiesData";
import { CaseStudy } from "@/types";
import { GitBranch, ExternalLink, Compass, Briefcase, Cpu, CheckCircle2, ChevronRight } from "lucide-react";

export function CaseStudiesSection() {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(CASE_STUDIES[0].id);
  const activeCase = CASE_STUDIES.find((c) => c.id === selectedCaseId) || CASE_STUDIES[0];

  return (
    <section className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Section Header */}
      <div className="space-y-2 border-b border-basalt-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-obsidian-accent uppercase tracking-wider">
          <Compass className="w-4 h-4" />
          <span>La Tríada de Johan: Filosofía • Negocio • Tecnología</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Casos de Estudio & Arquitecturas de Producción
        </h1>
        <p className="text-sm text-basalt-400 max-w-3xl leading-relaxed">
          Cada proyecto es concebido y evaluado bajo tres lentes irreducibles: el rigor conceptual de la filosofía,
          el análisis de valor y stakeholders de BABOK v3, y la solvencia de la ingeniería de software moderna.
        </p>
      </div>

      {/* Case Studies Selector Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {CASE_STUDIES.map((c) => {
          const isSelected = selectedCaseId === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCaseId(c.id)}
              className={`p-3 rounded-lg border text-left transition-all ${
                isSelected
                  ? "bg-basalt-850 border-obsidian-accent shadow-panel ring-1 ring-obsidian-accent/30"
                  : "bg-basalt-900 border-basalt-800 hover:border-basalt-700 hover:bg-basalt-850/60"
              }`}
            >
              <span className="block text-[10px] font-mono text-obsidian-accent mb-1 truncate">
                {c.badge}
              </span>
              <span className="font-semibold text-xs text-white line-clamp-1 block">
                {c.title}
              </span>
              <span className="text-[11px] font-mono text-telemetry-live mt-1 block">
                {c.metric}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detailed Selected Case Card */}
      <article className="rounded-xl border border-basalt-800 bg-basalt-900 p-5 sm:p-7 space-y-6 shadow-panel">
        {/* Case Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-basalt-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-xs font-mono font-semibold bg-basalt-800 text-obsidian-accent border border-basalt-700">
                {activeCase.badge}
              </span>
              <span className="text-xs font-mono text-basalt-500">{activeCase.period}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {activeCase.title}
            </h2>
            <p className="text-xs sm:text-sm text-basalt-400">{activeCase.subtitle}</p>
          </div>

          {/* Metric Highlight Box */}
          <div className="bg-basalt-950 border border-basalt-800 rounded-lg p-3 sm:p-4 text-center shrink-0 min-w-[180px]">
            <span className="text-2xl sm:text-3xl font-mono font-extrabold text-telemetry-live block">
              {activeCase.metric}
            </span>
            <span className="text-[10px] font-mono text-basalt-400 block mt-0.5">
              {activeCase.metricLabel}
            </span>
          </div>
        </div>

        {/* The Triad 3-Column Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. Philosophy */}
          <div className="rounded-lg border border-basalt-800 bg-basalt-950/70 p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-obsidian-accent">
              <Compass className="w-4 h-4" />
              <span>Dimensión Filosófica</span>
            </div>
            <p className="text-xs text-basalt-300 leading-relaxed">
              {activeCase.triad.philosophy}
            </p>
          </div>

          {/* 2. Business (BABOK) */}
          <div className="rounded-lg border border-basalt-800 bg-basalt-950/70 p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-sky-400">
              <Briefcase className="w-4 h-4" />
              <span>Dimensión Negocio (BABOK)</span>
            </div>
            <p className="text-xs text-basalt-300 leading-relaxed">
              {activeCase.triad.business}
            </p>
          </div>

          {/* 3. Technology (Engineering) */}
          <div className="rounded-lg border border-basalt-800 bg-basalt-950/70 p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-telemetry-live">
              <Cpu className="w-4 h-4" />
              <span>Dimensión Técnica (Software)</span>
            </div>
            <p className="text-xs text-basalt-300 leading-relaxed">
              {activeCase.triad.technology}
            </p>
          </div>
        </div>

        {/* Key Accomplishments */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-mono uppercase tracking-wider text-basalt-400 font-semibold">
            Resultados Clave & Logros de Ingeniería
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {activeCase.keyAccomplishments.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs text-basalt-300 bg-basalt-950/40 p-2.5 rounded-lg border border-basalt-850"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-telemetry-live shrink-0 mt-0.5" />
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack & Links Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-basalt-800 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-basalt-500 mr-1 text-[11px]">Stack:</span>
            {activeCase.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded font-mono text-[10px] bg-basalt-800 text-basalt-300 border border-basalt-700"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {activeCase.repositoryUrl && (
              <a
                href={activeCase.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-basalt-800 hover:bg-basalt-750 text-white border border-basalt-700 transition-colors font-mono text-xs"
              >
                <GitBranch className="w-3 h-3 text-obsidian-accent" />
                <span>Repositorio</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>
            )}
            {activeCase.liveUrl && (
              <a
                href={activeCase.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-obsidian-glow/20 hover:bg-obsidian-glow/30 text-obsidian-accent border border-obsidian-accent/40 transition-colors font-mono text-xs"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </article>
    </section>
  );
}
