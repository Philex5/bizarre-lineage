export type WorldEventEntry = {
  key: 'graveyard-uprising' | 'deathmatch';
  name: string;
  mode: string;
  summary: string;
  officialRule: string;
  imageSrc: string;
  imageAlt: string;
};

export const worldEventsIntro = {
  title: 'Bizarre Lineage World Events',
  description:
    'Bizarre Lineage world events are limited-time, server-wide activities. The official Trello currently confirms a 20 minute cooldown and two named examples: Graveyard Uprising and Deathmatch.',
  heroImageSrc: 'assets/pages/events/world-events-hero.png',
  heroImageAlt: 'Official Bizarre Lineage World Events card art',
  updatedAt: '2026-03-09',
  cooldown: '20 minute cooldown',
  sourceLabel: 'Official Trello card',
  sourceHref: 'https://trello.com/c/LSvRKnwp/159-untitled',
} as const;

export const worldEvents: WorldEventEntry[] = [
  {
    key: 'graveyard-uprising',
    name: 'Graveyard Uprising',
    mode: 'Survival event',
    summary:
      'Players fight waves of NPCs and must survive without dying before the time limit expires.',
    officialRule:
      'A survival mode where players fight waves of NPCs without dying, all within a strict time limit.',
    imageSrc: 'assets/pages/events/graveyard-uprising.png',
    imageAlt: 'Official Bizarre Lineage Graveyard Uprising screenshot',
  },
  {
    key: 'deathmatch',
    name: 'Deathmatch',
    mode: 'Team PvP event',
    summary:
      'Two squads fight each other, and every player begins with only two lives.',
    officialRule:
      'A team-based PvP mode where two squads face off, each player starting with only 2 lives. The goal is to eliminate the opposing team.',
    imageSrc: 'assets/pages/events/deathmatch.png',
    imageAlt: 'Official Bizarre Lineage Deathmatch screenshot',
  },
] as const;

export const worldEventsNotes = [
  'World events are described by the official board as limited-time and server-wide.',
  'The currently visible official note adds a 20 minute cooldown label.',
  'The public card only names Graveyard Uprising and Deathmatch at the moment.',
] as const;

export const worldEventsRelatedLinks = [
  {
    href: '/terms/raid',
    title: 'Raid guide',
    description:
      'Move here when you want the separate 8-player raid loop, token shops, and reward routes.',
  },
  {
    href: '/terms/fighting-styles',
    title: 'Fighting styles',
    description:
      'Check the style layer that can change how effective you are in survival and PvP events.',
  },
  {
    href: '/terms/sub-abilities',
    title: 'Sub-abilities',
    description:
      'Review the extra build layer that can improve event pressure, utility, or survivability.',
  },
] as const;
