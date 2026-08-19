// @vitest-environment jsdom
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const routeState = vi.hoisted(() => ({ location: "/" }));

vi.mock("wouter", async (importOriginal) => {
  const actual = await importOriginal<typeof import("wouter")>();
  return {
    ...actual,
    useLocation: () => [routeState.location, vi.fn()] as const,
  };
});

vi.mock("@/pages/Home", () => ({ default: () => null }));
vi.mock("@/pages/Projects", () => ({ default: () => null }));
vi.mock("@/pages/ProjectDetail", () => ({ default: () => null }));
vi.mock("@/pages/Skills", () => ({ default: () => null }));
vi.mock("@/pages/Blog", () => ({ default: () => null }));
vi.mock("@/pages/BlogDetail", () => ({ default: () => null }));
vi.mock("@/pages/Contact", () => ({ default: () => null }));
vi.mock("@/pages/NotFound", () => ({ default: () => null }));

import { RouteScrollReset } from "./App";

describe("RouteScrollReset", () => {
  function InternalNavigationHarness() {
    const [location, setLocation] = React.useState("/");
    routeState.location = location;

    return (
      <>
        <a href="/projects" onClick={(event) => { event.preventDefault(); setLocation("/projects"); }}>Projects</a>
        <RouteScrollReset />
      </>
    );
  }

  it("returns a navigation from a scrolled route to the top of a new internal destination", () => {
    const scrollTo = vi.fn();
    Object.defineProperty(window, "scrollTo", { configurable: true, value: scrollTo });
    Object.defineProperty(window, "requestAnimationFrame", { configurable: true, value: (callback: FrameRequestCallback) => { callback(0); return 1; } });
    Object.defineProperty(window, "cancelAnimationFrame", { configurable: true, value: vi.fn() });
    Object.defineProperty(window, "scrollY", { configurable: true, value: 640 });
    window.history.replaceState(null, "", "/");
    routeState.location = "/";

    const { rerender } = render(<RouteScrollReset />);
    scrollTo.mockClear();

    routeState.location = "/projects";
    rerender(<RouteScrollReset />);

    expect(scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it("returns to the top after a rendered internal Projects link is clicked from a scrolled Home page", () => {
    const scrollTo = vi.fn();
    Object.defineProperty(window, "scrollTo", { configurable: true, value: scrollTo });
    Object.defineProperty(window, "requestAnimationFrame", { configurable: true, value: (callback: FrameRequestCallback) => { callback(0); return 1; } });
    Object.defineProperty(window, "cancelAnimationFrame", { configurable: true, value: vi.fn() });
    Object.defineProperty(window, "scrollY", { configurable: true, value: 640 });
    window.history.replaceState(null, "", "/");
    routeState.location = "/";

    render(<InternalNavigationHarness />);
    scrollTo.mockClear();
    fireEvent.click(screen.getByRole("link", { name: "Projects" }));

    expect(scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it("does not override deliberate same-page anchor navigation", () => {
    const scrollTo = vi.fn();
    Object.defineProperty(window, "scrollTo", { configurable: true, value: scrollTo });
    Object.defineProperty(window, "requestAnimationFrame", { configurable: true, value: (callback: FrameRequestCallback) => { callback(0); return 1; } });
    Object.defineProperty(window, "cancelAnimationFrame", { configurable: true, value: vi.fn() });
    window.history.replaceState(null, "", "/#projects");
    routeState.location = "/";

    render(<RouteScrollReset />);

    expect(scrollTo).not.toHaveBeenCalled();
  });
});
