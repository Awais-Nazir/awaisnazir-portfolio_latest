// @vitest-environment jsdom
import React from "react";
import {afterEach, describe, expect, it} from "vitest";
import {cleanup, fireEvent, render, screen} from "@testing-library/react";
import {SkillsGraph, skillGraphEdges} from "./SkillsGraph";
import type {Skill, SkillGraphBuild} from "../../lib/portfolio";

afterEach(cleanup);
const skills: Skill[] = [{_id: "skill-1", name: "Renamed skill", order: 0, showOnHome: true}];
const builds: SkillGraphBuild[] = [
  {_id: "project-1", kind: "project", title: "Project", href: "/projects/test", relatedSkillIds: ["skill-1"]},
  {_id: "experience-1", kind: "experience", title: "Company", href: "https://example.com/", relatedSkillIds: ["skill-1"]},
];
describe("explicit skill relationships", () => {
  it("uses document IDs for projects and experience, independent of labels", () => {
    expect(skillGraphEdges(skills, builds)).toEqual([
      {from: "project-1", to: "skill-1"}, {from: "experience-1", to: "skill-1"},
    ]);
    expect(skillGraphEdges([{...skills[0], name: "Another name"}], builds)).toEqual(skillGraphEdges(skills, builds));
    expect(skillGraphEdges(skills, [{...builds[0], relatedSkillIds: []}])).toEqual([]);
    expect(skillGraphEdges(skills, [{...builds[0], relatedSkillIds: ["missing"]}])).toEqual([]);
  });
  it("shows experience details on hover and skill details on keyboard focus", () => {
    render(<SkillsGraph skills={skills} projects={builds} />);
    expect(screen.getByRole("heading", {name: "Hover to explore"})).toBeTruthy();
    fireEvent.mouseEnter(screen.getByRole("button", {name: "Explore Company"}));
    expect(screen.getByRole("heading", {name: "Company"})).toBeTruthy();
    const link = screen.getByRole("link", {name: "Visit organization"});
    expect(link.getAttribute("href")).toBe("https://example.com/");
    expect(link.getAttribute("rel")).toBe("noopener noreferrer");
    fireEvent.focus(screen.getByRole("button", {name: "Explore Renamed skill"}));
    expect(screen.getByRole("heading", {name: "Related work · 2"})).toBeTruthy();
  });
  it("highlights only the hovered neighborhood and clears highlights on leaving the graph", () => {
    const {container} = render(<SkillsGraph skills={skills} projects={builds} />);
    const project = screen.getByRole("button", {name: "Explore Project"});
    const company = screen.getByRole("button", {name: "Explore Company"});
    const skill = screen.getByRole("button", {name: "Explore Renamed skill"});
    expect(company.classList.contains("muted")).toBe(true);
    fireEvent.mouseEnter(company);
    expect(company.classList.contains("muted")).toBe(false);
    expect(skill.classList.contains("muted")).toBe(false);
    expect(project.classList.contains("muted")).toBe(true);
    expect(container.querySelectorAll("line.lit")).toHaveLength(1);
    expect(screen.getByRole("heading", {name: "Company"})).toBeTruthy();
    fireEvent.mouseLeave(screen.getByRole("region", {name: "Scrollable project and skill map"}));
    expect(project.classList.contains("muted")).toBe(true);
    expect(company.classList.contains("muted")).toBe(true);
    expect(container.querySelectorAll("line.lit, .network-node.selected")).toHaveLength(0);
    expect(screen.getByRole("heading", {name: "Hover to explore"})).toBeTruthy();
    expect(screen.queryByText("Nothing here")).toBeNull();
    expect(screen.queryByRole("button", {name: "Focused view"})).toBeNull();
  });
  it("keeps clicked details available after leaving, then replaces them on the next hover", () => {
    render(<SkillsGraph skills={skills} projects={builds} />);
    const company = screen.getByRole("button", {name: "Explore Company"});
    fireEvent.mouseEnter(company);
    fireEvent.click(company);
    fireEvent.mouseLeave(company);
    expect(screen.getByRole("link", {name: "Visit organization"})).toBeTruthy();
    fireEvent.mouseEnter(screen.getByRole("button", {name: "Explore Project"}));
    expect(screen.getByRole("link", {name: "Explore this project"})).toBeTruthy();
    fireEvent.mouseLeave(screen.getByRole("button", {name: "Explore Project"}));
    expect(screen.getByRole("heading", {name: "Hover to explore"})).toBeTruthy();
  });

});
