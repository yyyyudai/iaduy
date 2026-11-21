import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();
  if (posts.length === 0) {
    return <p className="text-neutral-500">まだ記事がありません。</p>;
  }
  return (
    <ul className="space-y-8">
      {posts.map((p) => (
        <li key={p.slug}>
          <time className="text-sm text-neutral-500">{p.date}</time>
          <h2 className="text-xl font-bold">
            <Link href={`/posts/${p.slug}`} className="hover:underline">
              {p.title}
            </Link>
          </h2>
          <p className="text-neutral-700">{p.description}</p>
        </li>
      ))}
    </ul>
  );
}
