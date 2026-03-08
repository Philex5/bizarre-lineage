export type TierListEntry = {
  key: string;
  name: string;
  tier: 'S' | 'A' | 'B' | 'C';
  pvp: string;
  pve: string;
  beginner: string;
  summary: string;
};

export const tierListEntries: TierListEntry[] = [
  {
    key: 'star-platinum',
    name: 'Star Platinum',
    tier: 'S',
    pvp: 'Excellent',
    pve: 'Strong',
    beginner: 'Medium',
    summary:
      'Reliable pressure, broad matchup value, and enough versatility to anchor the current sample stand page.',
  },
  {
    key: 'king-crimson',
    name: 'King Crimson',
    tier: 'A',
    pvp: 'Strong',
    pve: 'Good',
    beginner: 'Low',
    summary:
      'High upside, but it asks for cleaner decision-making and punishes sloppy execution more than the top slot.',
  },
  {
    key: 'silver-chariot',
    name: 'Silver Chariot',
    tier: 'B',
    pvp: 'Good',
    pve: 'Average',
    beginner: 'Medium',
    summary:
      'Usable and serviceable, though more dependent on comfort, matchup knowledge, and player preference.',
  },
  {
    key: 'entry-path-stands',
    name: 'Entry-path stands',
    tier: 'C',
    pvp: 'Average',
    pve: 'Average',
    beginner: 'High',
    summary:
      'Fine for getting moving, but not the stands most players should structure long-term plans around.',
  },
] as const;

export const tierMethodology = [
  {
    title: 'Consistency beats clip value',
    description:
      'The ranking favors stands that perform across repeat matches rather than isolated highlight moments.',
  },
  {
    title: 'PvP and PvE both matter',
    description:
      'A stand that dominates only one lane still needs caveats before it earns an all-purpose top tier slot.',
  },
  {
    title: 'Accessibility affects value',
    description:
      'Extremely punishing options can rank lower for the general player base even if specialists rate them highly.',
  },
] as const;

export const bestForCards = [
  {
    title: 'Best for PvP',
    description:
      'Star Platinum currently sets the sample benchmark when consistent pressure and broad matchup coverage matter most.',
  },
  {
    title: 'Best for PvE',
    description:
      'PvE value should be judged on stable progression efficiency, not just duel strength or combo highlights.',
  },
  {
    title: 'Best for beginners',
    description:
      'Beginners should bias toward stable progress and clean decision-making, even if that means delaying a top-tier chase.',
  },
] as const;
