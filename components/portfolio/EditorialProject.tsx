"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/portfolio";
import { displayTechnology, portableTextPreview } from "@/lib/editorial";

export function EditorialProject({
  project,
  index,
  total,
  featured = false,
}: {
  project: Project;
  index: number;
  total?: number;
  featured?: boolean;
}) {
  const contribution = portableTextPreview(project.delivered);
  return (
    <article
      className={featured ? "editorial-feature" : "editorial-project"}
      data-expanded={featured || undefined}
    >
      <div className="editorial-project-meta">
        <span>
          {String(index + 1).padStart(2, "0")} /{" "}
          {total ? `${String(total).padStart(2, "0")} · ` : ""}
          {project.tags[0] || "Engineering"}
        </span>
        {featured && <span>Case study</span>}
      </div>
      <div className="editorial-project-body">
        <div>
          <h3>
            <Link href={`/projects/${project.slug}`}>
              {project.title}
              <ArrowUpRight aria-hidden="true" size={22} />
            </Link>
          </h3>
          <p className="editorial-project-summary">{project.summary}</p>
          <ul
            className="editorial-tech"
            aria-label={`${project.title} technologies`}
          >
            {project.techStack.slice(0, featured ? 5 : 4).map(tech => (
              <li key={tech}>{displayTechnology(tech)}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="editorial-project-reveal" aria-hidden={!featured}>
        <div className="editorial-project-reveal-inner">
          {project.coverImageUrl && (
            <Link
              href={`/projects/${project.slug}`}
              className="editorial-feature-image"
              aria-label={`Read ${project.title} case study`}
              tabIndex={featured ? 0 : -1}
            >
              <Image
                src={project.coverImageUrl}
                alt={`${project.title} overview`}
                fill
                sizes="(min-width: 1024px) 600px, (min-width: 640px) 85vw, 90vw"
                priority={featured}
              />
            </Link>
          )}
          {contribution && (
            <div className="editorial-contribution">
              <span className="editorial-label">My contribution</span>
              <p>{contribution}</p>
            </div>
          )}
        </div>
      </div>
      <div className="editorial-project-actions">
        <Link href={`/projects/${project.slug}`} className="editorial-link">
          {featured ? "Read the case study" : "Explore project"}
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="editorial-link editorial-link-muted"
          >
            Live demo <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        )}
        {!project.liveUrl && project.githubStatus === "private" && (
          <span className="editorial-caption">Private repository</span>
        )}
      </div>
    </article>
  );
}
