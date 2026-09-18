export type Project = {
  title: string;
  slug: string;
  summary: string;
  coverImageUrl?: string;
  problem?: unknown[];
  delivered?: unknown[];
  impact?: unknown[];
  techStack: string[];
  tags: string[];
  architectureImageUrls: string[];
  video?: { source?: "upload" | "link"; url?: string };
  liveUrl?: string;
  githubStatus: "public" | "private" | "none";
  githubUrl?: string;
  featured: boolean;
  order: number;
  timeframe?: string;
};

export type Skill = {
  name: string;
  note?: string;
  category?: string;
  order: number;
  showOnHome: boolean;
};

export type BlogPost = {
  title: string;
  slug: string;
  excerpt?: string;
  coverImageUrl?: string;
  publishDate?: string;
  readTime?: string;
  tags: string[];
  externalUrl?: string;
  body?: unknown[];
};

export function filterProjects(projects: Project[], query: string, tag: string): Project[] {
  const normalizedQuery = query.trim().toLowerCase();
  return projects.filter((project) => {
    const matchesQuery = !normalizedQuery || [project.title, project.summary, ...project.techStack, ...project.tags]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery);
    const matchesTag = !tag || project.tags.includes(tag) || project.techStack.includes(tag);
    return matchesQuery && matchesTag;
  });
}

export function groupSkills(skills: Skill[]): Array<[string, Skill[]]> {
  const groups = new Map<string, Skill[]>();
  skills.forEach((skill) => {
    const key = skill.category?.trim() || "Skills";
    groups.set(key, [...(groups.get(key) ?? []), skill]);
  });
  return Array.from(groups.entries());
}

export function formatDate(value?: string): string {
  if (!value) return "";
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}
