"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Bot,
  Braces,
  Check,
  Cloud,
  Code2,
  Database,
  Layers3,
  Search,
  Terminal,
  X,
} from "lucide-react";
import type { Skill, Project } from "@/lib/portfolio";
import { groupSkills } from "../../lib/portfolio";

type Evidence = Pick<Project, "title" | "slug" | "techStack">;
const normalize = (name: string) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, "");
const logos: Record<string, string> = {
  python: "python",
  fastapi: "fastapi",
  docker: "docker",
  postgresql: "postgresql",
  nestjs: "nestjs",
  mongodb: "mongodb",
  sqlalchemy: "sqlalchemy",
  linux: "linux",
  typescript: "typescript",
  javascript: "javascript",
  react: "react",
  nextjs: "nextdotjs",
  git: "git",
  redis: "redis",
  pytorch: "pytorch",
  tensorflow: "tensorflow",
  opencv: "opencv",
};

function glyph(name: string) {
  const value = name.toLowerCase();
  if (/ai|intelligence|vision|learning/.test(value)) return Bot;
  if (/sql|data|mongo|orm/.test(value)) return Database;
  if (/cloud|aws|docker|devops/.test(value)) return Cloud;
  if (/linux|python|shell/.test(value)) return Terminal;
  return Braces;
}

function ToolIcon({ name }: { name: string }) {
  const [failed, setFailed] = useState(false);
  const slug = logos[normalize(name)];
  const Icon = glyph(name);
  return (
    <span className="tool-icon">
      {slug && !failed ? (
        <img
          src={`https://cdn.simpleicons.org/${slug}/f0c276`}
          alt=""
          width="28"
          height="28"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <Icon size={27} strokeWidth={1.5} aria-hidden="true" />
      )}
    </span>
  );
}

