import { Metadata } from 'next';
import {
  activeCodes,
  expiredCodes,
  monitoredCodeClaims,
} from '@/content-data/codes';
import { buildMetadata } from '@/features/wiki/pages';
import { PageShell, SectionFrame } from '@/features/wiki/primitives';
import { ExternalLink } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';

const lastVerified = '2026-03-08';

const sourceLinks = [
  {
    label: 'Official Roblox Game',
    href: 'https://www.roblox.com/games/14890802310/Bizarre-Lineage',
  },
  {
    label: 'Official Discord',
    href: 'https://discord.com/invite/bizarrelineage',
  },
  {
    label: 'Public Trello',
    href: 'https://trello.com/b/Zi6UTMnO/official-bizzare-lineage-%E2%9E%B5',
  },
] as const;

const faqItems = [
  {
    question: 'Are there any active Bizarre Lineage codes right now?',
    answer:
      'As of March 8, 2026, this page does not list any verified active codes. Recent public checks point players back to official channels instead of confirming a live redeem code.',
  },
  {
    question: 'Where should I check for new Bizarre Lineage codes first?',
    answer:
      'Start with the official Discord, the Roblox game page, and the public Trello. Those are the fastest places to confirm whether a code is real before third-party lists copy it.',
  },
  {
    question: 'How do I use a code in Bizarre Lineage?',
    answer:
      'Open Bizarre Lineage in Roblox, find the live redemption area in the current game UI, then enter the verified code exactly as posted. Do not rely on old screenshots because the menu can move after updates.',
  },
  {
    question: 'Why do code lists often look outdated?',
    answer:
      'Codes can expire quickly, and many pages keep recycled or placeholder entries indexed in search. A verification-first page is more useful than a longer list full of dead entries.',
  },
  {
    question: 'Is there a new code planned for 200K likes?',
    answer:
      'Some recent guide pages mention a future 200K likes code, but no live code has been released publicly yet. Treat that as a monitor item, not a working reward.',
  },
] as const;

const statusChecks = [
  {
    title: 'No working code confirmed',
    description:
      'Multiple recent guide pages updated in early March 2026 report that no active Bizarre Lineage codes are available right now.',
  },
  {
    title: 'Official channels remain the source of truth',
    description:
      'The official Discord, Roblox game page, and Trello remain the fastest places to verify a real code before third-party lists recycle it.',
  },
  {
    title: '200K likes code is still unreleased',
    description:
      'A future reward is widely expected at 200K likes, but nothing has been published as a redeemable code as of March 8, 2026.',
  },
] as const;

const sourceChecks = [
  {
    label: 'Beebom',
    href: 'https://beebom.com/bizarre-lineage-codes/',
    note: 'Updated March 6, 2026 and reports no working codes.',
  },
  {
    label: 'Radio Times',
    href: 'https://www.radiotimes.com/technology/gaming/bizarre-lineage-codes/',
    note: 'Published March 6, 2026 and reports no active redeem code.',
  },
  {
    label: 'BO3',
    href: 'https://bo3.gg/games/articles/bizarre-lineage-codes',
    note: 'Published March 2, 2026 and notes the first code is still coming soon.',
  },
] as const;

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildMetadata({
    locale,
    path: '/codes',
    title: 'Bizarre Lineage Codes - Verified Code List and Redemption Guide',
    description:
      'Check the verified Bizarre Lineage codes status, see why no active code is confirmed as of March 8, 2026, and follow official sources for the next real reward drop.',
    keywords: [
      'bizarre lineage codes',
      'bizarre lineage redeem codes',
      'bizarre lineage codes 2026',
    ],
  });
}

