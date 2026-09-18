import { getAllProjects } from "@/lib/sanity";
import { ProjectsView } from "@/components/portfolio/ProjectsView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Work built for real constraints: backend systems, APIs, database logic, and applied AI integrations.",
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const data = await getAllProjects();

  return <ProjectsView initialProjects={data.projects} />;
}
