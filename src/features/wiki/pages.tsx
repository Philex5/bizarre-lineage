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
import { homeFaq, placeholderImages, siteName } from '@/content-data/site';
import { stands, starPlatinum, type StandEntry } from '@/content-data/stands';
import {
  bestForCards,
  tierListEntries,
  tierMethodology,
} from '@/content-data/tier-list';
import { ArrowUpRight, Trophy } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

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
  keywords: string[];
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
    keywords: input.keywords,
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
  const content = (
    <article className="bg-background/92 border-border relative overflow-hidden rounded-[1.6rem] border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <span className="bg-primary text-primary-foreground border-primary/20 absolute top-4 right-4 rounded-full border px-3 py-1 text-[0.72rem] font-semibold tracking-[0.18em] uppercase">
        {stand.tier}
      </span>
      <div className="pr-14">
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
    </article>
  );

  return stand.key === 'star-platinum' ? (
    <Link href="/stands/star-platinum" className="block">
      {content}
    </Link>
  ) : (
    content
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

export async function HomePage() {
  const t = await getTranslations('pages.index');
  const featuredStands = stands.slice(0, 3);
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

      <HeroFrame
        eyebrow={t('page.sections.hero.eyebrow')}
        title={t('page.sections.hero.title')}
        dek={t('page.sections.hero.dek')}
        actions={
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-full px-6 text-sm tracking-[0.16em] uppercase"
              >
                <Link href="/tier-list">
                  {t('page.sections.hero.buttons.tier_list')}
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/16 bg-white/8 px-6 text-sm tracking-[0.16em] text-white uppercase backdrop-blur-sm hover:bg-white/14"
              >
                <Link href="/guides/beginner-guide">
                  {t('page.sections.hero.buttons.leveling_guide')}
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/16 bg-white/8 px-6 text-sm tracking-[0.16em] text-white uppercase backdrop-blur-sm hover:bg-white/14"
              >
                <Link href="/codes">
                  {t('page.sections.hero.buttons.code_archive')}
                </Link>
              </Button>
            </div>
            <p className="text-xs text-white/60 italic">
              {t('page.sections.hero.tip')}
            </p>
          </div>
        }
        backgroundImageSrc={placeholderImages.hero}
        backgroundImageAlt="Bizarre Lineage hero key art placeholder"
      />

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
        eyebrow={t('page.sections.database.eyebrow')}
        title={t('page.sections.database.title')}
        description={t('page.sections.database.description')}
      >
        <CardGrid
          columns={3}
          items={[
            {
              title: t('page.sections.database.items.tier_list.title'),
              meta: t('page.sections.database.items.tier_list.meta'),
              description: t(
                'page.sections.database.items.tier_list.description'
              ),
              href: '/tier-list',
            },
            {
              title: t('page.sections.database.items.stand_db.title'),
              meta: t('page.sections.database.items.stand_db.meta'),
              description: t(
                'page.sections.database.items.stand_db.description'
              ),
              href: '/stands',
            },
            {
              title: t('page.sections.database.items.fighting_styles.title'),
              meta: t('page.sections.database.items.fighting_styles.meta'),
              description: t(
                'page.sections.database.items.fighting_styles.description'
              ),
              href: '/terms/fighting-styles',
            },
            {
              title: t('page.sections.database.items.stats_guide.title'),
              meta: t('page.sections.database.items.stats_guide.meta'),
              description: t(
                'page.sections.database.items.stats_guide.description'
              ),
              href: '/guides/stats',
            },
            {
              title: t('page.sections.database.items.leveling_path.title'),
              meta: t('page.sections.database.items.leveling_path.meta'),
              description: t(
                'page.sections.database.items.leveling_path.description'
              ),
              href: '/guides/beginner-guide',
            },
            {
              title: t('page.sections.database.items.raids_bosses.title'),
              meta: t('page.sections.database.items.raids_bosses.meta'),
              description: t(
                'page.sections.database.items.raids_bosses.description'
              ),
              href: '/terms/raid',
            },
            {
              title: t('page.sections.database.items.prestige_system.title'),
              meta: t('page.sections.database.items.prestige_system.meta'),
              description: t(
                'page.sections.database.items.prestige_system.description'
              ),
              href: '/guides/prestige',
            },
            {
              title: t('page.sections.database.items.codes_archive.title'),
              meta: t('page.sections.database.items.codes_archive.meta'),
              description: t(
                'page.sections.database.items.codes_archive.description'
              ),
              href: '/codes',
            },
            {
              title: t('page.sections.database.items.mechanics.title'),
              meta: t('page.sections.database.items.mechanics.meta'),
              description: t(
                'page.sections.database.items.mechanics.description'
              ),
              href: '/terms',
            },
          ]}
        />
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
              href:
                entry.key === 'star-platinum'
                  ? '/stands/star-platinum'
                  : undefined,
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
              url:
                stand.key === 'star-platinum'
                  ? `${envConfigs.app_url}/stands/star-platinum`
                  : `${envConfigs.app_url}/stands#${stand.key}`,
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
                text: 'On this page, Star Platinum is the clearest all-round PvP benchmark, while other S-tier stands such as The World, Whitesnake, C-Moon, and Made in Heaven remain strong depending on matchup and execution.',
              },
            },
            {
              '@type': 'Question',
              name: 'What is the best PvE stand in Bizarre Lineage?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Weather Report stands out as one of the clearest PvE-oriented options here because its area control and mission-clearing value are easier to understand than pure duel-first picks.',
              },
            },
          ],
        }}
      />
      <SectionFrame
        eyebrow="Stand cards"
        title="Browse every Bizarre Lineage stand as a quick info card."
        description="This page is the stand index. Each card gives the stand name, current tier, role, and a fast verdict before you open deeper pages."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {stands.map((stand) => (
            <StandSummaryCard key={stand.key} stand={stand} />
          ))}
        </div>
      </SectionFrame>

      <SectionFrame
        eyebrow="Stand guide"
        title="Use this page as a Bizarre Lineage stand guide, not just a clickable chart."
        description="The goal is to answer the main search intents on one screen: what a stand does, how the current bizarre lineage stand tier list is organized, and whether a target is worth your next grind."
      >
        <CardGrid
          columns={3}
          items={[
            {
              title: 'What a stand does',
              description:
                'A bizarre lineage stand defines your core moves, pressure pattern, and whether your build leans more toward PvP burst, PvE clearing, or balanced progression.',
            },
            {
              title: 'How to get a stand',
              description:
                'Most bizarre lineage how to get stand searches start with the bizarre lineage stand arrow path, while special cases like C-Moon and Made in Heaven require evolution routes instead.',
            },
            {
              title: 'How to read the tier list',
              description:
                'This bizarre lineage stand tier list page lets you click a stand first, then read its role, strengths, weaknesses, and acquisition notes without opening a dozen tabs.',
            },
          ]}
        />
      </SectionFrame>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionFrame
          eyebrow="Acquisition"
          title="Stand Arrow routes and stand chances matter because not every chase target costs the same."
          description="Players searching bizarre lineage stand arrow or bizarre lineage stand chances usually want to know whether they should keep rolling or pivot to an evolution route."
        >
          <OrderedChecklist
            items={[
              {
                title: 'Use Arrow stands for the normal first-pass grind',
                description:
                  'Most entries on this page begin with the Stand Arrow route, which is the fastest way to understand your realistic early options.',
              },
              {
                title:
                  'Check whether the stand is evolution-only before rerolling',
                description:
                  'C-Moon, Made in Heaven, and The World High Voltage are not standard Arrow pulls, so chasing them like a normal roll wastes time.',
              },
              {
                title: 'Read stand chances together with stand role',
                description:
                  'A lower-cost stand can be the smarter target if it solves your current PvE or PvP problem sooner.',
              },
            ]}
          />
        </SectionFrame>

        <SectionFrame
          eyebrow="Best picks"
          title="Best PvP and PvE stand calls should stay tied to visible use cases."
          description="These are page-level judgments from the current chart and card notes, not permanent universal answers."
        >
          <CardGrid
            columns={2}
            items={[
              {
                title: 'Bizarre Lineage best PvP stand',
                description:
                  'Star Platinum is the clearest current PvP benchmark here because it combines pressure, burst, and broad matchup value without relying on one gimmick.',
              },
              {
                title: 'Bizarre Lineage best PvE stand',
                description:
                  'Weather Report is one of the easiest best PvE stand calls on this page thanks to its screen-wide AoE, mission clearing, and crowd-control value.',
              },
              {
                title: 'Best hybrid chase targets',
                description:
                  'The World, Whitesnake, and Made in Heaven stay near the top when you want a stronger late-game chase with higher upside and more execution demand.',
              },
              {
                title: 'Best value before hard chasing',
                description:
                  'Golden Experience, Stone Free, and Crazy Diamond make sense when survivability, balance, or cleaner progression matter more than top-end hype.',
              },
            ]}
          />
        </SectionFrame>
      </div>

      <SectionFrame
        eyebrow="Site advantage"
        title="This site is more useful for stand research when it helps with the decision, not just the label."
      >
        <CardGrid
          columns={3}
          items={[
            {
              title: 'Chart plus detail card',
              description:
                'You can click the tier chart and immediately see the stand role, how to get it, strengths, weaknesses, and key moves in one place.',
            },
            {
              title: 'Arrow vs evolution clarity',
              description:
                'The page separates normal Stand Arrow targets from evolution-only stands so bizarre lineage how to get stand questions are answered faster.',
            },
            {
              title: 'Built for internal follow-up',
              description:
                'The stand hub feeds directly into the tier list, beginner guide, and sample stand page instead of leaving the reader at a dead end.',
            },
          ]}
        />
      </SectionFrame>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionFrame
          eyebrow="What next"
          title="Use the chart, then open the page that matches your next decision."
        >
          <OrderedChecklist
            items={[
              {
                title: 'Open the tier list for the broader meta frame',
                description:
                  'Use the ranking page when you need the overall hierarchy and methodology.',
                href: '/tier-list',
                hrefLabel: 'Open tier list',
              },
              {
                title: 'Open Star Platinum for the long-form stand template',
                description:
                  'The sample stand page is still the deeper article for one target.',
                href: '/stands/star-platinum',
                hrefLabel: 'Open sample stand',
              },
              {
                title: 'Use the beginner guide if you are still early-game',
                description:
                  'A fresh account often needs route clarity before a premium chase target.',
                href: '/guides/beginner-guide',
                hrefLabel: 'Open beginner guide',
              },
            ]}
          />
        </SectionFrame>

        <SectionFrame
          eyebrow="Reading notes"
          title="The page keeps the decision frame visible without sending readers away."
        >
          <CardGrid
            columns={2}
            items={[
              {
                title: 'Role on page',
                description:
                  'Use this article when you need one stand broken down in more detail than the chart card can provide.',
              },
              {
                title: 'How to read it',
                description:
                  'Start with the quick verdict, then check obtainment, strengths, weaknesses, and move notes in that order.',
              },
              {
                title: 'Best fit',
                description:
                  'This format works best when you already have a candidate stand and need a cleaner go-or-skip decision.',
              },
              {
                title: 'Next step',
                description:
                  'Return to the tier list for broader comparisons or move into the beginner guide if progression is still the blocker.',
              },
            ]}
          />
        </SectionFrame>
      </div>

      <SectionFrame
        eyebrow="FAQ"
        title="Questions readers usually ask after checking a Bizarre Lineage stand chart."
      >
        <FaqGrid
          items={[
            {
              question: 'What is the best stand in Bizarre Lineage right now?',
              answer:
                'There is no permanent universal answer, but this page currently treats the S-tier row as the top bracket, with Star Platinum acting as the clearest all-round benchmark.',
            },
            {
              question: 'How do you get a stand in Bizarre Lineage?',
              answer:
                'Most stand routes begin with the Stand Arrow, while some of the strongest late-path stands are evolution-only and should not be treated like normal rerolls.',
            },
            {
              question:
                'Why does this Bizarre Lineage stand tier list mention stand chances?',
              answer:
                'Because a tier letter alone does not tell you whether a stand is realistic for your current account. Acquisition cost and route difficulty affect real player decisions.',
            },
            {
              question: 'What should I open after choosing a stand here?',
              answer:
                'Open the tier list for broader ranking context, the beginner guide for progression planning, or the Star Platinum page if you want the long-form stand article format.',
            },
          ]}
        />
      </SectionFrame>

      <SectionFrame
        eyebrow="CTA"
        title="Keep moving once the stand decision becomes clear."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Link
            href="/tier-list"
            className="bg-background/92 text-foreground border-border rounded-[1.5rem] border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="text-muted-foreground text-[0.7rem] tracking-[0.2em] uppercase">
              Meta context
            </div>
            <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em]">
              Open the full tier list
            </h3>
            <p className="text-muted-foreground mt-3 text-sm leading-7">
              Check the broader bizarre lineage stand tier list logic before
              committing to one route.
            </p>
          </Link>

          <Link
            href="/guides/beginner-guide"
            className="bg-background/92 text-foreground border-border rounded-[1.5rem] border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="text-muted-foreground text-[0.7rem] tracking-[0.2em] uppercase">
              Progression
            </div>
            <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em]">
              Plan your next grind
            </h3>
            <p className="text-muted-foreground mt-3 text-sm leading-7">
              Use the beginner route if you still need a practical path before
              chasing the highest tier stands.
            </p>
          </Link>

          <Link
            href="/stands/star-platinum"
            className="bg-background/92 text-foreground border-border rounded-[1.5rem] border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="text-muted-foreground text-[0.7rem] tracking-[0.2em] uppercase">
              Deep dive
            </div>
            <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em]">
              Read a full stand page
            </h3>
            <p className="text-muted-foreground mt-3 text-sm leading-7">
              Open Star Platinum to see the long-form stand template that
              expands beyond the chart card.
            </p>
          </Link>
        </div>
      </SectionFrame>
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

