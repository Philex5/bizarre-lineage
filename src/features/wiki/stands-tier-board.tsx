'use client';

import { useState } from 'react';
import { stands, type StandEntry, type StandTier } from '@/content-data/stands';
import { ArrowRight, Trophy, Zap, Shield, HelpCircle, AlertTriangle } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { cn } from '@/shared/lib/utils';

const tierOrder: StandTier[] = ['S', 'A', 'B', 'C', 'D'];

const tierPalette: Record<
  StandTier,
  { row: string; label: string; cell: string; selected: string; icon: any }
> = {
  S: {
    row: 'bg-primary/5',
    label: 'bg-primary text-primary-foreground',
    cell: 'bg-background hover:bg-primary/10 hover:scale-[1.02]',
    selected: 'ring-2 ring-primary bg-primary/15 scale-[1.05] z-10',
    icon: Trophy,
  },
  A: {
    row: 'bg-accent/5',
    label: 'bg-accent text-accent-foreground',
    cell: 'bg-background hover:bg-accent/10 hover:scale-[1.02]',
    selected: 'ring-2 ring-accent bg-accent/15 scale-[1.05] z-10',
    icon: Zap,
  },
  B: {
    row: 'bg-blue-500/5',
    label: 'bg-blue-500 text-white',
    cell: 'bg-background hover:bg-blue-500/10 hover:scale-[1.02]',
    selected: 'ring-2 ring-blue-500 bg-blue-500/15 scale-[1.05] z-10',
    icon: Shield,
  },
  C: {
    row: 'bg-muted/30',
    label: 'bg-muted-foreground text-background',
    cell: 'bg-background hover:bg-secondary hover:scale-[1.02]',
    selected: 'ring-2 ring-muted-foreground/30 bg-secondary scale-[1.05] z-10',
    icon: HelpCircle,
  },
  D: {
    row: 'bg-red-500/5',
    label: 'bg-red-500 text-white',
    cell: 'bg-background hover:bg-red-500/10 hover:scale-[1.02]',
    selected: 'ring-2 ring-red-500 bg-red-500/15 scale-[1.05] z-10',
    icon: AlertTriangle,
  },
};

function groupByTier() {
  return tierOrder.map((tier) => ({
    tier,
    entries: stands.filter((stand) => stand.tier === tier),
  }));
}

import Image from 'next/image';
import { toImageUrl } from '@/lib/r2-utils';

