import {
  ArrowUpRight,
  Bot,
  Cloud,
  Database,
  FileText,
  Github,
  GraduationCap,
  Linkedin,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ContactForm } from "@/components/portfolio/ContactForm";
import { ContentNotice } from "@/components/portfolio/PortfolioUI";
import { ProjectShowcase } from "@/components/portfolio/ProjectShowcase";
import { ExperienceTimeline } from "@/components/portfolio/ExperienceTimeline";
import { SiteFrame } from "@/components/portfolio/SiteFrame";
import type { BlogPost, Project, Skill } from "@/lib/portfolio";
import { formatDate } from "@/lib/portfolio";
import { displayTechnology } from "@/lib/editorial";
import { initialExperience, universityUrl } from "@/lib/portfolioInteractions";
import { getPublicLinks } from "@/lib/publicLinks";

const technologyIconSlugs: Record<string, string> = {
  aws: "amazonaws",
  docker: "docker",
  fastapi: "fastapi",
  gstreamer: "gstreamer",
  nestjs: "nestjs",
  "openai api": "openai",
  openai: "openai",
  postgresql: "postgresql",
  python: "python",
  webhooks: "socketdotio",
  websockets: "socketdotio",
};

function technologyIconSlug(name: string) {
  return technologyIconSlugs[displayTechnology(name).toLowerCase()];
}

