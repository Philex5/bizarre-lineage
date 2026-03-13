import { type ReactNode } from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import {
  getActiveCodes,
  getCodeFailureReasons,
  getExpiredCodes,
  getMonitoredCodeClaims,
  getRedeemSteps,
} from '@/content-data/codes';
import {
  getHomeFaq,
  getOfficialLinks,
  placeholderImages,
  siteName,
} from '@/content-data/site';
import {
  getStandHref,
  getStands,
  type StandEntry,
} from '@/content-data/stands';
import {
  getBestForCards,
  getTierListEntries,
  getTierMethodology,
} from '@/content-data/tier-list';
import { toImageUrl } from '@/lib/r2-utils';
import {
  AlertCircle,
  ArrowUpRight,
  Castle,
  CheckCircle2,
  ExternalLink,
  Flame,
  Info,
  Swords,
  Ticket,
  Trophy,
  WandSparkles,
} from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { SiDiscord, SiRoblox, SiTrello } from 'react-icons/si';

import { Link } from '@/core/i18n/navigation';
import { envConfigs } from '@/config';
import { Crumb } from '@/shared/blocks/common/crumb';
import AdsterraBanner from '@/shared/components/ads/adsterra_banner';
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
  CardGrid,
  FaqGrid,
  GuideCard,
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
    <article className="bg-background/92 border-border group relative flex h-full overflow-hidden rounded-[1.6rem] border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
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
      <div className="relative z-10 flex min-h-full flex-1 flex-col">
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
        <p className="text-muted-foreground mt-3 flex-1 text-sm leading-7">
          {stand.quickVerdict}
        </p>
      </div>
    </article>
  );

  return (
    <Link id={stand.key} href={getStandHref(stand.key)} className="block h-full">
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
      className="border-border bg-background/70 hover:border-primary/35 hover:bg-background/92 group flex min-h-[3.5rem] items-center gap-3 rounded-[1.1rem] border px-3 py-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      <span className="text-primary/90 flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/6 text-base shadow-inner ring-1 ring-white/8 transition-transform duration-300 group-hover:scale-105">
        {icon}
      </span>
      <span className="text-foreground text-sm font-semibold tracking-[-0.02em] leading-tight">
        {title}
      </span>
    </Link>
  );
}

