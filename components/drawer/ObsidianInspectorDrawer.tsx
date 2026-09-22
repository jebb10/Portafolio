"use client";

import React, { useEffect } from "react";
import { X, FileText, Tag, ArrowRight, BookOpen, ExternalLink, Check, Copy } from "lucide-react";
import { KnowledgeNode } from "@/types";

interface ObsidianInspectorDrawerProps {
  node: KnowledgeNode | null;
  onClose: () => void;
  onNavigateWikilink: (linkText: string) => void;
}

export function ObsidianInspectorDrawer({
  node,
  onClose,
  onNavigateWikilink,
}: ObsidianInspectorDrawerProps) {
  // Listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!node) return null;

  // Simple Markdown parser with Wikilink and Callout support
  const renderMarkdownContent = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let currentCallout: { type: string; title: string; lines: string[] } | null = null;
    let inCodeBlock = false;
    let codeBlockLines: string[] = [];

    const flushCallout = (key: number) => {
      if (!currentCallout) return;
      const type = currentCallout.type.toLowerCase();
      let calloutClass = "callout-note";
      let titleColor = "text-sky-400";
      if (type === "important") {
        calloutClass = "callout-important";
        titleColor = "text-obsidian-accent";
      } else if (type === "caution" || type === "warning") {
        calloutClass = "callout-caution";
        titleColor = "text-rose-400";
      } else if (type === "tip") {
        calloutClass = "callout-tip";
        titleColor = "text-emerald-400";
      }

      elements.push(
        <div key={`callout-${key}`} className={`obsidian-callout ${calloutClass}`}>
          <div className={`font-semibold text-xs uppercase tracking-wider mb-1 ${titleColor}`}>
            {currentCallout.title || currentCallout.type}
          </div>
          <div className="text-sm text-basalt-200 space-y-1">
            {currentCallout.lines.map((l, idx) => (
              <p key={idx}>{parseInlineText(l)}</p>
            ))}
          </div>
        </div>
      );
      currentCallout = null;
    };

    const flushCodeBlock = (key: number) => {
      if (!inCodeBlock) return;
      const codeText = codeBlockLines.join("\n");
      elements.push(
        <div key={`code-${key}`} className="my-3 rounded-lg overflow-hidden border border-basalt-800 bg-basalt-950">
          <div className="px-3 py-1.5 bg-basalt-900 border-b border-basalt-800 text-[10px] font-mono text-basalt-400 flex items-center justify-between">
            <span>Terminal / Code</span>
          </div>
          <pre className="p-3 text-xs font-mono text-basalt-200 overflow-x-auto leading-relaxed">
            {codeText}
          </pre>
        </div>
      );
      inCodeBlock = false;
      codeBlockLines = [];
    };

    const parseInlineText = (text: string) => {
      // Regex for [[wikilink]]
      const parts = text.split(/(\[\[.*?\]\])/g);
      return parts.map((part, index) => {
        if (part.startsWith("[[") && part.endsWith("]]")) {
          const rawLink = part.slice(2, -2);
          return (
            <button
              key={index}
              onClick={() => onNavigateWikilink(rawLink)}
              className="wikilink-badge inline-flex items-center gap-1 group font-mono"
            >
              <span>[[{rawLink}]]</span>
              <ArrowRight className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100 transition-opacity" />
            </button>
          );
        }
        // Bold formatting
        if (part.includes("**")) {
          const subParts = part.split(/(\*\*.*?\*\*)/g);
          return subParts.map((sub, sIdx) => {
            if (sub.startsWith("**") && sub.endsWith("**")) {
              return <strong key={sIdx} className="font-semibold text-white">{sub.slice(2, -2)}</strong>;
            }
            return sub;
          });
        }
        return part;
      });
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Code blocks
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          flushCodeBlock(i);
        } else {
          flushCallout(i);
          inCodeBlock = true;
          codeBlockLines = [];
        }
        continue;
      }

      if (inCodeBlock) {
        codeBlockLines.push(line);
        continue;
      }

      // Callouts
      if (line.startsWith("> [!")) {
        flushCallout(i);
        const match = line.match(/^>\s*\[!([A-Z]+)\]\s*(.*)$/);
        if (match) {
          currentCallout = {
            type: match[1],
            title: match[2] || match[1],
            lines: [],
          };
          continue;
        }
      }

      if (currentCallout && line.startsWith(">")) {
        currentCallout.lines.push(line.replace(/^>\s*/, ""));
        continue;
      } else if (currentCallout) {
        flushCallout(i);
      }

      // Headings
      if (line.startsWith("# ")) {
        elements.push(
          <h1 key={i} className="text-xl font-bold text-white tracking-tight mt-4 mb-2 pb-1 border-b border-basalt-800">
            {line.replace("# ", "")}
          </h1>
        );
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2 key={i} className="text-lg font-semibold text-white tracking-tight mt-4 mb-2">
            {line.replace("## ", "")}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3 key={i} className="text-base font-medium text-basalt-200 mt-3 mb-1">
            {line.replace("### ", "")}
          </h3>
        );
      } else if (line.startsWith("- ")) {
        elements.push(
          <li key={i} className="text-sm text-basalt-300 ml-4 list-disc leading-relaxed my-1">
            {parseInlineText(line.replace("- ", ""))}
          </li>
        );
      } else if (line.trim() === "") {
        elements.push(<div key={i} className="h-2" />);
      } else {
        elements.push(
          <p key={i} className="text-sm text-basalt-300 leading-relaxed my-1.5">
            {parseInlineText(line)}
          </p>
        );
      }
    }

    if (inCodeBlock) flushCodeBlock(lines.length);
    if (currentCallout) flushCallout(lines.length);

    return elements;
  };

  return (
    <aside className="fixed inset-y-0 right-0 w-full sm:w-[460px] md:w-[520px] bg-basalt-900 border-l border-basalt-800 shadow-panel z-50 flex flex-col transition-all duration-300">
      {/* Drawer Header */}
      <div className="p-4 border-b border-basalt-800 flex items-center justify-between bg-basalt-950/70">
        <div className="flex items-center gap-2 overflow-hidden truncate">
          <FileText className="w-4 h-4 text-obsidian-accent shrink-0" />
          <span className="font-mono text-xs text-basalt-400 truncate">
            Obsidian Note: <span className="text-basalt-200 font-semibold">{node.id}.md</span>
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-basalt-800 text-basalt-400 hover:text-white transition-colors"
          title="Cerrar nota (ESC)"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Drawer Metadata Strip */}
      <div className="px-4 py-2 bg-basalt-950/40 border-b border-basalt-800/60 flex flex-wrap items-center gap-2 text-xs">
        <span className="px-2 py-0.5 rounded font-mono text-[10px] uppercase font-semibold bg-basalt-800 text-obsidian-accent border border-basalt-700">
          {node.group}
        </span>
        <span className="text-basalt-500">•</span>
        <span className="text-basalt-400 font-mono text-[11px]">{node.category}</span>
      </div>

      {/* Drawer Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {/* Title */}
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">{node.label}</h2>
          <p className="text-xs text-basalt-400 mt-1 leading-relaxed">{node.summary}</p>
        </div>

        {/* Tags */}
        {node.tags && node.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {node.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-basalt-850 text-basalt-300 border border-basalt-800"
              >
                <Tag className="w-2.5 h-2.5 text-obsidian-accent" />
                #{tag}
              </span>
            ))}
          </div>
        )}

        <hr className="border-basalt-800/80 my-3" />

        {/* Markdown Reader */}
        <div className="prose prose-invert max-w-none text-basalt-200">
          {node.contentMarkdown ? (
            renderMarkdownContent(node.contentMarkdown)
          ) : (
            <p className="text-sm text-basalt-400 italic">
              Esta nota atómica se encuentra sincronizada con el grafo de conocimiento pero no contiene cuerpo Markdown extendido.
            </p>
          )}
        </div>
      </div>

      {/* Drawer Footer */}
      <div className="p-3 bg-basalt-950 border-t border-basalt-800 flex items-center justify-between text-xs font-mono text-basalt-500">
        <span>Zettelkasten Atomic Note</span>
        <span className="text-obsidian-accent">Press ESC to close</span>
      </div>
    </aside>
  );
}
