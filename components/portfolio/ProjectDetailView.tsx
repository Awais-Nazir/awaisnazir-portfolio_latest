"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowUpRight, Github, LockKeyhole, Share2, Video } from "lucide-react";
import Link from "next/link";
import { ContentNotice, PortableContent } from "@/components/portfolio/PortfolioUI";
import { SiteFrame } from "@/components/portfolio/SiteFrame";
import type { Project } from "@/lib/portfolio";

function ProjectActionLinks({
  project,
  shareLabel,
  onShare,
  compact = false,
}: {
  project: Project;
  shareLabel: string;
  onShare: () => void;
  compact?: boolean;
}) {
  const layoutClass = compact
    ? "flex gap-2 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]"
    : "grid gap-2";
  const actionClass = compact
    ? "button-secondary shrink-0 whitespace-nowrap px-3 py-2 text-xs"
    : "button-secondary w-full";
  const liveClass = compact
    ? "button-primary shrink-0 whitespace-nowrap px-3 py-2 text-xs"
    : "button-primary w-full";

  return (
    <div className={layoutClass}>
      {project.liveUrl && (
        <a href={project.liveUrl} target="_blank" rel="noreferrer" className={liveClass}>
          Live demo <ArrowUpRight size={14} />
        </a>
      )}
      {project.githubStatus === "public" && project.githubUrl && (
        <a href={project.githubUrl} target="_blank" rel="noreferrer" className={actionClass}>
          <Github size={14} /> GitHub <ArrowUpRight size={13} />
        </a>
      )}
      {project.githubStatus === "private" && (
        <span className={`${actionClass} cursor-default`}>
          <LockKeyhole size={14} /> Private repository
        </span>
      )}
      {project.video?.url && (
        <a href={project.video.url} target="_blank" rel="noreferrer" className={actionClass}>
          <Video size={14} /> Watch video <ArrowUpRight size={13} />
        </a>
      )}
      <button type="button" onClick={onShare} className={actionClass}>
        <Share2 size={14} /> {shareLabel}
      </button>
    </div>
  );
}

export function ProjectDetailView({
  project,
  configured,
}: {
  project: Project | null;
  configured: boolean;
}) {
  const [shareLabel, setShareLabel] = useState("Share project");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const shareProject = async () => {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    const details = { title: project?.title ?? "Project", text: project?.summary ?? "", url };
    if (navigator.share) {
      try {
        await navigator.share(details);
        return;
      } catch (error) {
        if ((error as { name?: string }).name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setShareLabel("Link copied");
    } catch {
      setShareLabel("Copy link unavailable");
    }
    window.setTimeout(() => setShareLabel("Share project"), 2400);
  };

  if (!project) {
    return (
      <SiteFrame>
        <main className="container py-8 sm:py-12">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-[#f0c276]">
            <ArrowLeft size={16} /> Back to Projects
          </Link>
          <div className="mt-6">
            <ContentNotice type={configured ? "project" : "project content"} />
          </div>
        </main>
      </SiteFrame>
    );
  }

  const mobileActionDock = (
    <div
      className="project-action-dock fixed inset-x-0 bottom-0 z-[90] border-t border-white/[0.12] bg-[#120f0c]/96 px-0 pt-2 shadow-[0_-16px_36px_rgba(0,0,0,.34)] backdrop-blur-xl lg:hidden"
      data-testid="mobile-project-actions"
    >
      <div className="container pb-[max(.75rem,env(safe-area-inset-bottom))]">
        <ProjectActionLinks project={project} shareLabel={shareLabel} onShare={shareProject} compact />
      </div>
    </div>
  );

  return (
    <>
      <SiteFrame>
        <main className="container pb-28 pt-8 sm:pt-12 lg:pb-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-[#f0c276] transition hover:text-[#ffe0a5]"
          >
            <ArrowLeft size={16} /> Back to Projects
          </Link>
          <article className="mx-auto mt-7 max-w-6xl">
            <header className="grid gap-4 sm:grid-cols-[minmax(160px,1fr)_minmax(0,3.5fr)_minmax(160px,1fr)] sm:items-start">
              <div>
                <span className="inline-flex rounded-full border border-white/[0.1] px-3 py-1 text-xs text-[#f0c276]">
                  {project.tags[0] || "Project"}
                </span>
                {project.timeframe && (
                  <p className="mt-2 font-mono text-xs text-[#f6f1e9]/45">{project.timeframe}</p>
                )}
              </div>
              <div className="text-center sm:col-start-2">
                <h1 className="text-4xl font-semibold tracking-[-0.055em] text-[#f6f1e9] sm:text-6xl">
                  {project.title}
                </h1>
                {project.summary && (
                  <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-[#f6f1e9]/64 sm:text-lg sm:leading-8">
                    {project.summary}
                  </p>
                )}
              </div>
            </header>
            <div className="mt-10 grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
              <aside className="hidden lg:block">
                <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-2xl border border-white/[0.1] bg-[#17130f]/88 p-4 backdrop-blur">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#f0c276]">
                    Project links
                  </p>
                  <div className="mt-4">
                    <ProjectActionLinks project={project} shareLabel={shareLabel} onShare={shareProject} />
                  </div>
                </div>
              </aside>
              <div>
                {project.coverImageUrl && (
                  <img
                    src={project.coverImageUrl}
                    alt=""
                    className="aspect-[16/8] w-full rounded-2xl border border-white/[0.10] object-cover"
                  />
                )}
                <div className="mt-12 grid gap-12">
                  <section>
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#f0c276]">Problem</p>
                    <div className="mt-4">
                      <PortableContent value={project.problem} />
                    </div>
                  </section>
                  <section>
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#f0c276]">Delivered</p>
                    <div className="mt-4">
                      <PortableContent value={project.delivered} />
                    </div>
                  </section>
                  <section>
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#f0c276]">Impact</p>
                    <div className="mt-4">
                      <PortableContent value={project.impact} />
                    </div>
                  </section>
                </div>
                {project.techStack.length > 0 && (
                  <section className="mt-14">
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#f0c276]">Tech stack</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg border border-white/[0.10] bg-white/[0.04] px-3 py-2 font-mono text-xs text-[#f6f1e9]/65"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </section>
                )}
                {project.architectureImageUrls.length > 0 && (
                  <section className="mt-14">
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#f0c276]">Architecture</p>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      {project.architectureImageUrls.slice(0, 2).map((url) => (
                        <img
                          key={url}
                          src={url}
                          alt={`${project.title} architecture`}
                          className="rounded-2xl border border-white/[0.10]"
                        />
                      ))}
                    </div>
                  </section>
                )}
                {project.video?.source === "upload" && project.video.url && (
                  <section className="mt-14">
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#f0c276]">Video</p>
                    <div className="mt-4 overflow-hidden rounded-2xl border border-white/[0.10]">
                      <video controls className="w-full" src={project.video.url} />
                    </div>
                  </section>
                )}
              </div>
            </div>
          </article>
        </main>
      </SiteFrame>
      {mounted && createPortal(mobileActionDock, document.body)}
    </>
  );
}