function DetailCard({ stand }: { stand: StandEntry }) {
  const imageUrl = toImageUrl(stand.imageUrl);
  return (
    <section className="border-border bg-card overflow-hidden rounded-[2.5rem] border shadow-2xl transition-all duration-300">
      <div className="text-primary-foreground relative bg-[linear-gradient(135deg,var(--color-primary),color-mix(in_oklab,var(--color-primary)_70%,var(--color-accent)),var(--color-accent))] px-8 py-10">
        {imageUrl && (
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={imageUrl}
              alt={stand.name}
              fill
              className="object-cover object-center opacity-25 grayscale brightness-50 contrast-125"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent" />
          </div>
        )}
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Trophy className="size-32" />
        </div>
        
        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-white/30 bg-white/20 px-4 py-1 text-[0.75rem] font-bold tracking-[0.2em] uppercase backdrop-blur-md">
            {stand.tier} tier
          </span>
          <span className="rounded-full border border-white/30 bg-white/20 px-4 py-1 text-[0.75rem] font-bold tracking-[0.2em] uppercase backdrop-blur-md">
            {stand.rarity}
          </span>
          <span className="rounded-full border border-white/30 bg-white/20 px-4 py-1 text-[0.75rem] font-bold tracking-[0.2em] uppercase backdrop-blur-md">
            {stand.part}
          </span>
        </div>
        
        <div className="relative z-10 mt-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="font-serif text-5xl leading-tight tracking-tight text-white md:text-6xl">
              {stand.name}
            </h2>
            <p className="mt-4 text-lg font-medium tracking-wide text-white/80 uppercase italic">
              Best for: {stand.bestFor}
            </p>
          </div>
          <Link
            href={`/stands#${stand.key}`}
            className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-[0.85rem] font-bold tracking-widest text-primary uppercase transition-all hover:bg-opacity-90 hover:shadow-xl active:scale-95"
          >
            Stand Database
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <div className="grid gap-10 p-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-10">
          <div>
            <h3 className="text-foreground mb-4 text-xl font-bold tracking-tight">Verdict</h3>
            <p className="text-muted-foreground text-lg leading-relaxed italic">
              "{stand.quickVerdict}"
            </p>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed">
              {stand.summary}
            </p>
          </div>

          <div>
            <h3 className="text-foreground mb-6 text-xl font-bold tracking-tight">Core Abilities</h3>
            <div className="grid gap-4 md:grid-cols-3">
              {stand.abilities.map((ability) => (
                <div
                  key={ability.title}
                  className="bg-secondary/50 border-border group rounded-3xl border p-6 transition-colors hover:bg-secondary"
                >
                  <div className="text-primary text-sm font-bold tracking-wider uppercase mb-3">
                    {ability.title}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {ability.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="border-emerald-500/20 bg-emerald-500/5 rounded-3xl border p-6">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-bold tracking-widest uppercase mb-4">
                <Trophy className="size-4" />
                Strengths
              </div>
              <ul className="space-y-3">
                {stand.strengths.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="bg-emerald-500 mt-2 size-1.5 shrink-0 rounded-full" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-red-500/20 bg-red-500/5 rounded-3xl border p-6">
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm font-bold tracking-widest uppercase mb-4">
                <AlertTriangle className="size-4" />
                Weaknesses
              </div>
              <ul className="space-y-3">
                {stand.weaknesses.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="bg-red-500 mt-2 size-1.5 shrink-0 rounded-full" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="bg-primary/5 border-primary/20 rounded-3xl border p-6">
            <h3 className="text-primary flex items-center gap-2 text-sm font-bold tracking-widest uppercase mb-4">
              <Zap className="size-4" />
              Obtainment Guide
            </h3>
            <ul className="space-y-4">
              {stand.howToGet.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <div className="bg-primary mt-1.5 size-2 shrink-0 rounded-full" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-muted/50 border-border rounded-3xl border p-6">
            <h3 className="text-muted-foreground flex items-center gap-2 text-sm font-bold tracking-widest uppercase mb-4">
              <HelpCircle className="size-4" />
              Pro Tip
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed italic">
              "When deciding whether to keep or skip {stand.name}, consider your current Prestige level and Conjuring stat. This stand peaks at high Conjuring where its true potential is unlocked."
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
    <div className="max-w-7xl mx-auto space-y-12 py-12">
      <section className="text-center space-y-4 mb-16 px-4">
        <h2 className="text-primary font-bold tracking-[0.3em] uppercase text-sm">Community Rankings</h2>
        <h1 className="text-foreground font-serif text-5xl md:text-7xl leading-[1.1] tracking-tight max-w-4xl mx-auto">
          Bizarre Lineage Stand Tier List
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          The ultimate guide to every Stand in the game. Updated for March 2026 based on community meta research.
        </p>
      </section>

      <section className="bg-card border-border overflow-hidden rounded-[3rem] border shadow-xl">
        <div className="grid divide-y divide-border">
          {grouped.map((group) => {
            const TierIcon = tierPalette[group.tier].icon;
            return (
              <div
                key={group.tier}
                className={cn(
                  'flex flex-col md:flex-row min-h-[140px]',
                  tierPalette[group.tier].row
                )}
              >
                <div
                  className={cn(
                    'flex flex-col items-center justify-center gap-2 px-8 py-8 md:w-32 md:shrink-0',
                    tierPalette[group.tier].label
                  )}
                >
                  <TierIcon className="size-8" />
                  <span className="text-4xl font-black tracking-tighter">{group.tier}</span>
                </div>

                <div className="flex-1 p-6 flex flex-wrap gap-4 items-center">
                  {group.entries.length > 0 ? (
                    group.entries.map((stand) => {
                      const selected = stand.key === selectedKey;
                      return (
                        <button
                          key={stand.key}
                          type="button"
                          onClick={() => setSelectedKey(stand.key)}
                          className={cn(
                            'relative h-20 min-w-[140px] px-6 rounded-2xl border-border border flex items-center justify-center text-center font-bold tracking-tight transition-all duration-300 shadow-sm',
                            tierPalette[group.tier].cell,
                            selected && tierPalette[group.tier].selected,
                            selected ? 'text-foreground' : 'text-muted-foreground'
                          )}
                        >
                          <span className="text-lg">{stand.name}</span>
                          {selected && (
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full" />
                          )}
                        </button>
                      );
                    })
                  ) : (
                    <span className="text-muted-foreground italic text-sm px-4">No stands in this tier</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {selectedStand ? (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          <DetailCard stand={selectedStand} />
        </div>
      ) : null}
    </div>
  );
}
