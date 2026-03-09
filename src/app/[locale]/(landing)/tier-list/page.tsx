import { Metadata } from 'next';
import { officialLinks, siteName } from '@/content-data/site';
import {
  standResearchNotes,
  stands,
  standTierDescriptions,
} from '@/content-data/stands';
import { buildMetadata } from '@/features/wiki/pages';
import {
  OrderedChecklist,
  PageShell,
  SectionFrame,
} from '@/features/wiki/primitives';
import { StandsTierBoard } from '@/features/wiki/stands-tier-board';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/core/i18n/navigation';
import { envConfigs } from '@/config';
import { Crumb } from '@/shared/blocks/common/crumb';
import { Badge } from '@/shared/components/ui/badge';

export const revalidate = 3600;

const pageUpdatedAt = '2026-03-09';
const pageTitle =
  'Bizarre Lineage Tier List (March 2026) | Best Stands for PvP & PvE';
const pageDescription =
  'Compare the best Bizarre Lineage stands for PvP, PvE, rerolls, and evolution routes. Built for players deciding what to keep, chase, or skip.';

const quickAnswers = [
  {
    label: 'Best all-round stand',
    title: 'Star Platinum',
    description:
      'If you need one stand that is easiest to recommend across normal PvP, punish value, and general account payoff, this is still the cleanest answer.',
  },
  {
    label: 'Best long-term route',
    title: 'Whitesnake',
    description:
      'Whitesnake matters because it is both strong now and the start of the C-Moon into Made in Heaven path. That makes it more than a simple reroll result.',
  },
  {
    label: 'Best PvE comfort pick',
    title: 'Weather Report',
    description:
      'If your priority is mission clears, screen control, and smoother progression instead of pure duel clips, Weather Report is the easier recommendation.',
  },
  {
    label: 'Best beginner advice',
    title: 'Do not over-reroll',
    description:
      'Most fresh accounts lose more progress by gambling for perfect than by learning the game on a usable stand. Treat the list like a keep-or-skip tool, not a slot machine.',
  },
] as const;

const standoutStands = [
  {
    key: 'star-platinum',
    intro:
      'Star Platinum is the stand I point to when someone wants a premium answer that still holds up in real matches. You care about it if you want obvious punish routes, strong duel pressure, and a chase target that does not need excuses.',
  },
  {
    key: 'whitesnake',
    intro:
      'Whitesnake matters because the value is not only in the current card. You care about it if you want strong control now and a real path into C-Moon and Made in Heaven later without rerolling the account into the ground.',
  },
  {
    key: 'made-in-heaven',
    intro:
      'Made in Heaven is for players who already know they want speed, chase pressure, and a stand that snowballs when the pilot is sharp. It is a route reward, not a beginner-first obsession.',
  },
  {
    key: 'weather-report',
    intro:
      'Weather Report deserves more respect than duel-only lists usually give it. If your account spends more time farming, clearing, and controlling space than forcing highlight fights, this stand makes immediate sense.',
  },
  {
    key: 'king-crimson',
    intro:
      'King Crimson is for players who want outplay value more than comfort. It pays you back when your timing is clean, but it also exposes panic play faster than safer all-rounder picks.',
  },
] as const;

const methodologyItems = [
  {
    title: 'Judge repeat value, not one flashy combo',
    description:
      'A stand ranks high here when it keeps paying off in normal duels, public-server farming, and common player mistakes. Clip value matters less than session-to-session consistency.',
  },
  {
    title: 'Separate fresh-account value from finished-account value',
    description:
      'Some stands are amazing once the full route is complete but questionable advice for a player who still needs stable farm and progression. That is why reroll cost and evolution friction stay visible here.',
  },
  {
    title: 'PvE utility still counts',
    description:
      'Weather Report and similar picks matter because real players do more than duel. Mission comfort, AoE control, and repeatable grind value deserve ranking weight too.',
  },
  {
    title: 'Route friction changes the recommendation',
    description:
      'Whitesnake, C-Moon, and Made in Heaven should not be explained the same way as a simple Arrow pull. The route itself changes how valuable the stand is to a real account.',
  },
] as const;

