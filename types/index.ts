export type NodeGroup = "core" | "spaces" | "agents" | "governance" | "standards";

export interface KnowledgeNode {
  id: string;
  label: string;
  group: NodeGroup;
  category: string;
  summary: string;
  path?: string;
  tags: string[];
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  radius?: number;
  contentMarkdown?: string;
}

export interface KnowledgeLink {
  source: string;
  target: string;
  label?: string;
}

export interface TriadContent {
  philosophy: string;
  business: string;
  technology: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  badge: string;
  subtitle: string;
  period: string;
  role: string;
  metric: string;
  metricLabel: string;
  techStack: string[];
  triad: TriadContent;
  keyAccomplishments: string[];
  repositoryUrl?: string;
  liveUrl?: string;
}

export type AgentStateKind = "working" | "idle" | "blocked" | "mature";

export interface AgentTelemetry {
  id: string;
  name: string;
  kind: "agy" | "claude" | "codex" | "cursor" | "opencode";
  paneId: string;
  status: AgentStateKind;
  role: string;
  lastAction: string;
  stepCount: number;
}

export interface WorkspaceSpace {
  id: string;
  code: string;
  name: string;
  description: string;
  badge: string;
  path: string;
  active: boolean;
}

export type HitlDecisionMode = "MAY_ACT" | "MUST_ASK" | "MUST_NEVER";

export interface HitlPolicy {
  id: string;
  layer: number;
  layerTitle: string;
  standard: string;
  action: string;
  mode: HitlDecisionMode;
  rationale: string;
  auditEvidence: string;
}

export interface EarsRequirement {
  id: string;
  type: "ubiquitous" | "event-driven" | "state-driven" | "unwanted-behavior";
  statement: string;
  rationale: string;
  verification: string;
}
