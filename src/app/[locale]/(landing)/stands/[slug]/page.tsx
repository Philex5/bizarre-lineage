import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getOfficialStandDetail } from '@/content-data/stand-details';
import { getStandByKey, getStandSlugs } from '@/content-data/stands';
import { buildMetadata } from '@/features/wiki/pages';
import { StandDetailPage } from '@/features/wiki/stand-detail-page';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export const revalidate = 3600;

export function generateStaticParams() {
  return getStandSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const stand = getStandByKey(slug, locale);

  if (!stand) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'pages.tier-list' });
  const roleEntry = (
    t.raw('page.content.entries') as Array<{
      key: string;
      pvp: string;
      pve: string;
      beginner: string;
    }>
  ).find((entry) => entry.key === slug);

  const roleLine = roleEntry
    ? ` PvP: ${roleEntry.pvp}. PvE: ${roleEntry.pve}. Beginner fit: ${roleEntry.beginner}.`
    : '';

  return buildMetadata({
    locale,
    path: `/stands/${slug}`,
    title: `${stand.name} in Bizarre Lineage - Moveset, Role, How to Get`,
    description: `${stand.quickVerdict} Read the official move breakdown, role fit, strengths, weaknesses, and acquisition route for ${stand.name}.${roleLine}`,
  });
}

export default async function StandDetailRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (!getStandByKey(slug, locale) || !getOfficialStandDetail(slug)) {
    notFound();
  }

  return <StandDetailPage standKey={slug} />;
}
