import { getHomePortfolioData } from "@/lib/sanity";
import { HomeView } from "@/components/portfolio/HomeView";

export const revalidate = 60; // Revalidate at most every 60 seconds (ISR)

export default async function HomePage() {
  const data = await getHomePortfolioData();

  return (
    <HomeView
      projects={data.projects}
      skills={data.skills}
      blogPosts={data.blogPosts}
    />
  );
}
