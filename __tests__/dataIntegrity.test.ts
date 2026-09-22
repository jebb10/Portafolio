import { describe, it, expect } from "vitest";
import { GRAPH_NODES, GRAPH_LINKS } from "@/lib/data/knowledgeGraphData";
import { CASE_STUDIES } from "@/lib/data/caseStudiesData";
import { HITL_POLICIES } from "@/lib/data/governanceData";
import { EARS_REQUIREMENTS } from "@/lib/data/isoSpecData";

describe("Knowledge Graph Data Integrity", () => {
  it("should have zero orphan links (all link sources and targets must exist in nodes)", () => {
    const nodeIds = new Set(GRAPH_NODES.map((n) => n.id));
    for (const link of GRAPH_LINKS) {
      expect(nodeIds.has(link.source)).toBe(true);
      expect(nodeIds.has(link.target)).toBe(true);
    }
  });

  it("should include the master Portafolio node (Space 001.4)", () => {
    const portafolioNode = GRAPH_NODES.find((n) => n.id === "portafolio");
    expect(portafolioNode).toBeDefined();
    expect(portafolioNode?.group).toBe("spaces");
  });

  it("should have valid categories and summaries for all nodes", () => {
    for (const node of GRAPH_NODES) {
      expect(node.label).toBeTruthy();
      expect(node.summary).toBeTruthy();
      expect(node.tags.length).toBeGreaterThan(0);
    }
  });
});

describe("Case Studies Triad Integrity", () => {
  it("should contain all 6 core case studies with complete Triad dimensions", () => {
    expect(CASE_STUDIES.length).toBe(6);
    for (const cs of CASE_STUDIES) {
      expect(cs.title).toBeTruthy();
      expect(cs.metric).toBeTruthy();
      expect(cs.triad.philosophy).toBeTruthy();
      expect(cs.triad.business).toBeTruthy();
      expect(cs.triad.technology).toBeTruthy();
      expect(cs.keyAccomplishments.length).toBeGreaterThanOrEqual(3);
    }
  });
});

describe("HITL Governance & Safety Verification", () => {
  it("should have 6 structured layers with verified decision modes", () => {
    expect(HITL_POLICIES.length).toBe(6);
    const validModes = new Set(["MAY_ACT", "MUST_ASK", "MUST_NEVER"]);
    for (const p of HITL_POLICIES) {
      expect(validModes.has(p.mode)).toBe(true);
      expect(p.layer).toBeGreaterThanOrEqual(1);
      expect(p.layer).toBeLessThanOrEqual(6);
      expect(p.standard).toBeTruthy();
    }
  });
});

describe("ISO 29148 EARS Requirements Verification", () => {
  it("should contain requirements with standard EARS keywords", () => {
    expect(EARS_REQUIREMENTS.length).toBeGreaterThanOrEqual(5);
    for (const req of EARS_REQUIREMENTS) {
      expect(req.id).toMatch(/^REQ_ISO_/);
      expect(req.statement).toContain("shall");
      expect(req.rationale).toBeTruthy();
      expect(req.verification).toBeTruthy();
    }
  });
});
