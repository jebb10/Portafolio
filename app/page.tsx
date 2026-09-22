"use client";

import React, { useState } from "react";
import { HeaderMultiplexer } from "@/components/layout/HeaderMultiplexer";
import { HerdrSidebar } from "@/components/layout/HerdrSidebar";
import { KnowledgeGraphCanvas } from "@/components/graph/KnowledgeGraphCanvas";
import { ObsidianInspectorDrawer } from "@/components/drawer/ObsidianInspectorDrawer";
import { CaseStudiesSection } from "@/components/cases/CaseStudiesSection";
import { HitlMatrixSimulator } from "@/components/governance/HitlMatrixSimulator";
import { IsoSpecificationViewer } from "@/components/spec/IsoSpecificationViewer";
import { GRAPH_NODES, GRAPH_LINKS } from "@/lib/data/knowledgeGraphData";
import { KnowledgeNode } from "@/types";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("graph");
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);
  const [selectedSpaceId, setSelectedSpaceId] = useState<string | null>(null);

  // Navigate to wikilink target node
  const handleNavigateWikilink = (linkText: string) => {
    const clean = linkText.toLowerCase().trim();
    const found = GRAPH_NODES.find(
      (n) =>
        n.id.toLowerCase() === clean ||
        n.label.toLowerCase().includes(clean) ||
        clean.includes(n.id.toLowerCase())
    );

    if (found) {
      setSelectedNode(found);
    } else {
      // Epistemic notice fallback
      setSelectedNode({
        id: clean,
        label: linkText,
        group: "core",
        category: "Nota en Maduración Epistémica",
        summary: "Esta nota está actualmente en proceso de formulación en la bóveda de Obsidian.",
        tags: ["Draft", "Epistemic Vault"],
        contentMarkdown: `# ${linkText}\n\n> [!NOTE]\n> Esta nota se encuentra en fase de síntesis ontológica dentro de la bóveda de Obsidian. Se incorporará formalmente en la próxima sincronización del grafo.`,
      });
    }
  };

  // When clicking an agent or space in sidebar
  const handleSelectAgentNode = (agentId: string) => {
    const found = GRAPH_NODES.find(
      (n) => n.id.toLowerCase() === agentId.toLowerCase() || n.id.includes(agentId)
    );
    if (found) {
      setSelectedNode(found);
      setActiveTab("graph");
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-basalt-950 text-basalt-100 font-sans">
      {/* 1. Header Multiplexer */}
      <HeaderMultiplexer activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 2. Main Workspace Layout */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Herdr Spaces & Telemetry Sidebar */}
        <HerdrSidebar
          selectedSpaceId={selectedSpaceId}
          onSelectSpace={setSelectedSpaceId}
          onSelectAgentNode={handleSelectAgentNode}
        />

        {/* Central Content Area */}
        <main className="flex-1 overflow-y-auto relative bg-basalt-950 flex flex-col">
          {activeTab === "graph" && (
            <div className="w-full h-full relative">
              <KnowledgeGraphCanvas
                nodes={GRAPH_NODES}
                links={GRAPH_LINKS}
                selectedNodeId={selectedNode?.id || null}
                onSelectNode={(node) => setSelectedNode(node)}
              />
            </div>
          )}

          {activeTab === "cases" && <CaseStudiesSection />}

          {activeTab === "governance" && <HitlMatrixSimulator />}

          {activeTab === "spec" && <IsoSpecificationViewer />}
        </main>

        {/* 3. Obsidian Split View Inspector Drawer */}
        {selectedNode && (
          <ObsidianInspectorDrawer
            node={selectedNode}
            onClose={() => setSelectedNode(null)}
            onNavigateWikilink={handleNavigateWikilink}
          />
        )}
      </div>
    </div>
  );
}
