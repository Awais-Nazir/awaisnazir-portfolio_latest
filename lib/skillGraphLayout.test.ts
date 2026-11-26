import { describe, expect, it } from "vitest";
import { graphLabel, layoutSkillGraph } from "./skillGraphLayout";

describe("skills force layout", () => {
  const nodes = [
    { id: "p1", name: "First project", build: true, x: 280, y: 370 },
    { id: "p2", name: "Second project", build: true, x: 720, y: 370 },
    { id: "s1", name: "Shared skill", build: null, x: 10, y: 10 },
    { id: "s2", name: "Unconnected skill", build: null, x: 900, y: 650 },
  ];
  const edges = [{ from: "p1", to: "s1" }, { from: "p2", to: "s1" }];
  it("settles shared skills between anchored projects without mutating inputs", () => {
    const result = layoutSkillGraph(nodes, edges);
    expect(result[0]).toEqual(nodes[0]);
    expect(result[1]).toEqual(nodes[1]);
    expect(result[2].x).toBeGreaterThan(280);
    expect(result[2].x).toBeLessThan(720);
    expect(nodes[2].x).toBe(10);
    expect(layoutSkillGraph(nodes, edges)).toEqual(result);
  });
  it("keeps disconnected and coincident skills finite and inside the canvas", () => {
    const result = layoutSkillGraph([...nodes, { ...nodes[3], id: "s3" }], edges);
    for (const n of result) {
      expect(Number.isFinite(n.x + n.y)).toBe(true);
      expect(n.x).toBeGreaterThan(0);
      expect(n.x).toBeLessThan(1000);
      expect(n.y).toBeGreaterThan(0);
      expect(n.y).toBeLessThan(740);
    }
    expect(layoutSkillGraph([], [])).toEqual([]);
  });
  it("wraps long labels without losing words", () => {
    const label = "Hisab Kitab - Smart Ledger & AI Expense Assistant";
    expect(graphLabel(label).join(" ")).toBe(label);
    expect(graphLabel(label).every(line => line.length <= 26)).toBe(true);
    expect(graphLabel("A".repeat(60)).join("")).toHaveLength(60);
  });
});
