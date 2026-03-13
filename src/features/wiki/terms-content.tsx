import { Fragment } from 'react';
import {
  getTermEntry,
  getTermsDictionary,
  type TermBlock,
  type TermKey,
  type TermLink,
  type TermSection,
} from '@/content-data/terms';
import { Link } from '@/core/i18n/navigation';
import { toImageUrl } from '@/lib/r2-utils';
import { getLocale, getTranslations } from 'next-intl/server';
import AdsterraBanner from '@/shared/components/ads/adsterra_banner';

import { SubAbilitiesInlineModule } from './sub-abilities-overview';

function SmartLink({ href, label }: TermLink) {
  if (href.startsWith('http')) {
    return (
      <a href={href} target="_blank" rel="nofollow noopener noreferrer">
        {label}
      </a>
    );
  }

  return <Link href={href}>{label}</Link>;
}

function renderBlock(block: TermBlock, index: number) {
  switch (block.type) {
    case 'paragraph':
      return <p key={index}>{block.text}</p>;
    case 'list':
      return (
        <ul key={index}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case 'table':
      return (
        <div key={index}>
          {block.note ? <p>{block.note}</p> : null}
          <table>
            <thead>
              <tr>
                {block.columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={`${rowIndex}-${row.join('-')}`}>
                  {row.map((cell, cellIndex) => (
                    <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'cards':
      return (
        <div
          key={index}
          className="not-prose mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {block.items.map((item) => (
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
      );
    default:
      return null;
  }
}

function TermSectionContent({ section }: { section: TermSection }) {
  return (
    <>
      <h2>{section.title}</h2>
      {section.blocks.map((block, index) => renderBlock(block, index))}
    </>
  );
}

export async function TermsHubContent() {
  const locale = await getLocale();
  const dictionary = getTermsDictionary(locale);

  return (
    <div className="not-prose mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {dictionary.hub.cards.map((termKey) => {
        const term = dictionary.terms[termKey];
        const heroImageUrl = toImageUrl(term.heroImageSrc);

        return (
          <Link
            key={termKey}
            href={`/${term.slug}`}
            className="group ring-primary/10 hover:border-border border-border/70 block overflow-hidden rounded-3xl border shadow-sm ring-1 transition-colors transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative min-h-[220px]">
              <img
                src={heroImageUrl}
                alt={term.heroImageAlt}
                className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="from-background via-background/72 to-background/10 absolute inset-0 bg-gradient-to-t" />
              <div className="relative flex h-full flex-col justify-end p-6">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="text-foreground text-lg font-semibold">
                    {term.cardTitle}
                  </div>
                  <div className="text-muted-foreground group-hover:text-primary pointer-events-none -translate-x-1 translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100">
                    ↗
                  </div>
                </div>
                <p className="text-muted-foreground mt-3 text-sm leading-6">
                  {term.cardDescription}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export async function TermArticleContent({ termKey }: { termKey: TermKey }) {
  const locale = await getLocale();
  const t = await getTranslations('pages.terms.article');
  const term = getTermEntry(termKey, locale);
  const heroImageUrl = toImageUrl(term.heroImageSrc);
  const isSubAbilitiesTerm = termKey === 'sub-abilities';
  const recommendationSectionIndex = term.sections.findIndex((section) =>
    section.blocks.some((block) => block.type === 'cards')
  );

  return (
    <>
      {term.intro.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      <div className="not-prose border-border/70 bg-background/90 my-8 overflow-hidden rounded-3xl border shadow-sm">
        <img
          src={heroImageUrl}
          alt={term.heroImageAlt}
          className="aspect-[16/7] w-full object-cover"
        />
      </div>

      {isSubAbilitiesTerm ? <SubAbilitiesInlineModule /> : null}

      {term.sections.map((section) => {
        if (
          term.videos &&
          term.videos.length > 0 &&
          term.sections.indexOf(section) === recommendationSectionIndex
        ) {
          return (
            <Fragment key="videos-before-recommendations">
              <h2>{t('watch_guide')}</h2>
              <div className="not-prose mt-8 mb-12 grid gap-6 lg:grid-cols-3">
                {term.videos.map((item) => (
                  <div
                    key={item.embedUrl}
                    className="border-border bg-background/50 overflow-hidden rounded-2xl border"
                  >
                    <div className="aspect-video">
                      <iframe
                        src={item.embedUrl}
                        title={item.title}
                        className="h-full w-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-foreground line-clamp-2 text-base font-semibold">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground mt-2 line-clamp-3 text-sm leading-6">
                        {item.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="not-prose mb-12">
                <AdsterraBanner />
              </div>
              <TermSectionContent key={section.title} section={section} />
            </Fragment>
          );
        }
        return <TermSectionContent key={section.title} section={section} />;
      })}

      {recommendationSectionIndex === -1 &&
        term.videos &&
        term.videos.length > 0 && (
          <>
            <h2>{t('watch_guide')}</h2>
            <div className="not-prose mt-8 mb-12 grid gap-6 lg:grid-cols-3">
              {term.videos.map((item) => (
                <div
                  key={item.embedUrl}
                  className="border-border bg-background/50 overflow-hidden rounded-2xl border"
                >
                  <div className="aspect-video">
                    <iframe
                      src={item.embedUrl}
                      title={item.title}
                      className="h-full w-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-foreground line-clamp-2 text-base font-semibold">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground mt-2 line-clamp-3 text-sm leading-6">
                      {item.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="not-prose mb-12">
              <AdsterraBanner />
            </div>
          </>
        )}

      <h2>{t('official_references')}</h2>
      <ul>
        {term.references.map((reference) => (
          <li key={reference.href}>
            <SmartLink {...reference} />
          </li>
        ))}
      </ul>

      <h2>{t('related_links')}</h2>
      <ul>
        {term.relatedLinks.map((link) => (
          <li key={link.href}>
            <SmartLink {...link} />
          </li>
        ))}
      </ul>
    </>
  );
}
