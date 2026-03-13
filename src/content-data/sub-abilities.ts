export type SubAbilityKey = 'ripple' | 'cyborg' | 'spin' | 'vampire';

export type SubAbilityMove = {
  name: string;
  summary: string;
};

export type SubAbilityDetail = {
  key: SubAbilityKey;
  slug: string;
  name: string;
  routeType: string;
  teaser: string;
  heroImageUrl: string;
  heroImageAlt: string;
  officialSourceUrl: string;
  officialNpcUrl?: string;
  verifiedAt: string;
  trainerOrNpc: string;
  locationSummary: string;
  unlockSteps: string[];
  gameplaySummary: string;
  highlights: string[];
  moves: SubAbilityMove[];
  caveat?: string;
};

export const officialSubAbilitySource = {
  boardUrl: 'https://trello.com/b/Zi6UTMnO/official-bizzare-lineage-%E2%9E%B5',
  verifiedAt: '2026-03-13',
  label: 'Official Bizarre Lineage Trello',
} as const;

export const subAbilityDetails: Record<SubAbilityKey, SubAbilityDetail> = {
  ripple: {
    key: 'ripple',
    slug: 'ripple',
    name: 'Ripple',
    routeType: 'Questline',
    teaser:
      'An anti-vampire sub-ability built around stun confirms, forward pressure, and clean combo starters.',
    heroImageUrl:
      'https://trello.com/1/cards/69530cc4e330bbec80a16c6e/attachments/6953f673d9865034812901fa/previews/6953f673d986503481290209/download/the_ripple.webp',
    heroImageAlt: 'Official Ripple artwork from the Bizarre Lineage Trello',
    officialSourceUrl: 'https://trello.com/c/zFun2FIf/40-untitled',
    officialNpcUrl: 'https://trello.com/c/RmgOw6D3/619-ancient-ghost',
    verifiedAt: '2026-02-26',
    trainerOrNpc: 'Ancient Ghost',
    locationSummary: 'Near the 13th bus stop.',
    unlockSteps: [
      'Talk to the Ancient Ghost near the 13th bus stop to begin the Ripple questline.',
      'Complete the Ancient Ghost quest to unlock the Ripple abilities properly.',
    ],
    gameplaySummary:
      'Ripple is framed on Trello as a direct anti-vampire route. All three listed moves create pressure through stuns, forward movement, or ragdoll follow-ups.',
    highlights: [
      'Every listed move is called out as stronger into Vampire targets.',
      'Stun-heavy kit that makes follow-up damage easier to route.',
      'Best fit if you want a straightforward melee pressure sub-ability.',
    ],
    moves: [
      {
        name: 'Sunlight Yellow Overdrive',
        summary:
          'A barrage-style attack that stuns the target and deals extra damage to Vampires.',
      },
      {
        name: 'Sendo Ripple Overdrive',
        summary:
          'Sends a Ripple wave forward to stun enemies in front of you, again with bonus anti-vampire value.',
      },
      {
        name: 'Scarlet Overdrive',
        summary:
          'A dash punch that ragdolls the opponent and opens a cleaner follow-up window.',
      },
    ],
  },
  cyborg: {
    key: 'cyborg',
    slug: 'cyborg',
    name: 'Cyborg',
    routeType: 'Questline',
    teaser:
      'A machine-based sub-ability that trades pure brawling for ranged pressure, grab utility, and brief stuns.',
    heroImageUrl:
      'https://trello.com/1/cards/695325a1bb4835c838ca1a49/attachments/6953f4ec4e7fb75fabaad485/previews/6953f4ed4e7fb75fabaad494/download/cyborg.webp',
    heroImageAlt: 'Official Cyborg artwork from the Bizarre Lineage Trello',
    officialSourceUrl: 'https://trello.com/c/fUyCZZ2C/164-untitled',
    officialNpcUrl: 'https://trello.com/c/hRk9xCle/621-rduol-von-stroheim',
    verifiedAt: '2026-02-23',
    trainerOrNpc: 'Rudol von Stroheim',
    locationSummary: 'Near the 3rd bus stop.',
    unlockSteps: [
      'Talk to Rudol von Stroheim near the 3rd bus stop to start the Half-Human Half-Machine questline.',
      'Finish Stroheim’s quest to unlock the Cyborg abilities.',
    ],
    gameplaySummary:
      'Cyborg is more utility-oriented than Ripple. Its Trello kit mixes a grab punish, ranged bullets, and straight-line missiles to create pressure from safer spacing.',
    highlights: [
      'Ultraviolet Radiation Apparatus is another move explicitly marked as stronger into Vampires.',
      'Two of the three listed moves work as ranged harassment instead of pure melee confirms.',
      'Good if you want a more technical sub-ability with projectile presence.',
    ],
    moves: [
      {
        name: 'Ultraviolet Radiation Apparatus',
        summary:
          'A grab into ultraviolet blasts from the shoulders; Trello notes extra damage against Vampires.',
      },
      {
        name: 'Machine Gun',
        summary:
          'Fires bullets from the stomach area and briefly stuns on hit.',
      },
      {
        name: 'Missile Volley',
        summary:
          'Launches missiles in a straight line that explode on impact and briefly stun enemies.',
      },
    ],
  },
  spin: {
    key: 'spin',
    slug: 'spin',
    name: 'Spin',
    routeType: 'Questline',
    teaser:
      'A steel-ball-focused sub-ability built around ricochets, crowd control, and launch-heavy hit confirms.',
    heroImageUrl:
      'https://trello.com/1/cards/6953f1666082f25352d48c28/attachments/697566da8465fbc48d3e0019/previews/697566da8465fbc48d3e0058/download/spin.webp',
    heroImageAlt: 'Official Spin artwork from the Bizarre Lineage Trello',
    officialSourceUrl: 'https://trello.com/c/hSVDi4dE/209-untitled',
    verifiedAt: '2026-02-28',
    trainerOrNpc: 'Unknown trainer (Trello placeholder)',
    locationSummary:
      'The current official Trello still says “talk to X near the X bus stop,” so the trainer and bus stop are not filled in yet.',
    unlockSteps: [
      'The official Trello says Spin comes from a questline started by an NPC, but the NPC name is still listed as X.',
      'Because the source card is incomplete, use the official card as the baseline and re-check it before planning a route around trainer location.',
    ],
    gameplaySummary:
      'Spin reads as a more setup-oriented sub-ability. The current move list emphasizes projectile manipulation, rotational control, and launching targets into awkward positions.',
    highlights: [
      'Ricochet gives Spin a distinct projectile-routing identity.',
      'Cyclone Breaker is the clearest crowd-control tool on the current card.',
      'Best viewed as high utility, but its official acquisition note is still incomplete.',
    ],
    moves: [
      {
        name: 'Ricochet',
        summary:
          'Launches a steel ball that hovers briefly and can ricochet toward the nearest opponent when struck by another ball.',
      },
      {
        name: 'Cyclone Breaker',
        summary:
          'Builds a Golden Rectangle effect into a whirlwind that catches and spins opponents.',
      },
      {
        name: 'Corkscrew',
        summary:
          'Channels Spin into a steel ball, then converts the charge into a launching punch that sends the target backward.',
      },
    ],
    caveat:
      'Spin is the only current sub-ability card here with obvious placeholder text in its acquisition section.',
  },
  vampire: {
    key: 'vampire',
    slug: 'vampire',
    name: 'Vampire',
    routeType: 'Item + questline',
    teaser:
      'A sustain-heavy sub-ability that starts with a mask and then branches into an Elder Vampire questline for the actual abilities.',
    heroImageUrl:
      'https://trello.com/1/cards/6952d5d84457eb96bf23eb62/attachments/6964f25dffbebea1a68403ed/previews/6964f25dffbebea1a6840418/download/Vampire.webp',
    heroImageAlt: 'Official Vampire artwork from the Bizarre Lineage Trello',
    officialSourceUrl: 'https://trello.com/c/mohrgfOp/5-untitled',
    officialNpcUrl: 'https://trello.com/c/k1Ai3wbh/616-elder-vampire',
    verifiedAt: '2026-02-23',
    trainerOrNpc: 'Elder Vampire',
    locationSummary:
      'Bus stop 18, then through the arc and cave into the castle where the DIO Raid is; once inside, turn right and the Elder Vampire should be on your left.',
    unlockSteps: [
      'Use a Vampire Mask while you do not already have the Vampire sub-ability.',
      'Go to Dio’s Chapel and complete the Elder Vampire quest to unlock the Vampire moves properly.',
    ],
    gameplaySummary:
      'Vampire is the clearest hybrid route on the official board. Its moves focus on sustain, burn, freeze, and grounded stun windows instead of just one damage pattern.',
    highlights: [
      'Leeching Terror adds self-healing instead of only raw pressure.',
      'The listed moves spread across burn, freeze, and stun effects.',
      'Strong pick if you value survivability and status effects over a pure trainer route.',
    ],
    moves: [
      {
        name: 'Space Ripper Stingy Eyes',
        summary:
          'Fires two pressurized eye jets that stun first and then burn the target.',
      },
      {
        name: 'Leeching Terror',
        summary:
          'A throat grab that drains the target’s health while healing you.',
      },
      {
        name: 'Flash Freeze',
        summary:
          'Uppercuts, freezes, and slams the opponent into a grounded stun state.',
      },
    ],
    caveat:
      'The mask is not the full unlock by itself; the official Trello still routes you through the Elder Vampire quest for the actual moves.',
  },
};

export const subAbilities = Object.values(subAbilityDetails);

export function getSubAbilityBySlug(slug: string) {
  return subAbilities.find((ability) => ability.slug === slug);
}
