import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { SiteFrame } from "@/components/portfolio/SiteFrame";
import type { BlogPost } from "@/lib/portfolio";
import { trpc } from "@/lib/trpc";

function EditorialPost({ post, index }: { post: BlogPost; index: number }) {
  const article = <article className={`group border-t border-[#211b14]/20 py-6 transition hover:bg-[#211b14]/[0.045] sm:p-6 ${index === 0 ? "lg:row-span-2 lg:py-8" : ""}`}><div className="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#6c4d20]"><span>{post.publishDate ? new Date(post.publishDate).toLocaleDateString("en", { month: "short", year: "numeric" }) : "Writing"}</span><span>{post.readTime ?? "Article"}</span></div><h2 className={`mt-4 font-semibold tracking-[-0.04em] text-[#21170f] ${index === 0 ? "text-3xl sm:text-4xl" : "text-xl"}`}>{post.title}</h2>{post.excerpt && <p className="mt-3 max-w-2xl text-sm leading-6 text-[#21170f]/68">{post.excerpt}</p>}<div className="mt-5 flex items-center gap-2 text-sm font-medium text-[#6c4d20]">Read article <ArrowUpRight size={15} /></div></article>;
  return post.externalUrl ? <a href={post.externalUrl} target="_blank" rel="noreferrer" className="block h-full">{article}</a> : <Link href={`/blog/${post.slug}`} className="block h-full">{article}</Link>;
}

export default function Blog() {
  const { data, isLoading } = trpc.portfolio.blogPosts.useQuery();
  const posts = data?.blogPosts ?? [];
  return <SiteFrame><main className="bg-[#e8dfd1] text-[#21170f]"><div className="container py-8 sm:py-12"><header className="border-b border-[#211b14]/20 pb-8"><p className="font-mono text-xs uppercase tracking-[0.18em] text-[#6c4d20]">Field notes</p><h1 className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">Writing on systems, data, and delivery.</h1></header><div className="mt-2 grid lg:grid-cols-[1.2fr_.8fr]">{isLoading ? Array.from({ length: 6 }).map((_, index) => <div key={index} className="h-[230px] animate-pulse border-b border-[#211b14]/20" />) : posts.length ? posts.map((post, index) => <EditorialPost key={post.slug} post={post} index={index} />) : <div className="py-8 text-sm text-[#21170f]/65">Articles will appear here when they are published.</div>}</div></div></main></SiteFrame>;
}
