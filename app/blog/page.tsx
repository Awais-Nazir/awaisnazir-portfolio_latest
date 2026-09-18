import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SiteFrame } from "@/components/portfolio/SiteFrame";
import type { BlogPost } from "@/lib/portfolio";
import { getAllBlogPosts } from "@/lib/sanity";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering Notes",
  description: "Field notes from building backend systems, APIs, and AI integrations: what broke, and what I'd do differently next time.",
};

export const revalidate = 60;

function EditorialPost({ post, index }: { post: BlogPost; index: number }) {
  const article = (
    <article
      className={`group border-t border-[#211b14]/20 py-6 transition hover:bg-[#211b14]/[0.045] sm:p-6 ${
        index === 0 ? "lg:row-span-2 lg:py-8" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#6c4d20]">
        <span>
          {post.publishDate
            ? new Date(post.publishDate).toLocaleDateString("en", { month: "short", year: "numeric" })
            : "Writing"}
        </span>
        <span>{post.readTime ?? "Article"}</span>
      </div>
      <h2 className={`mt-4 font-semibold tracking-[-0.04em] text-[#21170f] ${index === 0 ? "text-3xl sm:text-4xl" : "text-xl"}`}>
        {post.title}
      </h2>
      {post.excerpt && <p className="mt-3 max-w-2xl text-sm leading-6 text-[#21170f]/68">{post.excerpt}</p>}
      <div className="mt-5 flex items-center gap-2 text-sm font-medium text-[#6c4d20]">
        Read article <ArrowUpRight size={15} />
      </div>
    </article>
  );

  return post.externalUrl ? (
    <a href={post.externalUrl} target="_blank" rel="noreferrer" className="block h-full">
      {article}
    </a>
  ) : (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      {article}
    </Link>
  );
}

export default async function BlogPage() {
  const data = await getAllBlogPosts();
  const posts = data.blogPosts ?? [];

  return (
    <SiteFrame>
      <main className="bg-[#e8dfd1] text-[#21170f]">
        <div className="container py-8 sm:py-12">
          <header className="border-b border-[#211b14]/20 pb-8">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#6c4d20]">Field notes</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
              What I ran into, what broke, and what I&apos;d do differently next time.
            </h1>
          </header>
          <div className="mt-2 grid lg:grid-cols-[1.2fr_.8fr]">
            {posts.length ? (
              posts.map((post, index) => <EditorialPost key={post.slug} post={post} index={index} />)
            ) : (
              <div className="py-8 text-sm text-[#21170f]/65">
                Articles will appear here when they are published.
              </div>
            )}
          </div>
        </div>
      </main>
    </SiteFrame>
  );
}
