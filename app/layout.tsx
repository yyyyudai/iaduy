import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.iaduy.com"),
  title: { default: "iaduy", template: "%s | iaduy" },
  description: "ミニマリスト目線で語るガジェットの個人ブログ。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        <div className="mx-auto max-w-2xl px-5 py-10">
          <header className="mb-12">
            <Link href="/" className="text-lg font-bold tracking-tight">
              iaduy
            </Link>
          </header>
          <main>{children}</main>
          <footer className="mt-20 text-sm text-neutral-500">© iaduy</footer>
        </div>
      </body>
    </html>
  );
}
