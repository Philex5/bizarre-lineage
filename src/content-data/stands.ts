export type StandTier = 'S' | 'A' | 'B' | 'C' | 'D';

export type StandEntry = {
  key: string;
  name: string;
  tier: StandTier;
  rarity: string;
  part: string;
  bestFor: string;
  imageUrl: string;
  howToGet: string[];
  strengths: string[];
  weaknesses: string[];
  quickVerdict: string;
  summary: string;
  abilities: Array<{ title: string; description: string }>;
};

export const standResearchNotes = {
  verifiedAt: '2026-03-09',
  tierSource: 'Community research and latest tier list updates (Destructoid, March 2026).',
  methodology:
    'Tier placements reflect the current meta where mobility, crowd control, and evolution potential define the ceiling. Rewritten to focus on player-driven "keep or skip" decisions.',
} as const;

export const stands: StandEntry[] = [
  {
    key: 'made-in-heaven',
    name: 'Made in Heaven',
    tier: 'S',
    rarity: 'Special',
    part: 'Part 6',
    bestFor: 'Ultimate PvP mobility and speed-blitzing',
    imageUrl: 'assets/stands/made-in-heaven/card.jpg',
    quickVerdict:
      'The current peak of the PvP meta. Unmatched speed and gap-closing make it nearly impossible to pin down.',
    summary:
      'Made in Heaven is the final evolution of the Whitesnake line. It trades the control of its predecessors for sheer, overwhelming speed.',
    howToGet: [
      'Evolution only: Evolve C-Moon at Prestige 1+ with 100+ Conjuring.',
      'Requires a complex questline involving the "Way to Heaven".',
    ],
    strengths: [
      'Insane mobility and chasing potential.',
      'Extremely difficult to counter in 1v1 PvP.',
      'High outplay potential with speed buffs.',
    ],
    weaknesses: [
      'Relatively low durability.',
      'Requires significant setup and evolution effort.',
      'Not optimized for PvE group farming.',
    ],
    abilities: [
      {
        title: 'Infinite Pursuit',
        description: 'A teleporting dash that starts high-speed combos.',
      },
      {
        title: "Heaven's Wrath",
        description: 'A lightning-fast dash attack that punishes spacing errors.',
      },
      {
        title: 'Acceleration',
        description: 'Drastically increases movement and attack speed.',
      },
    ],
  },
  {
    key: 'whitesnake',
    name: 'Whitesnake',
    tier: 'S',
    rarity: 'Mythical',
    part: 'Part 6',
    bestFor: 'Control, disruption, and evolution pathing',
    imageUrl: 'assets/stands/whitesnake/card.png',
    quickVerdict:
      'A top-tier all-rounder that excels in both PvE and PvP. Essential for reaching C-Moon and Made in Heaven.',
    summary:
      'Whitesnake offers some of the best crowd control in the game through its disc extraction mechanics, making it a threat at any range.',
    howToGet: [
      'Obtained from Stand Arrow (Mythical rarity).',
      'One of the most sought-after arrow pulls due to its evolution potential.',
    ],
    strengths: [
      'Excellent crowd control with Disc Extraction.',
      'High DoT (Damage over Time) with acid attacks.',
      'Strong in both solo duels and group PvE.',
    ],
    weaknesses: [
      'Lower mobility compared to its evolutions.',
      'Requires precise aim for disc throws.',
      'Vulnerable to high-pressure rushdown stands.',
    ],
    abilities: [
      {
        title: 'Disc Extraction',
        description: 'Stuns the enemy and removes their abilities temporarily.',
      },
      {
        title: 'Acid Rupture',
        description: 'Deals significant DoT and slows enemies in an area.',
      },
      {
        title: 'Revolver',
        description: 'A quick ranged poke to keep pressure from a distance.',
      },
    ],
  },
  {
    key: 'c-moon',
    name: 'C-Moon',
    tier: 'S',
    rarity: 'Special',
    part: 'Part 6',
    bestFor: 'Gravity-based combos and area control',
    imageUrl: 'assets/stands/c-moon/card.jpg',
    quickVerdict:
      'A powerful evolution with unique gravity mechanics that can lock down even the most mobile opponents.',
    summary:
      'C-Moon bridges the gap between Whitesnake and Made in Heaven, offering superior area denial and punishing combo starters.',
    howToGet: [
      'Evolution only: Evolve Whitesnake at Prestige 1+ with 100+ Conjuring.',
    ],
    strengths: [
      'Powerful gravity-based CC that ignores some defenses.',
      'High bleed damage and combo potential.',
      'Excellent at kiting and poking enemies.',
    ],
    weaknesses: [
      'Some hitboxes can be difficult to land.',
      'Longer cooldowns on key gravity moves.',
      'Requires Whitesnake evolution to obtain.',
    ],
    abilities: [
      {
        title: 'Graviton Reversal',
        description: 'Inverts gravity to slam enemies into the ground.',
      },
      {
        title: 'Gravity Barrier',
        description: 'Creates a zone that slows and damages anyone inside.',
      },
      {
        title: 'Rock Barrage',
        description: 'Fires debris that stuns and interrupts enemy actions.',
      },
    ],
  },
  {
    key: 'the-world',
    name: 'The World',
    tier: 'A',
    rarity: 'Legendary',
    part: 'Part 3',
    bestFor: 'Time Stop punishes and high-burst duels',
    imageUrl: 'assets/stands/the-world/card.png',
    quickVerdict:
      'The classic powerhouse. While slightly edged out of S-tier by evolution stands, it remains a top-tier duelist.',
    summary:
      'The World is built for one thing: stopping time and deleting health bars. Its single-target DPS is among the best in the game.',
    howToGet: ['Obtained from Stand Arrow (Legendary rarity).'],
    strengths: [
      'Massive burst damage during Time Stop.',
      'Strong single-target combo potential.',
      'Reliable ranged poke with knives.',
    ],
    weaknesses: [
      'Extremely reliant on Time Stop for big plays.',
      'Small AoE makes it less ideal for large groups.',
      'Highly predictable once Time Stop is on cooldown.',
    ],
    abilities: [
      {
        title: 'Time Stop',
        description: 'Freezes all nearby enemies for a few seconds.',
      },
      {
        title: 'Knives',
        description: 'Throws a barrage of knives that deal high damage.',
      },
      {
        title: 'Kick Volley',
        description: 'A heavy-hitting melee combo finisher.',
      },
    ],
  },
  {
    key: 'star-platinum',
    name: 'Star Platinum',
    tier: 'A',
    rarity: 'Legendary',
    part: 'Part 3',
    bestFor: 'Close-range brawling and stuns',
    imageUrl: 'assets/stands/star-platinum/card.png',
    quickVerdict:
      'An iconic brawler that excels at sticking to targets and landing heavy stuns.',
    summary:
      'Star Platinum is the gold standard for melee stands. It offers great survivability and consistent damage through its fast attacks.',
    howToGet: ['Obtained from Stand Arrow (Legendary rarity).'],
    strengths: [
      'High attack speed and melee pressure.',
      'Reliable stuns with Star Finger and Inhale.',
      'Versatile in most PvP scenarios.',
    ],
    weaknesses: [
      'Almost zero ranged presence.',
      'Struggles against heavy zoning stands.',
      'Requires close proximity to be effective.',
    ],
    abilities: [
      {
        title: 'Star Finger',
        description: 'An extended-range pole that stuns the target.',
      },
      {
        title: 'Inhale',
        description: 'Pulls enemies closer for a guaranteed follow-up.',
      },
      {
        title: 'Time Stop',
        description: 'The signature move to guarantee a full combo.',
      },
    ],
  },
  {
    key: 'king-crimson',
    name: 'King Crimson',
    tier: 'A',
    rarity: 'Legendary',
    part: 'Part 5',
    bestFor: 'Outplaying opponents and counter-attacks',
    imageUrl: 'assets/stands/king-crimson/card.png',
    quickVerdict:
      'A high-skill stand that can completely bypass enemy attacks with Time Erase.',
    summary:
      'King Crimson is a technical duelist. It rewards players who can predict their opponent\'s moves and use Time Erase to reposition.',
    howToGet: ['Obtained from Stand Arrow (Legendary rarity).'],
    strengths: [
      'Elite utility with Time Erase and Epitaph.',
      'Huge burst damage with Impale.',
      'One of the best counter-pick stands in the game.',
    ],
    weaknesses: [
      'Poor PvE farming efficiency.',
      'High skill floor; difficult for beginners.',
      'Limited range options.',
    ],
    abilities: [
      {
        title: 'Time Erase',
        description: 'Briefly become intangible and reposition behind enemies.',
      },
      {
        title: 'Impale',
        description: 'A heavy-hitting strike that pierces through defenses.',
      },
      {
        title: 'Epitaph',
        description: 'Counters the next incoming attack automatically.',
      },
    ],
  },
  {
    key: 'weather-report',
    name: 'Weather Report',
    tier: 'A',
    rarity: 'Rare',
    part: 'Part 6',
    bestFor: 'PvE grinding and large-scale AoE control',
    imageUrl: 'assets/stands/weather-report/card.jpg',
    quickVerdict:
      'The king of farming. If you need to clear quests or waves, this is your best friend.',
    summary:
      'Weather Report dominates PvE with its massive area-of-effect attacks, making it the most efficient choice for leveling.',
    howToGet: ['Obtained from Stand Arrow (Rare rarity).'],
    strengths: [
      'Unmatched AoE coverage for clearing mobs.',
      'Strong crowd control with Heavy Weather.',
      'Safe playstyle with many ranged options.',
    ],
    weaknesses: [
      'Lacks the high burst damage of other A-tier stands.',
      'Vulnerable in tight 1v1 duels against rushdown.',
      'Longer animation windups.',
    ],
    abilities: [
      {
        title: 'Frog Downpour',
        description: 'Rains poisonous frogs over a large area.',
      },
      {
        title: 'Howling Blitz',
        description: 'Strikes multiple enemies with bolts of lightning.',
      },
      {
        title: 'Heavy Weather',
        description: 'Slows and confuses enemies within a cloud.',
      },
    ],
  },
  {
    key: 'the-world-high-voltage',
    name: 'The World High Voltage',
    tier: 'A',
    rarity: 'Legendary',
    part: 'Part 7',
    bestFor: 'Mixed-range pressure and stealthy resets',
    imageUrl: 'assets/stands/the-world-high-voltage/card.png',
    quickVerdict:
      'A more versatile version of The World that trades some raw power for utility and ranged threat.',
    summary:
      'High Voltage adds a revolver and smoke bombs to the classic World toolkit, allowing for safer resets and better poking.',
    howToGet: [
      'Evolution only: Evolve The World using the "Saint\'s Corpse" path.',
    ],
    strengths: [
      'Excellent mix of ranged and melee attacks.',
      'Smoke Bomb provides great escape and reset potential.',
      'Keeps the powerful Time Stop mechanic.',
    ],
    weaknesses: [
      'Requires a difficult evolution process.',
      'Slightly lower base damage than the standard World.',
      'Can feel "clunky" compared to pure brawlers.',
    ],
    abilities: [
      {
        title: 'Revolver Barrage',
        description: 'Fires several shots from a distance to stun enemies.',
      },
      {
        title: 'Smoke Bomb',
        description: 'Blinds enemies and allows for a safe reposition.',
      },
      {
        title: 'Kick Volley',
        description: 'A series of rapid kicks to punish close targets.',
      },
    ],
  },
  {
    key: 'killer-queen',
    name: 'Killer Queen',
    tier: 'B',
    rarity: 'Rare',
    part: 'Part 4',
    bestFor: 'Area denial and defensive play',
    imageUrl: 'assets/stands/killer-queen/card.png',
    quickVerdict:
      'A strong "keep-away" stand that punishes enemies for trying to get close.',
    summary:
      'Killer Queen turns the battlefield into a minefield. It\'s great for players who like to control the pace of the fight.',
    howToGet: ['Obtained from Stand Arrow (Rare rarity).'],
    strengths: [
      'Excellent area denial with bombs.',
      'Very effective for PvE farming.',
      'Tracking projectiles with Sheer Heart Attack.',
    ],
    weaknesses: [
      'Slow and predictable combo routes.',
      'Struggles if the enemy manages to bypass the bombs.',
      'Low mobility.',
    ],
    abilities: [
      {
        title: 'Primary Bomb',
        description: 'Plants a bomb on an enemy or object to detonate later.',
      },
      {
        title: 'Sheer Heart Attack',
        description: 'A tracking drone that explodes on contact.',
      },
      {
        title: 'Stray Cat',
        description: 'Fires invisible air bombs that are hard to dodge.',
      },
    ],
  },
  {
    key: 'anubis',
    name: 'Anubis',
    tier: 'B',
    rarity: 'Rare',
    part: 'Part 3',
    bestFor: 'High-damage melee combos and swordplay',
    imageUrl: 'assets/stands/anubis/card.png',
    quickVerdict:
      'A pure rushdown stand with incredible melee speed, but it lacks any form of utility or range.',
    summary:
      'Anubis is for players who want to overwhelm their opponents with a flurry of sword strikes. It\'s very high damage if you can stay close.',
    howToGet: ['Obtained from Stand Arrow (Rare rarity).'],
    strengths: [
      'Some of the highest melee DPS in the game.',
      'Fast combo starters and finishers.',
      'Difficult to parry due to high attack speed.',
    ],
    weaknesses: [
      'Zero ranged utility.',
      'Easily kited by ranged stands.',
      'Weak in group fights or objective play.',
    ],
    abilities: [
      {
        title: 'Dice Cut',
        description: 'A rapid series of slashes that stun the target.',
      },
      {
        title: 'Cursed Severance',
        description: 'A massive strike that deals high burst damage.',
      },
      {
        title: 'Rend',
        description: 'A spinning attack that hits all nearby enemies.',
      },
    ],
  },
  {
    key: 'golden-experience',
    name: 'Golden Experience',
    tier: 'B',
    rarity: 'Uncommon',
    part: 'Part 5',
    bestFor: 'Sustain and beginner-friendly progression',
    imageUrl: 'assets/stands/golden-experience/card.png',
    quickVerdict:
      'A reliable choice for new players who want extra survivability through self-healing.',
    summary:
      'Golden Experience trades offensive power for utility. Its ability to heal makes it great for long grinding sessions.',
    howToGet: ['Obtained from Stand Arrow (Uncommon rarity).'],
    strengths: [
      'Self-healing and ally-healing capabilities.',
      'Frog reflect damage can punish high-burst enemies.',
      'Versatile kit with both melee and CC.',
    ],
    weaknesses: [
      'Low overall damage output.',
      'Lacks a definitive "finisher" move.',
      'Healing animations can be interrupted.',
    ],
    abilities: [
      {
        title: 'Restoration',
        description: 'Heals the user or a selected ally.',
      },
      {
        title: 'Frog',
        description: 'Summons a frog that reflects a portion of damage taken.',
      },
      {
        title: 'Root Strike',
        description: 'Summons roots to trip and stun enemies.',
      },
    ],
  },
  {
    key: 'stone-free',
    name: 'Stone Free',
    tier: 'B',
    rarity: 'Rare',
    part: 'Part 6',
    bestFor: 'Balanced combat and string-based traps',
    imageUrl: 'assets/stands/stone-free/card.jpg',
    quickVerdict:
      'A solid all-rounder that provides good mobility and control, but lacks a "wow" factor.',
    summary:
      'Stone Free is a very "honest" stand. It has tools for most situations but isn\'t overwhelmingly powerful in any single area.',
    howToGet: ['Obtained from Stand Arrow (Rare rarity).'],
    strengths: [
      'Good mobility with string grapple.',
      'Versatile at mid-range.',
      'Reliable stuns with string traps.',
    ],
    weaknesses: [
      'Average damage across the board.',
      'No major burst window.',
      'Often outclassed by specialized stands.',
    ],
    abilities: [
      {
        title: 'String Punch',
        description: 'A series of rapid hits that extend with string.',
      },
      {
        title: 'String Trap',
        description: 'Places a hidden trap that entangles enemies.',
      },
      {
        title: 'Spiraling Thread',
        description: 'A protective move that reduces incoming damage.',
      },
    ],
  },
  {
    key: 'magicians-red',
    name: "Magician's Red",
    tier: 'C',
    rarity: 'Uncommon',
    part: 'Part 3',
    bestFor: 'Early-game PvE and burning groups',
    imageUrl: 'assets/stands/magicians-red/card.png',
    quickVerdict:
      'A decent starter stand for clearing mobs, but its utility drops off sharply in PvP.',
    summary:
      "Magician's Red focuses on burn damage and AoE. It's effective for early quests but easily outplayed by faster stands.",
    howToGet: ['Obtained from Stand Arrow (Uncommon rarity).'],
    strengths: [
      'Good AoE for early-game farming.',
      'Burn damage adds up over time.',
      'Relatively easy to obtain.',
    ],
    weaknesses: [
      'Very slow move animations.',
      'Zero mobility tools.',
      'Highly vulnerable to rushdown brawlers.',
    ],
    abilities: [
      {
        title: 'Crossfire Hurricane',
        description: 'Fires multiple fireballs at enemies.',
      },
      {
        title: 'Red Bind',
        description: 'Entangles an enemy in fire, dealing DoT.',
      },
      {
        title: 'Ignition Burst',
        description: 'A powerful explosion centered on the user.',
      },
    ],
  },
  {
    key: 'crazy-diamond',
    name: 'Crazy Diamond',
    tier: 'C',
    rarity: 'Uncommon',
    part: 'Part 4',
    bestFor: 'Healing support and defensive brawling',
    imageUrl: 'assets/stands/crazy-diamond/card.png',
    quickVerdict:
      'A support-focused stand that can be useful in team play but struggles in solo duels.',
    summary:
      'Crazy Diamond is best used when playing with friends. Its healing and terrain-building skills are unique but niche.',
    howToGet: ['Obtained from Stand Arrow (Uncommon rarity).'],
    strengths: [
      'Excellent healing for teammates.',
      'Can build walls to block paths or projectiles.',
      'Decent melee speed.',
    ],
    weaknesses: [
      'Low solo damage potential.',
      'Predictable brawling moves.',
      'Struggles against ranged and high-mobility stands.',
    ],
    abilities: [
      {
        title: 'Heal Mode',
        description: 'Switches to a mode dedicated to restoring health.',
      },
      {
        title: 'Wall Smash',
        description: 'Creates a rock wall that damages and blocks.',
      },
      {
        title: 'Bearing Shot',
        description: 'Fires a projectile that deals moderate damage.',
      },
    ],
  },
  {
    key: 'purple-haze',
    name: 'Purple Haze',
    tier: 'C',
    rarity: 'Uncommon',
    part: 'Part 5',
    bestFor: 'High-risk, high-reward poison play',
    imageUrl: 'assets/stands/purple-haze/card.png',
    quickVerdict:
      'Deals massive damage but can easily kill the user if not handled with care.',
    summary:
      'Purple Haze is a glass cannon. Its virus deals incredible damage, but it doesn\'t distinguish between friend or foe.',
    howToGet: ['Obtained from Stand Arrow (Uncommon rarity).'],
    strengths: [
      'Extreme DoT with the virus.',
      'Strong area denial; enemies will avoid your clouds.',
      'Fast melee attacks.',
    ],
    weaknesses: [
      'Virus can damage the user and allies.',
      'Inconsistent in many PvP scenarios.',
      'Zero mobility or ranged threat.',
    ],
    abilities: [
      {
        title: 'Infectious Bulb',
        description: 'Releases a virus cloud on impact.',
      },
      {
        title: 'Bulb Smash',
        description: 'A powerful punch that releases multiple virus clouds.',
      },
      {
        title: 'Fury Strike',
        description: 'A frantic series of punches that spreads the virus.',
      },
    ],
  },
  {
    key: 'the-hand',
    name: 'The Hand',
    tier: 'D',
    rarity: 'Uncommon',
    part: 'Part 4',
    bestFor: 'Gimmick erasure builds and raw power',
    imageUrl: 'assets/stands/the-hand/card.png',
    quickVerdict:
      'High damage potential that is held back by slow animations and extreme predictability.',
    summary:
      'The Hand can erase health bars, but most players will simply walk away from its slow attacks. It lacks the tools to be competitive.',
    howToGet: ['Obtained from Stand Arrow (Uncommon rarity).'],
    strengths: [
      'Very high damage per hit.',
      'Erasure Pull can catch off-guard enemies.',
      'Defense-ignoring damage.',
    ],
    weaknesses: [
      'Extremely slow and punishable.',
      'Very short range on most moves.',
      'Predictable "one-trick" playstyle.',
    ],
    abilities: [
      {
        title: 'Erasure Swipe',
        description: 'A slow swipe that deals massive damage.',
      },
      {
        title: 'Erasure Pull',
        description: 'Erases space to pull an enemy toward you.',
      },
      {
        title: 'Hard Left',
        description: 'A heavy punch that knocks enemies back.',
      },
    ],
  },
  {
    key: 'red-hot-chili-pepper',
    name: 'Red Hot Chili Pepper',
    tier: 'D',
    rarity: 'Common',
    part: 'Part 4',
    bestFor: 'Early mobility and learning the game',
    imageUrl: 'assets/stands/red-hot-chilly-pepper/card.png',
    quickVerdict:
      'Good for moving around the map early on, but its damage is outclassed by almost everything else.',
    summary:
      'Red Hot Chili Pepper is a common pull that offers some mobility but fails to provide the damage or CC needed for serious play.',
    howToGet: ['Obtained from Stand Arrow (Common rarity).'],
    strengths: [
      'Flash provides decent early-game mobility.',
      'Easy to obtain for new players.',
      'Electric effects can stun briefly.',
    ],
    weaknesses: [
      'Very low base damage.',
      'Poor scaling into the mid and late game.',
      'Lacks any meaningful combo potential.',
    ],
    abilities: [
      {
        title: 'Electrical Surge',
        description: 'Releases a burst of electricity around the user.',
      },
      {
        title: 'Flash',
        description: 'A quick teleport that leaves a damaging trail.',
      },
      {
        title: 'Thunder Rod',
        description: 'A basic electric-infused melee strike.',
      },
    ],
  },
] as const;

export const standTierDescriptions: Record<StandTier, string> = {
  S: 'The Meta Kings. Unmatched in their respective roles, whether it\'s mobility, control, or raw power.',
  A: 'Strong & Reliable. Excellent choices for competitive play and high-efficiency farming.',
  B: 'Solid Mid-Tier. Playable and fun, but they require more effort to beat top-tier stands.',
  C: 'Niche or Starter. Useful for early progression or specific playstyles, but generally outclassed.',
  D: 'Underpowered. These stands need significant buffs to compete with the rest of the roster.',
};

export const starPlatinum = stands[4]; // Updated index
