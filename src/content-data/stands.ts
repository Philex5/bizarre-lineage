export type StandTier = 'S' | 'A' | 'B' | 'C';

export type StandEntry = {
  key: string;
  name: string;
  tier: StandTier;
  rarity: string;
  part: string;
  bestFor: string;
  howToGet: string[];
  strengths: string[];
  weaknesses: string[];
  quickVerdict: string;
  summary: string;
  abilities: Array<{ title: string; description: string }>;
};

export const standResearchNotes = {
  verifiedAt: '2026-03-08',
  tierSource: 'Provided tier chart image credited in-image to Sportskeeda.',
  methodology:
    'Tier placements follow the supplied chart, with stand cards rewritten into on-site summaries focused on obtainment, role, strengths, and weaknesses.',
} as const;

export const stands: StandEntry[] = [
  {
    key: 'star-platinum',
    name: 'Star Platinum',
    tier: 'S',
    rarity: 'Legendary',
    part: 'Part 3',
    bestFor: 'PvP burst and all-round duels',
    quickVerdict:
      'Top-tier pressure pick with Time Stop follow-ups and strong single-target damage.',
    summary:
      'Star Platinum sits in S tier on the provided chart and stays one of the safest high-end duel picks once you can support the chase.',
    howToGet: [
      'Obtained from Stand Arrow.',
      'The checked fan reference cites public Trello notes for the arrow acquisition path.',
      'Treat it as a premium reroll target rather than a guaranteed early-game route.',
    ],
    strengths: [
      'High single-target burst.',
      'Time Stop creates reliable follow-ups.',
      'Fits both quick verdict comparisons and deeper stand-page analysis.',
    ],
    weaknesses: [
      'Low AoE coverage.',
      'Neutral plan can become predictable.',
      'It is strong, but not always the correct first grind on a fresh account.',
    ],
    abilities: [
      {
        title: 'Barrage',
        description: 'Fast melee pressure starter for standard confirms.',
      },
      {
        title: 'Star Finger',
        description: 'Brief stun tool that helps convert openings into damage.',
      },
      {
        title: 'Time Stop',
        description:
          'Stops time for roughly five seconds and powers its best punish routes.',
      },
    ],
  },
  {
    key: 'the-world',
    name: 'The World',
    tier: 'S',
    rarity: 'Legendary',
    part: 'Part 3',
    bestFor: 'PvP burst and Time Stop punish',
    quickVerdict:
      'Elite duel stand with huge damage, but missed Time Stop windows are costly.',
    summary:
      'The World lands in S tier on the supplied chart thanks to premium burst and a punishing Time Stop threat profile.',
    howToGet: [
      'Obtained from Stand Arrow.',
      'The checked stand page attributes the obtainment note to public Trello references.',
      'The value spikes when your build can play around cooldown-heavy punish windows.',
    ],
    strengths: [
      'Very high base damage.',
      'Long Time Stop window.',
      'Strong win-condition once it gets a clean opening.',
    ],
    weaknesses: [
      'High cooldown commitment.',
      'Punishable after a failed Time Stop.',
      'Less forgiving when the player forces bad engages.',
    ],
    abilities: [
      {
        title: 'Hard Fight',
        description: 'Heavy knockback punch for burst conversions.',
      },
      {
        title: 'Knives',
        description:
          'Ranged knife throw that extends pressure from safer spacing.',
      },
      {
        title: 'Time Stop',
        description: 'Core punish mechanic that defines its S-tier ceiling.',
      },
    ],
  },
  {
    key: 'whitesnake',
    name: 'Whitesnake',
    tier: 'S',
    rarity: 'Mythical',
    part: 'Part 6',
    bestFor: 'Control chains and duel disruption',
    quickVerdict:
      'One of the strongest control stands, with disc pressure and meaningful AoE threat.',
    summary:
      'Whitesnake is an S-tier control pick on the provided chart and a key progression branch because it also leads into evolution paths.',
    howToGet: [
      'Obtained from Stand Arrow.',
      'The checked page lists it as an arrow stand and cites public Trello move and obtainment notes.',
      'It is a premium target if you want control first and future evolution options later.',
    ],
    strengths: [
      'Strong control chain potential.',
      'Disc Extraction can swing close duels.',
      'Has real AoE pressure for more than one matchup type.',
    ],
    weaknesses: [
      'Low mobility.',
      'Can struggle into faster stands.',
      'Needs better spacing discipline than simpler brawlers.',
    ],
    abilities: [
      {
        title: 'Disc Throw',
        description:
          'Burning disc toss that gives ranged pressure and chip threat.',
      },
      {
        title: 'Disc Extraction',
        description:
          'Signature control tool that creates its scariest duel swings.',
      },
      {
        title: 'Revolver',
        description: 'Fast ranged poke to check movement and force respect.',
      },
    ],
  },
  {
    key: 'c-moon',
    name: 'C-Moon',
    tier: 'S',
    rarity: 'Special',
    part: 'Part 6',
    bestFor: 'Combo setups and gravity control',
    quickVerdict:
      'High-reward evolution stand with deadly combo routing, but awkward hitboxes raise execution cost.',
    summary:
      'C-Moon remains S tier on the supplied chart because gravity-based control and bleed give it premium conversion value once evolved.',
    howToGet: [
      'Evolution-only stand; evolve Whitesnake instead of rerolling arrows.',
      'The checked stand page explicitly marks it as an evolution path.',
      'Plan the quest route first because this is not a standard Arrow pull.',
    ],
    strengths: [
      'Auto-combo potential with Gravity Barrier.',
      'High bleed damage.',
      'Strong control once gravity tools are confirmed.',
    ],
    weaknesses: [
      'Awkward hitboxes.',
      'Misses are easy to punish.',
      'Demands cleaner execution than its tier letter suggests.',
    ],
    abilities: [
      {
        title: 'Graviton Reversal',
        description:
          'Double-slam gravity attack that starts heavy punish routes.',
      },
      {
        title: 'Rock Barrage',
        description: 'Ranged debris stun that helps create follow-up windows.',
      },
      {
        title: 'Gravity Crusher',
        description:
          'Heavy gravity effect that locks targets down for conversions.',
      },
    ],
  },
  {
    key: 'made-in-heaven',
    name: 'Made in Heaven',
    tier: 'S',
    rarity: 'Special',
    part: 'Part 6',
    bestFor: 'Speed pressure and evasive PvP',
    quickVerdict:
      'S-tier mobility monster that snowballs hard once setup is active.',
    summary:
      'Made in Heaven closes the S-tier row on the provided chart because unmatched mobility and chase pressure can take over fights quickly.',
    howToGet: [
      'Evolution-only stand; evolve C-Moon instead of rerolling arrows.',
      'The checked page marks it as a progression stand rather than an Arrow roll.',
      'Route planning matters because its peak value only appears after the full evolution chain.',
    ],
    strengths: [
      'Very high mobility.',
      'Extremely hard to pin down when buffed.',
      'Can run over slower opponents once momentum starts.',
    ],
    weaknesses: [
      'Low durability.',
      'Needs setup before peaking.',
      'Less forgiving when caught before the speed advantage is online.',
    ],
    abilities: [
      {
        title: 'Infinite Pursuit',
        description:
          'Teleporting dash combo starter that keeps pressure flowing.',
      },
      {
        title: "Heaven's Wrath",
        description:
          'High-speed dash-through punish for evasive burst sequences.',
      },
      {
        title: 'Knife Massacre',
        description: 'Layered knife pressure with a follow-up input.',
      },
    ],
  },
  {
    key: 'the-world-high-voltage',
    name: 'The World High Voltage',
    tier: 'A',
    rarity: 'Legendary',
    part: 'Part 7',
    bestFor: 'Hybrid ranged/melee Time Stop play',
    quickVerdict:
      'Strong evolution pick with flexible pressure, but it asks for more execution and setup.',
    summary:
      'The World High Voltage starts the A tier because its toolkit is versatile, yet the evolution requirement and skill demand keep it under the S row.',
    howToGet: [
      'Evolution-only stand; evolve The World through its progression route.',
      'The checked page notes that it is not a standard Arrow roll.',
      'It makes more sense once you already know you want a Time Stop variant with more ranged utility.',
    ],
    strengths: [
      'Time Stop creates strong openings.',
      'Mixes ranged and melee pressure well.',
      'Smoke Bomb adds escape utility and reset value.',
    ],
    weaknesses: [
      'Needs an evolution path first.',
      'Higher skill ceiling than simpler A-tier picks.',
      'More setup-heavy than the cleanest top-end duel options.',
    ],
    abilities: [
      {
        title: 'Revolver Barrage',
        description: 'Four-shot ranged string with stun potential.',
      },
      {
        title: 'Knives',
        description:
          'Reliable ranged punish tool that supports spacing mixups.',
      },
      {
        title: 'Smoke Bomb',
        description: 'Escape and reset option for chaotic scrambles.',
      },
    ],
  },
  {
    key: 'weather-report',
    name: 'Weather Report',
    tier: 'A',
    rarity: 'Rare',
    part: 'Part 6',
    bestFor: 'PvE clearing and screen control',
    quickVerdict:
      'Excellent for missions and zone control, though it gives up single-target speed.',
    summary:
      'Weather Report earns an A-tier slot on the provided chart by trading duel burst for broad AoE coverage and crowd-control utility.',
    howToGet: [
      'Obtained from Stand Arrow.',
      'The checked stand page attributes the acquisition note to public Trello references.',
      'It is one of the cleaner options if your immediate goal is farming or mission pressure.',
    ],
    strengths: [
      'Screen-wide AoE coverage.',
      'Strong mission clearing.',
      'Heavy Weather supplies crowd control.',
    ],
    weaknesses: [
      'Low single-target damage.',
      'Long windups on ranged tools.',
      'Feels worse when fights stay strictly duel-focused.',
    ],
    abilities: [
      {
        title: 'Howling Blitz',
        description: 'Lightning blast with knockback for space control.',
      },
      {
        title: 'Frog Downpour',
        description: 'Poison frog AoE that punishes grouped targets.',
      },
      {
        title: 'Heavy Weather',
        description: 'Crowd-control utility that slows the pace of a fight.',
      },
    ],
  },
  {
    key: 'killer-queen',
    name: 'Killer Queen',
    tier: 'A',
    rarity: 'Rare',
    part: 'Part 4',
    bestFor: 'Area denial and PvE farming',
    quickVerdict:
      'A strong trap-oriented option when you can keep opponents from rushing you down.',
    summary:
      'Killer Queen sits in A tier on the supplied chart because bombs and tracking pressure make it useful beyond a single narrow matchup.',
    howToGet: [
      'Obtained from Stand Arrow.',
      'The checked stand page cites public Trello-backed obtainment notes.',
      'The stand is best when your route rewards zoning, farming, and trap value over pure rushdown.',
    ],
    strengths: [
      'Strong area denial.',
      'Useful for PvE farming.',
      'Threatens space well when opponents have to respect bombs.',
    ],
    weaknesses: [
      'Slow combo routes.',
      'Gets rushed down easily.',
      'Looks much weaker when denied setup time.',
    ],
    abilities: [
      {
        title: 'Primary Bomb',
        description:
          'Grab-and-detonate burst tool for punishing close mistakes.',
      },
      {
        title: 'Sheer Heart Attack',
        description: 'Tracking explosive drone that keeps pressure active.',
      },
      {
        title: 'Stray Cat',
        description: 'Invisible projectile that extends ranged threat.',
      },
    ],
  },
  {
    key: 'king-crimson',
    name: 'King Crimson',
    tier: 'A',
    rarity: 'Legendary',
    part: 'Part 5',
    bestFor: 'Outplay-heavy PvP and burst',
    quickVerdict:
      'Deadly in practiced hands, but more demanding than the easiest top picks.',
    summary:
      'King Crimson remains in A tier on the provided chart because Time Erase is elite utility, but its value depends more on player timing discipline.',
    howToGet: [
      'Obtained from Stand Arrow.',
      'The checked page cites public Trello notes for the obtainment method.',
      'This stand pays off most when you actively want a duel-focused outplay toolkit.',
    ],
    strengths: [
      'Time Erase enables safe engage and disengage.',
      'High burst damage.',
      'Excellent punish profile when the player understands timing windows.',
    ],
    weaknesses: [
      'Limited PvE farming tools.',
      'High skill ceiling.',
      'More execution-sensitive than broad all-rounder picks.',
    ],
    abilities: [
      {
        title: 'Impale',
        description: 'Double-input burst string that defines many confirms.',
      },
      {
        title: 'Time Erase',
        description: 'Core reposition and outplay mechanic for neutral skips.',
      },
      {
        title: 'Chop',
        description: 'Simple punish tool that helps cash out small openings.',
      },
    ],
  },
  {
    key: 'golden-experience',
    name: 'Golden Experience',
    tier: 'B',
    rarity: 'Uncommon',
    part: 'Part 5',
    bestFor: 'Sustain and flexible progression',
    quickVerdict:
      'Solid utility stand that trades raw damage for healing and safer all-round value.',
    summary:
      'Golden Experience opens the B tier because sustain and utility are real strengths, but the damage profile is too modest for higher placement.',
    howToGet: [
      'Obtained from Stand Arrow.',
      'The checked stand page cites public Trello-backed obtainment notes.',
      'It is a practical choice when you want survivability more than premium burst.',
    ],
    strengths: [
      'Self-healing sustain.',
      'Versatile kit.',
      'Frog reflect punishes careless hits.',
    ],
    weaknesses: [
      'Below-average raw damage.',
      'Slow startup on Restoration.',
      'Wins more through stability than oppressive pressure.',
    ],
    abilities: [
      {
        title: 'Restoration',
        description: 'Creates healing utility from terrain interactions.',
      },
      {
        title: 'Soul Strike',
        description: 'Knockout-style melee punish that disrupts rhythm.',
      },
      {
        title: 'Root Strike',
        description: 'Pursuing roots that extend melee confirms.',
      },
    ],
  },
  {
    key: 'anubis',
    name: 'Anubis',
    tier: 'B',
    rarity: 'Rare',
    part: 'Part 3',
    bestFor: 'Close-range melee combos',
    quickVerdict:
      'Great sword pressure in duels, but weak range and group-fight value keep it out of higher tiers.',
    summary:
      'Anubis lands in B tier on the supplied chart because direct melee pressure is real, but its limitations show quickly outside clean duels.',
    howToGet: [
      'Obtained from Stand Arrow.',
      'The checked stand page attributes the obtainment note to public Trello references.',
      'Pick it when you want simple melee commitment and accept the lack of ranged flexibility.',
    ],
    strengths: [
      'Very high melee damage.',
      'Fast combo chains.',
      'Custom sword pressure makes close fights threatening.',
    ],
    weaknesses: [
      'No ranged options.',
      'No AoE presence.',
      'Struggles in group fights.',
    ],
    abilities: [
      {
        title: 'Rend',
        description: 'Spinning slash that keeps close-range pressure active.',
      },
      {
        title: 'Dice Out',
        description: 'Dash slice combo with stun follow-up.',
      },
      {
        title: 'Cursed Severance',
        description: 'Powered-up slash finisher for burst strings.',
      },
    ],
  },
  {
    key: 'stone-free',
    name: 'Stone Free',
    tier: 'B',
    rarity: 'Rare',
    part: 'Part 6',
    bestFor: 'Balanced fights across multiple ranges',
    quickVerdict:
      'Reliable and flexible, but it lacks the oppressive edge of the higher tiers.',
    summary:
      'Stone Free holds a B-tier slot on the chart because range coverage and mobility are useful, yet the kit lacks a truly dominant finishing edge.',
    howToGet: [
      'Obtained from Stand Arrow.',
      'The checked stand page cites public Trello-backed obtainment notes.',
      'It is a sensible choice if you want balance and trapping tools instead of a hard specialist.',
    ],
    strengths: [
      'Versatile at all ranges.',
      'String Trap gives reliable crowd control.',
      'Good mobility.',
    ],
    weaknesses: [
      'Balanced rather than oppressive.',
      'No standout burst finisher.',
      'Feels honest in a meta that rewards stronger spikes.',
    ],
    abilities: [
      {
        title: 'Sting Punch',
        description: 'String-wrapped heavy hit for direct confirms.',
      },
      {
        title: 'Dropkick',
        description: 'String bind into melee follow-up pressure.',
      },
      {
        title: 'String Trap',
        description: 'Ground trap that locks targets in place.',
      },
    ],
  },
  {
    key: 'crazy-diamond',
    name: 'Crazy Diamond',
    tier: 'B',
    rarity: 'Uncommon',
    part: 'Part 4',
    bestFor: 'Healing support and combo confirms',
    quickVerdict:
      'Useful sustain stand with real combo upside, but weak range lowers consistency.',
    summary:
      'Crazy Diamond is placed in B tier on the supplied chart because healing and confirms are useful, but the neutral game is not strong enough for A tier.',
    howToGet: [
      'Obtained from Stand Arrow.',
      'The checked stand page cites public Trello-backed obtainment notes.',
      'It fits players who value sustain and utility more than hard range control.',
    ],
    strengths: [
      'Strong healing access.',
      'Combo potential when its trap tools connect.',
      'Useful midpoint choice for balanced progression routes.',
    ],
    weaknesses: [
      'Low range.',
      'Harder neutral game.',
      'Needs more setup than its statline first suggests.',
    ],
    abilities: [
      {
        title: 'Bearing Shot',
        description: 'Short ranged projectile pressure to start confirms.',
      },
      {
        title: 'Heal Mode',
        description: 'Restoration stance that adds sustain utility.',
      },
      {
        title: 'Rock Trap',
        description: 'Combo starter that pays off when it lands cleanly.',
      },
    ],
  },
  {
    key: 'purple-haze',
    name: 'Purple Haze',
    tier: 'C',
    rarity: 'Uncommon',
    part: 'Part 5',
    bestFor: 'Poison pressure in close fights',
    quickVerdict:
      'Dangerous damage profile, but self-risk and mobility issues make it inconsistent.',
    summary:
      'Purple Haze leads the C tier because the damage is scary, but the stand asks for too many risky tradeoffs to rank higher.',
    howToGet: [
      'Obtained from Stand Arrow.',
      'The checked stand page cites public Trello-backed obtainment notes.',
      'Use it only if you specifically want poison pressure and accept the collateral risk.',
    ],
    strengths: [
      'Very high single-target damage.',
      'Poison creates area denial.',
      'Can win short-range scrambles quickly when it gets started.',
    ],
    weaknesses: [
      'Idle Rage can hurt the user.',
      'Low mobility.',
      'Poison can affect allies.',
    ],
    abilities: [
      {
        title: 'Bulb Punch',
        description: 'Auto-tracking poison strike for close confirms.',
      },
      {
        title: 'Fury Strike',
        description: 'Close-range poison combo tool with fast payoff.',
      },
      {
        title: 'Infection Frenzy',
        description: 'Grab sequence that stacks heavy poison damage.',
      },
    ],
  },
  {
    key: 'red-hot-chili-pepper',
    name: 'Red Hot Chili Pepper',
    tier: 'C',
    rarity: 'Common',
    part: 'Part 4',
    bestFor: 'Early leveling and mobility',
    quickVerdict:
      'Fine for early progression, but the damage profile falls off quickly.',
    summary:
      'Red Hot Chili Pepper stays in C tier on the supplied chart because mobility helps early, yet the overall damage ceiling fades fast.',
    howToGet: [
      'Obtained from Stand Arrow.',
      'The checked stand page cites public Trello-backed obtainment notes.',
      'It is more of an early stepping-stone than a long-term chase target.',
    ],
    strengths: [
      'Flash gives useful mobility.',
      'Accessible early-game option.',
      'Can help early leveling more than its final rank suggests.',
    ],
    weaknesses: [
      'Low damage output.',
      'Falls off fast later.',
      'No reliable sustained damage.',
    ],
    abilities: [
      {
        title: 'Thunder God',
        description: 'Electric slam that creates an AoE zone.',
      },
      {
        title: 'Flash',
        description: 'Teleport movement tool with a damaging trail.',
      },
      {
        title: 'Pinky Slash',
        description: 'Fast melee stun option for small confirms.',
      },
    ],
  },
  {
    key: 'the-hand',
    name: 'The Hand',
    tier: 'C',
    rarity: 'Uncommon',
    part: 'Part 4',
    bestFor: 'Short-range erasure punish',
    quickVerdict:
      'Can punish hard up close, but predictable routing and no sustain hold it back.',
    summary:
      'The Hand stays in C tier on the chart because defense-ignoring hits matter, yet range and sustain problems limit consistency.',
    howToGet: [
      'Obtained from Stand Arrow.',
      'The checked stand page cites public Trello-backed obtainment notes.',
      'The stand is workable if you want erasure gimmicks more than broad reliability.',
    ],
    strengths: [
      'Defense-ignoring attacks.',
      'Erasure Pull closes space quickly.',
      'Can punish mistakes hard once targets are in range.',
    ],
    weaknesses: [
      'Short range on most moves.',
      'No sustain.',
      'Predictable combos.',
    ],
    abilities: [
      {
        title: 'Erasure Swipe',
        description: 'Charged erasure hit with stun and burst threat.',
      },
      {
        title: 'Erasure Pull',
        description: 'Forces targets into your preferred range.',
      },
      {
        title: 'Hard Left',
        description: 'Simple knockback punish tool for direct confirms.',
      },
    ],
  },
  {
    key: 'magicians-red',
    name: "Magician's Red",
    tier: 'C',
    rarity: 'Uncommon',
    part: 'Part 3',
    bestFor: 'Quest grinding and AoE coverage',
    quickVerdict:
      'Useful for clearing groups, but slow tools and weak mobility limit PvP reliability.',
    summary:
      "Magician's Red closes the C tier because AoE quest value is real, but the stand gets exposed once faster opponents collapse on it.",
    howToGet: [
      'Obtained from Stand Arrow.',
      'The same Trello-backed fan references list it as an arrow stand.',
      'It is mainly worth considering when you care more about farming and coverage than chase-tier duels.',
    ],
    strengths: [
      'High AoE coverage.',
      'Useful for quest grinding.',
      'Can pressure groups better than many other C-tier options.',
    ],
    weaknesses: ['Slow moves.', 'No mobility tools.', 'Weak into rushdown.'],
    abilities: [
      {
        title: 'Flamethrower',
        description: 'Sustained flame breath that burns targets over time.',
      },
      {
        title: 'Life Sensor',
        description:
          'Tracking flame utility that helps reveal and pressure targets.',
      },
      {
        title: 'Flame Punch',
        description: 'Basic melee fire confirm for short-range openings.',
      },
    ],
  },
] as const;

export const standTierDescriptions: Record<StandTier, string> = {
  S: 'Best overall picks from the provided chart, usually worth deeper research before long grinds.',
  A: 'Strong stands with clear payoff, but more visible tradeoffs in execution, farming comfort, or route cost.',
  B: 'Playable middle-tier options that can work well, but usually need more matchup awareness or accept lower ceilings.',
  C: 'Useful mostly for niche goals, early progression, or comfort picks rather than broad long-term value.',
};

export const starPlatinum = stands[0];
