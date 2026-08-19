// @vitest-environment jsdom
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { FeedbackAction } from "./FeedbackAction";

afterEach(() => cleanup());

describe("FeedbackAction", () => {
  it("exposes observable hover and press feedback states on the rendered shared CTA", () => {
    render(<FeedbackAction href="https://wa.me/example">Let&apos;s Talk</FeedbackAction>);
    const action = screen.getByRole("link", { name: /let's talk/i });

    expect(action.getAttribute("data-feedback")).toBe("idle");
    fireEvent.pointerEnter(action);
    expect(action.getAttribute("data-feedback")).toBe("hover");
    fireEvent.pointerDown(action);
    expect(action.getAttribute("data-feedback")).toBe("pressed");
    fireEvent.pointerUp(action);
    expect(action.getAttribute("data-feedback")).toBe("hover");
    fireEvent.pointerLeave(action);
    expect(action.getAttribute("data-feedback")).toBe("idle");
  });
});