export async function HomePage() {
  const locale = await getLocale();
  const t = await getTranslations('pages.index');
  const tCodes = await getTranslations('pages.codes');
  const officialLinks = getOfficialLinks(t);
  const homeFaq = getHomeFaq(t);
  const activeCodes = getActiveCodes(tCodes);
  const featuredStands = getStands(locale).slice(0, 3);
  const featuredCodes = activeCodes.slice(0, 3);
  const heroQuickAccessItems = [
    {
      title: t('page.sections.utility.quick_access.items.tier_list'),
      href: '/tier-list',
      icon: <Trophy className="size-5" />,
    },
    {
      title: t('page.sections.utility.quick_access.items.stands'),
      href: '/stands',
      icon: <WandSparkles className="size-5" />,
    },
    {
      title: t('page.sections.utility.quick_access.items.beginner_guide'),
      href: '/guides/beginner-guide',
      icon: <ArrowUpRight className="size-5" />,
    },
    {
      title: t('page.sections.utility.quick_access.items.raids'),
      href: '/terms/raid',
      icon: <Castle className="size-5" />,
    },
    {
      title: t('page.sections.utility.quick_access.items.events'),
      href: '/events',
      icon: <Ticket className="size-5" />,
    },
    {
      title: t('page.sections.utility.quick_access.items.fighting_styles'),
      href: '/terms/fighting-styles',
      icon: <Swords className="size-5" />,
    },
    {
      title: t('page.sections.utility.quick_access.items.sub_abilities'),
      href: '/terms/sub-abilities',
      icon: <Flame className="size-5" />,
    },
  ] as const;
  const officialLinkCards = [
    {
      ...officialLinks[0],
      title: t('page.sections.utility.official_links.items.roblox'),
      icon: SiRoblox,
    },
    {
      ...officialLinks[1],
      title: t('page.sections.utility.official_links.items.discord'),
      icon: SiDiscord,
    },
    {
      ...officialLinks[2],
      title: t('page.sections.utility.official_links.items.trello'),
      icon: SiTrello,
    },
  ] as const;
  const homeGuideCards = [
    {
      title: t('page.sections.start_here.items.beginner_guide'),
      href: '/guides/beginner-guide',
    },
    {
      title: t('page.sections.start_here.items.stats_guide'),
      href: '/guides/stats',
    },
    {
      title: t('page.sections.start_here.items.prestige'),
      href: '/guides/prestige',
    },
    {
      title: t('page.sections.start_here.items.codes'),
      href: '/codes',
    },
    {
      title: t('page.sections.start_here.items.tier_list'),
      href: '/tier-list',
    },
    {
      title: t('page.sections.start_here.items.stands'),
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
      name: homeFaq[0]?.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: homeFaq[0]?.answer,
      },
    },
    {
      '@type': 'Question',
      name: homeFaq[3]?.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: homeFaq[3]?.answer,
      },
    },
    {
      '@type': 'Question',
      name: t('page.sections.faq.items.0.question'),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t('page.sections.faq.items.0.answer'),
      },
    },
    {
      '@type': 'Question',
      name: t('page.sections.faq.items.1.question'),
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
                alt={t('page.sections.hero.image_alt')}
                fill
                className="object-cover object-center dark:brightness-[0.88] dark:saturate-[0.94]"
                priority
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_oklab,var(--color-foreground)_92%,black)_0%,color-mix(in_oklab,var(--color-foreground)_84%,transparent)_34%,color-mix(in_oklab,var(--color-foreground)_56%,transparent)_62%,color-mix(in_oklab,var(--color-foreground)_84%,black)_100%)] dark:bg-[linear-gradient(90deg,color-mix(in_oklab,black_74%,transparent)_0%,color-mix(in_oklab,black_48%,transparent)_30%,color-mix(in_oklab,black_22%,transparent)_58%,color-mix(in_oklab,black_56%,transparent)_100%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,black_18%,transparent)_0%,transparent_20%,color-mix(in_oklab,black_44%,transparent)_100%)] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,black_32%,transparent)_0%,transparent_22%,color-mix(in_oklab,black_56%,transparent)_100%)]" />
            </div>
            <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-primary)_20%,transparent),transparent)] dark:bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-primary)_10%,transparent),transparent)]" />

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

          <div className="border-border bg-card/94 relative overflow-hidden rounded-[1.7rem] border p-4 shadow-lg backdrop-blur-sm md:p-5">
            <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--color-primary),var(--color-accent),var(--color-primary))] opacity-90" />
            <div className="relative flex items-center gap-3 overflow-x-auto pr-1 md:gap-4">
              <div className="min-w-[9.5rem] shrink-0">
                <h2 className="text-foreground font-serif text-xl leading-none tracking-[-0.04em] md:text-2xl">
                  {t('page.sections.utility.official_links.title')}
                </h2>
              </div>

              <div className="flex min-w-0 flex-1 items-stretch gap-3">
                {officialLinkCards.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="border-border bg-background/80 hover:border-primary/35 hover:bg-background flex min-w-[9rem] flex-1 items-center gap-3 rounded-[1.1rem] border px-3 py-3 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:min-w-0 md:px-4"
                    >
                      <span className="text-primary flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/6 text-xl ring-1 ring-white/8">
                        <Icon />
                      </span>
                      <div className="text-foreground text-sm font-semibold tracking-[-0.03em] md:text-base">
                        {item.title}
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="px-1">
            <AdsterraBanner />
          </div>
        </div>

        <aside className="border-border bg-card/96 relative overflow-hidden rounded-[2rem] border p-5 shadow-lg backdrop-blur-sm lg:self-start">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-primary)_8%,transparent)_0%,transparent_24%),linear-gradient(color-mix(in_oklab,var(--color-foreground)_5%,transparent)_1px,transparent_1px)] bg-[length:100%_100%,18px_18px]" />
          <div className="relative space-y-6">
            <div>
                  <div className="text-muted-foreground text-[0.68rem] tracking-[0.24em] uppercase">
                    {t('page.sections.utility.quick_access.eyebrow')}
                  </div>
                  <h2 className="mt-3 font-serif text-3xl leading-none tracking-[-0.04em]">
                    {t('page.sections.utility.quick_access.title')}
                  </h2>
                  <div className="mt-5 grid grid-cols-2 gap-2.5">
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
                    {t('page.sections.utility.latest_codes.eyebrow')}
                  </div>
                  <h2 className="mt-3 font-serif text-3xl leading-none tracking-[-0.04em]">
                    {t('page.sections.utility.latest_codes.title')}
                  </h2>
                </div>
                <div className="text-muted-foreground text-right text-xs leading-5">
                  {t('page.sections.utility.latest_codes.verified_label')}
                  <br />
                  2026-03-09
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {featuredCodes.map((code) => (
                  <div
                    key={code.code}
                    className="bg-background/85 border-border rounded-[1.2rem] border px-3 py-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-foreground font-mono text-sm font-semibold">
                          {code.code}
                        </div>
                        <p className="text-muted-foreground mt-1.5 text-sm leading-5">
                          {code.reward}
                        </p>
                      </div>
                      <HomeCodeCopyButton code={code.code} />
                    </div>
                  </div>
                ))}
              </div>

              <Button asChild className="mt-4 w-full rounded-xl">
                <Link href="/codes">
                  {t('page.sections.utility.latest_codes.cta')}
                </Link>
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
                alt={t('page.sections.world.image_alt')}
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
  const activeCodes = getActiveCodes(t);
  const expiredCodes = getExpiredCodes(t);
  const monitoredCodeClaims = getMonitoredCodeClaims(t);
  const redeemSteps = getRedeemSteps(t);
  const codeFailureReasons = getCodeFailureReasons(t);
  const latestVerified = activeCodes[0]?.lastVerified ?? '2026-03-13';
  const sourceLinks = [
    {
      label: 'Official Roblox Game',
      href: 'https://www.roblox.com/games/14890802310/Bizarre-Lineage',
    },
    {
      label: 'Official Discord',
      href: 'https://discord.com/invite/bizarrelineage',
    },
  ] as const;
  const faqItems = [
    {
      question: 'How do I redeem Bizarre Lineage codes?',
      answer:
        'Launch Bizarre Lineage on Roblox, open the in-game chat, type the working code exactly as shown, and press Enter to claim the reward.',
    },
    {
      question: 'Where can I find more Bizarre Lineage codes for rewards?',
      answer:
        'The official Discord server and Roblox game page are still the best sources. This page tracks those updates so you can check one guide first.',
    },
    {
      question: 'What do Bizarre Lineage codes give you?',
      answer:
        'Most Bizarre Lineage codes give progression rewards like stat point essence, stand items, chests, or other boosts that help you move faster through the game.',
    },
    {
      question: 'Why are my Bizarre Lineage codes not working?',
      answer:
        'Codes can fail because of case-sensitive input, missing the required group or like step, or testing on a server that has not fully refreshed after an update.',
    },
  ];

  return (
    <PageShell accent="gold">
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

      <div className="px-1">
        <AdsterraBanner />
      </div>

      <SectionFrame
        id="active-codes"
        eyebrow="Active Rewards"
        title="Bizarre Lineage Codes List"
        description="Check the latest tracked Bizarre Lineage codes first, then use the redemption guide below if you want to claim rewards quickly without digging through menus."
      >
        <div className="space-y-6">
          <div className="grid gap-4">
            {activeCodes.length > 0 ? (
              activeCodes.map((row) => (
                <div
                  key={row.code}
                  className="group bg-background/92 border-gold/20 hover:border-gold/50 relative flex flex-col justify-between gap-4 rounded-2xl border p-5 shadow-sm transition-all hover:shadow-md md:flex-row md:items-center"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                      <CheckCircle2 className="size-6" />
                    </div>
                    <div>
                      <div className="text-foreground select-all font-mono text-xl font-bold tracking-tight">
                        {row.code}
                      </div>
                      <div className="text-muted-foreground mt-1 text-sm">
                        Reward: {row.reward}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-sm text-green-500">
                      Working Bizarre Lineage Code
                    </div>
                    <div className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                      Verified {row.lastVerified}
                    </div>
                    <HomeCodeCopyButton code={row.code} />
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-background/88 border-border rounded-2xl border p-8 text-center">
                <AlertCircle className="text-muted-foreground mx-auto mb-4 size-12" />
                <h3 className="mb-2 text-lg font-semibold">
                  No Active Bizarre Lineage Codes Found
                </h3>
                <p className="text-muted-foreground mx-auto max-w-md">
                  There are currently no confirmed active Bizarre Lineage codes.
                  Check the official channels below and revisit this page after
                  the next update or milestone drop.
                </p>
              </div>
            )}
          </div>

          <p className="text-muted-foreground text-sm italic">
            Last verified: {latestVerified}. Redeem codes quickly after updates,
            because Bizarre Lineage rewards can expire with very little warning.
          </p>

          {monitoredCodeClaims.length > 0 ? (
            <div className="bg-background/60 border-border rounded-2xl border p-5">
              <div className="text-muted-foreground mb-4 flex items-center gap-2">
                <Info className="size-4" />
                <span className="text-sm font-semibold tracking-wider uppercase">
                  Upcoming Bizarre Lineage Codes and Milestones
                </span>
              </div>
              <div className="space-y-3">
                {monitoredCodeClaims.map((row) => (
                  <div
                    key={row.code}
                    className="flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="text-foreground font-mono font-medium">
                      {row.code}
                    </span>
                    <span className="text-muted-foreground">
                      {row.reward}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </SectionFrame>

      <SectionFrame
        id="how-to-use"
        eyebrow="Redemption Guide"
        title="How to Use Bizarre Lineage Codes"
        description="Follow the in-game flow below to redeem Bizarre Lineage codes. The screenshot guide from the earlier layout is restored here as well."
      >
        <div className="flex flex-col gap-8">
          <div className="grid gap-6">
            {redeemSteps.map((step, index) => (
              <div key={step.title} className="flex gap-4">
                <div className="bg-foreground text-background flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="mb-1 text-base font-bold">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative mx-auto aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-3xl border border-border shadow-lg">
            <Image
              src="/images/codes/redeem-guide.jpg"
              alt="Step-by-step guide for Bizarre Lineage codes redemption"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </SectionFrame>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <SectionFrame
          id="about"
          eyebrow="Overview"
          title="What is Bizarre Lineage?"
        >
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm leading-7 md:text-base">
              Bizarre Lineage is a Roblox RPG inspired by JoJo's Bizarre
              Adventure, with stand progression, PvP, farming routes, and
              character optimization driving most sessions. Codes matter because
              they can shorten that grind with free items or resets.
            </p>
            <p className="text-muted-foreground text-sm leading-7 md:text-base">
              This page keeps the older content-first flow intact: check the
              live rewards first, redeem them quickly, then move into guides and
              build research instead of stopping at the claim screen.
            </p>
          </div>
        </SectionFrame>

        <SectionFrame
          eyebrow="Troubleshooting"
          title="Why a Bizarre Lineage code may fail"
        >
          <CardGrid columns={3} items={[...codeFailureReasons]} />
        </SectionFrame>
      </div>

      <SectionFrame
        id="sources"
        eyebrow="Community"
        title="Find More Bizarre Lineage Codes"
        description="Follow the official channels if you want to catch new code drops as soon as they happen."
      >
        <div className="flex flex-wrap gap-4">
          {sourceLinks.map((source) => (
            <Button
              key={source.href}
              asChild
              variant="outline"
              className="h-12 rounded-full px-6 transition-all hover:bg-gold hover:text-white"
            >
              <a href={source.href} target="_blank" rel="noreferrer">
                {source.label}
                <ExternalLink className="ml-2 size-4" />
              </a>
            </Button>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame
        id="faq"
        eyebrow="FAQ"
        title="Bizarre Lineage Codes Frequently Asked Questions"
      >
        <FaqGrid items={faqItems} />
      </SectionFrame>

      <SectionFrame
        id="related"
        eyebrow="Next Reads"
        title="Use your rewards better after the code check"
      >
        <CardGrid
          columns={2}
          items={[
            {
              title: 'Tier List',
              description:
                'Move to the stand rankings if you are deciding where those rewards should actually be spent.',
              href: '/tier-list',
            },
            {
              title: 'Beginner Guide',
              description:
                'Open the guide if you need a stronger first-session route after collecting rewards.',
              href: '/guides/beginner-guide',
            },
          ]}
        />
      </SectionFrame>

      {expiredCodes.length > 0 ? (
        <SectionFrame
          id="expired"
          eyebrow="Archive"
          title="Expired Bizarre Lineage Codes"
          description="These old entries stay here for reference so you can quickly rule out outdated rewards."
        >
          <div className="border-border bg-background/50 overflow-hidden rounded-2xl border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-4">Expired Code</TableHead>
                  <TableHead>Previous Reward</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="px-4">Last Verified</TableHead>
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
      ) : null}
    </PageShell>
  );
}

export async function TierListPage() {
  const t = await getTranslations('pages.tier-list');
  const tierListEntries = getTierListEntries(t);
  const tierMethodology = getTierMethodology(t);
  const bestForCards = getBestForCards(t);
  return (
    <PageShell accent="violet">
      <StandsTierBoard />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <SectionFrame
          eyebrow={t('page.sections.representative.eyebrow')}
          title={t('page.sections.representative.title')}
        >
          <div className="grid gap-4 md:grid-cols-2">
            {tierListEntries.map((entry) => (
              <article
                key={entry.key}
                className="group bg-background/92 border-border relative overflow-hidden rounded-[1.6rem] border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="absolute inset-x-5 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-primary),var(--color-accent),transparent)]" />
                <Link
                  href={getStandHref(entry.key)}
                  className="border-border bg-background/90 text-foreground hover:border-primary/30 hover:text-primary absolute top-4 right-4 inline-flex size-9 items-center justify-center rounded-full border transition-colors"
                  aria-label={`Open ${entry.name}`}
                >
                  <ArrowUpRight className="size-4" />
                </Link>
                <div className="pr-12">
                  <div className="text-muted-foreground text-[0.68rem] tracking-[0.2em] uppercase">
                    {entry.tier} {t('page.sections.representative.tier_suffix')}
                  </div>
                  <h3 className="text-foreground mt-2 text-xl font-semibold tracking-[-0.03em]">
                    {entry.name}
                  </h3>
                  <p className="text-muted-foreground mt-3 text-sm leading-7">
                    {entry.summary}
                  </p>
                </div>
              </article>
            ))}
          </div>
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

      <div className="px-1">
        <AdsterraBanner />
      </div>

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
            { title: t('page.sections.breadcrumbs.home'), url: '/' },
            {
              title: t('page.sections.breadcrumbs.guides'),
              url: '/guides',
              is_active: true,
            },
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

export async function StandsHubPage() {
  const locale = await getLocale();
  const t = await getTranslations('pages.stands');
  const localizedStands = getStands(locale);
  const faqItems = t.raw('page.sections.faq.items') as Array<{
    question: string;
    answer: string;
  }>;

  return (
    <PageShell accent="violet">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: t('page.schema.collection.name'),
          description: t('page.schema.collection.description'),
          url: `${envConfigs.app_url}/stands`,
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: localizedStands.map((stand, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: stand.name,
              description: stand.quickVerdict,
              url: `${envConfigs.app_url}${getStandHref(stand.key)}`,
            })),
          },
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

      <section className="px-4 pb-4 pt-2 text-center md:pb-6 md:pt-3">
        <h1 className="text-foreground mx-auto mb-3 max-w-4xl font-serif text-4xl leading-tight tracking-tight md:text-6xl">
          {t('page.sections.hero.title')}
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed md:text-xl">
          {t('page.sections.hero.description')}
        </p>
      </section>

      <SectionFrame
        eyebrow={t('page.sections.index.eyebrow')}
        title={t('page.sections.index.title')}
        description={t('page.sections.index.description')}
        contentClassName="mt-3"
      >
        <div className="space-y-6">
          <AdsterraBanner />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {localizedStands.map((stand) => (
              <StandSummaryCard key={stand.key} stand={stand} />
            ))}
          </div>
        </div>
      </SectionFrame>

      {/* Information sections stack vertically in a single column */}
      <div className="space-y-12">
        <SectionFrame
          eyebrow={t('page.sections.guide.eyebrow')}
          title={t('page.sections.guide.title')}
          description={t('page.sections.guide.description')}
        >
          <CardGrid
            columns={4}
            items={[
              {
                title: t('page.sections.guide.items.core_identity.title'),
                description: t(
                  'page.sections.guide.items.core_identity.description'
                ),
              },
              {
                title: t('page.sections.guide.items.roll.title'),
                description: t('page.sections.guide.items.roll.description'),
              },
              {
                title: t('page.sections.guide.items.evolution.title'),
                description: t(
                  'page.sections.guide.items.evolution.description'
                ),
              },
              {
                title: t('page.sections.guide.items.meta.title'),
                description: t('page.sections.guide.items.meta.description'),
              },
            ]}
          />
        </SectionFrame>

        <SectionFrame
          eyebrow={t('page.sections.acquisition.eyebrow')}
          title={t('page.sections.acquisition.title')}
          description={t('page.sections.acquisition.description')}
        >
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-primary/5 border-primary/10 rounded-[2rem] border p-8">
              <div className="text-primary mb-4 text-xl font-bold tracking-tighter uppercase">
                {t('page.sections.acquisition.items.arrow_first.title')}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t('page.sections.acquisition.items.arrow_first.description')}
              </p>
            </div>
            <div className="bg-primary/5 border-primary/10 rounded-[2rem] border p-8">
              <div className="text-primary mb-4 text-xl font-bold tracking-tighter uppercase">
                {t('page.sections.acquisition.items.check_stats.title')}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t('page.sections.acquisition.items.check_stats.description')}
              </p>
            </div>
            <div className="bg-primary/5 border-primary/10 rounded-[2rem] border p-8">
              <div className="text-primary mb-4 text-xl font-bold tracking-tighter uppercase">
                {t('page.sections.acquisition.items.prioritize_pve.title')}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t(
                  'page.sections.acquisition.items.prioritize_pve.description'
                )}
              </p>
            </div>
          </div>
        </SectionFrame>

        <SectionFrame
          eyebrow={t('page.sections.recommendations.eyebrow')}
          title={t('page.sections.recommendations.title')}
          description={t('page.sections.recommendations.description')}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-card border-border flex items-start gap-4 rounded-[1.5rem] border p-6">
              <div className="shrink-0 rounded-full bg-emerald-500/10 p-3 text-emerald-500">
                <Trophy size={20} />
              </div>
              <div>
                <h4 className="text-lg font-bold">
                  {t('page.sections.recommendations.items.pvp.title')}
                </h4>
                <p className="text-muted-foreground mt-1 text-sm">
                  {t('page.sections.recommendations.items.pvp.description')}
                </p>
              </div>
            </div>
            <div className="bg-card border-border flex items-start gap-4 rounded-[1.5rem] border p-6">
              <div className="shrink-0 rounded-full bg-blue-500/10 p-3 text-blue-500">
                <Trophy size={20} />
              </div>
              <div>
                <h4 className="text-lg font-bold">
                  {t('page.sections.recommendations.items.pve.title')}
                </h4>
                <p className="text-muted-foreground mt-1 text-sm">
                  {t('page.sections.recommendations.items.pve.description')}
                </p>
              </div>
            </div>
          </div>
        </SectionFrame>

        <SectionFrame
          eyebrow={t('page.sections.faq.eyebrow')}
          title={t('page.sections.faq.title')}
          description={t('page.sections.faq.description')}
        >
          <FaqGrid items={faqItems} />
        </SectionFrame>
      </div>
    </PageShell>
  );
}

export async function BeginnerGuidePage() {
  const t = await getTranslations('pages.guides.beginner-guide');

  const checklistItems = [
    { key: 'tutorial_boost', img: 'assets/pages/guides/beginner-guide/start.png' },
    { key: 'unlock_teleport', img: 'assets/pages/guides/beginner-guide/bus.png' },
    { key: 'gym_benefits', img: 'assets/pages/guides/beginner-guide/gym.png' },
    { key: 'pawn_shop_cash', img: null },
  ];

  return (
    <PageShell accent="jade">
      <div className="px-1 pt-2">
        <Crumb
          items={[
            { title: 'Home', url: '/' },
            { title: 'Guides', url: '/guides' },
            {
              title: t('page.sections.hero.eyebrow'),
              url: '/guides/beginner-guide',
              is_active: true,
            },
          ]}
        />
      </div>

      <header className="px-4 pb-4 pt-2 text-center md:pb-6 md:pt-3">
        <h1 className="text-foreground mx-auto mb-3 max-w-4xl font-serif text-4xl leading-tight tracking-tight md:text-6xl">
          {t('page.sections.hero.title')}
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed md:text-xl">
          {t('page.sections.hero.description')}
        </p>
      </header>

      <SectionFrame
        eyebrow={t('page.sections.checklist.eyebrow')}
        title={t('page.sections.checklist.title')}
        contentClassName="mt-3"
      >
        <div className="space-y-12">
          {checklistItems.map((item, i) => (
            <div key={item.key} className="group flex flex-col gap-6 lg:flex-row lg:items-center">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold">
                    {i + 1}
                  </span>
                  <h3 className="text-foreground m-0 text-2xl font-bold tracking-tight">
                    {t(`page.content.checklist.${i}.title` as any)}
                  </h3>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {t(`page.content.checklist.${i}.description` as any)}
                </p>
              </div>
              {item.img && (
                <div className="border-border bg-muted relative aspect-video w-full overflow-hidden rounded-3xl border shadow-lg lg:w-[400px]">
                  <Image
                    src={toImageUrl(item.img)}
                    alt="Guide step image"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </SectionFrame>

      <div className="px-1">
        <AdsterraBanner />
      </div>

      <SectionFrame
        eyebrow={t('page.sections.first_30.eyebrow')}
        title={t('page.sections.first_30.title')}
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="border-border bg-background/50 rounded-2xl border p-6">
              <h4 className="m-0 font-bold">{t(`page.content.first_thirty_minutes.${i}.title` as any)}</h4>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {t(`page.content.first_thirty_minutes.${i}.description` as any)}
              </p>
            </div>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame
        eyebrow={t('page.sections.power_systems.eyebrow')}
        title={t('page.sections.power_systems.title')}
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="border-border bg-background/50 rounded-2xl border p-6">
              <h4 className="m-0 font-bold">{t(`page.content.power_systems.${i}.title` as any)}</h4>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {t(`page.content.power_systems.${i}.description` as any)}
              </p>
            </div>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame
        eyebrow={t('page.sections.mistakes.eyebrow')}
        title={t('page.sections.mistakes.title')}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <GuideCard
              key={i}
              title={t(`page.content.mistakes_cards.${i}.title` as any)}
              description={t(`page.content.mistakes_cards.${i}.description` as any)}
              href={t(`page.content.mistakes_cards.${i}.href` as any)}
            />
          ))}
        </div>
      </SectionFrame>

      <SectionFrame
        eyebrow={t('page.sections.progression.eyebrow')}
        title={t('page.sections.progression.title')}
      >
        <div className="space-y-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="border-border bg-background/50 rounded-xl border p-5">
              <h4 className="m-0 font-bold">{t(`page.content.goals.${i}.title` as any)}</h4>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {t(`page.content.goals.${i}.description` as any)}
              </p>
            </div>
          ))}
        </div>
      </SectionFrame>

      <div className="px-1">
        <AdsterraBanner />
      </div>

      <SectionFrame
        eyebrow={t('page.sections.faq.eyebrow')}
        title={t('page.sections.faq.title')}
      >
        <FaqGrid items={t.raw('page.content.faq')} />
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
