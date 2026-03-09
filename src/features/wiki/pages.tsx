import { type ReactNode } from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import {
  activeCodes,
  codeFailureReasons,
  expiredCodes,
  redeemSteps,
} from '@/content-data/codes';
import {
  beginnerGuide,
  prestigeGuide,
  statsGuide,
} from '@/content-data/guides';
import {
  homeFaq,
  officialLinks,
  placeholderImages,
  siteName,
} from '@/content-data/site';
import { stands, type StandEntry } from '@/content-data/stands';
import {
  bestForCards,
  tierListEntries,
  tierMethodology,
} from '@/content-data/tier-list';
import { toImageUrl } from '@/lib/r2-utils';
import {
  ArrowUpRight,
  Castle,
  Flame,
  Swords,
  Ticket,
  Trophy,
  WandSparkles,
} from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { SiDiscord, SiRoblox, SiTrello } from 'react-icons/si';

import { Link } from '@/core/i18n/navigation';
import { envConfigs } from '@/config';
import { Crumb } from '@/shared/blocks/common/crumb';
import { Button } from '@/shared/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import { cn } from '@/shared/lib/utils';

import { HomeCodeCopyButton } from './home-code-copy-button';
import {
  AsidePanel,
  CardGrid,
  FaqGrid,
  GuideCard,
  HeroActions,
  HeroFrame,
  OrderedChecklist,
  PageShell,
  SectionFrame,
  SplitNotes,
} from './primitives';
import { StandsTierBoard } from './stands-tier-board';

type MetadataInput = {
  locale: string;
  path: string;
  title: string;
  description: string;
};

function canonicalUrl(locale: string, path: string) {
  const normalized = path === '/' ? '' : path;
  return locale !== envConfigs.locale
    ? `${envConfigs.app_url}/${locale}${normalized}`
    : `${envConfigs.app_url}${normalized}`;
}

export function buildMetadata(input: MetadataInput): Metadata {
  const canonical = canonicalUrl(input.locale, input.path);
  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: 'website',
      url: canonical,
      siteName,
      title: input.title,
      description: input.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
    },
  };
}

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function StandSummaryCard({ stand }: { stand: StandEntry }) {
  const imageUrl = toImageUrl(stand.imageUrl);

  const tierClasses: Record<string, string> = {
    S: 'bg-gradient-to-br from-amber-400 to-orange-600 text-white border-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.6)] animate-pulse',
    A: 'bg-gradient-to-br from-violet-500 to-purple-700 text-white border-violet-400 shadow-md',
    B: 'bg-gradient-to-br from-blue-500 to-indigo-700 text-white border-blue-400',
    C: 'bg-gradient-to-br from-slate-400 to-slate-600 text-white border-slate-300',
    D: 'bg-gradient-to-br from-zinc-600 to-zinc-800 text-zinc-300 border-zinc-500',
  };

  const content = (
    <article className="bg-background/92 border-border group relative overflow-hidden rounded-[1.6rem] border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      {imageUrl && (
        <div className="absolute inset-0 opacity-10 transition-opacity group-hover:opacity-20">
          <Image
            src={imageUrl}
            alt={stand.name}
            fill
            className="object-cover object-center grayscale"
          />
          <div className="from-background via-background/80 absolute inset-0 bg-gradient-to-t to-transparent" />
        </div>
      )}
      <div
        className={cn(
          'font-anime absolute top-0 right-0 z-20 origin-top-right rounded-bl-2xl border-b border-l px-5 pt-5 pb-1 text-xl font-normal tracking-wider uppercase shadow-lg transition-transform group-hover:scale-110',
          tierClasses[stand.tier] || 'bg-primary text-primary-foreground'
        )}
      >
        {stand.tier}
      </div>
      <div className="relative z-10">
        <div className="pr-10">
          <h3 className="text-foreground text-2xl font-semibold tracking-[-0.04em]">
            {stand.name}
          </h3>
          <p className="text-muted-foreground mt-2 text-[0.76rem] font-medium tracking-[0.16em] uppercase">
            {stand.rarity} · {stand.part}
          </p>
        </div>
        <p className="text-primary mt-4 text-sm font-medium tracking-[0.12em] uppercase">
          {stand.bestFor}
        </p>
        <p className="text-muted-foreground mt-3 text-sm leading-7">
          {stand.quickVerdict}
        </p>
      </div>
    </article>
  );

  return (
    <Link id={stand.key} href={`/stands#${stand.key}`} className="block">
      {content}
    </Link>
  );
}

function HomeGuideStripCard({
  guide,
}: {
  guide: {
    title: string;
    href: string;
  };
}) {
  return (
    <Link
      href={guide.href}
      className="bg-background/95 border-border text-foreground group hover:border-primary/40 hover:text-primary inline-flex min-h-14 items-center rounded-full border px-5 py-3 text-sm font-medium tracking-[-0.02em] shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      <span className="truncate">{guide.title}</span>
    </Link>
  );
}

function HomeQuickAccessCard({
  title,
  href,
  icon,
}: {
  title: string;
  href: string;
  icon: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="border-border bg-background/70 hover:border-primary/35 hover:bg-background/92 group flex min-h-24 flex-col justify-between rounded-[1.25rem] border p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      <span className="text-primary/90 flex size-10 items-center justify-center rounded-2xl bg-white/6 text-lg shadow-inner ring-1 ring-white/8 transition-transform duration-300 group-hover:scale-105">
        {icon}
      </span>
      <span className="text-foreground text-sm font-semibold tracking-[-0.02em]">
        {title}
      </span>
    </Link>
  );
}

