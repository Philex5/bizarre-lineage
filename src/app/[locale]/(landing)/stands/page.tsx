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
    title: 'Bizarre Lineage Stands - Stand Cards, Tiers, and Quick Verdicts',
    description:
      'Browse Bizarre Lineage stands in quick info cards with current tier labels, sourced acquisition notes, and fast verdicts for comparison.',
    keywords: [
      'bizarre lineage stands',
      'bizarre lineage stand',
      'bizarre lineage stand tier list',
      'bizarre lineage how to get stand',
      'bizarre lineage stand arrow',
      'bizarre lineage stand chances',
      'bizarre lineage best pvp stand',
      'bizarre lineage best pve stand',
      'bizarre lineage best stands',
      'bizarre lineage stand guide',
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
