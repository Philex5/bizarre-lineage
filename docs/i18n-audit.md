# Internationalization Audit

Date: 2026-03-13

## Summary

The project's `next-intl` foundation is correctly wired, but page-level usage is inconsistent.

Current state:

- The site is intentionally English-only for now.
- Routing and provider setup for `next-intl` are correct.
- Some pages properly read from locale message files.
- Many public content pages still use hardcoded English strings.
- Several content/data modules are acting as English-only content sources, which means page shells may be localized while the rendered content is not.

This means the project is not yet "fully internationalized." It is more accurately an `en`-only site with partial i18n adoption and significant English hardcoding.

## Base I18n Configuration

The core configuration is correct for a single-language English site:

- Locale list only contains `en`: [`src/config/locale/index.ts`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/src/config/locale/index.ts)
- Locale detection is disabled: [`src/config/locale/index.ts`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/src/config/locale/index.ts)
- `[locale]` layout validates locale and sets request locale: [`src/app/[locale]/layout.tsx`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/src/app/[locale]/layout.tsx)
- Landing layout header/footer are sourced from locale messages: [`src/app/[locale]/(landing)/layout.tsx`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/src/app/[locale]/(landing)/layout.tsx)
- Dynamic catch-all page supports both MDX content and `messages/pages/**/*.json`: [`src/app/[locale]/(landing)/[...slug]/page.tsx`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/src/app/[locale]/(landing)/[...slug]/page.tsx)

## Classification

### A. Pages That Are Largely Correct

These pages primarily use translation messages and follow the intended structure:

- Home route metadata: [`src/app/[locale]/(landing)/page.tsx`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/src/app/[locale]/(landing)/page.tsx)
- Guides hub route metadata: [`src/app/[locale]/(landing)/guides/page.tsx`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/src/app/[locale]/(landing)/guides/page.tsx)
- Showcases: [`src/app/[locale]/(landing)/showcases/page.tsx`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/src/app/[locale]/(landing)/showcases/page.tsx)
- Updates: [`src/app/[locale]/(landing)/updates/page.tsx`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/src/app/[locale]/(landing)/updates/page.tsx)
- Blog index: [`src/app/[locale]/(landing)/blog/page.tsx`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/src/app/[locale]/(landing)/blog/page.tsx)
- Landing header/footer layout content: [`src/app/[locale]/(landing)/layout.tsx`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/src/app/[locale]/(landing)/layout.tsx)

Notes:

- These pages are the best examples to follow for future migrations.
- They may still contain some internally hardcoded English through reused components or content data.

### B. Pages or Components With Mixed Usage

These areas partially use `getTranslations(...)` but still contain significant hardcoded English strings.

- Home page implementation: [`src/features/wiki/pages.tsx`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/src/features/wiki/pages.tsx)
- Terms content renderer: [`src/features/wiki/terms-content.tsx`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/src/features/wiki/terms-content.tsx)
- Events content renderer: [`src/features/wiki/events-content.tsx`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/src/features/wiki/events-content.tsx)

Typical problems in this group:

- Section titles are hardcoded in English.
- CTA labels are hardcoded in English.
- Schema text or FAQ text is partially hardcoded.
- Logic relies on English text values instead of stable keys.

Examples:

- Home quick-access titles such as `Tier List`, `Stands`, `Beginner Guide` are hardcoded in [`src/features/wiki/pages.tsx`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/src/features/wiki/pages.tsx)
- Terms page renders `Watch the guide` as a hardcoded label in [`src/features/wiki/terms-content.tsx`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/src/features/wiki/terms-content.tsx)
- Events page renders headings like `Quick answer` and `Read next` as hardcoded strings in [`src/features/wiki/events-content.tsx`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/src/features/wiki/events-content.tsx)

### C. Pages That Are Mostly Hardcoded English

These are the highest-priority pages to migrate:

- Codes page: [`src/app/[locale]/(landing)/codes/page.tsx`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/src/app/[locale]/(landing)/codes/page.tsx)
- Tier list page: [`src/app/[locale]/(landing)/tier-list/page.tsx`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/src/app/[locale]/(landing)/tier-list/page.tsx)
- Beginner guide page: [`src/app/[locale]/(landing)/guides/beginner-guide/page.tsx`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/src/app/[locale]/(landing)/guides/beginner-guide/page.tsx)
- Stats guide page: [`src/app/[locale]/(landing)/guides/stats/page.tsx`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/src/app/[locale]/(landing)/guides/stats/page.tsx)
- Prestige guide page: [`src/app/[locale]/(landing)/guides/prestige/page.tsx`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/src/app/[locale]/(landing)/guides/prestige/page.tsx)
- Stands hub metadata is hardcoded: [`src/app/[locale]/(landing)/stands/page.tsx`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/src/app/[locale]/(landing)/stands/page.tsx)

Typical problems in this group:

- Metadata is written inline in English.
- FAQ arrays are written inline in English.
- Breadcrumb labels are written inline in English.
- Hero copy and section copy are written inline in English.
- JSON-LD schema text is written inline in English.

