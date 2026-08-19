// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/trpc", () => ({
  trpc: { portfolio: { home: { useQuery: () => ({ data: { projects: [], skills: [], blogPosts: [] }, isLoading: false }) } } },
}));
vi.mock("@/components/portfolio/ContactForm", () => ({ ContactForm: () => <form aria-label="Contact form" /> }));
vi.mock("@/components/portfolio/PortfolioUI", () => ({
  ContentNotice: () => <div>Notice</div>,
  ProjectCard: () => <div>Project</div>,
  SectionHeading: ({ title }: { title: string }) => <h2>{title}</h2>,
}));
vi.mock("@/components/portfolio/ProgrammingScene", () => ({ ProgrammingScene: () => <div /> }));
vi.mock("@/components/portfolio/SiteFrame", () => ({ SiteFrame: ({ children }: { children: React.ReactNode }) => <>{children}</> }));
vi.mock("@/components/portfolio/TestimonialsSection", () => ({ TestimonialsSection: () => null }));

import Home from "./Home";

describe("Home About Me panel transition", () => {
  it("keeps both panels mounted and exchanges their layered active state when a tab is selected", () => {
    render(<Home />);
    const experience = document.getElementById("experience-panel");
    const education = document.getElementById("education-panel");

    expect(experience?.classList.contains("about-panel-layer")).toBe(true);
    expect(experience?.classList.contains("is-active")).toBe(true);
    expect(education?.classList.contains("about-panel-layer")).toBe(true);
    expect(education?.classList.contains("is-active")).toBe(false);

    fireEvent.click(screen.getByRole("tab", { name: "Education" }));

    expect(experience?.classList.contains("is-active")).toBe(false);
    expect(education?.classList.contains("is-active")).toBe(true);
    expect(experience?.getAttribute("aria-hidden")).toBe("true");
    expect(education?.getAttribute("aria-hidden")).toBe("false");
  });
});
