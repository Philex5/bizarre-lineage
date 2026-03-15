import { Metadata } from 'next';
import { siteName } from '@/content-data/site';
import { buildMetadata } from '@/features/wiki/pages';
import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/core/i18n/navigation';
import { Crumb } from '@/shared/blocks/common/crumb';
import AdsterraBanner from '@/shared/components/ads/adsterra_banner';

export const revalidate = 3600;
const pageUpdatedAt = '2026-03-09';

const heroBadges = [
  '6 core stats',
  'Beginner-safe route',
  'Stand build context',
  'Checked March 2026',
] as const;

const guideFaq = [
  {
    question: 'What should beginners prioritize with stats?',
    answer:
      'Health first so the route stops collapsing, then Strength and Power for cleaner early progression, then a harder pivot into Stand damage once the Stand is clearly your real build.',
  },
  {
    question: 'Should PvP and PvE use the same stat logic?',
    answer:
      'Not usually. PvP can justify sharper specialization, while PvE and progression routes usually reward more survivability and cleaner repeat clears.',
  },
  {
    question: 'When should I read the stats guide?',
    answer:
      'As soon as point allocation starts slowing your farm, boss attempts, or quest loop. That usually happens long before endgame min-maxing matters.',
  },
  {
    question: 'Why does Conjuration keep coming up in a stats guide?',
    answer:
      'Because Conjuration is part of build context. It is not one of the six main stats, but current public guides tie it to Stand abilities, Stand scaling, and Awakening progression.',
  },
] as const;

const statSections = [
  {
    title: 'Health and survival',
    description:
      'Health buys margin for mistakes. If your route is still unstable, more survivability usually creates more progress than trying to force a specialist build too early.',
  },
  {
    title: 'Strength and Power',
    description:
      'These are the easiest early damage stats to feel in normal grinding. They help your route clear mobs, pressure bosses, and keep general progression moving.',
  },
  {
    title: 'Destructive Power and Destructive Energy',
    description:
      'These matter much more when your Stand is doing the heavy lifting. If your build is genuinely Stand-centered, these become the stats that deserve the bigger share of your points.',
  },
  {
    title: 'Weapon as a specialist stat',
    description:
      'Weapon is usually delayed unless you already know you are committing to a weapon-focused setup. It is strong in the right build and wasteful in the wrong one.',
  },
] as const;

const earlyGamePriorities = [
  {
    title: 'Start with Health so your route stops breaking on simple mistakes',
    description:
      'The first job of your build is to stay playable. Early quests and boss attempts are worth more when you can repeat them cleanly instead of dying to every small error.',
  },
  {
    title: 'Add Strength and Power once survival feels stable',
    description:
      'Once the route is no longer fragile, these two stats usually give the cleanest improvement to mob clears, quest speed, and baseline damage.',
  },
  {
    title: 'Pivot harder into Stand damage when the Stand is the real build',
    description:
      'When your actual plan is Stand pressure, Destructive Power and Destructive Energy should stop being afterthoughts and start becoming the main scaling path.',
  },
  {
    title: 'Leave Weapon for later unless the build is clearly weapon-first',
    description:
      'Weapon can be excellent, but it is not a safe default. Most beginners lose more progress by investing in it too early than by waiting until their build clearly needs it.',
  },
] as const;

const commonMistakes = [
  'Skipping Health and then wondering why every boss attempt feels unstable.',
  'Copying a PvP or endgame setup onto a fresh progression route.',
  'Putting points into Weapon before the build has any reason to be weapon-first.',
  'Treating Conjuration like irrelevant side progress even though it affects Stand growth and Awakening timing.',
] as const;