export function StarPlatinumPage() {
  return (
    <PageShell accent="gold">
      <HeroFrame
        eyebrow="Stand sample page"
        title="Star Platinum should open with a verdict: strong, flexible, and worth serious attention."
        dek={starPlatinum.summary}
        stats={[
          { label: 'Current call', value: `${starPlatinum.tier} tier sample` },
          { label: 'Best fit', value: starPlatinum.bestFor },
          { label: 'Decision goal', value: 'Worth the grind?' },
        ]}
        actions={
          <HeroActions
            primary={{ href: '/tier-list', label: 'Back to tier list' }}
            secondary={{
              href: '/guides/beginner-guide',
              label: 'See beginner route',
            }}
          />
        }
        backgroundImageSrc={placeholderImages.stand}
        backgroundImageAlt="Star Platinum placeholder stand art"
        mediaLabel="Stand art placeholder"
        aside={
          <AsidePanel
            title="Quick verdict"
            description="This page is built to answer the time-investment question first, then support that answer with the data points players care about."
            items={[
              { label: 'Verdict', value: 'High-value chase target' },
              {
                label: 'Why it matters',
                value: 'Strong pressure and versatility',
              },
              {
                label: 'Best companion pages',
                value: 'Tier list and beginner guide',
              },
            ]}
          />
        }
      />

      <SectionFrame
        eyebrow="Quick verdict"
        title="Why the page leads with a recommendation."
        description="A stand page should not begin with lore or trivia. The first question is whether this stand deserves a player's time."
      >
        <CardGrid
          columns={3}
          items={[
            {
              title: 'Worth chasing',
              meta: 'Summary',
              description: starPlatinum.quickVerdict,
            },
            {
              title: 'Best for',
              meta: 'Use case',
              description: starPlatinum.bestFor,
            },
            {
              title: 'Main caution',
              meta: 'Tradeoff',
              description:
                'A premium target still needs context from the tier list and your current progression stage.',
            },
          ]}
        />
      </SectionFrame>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionFrame
          eyebrow="How to get"
          title="Acquisition notes should be concise and actionable."
        >
          <OrderedChecklist
            items={starPlatinum.howToGet.map((item) => ({
              title: item,
              description:
                item === starPlatinum.howToGet[0]
                  ? 'Acquisition advice should always be tied to current live conditions and update notes.'
                  : item === starPlatinum.howToGet[1]
                    ? 'Players need an honest sense of the grind before they begin.'
                    : 'If a lower-cost alternative offers similar value, the page should say so.',
            }))}
          />
        </SectionFrame>

        <SectionFrame
          eyebrow="Abilities"
          title="Ability summaries should explain role, not just list names."
        >
          <CardGrid columns={2} items={[...starPlatinum.abilities]} />
        </SectionFrame>
      </div>

      <SectionFrame
        eyebrow="Strengths vs weaknesses"
        title="The sample page needs clear tradeoffs, not blind praise."
      >
        <SplitNotes
          leftTitle="Strengths"
          leftItems={starPlatinum.strengths}
          rightTitle="Weaknesses"
          rightItems={starPlatinum.weaknesses}
        />
      </SectionFrame>

      <SectionFrame
        eyebrow="Alternatives and related links"
        title="Every stand page should branch into the broader site structure."
      >
        <CardGrid
          columns={3}
          items={[
            {
              title: 'Tier List',
              description:
                'Return to the ranking page to compare Star Platinum with the current top competitors.',
              href: '/tier-list',
            },
            {
              title: 'Stand Hub',
              description:
                'Go back to the stand index if you want to compare Star Platinum against several quicker stand cards first.',
              href: '/stands',
            },
            {
              title: 'Beginner Guide',
              description:
                'Check whether Star Platinum is a smart target for your current progression stage.',
              href: '/guides/beginner-guide',
            },
            {
              title: 'Codes',
              description:
                'Use the codes page first if your next step depends on available rewards or starter resources.',
              href: '/codes',
            },
          ]}
        />
      </SectionFrame>

      <SectionFrame
        eyebrow="FAQ"
        title="What the sample stand page should answer."
      >
        <FaqGrid
          items={[
            {
              question: 'Why does the page start with the verdict?',
              answer:
                'Because the core user need is whether the stand deserves time and resources, not background flavor text.',
            },
            {
              question: 'Why connect this page so heavily to the tier list?',
              answer:
                'Because a stand article should live inside the site decision system, not as an isolated database entry.',
            },
            {
              question:
                'Why add a stand hub before more full stand pages exist?',
              answer:
                'Because players often want a quick comparison layer first. A stand hub lets the site route them into deeper pages more naturally.',
            },
            {
              question:
                'Is this page meant to be the full future database format?',
              answer:
                'It is the MVP template. If this structure performs well, it can scale to more stands later.',
            },
            {
              question: 'Should new players chase Star Platinum immediately?',
              answer:
                'Not automatically. The answer depends on current resources, route efficiency, and what the beginner guide recommends for that stage.',
            },
          ]}
        />
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
