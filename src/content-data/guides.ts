import { ContentDataTranslator } from './types';

type GuideChecklistItem = {
  key: string;
  title: string;
  description: string;
  href?: string;
  hrefLabel?: string;
};

type GuideFaqItem = {
  question: string;
  answer: string;
};

const beginnerGuideChecklistHrefMap: Record<string, string | undefined> = {
  redeem_codes: '/codes',
  avoid_flashy_stand: '/tier-list',
  pick_target: undefined,
  research_chase_targets: '/stands',
};
const beginnerGuideGoalsHrefMap: Record<string, string | undefined> = {
  stabilize_economy: undefined,
  compare_targets: undefined,
  understand_stats: '/guides/stats',
  prepare_prestige: '/guides/prestige',
};
const statsUpdatedAt = '2026-03-08';
const prestigeUpdatedAt = '2026-03-08';

export const prestigeGuide = {
  prepareFirst: [
    {
      title: 'Confirm the requirements',
      description:
        'Make sure you are not operating on outdated assumptions about level gates or prerequisite tasks.',
    },
    {
      title: 'Spend or save intentionally',
      description:
        'Know which resources should be used before prestige and which ones should be preserved.',
    },
    {
      title: 'Review your current build',
      description:
        'If stats or stand choices are part of the tradeoff, account for that before you reset.',
    },
    {
      title: 'Set the post-prestige route',
      description:
        'You should know your first goal after the reset so you do not drift once prestige is done.',
    },
  ],
  mistakes: [
    {
      title: 'Prestiging as soon as possible',
      description:
        'Availability is not the same thing as readiness. Premature resets often create avoidable friction.',
    },
    {
      title: 'Ignoring the tradeoffs',
      description:
        'If you do not understand what the reset costs, you cannot judge whether it is efficient yet.',
    },
    {
      title: 'Resetting without a follow-up plan',
      description:
        'Prestige should accelerate the next phase, not leave you improvising from scratch.',
    },
  ],
} as const;

function withHrefMap(
  items: Array<GuideChecklistItem>,
  hrefMap: Record<string, string | undefined>
) {
  return items.map((item) => ({
    ...item,
    href: hrefMap[item.key],
  }));
}

export function getBeginnerGuide(t: ContentDataTranslator) {
  return {
    readingTime: t('page.content.reading_time'),
    updatedAt: '2026-03-08',
    checklist: withHrefMap(
      t.raw<GuideChecklistItem[]>('page.content.checklist'),
      beginnerGuideChecklistHrefMap
    ),
    firstThirtyMinutes: t.raw<Array<{ title: string; description: string }>>(
      'page.content.first_thirty_minutes'
    ),
    mistakes: t.raw<Array<{ title: string; description: string }>>(
      'page.content.mistakes_cards'
    ),
    goals: withHrefMap(
      t.raw<GuideChecklistItem[]>('page.content.goals'),
      beginnerGuideGoalsHrefMap
    ),
    faq: t.raw<GuideFaqItem[]>('page.content.faq'),
  } as const;
}

export function getStatsGuide(t: ContentDataTranslator) {
  return {
    updatedAt: statsUpdatedAt,
    overview: t('page.content.overview'),
    statCards: t.raw<Array<{ title: string; description: string }>>(
      'page.content.stat_cards'
    ),
    priorities: t.raw<Array<{ title: string; description: string }>>(
      'page.content.priorities_list'
    ),
    mistakes: t.raw<Array<{ title: string; description: string }>>(
      'page.content.mistakes_cards'
    ),
    faq: t.raw<GuideFaqItem[]>('page.content.faq'),
  } as const;
}

export function getPrestigeGuide(t: ContentDataTranslator) {
  return {
    updatedAt: prestigeUpdatedAt,
    overview: t('page.content.overview'),
    whenToPrestige: t.raw<Array<{ title: string; description: string }>>(
      'page.content.when_to_prestige'
    ),
    prepareFirst: t.raw<Array<{ title: string; description: string }>>(
      'page.content.prepare_first'
    ),
    mistakes: t.raw<Array<{ title: string; description: string }>>(
      'page.content.mistakes_cards'
    ),
    faq: t.raw<GuideFaqItem[]>('page.content.faq'),
  } as const;
}
