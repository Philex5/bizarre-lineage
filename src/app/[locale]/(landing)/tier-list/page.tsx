import { Metadata } from 'next';
import { buildMetadata, TierListPage } from '@/features/wiki/pages';
import { setRequestLocale } from 'next-intl/server';

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildMetadata({
    locale,
    path: '/tier-list',
    title:
      'Bizarre Lineage Tier List - Interactive Stand Chart and Ranking Logic',
    description:
      'Use an interactive Bizarre Lineage tier list with a clickable stand chart, stand-by-stand detail panel, and ranking logic for PvP and PvE choices.',
    keywords: [
      'bizarre lineage tier list',
      'bizarre lineage best stand',
      'bizarre lineage pvp tier list',
    ],
  });
}

export default async function TierListRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TierListPage />;
}
