import { describe, expect, it } from "vitest";
import { contactInputSchema } from "./routers/contact";
import { filterProjects, groupSkills, type Project, type Skill } from "../client/src/lib/portfolio";
import { normalizeProject, type RawProject } from "./portfolio";

const projects: Project[] = [
  {
    title: "Vision Workflow",
    slug: "vision-workflow",
    summary: "Computer vision workflow for operations.",
    techStack: ["Python", "PostgreSQL"],
    tags: ["AI", "Backend"],
    architectureImageUrls: [],
    githubStatus: "private",
    featured: true,
    order: 1,
  },
  {
    title: "API Platform",
    slug: "api-platform",
    summary: "NestJS service architecture.",
    techStack: ["NestJS", "Docker"],
    tags: ["Backend"],
    architectureImageUrls: [],
    githubStatus: "public",
    featured: false,
    order: 2,
  },
];

describe("portfolio data helpers", () => {
  it("normalizes Sanity project image references and optional arrays", () => {
    const project = normalizeProject({
      title: "CMS Project",
      slug: "cms-project",
      summary: "A project supplied by Sanity.",
      techStack: undefined as unknown as string[],
      tags: undefined as unknown as string[],
      coverImage: { asset: { url: "https://cdn.example.com/cover.jpg" } },
      architectureImages: [{ asset: { url: "https://cdn.example.com/architecture.png" } }, {}],
      video: { source: "link", url: "https://example.com/video" },
      githubStatus: "none",
      featured: false,
      order: 1,
    } as RawProject);
    expect(project).toMatchObject({
      coverImageUrl: "https://cdn.example.com/cover.jpg",
      architectureImageUrls: ["https://cdn.example.com/architecture.png"],
      techStack: [],
      tags: [],
      video: { source: "link", url: "https://example.com/video" },
    });
  });

  it("filters projects by a search term across content and technology", () => {
    expect(filterProjects(projects, "postgres", "")).toEqual([projects[0]]);
    expect(filterProjects(projects, "", "Backend")).toEqual(projects);
  });

  it("groups skills by their category and places uncategorized skills in Skills", () => {
    const skills: Skill[] = [
      { name: "NestJS", category: "Backend", order: 1, showOnHome: true },
      { name: "Docker", order: 2, showOnHome: true },
    ];
    expect(groupSkills(skills)).toEqual([
      ["Backend", [skills[0]]],
      ["Skills", [skills[1]]],
    ]);
  });
});

describe("contact input validation", () => {
  it("accepts valid name, email, and message fields", () => {
    const result = contactInputSchema.safeParse({
      name: "Aisha Khan",
      email: "aisha@example.com",
      message: "I would like to discuss a backend systems engineering role.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid contact form input", () => {
    const result = contactInputSchema.safeParse({ name: "A", email: "invalid", message: "short" });
    expect(result.success).toBe(false);
  });
});