function TechnologyMarquee({ rows }: { rows: Skill[][] }) {
  return (
    <div className="capability-logo-cloud">
      <span className="editorial-label">Technology stack</span>
      <div className="capability-marquee" aria-label="Technology stack">
        {rows.map((row, rowIndex) => (
          <div
            className={`capability-marquee-row ${rowIndex % 2 ? "is-reverse" : ""}`}
            key={rowIndex}
          >
            <ul>
              {Array.from({ length: 4 }, () => row)
                .flat()
                .map((skill, index) => {
                  const name = displayTechnology(skill.name);
                  const icon = technologyIconSlug(name);
                  return (
                    <li key={`${skill.name}-${index}`} title={name}>
                      {icon ? (
                        <img
                          src={`https://cdn.simpleicons.org/${icon}/d7c7aa`}
                          alt={index < row.length ? `${name} logo` : ""}
                          aria-hidden={index >= row.length}
                        />
                      ) : (
                        <span aria-hidden="true">{name.charAt(0)}</span>
                      )}
                      <span>{name}</span>
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function BlogStory({
  post,
  featured = false,
}: {
  post: BlogPost;
  featured?: boolean;
}) {
  const story = (
    <article
      className={`editorial-blog-story ${featured ? "is-featured" : ""}`}
    >
      <div className="editorial-blog-image">
        {post.coverImageUrl ? (
          <>
            <Image
              src={post.coverImageUrl}
              alt=""
              aria-hidden="true"
              fill
              className="editorial-blog-image-backdrop"
              sizes={
                featured
                  ? "(min-width: 1024px) 52vw, 100vw"
                  : "(min-width: 1024px) 28vw, 100vw"
              }
            />
            <Image
              src={post.coverImageUrl}
              alt=""
              fill
              className="editorial-blog-image-content"
              sizes={
                featured
                  ? "(min-width: 1024px) 52vw, 100vw"
                  : "(min-width: 1024px) 28vw, 100vw"
              }
            />
          </>
        ) : (
          <FileText size={featured ? 34 : 24} aria-hidden="true" />
        )}
      </div>
      <div className="editorial-blog-story-copy">
        <div className="editorial-blog-story-meta">
          <span>{formatDate(post.publishDate) || "Field note"}</span>
          <span>{post.readTime || "Article"}</span>
        </div>
        <h3>{post.title}</h3>
        {post.excerpt && <p>{post.excerpt}</p>}
        <span className="editorial-blog-read">
          Read article <ArrowUpRight size={15} aria-hidden="true" />
        </span>
      </div>
    </article>
  );

  return post.externalUrl ? (
    <a
      href={post.externalUrl}
      target="_blank"
      rel="noreferrer"
      className="editorial-blog-story-link"
    >
      {story}
    </a>
  ) : (
    <Link href={`/blog/${post.slug}`} className="editorial-blog-story-link">
      {story}
    </Link>
  );
}

export function HomeView({
  projects,
  skills,
  blogPosts,
}: {
  projects: Project[];
  skills: Skill[];
  blogPosts: BlogPost[];
}) {
  const links = getPublicLinks();
  const selectedProjects = projects.slice(0, 3);
  const skillRows = [
    skills.filter((_, index) => index % 2 === 0),
    skills.filter((_, index) => index % 2 !== 0),
  ].filter(row => row.length > 0);
  return (
    <SiteFrame>
      <main className="editorial-home editorial-container" id="home">
        <div className="editorial-opening">
          <section className="editorial-intro" aria-labelledby="intro-heading">
            <div className="editorial-person">
              <Image
                src="/images/img2.png"
                alt="Awais Nazir"
                width={56}
                height={56}
                className="editorial-portrait"
                priority
              />
              <div>
                <p>Awais Nazir</p>
                <span>Islamabad, Pakistan</span>
              </div>
            </div>
            <h1 id="intro-heading">
              Software engineer. <br />
              <span>
                AI & backend <br />
                systems.
              </span>
            </h1>
            <p className="editorial-intro-copy">
              I build the systems behind the interface: APIs, databases, and AI
              tools that turn complex problems into useful software.
            </p>
            <div className="editorial-intro-actions">
              <Link href="/projects" className="button-primary">
                View all projects <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
              <a
                href={links.cv || "/contact"}
                target={links.cv ? "_blank" : undefined}
                rel={links.cv ? "noreferrer" : undefined}
                className="editorial-link"
              >
                <FileText size={16} aria-hidden="true" />
                {links.cv ? "View résumé" : "Request résumé"}
              </a>
            </div>
            <div className="editorial-current">
              <span className="editorial-label">Currently</span>
              <p>
                {initialExperience.role}
                <br />
                <a
                  href={initialExperience.companyUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {initialExperience.company}
                </a>
              </p>
              <span className="editorial-caption">
                NestJS · PostgreSQL · AWS
              </span>
            </div>
            <div className="editorial-socials">
              {links.github && (
                <a href={links.github} target="_blank" rel="noreferrer">
                  <Github size={15} aria-hidden="true" />
                  GitHub <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              )}
              {links.linkedin && (
                <a href={links.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin size={15} aria-hidden="true" />
                  LinkedIn <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              )}
              <Link href="/contact">
                Get in touch <ArrowUpRight size={13} aria-hidden="true" />
              </Link>
            </div>
          </section>
          <section
            id="projects"
            className="editorial-selected"
            aria-labelledby="work-heading"
          >
            <h2 id="work-heading" className="sr-only">
              Selected projects
            </h2>
            <p className="editorial-project-guide" aria-hidden="true">
              Scroll to explore{" "}
              <span>
                {selectedProjects.length} case
                {selectedProjects.length === 1 ? " study" : " studies"}
              </span>
            </p>
            {selectedProjects.length ? (
              <ProjectShowcase projects={selectedProjects} />
            ) : (
              <ContentNotice type="projects" />
            )}
          </section>
        </div>
        <section
          id="experience"
          className="editorial-section editorial-two-column"
          aria-labelledby="experience-heading"
        >
          <div>
            <span className="editorial-label">Background</span>
            <h2 id="experience-heading" className="editorial-heading">
              The work <br />
              behind the work.
            </h2>
            <p className="editorial-section-copy">
              From Python projects to production services. A few places where
              I’ve put the tools into practice.
            </p>
            <div className="editorial-education">
              <span className="editorial-education-label">
                <GraduationCap size={15} aria-hidden="true" />
                <span className="editorial-label">Education</span>
              </span>
              <p>
                BS Software Engineering
                <br />
                <a href={universityUrl} target="_blank" rel="noreferrer">
                  UET Taxila
                </a>{" "}
                · 2026
              </p>
              <span className="editorial-caption">CGPA 3.51 / 4.00</span>
            </div>
          </div>
          <ExperienceTimeline />
        </section>
        <section
          id="skills"
          className="editorial-section editorial-capability-section"
          aria-labelledby="skills-heading"
        >
          {skillRows.length > 0 && <TechnologyMarquee rows={skillRows} />}
          <div className="capability-layout">
            <div className="editorial-section-intro editorial-capabilities-intro">
              <span className="editorial-label">Capabilities</span>
              <h2 id="skills-heading" className="editorial-heading">
                A toolkit. <br />
                Put to work.
              </h2>
              <p className="editorial-section-copy">
                Systems that ship. AI that stays useful.
              </p>
              <Link href="/skills" className="editorial-link">
                All technical skills{" "}
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <div className="editorial-capabilities">
              <div className="capability-card-grid">
                <article className="capability-card">
                  <div className="capability-card-header">
                    <span className="capability-icon" aria-hidden="true">
                      <Database size={20} />
                    </span>
                    <span className="capability-kicker">Backend systems</span>
                  </div>
                  <h3>Services that hold up in production.</h3>
                  <a
                    href={initialExperience.companyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="capability-proof"
                  >
                    Endpoint Clients · production systems
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </article>
                <article className="capability-card">
                  <div className="capability-card-header">
                    <span className="capability-icon" aria-hidden="true">
                      <Bot size={20} />
                    </span>
                    <span className="capability-kicker">Applied AI</span>
                  </div>
                  <h3>AI workflows people can trust.</h3>
                  <Link
                    href="/projects/ai-rag-system"
                    className="capability-proof"
                  >
                    AI RAG System · case study
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                </article>
                <article className="capability-card">
                  <div className="capability-card-header">
                    <span className="capability-icon" aria-hidden="true">
                      <Cloud size={20} />
                    </span>
                    <span className="capability-kicker">
                      Delivery & infrastructure
                    </span>
                  </div>
                  <h3>From deployment to edge device.</h3>
                  <Link
                    href="/projects/faceme-sdk-integration-backend"
                    className="capability-proof"
                  >
                    FaceMe SDK Integration · case study
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                </article>
              </div>
            </div>
          </div>
        </section>
        <section
          id="blog"
          className="editorial-section editorial-blog editorial-blog-section"
          aria-labelledby="writing-heading"
        >
          <div className="editorial-blog-heading">
            <div>
              <span className="editorial-label">Field notes</span>
              <h2 id="writing-heading" className="editorial-heading">
                From the build process.
              </h2>
            </div>
            <Link href="/blog" className="editorial-link">
              All writing <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          {blogPosts.length ? (
            <div
              className={`editorial-blog-grid ${blogPosts.length > 1 ? "has-rail" : ""}`}
            >
              <BlogStory post={blogPosts[0]} featured />
              {blogPosts.length > 1 && (
                <div className="editorial-blog-rail">
                  {blogPosts.slice(1, 3).map(post => (
                    <BlogStory key={post.slug} post={post} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <ContentNotice type="articles" />
          )}
        </section>
        <section
          id="contact"
          className="editorial-section editorial-two-column editorial-contact"
          aria-labelledby="contact-heading"
        >
          <div>
            <span className="editorial-label">Get in touch</span>
            <h2 id="contact-heading" className="editorial-heading">
              Good work starts <br />
              with a conversation.
            </h2>
            <p className="editorial-section-copy">
              Hiring for your team or have a project in mind? Tell me what
              you’re building.
            </p>
            {links.email && (
              <a
                className="editorial-link editorial-email"
                href={`mailto:${links.email}`}
              >
                {links.email}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
            <Link
              href="/contact"
              className="editorial-link editorial-link-muted"
            >
              More ways to connect <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <ContactForm />
        </section>
      </main>
    </SiteFrame>
  );
}
