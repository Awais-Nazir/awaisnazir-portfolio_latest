import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ContentNotice, PortableContent } from "@/components/portfolio/PortfolioUI";
import { SiteFrame } from "@/components/portfolio/SiteFrame";
import { formatDate } from "@/lib/portfolio";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/sanity";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateStaticParams() {
  const data = await getAllBlogPosts();
  return data.blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { blogPost } = await getBlogPostBySlug(slug);

  if (!blogPost) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: blogPost.title,
    description: blogPost.excerpt,
    openGraph: {
      title: blogPost.title,
      description: blogPost.excerpt,
      images: blogPost.coverImageUrl ? [blogPost.coverImageUrl] : [],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { blogPost: post, configured } = await getBlogPostBySlug(slug);

  if (post?.externalUrl) {
    redirect(post.externalUrl);
  }

  if (!post) {
    return (
      <SiteFrame>
        <main className="container py-8 sm:py-12">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-[#f0c276]">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          <div className="mt-6">
            <ContentNotice type={configured ? "article" : "blog content"} />
          </div>
        </main>
      </SiteFrame>
    );
  }

  return (
    <SiteFrame>
      <main className="container py-8 sm:py-12">
        <article className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#f0c276] transition hover:text-[#ffe0a5]"
          >
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          <div className="mt-7 flex flex-wrap gap-2 font-mono text-xs uppercase tracking-[0.13em] text-[#f0c276]">
            <span>{formatDate(post.publishDate)}</span>
            {post.readTime && (
              <>
                <span>·</span>
                <span>{post.readTime}</span>
              </>
            )}
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.055em] text-[#f6f1e9] sm:text-6xl">
            {post.title}
          </h1>
          {post.coverImageUrl && (
            <img
              src={post.coverImageUrl}
              alt=""
              className="mt-8 aspect-[16/8] w-full rounded-2xl border border-white/[0.1] object-cover"
            />
          )}
          <div className="mt-10">
            <PortableContent value={post.body} />
          </div>
          {post.externalUrl && (
            <a href={post.externalUrl} className="button-primary mt-8" target="_blank" rel="noreferrer">
              Read original article <ArrowUpRight size={16} />
            </a>
          )}
        </article>
      </main>
    </SiteFrame>
  );
}
