import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  description: string;
  draft: boolean;
};

export type Post = PostMeta & { content: string };

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

// 本番ビルドでは draft: true を除外。dev では表示して確認できる。
const includeDrafts = process.env.NODE_ENV !== "production";

function readPost(slug: string): Post | null {
  const file = path.join(POSTS_DIR, slug, "index.mdx");
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const date =
    data.date instanceof Date
      ? data.date.toISOString().slice(0, 10)
      : String(data.date ?? "");
  const post: Post = {
    slug,
    title: String(data.title ?? slug),
    date,
    description: String(data.description ?? ""),
    draft: data.draft === true,
    content,
  };
  return post.draft && !includeDrafts ? null : post;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => readPost(d.name))
    .filter((p): p is Post => p !== null)
    .map(({ content: _content, ...meta }) => meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  return readPost(slug);
}