export async function HomePage() {
  const t = await getTranslations('pages.index');
  const featuredStands = stands.slice(0, 3);
  const featuredCodes = activeCodes.slice(0, 3);
  const heroQuickAccessItems = [
    {
      title: 'Tier List',
      href: '/tier-list',
      icon: <Trophy className="size-5" />,
    },
    {
      title: 'Stands',
      href: '/stands',
      icon: <WandSparkles className="size-5" />,
    },
    {
      title: 'Beginner Guide',
      href: '/guides/beginner-guide',
      icon: <ArrowUpRight className="size-5" />,
    },
    {
      title: 'Raids',
      href: '/terms/raid',
      icon: <Castle className="size-5" />,
    },
    {
      title: 'Events',
      href: '/events',
      icon: <Ticket className="size-5" />,
    },
    {
      title: 'Fighting Styles',
      href: '/terms/fighting-styles',
      icon: <Swords className="size-5" />,
    },
    {
      title: 'Sub-Abilities',
      href: '/terms/sub-abilities',
      icon: <Flame className="size-5" />,
    },
  ] as const;
  const officialLinkCards = [
    {
      ...officialLinks[0],
      title: 'Roblox',
      icon: SiRoblox,
    },
    {
      ...officialLinks[1],
      title: 'Discord',
      icon: SiDiscord,
    },
    {
      ...officialLinks[2],
      title: 'Trello',
      icon: SiTrello,
    },
  ] as const;
  const homeGuideCards = [
    {
      title: 'Bizarre Lineage beginner guide',
      href: '/guides/beginner-guide',
    },
    {
      title: 'Bizarre Lineage stats guide',
      href: '/guides/stats',
    },
    {
      title: 'When to prestige in Bizarre Lineage',
      href: '/guides/prestige',
    },
    {
      title: 'Bizarre Lineage codes guide',
      href: '/codes',
    },
    {
      title: 'Bizarre Lineage tier list',
      href: '/tier-list',
    },
    {
      title: 'Bizarre Lineage stands guide',
      href: '/stands',
    },
  ] as const;
  const progressionSteps = [
    {
      title: t('page.sections.progression.steps.0.title'),
      description: t('page.sections.progression.steps.0.description'),
      meta: t('page.sections.progression.steps.0.meta'),
      href: '/guides/beginner-guide',
      hrefLabel: t('page.sections.progression.steps.0.hrefLabel'),
    },
    {
      title: t('page.sections.progression.steps.1.title'),
      description: t('page.sections.progression.steps.1.description'),
      meta: t('page.sections.progression.steps.1.meta'),
      href: '/guides/stats',
      hrefLabel: t('page.sections.progression.steps.1.hrefLabel'),
    },
    {
      title: t('page.sections.progression.steps.2.title'),
      description: t('page.sections.progression.steps.2.description'),
      meta: t('page.sections.progression.steps.2.meta'),
      href: '/terms/raid',
      hrefLabel: t('page.sections.progression.steps.2.hrefLabel'),
    },
    {
      title: t('page.sections.progression.steps.3.title'),
      description: t('page.sections.progression.steps.3.description'),
      meta: t('page.sections.progression.steps.3.meta'),
      href: '/terms/awakening',
      hrefLabel: t('page.sections.progression.steps.3.hrefLabel'),
    },
    {
      title: t('page.sections.progression.steps.4.title'),
      description: t('page.sections.progression.steps.4.description'),
      meta: t('page.sections.progression.steps.4.meta'),
      href: '/guides/prestige',
      hrefLabel: t('page.sections.progression.steps.4.hrefLabel'),
    },
  ];
  const homeFaqSchema = [
    {
      '@type': 'Question',
      name: 'What is Bizarre Lineage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: homeFaq[0]?.answer,
      },
    },
    {
      '@type': 'Question',
      name: 'Does Bizarre Lineage have codes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: homeFaq[3]?.answer,
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best stand for beginners?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: t('page.sections.faq.items.0.answer'),
      },
    },
    {
      '@type': 'Question',
      name: 'When should you prestige?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: t('page.sections.faq.items.1.answer'),
      },
    },
  ];

  return (
    <PageShell accent="gold">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: siteName,
          url: envConfigs.app_url,
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: homeFaqSchema,
        }}
      />

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_23rem] lg:items-start">
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-[2.2rem]">
            <div className="absolute inset-0">
              <Image
                src={placeholderImages.hero}
                alt="Bizarre Lineage hero key art placeholder"
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_oklab,var(--color-foreground)_92%,black)_0%,color-mix(in_oklab,var(--color-foreground)_84%,transparent)_34%,color-mix(in_oklab,var(--color-foreground)_56%,transparent)_62%,color-mix(in_oklab,var(--color-foreground)_84%,black)_100%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,black_18%,transparent)_0%,transparent_20%,color-mix(in_oklab,black_44%,transparent)_100%)]" />
            </div>
            <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-primary)_20%,transparent),transparent)]" />

            <div className="relative flex min-h-[68vh] items-end px-6 py-10 md:px-10 md:py-14 lg:px-14 lg:py-18">
              <div className="max-w-2xl">
                <div className="mb-5 inline-flex rounded-full border border-white/18 bg-black/18 px-3 py-1 text-[0.68rem] tracking-[0.24em] text-white uppercase backdrop-blur-sm">
                  {t('page.sections.hero.eyebrow')}
                </div>
                <h1 className="font-serif text-4xl leading-[0.9] tracking-[-0.05em] text-balance text-white sm:text-5xl lg:text-7xl">
                  {t('page.sections.hero.title')}
                </h1>
                <p className="mt-5 max-w-xl text-base leading-7 text-white/82 md:text-lg">
                  {t('page.sections.hero.dek')}
                </p>
              </div>
            </div>
          </div>

          <div className="border-border bg-card/94 relative overflow-hidden rounded-[2rem] border p-6 shadow-lg backdrop-blur-sm md:p-7">
            <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--color-primary),var(--color-accent),var(--color-primary))] opacity-90" />
            <div className="relative">
              <h2 className="text-foreground text-center font-serif text-2xl leading-none tracking-[-0.04em] md:text-3xl">
                Official Bizarre Lineage links
              </h2>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {officialLinkCards.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="border-border bg-background/80 hover:border-primary/35 hover:bg-background flex min-h-32 flex-col items-center justify-center rounded-[1.5rem] border p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                    >
                      <span className="text-primary mb-4 flex size-12 items-center justify-center rounded-2xl bg-white/6 text-2xl ring-1 ring-white/8">
                        <Icon />
                      </span>
                      <div className="text-foreground text-lg font-semibold tracking-[-0.03em]">
                        {item.title}
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <aside className="border-border bg-card/96 relative overflow-hidden rounded-[2rem] border p-5 shadow-lg backdrop-blur-sm lg:self-start">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-primary)_8%,transparent)_0%,transparent_24%),linear-gradient(color-mix(in_oklab,var(--color-foreground)_5%,transparent)_1px,transparent_1px)] bg-[length:100%_100%,18px_18px]" />
          <div className="relative space-y-6">
            <div>
              <div className="text-muted-foreground text-[0.68rem] tracking-[0.24em] uppercase">
                Quick Access
              </div>
              <h2 className="mt-3 font-serif text-3xl leading-none tracking-[-0.04em]">
                Bizarre Lineage Navigation
              </h2>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {heroQuickAccessItems.map((item) => (
                  <HomeQuickAccessCard
                    key={item.href}
                    title={item.title}
                    href={item.href}
                    icon={item.icon}
                  />
                ))}
              </div>
            </div>

            <div className="border-border border-t pt-6">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <div className="text-muted-foreground text-[0.68rem] tracking-[0.24em] uppercase">
                    Latest Codes
                  </div>
                  <h2 className="mt-3 font-serif text-3xl leading-none tracking-[-0.04em]">
                    Active Codes
                  </h2>
                </div>
                <div className="text-muted-foreground text-right text-xs leading-5">
                  Verified
                  <br />
                  2026-03-09
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {featuredCodes.map((code) => (
                  <div
                    key={code.code}
                    className="bg-background/85 border-border rounded-[1.35rem] border p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-foreground font-mono text-sm font-semibold">
                          {code.code}
                        </div>
                        <p className="text-muted-foreground mt-2 text-sm leading-6">
                          {code.reward}
                        </p>
                      </div>
                      <HomeCodeCopyButton code={code.code} />
                    </div>
                  </div>
                ))}
              </div>

              <Button asChild className="mt-4 w-full rounded-xl">
                <Link href="/codes">View More Codes</Link>
              </Button>
            </div>
          </div>
        </aside>
      </section>

      <SectionFrame
        eyebrow={t('page.sections.world.eyebrow')}
        title={t('page.sections.world.title')}
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,34rem)] lg:items-center lg:gap-10">
          <div className="space-y-5">
            <p className="text-muted-foreground max-w-2xl text-sm leading-7 md:text-base">
              {t('page.sections.world.description')}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="rounded-full">
                <Link href="/stands">
                  {t('page.sections.world.buttons.explore_stands')}
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/guides/beginner-guide">
                  {t('page.sections.world.buttons.master_basics')}
                </Link>
              </Button>
            </div>
          </div>

          <div className="border-border bg-background/70 relative overflow-hidden rounded-[1.8rem] border shadow-md">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,color-mix(in_oklab,var(--color-primary)_14%,transparent)_0,transparent_38%),linear-gradient(180deg,transparent_0%,color-mix(in_oklab,var(--color-foreground)_10%,transparent)_100%)]" />
            <div className="relative aspect-[16/9]">
              <Image
                src="/placeholders/introduction.webp"
                alt="Bizarre Lineage Map and Introduction"
                fill
                sizes="(min-width: 1024px) 34rem, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </SectionFrame>
      <SectionFrame
        eyebrow={t('page.sections.progression.eyebrow')}
        title={t('page.sections.progression.title')}
        description={t('page.sections.progression.description')}
      >
        <OrderedChecklist items={progressionSteps} />
      </SectionFrame>

      <SectionFrame
        eyebrow={t('page.sections.meta_preview.eyebrow')}
        title={t('page.sections.meta_preview.title')}
        description={t('page.sections.meta_preview.description')}
      >
        <div className="grid gap-4">
          <div className="flex items-end justify-between gap-4">
            <p className="text-muted-foreground max-w-3xl text-sm leading-7 md:text-base">
              {t('page.sections.meta_preview.subtitle')}
            </p>
            <Link
              href="/tier-list"
              className="text-muted-foreground hover:text-foreground border-border bg-background/92 inline-flex shrink-0 items-center gap-2 self-end rounded-full border px-3 py-2 text-xs font-medium tracking-[0.16em] uppercase transition-colors"
            >
              <Trophy className="size-4" />
              {t('page.sections.meta_preview.tier_list_link')}
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredStands.map((stand) => (
              <StandSummaryCard key={stand.key} stand={stand} />
            ))}
          </div>
          <div className="flex justify-end">
            <Link
              href="/stands"
              className="text-primary hover:text-primary/80 inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline"
            >
              {t('page.sections.meta_preview.all_stands_link')}
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame
        eyebrow={t('page.sections.start_here.eyebrow')}
        title={t('page.sections.start_here.title')}
        description={t('page.sections.start_here.description')}
      >
        <div className="space-y-6">
          <div className="flex flex-wrap gap-3 md:gap-4">
            {homeGuideCards.map((guide) => (
              <HomeGuideStripCard key={guide.href} guide={guide} />
            ))}
          </div>
          <div className="flex justify-end">
            <Link
              href="/guides"
              className="text-primary hover:text-primary/80 inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline"
            >
              {t('page.sections.start_here.all_guides_link')}
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame
        eyebrow={t('page.sections.faq.eyebrow')}
        title={t('page.sections.faq.title')}
        description={t('page.sections.faq.description')}
      >
        <FaqGrid
          items={[
            homeFaq[0],
            homeFaq[3],
            {
              question: t('page.sections.faq.items.0.question'),
              answer: t('page.sections.faq.items.0.answer'),
            },
            {
              question: t('page.sections.faq.items.1.question'),
              answer: t('page.sections.faq.items.1.answer'),
            },
            {
              question: t('page.sections.faq.items.2.question'),
              answer: t('page.sections.faq.items.2.answer'),
            },
            {
              question: t('page.sections.faq.items.3.question'),
              answer: t('page.sections.faq.items.3.answer'),
            },
            {
              question: t('page.sections.faq.items.4.question'),
              answer: t('page.sections.faq.items.4.answer'),
            },
            {
              question: t('page.sections.faq.items.5.question'),
              answer: t('page.sections.faq.items.5.answer'),
            },
            {
              question: t('page.sections.faq.items.6.question'),
              answer: t('page.sections.faq.items.6.answer'),
            },
          ]}
        />
      </SectionFrame>
    </PageShell>
  );
}

