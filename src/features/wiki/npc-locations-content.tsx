import {
  fastRoutes,
  npcLocationFaq,
  npcLocations,
  npcLocationsPage,
  npcRegions,
} from '@/content-data/npc-locations';
import {
  ExternalLink,
  Route,
  Users,
  BookOpen,
} from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { envConfigs } from '@/config';

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export async function NpcLocationsPageContent() {
  const faqSchema = npcLocationFaq.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  }));

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: npcLocationsPage.heroTitle,
          url: `${envConfigs.app_url}/npc-locations`,
          description: npcLocationsPage.heroIntro,
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqSchema,
        }}
      />

      <p>{npcLocationsPage.heroIntro}</p>

      <div className="not-prose my-8">
        <div className="border-border bg-background/90 rounded-[1.8rem] border p-6 shadow-sm">
          <h2 className="text-foreground text-2xl font-semibold tracking-[-0.04em]">
            {npcLocationsPage.quickAnswerTitle}
          </h2>
          <p className="text-muted-foreground mt-3 text-sm leading-7">
            {npcLocationsPage.quickAnswerIntro}
          </p>
        </div>
      </div>

      <h2 id="regions" className="scroll-mt-24">{npcLocationsPage.regionSectionTitle}</h2>
      <p>{npcLocationsPage.regionSectionIntro}</p>
      <div className="not-prose mt-6 grid gap-4 lg:grid-cols-2">
        {npcRegions.map((region) => (
          <article
            key={region.key}
            id={`region-${region.key}`}
            className="border-border bg-background/88 rounded-[1.7rem] border p-5 shadow-sm scroll-mt-24"
          >
            <div className="text-muted-foreground text-[0.68rem] tracking-[0.2em] uppercase">
              {region.busStops}
            </div>
            <h3 className="text-foreground mt-2 text-2xl font-semibold tracking-[-0.03em]">
              {region.name}
            </h3>
            <p className="text-muted-foreground mt-3 text-sm leading-7">
              {region.summary}
            </p>
            <p className="text-foreground/88 mt-3 text-sm leading-7">
              {region.whyItMatters}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {region.anchorRoutes.map((item) => (
                <span
                  key={item}
                  className="border-border bg-card/90 rounded-full border px-3 py-1 text-[0.72rem] tracking-[0.16em] uppercase"
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <h2 id="npcs" className="scroll-mt-24">{npcLocationsPage.npcSectionTitle}</h2>
      <p>{npcLocationsPage.npcSectionIntro}</p>
      <div className="not-prose mt-6 grid gap-4 lg:grid-cols-2">
        {npcLocations.map((npc) => (
          <article
            key={npc.key}
            id={`npc-${npc.key}`}
            className="border-border bg-background/88 rounded-[1.7rem] border p-5 shadow-sm scroll-mt-24"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-muted-foreground text-[0.68rem] tracking-[0.2em] uppercase">
                {npc.role}
              </span>
              <span className="border-border bg-card/90 rounded-full border px-2.5 py-1 text-[0.68rem] tracking-[0.16em] uppercase">
                {npc.busStop}
              </span>
              <span className="border-border bg-card/90 rounded-full border px-2.5 py-1 text-[0.68rem] tracking-[0.16em] uppercase">
                {npc.region}
              </span>
            </div>
            <h3 className="text-foreground mt-3 text-2xl font-semibold tracking-[-0.03em]">
              {npc.name}
            </h3>
            <p className="text-muted-foreground mt-3 text-sm leading-7">
              {npc.summary}
            </p>
            <ul className="text-muted-foreground mt-4 space-y-3 text-sm leading-7">
              {npc.routeNotes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="bg-primary mt-2 size-2 rounded-full" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {npc.caution ? (
              <div className="border-primary/24 bg-primary/8 mt-4 rounded-2xl border p-4 text-sm leading-7">
                <span className="text-primary font-semibold">Caution:</span>{' '}
                {npc.caution}
              </div>
            ) : null}
            {npc.relatedHref && npc.relatedLabel ? (
              <div className="mt-5 border-t border-dashed pt-4">
                <Link
                  href={npc.relatedHref}
                  className="text-primary inline-flex items-center gap-2 text-sm font-medium"
                >
                  {npc.relatedLabel}
                  <ExternalLink className="size-3" />
                </Link>
              </div>
            ) : null}
          </article>
        ))}
      </div>

      <h2 id="routing" className="scroll-mt-24">{npcLocationsPage.routingSectionTitle}</h2>
      <p>{npcLocationsPage.routingSectionIntro}</p>
      <div className="not-prose mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {fastRoutes.map((route) => (
          <article
            key={route.title}
            className="border-border bg-background/90 rounded-[1.6rem] border p-5 shadow-sm"
          >
            <div className="text-primary flex items-center gap-2 text-[0.68rem] tracking-[0.2em] uppercase">
              <Route className="size-4" />
              Route
            </div>
            <h3 className="text-foreground mt-3 text-xl font-semibold tracking-[-0.03em]">
              {route.title}
            </h3>
            <p className="text-muted-foreground mt-3 text-sm leading-7">
              {route.description}
            </p>
          </article>
        ))}
      </div>

      <h2 id="faq" className="scroll-mt-24">{npcLocationFaq.length > 0 ? npcLocationsPage.faqTitle : null}</h2>
      <div className="not-prose mt-6 grid gap-4 lg:grid-cols-2">
        {npcLocationFaq.map((item) => (
          <article
            key={item.question}
            className="border-border bg-background/90 rounded-[1.6rem] border p-5 shadow-sm"
          >
            <div className="text-primary flex items-center gap-2 text-[0.68rem] tracking-[0.2em] uppercase">
              <Users className="size-4" />
              FAQ
            </div>
            <h3 className="text-foreground mt-3 text-lg font-semibold tracking-[-0.03em]">
              {item.question}
            </h3>
            <p className="text-muted-foreground mt-3 text-sm leading-7">
              {item.answer}
            </p>
          </article>
        ))}
      </div>

      <h2>Read next</h2>
      <div className="not-prose mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4 border-b border-dashed pb-12 mb-12">
        {[
          {
            href: '/terms/fighting-styles',
            title: 'Fighting styles',
            description:
              'Use this when you need the trainer routes behind Boxing, Kendo, and Karate.',
          },
          {
            href: '/terms/sub-abilities',
            title: 'Sub-abilities',
            description:
              'Open the sub-ability hub for Ripple, Cyborg, Spin, and Vampire route details.',
          },
          {
            href: '/guides/prestige',
            title: 'Prestige guide',
            description:
              'Move here if the Arch Mage route is the real reason you searched for NPC locations.',
          },
          {
            href: '/terms/awakening',
            title: 'Awakening guide',
            description:
              'Use this if you were really searching for Pucci and late-game Journey to Heaven routing.',
          },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group border-border bg-background/90 hover:border-primary/35 block rounded-[1.6rem] border p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <h3 className="text-foreground text-lg font-semibold tracking-[-0.03em]">
              {item.title}
            </h3>
            <p className="text-muted-foreground mt-3 text-sm leading-7">
              {item.description}
            </p>
          </Link>
        ))}
      </div>

      <section className="not-prose mt-12 bg-muted/30 rounded-[2rem] p-8 border border-border/50">
        <div className="flex items-center gap-2 text-primary text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-4">
          <BookOpen className="size-4" />
          References & Sources
        </div>
        <p className="text-muted-foreground text-sm mb-6 max-w-2xl leading-relaxed">
          The routing data above is synthesized from active gameplay and the latest official board updates. For the raw, unorganized developer cards, you can visit the official resource below.
        </p>
        <div className="flex flex-wrap items-center gap-6">
          <a
            href={npcLocationsPage.officialBoardUrl}
            target="_blank"
            rel="noreferrer"
            className="text-foreground hover:text-primary inline-flex items-center gap-2 text-sm font-medium transition-colors"
          >
            Official Bizarre Lineage Trello
            <ExternalLink className="size-4 opacity-50" />
          </a>
          <div className="h-4 w-px bg-border hidden sm:block" />
          <span className="text-muted-foreground text-xs italic">
            Data last verified on {npcLocationsPage.verifiedAt}
          </span>
        </div>
      </section>
    </>
  );
}
