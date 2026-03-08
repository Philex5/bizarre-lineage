import { Metadata } from 'next';
import { buildMetadata, HomePage } from '@/features/wiki/pages';
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
    path: '/',
    title: 'Bizarre Lineage Wiki: Codes, Tier List, and Stand Guides',
    description:
      'Master Bizarre Lineage with our complete wiki. Get the latest active codes, updated tier lists, stand evolution guides, and pro strategies to dominate Roblox.',
    keywords: [
    ],
  });
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomePage />;
}
