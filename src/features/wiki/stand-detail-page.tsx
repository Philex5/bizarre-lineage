import Image from 'next/image';
import {
  getOfficialStandDetail,
  officialStandMoveSource,
} from '@/content-data/stand-details';
import {
  getStandByKey,
  getStandHref,
  getStands,
  type StandEntry,
} from '@/content-data/stands';
import { getTierListEntries } from '@/content-data/tier-list';
import { toImageUrl } from '@/lib/r2-utils';
import {
  BookOpenText,
  ShieldAlert,
  Swords,
  Trophy,
} from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';

import { Link } from '@/core/i18n/navigation';
import { envConfigs } from '@/config';
import { Crumb } from '@/shared/blocks/common/crumb';
import AdsterraBanner from '@/shared/components/ads/adsterra_banner';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

import { CardGrid, PageShell, SectionFrame, SplitNotes } from './primitives';

type StandRoleSignal = {
  pvp: string;
  pve: string;
  beginner: string;
  summary: string;
};

const tierAccentClasses: Record<StandEntry['tier'], string> = {
  S: 'from-amber-300 via-orange-400 to-red-500',
  A: 'from-cyan-300 via-sky-400 to-indigo-500',
  B: 'from-emerald-300 via-teal-400 to-cyan-500',
  C: 'from-slate-300 via-slate-400 to-slate-600',
  D: 'from-zinc-400 via-zinc-500 to-zinc-700',
};

function getRoleSignalFallback(stand: StandEntry): StandRoleSignal {
  const beginner =
    stand.bestFor.toLowerCase().includes('beginner') ||
    stand.summary.toLowerCase().includes('new player')
      ? 'High'
      : stand.tier === 'S' || stand.tier === 'A'
        ? 'Medium'
        : 'Low';

  const pve =
    stand.bestFor.toLowerCase().includes('pve') ||
    stand.summary.toLowerCase().includes('farm')
      ? 'Strong'
      : stand.tier === 'S' || stand.tier === 'A'
        ? 'Good'
        : 'Average';

  const pvp =
    stand.bestFor.toLowerCase().includes('pvp') ||
    stand.summary.toLowerCase().includes('duel')
      ? 'Excellent'
      : stand.tier === 'S' || stand.tier === 'A'
        ? 'Strong'
        : 'Average';

  return {
    pvp,
    pve,
    beginner,
    summary: stand.summary,
  };
}

function getRoleSignals(
  stand: StandEntry,
  entries: Array<{
    key: string;
    pvp: string;
    pve: string;
    beginner: string;
    summary: string;
  }>
) {
  return (
    entries.find((entry) => entry.key === stand.key) ??
    getRoleSignalFallback(stand)
  );
}

function getAlternatives(stand: StandEntry, locale?: string | null) {
  return getStands(locale)
    .filter((entry) => entry.key !== stand.key && entry.tier === stand.tier)
    .slice(0, 3);
}

function rolePillTone(value: string) {
  if (value === 'Excellent' || value === 'High' || value === 'Strong') {
    return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300';
  }

  if (value === 'Good' || value === 'Medium') {
    return 'border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300';
  }

  return 'border-border bg-background/70 text-muted-foreground';
}

function MoveCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <article className="border-border bg-background/86 relative overflow-hidden rounded-[1.6rem] border p-5 shadow-sm">
      <div className="absolute inset-x-5 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-primary),var(--color-accent),transparent)]" />
      <h3 className="text-foreground text-lg font-semibold tracking-[-0.03em]">
        {title}
      </h3>
      <p className="text-muted-foreground mt-3 text-sm leading-7">
        {description}
      </p>
    </article>
  );
}

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export async function StandDetailPage({ standKey }: { standKey: string }) {
  const locale = await getLocale();
  const stand = getStandByKey(standKey, locale);
  const officialDetail = getOfficialStandDetail(standKey);
  const tTier = await getTranslations('pages.tier-list');

  if (!stand || !officialDetail) {
    return null;
  }

  const imageUrl = toImageUrl(stand.imageUrl);
  const roleSignals = getRoleSignals(stand, getTierListEntries(tTier));
  const alternatives = getAlternatives(stand, locale);

  return (
    <PageShell accent="violet">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: `${stand.name} in Bizarre Lineage`,
          description: stand.quickVerdict,
          mainEntityOfPage: `${envConfigs.app_url}${getStandHref(stand.key)}`,
          about: stand.name,
          dateModified: officialStandMoveSource.verifiedAt,
        }}
      />
      <div className="space-y-8">
        <Crumb
          items={[
            { title: 'Home', url: '/' },
            { title: 'Stands', url: '/stands' },
            {
              title: stand.name,
              url: getStandHref(stand.key),
              is_active: true,
            },
          ]}
        />

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_24rem] lg:items-stretch">
          <article className="border-border bg-card/92 relative overflow-hidden rounded-[2rem] border p-6 shadow-lg md:p-8">
            <div
              className={cn(
                'absolute inset-x-0 top-0 h-1 bg-gradient-to-r',
                tierAccentClasses[stand.tier]
              )}
            />
            <div className="relative z-10">
              <p className="text-primary text-[0.7rem] tracking-[0.24em] uppercase">
                {stand.tier}-Tier Stand Guide
              </p>
              <h1 className="text-foreground mt-3 font-serif text-4xl leading-[0.95] tracking-[-0.05em] md:text-6xl">
                {stand.name}
              </h1>
              <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-7 md:text-lg">
                {stand.quickVerdict}
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                <span className="border-border rounded-full border px-4 py-2">
                  {stand.rarity}
                </span>
                <span className="border-border rounded-full border px-4 py-2">
                  {stand.part}
                </span>
                <span className="border-border rounded-full border px-4 py-2">
                  Best for {stand.bestFor}
                </span>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { label: 'PvP', value: roleSignals.pvp },
                  { label: 'PvE', value: roleSignals.pve },
                  { label: 'Beginner', value: roleSignals.beginner },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="border-border bg-background/72 rounded-[1.25rem] border p-4"
                  >
                    <p className="text-muted-foreground text-[0.72rem] tracking-[0.18em] uppercase">
                      {item.label}
                    </p>
                    <p
                      className={cn(
                        'mt-3 inline-flex rounded-full border px-3 py-1 text-sm font-medium',
                        rolePillTone(item.value)
                      )}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-muted-foreground mt-8 max-w-3xl text-sm leading-7 md:text-base">
                {roleSignals.summary}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/tier-list">
                    Compare on Tier List
                    <Trophy className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </article>

          <aside className="border-border bg-card/92 relative overflow-hidden rounded-[2rem] border p-4 shadow-lg">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,color-mix(in_oklab,var(--color-primary)_18%,transparent)_0,transparent_55%)]" />
            <div className="relative h-full min-h-[24rem] overflow-hidden rounded-[1.6rem]">
              {imageUrl ? (
                <>
                  <Image
                    src={imageUrl}
                    alt={`${stand.name} character art`}
                    fill
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,color-mix(in_oklab,var(--color-foreground)_16%,transparent)_100%)]" />
                </>
              ) : (
                <div className="bg-background flex h-full items-center justify-center rounded-[1.6rem]">
                  <span className="text-muted-foreground text-sm">
                    Character image unavailable
                  </span>
                </div>
              )}

              <div className="absolute inset-x-4 bottom-4 rounded-[1.4rem] border border-white/15 bg-black/45 p-4 text-white backdrop-blur-md">
                <p className="text-[0.68rem] tracking-[0.22em] text-white/70 uppercase">
                  Visual identity
                </p>
                <p className="mt-2 text-sm leading-6 text-white/88">
                  {stand.summary}
                </p>
              </div>
            </div>
          </aside>
        </section>

        <div className="px-1">
          <AdsterraBanner />
        </div>

        <SectionFrame
          eyebrow="Quick read"
          title="What this stand gives you right now"
          description="This page combines the current stand hub data with the official Trello moveset so you can judge role, pressure pattern, and grind value in one place."
        >
          <CardGrid
            columns={3}
            items={[
              {
                title: 'Role',
                description: stand.bestFor,
                meta: `${stand.tier}-tier fit`,
              },
              {
                title: 'Acquisition',
                description:
                  stand.howToGet[0] ??
                  'Check the stand hub for the latest route.',
                meta: 'How to get',
              },
              {
                title: 'Playstyle snapshot',
                description: stand.summary,
                meta: 'Current read',
              },
            ]}
          />
        </SectionFrame>

        <SectionFrame
          eyebrow="Moveset"
          title={`${stand.name} official move breakdown`}
          description="Move descriptions are simplified from the official Trello so they read like a guide page instead of patch notes."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {officialDetail.moves.map((move) => (
              <MoveCard
                key={move.title}
                title={move.title}
                description={move.description}
              />
            ))}
          </div>
        </SectionFrame>

        <SectionFrame
          eyebrow="Matchup read"
          title="Strengths, weaknesses, and chase logic"
          description="Keep this section in mind before you sink arrows, evolution items, or rerolls into a longer chase."
        >
          <SplitNotes
            leftTitle="Why players keep it"
            leftItems={stand.strengths}
            rightTitle="Why players pivot off it"
            rightItems={stand.weaknesses}
          />
        </SectionFrame>

        <SectionFrame
          eyebrow="Acquisition"
          title={`How to get ${stand.name}`}
          description="This section stays short on purpose so the page remains useful even when progression requirements shift."
        >
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_18rem]">
            <div className="border-border bg-background/80 rounded-[1.6rem] border p-5">
              <ul className="space-y-3">
                {stand.howToGet.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="bg-primary mt-2 size-2 rounded-full" />
                    <span className="text-muted-foreground text-sm leading-7">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-border bg-background/80 rounded-[1.6rem] border p-5">
              <p className="text-muted-foreground text-[0.72rem] tracking-[0.18em] uppercase">
                Source note
              </p>
              <p className="text-foreground mt-3 text-sm leading-7">
                Move and ability references come from the official Trello card.
                Acquisition and meta framing come from this site&apos;s current
                tier-list and stand-hub data.
              </p>
            </div>
          </div>
        </SectionFrame>

        <div className="px-1">
          <AdsterraBanner />
        </div>

        {alternatives.length ? (
          <SectionFrame
            eyebrow="Compare next"
            title="Nearby alternatives in the same tier"
            description="If this stand’s trade-offs do not fit your route, these are the closest comparison points on the current board."
          >
            <CardGrid
              columns={3}
              items={alternatives.map((entry) => ({
                title: entry.name,
                description: entry.quickVerdict,
                meta: `Best for ${entry.bestFor}`,
                href: getStandHref(entry.key),
              }))}
            />
          </SectionFrame>
        ) : null}

        <SectionFrame
          eyebrow="Next steps"
          title="Use this page as a decision page, not just a lookup page"
          description="Open the tier list for broader context, then use the beginner and stats guides if you still need a cleaner progression route."
        >
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/tier-list">
                Back to Tier List
                <Trophy className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/guides/beginner-guide">
                Beginner Guide
                <BookOpenText className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/stands">
                All Stands
                <Swords className="size-4" />
              </Link>
            </Button>
          </div>
        </SectionFrame>

        <section className="border-border bg-card/85 rounded-[1.6rem] border p-5">
          <div className="flex items-start gap-3">
            <ShieldAlert className="text-primary mt-0.5 size-5 shrink-0" />
            <p className="text-muted-foreground text-sm leading-7">
              Gameplay balance can move quickly. This page uses the official
              Trello card checked on {officialStandMoveSource.verifiedAt} for
              move coverage, while meta judgments come from the current site
              tier-list framing and may change with future patches.
            </p>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
