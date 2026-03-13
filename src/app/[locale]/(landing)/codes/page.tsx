import { Metadata } from 'next';
import { buildMetadata, CodesPage } from '@/features/wiki/pages';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.codes' });

  return buildMetadata({
    locale,
    path: '/codes',
    title: t('metadata.title'),
    description: t('metadata.description'),
  });
}

export default async function CodesRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CodesPage />;
}
