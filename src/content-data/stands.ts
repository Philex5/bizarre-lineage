export type StandTier = 'S' | 'A' | 'B' | 'C' | 'D';
export type StandLocale = 'en' | 'es';

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

export function getStandHref(standKey: string) {
  return stands.some((stand) => stand.key === standKey)
    ? `/stands/${standKey}`
    : `/stands#${standKey}`;
}

export const standResearchNotes = {
  verifiedAt: '2026-03-09',
  tierSource:
    'Community research and latest tier list updates (Destructoid, March 2026).',
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
        description:
          'A lightning-fast dash attack that punishes spacing errors.',
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
      "King Crimson is a technical duelist. It rewards players who can predict their opponent's moves and use Time Erase to reposition.",
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
      "Killer Queen turns the battlefield into a minefield. It's great for players who like to control the pace of the fight.",
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
      "Anubis is for players who want to overwhelm their opponents with a flurry of sword strikes. It's very high damage if you can stay close.",
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
      "Purple Haze is a glass cannon. Its virus deals incredible damage, but it doesn't distinguish between friend or foe.",
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

type LocalizedStandFields = Omit<
  StandEntry,
  'key' | 'name' | 'tier' | 'imageUrl'
>;

const esStandContent: Record<string, LocalizedStandFields> = {
  'made-in-heaven': {
    rarity: 'Especial',
    part: 'Parte 6',
    bestFor: 'Movilidad extrema en PvP y presión a toda velocidad',
    quickVerdict:
      'Ahora mismo es la cima del meta PvP. Su velocidad y su capacidad para cerrar distancias hacen que sea dificilísimo frenarlo.',
    summary:
      'Made in Heaven es la evolución final de la línea de Whitesnake. Cambia parte del control de sus fases anteriores por una velocidad absolutamente desbordante.',
    howToGet: [
      'Solo por evolución: evoluciona C-Moon con Prestigio 1+ y más de 100 de Conjuring.',
      'Necesita una cadena de misiones compleja relacionada con "Way to Heaven".',
    ],
    strengths: [
      'Movilidad brutal y capacidad excelente para perseguir.',
      'Muy difícil de responder en duelos 1c1.',
      'Mucho margen para sacar ventaja con sus buffs de velocidad.',
    ],
    weaknesses: [
      'Aguanta menos de lo que parece.',
      'Exige bastante preparación y una evolución costosa.',
      'No es la mejor opción para farmear PvE en grupo.',
    ],
    abilities: [
      {
        title: 'Infinite Pursuit',
        description: 'Un dash con teletransporte que abre combos rapidísimos.',
      },
      {
        title: "Heaven's Wrath",
        description:
          'Una embestida fulminante que castiga cualquier mal spacing.',
      },
      {
        title: 'Acceleration',
        description:
          'Aumenta muchísimo la velocidad de movimiento y de ataque.',
      },
    ],
  },
  whitesnake: {
    rarity: 'Mítico',
    part: 'Parte 6',
    bestFor: 'Control, interrupciones y ruta de evolución',
    quickVerdict:
      'Un stand top muy completo que rinde tanto en PvE como en PvP. Es la pieza clave para llegar a C-Moon y Made in Heaven.',
    summary:
      'Whitesnake ofrece uno de los mejores controles de masas del juego gracias a su extracción de discos, así que sigue siendo peligroso a cualquier distancia.',
    howToGet: [
      'Se obtiene con Stand Arrow (rareza mítica).',
      'Es una de las tiradas más buscadas por todo su potencial de evolución.',
    ],
    strengths: [
      'Control de masas muy sólido con Disc Extraction.',
      'Buen daño prolongado con ataques de ácido.',
      'Funciona bien tanto en duelos como en PvE de grupo.',
    ],
    weaknesses: [
      'Tiene menos movilidad que sus evoluciones.',
      'Las habilidades de disco exigen bastante puntería.',
      'Sufre contra stands de rush muy agresivos.',
    ],
    abilities: [
      {
        title: 'Disc Extraction',
        description:
          'Aturde al rival y le quita temporalmente parte de sus habilidades.',
      },
      {
        title: 'Acid Rupture',
        description:
          'Aplica bastante daño prolongado y ralentiza a los enemigos en área.',
      },
      {
        title: 'Revolver',
        description:
          'Un disparo rápido a distancia para mantener la presión sin acercarte.',
      },
    ],
  },
  'c-moon': {
    rarity: 'Especial',
    part: 'Parte 6',
    bestFor: 'Combos de gravedad y control de zona',
    quickVerdict:
      'Una evolución muy potente con mecánicas de gravedad capaces de bloquear incluso a rivales muy móviles.',
    summary:
      'C-Moon conecta la progresión entre Whitesnake y Made in Heaven, y destaca por su denegación de zona y sus inicios de combo muy castigadores.',
    howToGet: [
      'Solo por evolución: evoluciona Whitesnake con Prestigio 1+ y más de 100 de Conjuring.',
    ],
    strengths: [
      'Control de masas con gravedad muy fuerte y difícil de contestar.',
      'Buen sangrado y mucho potencial de combo.',
      'Muy bueno kiteando y castigando desde media distancia.',
    ],
    weaknesses: [
      'Algunos hitboxes no son fáciles de clavar.',
      'Las habilidades clave de gravedad tienen enfriamientos más largos.',
      'Solo se consigue evolucionando Whitesnake.',
    ],
    abilities: [
      {
        title: 'Graviton Reversal',
        description:
          'Invierte la gravedad y estrella a los enemigos contra el suelo.',
      },
      {
        title: 'Gravity Barrier',
        description:
          'Crea una zona que ralentiza y daña a quien se queda dentro.',
      },
      {
        title: 'Rock Barrage',
        description:
          'Lanza escombros que aturden e interrumpen acciones rivales.',
      },
    ],
  },
  'the-world': {
    rarity: 'Legendario',
    part: 'Parte 3',
    bestFor: 'Castigos con Time Stop y duelos de burst alto',
    quickVerdict:
      'El clásico peso pesado. Ya no domina como algunos stands de evolución, pero sigue siendo un duelista de primer nivel.',
    summary:
      'The World está hecho para una sola cosa: parar el tiempo y borrar barras de vida. Su DPS a un solo objetivo sigue siendo de lo mejor del juego.',
    howToGet: ['Se obtiene con Stand Arrow (rareza legendaria).'],
    strengths: [
      'Burst enorme durante Time Stop.',
      'Muy buen daño a objetivo único.',
      'Poke a distancia fiable con cuchillos.',
    ],
    weaknesses: [
      'Depende muchísimo de Time Stop para sus mejores jugadas.',
      'Su AoE pequeño lo penaliza en grupos grandes.',
      'Se vuelve más previsible cuando Time Stop está en enfriamiento.',
    ],
    abilities: [
      {
        title: 'Time Stop',
        description:
          'Congela a todos los enemigos cercanos durante unos segundos.',
      },
      {
        title: 'Knives',
        description: 'Lanza una ráfaga de cuchillos con bastante daño.',
      },
      {
        title: 'Kick Volley',
        description: 'Un remate cuerpo a cuerpo muy contundente.',
      },
    ],
  },
  'star-platinum': {
    rarity: 'Legendario',
    part: 'Parte 3',
    bestFor: 'Pelea cuerpo a cuerpo y cadenas de aturdimiento',
    quickVerdict:
      'Un brawler icónico que destaca pegándose al objetivo y encadenando stuns muy fiables.',
    summary:
      'Star Platinum es una referencia clarísima entre los stands melé. Aguanta bien, pega de forma constante y castiga muy rápido en distancias cortas.',
    howToGet: ['Se obtiene con Stand Arrow (rareza legendaria).'],
    strengths: [
      'Velocidad de ataque alta y mucha presión cuerpo a cuerpo.',
      'Stuns muy consistentes con Star Finger e Inhale.',
      'Rinde bien en casi cualquier situación PvP.',
    ],
    weaknesses: [
      'Prácticamente no tiene presencia a distancia.',
      'Le cuesta entrar contra stands centrados en zonear.',
      'Necesita estar muy cerca para sacar todo su valor.',
    ],
    abilities: [
      {
        title: 'Star Finger',
        description: 'Un golpe de alcance ampliado que aturde al objetivo.',
      },
      {
        title: 'Inhale',
        description: 'Atrae al rival para asegurar el siguiente castigo.',
      },
      {
        title: 'Time Stop',
        description:
          'Su movimiento insignia para garantizar un combo completo.',
      },
    ],
  },
  'king-crimson': {
    rarity: 'Legendario',
    part: 'Parte 5',
    bestFor: 'Outplay, lectura del rival y contraataques',
    quickVerdict:
      'Es un stand de manos finas que puede saltarse por completo los ataques rivales gracias a Time Erase.',
    summary:
      'King Crimson es un duelista técnico. Premia a quien sabe leer al rival y usar Time Erase para recolocarse justo en el momento clave.',
    howToGet: ['Se obtiene con Stand Arrow (rareza legendaria).'],
    strengths: [
      'Utilidad de élite con Time Erase y Epitaph.',
      'Burst muy alto con Impale.',
      'Uno de los mejores picks de counter del juego.',
    ],
    weaknesses: [
      'Farmea PvE bastante peor que otros stands.',
      'Tiene un skill floor alto y no es amable con principiantes.',
      'Sus opciones a distancia son limitadas.',
    ],
    abilities: [
      {
        title: 'Time Erase',
        description:
          'Te vuelve intangible unos instantes y te recoloca tras el enemigo.',
      },
      {
        title: 'Impale',
        description:
          'Un golpe muy duro que atraviesa parte de la defensa rival.',
      },
      {
        title: 'Epitaph',
        description:
          'Contrarresta automáticamente el siguiente ataque entrante.',
      },
    ],
  },
  'weather-report': {
    rarity: 'Raro',
    part: 'Parte 6',
    bestFor: 'Farmeo PvE y control de área a gran escala',
    quickVerdict:
      'El rey del farmeo. Si tu objetivo es limpiar misiones u oleadas, es de los mejores compañeros posibles.',
    summary:
      'Weather Report domina el PvE con ataques de área enormes, por eso sigue siendo una de las opciones más eficientes para subir y farmear.',
    howToGet: ['Se obtiene con Stand Arrow (rareza rara).'],
    strengths: [
      'Cobertura AoE excelente para limpiar mobs.',
      'Buen control de masas con Heavy Weather.',
      'Estilo de juego bastante seguro gracias a su alcance.',
    ],
    weaknesses: [
      'No tiene el burst de otros stands del tier A.',
      'Sufre en 1c1 cerrados contra personajes de rush.',
      'Varias animaciones tardan más en salir.',
    ],
    abilities: [
      {
        title: 'Frog Downpour',
        description: 'Hace llover ranas venenosas sobre una zona amplia.',
      },
      {
        title: 'Howling Blitz',
        description: 'Golpea a varios enemigos con rayos en cadena.',
      },
      {
        title: 'Heavy Weather',
        description: 'Ralentiza y descoloca a los enemigos dentro de una nube.',
      },
    ],
  },
  'the-world-high-voltage': {
    rarity: 'Legendario',
    part: 'Parte 7',
    bestFor: 'Presión mixta a varias distancias y resets sigilosos',
    quickVerdict:
      'Una versión más versátil de The World que cambia algo de daño bruto por utilidad y amenaza a distancia.',
    summary:
      'High Voltage añade revólver y bombas de humo al kit clásico de The World, lo que facilita resets más seguros y un poke bastante mejor.',
    howToGet: [
      'Solo por evolución: evoluciona The World mediante la ruta de "Saint\'s Corpse".',
    ],
    strengths: [
      'Muy buena mezcla de ataques cuerpo a cuerpo y a distancia.',
      'Smoke Bomb da margen para escapar y reiniciar la pelea.',
      'Mantiene la potencia de Time Stop.',
    ],
    weaknesses: [
      'La evolución es bastante exigente.',
      'Tiene algo menos de daño base que The World normal.',
      'Puede sentirse algo tosco comparado con brawlers puros.',
    ],
    abilities: [
      {
        title: 'Revolver Barrage',
        description:
          'Dispara varias veces desde lejos para aturdir al enemigo.',
      },
      {
        title: 'Smoke Bomb',
        description: 'Ciega al rival y te deja recolocarte con seguridad.',
      },
      {
        title: 'Kick Volley',
        description: 'Una cadena rápida de patadas para castigar de cerca.',
      },
    ],
  },
  'killer-queen': {
    rarity: 'Raro',
    part: 'Parte 4',
    bestFor: 'Denegación de zona y juego defensivo',
    quickVerdict:
      'Un stand muy bueno para mantener distancias y castigar a quien intenta entrar sin pensar.',
    summary:
      'Killer Queen convierte el combate en un campo minado. Encaja muy bien con jugadores que prefieren marcar el ritmo de la pelea.',
    howToGet: ['Se obtiene con Stand Arrow (rareza rara).'],
    strengths: [
      'Gran denegación de zona con bombas.',
      'Muy útil para farmear en PvE.',
      'Sheer Heart Attack persigue y presiona bastante bien.',
    ],
    weaknesses: [
      'Sus rutas de combo son lentas y previsibles.',
      'Pierde mucho si el rival consigue saltarse las bombas.',
      'Le falta movilidad.',
    ],
    abilities: [
      {
        title: 'Primary Bomb',
        description:
          'Coloca una bomba en un enemigo o en un objeto para detonarla después.',
      },
      {
        title: 'Sheer Heart Attack',
        description: 'Un proyectil perseguidor que explota al contactar.',
      },
      {
        title: 'Stray Cat',
        description: 'Dispara bombas de aire invisibles que cuesta esquivar.',
      },
    ],
  },
  anubis: {
    rarity: 'Raro',
    part: 'Parte 3',
    bestFor: 'Combos melé de mucho daño y juego de espada',
    quickVerdict:
      'Es puro rushdown con una velocidad melé tremenda, pero no ofrece apenas utilidad ni opciones a distancia.',
    summary:
      'Anubis encaja con jugadores que quieren arrollar al rival a base de cortes seguidos. Si consigues mantenerte encima, su daño es muy serio.',
    howToGet: ['Se obtiene con Stand Arrow (rareza rara).'],
    strengths: [
      'De los DPS cuerpo a cuerpo más altos del juego.',
      'Entradas y remates de combo muy rápidos.',
      'Cuesta mucho pararlo por la velocidad de sus golpes.',
    ],
    weaknesses: [
      'No tiene utilidad a distancia.',
      'Los stands ranged lo kitean con facilidad.',
      'Rinde peor en peleas de grupo o situaciones de objetivo.',
    ],
    abilities: [
      {
        title: 'Dice Cut',
        description: 'Una secuencia rápida de tajos que aturde al objetivo.',
      },
      {
        title: 'Cursed Severance',
        description: 'Un golpe enorme que mete muchísimo burst.',
      },
      {
        title: 'Rend',
        description:
          'Un ataque giratorio que golpea a todos los enemigos cercanos.',
      },
    ],
  },
  'golden-experience': {
    rarity: 'Poco común',
    part: 'Parte 5',
    bestFor: 'Aguante y progresión amable para principiantes',
    quickVerdict:
      'Una opción muy fiable para jugadores nuevos que quieren más margen de error gracias a sus curas.',
    summary:
      'Golden Experience cambia daño ofensivo por utilidad. Su capacidad de curar hace que sea muy cómodo para sesiones largas de farmeo.',
    howToGet: ['Se obtiene con Stand Arrow (rareza poco común).'],
    strengths: [
      'Puede curarse a sí mismo y también a aliados.',
      'El reflejo de daño del sapo castiga a rivales muy explosivos.',
      'Kit bastante versátil entre melé y control.',
    ],
    weaknesses: [
      'Su daño total se queda corto.',
      'No tiene un remate realmente decisivo.',
      'Las animaciones de cura se pueden interrumpir.',
    ],
    abilities: [
      {
        title: 'Restoration',
        description: 'Cura al usuario o a un aliado seleccionado.',
      },
      {
        title: 'Frog',
        description: 'Invoca un sapo que devuelve parte del daño recibido.',
      },
      {
        title: 'Root Strike',
        description: 'Hace brotar raíces para derribar y aturdir enemigos.',
      },
    ],
  },
  'stone-free': {
    rarity: 'Raro',
    part: 'Parte 6',
    bestFor: 'Combate equilibrado y trampas con cuerdas',
    quickVerdict:
      'Es un all-rounder cumplidor con buena movilidad y control, aunque le falta ese punto diferencial para destacar.',
    summary:
      'Stone Free es un stand muy honesto: tiene herramientas para casi todo, pero no sobresale de forma aplastante en ninguna faceta concreta.',
    howToGet: ['Se obtiene con Stand Arrow (rareza rara).'],
    strengths: [
      'Buena movilidad gracias al agarre con cuerda.',
      'Funciona bien en media distancia.',
      'Sus trampas de hilo aportan stuns fiables.',
    ],
    weaknesses: [
      'Daño bastante medio en general.',
      'No tiene una ventana fuerte de burst.',
      'Otros stands especializados suelen dejarlo atrás.',
    ],
    abilities: [
      {
        title: 'String Punch',
        description: 'Una serie de golpes rápidos que se alargan con cuerdas.',
      },
      {
        title: 'String Trap',
        description: 'Coloca una trampa oculta que inmoviliza al enemigo.',
      },
      {
        title: 'Spiraling Thread',
        description: 'Una técnica defensiva que reduce el daño entrante.',
      },
    ],
  },
  'magicians-red': {
    rarity: 'Poco común',
    part: 'Parte 3',
    bestFor: 'PvE temprano y limpiar grupos con quemaduras',
    quickVerdict:
      'Cumple como stand inicial para limpiar mobs, pero en PvP su utilidad cae bastante rápido.',
    summary:
      "Magician's Red gira en torno al daño por quemadura y el AoE. Rinde bien en las primeras misiones, aunque los stands más rápidos lo superan con facilidad.",
    howToGet: ['Se obtiene con Stand Arrow (rareza poco común).'],
    strengths: [
      'Buen AoE para el farmeo temprano.',
      'Las quemaduras suman daño con el tiempo.',
      'Es relativamente fácil de conseguir.',
    ],
    weaknesses: [
      'Animaciones muy lentas.',
      'No tiene herramientas de movilidad.',
      'Sufre mucho contra brawlers de rush.',
    ],
    abilities: [
      {
        title: 'Crossfire Hurricane',
        description: 'Dispara varias bolas de fuego contra los enemigos.',
      },
      {
        title: 'Red Bind',
        description:
          'Atrapa al rival entre llamas y le aplica daño prolongado.',
      },
      {
        title: 'Ignition Burst',
        description: 'Una explosión potente centrada en el usuario.',
      },
    ],
  },
  'crazy-diamond': {
    rarity: 'Poco común',
    part: 'Parte 4',
    bestFor: 'Apoyo con curas y pelea defensiva',
    quickVerdict:
      'Es un stand pensado para apoyar al equipo: puede aportar bastante con amigos, pero le cuesta cerrar duelos en solitario.',
    summary:
      'Crazy Diamond luce más cuando juegas acompañado. Sus curas y herramientas de terreno son distintas, aunque bastante situacionales.',
    howToGet: ['Se obtiene con Stand Arrow (rareza poco común).'],
    strengths: [
      'Muy buena capacidad de curación para el equipo.',
      'Puede crear muros para cortar rutas o proyectiles.',
      'Tiene velocidad melé aceptable.',
    ],
    weaknesses: [
      'Poco daño cuando va solo.',
      'Sus movimientos de brawl son bastante previsibles.',
      'Lo pasa mal contra stands de rango y mucha movilidad.',
    ],
    abilities: [
      {
        title: 'Heal Mode',
        description: 'Cambia a un modo centrado en restaurar vida.',
      },
      {
        title: 'Wall Smash',
        description: 'Levanta un muro de roca que bloquea y también daña.',
      },
      {
        title: 'Bearing Shot',
        description: 'Lanza un proyectil que hace un daño moderado.',
      },
    ],
  },
  'purple-haze': {
    rarity: 'Poco común',
    part: 'Parte 5',
    bestFor: 'Juego de veneno de alto riesgo y alta recompensa',
    quickVerdict:
      'Puede destrozar barras de vida, pero también castigarte a ti mismo si no lo manejas con mucho cuidado.',
    summary:
      'Purple Haze es un glass cannon de manual. Su virus hace muchísimo daño, pero no distingue bien entre enemigos, aliados y el propio usuario.',
    howToGet: ['Se obtiene con Stand Arrow (rareza poco común).'],
    strengths: [
      'Daño prolongado altísimo con el virus.',
      'Muy buena denegación de zona porque todo el mundo evita sus nubes.',
      'Golpes melé rápidos.',
    ],
    weaknesses: [
      'El virus puede dañar al usuario y a sus aliados.',
      'Es irregular en muchos contextos de PvP.',
      'No tiene movilidad ni amenaza real a distancia.',
    ],
    abilities: [
      {
        title: 'Infectious Bulb',
        description: 'Libera una nube de virus al impactar.',
      },
      {
        title: 'Bulb Smash',
        description: 'Un puñetazo fuerte que genera varias nubes de virus.',
      },
      {
        title: 'Fury Strike',
        description: 'Una ráfaga frenética de golpes que propaga el virus.',
      },
    ],
  },
  'the-hand': {
    rarity: 'Poco común',
    part: 'Parte 4',
    bestFor: 'Builds de borrado y daño bruto',
    quickVerdict:
      'Tiene potencial de daño muy alto, pero sus animaciones lentas y lo previsible que resulta lo dejan bastante atrás.',
    summary:
      'The Hand puede borrar barras de vida, sí, pero la mayoría de rivales simplemente se apartan de sus ataques. Le faltan herramientas para competir de verdad.',
    howToGet: ['Se obtiene con Stand Arrow (rareza poco común).'],
    strengths: [
      'Mucho daño por golpe.',
      'Erasure Pull puede pillar desprevenido al rival.',
      'Parte de su daño ignora defensas.',
    ],
    weaknesses: [
      'Es lentísimo y muy castigable.',
      'La mayoría de movimientos tienen poco alcance.',
      'Su estilo de juego es demasiado previsible.',
    ],
    abilities: [
      {
        title: 'Erasure Swipe',
        description: 'Un barrido lento que pega una barbaridad.',
      },
      {
        title: 'Erasure Pull',
        description: 'Borra espacio para atraer al enemigo hacia ti.',
      },
      {
        title: 'Hard Left',
        description: 'Un puñetazo pesado que manda al rival hacia atrás.',
      },
    ],
  },
  'red-hot-chili-pepper': {
    rarity: 'Común',
    part: 'Parte 4',
    bestFor: 'Movilidad temprana y primeros pasos en el juego',
    quickVerdict:
      'Viene bien para moverte por el mapa al principio, pero su daño se queda muy por detrás de casi todo lo demás.',
    summary:
      'Red Hot Chili Pepper es una tirada común con algo de movilidad, aunque no ofrece ni el daño ni el control que se necesitan para rutas más serias.',
    howToGet: ['Se obtiene con Stand Arrow (rareza común).'],
    strengths: [
      'Flash da una movilidad decente al principio de la partida.',
      'Es fácil de conseguir para cuentas nuevas.',
      'Sus efectos eléctricos pueden aturdir brevemente.',
    ],
    weaknesses: [
      'Daño base muy bajo.',
      'Escala mal al mid y al late game.',
      'No tiene combos realmente amenazantes.',
    ],
    abilities: [
      {
        title: 'Electrical Surge',
        description: 'Libera una descarga eléctrica alrededor del usuario.',
      },
      {
        title: 'Flash',
        description: 'Un teletransporte rápido que deja un rastro dañino.',
      },
      {
        title: 'Thunder Rod',
        description: 'Un golpe básico cuerpo a cuerpo cargado de electricidad.',
      },
    ],
  },
};

const esStandTierDescriptions: Record<StandTier, string> = {
  S: 'Los reyes del meta. Sobresalen en movilidad, control o potencia pura y marcan el listón de referencia.',
  A: 'Muy fuertes y fiables. Opciones excelentes para competir y para farmear con buena eficiencia.',
  B: 'Tier medio sólido. Se pueden jugar bien, pero hace falta más trabajo para plantar cara a los tops.',
  C: 'De nicho o de inicio. Sirven para progresar al principio o para estilos concretos, aunque suelen quedarse cortos.',
  D: 'Por debajo del nivel esperado. Necesitan mejoras serias para competir con el resto del roster.',
};

const esStandResearchNotes = {
  verifiedAt: '2026-03-09',
  tierSource:
    'Investigación de la comunidad y últimas actualizaciones visibles de tier list (Destructoid, marzo de 2026).',
  methodology:
    'Los tiers reflejan el meta actual, donde la movilidad, el control de masas y el potencial de evolución marcan el techo real. Está reescrito para ayudar a decidir si un stand merece la pena o es mejor dejarlo pasar.',
} as const;

function resolveStandLocale(locale?: string | null): StandLocale {
  return locale === 'es' ? 'es' : 'en';
}

export function getStandResearchNotes(locale?: string | null) {
  return resolveStandLocale(locale) === 'es'
    ? esStandResearchNotes
    : standResearchNotes;
}

export function getStandTierDescriptions(
  locale?: string | null
): Record<StandTier, string> {
  return resolveStandLocale(locale) === 'es'
    ? esStandTierDescriptions
    : standTierDescriptions;
}

export function getStands(locale?: string | null): StandEntry[] {
  if (resolveStandLocale(locale) !== 'es') {
    return stands;
  }

  return stands.map((stand) => ({
    ...stand,
    ...esStandContent[stand.key],
  }));
}

export function getStandByKey(
  standKey: string,
  locale?: string | null
): StandEntry | undefined {
  return getStands(locale).find((stand) => stand.key === standKey);
}

export function getStandSlugs() {
  return stands.map((stand) => stand.key);
}

export const standTierDescriptions: Record<StandTier, string> = {
  S: "The Meta Kings. Unmatched in their respective roles, whether it's mobility, control, or raw power.",
  A: 'Strong & Reliable. Excellent choices for competitive play and high-efficiency farming.',
  B: 'Solid Mid-Tier. Playable and fun, but they require more effort to beat top-tier stands.',
  C: 'Niche or Starter. Useful for early progression or specific playstyles, but generally outclassed.',
  D: 'Underpowered. These stands need significant buffs to compete with the rest of the roster.',
};

export const starPlatinum = stands[4]; // Updated index
