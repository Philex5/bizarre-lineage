import { Metadata } from 'next';
import { buildMetadata, StandsHubPage } from '@/features/wiki/pages';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.stands' });

  return buildMetadata({
    locale,
    path: '/stands',
    title: t('metadata.title'),
    description: t('metadata.description'),
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
