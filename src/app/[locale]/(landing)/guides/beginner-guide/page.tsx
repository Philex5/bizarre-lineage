import { Metadata } from 'next';
import { siteName } from '@/content-data/site';
import { buildMetadata } from '@/features/wiki/pages';
import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/core/i18n/navigation';
import { Crumb } from '@/shared/blocks/common/crumb';

export const revalidate = 3600;

const progressionSteps = [
  {
    title: 'Finish the hotel opener before you wander off',
    description:
      'Your first route should start at the Morioh Grand Hotel. The receptionist and tutorial flow give new players structure, explain the map, and help you leave the spawn with momentum instead of confusion.',
  },
  {
    title: 'Take the first usable Stand and learn it',
    description:
      'Do not burn time chasing a dream reroll on minute one. A practical early Stand is enough to clear quests, learn keybinds, and understand how your build actually feels in combat.',
  },
  {
    title: 'Build around Conjuration early',
    description:
      'Conjuration is part of what makes your Stand feel complete. Use the gym and the related training loop early so you unlock more of your kit before you start judging whether a Stand is weak or worth replacing.',
  },
  {
    title: 'Level through quests, boards, and world events',
    description:
      'Story objectives, mission boards, and visible world events usually move beginners forward more cleanly than random grinding. They stack experience, map knowledge, and item progress at the same time.',
  },
  {
    title: 'Treat level 50 as your first real milestone',
    description:
      'Level 50 is where the guide stops being just about surviving the early game. Awakening becomes a serious target there, and it marks the point where build choices, prestige timing, and raid prep start to matter.',
  },
];

const statPriorities = [
  {
    name: 'Destructive Power',
    benefit:
      'A safe first priority for most Stand-focused builds because it turns basic openings into real damage.',
  },
  {
    name: 'Stand or ability scaling',
    benefit:
      'If your Stand relies on specials, projectiles, or ability pressure, invest in the stat that actually improves that part of the kit.',
  },
  {
    name: 'Health and survivability',
    benefit:
      'Take enough durability to finish routes cleanly, but do not dump so many points into survival that your clears become slow.',
  },
  {
    name: 'Save niche stats for later',
    benefit:
      'Beginners usually lose more value by spreading points thinly than by committing to one clear game plan.',
  },
];

const controlSchemes = [
  { key: 'H', action: 'Summon/Dismiss Stand' },
  { key: 'F', action: 'Block (Vital for PvP)' },
  { key: 'Q', action: 'Dash' },
  { key: 'G', action: 'Evade' },
  { key: 'M', action: 'Radial Menu' },
  { key: 'N', action: 'Special Vision (Highlights NPCs/Mission Boards)' },
];

const heroBadges = [
  'Beginner-safe route',
  'Conjuration focus',
  'Level 50 milestone',
  'Prestige-ready next steps',
] as const;

const beginnerMistakes = [
  'Rerolling too early instead of learning the first usable Stand.',
  'Ignoring Conjuration and then assuming the Stand is the problem.',
  'Grinding random mobs while skipping mission boards and route-based objectives.',
  'Spending stat points everywhere and ending up with no real strength.',
] as const;

const guideFaq = [
  {
    question: 'What should I do first in Bizarre Lineage?',
    answer:
      'Start with the hotel tutorial flow, secure a usable Stand, and push early progression instead of rerolling resources away.',
  },
  {
    question: 'Should beginners reroll their first Stand?',
    answer:
      'Usually no. Most beginners progress faster by learning the first workable Stand and saving rerolls for later.',
  },
  {
    question: 'Why does Conjuration matter so much?',
    answer:
      'Because a Stand often feels incomplete until you invest in the training and unlock more of its actual kit.',
  },
  {
    question: 'What is the first major milestone?',
    answer:
      'Level 50 is the first major checkpoint because awakening, stronger route planning, and prestige decisions start to matter there.',
  },
] as const;

