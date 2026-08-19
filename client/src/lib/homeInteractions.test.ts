import { describe, expect, it } from "vitest";
import { defaultAboutTab, getAboutPanelState, heroAnimation, portraitObjectPosition, shouldAutoplayHeroAnimation } from "./homeInteractions";

describe("About Me tabs", () => {
  it("selects Experience by default and exposes exactly one selected panel", () => {
    const state = getAboutPanelState(defaultAboutTab);
    expect(state.filter((tab) => tab.selected)).toEqual([expect.objectContaining({ id: "experience", panelId: "experience-panel" })]);
  });

  it("switches the selected state to Education", () => {
    const state = getAboutPanelState("education");
    expect(state.filter((tab) => tab.selected)).toEqual([expect.objectContaining({ id: "education", panelId: "education-panel" })]);
  });
});

describe("hero animation", () => {
  it("uses the supplied Lottie asset with a concise accessible label", () => {
    expect(heroAnimation).toMatchObject({ source: "supplied-lottie-json" });
    expect(heroAnimation.assetUrl).toMatch(/\.json$/);
    expect(heroAnimation.ariaLabel).toContain("programming");
    expect(heroAnimation).not.toHaveProperty("status");
  });

  it("uses a center-biased portrait focal point for the source composition", () => {
    expect(portraitObjectPosition).toBe("66% center");
  });

  it("does not autoplay when reduced motion is requested", () => {
    expect(shouldAutoplayHeroAnimation(false)).toBe(true);
    expect(shouldAutoplayHeroAnimation(true)).toBe(false);
  });
});
