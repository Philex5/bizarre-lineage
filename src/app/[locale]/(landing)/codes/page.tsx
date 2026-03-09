import { Metadata } from 'next';
import Image from 'next/image';
import {
  activeCodes,
  expiredCodes,
  monitoredCodeClaims,
  redeemSteps,
} from '@/content-data/codes';
import { CodeCopyButton } from './copy-button';
import { buildMetadata } from '@/features/wiki/pages';
import { PageShell, SectionFrame } from '@/features/wiki/primitives';
import { ExternalLink, CheckCircle2, AlertCircle, Info } from 'lucide-react';
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

const lastVerified = '2026-03-09';

const sourceLinks = [
  {
    label: 'Official Roblox Game',
    href: 'https://www.roblox.com/games/14890802310/Bizarre-Lineage',
  },
  {
    label: 'Official Discord',
    href: 'https://discord.com/invite/bizarrelineage',
  },
] as const;

const faqItems = [
  {
    question: 'How do I redeem Bizarre Lineage codes?',
    answer:
      'To redeem Bizarre Lineage codes, launch the game on Roblox, open the chat box, type the specific code (e.g., !code 1week) exactly as shown, and press Enter to instantly claim your rewards.',
  },
  {
    question: 'Where can I find more Bizarre Lineage codes for rewards?',
    answer:
      'The best places to find new Bizarre Lineage codes are the official Discord server and the game’s Roblox page. We also track all new Bizarre Lineage codes on this page and verify them daily to ensure they are still working.',
  },
  {
    question: 'What do Bizarre Lineage codes give you?',
    answer:
      'Bizarre Lineage codes typically provide valuable progression items such as Stand Stat Point Essence, cash, chests, and stat resets. These rewards are essential for optimizing your Stand and character build.',
  },
  {
    question: 'Why are my Bizarre Lineage codes not working?',
    answer:
      'Bizarre Lineage codes are case-sensitive and may require joining the official Roblox community group. If a code fails, it may have expired or you might need to join a fresh server after an update.',
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
    title: 'Bizarre Lineage Codes (March 2026) - Full List of Active Codes',
    description:
      'Looking for Bizarre Lineage codes? Get the latest verified Bizarre Lineage codes list for free Stand Stat Point Essence and other rewards. Updated daily for March 2026.',
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

      {/* Hero Section */}
      <SectionFrame
        eyebrow="Active Rewards"
        title="Bizarre Lineage Codes List (March 2026)"
        description="Save time and boost your character with the latest Bizarre Lineage codes. Our verified list of Bizarre Lineage codes helps you get free Stand Stat Point Essence and progression items instantly."
      >
        <div className="space-y-6">
          {/* Active Codes List */}
          <div className="grid gap-4">
            {activeCodes.length > 0 ? (
              activeCodes.map((row) => (
                <div 
                  key={row.code}
                  className="group relative flex flex-col md:flex-row md:items-center justify-between gap-4 bg-background/92 border-gold/20 hover:border-gold/50 rounded-2xl border p-5 transition-all shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                      <CheckCircle2 className="size-6" />
                    </div>
                    <div>
                      <div className="font-mono text-xl font-bold tracking-tight text-foreground select-all">
                        {row.code}
                      </div>
                      <div className="text-muted-foreground text-sm mt-1">
                        Reward: {row.reward}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 rounded-full px-3">
                      Working Bizarre Lineage Code
                    </Badge>
                    <div className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
                      Verified {row.lastVerified}
                    </div>
                    <CodeCopyButton code={row.code} />
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-background/88 border-border rounded-2xl border p-8 text-center">
                <AlertCircle className="mx-auto size-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Active Bizarre Lineage Codes Found</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  There are currently no confirmed active Bizarre Lineage codes. We monitor the official Bizarre Lineage Discord 24/7 for new releases.
                </p>
              </div>
            )}
          </div>

          <p className="text-muted-foreground text-sm italic">
            Note: Most Bizarre Lineage codes are released during milestones or game updates. Be sure to redeem these Bizarre Lineage codes as soon as possible before they expire.
          </p>

          {/* Monitor/Upcoming Section */}
          {monitoredCodeClaims.length > 0 && (
             <div className="bg-background/60 border-border rounded-2xl border p-5">
                <div className="flex items-center gap-2 mb-4 text-muted-foreground">
                  <Info className="size-4" />
                  <span className="text-sm font-semibold uppercase tracking-wider">Upcoming Bizarre Lineage Codes & Milestones</span>
                </div>
                {monitoredCodeClaims.map((row) => (
                  <div key={row.code} className="flex items-center justify-between text-sm">
                    <span className="font-mono text-foreground font-medium">{row.code}</span>
                    <span className="text-muted-foreground">{row.reward} (Expected at 200K Likes)</span>
                  </div>
                ))}
             </div>
          )}
        </div>
      </SectionFrame>

      {/* How To Use Section */}
      <SectionFrame
        id="how-to-use"
        eyebrow="Redemption Guide"
        title="How to Use Bizarre Lineage Codes"
        description="Follow this simple guide to learn how to redeem Bizarre Lineage codes in the Roblox game. Using Bizarre Lineage codes is the fastest way to gain an advantage in the streets of Morioh-cho."
      >
        <div className="flex flex-col gap-8">
          <div className="grid gap-6">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground text-background text-sm font-bold">
                1
              </div>
              <div>
                <h3 className="text-base font-bold mb-1">Launch Bizarre Lineage on Roblox</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Start the game and wait for the world to load. Make sure you have liked the game as some Bizarre Lineage codes require it.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground text-background text-sm font-bold">
                2
              </div>
              <div>
                <h3 className="text-base font-bold mb-1">Open the In-game Chat Box</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Locate the chat window at the top left of your screen. This is where all Bizarre Lineage codes are entered.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground text-background text-sm font-bold">
                3
              </div>
              <div>
                <h3 className="text-base font-bold mb-1">Enter the Bizarre Lineage Code</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Type the code exactly as shown (starting with !code) and hit Enter. If the Bizarre Lineage code is valid, you will receive your rewards instantly.
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-border aspect-[16/9] w-full max-w-3xl mx-auto shadow-lg">
            <Image
              src="/images/codes/redeem-guide.jpg"
              alt="Step-by-step guide for Bizarre Lineage codes redemption"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </SectionFrame>

      {/* About Section */}
      <SectionFrame
        id="about"
        eyebrow="Overview"
        title="What is Bizarre Lineage?"
        description="Bizarre Lineage is a popular Roblox RPG inspired by JoJo's Bizarre Adventure. Players can awaken unique Stands, complete challenging raids, and dominate in PvP combat. Using Bizarre Lineage codes is a core part of the game's progression system, allowing players to reset stats and gain rare items."
      />

      {/* Official Sources */}
      <SectionFrame
        id="sources"
        eyebrow="Community"
        title="Find More Bizarre Lineage Codes"
        description="Stay ahead of the game by following the developers. New Bizarre Lineage codes are often dropped during holiday events or when the game reaches new 'Like' milestones on Roblox."
      >
        <div className="flex flex-wrap gap-4">
          {sourceLinks.map((source) => (
            <Button
              key={source.href}
              asChild
              variant="outline"
              className="rounded-full h-12 px-6 hover:bg-gold hover:text-white transition-all"
            >
              <a
                href={source.href}
                target="_blank"
                rel="noreferrer"
              >
                {source.label}
                <ExternalLink className="ml-2 size-4" />
              </a>
            </Button>
          ))}
        </div>
      </SectionFrame>

      {/* FAQ Section */}
      <SectionFrame
        id="faq"
        eyebrow="FAQ"
        title="Bizarre Lineage Codes Frequently Asked Questions"
      >
        <Accordion
          type="single"
          collapsible
          className="bg-background/88 border-border rounded-2xl border px-5"
        >
          {faqItems.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger className="text-base font-semibold hover:no-underline py-5 text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SectionFrame>

      {/* Archived Codes */}
      {expiredCodes.length > 0 && (
        <SectionFrame
          id="expired"
          eyebrow="Archive"
          title="Expired Bizarre Lineage Codes"
          description="These Bizarre Lineage codes have been confirmed as no longer working. We keep this list for your reference so you don't waste time trying old Bizarre Lineage codes."
        >
          <div className="border-border bg-background/50 overflow-hidden rounded-2xl border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-4">Expired Code</TableHead>
                  <TableHead>Previous Reward</TableHead>
                  <TableHead className="px-4 text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expiredCodes.map((row) => (
                  <TableRow key={row.code}>
                    <TableCell className="px-4 font-mono text-xs">
                      {row.code}
                    </TableCell>
                    <TableCell className="text-sm">{row.reward}</TableCell>
                    <TableCell className="px-4 text-right text-xs text-muted-foreground italic">
                      Expired
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </SectionFrame>
      )}
    </PageShell>
  );
}
