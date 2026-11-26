import { SkillsGraph } from "@/components/portfolio/SkillsGraph";
import { SiteFrame } from "@/components/portfolio/SiteFrame";
import { getAllSkills, getSkillGraphBuilds } from "@/lib/sanity";
import "./skills.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Technical foundations, grouped by practice: Backend systems, AI integrations, databases, and DevOps.",
};

export const revalidate = 60;

export default async function SkillsPage() {
  const [data, projectData] = await Promise.all([
    getAllSkills(),
    getSkillGraphBuilds(),
  ]);

  return (
    <SiteFrame>
      <main className="container skills-page">
        <SkillsGraph
          skills={data.skills}
          projects={projectData.builds}
        />
      </main>
    </SiteFrame>
  );
}
