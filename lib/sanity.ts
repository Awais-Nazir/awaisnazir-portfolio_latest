import { createClient } from "@sanity/client";
import type { BlogPost, Project, Skill } from "./portfolio";

type RawImage = { asset?: { url?: string } };

export type RawProject = Omit<Project, "coverImageUrl" | "architectureImageUrls" | "video"> & {
  coverImage?: RawImage;
  architectureImages?: RawImage[];
  video?: { source?: "upload" | "link"; file?: RawImage; url?: string };
};

type RawBlogPost = Omit<BlogPost, "coverImageUrl"> & { coverImage?: RawImage };

const apiVersion = "2025-01-01";

export function getClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  if (!projectId || !dataset) return null;
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    perspective: "published",
  });
}

function imageUrl(image?: RawImage): string | undefined {
  return image?.asset?.url;
}

function externalUrl(value?: string): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

export function normalizeProject(project: RawProject): Project {
  return {
    ...project,
    slug: project.slug || "",
    summary: project.summary || "",
    techStack: Array.isArray(project.techStack) ? project.techStack : [],
    tags: Array.isArray(project.tags) ? project.tags : [],
    coverImageUrl: imageUrl(project.coverImage),
    architectureImageUrls: Array.isArray(project.architectureImages)
      ? project.architectureImages.map(imageUrl).filter((value): value is string => Boolean(value))
      : [],
    video: project.video
      ? {
          source: project.video.source,
          url: project.video.source === "upload" ? imageUrl(project.video.file) : externalUrl(project.video.url),
        }
      : undefined,
    liveUrl: externalUrl(project.liveUrl),
    githubUrl: externalUrl(project.githubUrl),
  };
}

export function normalizeBlogPost(post: RawBlogPost): BlogPost {
  return {
    ...post,
    slug: post.slug || "",
    tags: Array.isArray(post.tags) ? post.tags : [],
    coverImageUrl: imageUrl(post.coverImage),
    externalUrl: externalUrl(post.externalUrl),
  };
}

const projectFields = `
  title,
  "slug": slug.current,
  summary,
  coverImage { asset->{url} },
  problem,
  delivered,
  impact,
  techStack,
  tags,
  architectureImages[] { asset->{url} },
  video { source, file { asset->{url} }, url },
  liveUrl,
  githubStatus,
  githubUrl,
  featured,
  order,
  timeframe
`;

const blogFields = `
  title,
  "slug": slug.current,
  excerpt,
  coverImage { asset->{url} },
  publishDate,
  readTime,
  tags,
  externalUrl,
  body
`;

export type HomePortfolioData = {
  configured: boolean;
  projects: Project[];
  skills: Skill[];
  blogPosts: BlogPost[];
};

export async function getHomePortfolioData(): Promise<HomePortfolioData> {
  const client = getClient();
  if (!client) return { configured: false, projects: [], skills: [], blogPosts: [] };

  try {
    const [projects, skills, blogPosts] = await Promise.all([
      client.fetch<RawProject[]>(`*[_type == "project" && featured == true] | order(order asc)[0...3] { ${projectFields} }`),
      client.fetch<Skill[]>(`*[_type == "skill" && showOnHome == true] | order(order asc) { name, note, category, order, showOnHome }`),
      client.fetch<RawBlogPost[]>(`*[_type == "blogPost"] | order(publishDate desc)[0...3] { ${blogFields} }`),
    ]);

    return {
      configured: true,
      projects: projects.map(normalizeProject),
      skills,
      blogPosts: blogPosts.map(normalizeBlogPost),
    };
  } catch (error) {
    console.error("[Sanity] Failed to fetch home data:", error);
    return { configured: false, projects: [], skills: [], blogPosts: [] };
  }
}

export async function getAllProjects(): Promise<{ configured: boolean; projects: Project[] }> {
  const client = getClient();
  if (!client) return { configured: false, projects: [] };
  try {
    const projects = await client.fetch<RawProject[]>(`*[_type == "project"] | order(order asc) { ${projectFields} }`);
    return { configured: true, projects: projects.map(normalizeProject) };
  } catch (error) {
    console.error("[Sanity] Failed to fetch all projects:", error);
    return { configured: false, projects: [] };
  }
}

export async function getProjectBySlug(slug: string): Promise<{ configured: boolean; project: Project | null }> {
  const client = getClient();
  if (!client) return { configured: false, project: null };
  try {
    const project = await client.fetch<RawProject | null>(
      `*[_type == "project" && slug.current == $slug][0] { ${projectFields} }`,
      { slug }
    );
    return { configured: true, project: project ? normalizeProject(project) : null };
  } catch (error) {
    console.error("[Sanity] Failed to fetch project by slug:", error);
    return { configured: false, project: null };
  }
}

export async function getAllSkills(): Promise<{ configured: boolean; skills: Skill[] }> {
  const client = getClient();
  if (!client) return { configured: false, skills: [] };
  try {
    const skills = await client.fetch<Skill[]>(
      `*[_type == "skill"] | order(order asc) { name, note, category, order, showOnHome }`
    );
    return { configured: true, skills };
  } catch (error) {
    console.error("[Sanity] Failed to fetch all skills:", error);
    return { configured: false, skills: [] };
  }
}

export async function getAllBlogPosts(): Promise<{ configured: boolean; blogPosts: BlogPost[] }> {
  const client = getClient();
  if (!client) return { configured: false, blogPosts: [] };
  try {
    const blogPosts = await client.fetch<RawBlogPost[]>(
      `*[_type == "blogPost"] | order(publishDate desc) { ${blogFields} }`
    );
    return { configured: true, blogPosts: blogPosts.map(normalizeBlogPost) };
  } catch (error) {
    console.error("[Sanity] Failed to fetch all blog posts:", error);
    return { configured: false, blogPosts: [] };
  }
}

export async function getBlogPostBySlug(slug: string): Promise<{ configured: boolean; blogPost: BlogPost | null }> {
  const client = getClient();
  if (!client) return { configured: false, blogPost: null };
  try {
    const blogPost = await client.fetch<RawBlogPost | null>(
      `*[_type == "blogPost" && slug.current == $slug][0] { ${blogFields} }`,
      { slug }
    );
    return { configured: true, blogPost: blogPost ? normalizeBlogPost(blogPost) : null };
  } catch (error) {
    console.error("[Sanity] Failed to fetch blog post by slug:", error);
    return { configured: false, blogPost: null };
  }
}
