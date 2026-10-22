"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  LockKeyhole,
  Share2,
  Video,
} from "lucide-react";
import Link from "next/link";
import { ContentNotice } from "@/components/portfolio/PortfolioUI";
import { CaseStudy } from "./CaseStudy";
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
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className={liveClass}
        >
          Live demo <ArrowUpRight size={14} />
        </a>
      )}
      {project.githubStatus === "public" && project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className={actionClass}
        >
          <Github size={14} /> GitHub <ArrowUpRight size={13} />
        </a>
      )}
      {project.githubStatus === "private" && (
        <span className={`${actionClass} cursor-default`}>
          <LockKeyhole size={14} /> Private repository
        </span>
      )}
      {project.video?.url && (
        <a
          href={project.video.url}
          target="_blank"
          rel="noreferrer"
          className={actionClass}
        >
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
    const details = {
      title: project?.title ?? "Project",
      text: project?.summary ?? "",
      url,
    };
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
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-[#f0c276]"
          >
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
        <ProjectActionLinks
          project={project}
          shareLabel={shareLabel}
          onShare={shareProject}
          compact
        />
      </div>
    </div>
  );

  return (
    <>
      <SiteFrame>
        <CaseStudy
          project={project}
          actions={
            <ProjectActionLinks
              project={project}
              shareLabel={shareLabel}
              onShare={shareProject}
            />
          }
        />
      </SiteFrame>
      {mounted && createPortal(mobileActionDock, document.body)}
    </>
  );
}
