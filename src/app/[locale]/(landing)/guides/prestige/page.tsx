import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { prestigeGuide } from '@/content-data/guides';
import { siteName } from '@/content-data/site';
import { Link } from '@/core/i18n/navigation';
import { buildMetadata } from '@/features/wiki/pages';

export const revalidate = 3600;

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
      'Prestige is a progression reset that matters because of what it unlocks next, not because the reset itself is exciting.',
  },
  {
    question: 'When should I prestige?',
    answer:
      'Prestige when your current route is capped, important value is already secured, and you already know what the reset is helping you reach.',
  },
  {
    question: 'What should I check before prestiging?',
    answer:
      'Check your current build, your resources, and your first goal after the reset. If those are unclear, you are usually prestiging too early.',
  },
  {
    question: 'What guide should I read before prestiging?',
    answer:
      'Most players should review the stats guide and their main progression route before making the prestige decision.',
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
      'Read the Bizarre Lineage prestige guide to decide when to prestige, what to prepare before resetting, and which progression mistakes are hardest to recover from.',
    keywords: [
      'bizarre lineage prestige guide',
      'bizarre lineage prestige',
      'when to prestige bizarre lineage',
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
          dateModified: prestigeGuide.updatedAt,
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
        <header className="not-prose border-border mb-10 rounded-3xl border bg-background/70 p-6 sm:p-8">
          <p className="text-muted-foreground text-xs font-medium tracking-[0.18em] uppercase">
            Prestige Guide
          </p>
          <h1 className="text-foreground mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            Bizarre Lineage prestige should be a planned reset, not an impulse
          </h1>
          <p className="text-muted-foreground mt-4 max-w-3xl text-base leading-7">
            Prestige is worth taking when it opens the next stage of your route.
            It is not worth taking just because the option is available. This
            guide focuses on timing, preparation, and the mistakes that make a
            reset feel worse than it should.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="border-border rounded-full border px-4 py-2">
              Reset timing
            </span>
            <span className="border-border rounded-full border px-4 py-2">
              Updated {prestigeGuide.updatedAt}
            </span>
          </div>
        </header>

        <section>
          <h2>What prestige is really for</h2>
          <p>{prestigeGuide.overview}</p>
          <p>
            The important question is not whether you can prestige. The
            important question is whether prestiging now makes the next stage of
            progression cleaner than staying on your current route.
          </p>
        </section>

        <section>
          <h2>When to prestige</h2>
          <p>
            A good prestige decision is tied to a route change. If your progress
            is flattening out and prestige clearly opens the next stage, the
            reset starts to make sense.
          </p>
          <ol>
            {prestigeGuide.whenToPrestige.map((item) => (
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
            If the reset gives you a clearer route, prestige can be correct. If
            the reset only gives you uncertainty, you probably need more
            preparation first.
          </p>
          <p>
            Do not prestige into confusion. Prestige into a plan. That plan can
            be a build change, a stand target, or a cleaner progression route,
            but it needs to exist before you reset.
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
            Read the next guide that helps with your reset plan
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
