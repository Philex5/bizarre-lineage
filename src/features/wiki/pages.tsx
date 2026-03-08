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
import { stands, starPlatinum, type StandEntry } from '@/content-data/stands';
import {
  bestForCards,
  tierListEntries,
  tierMethodology,
} from '@/content-data/tier-list';
import { ArrowUpRight, Trophy } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { envConfigs } from '@/config';
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

export function HomePage() {
  const featuredStands = stands.slice(0, 3);
  const progressionSteps = [
    {
      title: 'Get a usable stand',
      description:
        'Start with something practical enough to clear content and learn the game before committing to a premium chase.',
      href: '/guides/beginner-guide',
      hrefLabel: 'Beginner Guide',
    },
    {
      title: 'Build around it',
      description:
        'Your stand gets stronger or weaker depending on stats, style choices, and how disciplined your route is.',
      href: '/guides/stats',
      hrefLabel: 'Stats Guide',
    },
    {
      title: 'Push progression',
      description:
        'Use codes, basic routing, and stable PvE progress to build momentum instead of burning resources too early.',
      href: '/codes',
      hrefLabel: 'Latest Codes',
    },
    {
      title: 'Unlock mid-game systems',
      description:
        'Raids, awakening paths, and stronger build decisions matter more once the first stand and stat mistakes are under control.',
    },
    {
      title: 'Decide when to prestige',
      description:
        'Prestige works best when you already know what the reset unlocks and what value you need to bank first.',
      href: '/guides/prestige',
      hrefLabel: 'Prestige Guide',
    },
  ];
  const heroStats = [
    { label: 'Updated', value: '2026-03-08' },
    { label: 'Codes Tracked', value: String(activeCodes.length) },
    { label: 'Top Sample Pick', value: starPlatinum.name },
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
        text: 'Beginners should usually prioritize a stand that is easy to use, stable for progression, and does not force an expensive chase immediately.',
      },
    },
    {
      '@type': 'Question',
      name: 'When should you prestige?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Prestige when your current route is capped, you have prepared key resources, and you already know the first goal after resetting.',
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
        eyebrow="Bizarre Lineage Wiki"
        title="Bizarre Lineage Wiki for Codes, Tier List, Stands, Leveling and Progression"
        dek="Bizarre Lineage is a Roblox RPG built around stands, fighting styles, stats, and reset-driven progression. This Bizarre Lineage wiki helps you check Bizarre Lineage codes, compare the Bizarre Lineage tier list, review Bizarre Lineage stands, and plan a cleaner route from beginner progress to prestige."
        stats={heroStats}
        actions={
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full px-6 text-sm tracking-[0.16em] uppercase"
            >
              <Link href="/codes">Latest Codes</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/16 bg-white/8 px-6 text-sm tracking-[0.16em] text-white uppercase backdrop-blur-sm hover:bg-white/14"
            >
              <Link href="/tier-list">Tier List</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/16 bg-white/8 px-6 text-sm tracking-[0.16em] text-white uppercase backdrop-blur-sm hover:bg-white/14"
            >
              <Link href="/guides/beginner-guide">Beginner Guide</Link>
            </Button>
          </div>
        }
        backgroundImageSrc={placeholderImages.hero}
        backgroundImageAlt="Bizarre Lineage hero key art placeholder"
      />

      <SectionFrame
        eyebrow="What Is Bizarre Lineage"
        title="A Bizarre Lineage wiki homepage should explain the game and get players to the right answer fast."
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,34rem)] lg:items-center lg:gap-10">
          <div className="space-y-5">
            <p className="text-muted-foreground max-w-2xl text-sm leading-7 md:text-base">
              Bizarre Lineage Roblox players usually need the same first
              answers: which stand to chase, how stats affect progression, and
              where to look for reliable update notes. This homepage works as a
              Bizarre Lineage wiki hub instead of a thin landing page, so new
              visitors can move directly into the page that matches their
              search.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="rounded-full">
                <Link href="/stands">Stands</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/guides/beginner-guide">Beginner Guide</Link>
              </Button>
            </div>
          </div>

          <div className="border-border bg-background/70 relative overflow-hidden rounded-[1.8rem] border shadow-md">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,color-mix(in_oklab,var(--color-primary)_14%,transparent)_0,transparent_38%),linear-gradient(180deg,transparent_0%,color-mix(in_oklab,var(--color-foreground)_10%,transparent)_100%)]" />
            <div className="relative aspect-[16/9]">
              <Image
                src="/placeholders/introduction.webp"
                alt="Bizarre Lineage introduction artwork"
                fill
                sizes="(min-width: 1024px) 34rem, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame
        eyebrow="Quick Access"
        title="Start With the Page You Actually Need"
        description="Whether you searched Bizarre Lineage codes, Bizarre Lineage tier list, Bizarre Lineage best stand, or Bizarre Lineage beginner guide, these are the pages most players open first."
      >
        <CardGrid
          columns={3}
          items={[
            {
              title: 'Codes',
              meta: `${activeCodes.length} tracked entries`,
              description:
                'Check live and monitored codes first so you do not slow your opener with outdated lists.',
              href: '/codes',
            },
            {
              title: 'Tier List',
              meta: 'Meta snapshot',
              description:
                'Open the current stand rankings when you need route value, not just raw rarity hype.',
              href: '/tier-list',
            },
            {
              title: 'Stands',
              meta: `${stands.length} sample stand cards`,
              description:
                'Compare stands by tier, best use case, and quick verdict before committing resources.',
              href: '/stands',
            },
            {
              title: 'Stats Guide',
              meta: 'Build basics',
              description:
                'Use the stats page to avoid early point allocation mistakes that quietly ruin progression.',
              href: '/guides/stats',
            },
            {
              title: 'Prestige Guide',
              meta: 'Reset timing',
              description:
                'Read this before pressing prestige just because the option appears.',
              href: '/guides/prestige',
            },
            {
              title: 'Terms',
              meta: 'Glossary',
              description:
                'Use the glossary for raid, prestige, awakening, and other route terms that new players often search separately.',
              href: '/terms',
            },
          ]}
        />
      </SectionFrame>

      <SectionFrame
        eyebrow="Progression Route"
        title="From your first stand to your first prestige"
        description="The early game gets much cleaner if you treat stands, stats, codes, leveling, and prestige as one route instead of five separate problems, which is why the homepage also points toward future Bizarre Lineage leveling guide coverage."
      >
        <OrderedChecklist items={progressionSteps} />
      </SectionFrame>

      <SectionFrame
        eyebrow="Stand & Meta Preview"
        title="Top Stand Picks Right Now"
        description="Use this preview when you need a fast read on the Bizarre Lineage stands conversation before opening the full Bizarre Lineage tier list or deciding what counts as a practical Bizarre Lineage best stand for your route."
      >
        <div className="grid gap-4">
          <div className="flex items-end justify-between gap-4">
            <p className="text-muted-foreground max-w-3xl text-sm leading-7 md:text-base">
              These are strong reference picks when you want a quick read on the
              current stand conversation before opening the full tier list.
            </p>
            <Link
              href="/tier-list"
              className="text-muted-foreground hover:text-foreground border-border bg-background/92 inline-flex shrink-0 items-center gap-2 self-end rounded-full border px-3 py-2 text-xs font-medium tracking-[0.16em] uppercase transition-colors"
            >
              <Trophy className="size-4" />
              Tier List
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
              All Stands
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame
        eyebrow="Sources & Verification"
        title="Where this Bizarre Lineage wiki checks public information first"
        description="For live verification, the highest-value public sources are the official Bizarre Lineage Roblox page, Bizarre Lineage Discord for update chatter and code drops, and Bizarre Lineage Trello for system notes. These source links also support later Bizarre Lineage map and Bizarre Lineage NPC locations research."
      >
        <CardGrid
          columns={3}
          items={[
            ...officialLinks.map((item) => ({
              title: item.label,
              meta: 'Primary source',
              description: item.note,
              href: item.href,
              target: '_blank',
            })),
            {
              title: 'Wiki-style coverage',
              meta: 'Search intent',
              description:
                'Players often search for a Bizarre Lineage wiki before they know whether they need codes, stands, leveling help, or prestige answers.',
              href: '/codes',
            },
            {
              title: 'Map and NPC research',
              meta: 'Planned expansion',
              description:
                'Bizarre Lineage map and Bizarre Lineage NPC locations queries matter because progression routes depend on navigation as much as build choices.',
              href: '/guides/beginner-guide',
            },
            {
              title: 'Progression references',
              meta: 'Route logic',
              description:
                'The strongest homepage paths connect codes, tier list decisions, stats, leveling, and prestige instead of treating them as isolated articles.',
              href: '/guides/prestige',
            },
          ]}
        />
      </SectionFrame>

      <SectionFrame
        eyebrow="Sources & Verification"
        title="Where this Bizarre Lineage wiki checks public information first"
        description="For live verification, the highest-value public sources are the official Bizarre Lineage Roblox page, Bizarre Lineage Discord for update chatter and code drops, and Bizarre Lineage Trello for system notes. These source links also support later Bizarre Lineage map and Bizarre Lineage NPC locations research."
      >
        <CardGrid
          columns={3}
          items={[
            ...officialLinks.map((item) => ({
              title: item.label,
              meta: 'Primary source',
              description: item.note,
              href: item.href,
              target: '_blank',
            })),
            {
              title: 'Wiki-style coverage',
              meta: 'Search intent',
              description:
                'Players often search for a Bizarre Lineage wiki before they know whether they need codes, stands, leveling help, or prestige answers.',
              href: '/codes',
            },
            {
              title: 'Map and NPC research',
              meta: 'Planned expansion',
              description:
                'Bizarre Lineage map and Bizarre Lineage NPC locations queries matter because progression routes depend on navigation as much as build choices.',
              href: '/guides/beginner-guide',
            },
            {
              title: 'Progression references',
              meta: 'Route logic',
              description:
                'The strongest homepage paths connect codes, tier list decisions, stats, leveling, and prestige instead of treating them as isolated articles.',
              href: '/guides/prestige',
            },
          ]}
        />
      </SectionFrame>

      <SectionFrame
        eyebrow="Common Questions"
        title="Common Questions"
        description="These are the questions new and returning players usually need answered before choosing their next page, especially after searching Bizarre Lineage wiki, Bizarre Lineage best stand, or Bizarre Lineage Roblox help terms."
      >
        <FaqGrid
          items={[
            homeFaq[0],
            homeFaq[3],
            {
              question: 'What is the best stand for beginners?',
              answer:
                'The best beginner stand is usually the one that is stable, easy to use, and does not force a costly reroll chase too early.',
            },
            {
              question: 'When should you prestige?',
              answer:
                'Prestige when your route is slowing down, important value is already secured, and you know what the reset is helping you unlock.',
            },
            {
              question: 'Should beginners chase an S-tier stand immediately?',
              answer:
                'Usually no. A strong route starts with a stand you can actually use well, then upgrades into premium targets once your resources and progression are more stable.',
            },
            {
              question: 'Why do stats matter so early in Bizarre Lineage?',
              answer:
                'Because bad early stat spending can slow both PvE progress and later build options. Even a strong stand feels worse if the build around it is inefficient.',
            },
            {
              question: 'Do codes matter after the first session?',
              answer:
                'Yes. Codes are useful whenever they give spins, arrows, or progression value that saves time on your current route.',
            },
            {
              question:
                'Is prestige always worth taking as soon as it unlocks?',
              answer:
                'No. Prestige is strongest when you understand what you gain, what you might lose, and what your next route looks like after resetting.',
            },
            {
              question: 'What should I read after checking the homepage?',
              answer:
                'Most players move next to the codes page, the tier list, the beginner guide, or a stand page depending on whether they need rewards, rankings, route help, or a specific stand answer.',
            },
          ]}
        />
      </SectionFrame>
    </PageShell>
  );
}

