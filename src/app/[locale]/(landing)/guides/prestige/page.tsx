import { Metadata } from 'next';
import { prestigeGuide } from '@/content-data/guides';
import { siteName } from '@/content-data/site';
import { buildMetadata } from '@/features/wiki/pages';
import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/core/i18n/navigation';
import { Crumb } from '@/shared/blocks/common/crumb';
import AdsterraBanner from '@/shared/components/ads/adsterra_banner';

export const revalidate = 3600;
const pageUpdatedAt = '2026-03-09';

type GuideLinkItem = {
  title: string;
  description: string;
  href?: string;
  hrefLabel?: string;
};

const guideFaq = [
  {
    question: 'What does prestige do in practical terms?',
    answer:
      'Prestige is a route reset. In current public guides, it sends you back to level 1 so you can convert that reset into longer-term account value.',
  },
  {
    question: 'When should I prestige?',
    answer:
      'Prestige when the current route is capped, the level 50 and cash requirements are already covered, and you know what the next reset cycle is trying to unlock.',
  },
  {
    question: 'What should I check before prestiging?',
    answer:
      'Check the current requirements, your cash, what value you would regret losing, and your first target after the reset. If those are unclear, you are usually prestiging too early.',
  },
  {
    question: 'What guide should I read before prestiging?',
    answer:
      'Most players should review the stats guide and their main progression route before making the prestige decision.',
  },
] as const;

const prestigeChecklist = [
  {
    title: 'Hit the current requirement line before you even consider the reset',
    description:
      'Current public guides consistently point to prestige starting at Level 50 with $10,000 cash. If you are not already there, the decision is premature.',
  },
  {
    title: 'Treat the Arch Mage trip as a commitment point',
    description:
      'Public guides place the prestige NPC in the Hospital near Bus Stop 10. Do not travel there just to test the idea. Go there when the route is already decided.',
  },
  {
    title: 'Know what the reset is buying you',
    description:
      'Prestige is easier to justify when you are converting the reset into long-term value like prestige shards, shop access, or account flexibility such as storage.',
  },
  {
    title: 'Plan the next cycle before you go back to level 1',
    description:
      'A good prestige does not end at the confirmation prompt. It starts the next grind with a clearer target than the one you just finished.',
  },
] as const;

const youtubeEmbeds = [
  {
    title:
      'BIZARRE LINEAGE PRESTIGE GUIDE - HOW TO PRESTIGE & ALL PRESTIGE REWARDS | ROBLOX BIZARRE LINEAGE',
    videoUrl: 'https://www.youtube.com/watch?v=6nBby9vDIhE',
    embedUrl: 'https://www.youtube-nocookie.com/embed/6nBby9vDIhE',
    note: 'Best direct fit for this page because it is focused on the prestige process itself.',
    whyWatch:
      'Start here if you want the shortest path from requirement check to actual prestige execution.',
  },
  {
    title:
      'Bizarre Lineage: FULL Beginners Guide (Stands, Levelling, Awakenings, Bosses, Prestige) + Tips',
    videoUrl: 'https://www.youtube.com/watch?v=0zTlS2CKB8k',
    embedUrl: 'https://www.youtube-nocookie.com/embed/0zTlS2CKB8k',
    note: 'Useful if your prestige question is really a route problem and not just a reset problem.',
    whyWatch:
      'Watch this second if you need to see where prestige sits inside the larger progression loop instead of treating it like an isolated mechanic.',
  },
  {
    title:
      "The ULTIMATE Beginner's Guide to Bizarre Lineage Roblox! (Stands, Leveling, Progression & Awakening)",
    videoUrl: 'https://www.youtube.com/watch?v=LnyDuoPfC18',
    embedUrl: 'https://www.youtube-nocookie.com/embed/LnyDuoPfC18',
    note: 'Good follow-up for players who need a cleaner post-reset route after deciding to prestige.',
    whyWatch:
      'Use this to map your next level 1 to 50 cycle so the reset immediately turns into progress instead of drift.',
  },
] as const;

