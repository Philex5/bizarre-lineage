import {
  worldEvents,
  worldEventsIntro,
  worldEventsNotes,
  worldEventsRelatedLinks,
} from '@/content-data/events';
import { toImageUrl } from '@/lib/r2-utils';

export function EventsPageContent() {
  const heroImageUrl = toImageUrl(worldEventsIntro.heroImageSrc);

  return (
    <>
      <p>{worldEventsIntro.description}</p>
      <p>
        This page reflects the official Trello card as checked on March 9, 2026.
        Where the board stays short, this page stays short too.
      </p>

      <div className="not-prose border-border/70 bg-background/90 my-8 overflow-hidden rounded-3xl border shadow-sm">
        <img
          src={heroImageUrl}
          alt={worldEventsIntro.heroImageAlt}
          className="aspect-[16/7] w-full object-cover"
        />
      </div>

      <h2>Quick answer</h2>
      <p>
        Bizarre Lineage world events are official limited-time activities that
        happen server-wide. The current public card shows a{' '}
        <strong>{worldEventsIntro.cooldown}</strong> and names two active
        examples.
      </p>
      <ul>
        {worldEventsNotes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>

      <h2>Current official world events</h2>
      <div className="not-prose mt-8 grid gap-6 lg:grid-cols-2">
        {worldEvents.map((event) => (
          <article
            key={event.key}
            className="border-border bg-background/60 overflow-hidden rounded-3xl border shadow-sm"
          >
            <img
              src={toImageUrl(event.imageSrc)}
              alt={event.imageAlt}
              className="aspect-[16/8] w-full object-cover"
            />
            <div className="p-6">
              <div className="text-muted-foreground text-xs tracking-[0.22em] uppercase">
                {event.mode}
              </div>
              <h3 className="text-foreground mt-3 text-2xl font-semibold tracking-[-0.03em]">
                {event.name}
              </h3>
              <p className="text-muted-foreground mt-3 text-sm leading-7">
                {event.summary}
              </p>
              <div className="border-border bg-card/85 mt-5 rounded-2xl border p-4">
                <div className="text-muted-foreground text-[0.68rem] tracking-[0.2em] uppercase">
                  Official wording
                </div>
                <p className="text-foreground mt-2 text-sm leading-7">
                  {event.officialRule}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <h2>Cooldown and event loop</h2>
      <p>
        The official card currently adds a <strong>20 minute cooldown</strong>{' '}
        note to world events. It does not publish a larger event table, spawn
        map, or extra reward list on this card, so this page keeps that part
        narrow instead of guessing.
      </p>

      <h2>Source and verification</h2>
      <p>
        Source:{' '}
        <a href={worldEventsIntro.sourceHref}>{worldEventsIntro.sourceLabel}</a>
        . The card name is currently blank in the Trello UI, but the historical
        actions and description identify it as the World Events entry.
      </p>

      <h2>Read next</h2>
      <div className="not-prose mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {worldEventsRelatedLinks.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="group bg-background/92 ring-primary/10 hover:border-border hover:bg-accent/30 border-border/70 block rounded-3xl border p-6 shadow-sm ring-1 transition-colors transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="text-foreground text-lg font-semibold">
                {item.title}
              </div>
              <div className="text-muted-foreground group-hover:text-primary pointer-events-none -translate-x-1 translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100">
                ↗
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-6">
              {item.description}
            </p>
          </a>
        ))}
      </div>
    </>
  );
}