export async function CodesPage() {
  const t = await getTranslations('pages.codes');
  return (
    <PageShell accent="ember">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: t.raw('page.sections.faq.items').map((item: any) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }}
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.95fr)]">
        <SectionFrame
          eyebrow={t('page.sections.hero.eyebrow')}
          title={t('page.sections.hero.title')}
          description={t('page.sections.hero.description')}
        >
          <OrderedChecklist
            items={[
              {
                title: 'Open with the active table',
                description:
                  'Players looking for rewards should see usable codes before any supporting content.',
              },
              {
                title: 'Treat monitor labels as a live caution',
                description:
                  'A monitor status means the entry still deserves another in-game pass after a patch, reset, or event rollover.',
              },
              {
                title: 'Use the archive for context only',
                description:
                  'Expired rows help explain old community references, but they should never lead the page.',
              },
            ]}
          />
        </SectionFrame>

        <SectionFrame
          eyebrow={t('page.sections.notes.eyebrow')}
          title={t('page.sections.notes.title')}
        >
          <CardGrid
            columns={2}
            items={[
              {
                title: t('page.sections.notes.items.last_verified.title'),
                meta: t('page.sections.notes.items.last_verified.meta'),
                description: '2026-03-08',
              },
              {
                title: t('page.sections.notes.items.tracked_active.title'),
                meta: t('page.sections.notes.items.tracked_active.meta'),
                description: String(activeCodes.length),
              },
              {
                title: t('page.sections.notes.items.best_next_move.title'),
                meta: t('page.sections.notes.items.best_next_move.meta'),
                description: t(
                  'page.sections.notes.items.best_next_move.description'
                ),
              },
            ]}
          />
        </SectionFrame>
      </div>

      <SectionFrame
        id="active-codes"
        eyebrow={t('page.sections.active.eyebrow')}
        title={t('page.sections.active.title')}
        description={t('page.sections.active.description')}
      >
        <div className="border-foreground/10 bg-background/75 overflow-hidden rounded-[1.6rem] border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-4">
                  {t('page.sections.active.table.code')}
                </TableHead>
                <TableHead>{t('page.sections.active.table.reward')}</TableHead>
                <TableHead>{t('page.sections.active.table.status')}</TableHead>
                <TableHead className="px-4">
                  {t('page.sections.active.table.last_verified')}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeCodes.map((row) => (
                <TableRow key={row.code}>
                  <TableCell className="px-4 font-mono text-xs">
                    {row.code}
                  </TableCell>
                  <TableCell>{row.reward}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell className="px-4">{row.lastVerified}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </SectionFrame>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionFrame
          eyebrow={t('page.sections.redeem.eyebrow')}
          title={t('page.sections.redeem.title')}
        >
          <OrderedChecklist items={[...redeemSteps]} />
        </SectionFrame>

        <SectionFrame
          eyebrow={t('page.sections.expired.eyebrow')}
          title={t('page.sections.expired.title')}
        >
          <div className="border-foreground/10 bg-background/75 overflow-hidden rounded-[1.6rem] border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-4">
                    {t('page.sections.expired.table.code')}
                  </TableHead>
                  <TableHead>
                    {t('page.sections.expired.table.reward')}
                  </TableHead>
                  <TableHead>
                    {t('page.sections.expired.table.status')}
                  </TableHead>
                  <TableHead className="px-4">
                    {t('page.sections.expired.table.archive_note')}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expiredCodes.map((row) => (
                  <TableRow key={row.code}>
                    <TableCell className="px-4 font-mono text-xs">
                      {row.code}
                    </TableCell>
                    <TableCell>{row.reward}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell className="px-4">{row.lastVerified}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </SectionFrame>
      </div>

      <SectionFrame
        eyebrow={t('page.sections.troubleshooting.eyebrow')}
        title={t('page.sections.troubleshooting.title')}
      >
        <CardGrid columns={3} items={[...codeFailureReasons]} />
      </SectionFrame>

      <SectionFrame
        eyebrow={t('page.sections.related.eyebrow')}
        title={t('page.sections.related.title')}
      >
        <CardGrid
          columns={2}
          items={[
            {
              title: t('page.sections.related.items.tier_list.title'),
              description: t(
                'page.sections.related.items.tier_list.description'
              ),
              href: '/tier-list',
            },
            {
              title: t('page.sections.related.items.beginner_guide.title'),
              description: t(
                'page.sections.related.items.beginner_guide.description'
              ),
              href: '/guides/beginner-guide',
            },
          ]}
        />
      </SectionFrame>

      <SectionFrame
        eyebrow={t('page.sections.faq.eyebrow')}
        title={t('page.sections.faq.title')}
        description={t('page.sections.faq.description')}
      >
        <FaqGrid items={t.raw('page.sections.faq.items')} />
      </SectionFrame>

      <SectionFrame
        eyebrow={t('page.sections.cta.eyebrow')}
        title={t('page.sections.cta.title')}
        description={t('page.sections.cta.description')}
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Link
            href="/tier-list"
            className="bg-background/92 text-foreground border-border rounded-[1.5rem] border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="text-muted-foreground text-[0.7rem] tracking-[0.2em] uppercase">
              {t('page.sections.cta.items.tier_list.eyebrow')}
            </div>
            <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em]">
              {t('page.sections.cta.items.tier_list.title')}
            </h3>
            <p className="text-muted-foreground mt-3 text-sm leading-7">
              {t('page.sections.cta.items.tier_list.description')}
            </p>
          </Link>

          <Link
            href="/guides/beginner-guide"
            className="bg-background/92 text-foreground border-border rounded-[1.5rem] border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="text-muted-foreground text-[0.7rem] tracking-[0.2em] uppercase">
              {t('page.sections.cta.items.beginner_guide.eyebrow')}
            </div>
            <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em]">
              {t('page.sections.cta.items.beginner_guide.title')}
            </h3>
            <p className="text-muted-foreground mt-3 text-sm leading-7">
              {t('page.sections.cta.items.beginner_guide.description')}
            </p>
          </Link>

          <Link
            href="/stands"
            className="bg-background/92 text-foreground border-border rounded-[1.5rem] border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="text-muted-foreground text-[0.7rem] tracking-[0.2em] uppercase">
              {t('page.sections.cta.items.stand_index.eyebrow')}
            </div>
            <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em]">
              {t('page.sections.cta.items.stand_index.title')}
            </h3>
            <p className="text-muted-foreground mt-3 text-sm leading-7">
              {t('page.sections.cta.items.stand_index.description')}
            </p>
          </Link>
        </div>
      </SectionFrame>
    </PageShell>
  );
}

