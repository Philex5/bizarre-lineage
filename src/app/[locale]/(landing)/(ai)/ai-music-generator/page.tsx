import { notFound } from 'next/navigation';

export default async function AiMusicGeneratorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  notFound();
}
