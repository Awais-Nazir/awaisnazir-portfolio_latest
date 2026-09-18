import { describe, expect, it } from "vitest";
import { getActiveProjectFilterCount } from "./projectFilters";

describe("getActiveProjectFilterCount", () => {
  it("counts independent search and technology filters", () => {
    expect(getActiveProjectFilterCount("", "")).toBe(0);
    expect(getActiveProjectFilterCount("nest", "")).toBe(1);
    expect(getActiveProjectFilterCount("", "TypeScript")).toBe(1);
    expect(getActiveProjectFilterCount("nest", "TypeScript")).toBe(2);
  });
});