export async function TierListPage() {
  const t = await getTranslations('pages.tier-list');
  return (
    <PageShell accent="violet">
      <StandsTierBoard />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <SectionFrame
          eyebrow={t('page.sections.representative.eyebrow')}
          title={t('page.sections.representative.title')}
        >
          <CardGrid
            columns={2}
            items={tierListEntries.map((entry) => ({
              title: entry.name,
              meta: `${entry.tier} ${t('page.sections.representative.tier_suffix')}`,
              description: entry.summary,
              href: `/stands#${entry.key}`,
            }))}
          />
        </SectionFrame>

        <SectionFrame
          eyebrow={t('page.sections.methodology.eyebrow')}
          title={t('page.sections.methodology.title')}
        >
          <OrderedChecklist items={[...tierMethodology]} />
        </SectionFrame>
      </div>

      <SectionFrame
        eyebrow={t('page.sections.role_picks.eyebrow')}
        title={t('page.sections.role_picks.title')}
      >
        <CardGrid columns={3} items={[...bestForCards]} />
      </SectionFrame>

      <SectionFrame
        eyebrow={t('page.sections.faq.eyebrow')}
        title={t('page.sections.faq.title')}
      >
        <FaqGrid items={t.raw('page.sections.faq.items')} />
      </SectionFrame>
    </PageShell>
  );
}

