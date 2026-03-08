import { notFound } from 'next/navigation';

export default async function AiImageGeneratorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  notFound();
}
