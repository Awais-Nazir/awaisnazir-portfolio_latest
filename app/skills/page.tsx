import { SectionHeading, SkillItem, ContentNotice } from "@/components/portfolio/PortfolioUI";
import { SiteFrame } from "@/components/portfolio/SiteFrame";
import { groupSkills } from "@/lib/portfolio";
import { getAllSkills } from "@/lib/sanity";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills",
  description: "Technical foundations, grouped by practice: Backend systems, AI integrations, databases, and DevOps.",
};

export const revalidate = 60;

export default async function SkillsPage() {
  const data = await getAllSkills();
  const groups = groupSkills(data.skills ?? []);

  return (
    <SiteFrame>
      <main className="container py-8 sm:py-12">
        <SectionHeading eyebrow="Skills" title="Technical foundations, grouped by practice." />
        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          {groups.length ? (
            groups.map(([category, skills]) => (
              <section key={category} className="surface-card p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-medium text-[#f6f1e9]">{category}</h2>
                  <span className="font-mono text-xs text-[#f0c276]">
                    {String(skills.length).padStart(2, "0")}
                  </span>
                </div>
                <ul className="mt-5 divide-y divide-white/[0.08]">
                  {skills.map((skill) => (
                    <SkillItem key={skill.name} skill={skill} />
                  ))}
                </ul>
              </section>
            ))
          ) : (
            <div className="lg:col-span-2">
              <ContentNotice type="skills" />
            </div>
          )}
        </div>
      </main>
    </SiteFrame>
  );
}