export async function GuidesHubPage() {
  const t = await getTranslations('pages.guides');
  return (
    <PageShell accent="jade">
      <div className="px-1 pt-2">
        <Crumb
          items={[
            { title: 'Home', url: '/' },
            { title: 'Guides', url: '/guides', is_active: true },
          ]}
        />
      </div>
      <SectionFrame
        eyebrow={t('page.sections.directory.eyebrow')}
        title={t('page.sections.directory.title')}
        description={t('page.sections.directory.description')}
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <GuideCard
            title={t('page.sections.directory.items.beginner.title')}
            meta={t('page.sections.directory.items.beginner.meta')}
            description={t(
              'page.sections.directory.items.beginner.description'
            )}
            href="/guides/beginner-guide"
          />
          <GuideCard
            title={t('page.sections.directory.items.stats.title')}
            meta={t('page.sections.directory.items.stats.meta')}
            description={t('page.sections.directory.items.stats.description')}
            href="/guides/stats"
          />
          <GuideCard
            title={t('page.sections.directory.items.prestige.title')}
            meta={t('page.sections.directory.items.prestige.meta')}
            description={t(
              'page.sections.directory.items.prestige.description'
            )}
            href="/guides/prestige"
          />
          <GuideCard
            title={t('page.sections.directory.items.codes.title')}
            meta={t('page.sections.directory.items.codes.meta')}
            description={t('page.sections.directory.items.codes.description')}
            href="/codes"
          />
        </div>
      </SectionFrame>

      <SectionFrame
        eyebrow={t('page.sections.faq.eyebrow')}
        title={t('page.sections.faq.title')}
      >
        <FaqGrid items={t.raw('page.sections.faq.items')} />
      </SectionFrame>
    </PageShell>
  );
}