### D. Content Data That Is English-Only

These files are currently content sources, not localized dictionaries:

- Site-level copy and labels: [`src/content-data/site.ts`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/src/content-data/site.ts)
- Codes data: [`src/content-data/codes.ts`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/src/content-data/codes.ts)
- Tier list data: [`src/content-data/tier-list.ts`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/src/content-data/tier-list.ts)
- Stand data: [`src/content-data/stands.ts`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/src/content-data/stands.ts)
- Guide data: [`src/content-data/guides.ts`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/src/content-data/guides.ts)
- Terms dictionary abstraction, but only `en` exists: [`src/content-data/terms.ts`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/src/content-data/terms.ts)

Important implication:

- Even when the page wrapper uses i18n correctly, content rendered from these data files is still English hardcoded.

### E. MDX Content Acting As English Source Of Truth

Status after current cleanup pass:

- `terms` and `events` wrapper pages no longer rely on MDX frontmatter as the primary metadata source.
- Static MDX pages now allow `next-intl` message metadata to override title and description for rendering and SEO.
- Terms page breadcrumbs now also resolve through locale messages instead of hardcoded English.

Remaining limitation:

- The MDX files still exist as English fallback wrappers.
- If multilingual support is added later, real localized editorial variants should still live in locale-specific MDX, not large JSON blobs.

Pages in this category:

- Terms hub page: [`content/pages/terms.mdx`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/content/pages/terms.mdx)
- Events page: [`content/pages/events.mdx`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/content/pages/events.mdx)
- Term detail pages under [`content/pages/terms`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/content/pages/terms)

Important implication:

- Frontmatter in these wrappers is now fallback content rather than the active localized source for page metadata.
- If multilingual support is added later, longform content should remain in MDX rather than being moved into JSON translation files.

## Configuration Mismatches

There are clear mismatches between configured message namespaces and actual usage.

Configured namespaces in [`src/config/locale/index.ts`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/src/config/locale/index.ts) include:

- `pages/codes`
- `pages/tier-list`
- `pages/guides/stats`
- `pages/guides/prestige`

However, the corresponding routes currently do not actually use those translations:

- [`src/app/[locale]/(landing)/codes/page.tsx`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/src/app/[locale]/(landing)/codes/page.tsx)
- [`src/app/[locale]/(landing)/tier-list/page.tsx`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/src/app/[locale]/(landing)/tier-list/page.tsx)
- [`src/app/[locale]/(landing)/guides/stats/page.tsx`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/src/app/[locale]/(landing)/guides/stats/page.tsx)
- [`src/app/[locale]/(landing)/guides/prestige/page.tsx`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/src/app/[locale]/(landing)/guides/prestige/page.tsx)

There is also a message file for a stand page:

- [`src/config/locale/messages/en/pages/stands/star-platinum.json`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/src/config/locale/messages/en/pages/stands/star-platinum.json)

But this namespace is not listed in `localeMessagesPaths`, so it is not part of the current preloaded message set.

## Recommended Direction

Short-term recommendation:

- Treat this as a "remove hardcoded copy and unify content sourcing" project, not a "ship multilingual support now" project.

That means:

- Keep `en` as the only supported locale for now.
- Continue using `next-intl` so all public pages have a translation-ready structure.
- Remove hardcoded English from route files and shared feature components.
- Move reusable UI strings into locale message files.
- Keep longform article content in MDX.
- Avoid moving large content bodies into translation JSON.

## Recommended Priority Order

1. Migrate the `codes` page.
2. Migrate the `tier-list` page.
3. Migrate the three guide pages:
   - `beginner-guide`
   - `stats`
   - `prestige`
4. Clean mixed components under `src/features/wiki`.
5. Review and standardize `src/content-data/*` so it is clear which files are:
   - translatable UI/config content
   - English-only editorial content
   - structured reusable gameplay data
6. Remove unused translation namespaces or wire them into actual pages.

## Page Migration Rules

For future page work, prefer the following rules:

- Metadata must come from message files or localized MDX frontmatter.
- Breadcrumb labels must not be hardcoded.
- CTA labels and section headings must not be hardcoded.
- FAQ arrays should not live inline in page components if they are user-facing copy.
- JSON-LD headline/description text should use the same localized source as the visible page.
- Do not use English display text as a logic key.
- Use stable keys in data, then resolve labels through locale messages.

## Practical Next Step

The first implementation pass should target:

- [`src/app/[locale]/(landing)/codes/page.tsx`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/src/app/[locale]/(landing)/codes/page.tsx)
- [`src/app/[locale]/(landing)/tier-list/page.tsx`](/Users/philex/Desktop/indie_maker/StationUp/bizarre-lineage/src/app/[locale]/(landing)/tier-list/page.tsx)

These two pages offer the best payoff because they are highly visible and currently contain a large amount of inline English copy despite already having related translation namespaces configured.
