export const siteName = 'Bizarre Lineage Wiki';

export const placeholderImages = {
  hero: '/placeholders/bizarre-lineage-hero.webp',
  stand: '/placeholders/stand-focus.svg',
  guide: '/placeholders/guide-route.svg',
} as const;

export const officialLinks = [
  {
    label: 'Official Roblox Page',
    href: 'https://www.roblox.com/games/14890802310/Bizarre-Lineage',
    note: 'Launch the game and verify the live title and update state.',
  },
  {
    label: 'Community Discord',
    href: 'https://discord.com/invite/bizarrelineage',
    note: 'Best source for patch notes, announcements, and code drops.',
  },
  {
    label: 'Public Trello',
    href: 'https://trello.com/b/Zi6UTMnO/official-bizzare-lineage-%E2%9E%B5',
    note: 'Use it for stands, specs, NPCs, regions, and progression notes.',
  },
] as const;

export const gameplayLoop = [
  'Get Arrow',
  'Roll Stand',
  'Add Style or Sub-Ability',
  'Invest Stats',
  'Push Progression',
  'Raid or PvP',
] as const;

export const systemsOverview = [
  {
    title: 'Stands',
    description:
      'The main power identity. Tier value depends on consistency, ceiling, and how much work the chase demands.',
    href: '/tier-list',
  },
  {
    title: 'Fighting Styles',
    description:
      'Styles shape matchup coverage and tempo. The system matters even before dedicated pages exist.',
  },
  {
    title: 'Sub-Abilities',
    description:
      'Supplemental choices that can patch weaknesses or sharpen a stand into a specific role.',
  },
  {
    title: 'Stats',
    description:
      'Point allocation decides whether your build actually supports your stand and play pattern.',
    href: '/guides/stats',
  },
  {
    title: 'Raids',
    description:
      'A progression checkpoint for players moving from early game into coordinated or repeatable content.',
  },
  {
    title: 'Prestige',
    description:
      'A reset-style progression decision that should be timed, not rushed.',
    href: '/guides/prestige',
  },
  {
    title: 'Awakening',
    description:
      'Late-arc progression pressure point that belongs in the site map even before full coverage ships.',
  },
] as const;

export const newPlayerRoute = [
  {
    title: 'Get a usable first stand',
    description:
      'Start with a route that produces immediate value instead of gambling all your resources on a distant chase target.',
  },
  {
    title: 'Avoid wasteful early spending',
    description:
      'Use the codes page and the beginner guide before making your first irreversible-looking choices.',
  },
  {
    title: 'Understand stats before you overbuild',
    description:
      'Stat allocation mistakes are harder to recover from than most first-session combat mistakes.',
    href: '/guides/stats',
    hrefLabel: 'Open stats guide',
  },
  {
    title: 'Plan your first mid-game reset point',
    description:
      'Prestige becomes much cleaner once you know what to prepare and what not to sacrifice too early.',
    href: '/guides/prestige',
    hrefLabel: 'Open prestige guide',
  },
] as const;

export const trustSignals = [
  'Codes include explicit status and last-verified notes instead of blanket certainty.',
  'Tier calls explain the evaluation frame so rankings are easier to challenge and update.',
  'Guides link into each other to match actual player paths instead of leaving search visitors at dead ends.',
] as const;

export const homeFaq = [
  {
    question: 'What is Bizarre Lineage?',
    answer:
      'Bizarre Lineage is a Roblox RPG built around stands, progression resets, stat investment, and matchup-driven combat decisions.',
  },
  {
    question: 'What is the best stand in Bizarre Lineage?',
    answer:
      'There is no permanent universal answer, but this MVP currently treats Star Platinum as the clearest sample S-tier stand because of its broad usefulness.',
  },
  {
    question: 'How do you get your first stand?',
    answer:
      'Use the beginner guide first. The early goal is to secure a practical stand and protect scarce resources before chasing a premium target.',
  },
  {
    question: 'Does Bizarre Lineage have codes?',
    answer:
      'The site keeps a dedicated codes page with active, monitor, and expired sections so urgent visitors can check redeemable entries first.',
  },
] as const;
