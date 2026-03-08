import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { beginnerGuide } from '@/content-data/guides';
import { siteName } from '@/content-data/site';
import { stands } from '@/content-data/stands';
import { tierListEntries } from '@/content-data/tier-list';
import { Link } from '@/core/i18n/navigation';
import { buildMetadata } from '@/features/wiki/pages';

export const revalidate = 3600;

type GoalCard = {
  title: string;
  description: string;
  href?: string;
  hrefLabel?: string;
};

type ChecklistItem = {
  title: string;
  description: string;
  href?: string;
  hrefLabel?: string;
};

const guideFaq = [
  {
    question: 'What should I do first in Bizarre Lineage as a beginner?',
    answer:
      'Get the easiest free value first, secure a usable stand, and avoid wasting early resources before you understand which route you want to follow.',
  },
  {
    question: 'Should beginners chase an S-tier stand immediately?',
    answer:
      'Usually no. A premium stand can be worth it later, but a fresh account benefits more from stable progress and lower-risk decisions than from forcing an expensive early chase.',
  },
  {
    question: 'What page should I read after this beginner guide?',
    answer:
      'Most players should open the codes page first, then the tier list, then the stats or prestige guide depending on whether the next decision is build-related or reset-related.',
  },
  {
    question: 'Why does this guide avoid exact numbers?',
    answer:
      'Because a good beginner guide should still help after updates. The focus here is early decision-making, route planning, and avoiding waste.',
  },
] as const;

const firstSessionRoute = [
  {
    title: 'Claim easy resources first',
    description:
      'Redeem current codes and collect the starter value that makes the first stretch of progression less punishing.',
  },
  {
    title: 'Settle on a usable stand',
    description:
      'Your first stand does not need to be your dream stand. It needs to let you learn the game and keep moving.',
  },
  {
    title: 'Stop the biggest account mistakes',
    description:
      'Avoid wasteful rerolls, random spending, and blind stat choices before they slow down the rest of your route.',
  },
] as const;

