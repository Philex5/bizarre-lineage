import { Metadata } from 'next';
import { buildMetadata, StandsHubPage } from '@/features/wiki/pages';
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
    path: '/stands',
    title: 'Bizarre Lineage Stands Guide: Tier List & Acquisition',
    description:
      'The complete Bizarre Lineage stands index. Browse stand cards with current tier labels, acquisition notes, and fast verdicts for every stand in-game.',
    keywords: [
      'bizarre lineage stands',
      'bizarre lineage stand guide',
      'bizarre lineage stand tier list',
      'bizarre lineage best stand',
      'bizarre lineage stand acquisition',
    ],
  });
}

export default async function StandsHubRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <StandsHubPage />;
}