export function CodesPage() {
  return (
    <PageShell accent="ember">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What are the active Bizarre Lineage codes right now?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Use the active codes table at the top of the page first. It separates currently tracked entries from expired codes so players can test the shortest list possible.',
              },
            },
            {
              '@type': 'Question',
              name: 'Why are some codes marked as monitor instead of active?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Because the page should distinguish between fully verified entries and codes that need another in-game pass after a patch or reset.',
              },
            },
            {
              '@type': 'Question',
              name: 'Why are expired codes separated?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Expired codes stay visible for context, but they should not crowd out the working list that urgent visitors need first.',
              },
            },
            {
              '@type': 'Question',
              name: 'What should I read after checking the codes page?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Most players move next to the tier list for meta context, the beginner guide for route planning, or the stand index for deeper build research.',
              },
            },
          ],
        }}
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.95fr)]">
        <SectionFrame
          eyebrow="Codes tracker"
          title="Bizarre Lineage codes should resolve the main question immediately: what is still worth redeeming."
          description="This page skips the oversized hero and opens with the verification model instead. Active entries stay first, monitor labels explain uncertainty, and the expired archive remains visible without slowing down urgent checks."
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
          eyebrow="Page notes"
          title="The layout is built for fast scans, not filler."
        >
          <CardGrid
            columns={2}
            items={[
              {
                title: 'Last verified',
                meta: 'Freshness signal',
                description: '2026-03-08',
              },
              {
                title: 'Tracked active entries',
                meta: 'Current table size',
                description: String(activeCodes.length),
              },
              {
                title: 'Best next move',
                meta: 'After redeeming',
                description:
                  'Jump into the tier list, beginner guide, or stand index instead of stopping at the reward claim.',
              },
            ]}
          />
        </SectionFrame>
      </div>

      <SectionFrame
        id="active-codes"
        eyebrow="Active codes"
        title="Start with the entries players can act on right now."
        description="The table keeps the required fields stable: Code, Reward, Status, and Last Verified. That consistency matters more than decorative noise."
      >
        <div className="border-foreground/10 bg-background/75 overflow-hidden rounded-[1.6rem] border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-4">Code</TableHead>
                <TableHead>Reward</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="px-4">Last Verified</TableHead>
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
          eyebrow="Redeem flow"
          title="How to redeem without wasting time."
        >
          <OrderedChecklist items={[...redeemSteps]} />
        </SectionFrame>

        <SectionFrame
          eyebrow="Expired archive"
          title="Old entries stay visible, but they do not lead the page."
        >
          <div className="border-foreground/10 bg-background/75 overflow-hidden rounded-[1.6rem] border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-4">Code</TableHead>
                  <TableHead>Reward</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="px-4">Archive note</TableHead>
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
        eyebrow="Troubleshooting"
        title="Most code failures fall into a few predictable buckets."
      >
        <CardGrid columns={3} items={[...codeFailureReasons]} />
      </SectionFrame>

      <SectionFrame
        eyebrow="Related reads"
        title="What to open after the code check."
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

      <SectionFrame
        eyebrow="FAQ"
        title="Questions readers usually ask after checking Bizarre Lineage codes."
      >
        <FaqGrid
          items={[
            {
              question: 'What are the active Bizarre Lineage codes right now?',
              answer:
                'Use the active table first. It keeps the current tracked entries separate from expired rows so you can test the shortest useful list.',
            },
            {
              question: 'Why does a code show monitor instead of active?',
              answer:
                'Monitor means the code still needs another live verification pass after a patch, reset, or event change. It may still work, but the page should not overstate confidence.',
            },
            {
              question: 'Why keep expired codes on the page at all?',
              answer:
                'Because players often arrive from old videos, Discord posts, or search snippets. A visible archive helps them confirm a code is old without mixing it into the live list.',
            },
            {
              question: 'What should I read after redeeming codes?',
              answer:
                'Most players need the next decision fast: open the tier list for meta context, the beginner guide for route planning, or the stand index for deeper build research.',
            },
          ]}
        />
      </SectionFrame>

      <SectionFrame
        eyebrow="CTA"
        title="Turn the reward claim into a better next decision."
        description="Codes rarely end the session. Use the pages below to decide what to build, farm, or compare once the freebies are claimed."
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
              Open the tier list
            </h3>
            <p className="text-muted-foreground mt-3 text-sm leading-7">
              Check where current stands land before you spend spins, resources,
              or event rewards.
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
              Follow the beginner guide
            </h3>
            <p className="text-muted-foreground mt-3 text-sm leading-7">
              Use a cleaner early-game route if you need levels, farming
              priorities, and fewer wasted resets.
            </p>
          </Link>

          <Link
            href="/stands"
            className="bg-background/92 text-foreground border-border rounded-[1.5rem] border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="text-muted-foreground text-[0.7rem] tracking-[0.2em] uppercase">
              Build research
            </div>
            <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em]">
              Browse the stand index
            </h3>
            <p className="text-muted-foreground mt-3 text-sm leading-7">
              Compare strengths, weaknesses, and obtainment notes before you
              commit to a longer grind.
            </p>
          </Link>
        </div>
      </SectionFrame>
    </PageShell>
  );
}