const youtubeEmbeds = [
  {
    title:
      'BEST STAT BUILD FOR EACH STAND In Bizarre Lineage! (STATS FULL GUIDE) Roblox',
    videoUrl: 'https://www.youtube.com/watch?v=_1ez2dWIuH4',
    embedUrl: 'https://www.youtube-nocookie.com/embed/_1ez2dWIuH4',
    note: 'Best starting point if you want one broad pass over stat logic across multiple Stand choices.',
    whyWatch:
      'Use this first to map your Stand choice to a likely stat direction before you start spending points blindly.',
  },
  {
    title:
      'The TRUTH About Destructive Power and Destructive Energy | Bizzare Lineage',
    videoUrl: 'https://www.youtube.com/watch?v=GvSIpmfyMRw',
    embedUrl: 'https://www.youtube-nocookie.com/embed/GvSIpmfyMRw',
    note: 'Best follow-up once you need the difference between general early damage and Stand-heavy scaling.',
    whyWatch:
      'Watch this second if your build is moving away from generic progression stats and toward a real Stand damage profile.',
  },
  {
    title: 'How to MAX CONJURATION (Fastest Way) | Bizarre Lineage',
    videoUrl: 'https://www.youtube.com/watch?v=k7pSdZ2T8Bo',
    embedUrl: 'https://www.youtube-nocookie.com/embed/k7pSdZ2T8Bo',
    note: 'Useful because Conjuration is not one of the six main stats but still changes when a Stand-focused build actually comes online.',
    whyWatch:
      'Watch this after your stat plan is clear and you want the follow-through for ability unlocks and Awakening prep.',
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
    title: 'Bizarre Lineage Stats Guide - what is the best stats',
    description:
      'Use Bizarre Lineage stats guide to learn the 6 main stats,what to level first,when to pivot into Stand damage,and how Conjuration changes later build planning.',
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
      <div className="mb-6">
        <Crumb
          items={[
            { title: 'Home', url: '/' },
            { title: 'Guides', url: '/guides' },
            { title: 'Stats Guide', url: '/guides/stats', is_active: true },
          ]}
        />
      </div>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline:
            'Bizarre Lineage Stats Guide: What to Level First, Build Logic, and Mistakes',
          description:
            'A practical Bizarre Lineage stats guide covering the 6 main stats, early priorities, Conjuration context, and common allocation mistakes.',
          author: {
            '@type': 'Organization',
            name: siteName,
          },
          publisher: {
            '@type': 'Organization',
            name: siteName,
          },
          dateModified: pageUpdatedAt,
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
        <header className="not-prose border-border bg-background/70 mb-10 rounded-3xl border p-6 sm:p-8">
          <p className="text-muted-foreground text-xs font-medium tracking-[0.18em] uppercase">
            Stats Guide
          </p>
          <h1 className="text-foreground mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            Bizarre Lineage stats should fix your route before they try to
            optimize it
          </h1>
          <p className="text-muted-foreground mt-4 max-w-3xl text-base leading-7">
            Current public guides broadly agree on the same six main stats:
            Strength, Health, Power, Weapon, Destructive Power, and Destructive
            Energy. The useful question is not perfect numbers. It is which
            stats stabilize early progression, when Stand scaling should take
            over, and how Conjuration changes the value of a Stand-focused build
            later on.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            {heroBadges.map((badge) => (
              <span
                key={badge}
                className="border-border rounded-full border px-4 py-2"
              >
                {badge}
              </span>
            ))}
            <span className="border-border rounded-full border px-4 py-2">
              Updated {pageUpdatedAt}
            </span>
          </div>
        </header>

        <div className="not-prose mb-10">
          <AdsterraBanner />
        </div>

        <section>
          <h2>How to think about stats in the current public build</h2>
          <p>
            Recent public guides point to the same basic picture: the six main
            stats do not solve the same problem, so they should not be treated
            like equal-value point dumps. Health keeps unstable routes alive.
            Strength and Power are the easiest early general-purpose damage
            layer. Destructive Power and Destructive Energy matter more when
            your Stand is clearly carrying the build. Weapon only becomes a real
            priority when the build is deliberately weapon-led.
          </p>
          <p>
            The real mistake is not being a few points off. It is building for a
            role you are not actually playing yet. If your route is still shaky,
            survivability and clean PvE value usually beat specialist
            theorycrafting.
          </p>
        </section>

        <section>
          <h2>What each stat group is really doing for you</h2>
          <p>
            Different stats answer different progression problems. If you mix
            them together too early, the build can look active on paper but
            still feel weak in real content.
          </p>
          {statSections.map((item) => (
            <div
              key={item.title}
              className="not-prose border-border bg-background/60 mt-4 rounded-2xl border p-5"
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
          <h2>What to level first in the early game</h2>
          <p>
            The beginner-safe route is simple: stabilize survival first, improve
            general damage second, and only then lean harder into Stand-focused
            scaling when your actual build supports it.
          </p>
          <ol>
            {earlyGamePriorities.map((item) => (
              <li key={item.title}>
                <strong>{item.title}.</strong> {item.description}
              </li>
            ))}
          </ol>
        </section>

        <div className="not-prose my-10">
          <AdsterraBanner />
        </div>

        <section>
          <h2>Common stat mistakes</h2>
          <ul>
            {commonMistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Beginner rule of thumb</h2>
          <p>
            If you are still learning the game, do not build as if you are
            already on a polished endgame account. Health plus reliable
            early-route damage usually outperforms copied specialist setups that
            assume better gear, cleaner execution, or a different Stand.
          </p>
          <p>
            Also do not ignore Conjuration just because it is not listed as one
            of the six main stats. Current public guides tie it to Stand ability
            unlocks and Awakening progression, with Awakening planning commonly
            starting around Level 50 and Conjuration 100. That means Conjuration
            changes how quickly a Stand-focused build actually pays off.
          </p>
        </section>

        <section>
          <h2>Watch the stat logic before you copy a build</h2>
          <p>
            These videos are most useful when watched in order. Start with the
            broad stat overview, then the destructive-stat breakdown, then the
            Conjuration follow-up once your Stand plan is real.
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
            Read the next guide that matches your next build decision
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
