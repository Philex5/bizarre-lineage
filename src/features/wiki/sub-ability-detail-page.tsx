import Image from 'next/image';
import {
  getSubAbilityBySlug,
  officialSubAbilitySource,
} from '@/content-data/sub-abilities';
import { BookOpenText, Compass, ShieldAlert, Sparkles } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { envConfigs } from '@/config';
import AdsterraBanner from '@/shared/components/ads/adsterra_banner';
import { Button } from '@/shared/components/ui/button';

import { SectionFrame } from './primitives';

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
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

export function SubAbilityDetailPage({ slug }: { slug: string }) {
  const ability = getSubAbilityBySlug(slug);

  if (!ability) {
    return null;
  }

  const canonicalUrl = `${envConfigs.app_url}/terms/sub-abilities/${ability.slug}`;

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: `${ability.name} in Bizarre Lineage`,
          description: ability.teaser,
          mainEntityOfPage: canonicalUrl,
          about: ability.name,
          dateModified: officialSubAbilitySource.verifiedAt,
        }}
      />

      <div className="not-prose my-10 space-y-8">
        <SectionFrame
          eyebrow="Sub-Ability Snapshot"
          title={`${ability.name} at a glance`}
          description="This page keeps the top section informational only: no hero block, just the image, route, location, and source entry points."
        >
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_22rem]">
            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: 'Route type', value: ability.routeType },
                  { label: 'Trainer / NPC', value: ability.trainerOrNpc },
                  { label: 'Checked', value: ability.verifiedAt },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="border-border bg-background/72 rounded-[1.25rem] border p-4"
                  >
                    <p className="text-muted-foreground text-[0.72rem] tracking-[0.18em] uppercase">
                      {item.label}
                    </p>
                    <p className="text-foreground mt-3 text-sm leading-7">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-border bg-background/80 rounded-[1.6rem] border p-5">
                <p className="text-muted-foreground text-[0.72rem] tracking-[0.18em] uppercase">
                  Quick read
                </p>
                <p className="text-foreground mt-3 text-base leading-7">
                  {ability.teaser}
                </p>
                <p className="text-muted-foreground mt-4 text-sm leading-7">
                  {ability.locationSummary}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <a
                    href={ability.officialSourceUrl}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    Open Official Card
                    <Compass className="size-4" />
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/terms/sub-abilities">Back to Overview</Link>
                </Button>
              </div>
            </div>

            <div className="border-border bg-background/88 overflow-hidden rounded-[1.6rem] border p-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.3rem]">
                <Image
                  src={ability.heroImageUrl}
                  alt={ability.heroImageAlt}
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1280px) 100vw, 22rem"
                />
              </div>
            </div>
          </div>
        </SectionFrame>

        <div className="px-1">
          <AdsterraBanner />
        </div>

        <SectionFrame
          eyebrow="Quick read"
          title={`How to unlock ${ability.name}`}
          description="This section keeps the route short and literal, using only the current official Trello wording plus light guide cleanup."
        >
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_18rem]">
            <div className="border-border bg-background/80 rounded-[1.6rem] border p-5">
              <ul className="space-y-3">
                {ability.unlockSteps.map((item) => (
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
                NPC / route anchor
              </p>
              <p className="text-foreground mt-3 text-lg font-semibold tracking-[-0.03em]">
                {ability.trainerOrNpc}
              </p>
              <p className="text-muted-foreground mt-3 text-sm leading-7">
                {ability.locationSummary}
              </p>
            </div>
          </div>
        </SectionFrame>

        <SectionFrame
          eyebrow="Moveset"
          title={`${ability.name} official move breakdown`}
          description="Move descriptions are rewritten into guide language, but the move list itself comes from the official Trello card."
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {ability.moves.map((move) => (
              <MoveCard
                key={move.name}
                title={move.name}
                description={move.summary}
              />
            ))}
          </div>
        </SectionFrame>

        <SectionFrame
          eyebrow="Guide read"
          title="What this sub-ability is really offering"
          description="These bullets are still grounded in the official card, but organized like a decision page instead of a raw ability dump."
        >
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="border-border bg-background/82 rounded-[1.6rem] border p-5">
              <ul className="space-y-3">
                {ability.highlights.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="bg-primary mt-2 size-2 rounded-full" />
                    <span className="text-muted-foreground text-sm leading-7">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-border bg-background/82 rounded-[1.6rem] border p-5">
              <p className="text-muted-foreground flex items-center gap-2 text-[0.72rem] tracking-[0.18em] uppercase">
                <Sparkles className="size-4" />
                Source note
              </p>
              <p className="text-muted-foreground mt-3 text-sm leading-7">
                {ability.caveat ??
                  'This page is based on the official Trello card and keeps the route description intentionally conservative when the board is vague.'}
              </p>
            </div>
          </div>
        </SectionFrame>

        <SectionFrame
          eyebrow="Next steps"
          title="Keep your route connected to the rest of the guide site"
          description="Use the sub-ability hub to compare the other options, then move into broader progression guides if you still need a cleaner route."
        >
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/terms/sub-abilities">All Sub-Abilities</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/terms/fighting-styles">Fighting Styles</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/guides/beginner-guide">
                Beginner Guide
                <BookOpenText className="size-4" />
              </Link>
            </Button>
          </div>
        </SectionFrame>

        <section className="border-border bg-card/85 rounded-[1.6rem] border p-5">
          <div className="flex items-start gap-3">
            <ShieldAlert className="text-primary mt-0.5 size-5 shrink-0" />
            <p className="text-muted-foreground text-sm leading-7">
              This page uses the official Trello card checked on{' '}
              {officialSubAbilitySource.verifiedAt}. If the board uses
              placeholder text, like Spin currently does, this page preserves
              that uncertainty instead of filling in missing data from
              unofficial sources.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
