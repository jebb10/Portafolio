import { AgentTelemetry } from "@/types";

export const AGENTS_TELEMETRY: AgentTelemetry[] = [
  {
    id: "johan-personal-agent",
    name: "johan-personal-agent",
    kind: "agy",
    paneId: "w1:p1",
    status: "working",
    role: "Autonomous Personal Knowledge Copilot",
    lastAction: "Synchronizing graph nodes & Obsidian vault indices",
    stepCount: 142,
  },
  {
    id: "agentadk-mcp",
    name: "agentadk",
    kind: "claude",
    paneId: "w1:p2",
    status: "mature",
    role: "MCP Integration & Python Serverless Tools",
    lastAction: "Serverless function packaging & pytest passing",
    stepCount: 88,
  },
  {
    id: "tablero-sync",
    name: "tablero",
    kind: "codex",
    paneId: "w1:p3",
    status: "idle",
    role: "Realtime Board & Supabase State Observer",
    lastAction: "Listening to WebSocket state changes",
    stepCount: 64,
  },
  {
    id: "gas-data-hub",
    name: "gas-hub",
    kind: "cursor",
    paneId: "w1:p4",
    status: "working",
    role: "Apps Script Enterprise Hub & Cloud ETL",
    lastAction: "Processing 500+ daily transmittals with zero manual entry",
    stepCount: 310,
  },
];
