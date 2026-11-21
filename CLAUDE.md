# iaduy

ミニマリスト目線でガジェットを語る個人ブログ。

## サイト方針
- テーマ：ミニマリスト目線で語るガジェット。製品スペックより「なぜ選んだか」「何を手放したか」「何個持つか」を軸に書く
- 名義：ハンドル名「iaduy」のみ。実名・勤務先・居住地は書かない
- 収益化：しない。アフィリエイトリンク・広告は置かない
- 掲載しないもの：コンサル・サービス紹介ページ、問い合わせフォーム、私的なツール類
- 更新頻度：月1〜2本想定。タグ・検索・RSSは記事が10本を超えてから検討

## 技術構成
- Next.js 15（App Router）/ React 19 / TypeScript / Tailwind CSS v4
- 記事はMDXファイルで管理（CMSは使わない。Sanityは廃止済み）
- 依存追加は `gray-matter` と `next-mdx-remote` のみ。それ以外を足す場合は理由をこのファイルに書く
- ホスティング：Vercel（`main` へのpushで本番デプロイ）
- ドメイン：www.iaduy.com（iaduy.com → www に転送）

## ディレクトリ構成
```
app/
  layout.tsx            共通レイアウト（lang="ja"）
  page.tsx              記事一覧（日付降順）
  posts/[slug]/page.tsx 記事本文（generateStaticParams で静的生成）
content/posts/
  [slug]/index.mdx      記事本体
  [slug]/*.jpg|png|webp 記事で使う画像（記事と同じフォルダに置く）
lib/posts.ts            記事読み込み層。CMS差し替え時はここだけ変える
```

## URL設計
- 記事：`/posts/[slug]`（slugは半角英数字とハイフン）
- カテゴリ階層は作らない

## frontmatter
```yaml
title: 記事タイトル
date: 2026-11-21        # YYYY-MM-DD
description: 一覧と meta description に使う1〜2文
draft: false            # true なら本番ビルドで除外
```

## 運用ルール
- 実装方針・技術構成を変えたら、同じコミットでこのファイルを更新する
- 決まっていないことは下の TODO に書き残す
- `next.config.ts` で型エラー・ESLintエラーを無視する設定は入れない
- このリポジトリはPublic。個人情報・収入・投資に関する情報は書かない

## TODO
- [ ] デザインの方向性（配色・フォント）
- [ ] トップページに一覧以外を置くか（自己紹介の有無）
- [ ] 画像の最適化方針（next/image でのMDX内画像の扱い）
- [ ] DNS警告（Vercelで「DNS Change Recommended」）の解消
- [ ] Sanityプロジェクト `sf78jm54` の削除（任意・低優先）
- [ ] （リニューアル時の判断）`sanity` を devDependencies から削除（CMS廃止のため）。`studio/` と `.vercelignore`（`studio/**` のみだった）も削除
- [ ] （リニューアル時の判断）ESLint未導入のため `npm run lint` を削除。導入は依存追加ルールに抵触するため、入れるなら理由をここに書く
- [ ] （リニューアル時の判断）`favicon.ico` はテンプレ由来のため削除。独自faviconを用意する
- [ ] （リニューアル時の判断）フォントは Geist（next/font/google）をやめ、システムフォントに変更（ビルド時の外部通信を避けるため）。デザイン方向性と合わせて決める
- [ ] （リニューアル時の判断）サンプル記事2本（`sample-minimal-desk` / `sample-one-bag`）は draft: true。本番ビルドでは除外され、記事0本でも動く。実記事を入れたら削除
- [ ] （リニューアル時の判断）`@tailwindcss/typography` は依存追加ルールにより不使用。本文スタイルは `app/posts/[slug]/page.tsx` の MDX components で個別指定
- [ ] （リニューアル時の判断）Next.js は 15.3.5 のまま（15系の最新へ上げるかは未検討）
- [ ] （リニューアル時の判断）`dev` から `--turbopack` を外した（挙動差を避けるため。戻すかは任意）
