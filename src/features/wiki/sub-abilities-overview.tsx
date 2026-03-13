import Image from 'next/image';
import {
  officialSubAbilitySource,
  subAbilities,
} from '@/content-data/sub-abilities';
import { ArrowRight, Compass, MapPinned, Sparkles } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
export function SubAbilitiesInlineModule() {
  return (
    <section className="not-prose my-10 space-y-6">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="border-border bg-background/92 rounded-[1.75rem] border p-6 shadow-sm">
          <p className="text-muted-foreground text-[0.72rem] tracking-[0.2em] uppercase">
            Sub-type routes
          </p>
          <h2 className="text-foreground mt-3 text-2xl font-semibold tracking-[-0.03em]">
            Pick the route before you plan the build
          </h2>
          <p className="text-muted-foreground mt-3 text-sm leading-7">
            Ripple, Cyborg, and Spin are trainer-led questlines, while Vampire
            starts with a mask and continues through the Elder Vampire route.
            That split is the fastest way to understand why sub-abilities do
            not share one universal unlock path.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.35rem] border border-black/6 bg-black/[0.03] p-4 dark:border-white/8 dark:bg-white/[0.03]">
              <p className="text-muted-foreground flex items-center gap-2 text-[0.68rem] tracking-[0.18em] uppercase">
                <MapPinned className="size-4" />
                Trainer path
              </p>
              <p className="text-foreground mt-2 text-sm leading-6">
                Ripple, Cyborg, and Spin depend on finding the right NPC and
                finishing that route.
              </p>
            </div>
            <div className="rounded-[1.35rem] border border-black/6 bg-black/[0.03] p-4 dark:border-white/8 dark:bg-white/[0.03]">
              <p className="text-muted-foreground flex items-center gap-2 text-[0.68rem] tracking-[0.18em] uppercase">
                <Sparkles className="size-4" />
                Item path
              </p>
              <p className="text-foreground mt-2 text-sm leading-6">
                Vampire needs the mask first, then the Elder Vampire quest for
                the real move unlocks.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="bg-background/92 rounded-[1.5rem] border border-white/10 p-5 shadow-sm">
            <p className="text-muted-foreground text-[0.72rem] tracking-[0.2em] uppercase">
              Checked
            </p>
            <p className="text-foreground mt-3 text-2xl font-semibold tracking-[-0.03em]">
              {officialSubAbilitySource.verifiedAt}
            </p>
            <p className="text-muted-foreground mt-2 text-sm leading-6">
              Source baseline: current official Trello board and route cards.
            </p>
          </div>
          <div className="bg-background/92 rounded-[1.5rem] border border-white/10 p-5 shadow-sm">
            <p className="text-muted-foreground flex items-center gap-2 text-[0.72rem] tracking-[0.2em] uppercase">
              <Compass className="size-4" />
              Source note
            </p>
            <p className="text-muted-foreground mt-3 text-sm leading-7">
              Spin still has placeholder acquisition text on the official card,
              so its detail page keeps that uncertainty visible instead of
              inventing a trainer location.
            </p>
            <a
              href={officialSubAbilitySource.boardUrl}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="text-primary mt-4 inline-flex items-center gap-2 text-sm font-medium"
            >
              Open official Trello
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {subAbilities.map((ability, index) => (
          <Link
            key={ability.key}
            href={`/terms/sub-abilities/${ability.slug}`}
            className="group border-border bg-background/92 relative overflow-hidden rounded-[1.8rem] border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={ability.heroImageUrl}
                alt={ability.heroImageAlt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_18%,rgba(9,9,11,0.78)_100%)]" />
              <div className="absolute top-5 left-5 rounded-full border border-white/18 bg-black/35 px-3 py-1 text-[0.72rem] tracking-[0.18em] text-white uppercase backdrop-blur-sm">
                {String(index + 1).padStart(2, '0')} · {ability.routeType}
              </div>
              <div className="absolute inset-x-5 bottom-5 text-white">
                <h3 className="font-serif text-3xl tracking-[-0.04em]">
                  {ability.name}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-6 text-white/82">
                  {ability.teaser}
                </p>
              </div>
            </div>

            <div className="grid gap-4 p-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.25rem] border border-black/5 bg-black/[0.03] p-4 dark:border-white/8 dark:bg-white/[0.03]">
                  <p className="text-muted-foreground text-[0.68rem] tracking-[0.18em] uppercase">
                    Unlock anchor
                  </p>
                  <p className="text-foreground mt-2 text-sm leading-6">
                    {ability.trainerOrNpc}
                  </p>
                </div>
                <div className="rounded-[1.25rem] border border-black/5 bg-black/[0.03] p-4 dark:border-white/8 dark:bg-white/[0.03]">
                  <p className="text-muted-foreground text-[0.68rem] tracking-[0.18em] uppercase">
                    Location
                  </p>
                  <p className="text-foreground mt-2 text-sm leading-6">
                    {ability.locationSummary}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-sm">
                  View full {ability.name} detail page
                </p>
                <span className="text-primary inline-flex items-center gap-2 text-sm font-medium tracking-[0.18em] uppercase">
                  Open
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
