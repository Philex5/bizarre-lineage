# Spanish Localization Scope

## Background

- The project already has `next-intl` wiring and partial `es` message coverage.
- Public guide pages are no longer product pages; they are editorial, SEO, and wiki-style content.
- The current gap is no longer "can the app route `es` URLs?" but "does the public content actually read naturally in Spanish?"

## What This Round Covers

- Enable Spanish variants for `content/**` MDX where the public site already uses file-first content.
- Make currently visible structured guide content continue to localize beyond message JSON.
- Prefer Spain Spanish phrasing over literal line-by-line translation.

## Content Principles

- Keep game terms and proper nouns when players expect them unchanged.
- Rewrite for readability and search intent instead of mirroring English sentence structure.
- Use familiar player language such as `farmeo`, `ruta`, `build`, `duelo`, and `meta` when it improves clarity.

## Current Priorities

1. `content/pages/**`
2. `content/docs/**`
3. `content/posts/**`
4. Structured content used directly by public wiki pages such as `events` and `stands`

## Follow-Up After This Round

- Finish Spanish structured content for the long-form terms/glossary articles in `src/content-data/terms.ts`.
- Review internal links, snippets, and metadata for locale-specific SEO polish.
- Run a dedicated Spanish editorial pass after the content model is fully localized.
