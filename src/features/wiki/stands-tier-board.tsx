'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  getStandHref,
  getStands,
  type StandEntry,
  type StandTier,
} from '@/content-data/stands';
import { ArrowLeft, ArrowRight, Trophy, Zap, Shield, HelpCircle, AlertTriangle, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { Link } from '@/core/i18n/navigation';
import { toImageUrl } from '@/lib/r2-utils';
import { cn } from '@/shared/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from '@/shared/components/ui/sheet';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import AdsterraBanner from '@/shared/components/ads/adsterra_banner';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

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

function groupByTier(entries: StandEntry[]) {
  return tierOrder.map((tier) => ({
    tier,
    entries: entries.filter((stand) => stand.tier === tier),
  }));
}

const tierAccentClasses: Record<StandTier, string> = {
  S: 'from-amber-300 via-orange-400 to-red-500',
  A: 'from-cyan-300 via-sky-400 to-indigo-500',
  B: 'from-emerald-300 via-teal-400 to-cyan-500',
  C: 'from-slate-300 via-slate-400 to-slate-600',
  D: 'from-zinc-400 via-zinc-500 to-zinc-700',
};

function rolePillTone(value: string) {
  if (['Excellent', 'High', 'Strong'].includes(value)) {
    return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300';
  }
  if (['Good', 'Medium'].includes(value)) {
    return 'border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300';
  }
  return 'border-border bg-background/70 text-muted-foreground';
}

function getRoleSignals(stand: StandEntry) {
  const isS = stand.tier === 'S';
  const isA = stand.tier === 'A';
  
  const beginner = stand.bestFor.toLowerCase().includes('beginner') || stand.summary.toLowerCase().includes('new player')
    ? 'High' : (isS || isA ? 'Medium' : 'Low');
  const pve = stand.bestFor.toLowerCase().includes('pve') || stand.summary.toLowerCase().includes('farm')
    ? 'Strong' : (isS || isA ? 'Good' : 'Average');
  const pvp = stand.bestFor.toLowerCase().includes('pvp') || stand.summary.toLowerCase().includes('duel')
    ? 'Excellent' : (isS || isA ? 'Strong' : 'Average');

  return { pvp, pve, beginner };
}

function DetailCard({ stand, isInsideSheet }: { stand: StandEntry; isInsideSheet?: boolean }) {
  const t = useTranslations('pages.tier-list.page.sections.board');
  const imageUrl = toImageUrl(stand.imageUrl);
  const signals = getRoleSignals(stand);

  return (
    <div className={cn("flex flex-col gap-6", isInsideSheet ? "p-6" : "p-8")}>
      <section className="grid gap-6 lg:grid-cols-[1fr_16rem]">
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-6 shadow-sm">
            <div className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-to-r", tierAccentClasses[stand.tier])} />
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[0.65rem] font-bold tracking-widest uppercase text-primary">
                {stand.tier} {t('tier_suffix')}
              </span>
              <span className="rounded-full border border-border px-3 py-1 text-[0.65rem] font-bold tracking-widest uppercase text-muted-foreground">
                {stand.rarity}
              </span>
              <span className="rounded-full border border-border px-3 py-1 text-[0.65rem] font-bold tracking-widest uppercase text-muted-foreground">
                {stand.part}
              </span>
            </div>
            
            <h2 className="font-serif text-4xl tracking-tight text-foreground md:text-5xl">
              {stand.name}
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {stand.quickVerdict}
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { label: 'PvP', value: signals.pvp },
                { label: 'PvE', value: signals.pve },
                { label: 'Beginner', value: signals.beginner },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-border bg-background/50 p-3 text-center">
                  <p className="text-[0.6rem] tracking-[0.1em] uppercase text-muted-foreground mb-2">
                    {item.label}
                  </p>
                  <p className={cn("inline-flex rounded-full px-2 py-0.5 text-[0.7rem] font-bold", rolePillTone(item.value))}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400">
                <Trophy className="size-3" />
                {t('strengths_title')}
              </h3>
              <ul className="space-y-2">
                {stand.strengths.slice(0, 3).map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-muted-foreground leading-snug">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-red-600 dark:text-red-400">
                <AlertTriangle className="size-3" />
                {t('weaknesses_title')}
              </h3>
              <ul className="space-y-2">
                {stand.weaknesses.slice(0, 3).map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-muted-foreground leading-snug">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-red-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <aside className="relative aspect-square lg:aspect-auto overflow-hidden rounded-[2rem] border border-border bg-muted/30">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={stand.name}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground text-xs">
              No Image
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
             <p className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-white/70">
               Best For
             </p>
             <p className="mt-1 text-sm font-medium text-white">
               {stand.bestFor}
             </p>
          </div>
        </aside>
      </section>

      <section className="rounded-[1.6rem] border border-border bg-background/50 p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-primary">
              <Zap className="size-3" />
              {t('obtainment_title')}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {stand.howToGet[0]}
            </p>
          </div>
          
          <Link
            href={getStandHref(stand.key)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold tracking-widest text-primary-foreground uppercase transition-all hover:opacity-90 active:scale-95"
          >
            {t('cta')}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export function StandsTierBoard() {
  const t = useTranslations('pages.tier-list.page.sections.board');
  const locale = useLocale();
  const localizedStands = getStands(locale);
  const grouped = groupByTier(localizedStands);
  const [selectedKey, setSelectedKey] = useState('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Flattened list for navigation
  const allStands = grouped.flatMap((g) => g.entries);
  const selectedStand = allStands.find((stand) => stand.key === selectedKey);
  const currentIndex = allStands.findIndex((s) => s.key === selectedKey);

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + allStands.length) % allStands.length;
    setSelectedKey(allStands[prevIndex].key);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % allStands.length;
    setSelectedKey(allStands[nextIndex].key);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 py-8">
      <section className="text-center space-y-3 mb-10 px-4">
        <h1 className="text-foreground font-serif text-5xl md:text-6xl leading-[1.1] tracking-tight max-w-4xl mx-auto">
          {t('title')}
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          {t('description')}
        </p>
      </section>

      <div className="px-1 py-4">
        <AdsterraBanner />
      </div>

      <section className="space-y-4">
        <div className="flex justify-end px-4 sm:px-0">
          <Link
            href="/stands"
            className="group flex items-center gap-2 text-sm font-bold tracking-widest text-primary uppercase transition-colors hover:text-primary/80"
          >
            <Shield className="size-4" />
            {t('cta')}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div className="bg-card border-border overflow-hidden rounded-[3rem] border shadow-xl">
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
                            onClick={() => {
                              setSelectedKey(stand.key);
                              setIsSheetOpen(true);
                            }}
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
                      <span className="text-muted-foreground italic text-sm px-4">
                        {t('empty_tier')}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-full p-0 sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[1000px]">
          {selectedStand && (
            <div className="relative flex h-full flex-col">
              <VisuallyHidden.Root>
                <SheetTitle>{selectedStand.name}</SheetTitle>
                <SheetDescription>
                  Detailed information about {selectedStand.name}
                </SheetDescription>
              </VisuallyHidden.Root>
              {/* Custom Header with Navigation */}
              <div className="bg-background/80 flex items-center justify-between border-b px-6 py-4 backdrop-blur-md sticky top-0 z-50">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsSheetOpen(false)}
                    className="hover:bg-accent flex size-10 items-center justify-center rounded-full transition-colors"
                  >
                    <X className="size-5" />
                  </button>
                  <div className="flex flex-col">
                    <h3 className="text-lg font-bold tracking-tight">
                      {selectedStand.name}
                    </h3>
                    <Link
                      href={getStandHref(selectedStand.key)}
                      className="text-primary flex items-center gap-1 text-[0.7rem] font-bold tracking-widest uppercase hover:underline"
                    >
                      {t('cta')}
                      <ArrowRight className="size-3" />
                    </Link>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="hover:bg-accent flex size-10 items-center justify-center rounded-full transition-colors"
                  >
                    <ChevronLeft className="size-6" />
                  </button>
                  <span className="text-muted-foreground text-sm font-medium">
                    {currentIndex + 1} / {allStands.length}
                  </span>
                  <button
                    onClick={handleNext}
                    className="hover:bg-accent flex size-10 items-center justify-center rounded-full transition-colors"
                  >
                    <ChevronRight className="size-6" />
                  </button>
                </div>
              </div>

              <ScrollArea className="flex-1">
                <DetailCard stand={selectedStand} isInsideSheet />
                <div className="h-20" /> {/* Bottom spacing */}
              </ScrollArea>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
