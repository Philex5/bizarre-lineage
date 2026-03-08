import { Metadata } from 'next';
import { buildMetadata, StarPlatinumPage } from '@/features/wiki/pages';
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
    path: '/stands/star-platinum',
    title:
      'Star Platinum Bizarre Lineage Guide - Quick Verdict, Strengths, Route',
    description:
      'Review the Star Platinum Bizarre Lineage page for a quick verdict, current role in the tier list, strengths, weaknesses, and links back into the beginner route.',
    keywords: [
      'star platinum bizarre lineage',
      'bizarre lineage star platinum',
      'how to get star platinum bizarre lineage',
    ],
  });
}

export default async function StarPlatinumRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <StarPlatinumPage />;
}