export function TierListPage() {
  return (
    <PageShell accent="violet">
      <StandsTierBoard />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <SectionFrame
          eyebrow="Representative stands"
          title="The cards explain why a stand earns attention, not just where it lands."
        >
          <CardGrid
            columns={2}
            items={tierListEntries.map((entry) => ({
              title: entry.name,
              meta: `${entry.tier} tier`,
              description: entry.summary,
              href:
                entry.key === 'star-platinum'
                  ? '/stands/star-platinum'
                  : undefined,
            }))}
          />
        </SectionFrame>

        <SectionFrame
          eyebrow="Methodology"
          title="A useful list states its evaluation frame."
        >
          <OrderedChecklist items={[...tierMethodology]} />
        </SectionFrame>
      </div>

      <SectionFrame
        eyebrow="Role picks"
        title="Some readers only want the best option for a specific situation."
      >
        <CardGrid columns={3} items={[...bestForCards]} />
      </SectionFrame>

      <SectionFrame eyebrow="FAQ" title="What the ranking page should clarify.">
        <FaqGrid
          items={[
            {
              question: 'Why link the tier list to a stand page?',
              answer:
                'Because the ranking page should hand off to a database-style article when a stand deserves deeper research.',
            },
            {
              question: 'Why is methodology so visible here?',
              answer:
                'Without methodology, a tier list becomes a subjective chart that is hard to trust and hard to differentiate in search.',
            },
            {
              question: 'Should every stand be in the MVP?',
              answer:
                'No. The MVP uses a representative set and one strong sample page before scaling coverage.',
            },
            {
              question: 'What should new players read after this page?',
              answer:
                'The beginner guide, especially if they understand the meta but still need an early progression route.',
            },
          ]}
        />
      </SectionFrame>
    </PageShell>
  );
}