const recommendedGuides = [
  {
    title: 'Beginner Guide',
    description:
      'Read this if you need to reset your full early-game route, not just the prestige decision.',
    href: '/guides/beginner-guide',
  },
  {
    title: 'Stats Guide',
    description:
      'Open this when your build or current stat choices are part of the prestige tradeoff.',
    href: '/guides/stats',
  },
  {
    title: 'Tier List',
    description:
      'Use this when the prestige decision depends on a longer-term stand target.',
    href: '/tier-list',
  },
  {
    title: 'Stands',
    description:
      'Open stand guides when you need more detailed obtainment and role context before setting the next route.',
    href: '/stands',
  },
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildMetadata({
    locale,
    path: '/guides/prestige',
    title:
      'Bizarre Lineage Prestige Guide - When to Prestige, Requirements, Tradeoffs',
    description:
      'Read the Bizarre Lineage prestige guide to check current requirements, decide when to prestige, and avoid resetting before the next route is ready.',
  });
}

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function PrestigeGuideRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const prepareFirst: GuideLinkItem[] = [...prestigeGuide.prepareFirst];

  return (
    <main className="mx-auto w-full max-w-5xl px-4 pt-24 pb-16 sm:px-6 lg:px-8 lg:pt-28">
      <div className="mb-6">
        <Crumb
          items={[
            { title: 'Home', url: '/' },
            { title: 'Guides', url: '/guides' },
            {
              title: 'Prestige Guide',
              url: '/guides/prestige',
              is_active: true,
            },
          ]}
        />
      </div>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline:
            'Bizarre Lineage Prestige Guide: When to Prestige, Requirements, and Tradeoffs',
          description:
            'A practical prestige guide for Bizarre Lineage focused on timing, preparation, and avoiding bad resets.',
          author: {
            '@type': 'Organization',
            name: siteName,
          },
          publisher: {
            '@type': 'Organization',
            name: siteName,
          },
          dateModified: pageUpdatedAt,
          mainEntityOfPage: 'https://bizarrelineage.info/guides/prestige',
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: guideFaq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }}
      />

      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <header className="not-prose border-border bg-background/70 mb-10 rounded-3xl border p-6 sm:p-8">
          <p className="text-muted-foreground text-xs font-medium tracking-[0.18em] uppercase">
            Prestige Guide
          </p>
          <h1 className="text-foreground mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            Bizarre Lineage prestige should start the next route, not erase the
            current one by accident
          </h1>
          <p className="text-muted-foreground mt-4 max-w-3xl text-base leading-7">
            Current public guides line up on the same baseline: prestige
            usually starts at Level 50 with $10,000 cash, is handled through
            the Arch Mage in the Hospital near Bus Stop 10, and sends your
            character back to Level 1. The real question is not whether the
            button exists. It is whether the reset buys enough long-term value
            to justify starting the cycle again.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="border-border rounded-full border px-4 py-2">
              Level 50 check
            </span>
            <span className="border-border rounded-full border px-4 py-2">
              $10,000 cash
            </span>
            <span className="border-border rounded-full border px-4 py-2">
              Bus Stop 10 route
            </span>
            <span className="border-border rounded-full border px-4 py-2">
              Updated {pageUpdatedAt}
            </span>
          </div>
        </header>

        <div className="not-prose mb-10">
          <AdsterraBanner />
        </div>

        <section>
          <h2>What prestige is really for</h2>
          <p>
            Prestige is valuable when it converts one finished grind into
            account-level value you can use later. Public guides usually frame
            that value around prestige shards, access to the prestige shop, and
            the kind of carry-forward flexibility that makes the next route
            cleaner than the last one.
          </p>
          <p>
            The important question is not whether you can prestige. The
            important question is whether prestiging now makes the next stage of
            progression cleaner than staying on your current route.
          </p>
        </section>

        <section>
          <h2>When to prestige</h2>
          <p>
            A good prestige decision is tied to a route change, not to boredom.
            If your current cycle is flattening out and prestige clearly opens
            the next stage, the reset starts to make sense.
          </p>
          <ol>
            {prestigeChecklist.map((item) => (
              <li key={item.title}>
                <strong>{item.title}.</strong> {item.description}
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2>What to prepare before resetting</h2>
          <p>
            Bad prestige decisions usually come from unclear preparation. You
            should know what you are keeping, what you are losing, and what your
            first goal is after the reset.
          </p>
          <ul>
            {prepareFirst.map((item) => (
              <li key={item.title}>
                <strong>{item.title}.</strong> {item.description}{' '}
                {item.href && item.hrefLabel ? (
                  <Link href={item.href}>{item.hrefLabel}</Link>
                ) : null}
              </li>
            ))}
          </ul>
        </section>

        <div className="not-prose my-10">
          <AdsterraBanner />
        </div>

        <section>
          <h2>Common prestige mistakes</h2>
          <ul>
            {prestigeGuide.mistakes.map((item) => (
              <li key={item.title}>
                <strong>{item.title}.</strong> {item.description}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Simple prestige rule of thumb</h2>
          <p>
            If the reset gives you a clearer next cycle, prestige can be
            correct. If the reset only gives you uncertainty, you probably need
            more preparation first.
          </p>
          <p>
            Do not prestige into confusion. Prestige into a plan. That plan can
            be prestige shard value, a cleaner build route, or a better next
            grind target, but it needs to exist before you reset.
          </p>
        </section>

        <section>
          <h2>Watch the prestige route before you commit</h2>
          <p>
            These videos work best in order. Start with the direct prestige
            walkthrough, then zoom back out to the full progression loop, then
            lock in the next reset cycle.
          </p>
          <div className="not-prose mt-8 grid gap-6 lg:grid-cols-3">
            {youtubeEmbeds.map((item) => (
              <div
                key={item.embedUrl}
                className="border-border bg-background/50 overflow-hidden rounded-2xl border"
              >
                <div className="aspect-video">
                  <iframe
                    src={item.embedUrl}
                    title={item.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-foreground text-base font-semibold">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-6">
                    {item.note}
                  </p>
                  <p className="text-muted-foreground mt-2 text-sm leading-6">
                    {item.whyWatch}
                  </p>
                  <a
                    href={item.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary mt-4 inline-block text-sm font-medium"
                  >
                    Watch on YouTube
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="not-prose mt-8">
            <AdsterraBanner />
          </div>
        </section>

        <section>
          <h2>FAQ</h2>
          {guideFaq.map((item) => (
            <div key={item.question} className="not-prose mt-5">
              <h3 className="text-foreground text-lg font-semibold">
                {item.question}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-7">
                {item.answer}
              </p>
            </div>
          ))}
        </section>
      </article>

      <aside className="border-border bg-background/70 mt-12 rounded-3xl border p-6 sm:p-8">
        <div className="mb-6">
          <p className="text-muted-foreground text-xs font-medium tracking-[0.18em] uppercase">
            Recommended Guides
          </p>
          <h2 className="text-foreground mt-3 text-2xl font-semibold tracking-[-0.03em]">
            Read the next guide that helps with your reset plan
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {recommendedGuides.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-border bg-background hover:border-primary/50 rounded-2xl border p-5 transition-colors"
            >
              <p className="text-foreground text-lg font-semibold">
                {item.title}
              </p>
              <p className="text-muted-foreground mt-3 text-sm leading-7">
                {item.description}
              </p>
              <p className="text-primary mt-4 text-sm font-medium">
                Open guide
              </p>
            </Link>
          ))}
        </div>
      </aside>
    </main>
  );
}