const recommendedGuides = [
  {
    title: 'Codes',
    description:
      'Open this first if you have not claimed current rewards yet.',
    href: '/codes',
  },
  {
    title: 'Tier List',
    description:
      'Use this when you need to judge whether a stand is worth further investment.',
    href: '/tier-list',
  },
  {
    title: 'Stats Guide',
    description:
      'Read this once your build decisions start to matter more than raw luck.',
    href: '/guides/stats',
  },
  {
    title: 'Prestige Guide',
    description:
      'Open this when your route slows down and prestige starts looking relevant.',
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
    path: '/guides/beginner-guide',
    title:
      'Bizarre Lineage Beginner Guide - First Route, Early Mistakes, What To Read Next',
    description:
      'Use this Bizarre Lineage beginner guide for a practical first route, early mistakes to avoid, and clear next steps into codes, tier list, stats, and prestige.',
    keywords: [
      'bizarre lineage beginner guide',
      'bizarre lineage guide',
      'how to play bizarre lineage',
      'bizarre lineage beginner tips',
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

export default async function BeginnerGuideRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const sampleBeginnerPick = tierListEntries.find(
    (entry) => entry.beginner === 'High'
  );
  const sampleChasePick =
    stands.find((stand) => stand.tier === 'S') ?? stands[0] ?? null;
  const checklistItems: ChecklistItem[] = [...beginnerGuide.checklist];
  const progressionGoals: GoalCard[] = [...beginnerGuide.goals];

  return (
    <main className="mx-auto w-full max-w-5xl px-4 pt-24 pb-16 sm:px-6 lg:px-8 lg:pt-28">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline:
            'Bizarre Lineage Beginner Guide: First Route, Early Mistakes, and Next Pages',
          description:
            'A practical beginner route for Bizarre Lineage focused on early progression, safe decisions, and next-step guides.',
          author: {
            '@type': 'Organization',
            name: siteName,
          },
          publisher: {
            '@type': 'Organization',
            name: siteName,
          },
          dateModified: beginnerGuide.updatedAt,
          mainEntityOfPage: 'https://bizarrelineage.info/guides/beginner-guide',
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
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'How to start Bizarre Lineage as a beginner',
          description:
            'A first-session route for new Bizarre Lineage players.',
          step: [
            {
              '@type': 'HowToStep',
              name: 'Redeem current codes',
              text: beginnerGuide.checklist[0]?.description,
            },
            {
              '@type': 'HowToStep',
              name: 'Get a usable first target',
              text: beginnerGuide.checklist[2]?.description,
            },
            {
              '@type': 'HowToStep',
              name: 'Review the tier list before overcommitting',
              text: beginnerGuide.checklist[1]?.description,
            },
            {
              '@type': 'HowToStep',
              name: 'Research medium-term goals',
              text: beginnerGuide.goals[3]?.description,
            },
          ],
        }}
      />

      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <header className="not-prose border-border mb-10 rounded-3xl border bg-background/70 p-6 sm:p-8">
          <p className="text-muted-foreground text-xs font-medium tracking-[0.18em] uppercase">
            Beginner Guide
          </p>
          <h1 className="text-foreground mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            Bizarre Lineage beginners should focus on a safe first route, not
            random rerolls
          </h1>
          <p className="text-muted-foreground mt-4 max-w-3xl text-base leading-7">
            This guide is for new players who want a clean start. The goal is
            simple: get useful value early, avoid wasting scarce resources, and
            make decisions that keep your account moving forward.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="border-border rounded-full border px-4 py-2">
              New players
            </span>
            <span className="border-border rounded-full border px-4 py-2">
              {beginnerGuide.readingTime}
            </span>
            <span className="border-border rounded-full border px-4 py-2">
              Updated {beginnerGuide.updatedAt}
            </span>
          </div>
        </header>

        <section>
          <h2>What to do first</h2>
          <p>
            A good opener in Bizarre Lineage is not about hitting the best stand
            immediately. It is about reducing early friction. That means taking
            the easiest free value, avoiding bad spending, and refusing to turn
            every lucky-looking option into a long commitment.
          </p>
          <ol>
            {checklistItems.map((item) => (
              <li key={item.title}>
                <strong>{item.title}.</strong> {item.description}{' '}
                {item.href && item.hrefLabel ? (
                  <Link href={item.href}>{item.hrefLabel}</Link>
                ) : null}
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2>Your first 30 minutes</h2>
          <p>
            The first session should create momentum. If a choice makes your
            account weaker, drains scarce resources, or depends too much on
            luck, it is usually not the correct beginner move.
          </p>
          {firstSessionRoute.map((item) => (
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
          <h2>How beginners should think about stands</h2>
          <p>
            Your first target should be realistic. A fresh account benefits more
            from a stand it can actually use than from forcing an expensive
            chase too early.
          </p>
          <div className="not-prose mt-6 grid gap-4 md:grid-cols-2">
            <div className="border-border rounded-2xl border bg-background/60 p-5">
              <p className="text-muted-foreground text-xs font-medium tracking-[0.16em] uppercase">
                Stable first pick
              </p>
              <h3 className="mt-2 text-xl font-semibold">
                {sampleBeginnerPick?.name || 'Entry-path stands'}
              </h3>
              <p className="text-muted-foreground mt-3 text-sm leading-7">
                {sampleBeginnerPick?.summary ||
                  'A beginner-friendly route should maximize usable progress first and delay premium commitments until the account has more room for mistakes.'}
              </p>
            </div>
            <div className="border-border rounded-2xl border bg-background/60 p-5">
              <p className="text-muted-foreground text-xs font-medium tracking-[0.16em] uppercase">
                Chase later
              </p>
              <h3 className="mt-2 text-xl font-semibold">
                {sampleChasePick?.name || 'S-tier chase targets'}
              </h3>
              <p className="text-muted-foreground mt-3 text-sm leading-7">
                {sampleChasePick?.summary ||
                  'High-tier stands can be worth the route, but new players should treat them as researched goals instead of automatic first-session commitments.'}
              </p>
              <p className="mt-4 text-sm">
                <Link href="/stands">Browse stand guides</Link>
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2>Common mistakes to avoid</h2>
          <ul>
            {beginnerGuide.mistakes.map((item) => (
              <li key={item.title}>
                <strong>{item.title}.</strong> {item.description}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>What to do after the opener</h2>
          <p>
            Once your early route is stable, the next guide you read should
            solve the exact problem in front of you. Do not read everything at
            once. Read the next page that removes the biggest current bottleneck.
          </p>
          <ul>
            {progressionGoals.map((item) => (
              <li key={item.title}>
                <strong>{item.title}.</strong> {item.description}{' '}
                {item.href && item.hrefLabel ? (
                  <Link href={item.href}>{item.hrefLabel}</Link>
                ) : null}
              </li>
            ))}
          </ul>
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
            Read the next guide that matches your current problem
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
