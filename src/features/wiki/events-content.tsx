import {
  getWorldEventsContent,
} from '@/content-data/events';
import { Link } from '@/core/i18n/navigation';
import { toImageUrl } from '@/lib/r2-utils';
import AdsterraBanner from '@/shared/components/ads/adsterra_banner';
import { getLocale, getTranslations } from 'next-intl/server';

export async function EventsPageContent() {
  const locale = await getLocale();
  const t = await getTranslations('pages.events.page');
  const content = getWorldEventsContent(locale);
  const heroImageUrl = toImageUrl(content.intro.heroImageSrc);

  return (
    <>
      <p>{content.intro.description}</p>
      <p>{t('editorial_note')}</p>

      <div className="not-prose border-border/70 bg-background/90 my-8 overflow-hidden rounded-3xl border shadow-sm">
        <img
          src={heroImageUrl}
          alt={content.intro.heroImageAlt}
          className="aspect-[16/7] w-full object-cover"
        />
      </div>

      <div className="not-prose my-8">
        <AdsterraBanner />
      </div>

      <h2>{t('quick_answer.title')}</h2>
      <p>{t('quick_answer.summary')}</p>
      <ul>
        {content.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>

      <h2>{t('current_events_title')}</h2>
      <div className="not-prose mt-8 grid gap-6 lg:grid-cols-2">
        {content.events.map((event) => (
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
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="border-border bg-card/85 rounded-2xl border p-4">
                  <div className="text-muted-foreground text-[0.68rem] tracking-[0.2em] uppercase">
                    {t('labels.location')}
                  </div>
                  <p className="text-foreground mt-2 text-sm leading-6">
                    {event.location}
                  </p>
                </div>
                <div className="border-border bg-card/85 rounded-2xl border p-4">
                  <div className="text-muted-foreground text-[0.68rem] tracking-[0.2em] uppercase">
                    {t('labels.recommended_level')}
                  </div>
                  <p className="text-foreground mt-2 text-sm leading-6">
                    {event.recommendedLevel}
                  </p>
                </div>
              </div>
              {event.cadence ? (
                <div className="border-border bg-card/85 mt-3 rounded-2xl border p-4">
                  <div className="text-muted-foreground text-[0.68rem] tracking-[0.2em] uppercase">
                    {t('labels.spawn_timing')}
                  </div>
                  <p className="text-foreground mt-2 text-sm leading-6">
                    {event.cadence}
                  </p>
                </div>
              ) : null}
              <div className="border-border bg-card/85 mt-3 rounded-2xl border p-4">
                <div className="text-muted-foreground text-[0.68rem] tracking-[0.2em] uppercase">
                  {t('labels.what_happens')}
                </div>
                <p className="text-foreground mt-2 text-sm leading-7">
                  {event.details}
                </p>
              </div>
              <div className="border-border bg-card/85 mt-3 rounded-2xl border p-4">
                <div className="text-muted-foreground text-[0.68rem] tracking-[0.2em] uppercase">
                  {t('labels.rewards')}
                </div>
                <ul className="text-foreground mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                  {event.rewards.map((reward) => (
                    <li key={reward}>{reward}</li>
                  ))}
                </ul>
              </div>
              {event.key === 'world-boss-dio' ? (
                <div className="border-border bg-card/85 mt-3 rounded-2xl border p-4">
                  <div className="text-muted-foreground text-[0.68rem] tracking-[0.2em] uppercase">
                    Related
                  </div>
                  <p className="text-foreground mt-2 text-sm leading-7">
                    Looking for the 8-player DIO Raid instead of the Cairo
                    Streets event? Read the{' '}
                    <Link href="/guides/dio-raid" className="text-primary">
                      full DIO Raid guide
                    </Link>
                    .
                  </p>
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      <h2>{t('cooldown_loop.title')}</h2>
      <p>{t('cooldown_loop.description')}</p>

      <h2>{t('read_next')}</h2>
      <div className="not-prose mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {content.relatedLinks.map((item) => (
          <Link
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
          </Link>
        ))}
      </div>
    </>
  );
}