const faqItems = [
  {
    question: 'What is the best stand in Bizarre Lineage right now?',
    answer:
      'As of March 9, 2026, Star Platinum is still the cleanest all-round answer on this page. It is not the only S-tier stand, but it is the easiest premium recommendation to defend across normal PvP, matchup spread, and account value.',
  },
  {
    question: 'What stand should I chase if I care more about PvE than PvP?',
    answer:
      'Weather Report is the clearest page-level answer if your goal is safer mission clears and stronger area control. It gives up some duel sharpness, but it is easier to justify for progression-first players.',
  },
  {
    question:
      'Is Whitesnake better than rerolling for a different S-tier stand?',
    answer:
      'Often yes, because Whitesnake is strong on its own and opens the C-Moon and Made in Heaven route. If you are thinking beyond one lucky pull, that route value matters.',
  },
  {
    question:
      'Should beginners reroll until they hit Star Platinum or The World?',
    answer:
      'Usually no. Most beginners get more value from learning progression, stats, and boss flow on a usable stand than from stalling their account for a dream pull they may not even pilot well yet.',
  },
  {
    question: 'Why does this page talk so much about reroll cost and comfort?',
    answer:
      'Because real Bizarre Lineage decisions are not made on isolated duel clips. Players care about farm speed, progression friction, and whether a stand is still worth the effort after the novelty wears off.',
  },
] as const;

const nextStepCards = [
  {
    title: 'Read the Beginner Guide',
    description:
      'Use this if you still need a clean early route before the tier list can save you time.',
    href: '/guides/beginner-guide',
    label: 'Early route',
  },
  {
    title: 'Browse every stand card',
    description:
      'Use this when you want every stand summary, obtainment note, and quick verdict in one place.',
    href: '/stands',
    label: 'Stand index',
  },
  {
    title: 'Plan the next prestige',
    description:
      'Use this once the tier list settles what is worth building toward and reset timing starts to matter.',
    href: '/guides/prestige',
    label: 'Prestige guide',
  },
] as const;

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildMetadata({
    locale,
    path: '/tier-list',
    title: pageTitle,
    description: pageDescription,
    keywords: [
      'bizarre lineage tier list',
      'bizarre lineage best stand',
      'bizarre lineage best pvp stand',
      'bizarre lineage best pve stand',
      'bizarre lineage reroll guide',
      'bizarre lineage whitesnake',
      'bizarre lineage made in heaven',
      'bizarre lineage weather report',
      'bizarre lineage evolution route',
      'bizarre lineage stand guide',
    ],
  });
}

