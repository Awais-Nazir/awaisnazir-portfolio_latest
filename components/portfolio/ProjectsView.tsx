"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import React, { useMemo, useState } from "react";
import { ContentNotice, ProjectCard, SectionHeading } from "@/components/portfolio/PortfolioUI";
import { SiteFrame } from "@/components/portfolio/SiteFrame";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { filterProjects, type Project } from "@/lib/portfolio";
import { getActiveProjectFilterCount } from "@/lib/projectFilters";

function ProjectFilterFields({
  query,
  tag,
  tags,
  onQueryChange,
  onTagChange,
}: {
  query: string;
  tag: string;
  tags: string[];
  onQueryChange: (value: string) => void;
  onTagChange: (value: string) => void;
}) {
  return (
    <>
      <label className="flex items-center gap-3 rounded-xl border border-white/[0.10] bg-black/10 px-3">
        <Search size={16} className="text-[#f0c276]" />
        <span className="sr-only">Search projects</span>
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search projects or technologies"
          className="h-11 min-w-0 flex-1 bg-transparent text-sm text-[#f6f1e9] outline-none placeholder:text-[#f6f1e9]/35"
        />
      </label>
      <label className="grid gap-2 text-sm text-[#f6f1e9]/65">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#f0c276]/80">Technology</span>
        <select
          value={tag}
          onChange={(event) => onTagChange(event.target.value)}
          className="h-11 rounded-xl border border-white/[0.10] bg-[#1a1815] px-3 text-sm text-[#f6f1e9] outline-none focus:border-[#f0c276]/60"
        >
          <option value="">All tags</option>
          {tags.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
    </>
  );
}

export function ProjectsView({ initialProjects }: { initialProjects: Project[] }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filterFeedback, setFilterFeedback] = useState<"idle" | "hover" | "pressed">("idle");

  const projects = initialProjects;
  const tags = useMemo(
    () => Array.from(new Set(projects.flatMap((project) => [...project.tags, ...project.techStack]))).sort(),
    [projects]
  );
  const visibleProjects = useMemo(() => filterProjects(projects, query, tag), [projects, query, tag]);
  const activeFilterCount = getActiveProjectFilterCount(query, tag);
  const resetFilters = () => {
    setQuery("");
    setTag("");
  };

  return (
    <SiteFrame>
      <main className="container py-8 sm:py-12">
        <SectionHeading eyebrow="Projects" title="Work built for real constraints." />
        <div className="mt-6 md:hidden">
          <Drawer open={filtersOpen} onOpenChange={setFiltersOpen}>
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              onPointerEnter={() => setFilterFeedback("hover")}
              onPointerLeave={() => setFilterFeedback("idle")}
              onPointerDown={() => setFilterFeedback("pressed")}
              onPointerUp={() => setFilterFeedback("hover")}
              data-feedback={filterFeedback}
              className="button-secondary w-full"
            >
              <SlidersHorizontal size={16} /> Filter projects
              {activeFilterCount > 0 && (
                <span className="rounded-full bg-[#f0c276]/15 px-2 py-0.5 font-mono text-[10px] text-[#f0c276]">
                  {activeFilterCount} active
                </span>
              )}
            </button>
            <DrawerContent className="border-white/[0.12] bg-[#17130f] text-[#f6f1e9]">
              <DrawerHeader>
                <DrawerTitle className="text-[#f6f1e9]">Filter projects</DrawerTitle>
                <DrawerDescription className="text-[#f6f1e9]/58">
                  Search systems or narrow the selection by technology.
                </DrawerDescription>
              </DrawerHeader>
              <div className="grid gap-4 px-4 pb-2">
                <ProjectFilterFields
                  query={query}
                  tag={tag}
                  tags={tags}
                  onQueryChange={setQuery}
                  onTagChange={setTag}
                />
              </div>
              <DrawerFooter className="grid grid-cols-2 gap-3">
                <button type="button" onClick={resetFilters} className="button-secondary px-3">
                  Reset
                </button>
                <button type="button" onClick={() => setFiltersOpen(false)} className="button-primary px-3">
                  Show {visibleProjects.length} project{visibleProjects.length === 1 ? "" : "s"}
                </button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
        <div className="mt-6 hidden grid-cols-[minmax(0,1fr)_minmax(180px,.38fr)_auto] items-end gap-4 rounded-2xl border border-white/[0.09] bg-white/[0.035] p-4 md:grid">
          <ProjectFilterFields
            query={query}
            tag={tag}
            tags={tags}
            onQueryChange={setQuery}
            onTagChange={setTag}
          />
          <button type="button" onClick={resetFilters} aria-label="Clear project filters" className="nav-icon-button">
            <X size={16} />
          </button>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.length ? (
            visibleProjects.map((project) => <ProjectCard key={project.slug} project={project} />)
          ) : projects.length ? (
            <div className="md:col-span-2 xl:col-span-3">
              <ContentNotice type="matching projects" />
            </div>
          ) : (
            <div className="md:col-span-2 xl:col-span-3">
              <ContentNotice type="projects" />
            </div>
          )}
        </div>
      </main>
    </SiteFrame>
  );
}
