import { describe, expect, it } from "vitest";
import { shouldResetScrollForRoute } from "./routeScroll";

describe("shouldResetScrollForRoute", () => {
  it("resets the viewport for a regular internal route", () => {
    expect(shouldResetScrollForRoute("")).toBe(true);
  });

  it("preserves native same-page anchor navigation", () => {
    expect(shouldResetScrollForRoute("#projects")).toBe(false);
  });
});
