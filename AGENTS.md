# Project Memory

## Product Direction
- This ShipAny-based project is being repurposed into a public game guide site.
- Treat the site as content-first, with SEO pages, guides, blog-like content, showcases, and docs-style content as the primary surfaces.
- The site currently supports English only.

## Disabled Modules
- Login and signup are intentionally disabled.
- Payment, billing, subscriptions, credits, API keys, activity, and admin surfaces are intentionally disabled.
- Pricing is not part of the current product and should stay offline unless the product direction changes.
- Chinese locale support is intentionally disabled.
- AI generator pages, chat pages, and their APIs are intentionally disabled.

## Implementation Notes
- Public navigation should not expose sign-in, pricing, billing, chat-for-members, or user account entry points.
- Auth and payment endpoints are intentionally hard-disabled with 404 responses instead of being partially wired.
- AI and chat endpoints are intentionally hard-disabled with 404 responses.
- `settings`, `activity`, and `admin` route groups are intentionally hard-disabled with `notFound()`.
- `next-intl` is configured for `en` only; do not add `zh` back unless the product explicitly needs multilingual support.
- Keep the underlying content and theme system intact unless a later task explicitly removes unused dependencies.
- Static media should be hosted in Cloudflare R2, not committed into `public/` as the long-term source of truth.

## Content Architecture
- MVP content should use a file-first architecture: `MDX` for pages and articles, plus local structured data files for reusable game data.
- Do not make the database a dependency for the public content layer during the guide-site MVP.
- Use `content/pages` for stable SEO landing pages and guide pages.
- Use `content/posts` for update/news-style articles and blog-like content.
- Use local structured data files under `src/content-data` for reusable tables and entities such as codes, tier list entries, stands, FAQs, and navigation groups.
- Prefer static generation and cache-friendly content flows over dynamic database-backed rendering.

## Content Structure
- Recommended page paths:
  - `content/pages/index.mdx`
  - `content/pages/codes.mdx`
  - `content/pages/tier-list.mdx`
  - `content/pages/guides/beginner-guide.mdx`
  - `content/pages/guides/stats.mdx`
  - `content/pages/guides/prestige.mdx`
  - `content/pages/stands/star-platinum.mdx`
- Recommended article paths:
  - `content/posts/*.mdx` for updates, patch notes, topical guides, and news-like posts
- Recommended local data paths:
  - `src/content-data/site.ts`
  - `src/content-data/codes.ts`
  - `src/content-data/tier-list.ts`
  - `src/content-data/stands.ts`
  - `src/content-data/guides.ts`

## Content Modeling Rules
- Keep longform copy in `MDX`, not in database records.
- Keep repeatable tabular data in local TypeScript data files, not duplicated across MDX files.
- `codes` data should include at least: `code`, `reward`, `status`, `lastVerified`.
- `tier list` data should include at least: `key`, `name`, `tier`, `pvp`, `pve`, `beginner`, `summary`.
- `stands` data should include at least: `name`, `tier`, `bestFor`, `howToGet`, `strengths`, `weaknesses`.
- Page frontmatter should carry SEO and publishing metadata such as `title`, `description`, `slug`, `template`, `published`, and `updatedAt`.
- Guide pages may additionally use fields such as `readingTime` and `intent`.
- Stand pages may additionally use a `standKey` field that maps the MDX page to structured stand data.

## Database Usage Policy
- Do not introduce new database-backed content models for guides, pages, stands, codes, or tier lists during the MVP.
- Existing database infrastructure may remain in the repo, but it should not block or complicate the public guide-site buildout.
- Revisit database-backed content only if the product later requires an editorial backend, complex relational filtering, user-generated content, or large-scale operational workflows.

## Future Work Bias
- Prefer building guide hubs, game pages, strategy articles, walkthroughs, tier lists, and update/news pages.
- Prefer static or cache-friendly public pages over account-based product flows.

## R2 Asset Policy
- Upload new public media to Cloudflare R2 and serve it through `NEXT_PUBLIC_STORAGE_DOMAIN` or `STORAGE_DOMAIN`.
- Use [src/lib/r2-utils.ts](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/src/lib/r2-utils.ts) as the base URL utility for all R2 object paths.
- Use [src/lib/asset-loader.ts](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/src/lib/asset-loader.ts) only for assets stored under the `assets/` prefix in R2.
- Keep the `assets/` tree intentionally small. Default folders:
- `assets/site`: logo, favicon, brand-level shared media.
- `assets/pages`: page hero images, section backgrounds, screenshots, generic guide-page visuals.
- `assets/posts`: article and update-post cover images.
- `assets/stands`: stand-specific images and screenshots.
- Do not add product-era folders such as `creamy/`, `email/`, `imgs/models/`, or other legacy business-domain buckets back into `asset-loader`.
- Preferred usage examples:
- `getAssetUrl('pages/home/hero.webp')` -> `assets/pages/home/hero.webp`
- `getPageAssetUrl('codes/hero.webp')`
- `getStandAssetUrl('star-platinum/card.webp')`
- `getR2Url('uploads/raw/some-file.webp')` for non-`assets/` objects
- If content or config needs a full URL string, store the final R2 path convention clearly and resolve it through utilities instead of hardcoding new third-party placeholder image URLs.

## Workflow Rules
- For frontend UI development and copywriting, use the `gemini` skill.
- After completing any page, use the `seo-audit` skill to review its SEO performance.
- When current ShipAny framework details are needed, use Ref MCP to query the official ShipAny documentation.
- Only run `build` when it is actually needed for the task or to confirm a likely build-time issue. Do not default to running a full build after every change, because restarting the local service is disruptive in this project.
