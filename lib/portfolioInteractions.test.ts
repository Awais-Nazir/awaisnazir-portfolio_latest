import { describe, expect, it } from "vitest";
import { experienceTimeline, initialExperience, shouldClosePreviewOnKey } from "./portfolioInteractions";

describe("portfolio interactions", () => {
  it("keeps the experience timeline in chronological order while selecting the current role initially", () => {
    expect(experienceTimeline.map((item) => item.year)).toEqual(["2024", "2025", "2026"]);
    expect(initialExperience).toMatchObject({ id: "endpoint", company: "Endpoint Clients" });
  });

  it("closes preview overlays only on Escape", () => {
    expect(shouldClosePreviewOnKey("Escape")).toBe(true);
    expect(shouldClosePreviewOnKey("Enter")).toBe(false);
  });
});
