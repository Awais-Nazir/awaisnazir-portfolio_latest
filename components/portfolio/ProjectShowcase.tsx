import type { Project } from "@/lib/portfolio";
import { EditorialProject } from "./EditorialProject";

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  return (
    <div className="editorial-project-showcase" aria-label="Selected projects">
      {projects.map((project, index) => (
        <div
          key={project.slug}
          className="editorial-project-stage"
          style={{ zIndex: index + 1 }}
        >
          <EditorialProject
            project={project}
            index={index}
            total={projects.length}
            featured
          />
        </div>
      ))}
      <div className="editorial-project-runway" aria-hidden="true" />
    </div>
  );
}
