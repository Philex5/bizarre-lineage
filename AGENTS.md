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

## Future Work Bias
- Prefer building guide hubs, game pages, strategy articles, walkthroughs, tier lists, and update/news pages.
- Prefer static or cache-friendly public pages over account-based product flows.