export async function BeginnerGuidePage() {
  const t = await getTranslations('pages.guides.beginner-guide');
  return (
    <PageShell accent="jade">
      <HeroFrame
        eyebrow={t('page.sections.hero.eyebrow')}
        title={t('page.sections.hero.title')}
        dek={t('page.sections.hero.description')}
        stats={[
          {
            label: t('page.sections.hero.stats.audience'),
            value: t('page.sections.hero.stats.audience_value'),
          },
          {
            label: t('page.sections.hero.stats.reading_mode'),
            value: t('page.sections.hero.stats.reading_mode_value'),
          },
          {
            label: t('page.sections.hero.stats.reading_time'),
            value: beginnerGuide.readingTime,
          },
          {
            label: t('page.sections.hero.stats.updated'),
            value: beginnerGuide.updatedAt,
          },
        ]}
        actions={
          <HeroActions
            primary={{
              href: '/codes',
              label: t('page.sections.hero.actions.primary'),
            }}
            secondary={{
              href: '/tier-list',
              label: t('page.sections.hero.actions.secondary'),
            }}
          />
        }
        backgroundImageSrc={placeholderImages.guide}
        backgroundImageAlt="Beginner guide placeholder visual"
        mediaLabel={t('page.sections.hero.media_label')}
        aside={
          <AsidePanel
            title={t('page.sections.hero.aside.title')}
            description={t('page.sections.hero.aside.description')}
            items={t.raw('page.sections.hero.aside.items')}
          />
        }
      />

      <SectionFrame
        eyebrow={t('page.sections.checklist.eyebrow')}
        title={t('page.sections.checklist.title')}
      >
        <OrderedChecklist items={[...beginnerGuide.checklist]} />
      </SectionFrame>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionFrame
          eyebrow={t('page.sections.first_30.eyebrow')}
          title={t('page.sections.first_30.title')}
        >
          <CardGrid columns={2} items={[...beginnerGuide.firstThirtyMinutes]} />
        </SectionFrame>

        <SectionFrame
          eyebrow={t('page.sections.mistakes.eyebrow')}
          title={t('page.sections.mistakes.title')}
        >
          <CardGrid columns={2} items={[...beginnerGuide.mistakes]} />
        </SectionFrame>
      </div>

      <SectionFrame
        eyebrow={t('page.sections.progression.eyebrow')}
        title={t('page.sections.progression.title')}
      >
        <OrderedChecklist items={[...beginnerGuide.goals]} />
      </SectionFrame>

      <SectionFrame
        eyebrow="FAQ"
        title="Questions the beginner page should settle."
      >
        <FaqGrid items={[...beginnerGuide.faq]} />
      </SectionFrame>
    </PageShell>
  );
}

export function StatsGuidePage() {
  return (
    <PageShell accent="jade">
      <HeroFrame
        eyebrow="Stats guide"
        title="Stats should support your route, not trap you in fake precision."
        dek={statsGuide.overview}
        stats={[
          { label: 'Focus', value: 'Allocation logic' },
          { label: 'Modes', value: 'PvP + PvE' },
          { label: 'Updated', value: statsGuide.updatedAt },
        ]}
        actions={
          <HeroActions
            primary={{ href: '/tier-list', label: 'Compare stand roles' }}
            secondary={{ href: '/guides/prestige', label: 'Plan prestige' }}
          />
        }
        backgroundImageSrc={placeholderImages.guide}
        backgroundImageAlt="Stats guide placeholder visual"
        mediaLabel="Guide visual placeholder"
        aside={
          <AsidePanel
            title="How to read this page"
            description="The guide explains what each stat affects, what early players should prioritize, and where common build mistakes come from."
            items={[
              { label: 'Start with', value: 'Stat system overview' },
              { label: 'Then check', value: 'Early priorities' },
              { label: 'Use with', value: 'Tier list and prestige guide' },
            ]}
          />
        }
      />

      <SectionFrame
        eyebrow="Stats overview"
        title="Each stat category should answer a different build question."
      >
        <CardGrid columns={2} items={[...statsGuide.statCards]} />
      </SectionFrame>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionFrame
          eyebrow="Early-game priorities"
          title="Early stat choices should create stable progress first."
        >
          <OrderedChecklist items={[...statsGuide.priorities]} />
        </SectionFrame>

        <SectionFrame
          eyebrow="Common mistakes"
          title="Most weak builds fail because the logic is wrong, not because the math is slightly off."
        >
          <CardGrid columns={2} items={[...statsGuide.mistakes]} />
        </SectionFrame>
      </div>

      <SectionFrame
        eyebrow="Related routes"
        title="Use the stats guide as build context, not as an isolated page."
      >
        <CardGrid
          columns={3}
          items={[
            {
              title: 'Tier List',
              description:
                'Check what role your stand is trying to play before you decide how to support it.',
              href: '/tier-list',
            },
            {
              title: 'Prestige Guide',
              description:
                'Prestige timing becomes cleaner when you understand what parts of your build matter now.',
              href: '/guides/prestige',
            },
            {
              title: 'Beginner Guide',
              description:
                'Use the new-player route if you still need the higher-level progression sequence.',
              href: '/guides/beginner-guide',
            },
          ]}
        />
      </SectionFrame>

      <SectionFrame eyebrow="FAQ" title="What the stats page should clarify.">
        <FaqGrid items={[...statsGuide.faq]} />
      </SectionFrame>
    </PageShell>
  );
}

