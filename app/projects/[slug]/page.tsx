import { getAllProjects, getProjectBySlug } from "@/lib/sanity";
import { ProjectDetailView } from "@/components/portfolio/ProjectDetailView";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateStaticParams() {
  const data = await getAllProjects();
  return data.projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { project } = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Case Study`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Awais Nazir`,
      description: project.summary,
      images: project.coverImageUrl ? [project.coverImageUrl] : [],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { project, configured } = await getProjectBySlug(slug);

  return <ProjectDetailView project={project} configured={configured} />;
}
