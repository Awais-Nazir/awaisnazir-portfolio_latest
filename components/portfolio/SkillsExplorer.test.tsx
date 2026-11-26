// @vitest-environment jsdom
import React from "react";
import { afterEach, describe, expect, it } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { SkillsExplorer } from "./SkillsExplorer";
afterEach(cleanup);
const skills = [
  {
    name: "Python",
    category: "Languages",
    note: "Backend services.",
    order: 0,
    showOnHome: true,
  },
  {
    name: "Docker",
    category: "Infrastructure",
    note: "Container deployments.",
    order: 1,
    showOnHome: true,
  },
];
const projects = [
  { title: "Document service", slug: "documents", techStack: ["Python"] },
];
describe("skills explorer", () => {
  it("shows evidence for the selected tool and switches details when filtered", () => {
    render(<SkillsExplorer skills={skills} projects={projects} />);
    expect(
      screen
        .getByRole("link", { name: "Document service" })
        .getAttribute("href")
    ).toBe("/projects/documents");
    fireEvent.click(
      within(
        screen.getByRole("group", { name: "Filter by discipline" })
      ).getByRole("button", { name: /Infrastructure/ })
    );
    expect(screen.getByRole("heading", { name: "Docker" })).toBeTruthy();
    expect(screen.queryByRole("link", { name: "Document service" })).toBeNull();
    expect(screen.getByText("Container deployments.")).toBeTruthy();
  });
  it("supports search, empty results, and resetting", () => {
    render(<SkillsExplorer skills={skills} projects={projects} />);
    fireEvent.change(screen.getByRole("textbox", { name: "Search skills" }), {
      target: { value: "missing" },
    });
    expect(
      screen.getByRole("heading", { name: "No matching tools" })
    ).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Show all tools" }));
    expect(screen.getByRole("heading", { name: "Python" })).toBeTruthy();
    fireEvent.click(
      screen.getByRole("button", { name: "Explore Docker" })
    );
    expect(screen.getByRole("heading", { name: "Docker" })).toBeTruthy();
  });
  it("renders an honest empty state without inventing skills", () => {
    render(<SkillsExplorer skills={[]} projects={[]} />);
    expect(screen.getByText(/toolkit is being updated/)).toBeTruthy();
    expect(screen.queryByRole("complementary")).toBeNull();
  });
});