export function StandsHubPage() {
  return (
    <PageShell accent="violet">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Bizarre Lineage stands',
          description:
            'Tier-grouped stand cards for Bizarre Lineage with acquisition notes, strengths, weaknesses, and internal links.',
          url: `${envConfigs.app_url}/stands`,
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: stands.map((stand, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: stand.name,
              description: stand.quickVerdict,
              url: `${envConfigs.app_url}/stands#${stand.key}`,
            })),
          },
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What is a Bizarre Lineage stand?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'A Bizarre Lineage stand is your main combat identity. It determines your core moves, matchup profile, and how your build performs in PvP and PvE.',
              },
            },
            {
              '@type': 'Question',
              name: 'How do you get a stand in Bizarre Lineage?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Most stands start from the Stand Arrow path, while some top-end options come from evolution routes. This page separates normal Arrow stands from evolution-only stands.',
              },
            },
            {
              '@type': 'Question',
              name: 'What is the best PvP stand in Bizarre Lineage?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Made in Heaven and Whitesnake are currently the strongest PvP stands. Star Platinum remains the clearest all-round PvP benchmark, while other S-tier stands like C-Moon stay dominant in the current meta.',
              },
            },
            {
              '@type': 'Question',
              name: 'What is the best PvE stand in Bizarre Lineage?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: "Weather Report is the best PvE stand for grinding due to its massive AoE and mission-clearing speed. Magician's Red is also a great early-game choice for farming.",
              },
            },
          ],
        }}
      />

      <section className="px-4 py-16 text-center">
        <div className="text-primary mb-4 text-sm font-bold tracking-[0.3em] uppercase">
          Database
        </div>
        <h1 className="text-foreground mx-auto mb-6 max-w-4xl font-serif text-4xl leading-tight tracking-tight md:text-6xl">
          Bizarre Lineage Stands: Full Guide & Tier List
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed md:text-xl">
          The complete index of stands, evolution paths, and meta-verdicts for
          every combat identity in Bizarre Lineage.
        </p>
      </section>

      <SectionFrame
        eyebrow="Index"
        title="Bizarre Lineage Stand Cards & Tier Verdicts"
        description="Browse the full collection of bizarre lineage stands. Click any card below to view detailed stats and acquisition paths for every stand in-game."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {stands.map((stand) => (
            <StandSummaryCard key={stand.key} stand={stand} />
          ))}
        </div>
      </SectionFrame>

      {/* Information sections stack vertically in a single column */}
      <div className="space-y-12">
        <SectionFrame
          eyebrow="Guide"
          title="How to Get Stands in Bizarre Lineage"
          description="Everything you need to know about acquiring and choosing your first bizarre lineage stands. Most stands start with the Stand Arrow path, while special cases require evolution."
        >
          <CardGrid
            columns={4}
            items={[
              {
                title: 'Core Identity',
                description:
                  'Defines your moves, pressure pattern, and role within the bizarre lineage stands meta.',
              },
              {
                title: 'Roll for Stands',
                description:
                  'Use arrows from chests or quests to spin for new bizarre lineage stands.',
              },
              {
                title: 'Evolution Routes',
                description:
                  'Special cases like C-Moon require specific quests to evolve your bizarre lineage stands.',
              },
              {
                title: 'Meta Evolution',
                description:
                  'High-tier bizarre lineage stands often trade pure power for high-utility kits.',
              },
            ]}
          />
        </SectionFrame>

        <SectionFrame
          eyebrow="Acquisition"
          title="Acquisition Strategy for New Players"
          description="Follow these key rules to optimize your account progression and avoid wasting precious Stand Arrows."
        >
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-primary/5 border-primary/10 rounded-[2rem] border p-8">
              <div className="text-primary mb-4 text-xl font-bold tracking-tighter uppercase">
                01. Arrow First
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Don't waste time chasing evolutions before you have a stable
                level 50 character. Standard arrow pulls are your best friends
                early on.
              </p>
            </div>
            <div className="bg-primary/5 border-primary/10 rounded-[2rem] border p-8">
              <div className="text-primary mb-4 text-xl font-bold tracking-tighter uppercase">
                02. Check Stats
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Top-tier evolutions require Prestige 1+ and specific Conjuring
                stats. Plan your build before committing to a route.
              </p>
            </div>
            <div className="bg-primary/5 border-primary/10 rounded-[2rem] border p-8">
              <div className="text-primary mb-4 text-xl font-bold tracking-tighter uppercase">
                03. Prioritize PvE
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Picking a high-AoE stand like Weather Report speeds up your
                overall progression, making it easier to grind for elite PvP
                stands.
              </p>
            </div>
          </div>
        </SectionFrame>

        <SectionFrame
          eyebrow="Recommendations"
          title="Best Bizarre Lineage Stands by Role"
          description="If you need a quick answer, these are the stands we recommend based on current community meta research."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-card border-border flex items-start gap-4 rounded-[1.5rem] border p-6">
              <div className="shrink-0 rounded-full bg-emerald-500/10 p-3 text-emerald-500">
                <Trophy size={20} />
              </div>
              <div>
                <h4 className="text-lg font-bold">
                  Best PvP Stand: Star Platinum
                </h4>
                <p className="text-muted-foreground mt-1 text-sm">
                  The clearest current PvP benchmark. Combines pressure, burst,
                  and broad matchup value.
                </p>
              </div>
            </div>
            <div className="bg-card border-border flex items-start gap-4 rounded-[1.5rem] border p-6">
              <div className="shrink-0 rounded-full bg-blue-500/10 p-3 text-blue-500">
                <Trophy size={20} />
              </div>
              <div>
                <h4 className="text-lg font-bold">
                  Best PvE Stand: Weather Report
                </h4>
                <p className="text-muted-foreground mt-1 text-sm">
                  Screen-wide AoE and mission clearing speed make this the king
                  of grinding.
                </p>
              </div>
            </div>
          </div>
        </SectionFrame>

        <SectionFrame
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          description="Everything you need to know about Bizarre Lineage stands, evolutions, and the current meta."
        >
          <FaqGrid
            items={[
              {
                question: 'How do I get my first stand in Bizarre Lineage?',
                answer:
                  'You need a Stand Arrow, which can be found in chests spawning around the map, as a reward from quests, or by redeeming active codes. Once you have an arrow, use it from your inventory to roll for a random stand.',
              },
              {
                question: 'Can I change my stand after rolling it?',
                answer:
                  'Yes, but using a new Stand Arrow will overwrite your current stand unless you have unlocked "Stand Storage" through Prestige. It is highly recommended to store a good stand before rolling for a new one.',
              },
              {
                question:
                  'What is the difference between Arrow stands and Evolution stands?',
                answer:
                  'Arrow stands are obtained directly from using a Stand Arrow. Evolution stands (like Made in Heaven or C-Moon) cannot be rolled; they require you to own a base stand and complete specific high-level questlines.',
              },
              {
                question: 'Which stand is best for fast leveling and farming?',
                answer:
                  'Weather Report is widely considered the best PvE stand due to its massive Area of Effect (AoE) abilities, allowing you to clear waves of NPCs much faster than single-target stands like Star Platinum.',
              },
              {
                question: 'What are the requirements for evolving a stand?',
                answer:
                  'Most evolutions require you to be at least Prestige 1, have a specific amount of "Conjuring" stats, and often require a special item or a visit to a specific NPC like Pucci.',
              },
              {
                question: 'How do Stand Tiers affect gameplay?',
                answer:
                  'Higher tier stands (S and A) generally have better damage scaling, more reliable crowd control, and shorter cooldowns. However, a well-played B-tier stand can still beat an S-tier if the player understands the matchups.',
              },
              {
                question: 'Are there "shiny" or secret stand skins?',
                answer:
                  'Yes, Bizarre Lineage features stand skins that change the visual appearance of your stand without altering its power. These are typically obtained via Lucky Arrows or special events.',
              },
            ]}
          />
        </SectionFrame>
      </div>
    </PageShell>
  );
}

