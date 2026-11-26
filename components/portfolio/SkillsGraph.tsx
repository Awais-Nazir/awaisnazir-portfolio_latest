"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import * as HoverCard from "@radix-ui/react-hover-card";
import { ArrowUpRight, Building2, PanelsTopLeft } from "lucide-react";
import type { Skill, SkillGraphBuild } from "../../lib/portfolio";
import { groupSkills } from "../../lib/portfolio";
import { graphLabel, layoutSkillGraph } from "../../lib/skillGraphLayout";

type Build = SkillGraphBuild;
export function skillGraphEdges(skills: Skill[], builds: Build[]) {
  return builds.flatMap(build => skills.flatMap(skill =>
    skill._id && build.relatedSkillIds.includes(skill._id)
      ? [{from: build._id, to: skill._id}] : []));
}
const colors = ["#e8b05c", "#8aa4c8", "#d98e6a", "#b9a67f", "#b6b3d8", "#9bbca7"];
export function SkillsGraph({ skills, projects }: { skills: Skill[]; projects: Build[] }) {
  const groups = groupSkills(skills);
  const graph = useMemo(() => {
    const nodes = [
      ...projects.map((p,i) => ({ id:p._id, name:p.title, build:p, skill:null as Skill|null, color:"#e8b05c", x:500+240*Math.cos(i/projects.length*Math.PI*2-Math.PI/2), y:370+190*Math.sin(i/projects.length*Math.PI*2-Math.PI/2) })),
      ...skills.map((s,i) => ({ id:s._id || `s${i}`, name:s.name, build:null as Build|null, skill:s, color:colors[Math.max(0,groups.findIndex(([c])=>c===(s.category?.trim()||"Skills")))%colors.length], x:500+420*Math.cos(i/skills.length*Math.PI*2-Math.PI/2), y:370+310*Math.sin(i/skills.length*Math.PI*2-Math.PI/2) }))
    ];
    const edges = skillGraphEdges(skills, projects);
    return {nodes: layoutSkillGraph(nodes, edges),edges};
  },[skills,projects]);
  const [selected,setSelected] = useState<string|null>(null);
  const [hover,setHover] = useState<string|null>(null);
  const [query,setQuery] = useState("");
  const detailId = hover || selected;
  const current = graph.nodes.find(n=>n.id===detailId);
  const active = hover;
  const connected = (id:string, target:string|null) => id===target || graph.edges.some(e=>(e.from===target&&e.to===id)||(e.to===target&&e.from===id));
  const related = graph.nodes.filter(n=>n.id!==detailId&&connected(n.id,detailId));
  const choose = (id:string) => setSelected(id);
  const preview = (id:string) => {setHover(id);setSelected(null);};
  return <div className="skill-network">
    <h1 className="sr-only">Skills</h1>
    <div className="network-kind-legend"><span><PanelsTopLeft size={17} aria-hidden="true"/> Project</span><span><Building2 size={17} aria-hidden="true"/> Job / experience</span></div>
    <div className="network-legend">{groups.map(([c],i)=><span key={c}><i style={{background:colors[i%colors.length]}} />{c}</span>)}</div>
    <div className="network-stage">
      <div className="network-map-wrap"><p className="network-help">Square tiles: projects · Wide tiles: jobs · Dots: skills <span>Scroll sideways to explore on mobile</span></p><div className="network-map" tabIndex={0} role="region" aria-label="Scrollable project and skill map" onMouseLeave={()=>setHover(null)}>
        <svg viewBox="0 0 1000 740" aria-label="Project and skill connections">
          <g aria-hidden="true">{graph.edges.map(e=>{const a=graph.nodes.find(n=>n.id===e.from)!;const b=graph.nodes.find(n=>n.id===e.to)!;return <line key={e.from+e.to} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className={e.from===active||e.to===active?"lit":"faded"} />;})}</g>
          {graph.nodes.map(n=>{const count=graph.edges.filter(e=>e.from===n.id||e.to===n.id).length;const r=n.build?28+Math.min(count,8):9+Math.min(count,5)*2;return <g key={n.id} role="button" tabIndex={0} aria-label={`Explore ${n.name}`} aria-pressed={hover===n.id} className={`network-node ${active&&connected(n.id,active)?"":"muted"} ${active===n.id?"selected":""}`}  onClick={()=>choose(n.id)} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();choose(n.id);}}} onMouseEnter={()=>preview(n.id)} onMouseLeave={()=>setHover(null)} onFocus={()=>preview(n.id)} onBlur={()=>setHover(null)}>
            <circle cx={n.x} cy={n.y} r={Math.max(23,r+5)} fill="transparent" stroke="none" />
            {n.build ? <g aria-hidden="true" className="build-illustration">
              <rect className="node-dot build-tile" x={n.x-(n.build.kind === "experience" ? 46 : 32)} y={n.y-30} width={n.build.kind === "experience" ? 92 : 64} height={60} rx={n.build.kind === "experience" ? 12 : 15} fill={n.build.kind === "experience" ? "#1c252a" : "#292115"} stroke={n.build.kind === "experience" ? "#8aa4c8" : "#e8b05c"}/>
              {n.build.kind === "experience" ? <Building2 x={n.x-20} y={n.y-20} width={40} height={40} className="network-job-art"/> : <g transform={`translate(${n.x-21} ${n.y-18})`} className="network-project-art" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect width="42" height="36" rx="5" fill="#18150f"/><path d="M0 10h42"/><circle cx="6" cy="5" r="1" fill="currentColor" stroke="none"/><circle cx="11" cy="5" r="1" fill="currentColor" stroke="none"/><path d="m14 17-6 6 6 6m14-12 6 6-6 6m-5-13-4 20"/></g>}
            </g> : <circle className="node-dot" cx={n.x} cy={n.y} r={r} fill={n.color} stroke={n.color} />}
            <text x={n.x} y={n.y+(n.build?30:r)+20} className="node-label">{graphLabel(n.name).map((line,i)=><tspan key={i} x={n.x} dy={i?16:0}>{line}</tspan>)}</text>
          </g>;})}
        </svg>
      </div></div>
      <aside className="network-inspector" aria-live="polite">{current ? <><span className="network-tag">{current.build && (current.build.kind === "experience" ? <Building2 size={14} aria-hidden="true"/> : <PanelsTopLeft size={14} aria-hidden="true"/>)}{current.build?(current.build.kind === "experience" ? "Job / experience" : "Project"):current.skill?.category||"Skill"}</span><h2>{current.name}</h2>{(current.skill?.note || current.build?.summary)&&<p>{current.skill?.note || current.build?.summary}</p>}<h3>{current.build?`Connected skills · ${related.length}`:`Related work · ${related.length}`}</h3><div className="network-pills inspector-connections">{related.map(n=><span className="network-detail-pill" key={n.id}>{n.name}</span>)}</div>{!related.length&&<p>No related work has been linked yet.</p>}{current.build?.href&&<Link href={current.build.href} target={current.build.kind === "experience" ? "_blank" : undefined} rel={current.build.kind === "experience" ? "noopener noreferrer" : undefined} className="network-case">{current.build.kind === "experience" ? "Visit organization" : "Explore this project"} <ArrowUpRight size={16}/></Link>}</>:<div className="network-inspector-empty"><span className="network-tag">Explore the connections</span><h2>Hover to explore</h2><p>Hover over a project, job, or skill to view its details.</p></div>}</aside>
    </div>
    <section className="network-mobile-index" aria-label="Skills and related work">
      <div className="network-index-heading"><div><h2>Every tool. Every connection.</h2><p>Tap a project, role, or skill to see its details.</p></div><input aria-label="Search skills and projects" placeholder="Find a skill or project…" value={query} onChange={e=>setQuery(e.target.value)}/></div>
      <div className="network-index-grid">{[["Projects",graph.nodes.filter(n=>n.build?.kind === "project")],["Experience",graph.nodes.filter(n=>n.build?.kind === "experience")],...groups.map(([c])=>[c,graph.nodes.filter(n=>n.skill&&(n.skill.category?.trim()||"Skills")===c)] as const)].map(([name,items])=>{
        const matches=(items as typeof graph.nodes).filter(n=>n.name.toLowerCase().includes(query.toLowerCase().trim()));
        return matches.length ? <div key={name as string}><h3>{name as string}</h3><div className="mobile-skill-pills">{matches.map(n=>{
          const connections=graph.nodes.filter(other=>other.id!==n.id&&connected(other.id,n.id));
          return <details key={n.id} className="mobile-skill-detail"><summary>{n.name}</summary><div className="mobile-skill-content">
            {n.build?.coverImageUrl&&<img src={n.build.coverImageUrl} alt="" className="network-preview-image"/>}
            {(n.skill?.note||n.build?.summary)&&<p>{n.skill?.note||n.build?.summary}</p>}
            <p className="mobile-connection-label">{n.build?"Skills used":"Related work"} · {connections.length}</p>
            <div className="network-pills">{connections.map(other=><span className="network-detail-pill" key={other.id}>{other.name}</span>)}</div>
            {!connections.length&&<p>No related work linked yet.</p>}
          </div></details>;
        })}</div></div> : null;
      })}</div>
      {!graph.nodes.some(n=>n.name.toLowerCase().includes(query.toLowerCase().trim()))&&<p>No matches. Try a different name.</p>}
    </section>
    {/* Lower skills index and hover previews temporarily disabled; preserved for reuse.
    <section className="network-index"><div className="network-index-heading"><div><h2>Every tool. Every connection.</h2><p>Hover over a project, role, or skill for a closer look.</p></div><input aria-label="Search skills and projects" placeholder="Find a skill or project…" value={query} onChange={e=>setQuery(e.target.value)} /></div>
      <div className="network-index-grid">{[["Projects",graph.nodes.filter(n=>n.build?.kind === "project")],["Experience",graph.nodes.filter(n=>n.build?.kind === "experience")],...groups.map(([c])=>[c,graph.nodes.filter(n=>n.skill&&(n.skill.category?.trim()||"Skills")===c)] as const)].map(([name,items])=>{const matches=(items as typeof graph.nodes).filter(n=>n.name.toLowerCase().includes(query.toLowerCase().trim()));return matches.length?<div key={name as string}><h3>{name as string}</h3><div className="network-pills">{matches.map(n=>{
        const connections = graph.nodes.filter(other=>other.id!==n.id&&connected(other.id,n.id));
        const previewId = `preview-${n.id}`;
        return <HoverCard.Root key={n.id} openDelay={120} closeDelay={180}>
          <HoverCard.Trigger asChild><span tabIndex={0} className="network-preview-trigger" aria-describedby={previewId}>{n.name}</span></HoverCard.Trigger>
          <HoverCard.Portal><HoverCard.Content id={previewId} className="network-preview-card" side="top" align="center" sideOffset={10} collisionPadding={16}>
            {n.build?.coverImageUrl && <img className="network-preview-image" src={n.build.coverImageUrl} alt=""/>}
            <div className="network-preview-body"><span className="network-preview-kind">{n.build ? (n.build.kind === "experience" ? "Job / experience" : "Project") : n.skill?.category || "Skill"}</span>
              <h4>{n.name}</h4>{(n.skill?.note || n.build?.summary)&&<p>{n.skill?.note || n.build?.summary}</p>}
              <p className="network-preview-label">{n.build ? "Skills used" : "Used in"} · {connections.length}</p>
              {connections.length ? <ul>{connections.map(other=><li key={other.id}>{other.name}</li>)}</ul> : <p>No related work linked yet.</p>}
            </div>
          </HoverCard.Content></HoverCard.Portal>
        </HoverCard.Root>;
      })}</div></div>:null;})}</div>
      {!graph.nodes.some(n=>n.name.toLowerCase().includes(query.toLowerCase().trim()))&&<p>No matches. Try a different name.</p>}
    </section>
    */}
  </div>;
}