export default async function CodesRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageShell accent="gold">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqItems.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }}
      />

      <SectionFrame
        eyebrow="Codes"
        title="Bizarre Lineage Codes"
        description="Track verified Bizarre Lineage codes first. As of March 8, 2026, no confirmed active code is available, so this page prioritizes current status, source checks, and the next code worth monitoring."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-background/92 border-border rounded-[1.5rem] border p-5">
            <div className="text-muted-foreground text-[0.68rem] tracking-[0.2em] uppercase">
              Verified Active
            </div>
            <div className="text-foreground mt-2 text-2xl font-semibold tracking-[-0.03em]">
              {activeCodes.length}
            </div>
          </div>
          <div className="bg-background/92 border-border rounded-[1.5rem] border p-5">
            <div className="text-muted-foreground text-[0.68rem] tracking-[0.2em] uppercase">
              Monitor Items
            </div>
            <div className="text-foreground mt-2 text-2xl font-semibold tracking-[-0.03em]">
              {monitoredCodeClaims.length}
            </div>
          </div>
          <div className="bg-background/92 border-border rounded-[1.5rem] border p-5">
            <div className="text-muted-foreground text-[0.68rem] tracking-[0.2em] uppercase">
              Last Verified
            </div>
            <div className="text-foreground mt-2 text-2xl font-semibold tracking-[-0.03em]">
              {lastVerified}
            </div>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame
        id="codes-list"
        eyebrow="Codes List"
        title="Start with the current verified status."
        description="The goal of this page is to answer the main search quickly: is there a real Bizarre Lineage code worth trying right now."
      >
        <div className="space-y-5">
          {activeCodes.length === 0 ? (
            <div className="bg-background/88 border-border rounded-[1.5rem] border p-5">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="outline" className="rounded-full px-3 py-1">
                  No verified active codes
                </Badge>
                <span className="text-muted-foreground text-sm">
                  Last checked on {lastVerified}
                </span>
              </div>
              <p className="text-muted-foreground mt-3 max-w-3xl text-sm leading-7 md:text-base">
                Public source checks currently do not confirm any live Bizarre
                Lineage redeem code. This page stays intentionally short instead
                of padding the table with guessed or recycled entries.
              </p>
            </div>
          ) : (
            <div className="border-border bg-background/80 overflow-hidden rounded-[1.5rem] border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-4">Code</TableHead>
                    <TableHead>Reward</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="px-4">Last Verified</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeCodes.map((row) => (
                    <TableRow key={row.code}>
                      <TableCell className="px-4 font-mono text-xs">
                        {row.code}
                      </TableCell>
                      <TableCell>{row.reward}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell className="px-4">{row.lastVerified}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          <div className="border-border bg-background/70 overflow-hidden rounded-[1.5rem] border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-4">Monitor Item</TableHead>
                  <TableHead>Expected Reward</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="px-4">Last Verified</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monitoredCodeClaims.map((row) => (
                  <TableRow key={row.code}>
                    <TableCell className="px-4 font-mono text-xs">
                      {row.code}
                    </TableCell>
                    <TableCell>{row.reward}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell className="px-4">{row.lastVerified}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {expiredCodes.length > 0 ? (
            <div className="border-border bg-background/70 overflow-hidden rounded-[1.5rem] border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-4">Archived Code</TableHead>
                    <TableHead>Reward</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="px-4">Last Verified</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expiredCodes.map((row) => (
                    <TableRow key={row.code}>
                      <TableCell className="px-4 font-mono text-xs">
                        {row.code}
                      </TableCell>
                      <TableCell>{row.reward}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell className="px-4">{row.lastVerified}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : null}
        </div>
      </SectionFrame>

      <SectionFrame
        id="about-and-how-to-use"
        eyebrow="About and How To Use"
        title="What players should know before trying Bizarre Lineage codes."
        description="This section keeps the explanation practical: what the current checks say, why verification matters, and what to do when the next code appears."
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div className="space-y-4 text-sm leading-7 md:text-base">
            <p className="text-muted-foreground">
              Bizarre Lineage is a Roblox RPG built around stands, combat,
              progression, and repeatable PvE or PvP play. Players search for
              Bizarre Lineage codes because codes can reduce early friction, but
              a codes page is only useful when it separates verified information
              from recycled search noise.
            </p>
            <p className="text-muted-foreground">
              Based on current public source checks, the answer is simple: there
              are no verified active codes to recommend right now. That is why
              this page prioritizes freshness, source notes, and the next likely
              code trigger over a longer table.
            </p>
            <div className="grid gap-3 pt-2">
              {statusChecks.map((item) => (
                <div
                  key={item.title}
                  className="bg-background/88 border-border rounded-2xl border p-4"
                >
                  <div className="text-sm font-semibold">{item.title}</div>
                  <p className="text-muted-foreground mt-2 text-sm leading-6">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              {sourceLinks.map((source) => (
                <Button
                  key={source.href}
                  asChild
                  variant="outline"
                  className="rounded-full"
                >
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={source.label}
                  >
                    {source.label}
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <div className="bg-background/88 border-border rounded-[1.5rem] border p-5">
            <div className="text-muted-foreground text-[0.68rem] tracking-[0.22em] uppercase">
              How To Use Codes
            </div>
            <ol className="mt-4 space-y-4">
              <li className="border-border rounded-2xl border p-4">
                <div className="text-sm font-semibold">
                  1. Check an official source first
                </div>
                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  Look for a code on the official Discord, Roblox game page, or
                  Trello before trusting third-party pages.
                </p>
              </li>
              <li className="border-border rounded-2xl border p-4">
                <div className="text-sm font-semibold">
                  2. Open the live redemption UI in game
                </div>
                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  Launch Bizarre Lineage in Roblox and use the current menu
                  layout, because redemption entry points can move after
                  updates.
                </p>
              </li>
              <li className="border-border rounded-2xl border p-4">
                <div className="text-sm font-semibold">
                  3. Enter the code exactly as posted
                </div>
                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  Match the spelling precisely, then stop and re-check the
                  source if the code fails instead of retrying random variants.
                </p>
              </li>
            </ol>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame
        id="sources"
        eyebrow="Source Checks"
        title="Recent public checks behind this status."
        description="These pages were reviewed to confirm whether any code was actually live before updating this guide."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {sourceChecks.map((source) => (
            <a
              key={source.href}
              href={source.href}
              target="_blank"
              rel="noreferrer"
              className="bg-background/88 border-border hover:bg-background rounded-[1.5rem] border p-5 transition-colors"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="text-base font-semibold">{source.label}</div>
                <ExternalLink className="text-muted-foreground size-4 shrink-0" />
              </div>
              <p className="text-muted-foreground mt-3 text-sm leading-6">
                {source.note}
              </p>
            </a>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame
        id="faq"
        eyebrow="FAQ"
        title="Common questions about Bizarre Lineage codes."
      >
        <Accordion
          type="single"
          collapsible
          className="bg-background/88 border-border rounded-[1.5rem] border px-5"
        >
          {faqItems.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger className="text-base font-semibold hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-7">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SectionFrame>
    </PageShell>
  );
}