export function PrestigeGuidePage() {
  return (
    <PageShell accent="gold">
      <HeroFrame
        eyebrow="Prestige guide"
        title="Prestige matters when it unlocks the next route, not when it merely becomes available."
        dek={prestigeGuide.overview}
        stats={[
          { label: 'Focus', value: 'When to prestige' },
          { label: 'Decision mode', value: 'Tradeoffs first' },
          { label: 'Updated', value: prestigeGuide.updatedAt },
        ]}
        actions={
          <HeroActions
            primary={{ href: '/guides/stats', label: 'Check stat logic' }}
            secondary={{
              href: '/guides/beginner-guide',
              label: 'Review progression route',
            }}
          />
        }
        backgroundImageSrc={placeholderImages.guide}
        backgroundImageAlt="Prestige guide placeholder visual"
        mediaLabel="Reset route placeholder"
        aside={
          <AsidePanel
            title="Decision frame"
            description="This page exists to answer whether you should prestige now, what to prepare first, and which reset mistakes are hardest to recover from."
            items={[
              { label: 'Answer first', value: 'Should I prestige now?' },
              { label: 'Then cover', value: 'Requirements and preparation' },
              { label: 'Finally show', value: 'Mistakes and related routes' },
            ]}
          />
        }
      />

      <SectionFrame
        eyebrow="When to prestige"
        title="The reset is efficient only when it moves your route forward."
      >
        <OrderedChecklist items={[...prestigeGuide.whenToPrestige]} />
      </SectionFrame>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionFrame
          eyebrow="Prepare first"
          title="A strong prestige decision starts before the reset."
        >
          <OrderedChecklist items={[...prestigeGuide.prepareFirst]} />
        </SectionFrame>

        <SectionFrame
          eyebrow="Mistakes to avoid"
          title="The worst prestige errors usually come from impatience."
        >
          <CardGrid columns={2} items={[...prestigeGuide.mistakes]} />
        </SectionFrame>
      </div>

      <SectionFrame
        eyebrow="Related routes"
        title="Prestige should connect back into the rest of the guide system."
      >
        <CardGrid
          columns={3}
          items={[
            {
              title: 'Stats Guide',
              description:
                'Review build logic before deciding what the reset is actually giving up or enabling.',
              href: '/guides/stats',
            },
            {
              title: 'Beginner Guide',
              description:
                'Use the broader progression route if you are still in the early or early-mid game transition.',
              href: '/guides/beginner-guide',
            },
            {
              title: 'Tier List',
              description:
                'Check whether your main stand target still justifies the path you are planning after prestige.',
              href: '/tier-list',
            },
          ]}
        />
      </SectionFrame>

      <SectionFrame eyebrow="FAQ" title="What the prestige page should settle.">
        <FaqGrid items={[...prestigeGuide.faq]} />
      </SectionFrame>
    </PageShell>
  );
}

export function HomeFooterPrompt() {
  return (
    <p className="text-muted-foreground text-sm leading-7">
      Start with{' '}
      <Link href="/codes" className="text-foreground font-medium underline">
        codes
      </Link>{' '}
      if you need immediate value, or jump into the{' '}
      <Link
        href="/guides/beginner-guide"
        className="text-foreground font-medium underline"
      >
        beginner guide
      </Link>{' '}
      if you need a cleaner route. If you are comparing chase targets, open the{' '}
      <Link href="/stands" className="text-foreground font-medium underline">
        stands hub
      </Link>
      .
    </p>
  );
}