const youtubeEmbeds = [
  {
    title:
      'Bizarre Lineage: FULL Beginners Guide (Stands, Levelling, Awakenings, Bosses, Prestige) + Tips',
    embedUrl: 'https://www.youtube-nocookie.com/embed/0zTlS2CKB8k',
    note: 'Direct beginner walkthrough video from Phyinite.',
  },
  {
    title:
      "The BEST Beginners Guide to Bizarre Lineage! (Stands, Sub-Abilities, Stats)",
    embedUrl: 'https://www.youtube-nocookie.com/embed/L9w_e-N4L-E',
    note: 'Deep dive into late-game mechanics and build optimization from Catrague.',
  },
  {
    title: 'How to MAX CONJURATION (Fastest Way) | Bizarre Lineage',
    embedUrl: 'https://www.youtube-nocookie.com/embed/k7pSdZ2T8Bo',
    note: 'Focused video for the Conjuration section and training loop.',
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
      'Bizarre Lineage Beginner Guide - Hotel Start, Stands, Conjuration, Level 50',
    description:
      'Use this Bizarre Lineage beginner guide to plan your hotel start, first Stand, Conjuration training, stat priorities, and the route toward level 50 awakening.',
    keywords: [
      'bizarre lineage beginner guide',
      'bizarre lineage leveling guide',
      'bizarre lineage conjuration guide',
      'bizarre lineage awakening guide',
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

  return (
    <main className="mx-auto w-full max-w-5xl px-4 pt-24 pb-16 sm:px-6 lg:px-8 lg:pt-28">
      <div className="mb-6">
        <Crumb
          items={[
            { title: 'Home', url: '/' },
            { title: 'Guides', url: '/guides' },
            {
              title: 'Beginner Guide',
              url: '/guides/beginner-guide',
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
            'Bizarre Lineage Beginner Guide: Hotel Start, First Stand, and Level 50 Route',
          description:
            'A practical beginner route for Bizarre Lineage covering the hotel opener, first stand decisions, Conjuration, stat priorities, and the path toward awakening.',
          author: { '@type': 'Organization', name: siteName },
          publisher: { '@type': 'Organization', name: siteName },
          dateModified: '2026-03-09',
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

      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <header className="not-prose border-border bg-background/70 mb-10 rounded-3xl border p-6 sm:p-8">
          <p className="text-primary text-xs font-bold tracking-[0.18em] uppercase">
            Beginner&apos;s Guide
          </p>
          <h1 className="text-foreground mt-3 text-3xl leading-tight font-semibold tracking-[-0.04em] sm:text-4xl">
            Your first steps in Bizarre Lineage should build a route, not waste
            your resources
          </h1>
          <p className="text-muted-foreground mt-4 max-w-3xl text-lg leading-7">
            This page is built for players who want a clean early-game plan.
            Start at the hotel, secure a workable Stand, invest in Conjuration
            early, and push toward level 50 without getting trapped by reroll
            habits or scattered stat points.
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
          </div>
        </header>

        <section>
          <h2>How to approach the early game</h2>
          <p>
            Bizarre Lineage feels chaotic if you treat the opening minutes like
            a loot chase. It gets much easier once you treat the early game as a
            route: learn the spawn flow, take the first useful Stand, unlock
            more of its kit, and level through objectives that move multiple
            systems forward at once.
          </p>
          <div className="bg-primary/5 border-primary/20 my-6 rounded-2xl border p-6">
            <h3 className="text-primary mt-0">Why the hotel opener matters</h3>
            <p className="mb-0">
              New players should not sprint past the{' '}
              <strong>Morioh Grand Hotel</strong> opener. The receptionist and
              tutorial flow establish your controls, your first direction, and
              the rhythm you need before branching into mission boards, Stand
              progress, and leveling routes.
            </p>
          </div>
        </section>

        <section>
          <h2>The core progression loop</h2>
          <div className="mt-8 grid gap-6">
            {progressionSteps.map((step, i) => (
              <div
                key={i}
                className="not-prose border-border bg-background/50 rounded-2xl border p-6"
              >
                <div className="mb-3 flex items-center gap-4">
                  <span className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold">
                    {i + 1}
                  </span>
                  <h3 className="text-foreground m-0 text-xl font-bold">
                    {step.title}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Stat priorities for beginners</h2>
          <p>
            Stats matter most when they support the Stand and route you are
            actually playing. For most beginners, that means leaning into clear
            damage, enough survivability to keep routes smooth, and avoiding
            niche point spreads before your build has an identity.
          </p>
          <div className="not-prose mt-6 grid gap-4 md:grid-cols-2">
            {statPriorities.map((stat) => (
              <div
                key={stat.name}
                className="border-border bg-background/40 rounded-xl border p-5"
              >
                <h4 className="text-foreground font-bold">{stat.name}</h4>
                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  {stat.benefit}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Beginner mistakes that slow progression down</h2>
          <ul>
            {beginnerMistakes.map((mistake) => (
              <li key={mistake}>{mistake}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Mastering Controls</h2>
          <div className="not-prose border-border mt-8 overflow-hidden rounded-2xl border">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 border-border border-b">
                <tr>
                  <th className="px-6 py-4 font-bold">Keybind</th>
                  <th className="px-6 py-4 font-bold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-border divide-y">
                {controlSchemes.map((ctrl) => (
                  <tr
                    key={ctrl.key}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="text-primary px-6 py-4 font-mono font-bold">
                      {ctrl.key}
                    </td>
                    <td className="text-muted-foreground px-6 py-4">
                      {ctrl.action}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2>Beyond level 50: awakening, prestige, and raids</h2>
          <p>
            Reaching level 50 is where the beginner route hands off to the wider
            progression game. Awakening becomes a real target, prestige starts
            to matter as a planned reset instead of a vague future option, and
            raids become more relevant once your build can handle coordinated or
            repeatable content.
          </p>
          <ul>
            <li>
              <strong>Prestige:</strong> Reset timing matters more than raw
              availability. Prestige is strongest when it clearly opens your
              next route instead of throwing you back into early confusion.
            </li>
            <li>
              <strong>Raids:</strong> Raids become a better use of time once
              your build is stable enough to contribute consistently and farm
              their rewards with intent.
            </li>
          </ul>
        </section>

        <section>
          <h2>Watch the route in action</h2>
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
                </div>
              </div>
            ))}
          </div>
        </section>
      </article>

      <aside className="border-border bg-background/70 mt-16 rounded-3xl border p-6 sm:p-8">
        <h2 className="text-foreground mb-6 text-2xl font-semibold tracking-[-0.03em]">
          Continue with the next stage
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Link
            href="/terms/awakening"
            className="border-border bg-background hover:border-primary/50 rounded-2xl border p-6 transition-all hover:shadow-lg"
          >
            <p className="text-foreground text-lg font-bold">Awakening</p>
            <p className="text-muted-foreground mt-2 text-sm">
              Read this next if level 50 is now your main target and you want to
              understand where awakening fits in the route.
            </p>
          </Link>
          <Link
            href="/guides/prestige"
            className="border-border bg-background hover:border-primary/50 rounded-2xl border p-6 transition-all hover:shadow-lg"
          >
            <p className="text-foreground text-lg font-bold">Prestige Guide</p>
            <p className="text-muted-foreground mt-2 text-sm">
              Open the full prestige guide once your build is stable and the
              next decision is whether resetting improves your route.
            </p>
          </Link>
          <Link
            href="/terms/raid"
            className="border-border bg-background hover:border-primary/50 rounded-2xl border p-6 transition-all hover:shadow-lg"
          >
            <p className="text-foreground text-lg font-bold">Raids</p>
            <p className="text-muted-foreground mt-2 text-sm">
              Move here when you want a quick overview of raid rewards, token
              shops, and when raids are actually worth farming.
            </p>
          </Link>
        </div>
      </aside>
    </main>
  );
}
