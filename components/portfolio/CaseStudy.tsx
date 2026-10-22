import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/portfolio";
import { PortableContent } from "./PortfolioUI";
import { displayTechnology } from "@/lib/editorial";

export function CaseStudy({
  project,
  actions,
}: {
  project: Project;
  actions: ReactNode;
}) {
  const sections = [
    { id: "problem", title: "The problem", value: project.problem },
    { id: "contribution", title: "What I delivered", value: project.delivered },
  ].filter(section => section.value?.length);
  const hasArchitecture = project.architectureImageUrls.length > 0;
  const hasImpact = Boolean(project.impact?.length);
  return (
    <main className="editorial-container case-study">
      <Link href="/projects" className="editorial-link editorial-link-muted">
        <ArrowLeft size={16} aria-hidden="true" /> All projects
      </Link>
      <header className="case-study-header">
        <div>
          <p className="editorial-label">
            {project.tags[0] || "Engineering"} / Case study
          </p>
          <h1>{project.title}</h1>
          <p className="case-study-summary">{project.summary}</p>
        </div>
        <div className="case-study-facts">
          {project.timeframe && (
            <>
              <span className="editorial-label">Timeframe</span>
              <p>{project.timeframe}</p>
            </>
          )}
          <span className="editorial-label">Built with</span>
          <ul className="editorial-tech">
            {project.techStack.map(tech => (
              <li key={tech}>{displayTechnology(tech)}</li>
            ))}
          </ul>
        </div>
      </header>
      <div className="case-study-layout">
        <aside className="case-study-aside">
          <div>
            <p className="editorial-label">In this case study</p>
            <nav aria-label="Case study sections">
              {sections.map(section => (
                <a key={section.id} href={`#${section.id}`}>
                  {section.title}
                </a>
              ))}
              {hasArchitecture && (
                <a href="#architecture">System architecture</a>
              )}
              {hasImpact && <a href="#impact">The outcome</a>}
            </nav>
            <div className="case-study-actions">{actions}</div>
          </div>
        </aside>
        <article className="case-study-content">
          {project.coverImageUrl && (
            <div className="case-study-cover">
              <Image
                src={project.coverImageUrl}
                alt={`${project.title} overview`}
                fill
                sizes="(min-width: 1024px) 900px, 90vw"
                priority
              />
            </div>
          )}
          {sections.map((section, index) => (
            <section key={section.id} id={section.id}>
              <span className="editorial-label">
                0{index + 1} / Engineering notes
              </span>
              <h2>{section.title}</h2>
              <PortableContent value={section.value} />
            </section>
          ))}
          {hasArchitecture && (
            <section id="architecture">
              <span className="editorial-label">System design</span>
              <h2>How it fits together.</h2>
              <div className="case-study-architecture">
                {project.architectureImageUrls.map((url, index) => (
                  <a
                    href={url}
                    key={url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${project.title} architecture diagram ${index + 1} at full size`}
                  >
                    <img
                      src={url}
                      alt={`${project.title} architecture diagram ${index + 1}`}
                      loading="lazy"
                    />
                    <span>
                      Open full-size diagram{" "}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </span>
                  </a>
                ))}
              </div>
            </section>
          )}
          {hasImpact && (
            <section id="impact">
              <span className="editorial-label">Results</span>
              <h2>The outcome.</h2>
              <PortableContent value={project.impact} />
            </section>
          )}
          {project.video?.source === "upload" && project.video.url && (
            <section>
              <h2>See it in action.</h2>
              <video
                controls
                preload="metadata"
                className="w-full"
                src={project.video.url}
              />
            </section>
          )}
          <div className="case-study-next">
            <h2>Have a similar challenge?</h2>
            <Link href="/contact" className="editorial-link">
              Let’s talk about it <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <Link
              href="/projects"
              className="editorial-link editorial-link-muted"
            >
              Explore more projects{" "}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
