'use client';

import { useState } from 'react';
import { stands, type StandEntry, type StandTier } from '@/content-data/stands';
import { ArrowRight } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { cn } from '@/shared/lib/utils';

const tierOrder: StandTier[] = ['S', 'A', 'B', 'C'];

const tierPalette: Record<
  StandTier,
  { row: string; label: string; cell: string; selected: string }
> = {
  S: {
    row: 'bg-primary/10',
    label: 'bg-primary text-primary-foreground',
    cell: 'bg-background hover:bg-primary/10',
    selected: 'ring-2 ring-primary bg-primary/12',
  },
  A: {
    row: 'bg-accent/10',
    label: 'bg-accent text-accent-foreground',
    cell: 'bg-background hover:bg-accent/10',
    selected: 'ring-2 ring-accent bg-accent/14',
  },
  B: {
    row: 'bg-secondary',
    label: 'bg-foreground text-background',
    cell: 'bg-background hover:bg-muted',
    selected: 'ring-2 ring-foreground/30 bg-muted',
  },
  C: {
    row: 'bg-muted',
    label: 'bg-muted-foreground text-background',
    cell: 'bg-background hover:bg-secondary',
    selected: 'ring-2 ring-muted-foreground/30 bg-secondary',
  },
};

function groupByTier() {
  return tierOrder.map((tier) => ({
    tier,
    entries: stands.filter((stand) => stand.tier === tier),
  }));
}

function DetailCard({ stand }: { stand: StandEntry }) {
  return (
    <section className="border-border bg-card overflow-hidden rounded-[2rem] border shadow-lg">
      <div className="text-primary-foreground bg-[linear-gradient(90deg,var(--color-primary),color-mix(in_oklab,var(--color-primary)_72%,var(--color-accent)),var(--color-accent))] px-6 py-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-white/20 bg-white/12 px-3 py-1 text-[0.7rem] font-semibold tracking-[0.18em] uppercase">
            {stand.tier} tier
          </span>
          <span className="rounded-full border border-white/20 bg-white/12 px-3 py-1 text-[0.7rem] font-semibold tracking-[0.18em] uppercase">
            {stand.rarity}
          </span>
          <span className="rounded-full border border-white/20 bg-white/12 px-3 py-1 text-[0.7rem] font-semibold tracking-[0.18em] uppercase">
            {stand.part}
          </span>
        </div>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="font-serif text-4xl leading-none tracking-[-0.05em] text-white">
              {stand.name}
            </h2>
            <p className="mt-2 text-sm font-medium tracking-[0.14em] text-white/74 uppercase">
              {stand.bestFor}
            </p>
          </div>
          {stand.key === 'star-platinum' ? (
            <Link
              href="/stands/star-platinum"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-4 py-2 text-[0.72rem] font-semibold tracking-[0.16em] uppercase transition hover:bg-white/18"
            >
              Detail page
              <ArrowRight className="size-4" />
            </Link>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 p-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-5">
          <p className="text-muted-foreground text-base leading-7">
            {stand.quickVerdict}
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            {stand.abilities.map((ability) => (
              <div
                key={ability.title}
                className="bg-background/90 border-border rounded-[1.3rem] border p-4"
              >
                <div className="text-foreground text-sm font-semibold">
                  {ability.title}
                </div>
                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  {ability.description}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="border-accent/16 bg-accent/8 rounded-[1.3rem] border p-4">
              <div className="text-accent text-[0.68rem] font-semibold tracking-[0.18em] uppercase">
                Strengths
              </div>
              <ul className="text-muted-foreground mt-3 space-y-2 text-sm leading-6">
                {stand.strengths.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="bg-accent mt-2 size-1.5 rounded-full" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-primary/16 bg-primary/7 rounded-[1.3rem] border p-4">
              <div className="text-primary text-[0.68rem] font-semibold tracking-[0.18em] uppercase">
                Weaknesses
              </div>
              <ul className="text-muted-foreground mt-3 space-y-2 text-sm leading-6">
                {stand.weaknesses.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="bg-primary mt-2 size-1.5 rounded-full" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <aside className="grid gap-4">
          <div className="bg-background/90 border-border rounded-[1.3rem] border p-4">
            <div className="text-muted-foreground text-[0.68rem] font-semibold tracking-[0.18em] uppercase">
              How to get
            </div>
            <ul className="text-muted-foreground mt-3 space-y-2 text-sm leading-6">
              {stand.howToGet.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="bg-primary mt-2 size-1.5 rounded-full" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-background/90 text-muted-foreground border-border rounded-[1.3rem] border p-4 text-sm leading-6">
            <div className="text-muted-foreground text-[0.68rem] font-semibold tracking-[0.18em] uppercase">
              Reading note
            </div>
            <p className="mt-3">
              Use the tier letter for the first pass, then read this card like a
              reroll decision. The useful question is whether the stand fits
              your route, grind, and actual skill level.
            </p>
            <p className="text-muted-foreground mt-2 text-xs tracking-[0.14em] uppercase">
              Built for real keep or skip decisions
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

export function StandsTierBoard() {
  const grouped = groupByTier();
  const [selectedKey, setSelectedKey] = useState(stands[0]?.key ?? '');
  const selectedStand =
    stands.find((stand) => stand.key === selectedKey) ?? stands[0];

  return (
    <div className="grid gap-8">
      <section className="border-border bg-card overflow-hidden rounded-[2rem] border shadow-lg">
        <div className="border-border border-b px-6 py-5">
          <div className="text-muted-foreground text-[0.72rem] tracking-[0.22em] uppercase">
            Stand tiers
          </div>
          <h1 className="text-foreground mt-2 font-serif text-4xl leading-none tracking-[-0.05em]">
            Bizarre Lineage tier list: click a stand to see whether it is worth
            your next grind.
          </h1>
          <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-7">
            Tier order follows the current chart. Selecting a stand opens a
            player-focused card below with obtainment notes, strengths,
            weaknesses, and a faster read on whether you should keep, chase, or
            skip it.
          </p>
        </div>

        <div className="overflow-x-auto p-4 md:p-6">
          <div className="border-border min-w-[920px] overflow-hidden rounded-[1.6rem] border">
            {grouped.map((group) => (
              <div
                key={group.tier}
                className={cn(
                  'grid grid-cols-[120px_repeat(5,minmax(0,1fr))]',
                  tierPalette[group.tier].row
                )}
              >
                <div
                  className={cn(
                    'border-border flex min-h-[110px] items-center justify-center border-r border-b text-4xl font-light tracking-[-0.05em]',
                    tierPalette[group.tier].label
                  )}
                >
                  {group.tier}
                </div>

                {Array.from({ length: 5 }).map((_, index) => {
                  const stand = group.entries[index];
                  if (!stand) {
                    return (
                      <div
                        key={`${group.tier}-empty-${index}`}
                        className="bg-secondary border-border min-h-[110px] border-r border-b"
                      />
                    );
                  }

                  const selected = stand.key === selectedKey;

                  return (
                    <button
                      key={stand.key}
                      type="button"
                      onClick={() => setSelectedKey(stand.key)}
                      className={cn(
                        'text-foreground border-border min-h-[110px] border-r border-b px-4 py-3 text-center text-xl leading-tight font-semibold tracking-[-0.04em] transition duration-200',
                        tierPalette[group.tier].cell,
                        selected && tierPalette[group.tier].selected
                      )}
                    >
                      {stand.name}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedStand ? <DetailCard stand={selectedStand} /> : null}
    </div>
  );
}