export function SkillsExplorer({
  skills,
  projects,
}: {
  skills: Skill[];
  projects: Evidence[];
}) {
  const [category, setCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [selectedName, setSelectedName] = useState(skills[0]?.name ?? "");
  const groups = groupSkills(skills);
  const visible = skills.filter(
    skill =>
      (!category || (skill.category?.trim() || "Skills") === category) &&
      `${skill.name} ${skill.category || ""} ${skill.note || ""}`
        .toLowerCase()
        .includes(query.trim().toLowerCase())
  );
  const selected =
    visible.find(skill => skill.name === selectedName) ?? visible[0];
  const evidence = selected
    ? projects.filter(project =>
        project.techStack.some(
          tech => normalize(tech) === normalize(selected.name)
        )
      )
    : [];

  return (
    <>
      <header className="skills-hero">
        <div className="skills-intro">
          <p className="skills-eyebrow">
            <span /> THE ENGINEERING TOOLKIT
          </p>
          <h1>
            Good tools.
            <br />
            <em>Better together.</em>
          </h1>
          <p className="skills-lede">
            The languages, systems, and infrastructure behind what I build.
            Explore a tool. See where it fits.
          </p>
          <a className="skills-explore-link" href="#toolkit">
            Explore the toolkit <ArrowDown size={16} />
          </a>
          <div className="skills-counts">
            <span>
              <strong>{skills.length}</strong> technologies
            </span>
            <span>
              <strong>{groups.length}</strong> disciplines
            </span>
          </div>
        </div>
        <div
          className="skills-system"
          role="img"
          aria-label="APIs, data, AI, and infrastructure connect to form a working system"
        >
          <div className="system-grid" />
          <div className="system-orbit orbit-outer" />
          <div className="system-orbit orbit-inner" />
          <svg
            className="system-wires"
            viewBox="0 0 500 360"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M100 80 L250 180 L400 80 M100 280 L250 180 L400 280" />
          </svg>
          <div className="system-core">
            <Layers3 size={36} strokeWidth={1.2} />
            <strong>Built to connect.</strong>
            <span>ONE WORKING SYSTEM</span>
          </div>
          <div className="system-node node-api">
            <Braces />
            <span>APIs</span>
          </div>
          <div className="system-node node-data">
            <Database />
            <span>Data</span>
          </div>
          <div className="system-node node-ai">
            <Bot />
            <span>Applied AI</span>
          </div>
          <div className="system-node node-cloud">
            <Cloud />
            <span>Infrastructure</span>
          </div>
          <span className="system-caption">
            FROM AN IDEA TO A RUNNING SYSTEM
          </span>
        </div>
      </header>

      <section id="toolkit" className="toolkit" aria-labelledby="toolkit-title">
        <div className="toolkit-heading">
          <div>
            <p className="skills-eyebrow">OPEN THE TOOLBOX</p>
            <h2 id="toolkit-title">Pick a tool. Follow the work.</h2>
          </div>
          <span className="toolkit-hint">
            Select a tile to explore <ArrowDown size={14} />
          </span>
        </div>
        <div className="toolkit-controls">
          <div
            className="toolkit-filters"
            role="group"
            aria-label="Filter by discipline"
          >
            <button
              type="button"
              aria-pressed={category === null}
              onClick={() => setCategory(null)}
            >
              All tools <span>{skills.length}</span>
            </button>
            {groups.map(([name, items]) => (
              <button
                type="button"
                key={name}
                aria-pressed={category === name}
                onClick={() => setCategory(name)}
              >
                {name} <span>{items.length}</span>
              </button>
            ))}
          </div>
          <div className="toolkit-search">
            <Search size={17} aria-hidden="true" />
            <input
              aria-label="Search skills"
              placeholder="Find a technology…"
              value={query}
              onChange={event => setQuery(event.target.value)}
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setQuery("")}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
        {!skills.length ? (
          <p className="toolkit-empty">
            The toolkit is being updated. Please check back soon.
          </p>
        ) : (
          <>
            <div className="toolkit-workbench">
              <div className="toolkit-collection">
                <p className="toolkit-result" aria-live="polite">
                  {visible.length} {visible.length === 1 ? "tool" : "tools"}{" "}
                  {category ? `in ${category}` : "in the toolkit"}
                </p>
                <div className="toolkit-tiles">
                  {visible.map(skill => (
                    <button
                      key={skill.name}
                      className="tool-tile"
                      type="button"
                      aria-pressed={selected?.name === skill.name}
                      aria-label={`Explore ${skill.name}`}
                      aria-controls="tool-detail"
                      onClick={() => setSelectedName(skill.name)}
                    >
                      <ToolIcon name={skill.name} />
                      <span className="tool-tile-name">{skill.name}</span>
                      <span className="tool-tile-category">
                        {skill.category || "Skills"}
                      </span>
                      <span className="tool-tile-indicator" aria-hidden="true">
                        {selected?.name === skill.name ? (
                          <Check size={14} />
                        ) : (
                          <ArrowUpRight size={14} />
                        )}
                      </span>
                    </button>
                  ))}
                </div>
                {!visible.length && (
                  <div className="toolkit-empty">
                    <Search size={26} />
                    <h3>No matching tools</h3>
                    <p>Try another name or clear the filters.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setQuery("");
                        setCategory(null);
                      }}
                    >
                      Show all tools
                    </button>
                  </div>
                )}
              </div>
              {selected && (
                <aside
                  id="tool-detail"
                  className="tool-detail"
                  aria-label="Selected tool details"
                  aria-live="polite"
                >
                  <div className="tool-detail-content" key={selected.name}>
                    <div className="tool-detail-top">
                      <span className="skills-eyebrow">IN THE TOOLKIT</span>
                      <Code2 size={19} />
                    </div>
                    <ToolIcon name={selected.name} />
                    <p className="tool-detail-category">
                      {selected.category || "Skills"}
                    </p>
                    <h3>{selected.name}</h3>
                    {selected.note && (
                      <p className="tool-detail-note">{selected.note}</p>
                    )}
                    <div className="tool-evidence">
                      <p className="skills-eyebrow">
                        {evidence.length
                          ? "SEE IT IN ACTION"
                          : "EXPLORE MY WORK"}
                      </p>
                      {evidence.length ? (
                        evidence.map(project => (
                          <Link
                            key={project.slug}
                            href={`/projects/${project.slug}`}
                          >
                            <span>{project.title}</span>
                            <ArrowUpRight size={17} />
                          </Link>
                        ))
                      ) : (
                        <>
                          <p>Explore the projects behind this toolkit.</p>
                          <Link href="/projects">
                            Browse projects <ArrowUpRight size={17} />
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </aside>
              )}
            </div>
          </>
        )}
      </section>
      <section className="skills-outro">
        <div>
          <span className="skills-eyebrow">LET’S BUILD SOMETHING</span>
          <h2>
            Your next idea.
            <br />
            The right tools to build it.
          </h2>
        </div>
        <Link className="button-primary" href="/contact">
          Talk about your project <ArrowUpRight size={17} />
        </Link>
      </section>
    </>
  );
}
