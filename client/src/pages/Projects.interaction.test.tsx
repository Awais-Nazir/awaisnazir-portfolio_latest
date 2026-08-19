// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React, { createContext, useContext, type ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

const DrawerContext = createContext<{ open: boolean; onOpenChange: (open: boolean) => void }>({ open: false, onOpenChange: () => undefined });

vi.mock("@/components/ui/drawer", () => ({
  Drawer: ({ open, onOpenChange, children }: { open: boolean; onOpenChange: (open: boolean) => void; children: ReactNode }) => (
    <DrawerContext.Provider value={{ open, onOpenChange }}>{children}</DrawerContext.Provider>
  ),
  DrawerContent: ({ children }: { children: ReactNode }) => {
    const { open } = useContext(DrawerContext);
    return open ? <div role="dialog">{children}</div> : null;
  },
  DrawerDescription: ({ children }: { children: ReactNode }) => <p>{children}</p>,
  DrawerFooter: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DrawerHeader: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DrawerTitle: ({ children }: { children: ReactNode }) => <h2>{children}</h2>,
}));

vi.mock("@/components/portfolio/SiteFrame", () => ({
  SiteFrame: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

vi.mock("@/components/portfolio/PortfolioUI", () => ({
  ContentNotice: () => <div>No projects</div>,
  ProjectCard: ({ project }: { project: { title: string } }) => <article>{project.title}</article>,
  SectionHeading: ({ title }: { title: string }) => <h1>{title}</h1>,
}));

vi.mock("@/lib/trpc", () => ({
  trpc: {
    portfolio: {
      projects: {
        useQuery: () => ({
          data: {
            projects: [
              { slug: "system", title: "System", tags: ["backend"], techStack: ["TypeScript"] },
            ],
          },
          isLoading: false,
        }),
      },
    },
  },
}));

import Projects from "./Projects";

afterEach(() => cleanup());

describe("Projects mobile filter drawer", () => {
  it("opens from its compact trigger and closes through the Show projects action", () => {
    render(<Projects />);

    fireEvent.click(screen.getByRole("button", { name: /filter projects/i }));
    expect(screen.getByRole("dialog")).toBeTruthy();
    expect(screen.getByRole("button", { name: /show 1 project/i })).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: /show 1 project/i }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("exposes high-feedback hover and press states through rendered interaction", () => {
    render(<Projects />);
    const trigger = screen.getByRole("button", { name: /filter projects/i });

    fireEvent.pointerEnter(trigger);
    expect(trigger.getAttribute("data-feedback")).toBe("hover");
    fireEvent.pointerDown(trigger);
    expect(trigger.getAttribute("data-feedback")).toBe("pressed");
    fireEvent.pointerUp(trigger);
    expect(trigger.getAttribute("data-feedback")).toBe("hover");
    fireEvent.pointerLeave(trigger);

    expect(trigger.className).toContain("button-secondary");
    expect(trigger.getAttribute("data-feedback")).toBe("idle");
  });
});