export default async function TierListRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const featuredStandCards = standoutStands
    .map((item) => {
      const stand = stands.find((entry) => entry.key === item.key);
      if (!stand) {
        return null;
      }

      return {
        ...stand,
        intro: item.intro,
      };
    })
    .filter((value): value is NonNullable<typeof value> => value !== null);

  return (
    <PageShell accent="violet">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline:
            'Bizarre Lineage Tier List: Best Stands for PvP, PvE, and Rerolls',
          description: pageDescription,
          author: {
            '@type': 'Organization',
            name: siteName,
          },
          publisher: {
            '@type': 'Organization',
            name: siteName,
          },
          dateModified: pageUpdatedAt,
          mainEntityOfPage: `${envConfigs.app_url}/tier-list`,
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqItems.map((item) => ({
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
          '@type': 'ItemList',
          name: 'Bizarre Lineage stand tier list',
          itemListOrder: 'https://schema.org/ItemListOrderAscending',
          numberOfItems: stands.length,
          itemListElement: stands.map((stand, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: stand.name,
            description: `${stand.tier} tier. ${stand.quickVerdict}`,
            url: `${envConfigs.app_url}/stands#${stand.key}`,
          })),
        }}
      />

      <div className="px-1 pt-2">
        <Crumb
          items={[
            { title: 'Home', url: '/' },
            { title: 'Tier List', url: '/tier-list', is_active: true },
          ]}
        />
      </div>

      <StandsTierBoard />

      <SectionFrame
        eyebrow="Quick answers"
        title="Start here if you want the main answers without checking every stand."
        description="These are the quick takeaways most players want before they decide what to keep, reroll, or build around."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {quickAnswers.map((item) => (
            <article
              key={item.title}
              className="bg-background/92 border-border rounded-[1.6rem] border p-5"
            >
              <div className="text-muted-foreground text-[0.68rem] tracking-[0.2em] uppercase">
                {item.label}
              </div>
              <h3 className="text-foreground mt-2 text-2xl font-semibold tracking-[-0.04em]">
                {item.title}
              </h3>
              <p className="text-muted-foreground mt-3 text-sm leading-7">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame
        eyebrow="Stand focus"
        title="These are the stands most players should understand first."
        description="Each one matters for a different reason: overall strength, route value, PvE comfort, or high-skill PvP payoff."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featuredStandCards.map((stand) => (
            <article
              key={stand.key}
              className="bg-background/92 border-border rounded-[1.7rem] border p-5"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="rounded-full px-3 py-1">
                  {stand.tier} tier
                </Badge>
                <span className="text-muted-foreground text-xs tracking-[0.16em] uppercase">
                  {stand.bestFor}
                </span>
              </div>
              <h2 className="text-foreground mt-3 text-2xl font-semibold tracking-[-0.04em]">
                {stand.name}
              </h2>
              <p className="text-primary mt-3 text-sm font-medium">
                {stand.quickVerdict}
              </p>
              <p className="text-muted-foreground mt-3 text-sm leading-7">
                {stand.intro}
              </p>
            </article>
          ))}
        </div>
      </SectionFrame>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <SectionFrame
          eyebrow="Methodology"
          title="How this guide judges whether a stand is actually worth your time."
          description="The ranking favors stands that stay strong across normal PvP, PvE farming, and progression decisions instead of only looking good in perfect situations."
        >
          <OrderedChecklist items={[...methodologyItems]} />
        </SectionFrame>

        <SectionFrame
          eyebrow="Notes"
          title="What to keep in mind before you commit to a reroll or route."
          description={`Current stand notes verified ${standResearchNotes.verifiedAt}.`}
        >
          <div className="grid gap-4">
            <div className="bg-background/92 border-border rounded-[1.5rem] border p-5">
              <div className="text-muted-foreground text-[0.68rem] tracking-[0.18em] uppercase">
                What this page covers
              </div>
              <p className="text-muted-foreground mt-3 text-sm leading-7">
                This page is built to answer the stand questions players ask
                most: what is best overall, what is strongest for PvP, what is
                easiest to justify for PvE, and when a route like Whitesnake
                into C-Moon and Made in Heaven is better than forcing another
                reroll.
              </p>
            </div>

            <div className="bg-background/92 border-border rounded-[1.5rem] border p-5">
              <div className="text-muted-foreground text-[0.68rem] tracking-[0.18em] uppercase">
                How to read the tier letters
              </div>
              <div className="mt-3 grid gap-3">
                {Object.entries(standTierDescriptions).map(
                  ([tier, description]) => (
                    <div key={tier}>
                      <div className="text-foreground text-sm font-semibold uppercase">
                        {tier} tier
                      </div>
                      <p className="text-muted-foreground mt-1 text-sm leading-6">
                        {description}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="grid gap-3">
              {officialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-background/92 border-border flex items-start justify-between gap-3 rounded-[1.2rem] border p-4"
                >
                  <div>
                    <div className="text-foreground text-sm font-semibold">
                      {link.label}
                    </div>
                    <div className="text-muted-foreground mt-1 text-xs leading-6">
                      {link.note}
                    </div>
                  </div>
                  <ExternalLink className="text-muted-foreground mt-1 size-4 shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </SectionFrame>
      </div>

      <SectionFrame
        eyebrow="Next steps"
        title="After the tier list, most players need one of these three pages."
        description="Use the next guide based on what is actually blocking progress right now: early route, stand research, or prestige timing."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {nextStepCards.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="bg-background/92 border-border rounded-[1.6rem] border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="text-muted-foreground text-[0.68rem] tracking-[0.2em] uppercase">
                {item.label}
              </div>
              <h2 className="text-foreground mt-2 text-2xl font-semibold tracking-[-0.04em]">
                {item.title}
              </h2>
              <p className="text-muted-foreground mt-3 text-sm leading-7">
                {item.description}
              </p>
              <div className="text-primary mt-5 inline-flex items-center gap-2 text-sm font-medium tracking-[0.18em] uppercase">
                Open page
                <ArrowRight className="size-4" />
              </div>
            </Link>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame
        eyebrow="FAQ"
        title="Common follow-up questions after checking the stand rankings."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {faqItems.map((item) => (
            <article
              key={item.question}
              className="bg-background/92 border-border rounded-[1.6rem] border p-5"
            >
              <h2 className="text-foreground text-lg font-semibold tracking-[-0.03em]">
                {item.question}
              </h2>
              <p className="text-muted-foreground mt-3 text-sm leading-7">
                {item.answer}
              </p>
            </article>
          ))}
        </div>
      </SectionFrame>
    </PageShell>
  );
}
