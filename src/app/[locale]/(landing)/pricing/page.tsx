import { notFound } from 'next/navigation';

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  notFound();
}
