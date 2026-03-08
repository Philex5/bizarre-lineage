import { notFound } from 'next/navigation';

export default async function AiVideoGeneratorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  notFound();
}
