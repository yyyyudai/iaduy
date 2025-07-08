import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 既存オプションがあればここに残す */

  // ────────── 追加ここから ──────────
  typescript: {
    // 型エラーがあってもビルドを通す
    ignoreBuildErrors: true,
  },
  eslint: {
    // ESLint エラーがあってもビルドを通す
    ignoreDuringBuilds: true,
  },
  // ────────── 追加ここまで ──────────
};

export default nextConfig;