export function BeginnerGuidePage() {
  return (
    <PageShell accent="jade">
      <HeroFrame
        eyebrow="Beginner guide"
        title="New players need a route for the first 30 minutes, not a wall of lore."
        dek="This guide is structured around anxiety reduction: checklist first, mistakes second, progression path third. It should feel like a field manual you can skim between play sessions."
        stats={[
          { label: 'Audience', value: 'First-time players' },
          { label: 'Reading mode', value: 'Checklist first' },
          { label: 'Reading time', value: beginnerGuide.readingTime },
          { label: 'Updated', value: beginnerGuide.updatedAt },
        ]}
        actions={
          <HeroActions
            primary={{ href: '/codes', label: 'Check codes first' }}
            secondary={{ href: '/tier-list', label: 'Review tier list' }}
          />
        }
        backgroundImageSrc={placeholderImages.guide}
        backgroundImageAlt="Beginner guide placeholder visual"
        mediaLabel="Route visual placeholder"
        aside={
          <AsidePanel
            title="Fast-start brief"
            description="The page is optimized for overwhelmed readers. Every section exists to reduce uncertainty and point to the next useful page."
            items={[
              { label: 'Opens with', value: 'Fast Start Checklist' },
              { label: 'Avoids', value: 'Long paragraphs and fluff' },
              { label: 'Links outward', value: 'Codes, tier list, stand page' },
            ]}
          />
        }
      />

      <SectionFrame
        eyebrow="Fast start checklist"
        title="Give the reader a short route they can execute immediately."
      >
        <OrderedChecklist items={[...beginnerGuide.checklist]} />
      </SectionFrame>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionFrame
          eyebrow="First 30 minutes"
          title="The opening loop should stay practical."
        >
          <CardGrid columns={2} items={[...beginnerGuide.firstThirtyMinutes]} />
        </SectionFrame>

        <SectionFrame
          eyebrow="Mistakes to avoid"
          title="The guide should call out the most expensive beginner errors."
        >
          <CardGrid columns={2} items={[...beginnerGuide.mistakes]} />
        </SectionFrame>
      </div>

      <SectionFrame
        eyebrow="Progression path"
        title="Once the checklist is done, the player needs a calmer medium-term route."
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
