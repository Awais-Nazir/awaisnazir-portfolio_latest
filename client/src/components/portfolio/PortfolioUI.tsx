import { ArrowUpRight, LockKeyhole, Radio, Terminal, X, ZoomIn } from "lucide-react";
import { Link } from "wouter";
import { PortableText } from "@portabletext/react";
import type { BlogPost, Project, Skill } from "@/lib/portfolio";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { shouldClosePreviewOnKey } from "@/lib/portfolioInteractions";

export function SectionHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return <div className="max-w-2xl"><p className="font-mono text-xs uppercase tracking-[0.18em] text-[#f0c276]">{eyebrow}</p><h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-[#f6f1e9] sm:text-4xl">{title}</h2>{body && <p className="mt-4 text-base leading-7 text-[#f6f1e9]/62">{body}</p>}</div>;
}

export function ProjectCard({ project }: { project: Project }) {
  const category = project.tags[0] || "Project";
  const access = project.githubStatus === "private" ? "Private" : project.liveUrl ? "Live link" : project.githubStatus === "public" ? "Public code" : "Details";
  const [isImageOpen, setImageOpen] = useState(false);
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) { if (shouldClosePreviewOnKey(event.key)) setImageOpen(false); }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  return <article className="group surface-card relative flex h-full flex-col overflow-hidden">
    <button type="button" onClick={() => project.coverImageUrl && setImageOpen(true)} disabled={!project.coverImageUrl} aria-label={project.coverImageUrl ? `Preview ${project.title} project image` : undefined} className="relative z-10 aspect-[16/9] overflow-hidden bg-[radial-gradient(circle_at_20%_15%,rgba(240,194,118,.18),transparent_28%),linear-gradient(135deg,#263747,#121a22)] text-left disabled:cursor-default">
      {project.coverImageUrl ? <img src={project.coverImageUrl} alt={`${project.title} project preview`} className="size-full object-cover transition duration-500 group-hover:scale-[1.04]" /> : <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_10%,rgba(255,255,255,.05),transparent_55%)]" />}
      <span className="pointer-events-none absolute inset-x-4 top-4 flex items-center justify-between gap-3"><span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[11px] font-medium text-[#f6f1e9]/75 backdrop-blur">{category}</span><span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[11px] font-medium text-[#f6f1e9]/75 backdrop-blur">{project.githubStatus === "private" ? <LockKeyhole size={11} /> : <Radio size={11} />}{access}</span></span>
      {project.coverImageUrl && <span className="pointer-events-none absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/35 px-2.5 py-1.5 text-[11px] text-[#f6f1e9]/85 opacity-0 backdrop-blur transition duration-300 group-hover:opacity-100 group-focus-within:opacity-100"><ZoomIn size={12} /> Preview image</span>}
    </button>
    <Link href={`/projects/${project.slug}`} className="absolute inset-x-0 bottom-0 top-[56.25%] z-[1] rounded-b-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f0c276]" aria-label={`View ${project.title} project details`} />
    <div className="pointer-events-none relative z-10 flex flex-1 flex-col p-5 sm:p-6">
      <h3 className="text-xl font-medium tracking-[-0.03em] text-[#f6f1e9]">{project.title}</h3>
      <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#f6f1e9]/58">{project.summary}</p>
      <div className="mt-5 flex flex-wrap gap-1.5">{project.techStack.slice(0, 4).map((tech) => <span key={tech} className="rounded-md border border-white/[0.08] bg-white/[0.035] px-2 py-1 font-mono text-[10px] text-[#f6f1e9]/55">{tech}</span>)}</div>
      <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-4"><Link href={`/projects/${project.slug}`} className="pointer-events-auto relative z-10 inline-flex items-center gap-1.5 text-sm font-medium text-[#f0c276] transition hover:text-[#ffe0a5]">View project <ArrowUpRight size={15} /></Link>{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="pointer-events-auto relative z-10 inline-flex items-center gap-1 text-xs text-[#f6f1e9]/55 transition hover:text-[#f0c276]">Live demo <ArrowUpRight size={13} /></a>}</div>
    </div>
    {isImageOpen && project.coverImageUrl && createPortal(<div className="fixed inset-0 z-[100] grid place-items-center bg-[#070605]/92 p-4 backdrop-blur-md sm:p-8" role="dialog" aria-modal="true" aria-label={`${project.title} project image`} onClick={() => setImageOpen(false)}><div className="relative flex max-h-full w-full max-w-[94vw] flex-col items-center" onClick={(event) => event.stopPropagation()}><img src={project.coverImageUrl} alt={`${project.title} project preview`} className="max-h-[88svh] w-auto max-w-full rounded-2xl border border-white/[0.16] object-contain shadow-[0_30px_80px_rgba(0,0,0,0.6)]" /><button type="button" onClick={() => setImageOpen(false)} className="absolute -right-2 -top-2 grid size-11 place-items-center rounded-full border border-white/15 bg-[#17130f] text-[#f6f1e9] shadow-xl transition hover:border-[#f0c276] hover:text-[#f0c276]" aria-label="Close image preview"><X size={19} /></button><p className="mt-4 text-center text-xs text-[#f6f1e9]/60">Press Escape or select close to return to the project.</p></div></div>, document.body)}
  </article>;
}

export function SkillItem({ skill }: { skill: Skill }) {
  return <li className="flex gap-3 py-3"><span className="mt-1.5 grid size-5 shrink-0 place-items-center rounded-full border border-[#f0c276]/35 bg-[#f0c276]/10 text-[#f0c276]"><Terminal size={10} /></span><div><p className="text-sm font-medium text-[#f6f1e9]">{skill.name}</p>{skill.note && <p className="mt-1 text-sm leading-5 text-[#f6f1e9]/55">{skill.note}</p>}</div></li>;
}

export function BlogCard({ post }: { post: BlogPost }) {
  const card = <article className="surface-card h-full overflow-hidden p-5 transition sm:p-6"><div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#f0c276]"><span>{post.publishDate ? new Date(post.publishDate).toLocaleDateString("en", { month: "short", year: "numeric" }) : "Writing"}</span>{post.readTime && <><span className="size-1 rounded-full bg-[#f0c276]/60" /><span>{post.readTime}</span></>}</div><h3 className="mt-4 text-xl font-medium tracking-[-0.03em] text-[#f6f1e9]">{post.title}</h3>{post.excerpt && <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#f6f1e9]/58">{post.excerpt}</p>}<div className="mt-5 flex flex-wrap gap-1.5">{post.tags.slice(0, 3).map((tag) => <span key={tag} className="rounded-md border border-white/[0.08] px-2 py-1 font-mono text-[10px] text-[#f6f1e9]/50">{tag}</span>)}</div><p className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#f0c276]">Read more <ArrowUpRight size={15} /></p></article>;
  return post.externalUrl ? <a href={post.externalUrl} target="_blank" rel="noreferrer" className="block h-full">{card}</a> : <Link href={`/blog/${post.slug}`} className="block h-full">{card}</Link>;
}

export function PortableContent({ value }: { value?: unknown[] }) {
  if (!value?.length) return null;
  return <div className="portable-content"><PortableText value={value as never} /></div>;
}

export function ContentNotice({ type = "content" }: { type?: string }) {
  return <div className="rounded-2xl border border-dashed border-white/[0.16] bg-white/[0.025] px-5 py-8 text-sm leading-6 text-[#f6f1e9]/55">Selected {type} are being prepared for public release. For relevant experience or private-case-study access, please get in touch.</div>;
}
