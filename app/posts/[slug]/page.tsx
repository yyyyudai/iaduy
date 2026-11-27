import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost } from "@/lib/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.description };
}

const components = {
  h2: (p: React.ComponentProps<"h2">) => (
    <h2 className="mt-10 mb-3 text-xl font-bold" {...p} />
  ),
  h3: (p: React.ComponentProps<"h3">) => (
    <h3 className="mt-8 mb-2 text-lg font-bold" {...p} />
  ),
  p: (p: React.ComponentProps<"p">) => <p className="my-4" {...p} />,
  ul: (p: React.ComponentProps<"ul">) => (
    <ul className="my-4 list-disc pl-6" {...p} />
  ),
  ol: (p: React.ComponentProps<"ol">) => (
    <ol className="my-4 list-decimal pl-6" {...p} />
  ),
  a: (p: React.ComponentProps<"a">) => <a className="underline" {...p} />,
  blockquote: (p: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="my-4 border-l-2 border-neutral-300 pl-4 text-neutral-600"
      {...p}
    />
  ),
};

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  return (
    <article>
      <time className="text-sm text-neutral-500">{post.date}</time>
      <h1 className="mb-8 text-2xl font-bold">{post.title}</h1>
      <MDXRemote source={post.content} components={components} />
    </article>
  );
}
