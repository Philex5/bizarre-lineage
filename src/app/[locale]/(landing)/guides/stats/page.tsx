import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { siteName } from '@/content-data/site';
import { statsGuide } from '@/content-data/guides';
import { Link } from '@/core/i18n/navigation';
import { buildMetadata } from '@/features/wiki/pages';

export const revalidate = 3600;

const guideFaq = [
  {
    question: 'What should beginners prioritize with stats?',
    answer:
      'Stable progression, survivability, and a build that supports the stand they are actually using right now.',
  },
  {
    question: 'Should PvP and PvE use the same stat logic?',
    answer:
      'Not always. PvP rewards sharper specialization, while PvE usually rewards smoother consistency and fewer dead points.',
  },
  {
    question: 'When should I read the stats guide?',
    answer:
      'Read it once your first real build choices start to matter. If bad stat decisions are making your route slower, this page becomes relevant immediately.',
  },
  {
    question: 'Why does this guide avoid exact numbers?',
    answer:
      'Because the goal is to explain stat thinking that still works after updates instead of locking the page to fragile patch-specific details.',
  },
] as const;

const statSections = [
  {
    title: 'Power stats',
    description:
      'These decide how much direct pressure your build can create and whether your stand can actually convert openings into damage.',
  },
  {
    title: 'Durability stats',
    description:
      'These matter when your route values consistency, survivability, and the ability to finish PvE grinds without collapsing.',
  },
  {
    title: 'Mobility and tempo stats',
    description:
      'These affect how often you can start or escape fights, not just how hard you hit once you are already in range.',
  },
  {
    title: 'Utility allocation',
    description:
      'Some points are there to make the route smoother. They are not flashy, but they can keep a weak opener playable.',
  },
] as const;

const recommendedGuides = [
  {
    title: 'Beginner Guide',
    description:
      'Read this if you need the overall early-game route before optimizing your build.',
    href: '/guides/beginner-guide',
  },
  {
    title: 'Tier List',
    description:
      'Use this when you want context on what role your stand is trying to play.',
    href: '/tier-list',
  },
  {
    title: 'Stands',
    description:
      'Open stand pages when you need obtainment notes, strengths, and weaknesses before committing resources.',
    href: '/stands',
  },
  {
    title: 'Prestige Guide',
    description:
      'Read this once reset timing matters more than raw early progression.',
    href: '/guides/prestige',
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
    path: '/guides/stats',
    title: 'Bizarre Lineage Stats Guide - Build Logic, Priorities, Mistakes',
    description:
      'Use this Bizarre Lineage stats guide to understand what each stat affects, how early-game priorities differ from PvP builds, and which allocation mistakes are most costly.',
    keywords: [
      'bizarre lineage stats guide',
      'bizarre lineage stats',
      'bizarre lineage build guide',
    ],
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

export default async function StatsGuideRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="mx-auto w-full max-w-5xl px-4 pt-24 pb-16 sm:px-6 lg:px-8 lg:pt-28">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline:
            'Bizarre Lineage Stats Guide: Build Logic, Priorities, and Mistakes',
          description:
            'A practical stats guide for Bizarre Lineage focused on build logic, early priorities, and common allocation mistakes.',
          author: {
            '@type': 'Organization',
            name: siteName,
          },
          publisher: {
            '@type': 'Organization',
            name: siteName,
          },
          dateModified: statsGuide.updatedAt,
          mainEntityOfPage: 'https://bizarrelineage.info/guides/stats',
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
        <header className="not-prose border-border mb-10 rounded-3xl border bg-background/70 p-6 sm:p-8">
          <p className="text-muted-foreground text-xs font-medium tracking-[0.18em] uppercase">
            Stats Guide
          </p>
          <h1 className="text-foreground mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            Bizarre Lineage stats should support your route, not trap you in
            bad build habits
          </h1>
          <p className="text-muted-foreground mt-4 max-w-3xl text-base leading-7">
            This guide explains how to think about stats as a beginner or
            mid-game player. The goal is not fake precision. The goal is to
            spend points in ways that support your stand, your progression, and
            the mode you are actually playing.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="border-border rounded-full border px-4 py-2">
              Build logic
            </span>
            <span className="border-border rounded-full border px-4 py-2">
              Updated {statsGuide.updatedAt}
            </span>
          </div>
        </header>

        <section>
          <h2>How to think about stats</h2>
          <p>{statsGuide.overview}</p>
          <p>
            A bad build is rarely bad because one number is slightly off. It is
            usually bad because the player is investing points for a role they
            are not actually playing. Your stats should serve your current stand
            and current route first.
          </p>
        </section>

        <section>
          <h2>What each stat category is trying to do</h2>
          <p>
            Different stat groups answer different questions. If you mix those
            questions together, you end up with a build that looks active on
            paper but feels weak in practice.
          </p>
          {statSections.map((item) => (
            <div
              key={item.title}
              className="not-prose border-border mt-4 rounded-2xl border bg-background/60 p-5"
            >
              <h3 className="text-foreground text-lg font-semibold">
                {item.title}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-7">
                {item.description}
              </p>
            </div>
          ))}
        </section>

        <section>
          <h2>Early-game stat priorities</h2>
          <p>
            Early progression should be biased toward stable results. That means
            making PvE and general grinding easier before you start overbuilding
            for narrow PvP scenarios.
          </p>
          <ol>
            {statsGuide.priorities.map((item) => (
              <li key={item.title}>
                <strong>{item.title}.</strong> {item.description}
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2>Common stat mistakes</h2>
          <ul>
            {statsGuide.mistakes.map((item) => (
              <li key={item.title}>
                <strong>{item.title}.</strong> {item.description}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Beginner rule of thumb</h2>
          <p>
            If you are still learning the game, do not build as if you are
            already at endgame. Stable progression, survivability, and useful
            support for your actual stand will outperform a copied specialist
            setup most of the time.
          </p>
          <p>
            If you are unsure, leave yourself room to correct later. Extreme
            allocation too early is one of the easiest ways to make an otherwise
            good route feel worse than it should.
          </p>
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

      <aside className="border-border mt-12 rounded-3xl border bg-background/70 p-6 sm:p-8">
        <div className="mb-6">
          <p className="text-muted-foreground text-xs font-medium tracking-[0.18em] uppercase">
            Recommended Guides
          </p>
          <h2 className="text-foreground mt-3 text-2xl font-semibold tracking-[-0.03em]">
            Read the next guide that matches your next build decision
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {recommendedGuides.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-border rounded-2xl border bg-background p-5 transition-colors hover:border-primary/50"
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
