"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { KnowledgeNode, KnowledgeLink, NodeGroup } from "@/types";
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, Filter, Info } from "lucide-react";

interface KnowledgeGraphCanvasProps {
  nodes: KnowledgeNode[];
  links: KnowledgeLink[];
  selectedNodeId: string | null;
  onSelectNode: (node: KnowledgeNode) => void;
  selectedFilterGroup?: NodeGroup | "all";
}

const GROUP_COLORS: Record<NodeGroup, { base: string; glow: string; text: string }> = {
  core: { base: "#a88bfa", glow: "rgba(168, 139, 250, 0.4)", text: "#ede9fe" },
  spaces: { base: "#38bdf8", glow: "rgba(56, 189, 248, 0.4)", text: "#e0f2fe" },
  agents: { base: "#34d399", glow: "rgba(52, 211, 153, 0.4)", text: "#d1fae5" },
  governance: { base: "#f43f5e", glow: "rgba(244, 63, 94, 0.4)", text: "#ffe4e6" },
  standards: { base: "#fbbf24", glow: "rgba(251, 191, 36, 0.4)", text: "#fef3c7" },
};

export function KnowledgeGraphCanvas({
  nodes,
  links,
  selectedNodeId,
  onSelectNode,
  selectedFilterGroup = "all",
}: KnowledgeGraphCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Simulation physics state
  const simulationNodesRef = useRef<(KnowledgeNode & { x: number; y: number; vx: number; vy: number; radius: number })[]>([]);
  const isDraggingRef = useRef(false);
  const draggedNodeRef = useRef<number | null>(null);
  const [hoveredNode, setHoveredNode] = useState<KnowledgeNode | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  // Transform view state
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const transformRef = useRef({ x: 0, y: 0, scale: 1 });
  const isPanningRef = useRef(false);
  const panStartRef = useRef({ x: 0, y: 0 });

  // Update transform ref when state changes
  useEffect(() => {
    transformRef.current = transform;
  }, [transform]);

  // Initialize simulation positions
  useEffect(() => {
    const width = containerRef.current?.clientWidth || 800;
    const height = containerRef.current?.clientHeight || 600;

    const initialized = nodes.map((node, index) => {
      const angle = (index / nodes.length) * 2 * Math.PI;
      const dist = 120 + Math.random() * 140;
      const isCore = node.group === "core";
      const radius = isCore ? 14 : node.group === "agents" ? 11 : 9;

      return {
        ...node,
        x: width / 2 + Math.cos(angle) * dist,
        y: height / 2 + Math.sin(angle) * dist,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius,
      };
    });

    simulationNodesRef.current = initialized;
  }, [nodes]);

  // Main 60 FPS animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const simNodes = simulationNodesRef.current;
      const t = transformRef.current;

      // Physics update: repulsive forces between all nodes
      for (let i = 0; i < simNodes.length; i++) {
        for (let j = i + 1; j < simNodes.length; j++) {
          const dx = simNodes[j].x - simNodes[i].x;
          const dy = simNodes[j].y - simNodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const minDist = 80;
          if (dist < minDist) {
            const force = (minDist - dist) / dist * 0.04;
            simNodes[i].vx -= dx * force;
            simNodes[i].vy -= dy * force;
            simNodes[j].vx += dx * force;
            simNodes[j].vy += dy * force;
          }
        }

        // Center gravity force
        const cdx = width / 2 - simNodes[i].x;
        const cdy = height / 2 - simNodes[i].y;
        simNodes[i].vx += cdx * 0.0004;
        simNodes[i].vy += cdy * 0.0004;

        // Damping / Friction
        simNodes[i].vx *= 0.92;
        simNodes[i].vy *= 0.92;

        // Apply velocities if not dragged
        if (draggedNodeRef.current !== i) {
          simNodes[i].x += simNodes[i].vx;
          simNodes[i].y += simNodes[i].vy;
        }
      }

      // Spring forces for links
      const nodeMap = new Map(simNodes.map((n, idx) => [n.id, idx]));
      for (const link of links) {
        const sIdx = nodeMap.get(link.source);
        const tIdx = nodeMap.get(link.target);
        if (sIdx !== undefined && tIdx !== undefined) {
          const s = simNodes[sIdx];
          const tr = simNodes[tIdx];
          const dx = tr.x - s.x;
          const dy = tr.y - s.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const targetDist = 95;
          const force = (dist - targetDist) * 0.003;
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;

          if (draggedNodeRef.current !== sIdx) {
            s.vx += fx;
            s.vy += fy;
          }
          if (draggedNodeRef.current !== tIdx) {
            tr.vx -= fx;
            tr.vy -= fy;
          }
        }
      }

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);
      ctx.save();

      // Apply zoom & pan transformations
      ctx.translate(t.x, t.y);
      ctx.scale(t.scale, t.scale);

      // 1. Draw Links
      for (const link of links) {
        const sIdx = nodeMap.get(link.source);
        const tIdx = nodeMap.get(link.target);
        if (sIdx !== undefined && tIdx !== undefined) {
          const s = simNodes[sIdx];
          const tr = simNodes[tIdx];

          const isConnectedToSelected =
            selectedNodeId && (s.id === selectedNodeId || tr.id === selectedNodeId);

          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(tr.x, tr.y);
          ctx.strokeStyle = isConnectedToSelected
            ? "rgba(168, 139, 250, 0.7)"
            : "rgba(55, 55, 68, 0.4)";
          ctx.lineWidth = isConnectedToSelected ? 1.8 : 0.9;
          ctx.stroke();
        }
      }

      // 2. Draw Nodes
      for (let i = 0; i < simNodes.length; i++) {
        const node = simNodes[i];
        const isSelected = selectedNodeId === node.id;
        const color = GROUP_COLORS[node.group] || GROUP_COLORS.core;

        // Glow ring for selected node
        if (isSelected) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 6, 0, 2 * Math.PI);
          ctx.fillStyle = color.glow;
          ctx.fill();
        }

        // Node Circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);
        ctx.fillStyle = color.base;
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = isSelected ? "#ffffff" : "#121216";
        ctx.stroke();

        // Node Label
        ctx.font = isSelected
          ? "600 11px Inter, sans-serif"
          : "500 10px Inter, sans-serif";
        ctx.fillStyle = isSelected ? "#ffffff" : color.text;
        ctx.textAlign = "center";
        ctx.fillText(node.label, node.x, node.y + node.radius + 12);
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [links, selectedNodeId]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current || !containerRef.current) return;
      canvasRef.current.width = containerRef.current.clientWidth;
      canvasRef.current.height = containerRef.current.clientHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Coordinate Conversion (Screen to Canvas Space)
  const getCanvasCoords = useCallback((clientX: number, clientY: number) => {
    if (!canvasRef.current) return { x: 0, y: 0, screenX: 0, screenY: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    const t = transformRef.current;
    const rawX = clientX - rect.left;
    const rawY = clientY - rect.top;
    return {
      x: (rawX - t.x) / t.scale,
      y: (rawY - t.y) / t.scale,
      screenX: rawX,
      screenY: rawY,
    };
  }, []);

  // Mouse Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const coords = getCanvasCoords(e.clientX, e.clientY);
    const simNodes = simulationNodesRef.current;

    // Check if clicked on a node
    for (let i = 0; i < simNodes.length; i++) {
      const node = simNodes[i];
      const dx = coords.x - node.x;
      const dy = coords.y - node.y;
      if (Math.sqrt(dx * dx + dy * dy) <= node.radius + 4) {
        draggedNodeRef.current = i;
        isDraggingRef.current = true;
        onSelectNode(node);
        return;
      }
    }

    // Otherwise start panning
    isPanningRef.current = true;
    panStartRef.current = { x: e.clientX - transform.x, y: e.clientY - transform.y };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const coords = getCanvasCoords(e.clientX, e.clientY);
    const simNodes = simulationNodesRef.current;

    // If dragging a node
    if (isDraggingRef.current && draggedNodeRef.current !== null) {
      simNodes[draggedNodeRef.current].x = coords.x;
      simNodes[draggedNodeRef.current].y = coords.y;
      simNodes[draggedNodeRef.current].vx = 0;
      simNodes[draggedNodeRef.current].vy = 0;
      return;
    }

    // If panning canvas
    if (isPanningRef.current) {
      setTransform((prev) => ({
        ...prev,
        x: e.clientX - panStartRef.current.x,
        y: e.clientY - panStartRef.current.y,
      }));
      return;
    }

    // Check hover
    let found: KnowledgeNode | null = null;
    for (let i = 0; i < simNodes.length; i++) {
      const node = simNodes[i];
      const dx = coords.x - node.x;
      const dy = coords.y - node.y;
      if (Math.sqrt(dx * dx + dy * dy) <= node.radius + 4) {
        found = node;
        break;
      }
    }

    if (found) {
      setHoveredNode(found);
      setTooltipPos({ x: coords.screenX, y: coords.screenY });
    } else {
      setHoveredNode(null);
      setTooltipPos(null);
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    draggedNodeRef.current = null;
    isPanningRef.current = false;
  };

  // Wheel Zoom
  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    setTransform((prev) => {
      const nextScale = Math.min(Math.max(prev.scale * zoomFactor, 0.4), 2.5);
      return { ...prev, scale: nextScale };
    });
  };

  const handleResetZoom = () => {
    setTransform({ x: 0, y: 0, scale: 1 });
  };

  return (
    <div ref={containerRef} className="relative w-full h-full bg-basalt-950 overflow-hidden select-none">
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
      />

      {/* Floating Control Toolbar */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-basalt-900/90 border border-basalt-800 rounded-lg p-1 shadow-panel backdrop-blur z-20">
        <button
          onClick={() => setTransform((prev) => ({ ...prev, scale: Math.min(prev.scale * 1.2, 2.5) }))}
          className="p-1.5 rounded hover:bg-basalt-800 text-basalt-300 hover:text-white transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setTransform((prev) => ({ ...prev, scale: Math.max(prev.scale * 0.8, 0.4) }))}
          className="p-1.5 rounded hover:bg-basalt-800 text-basalt-300 hover:text-white transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleResetZoom}
          className="p-1.5 rounded hover:bg-basalt-800 text-basalt-300 hover:text-white transition-colors"
          title="Reset View"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Legend & Stats Overlay */}
      <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-3 bg-basalt-900/80 border border-basalt-800/80 px-3 py-2 rounded-lg text-xs font-mono text-basalt-400 backdrop-blur z-20">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#a88bfa]"></span> Core
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]"></span> Spaces
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#34d399]"></span> Agents
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f43f5e]"></span> Governance
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#fbbf24]"></span> Standards
        </span>
        <span className="text-basalt-600 hidden sm:inline">|</span>
        <span className="hidden sm:inline text-basalt-300">
          Arrastra para mover • Click para abrir nota
        </span>
      </div>

      {/* Hover Tooltip */}
      {hoveredNode && tooltipPos && (
        <div
          className="pointer-events-none absolute z-30 bg-basalt-900 border border-obsidian-accent/50 rounded-lg p-2.5 shadow-panel text-xs max-w-xs transition-opacity duration-150"
          style={{
            left: `${tooltipPos.x + 14}px`,
            top: `${tooltipPos.y + 14}px`,
          }}
        >
          <div className="flex items-center justify-between mb-1 gap-2">
            <span className="font-semibold text-white truncate">{hoveredNode.label}</span>
            <span
              className="text-[9px] font-mono px-1.5 py-0.5 rounded capitalize"
              style={{
                backgroundColor: GROUP_COLORS[hoveredNode.group].glow,
                color: GROUP_COLORS[hoveredNode.group].text,
              }}
            >
              {hoveredNode.group}
            </span>
          </div>
          <p className="text-[11px] text-basalt-300 leading-snug line-clamp-2">
            {hoveredNode.summary}
          </p>
          <span className="block mt-1.5 text-[9px] font-mono text-obsidian-accent">
            Click para inspeccionar nota Markdown →
          </span>
        </div>
      )}
    </div>
  );
}
