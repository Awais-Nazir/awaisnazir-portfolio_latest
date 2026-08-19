import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useEffect } from "react";
import { Link, useRoute } from "wouter";
import { ContentNotice, PortableContent } from "@/components/portfolio/PortfolioUI";
import { SiteFrame } from "@/components/portfolio/SiteFrame";
import { formatDate } from "@/lib/portfolio";
import { trpc } from "@/lib/trpc";

export default function BlogDetail() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug ?? "";
  const { data, isLoading } = trpc.portfolio.blogPostBySlug.useQuery({ slug }, { enabled: Boolean(slug) });
  const post = data?.blogPost;
  useEffect(() => {
    if (post?.externalUrl) window.location.assign(post.externalUrl);
  }, [post?.externalUrl]);
  if (post?.externalUrl) return <SiteFrame><main className="container py-8 sm:py-12"><p className="text-sm text-[#f6f1e9]/60">Opening the original article…</p></main></SiteFrame>;
  if (isLoading) return <SiteFrame><main className="container py-8 sm:py-12"><div className="h-96 animate-pulse rounded-2xl border border-white/[0.08] bg-white/[0.04]" /></main></SiteFrame>;
  if (!post) return <SiteFrame><main className="container py-8 sm:py-12"><Link href="/blog" className="inline-flex items-center gap-2 text-sm text-[#f0c276]"><ArrowLeft size={16} /> Back to Blog</Link><div className="mt-6"><ContentNotice type={data?.configured ? "article" : "blog content"} /></div></main></SiteFrame>;
  return <SiteFrame><main className="container py-8 sm:py-12"><article className="mx-auto max-w-3xl"><Link href="/blog" className="inline-flex items-center gap-2 text-sm text-[#f0c276] transition hover:text-[#ffe0a5]"><ArrowLeft size={16} /> Back to Blog</Link><div className="mt-7 flex flex-wrap gap-2 font-mono text-xs uppercase tracking-[0.13em] text-[#f0c276]"><span>{formatDate(post.publishDate)}</span>{post.readTime && <><span>·</span><span>{post.readTime}</span></>}</div><h1 className="mt-5 text-4xl font-semibold tracking-[-0.055em] text-[#f6f1e9] sm:text-6xl">{post.title}</h1>{post.coverImageUrl && <img src={post.coverImageUrl} alt="" className="mt-8 aspect-[16/8] w-full rounded-2xl border border-white/[0.1] object-cover" />}<div className="mt-10"><PortableContent value={post.body} /></div>{post.externalUrl && <a href={post.externalUrl} className="button-primary mt-8" target="_blank" rel="noreferrer">Read original article <ArrowUpRight size={16} /></a>}</article></main></SiteFrame>;
}
