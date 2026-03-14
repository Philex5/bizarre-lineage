export type NpcRegionEntry = {
  key: string;
  name: string;
  busStops: string;
  summary: string;
  whyItMatters: string;
  anchorRoutes: string[];
  officialSourceUrl?: string;
  sourceNote: string;
};

export type NpcLocationEntry = {
  key: string;
  name: string;
  role: string;
  busStop: string;
  region: string;
  summary: string;
  routeNotes: string[];
  officialSourceUrl?: string;
  relatedHref?: string;
  relatedLabel?: string;
  caution?: string;
};

export type FastRouteEntry = {
  title: string;
  description: string;
};

export type NpcLocationFaq = {
  question: string;
  answer: string;
};

export const npcLocationsPage = {
  verifiedAt: '2026-03-15',
  officialBoardUrl:
    'https://trello.com/b/Zi6UTMnO/official-bizzare-lineage-%E2%9E%B5',
  heroTitle: 'Bizarre Lineage NPC Locations & Map Guide',
  heroIntro:
    'Find trainer locations, progression NPCs, and bus stop routes in Bizarre Lineage. This guide groups everything by goal and region to save you time running across Morioh.',
  quickAnswerTitle: 'Fastest way to find NPCs in Bizarre Lineage',
  quickAnswerIntro:
    'Most important Bizarre Lineage NPC locations are tied to bus stops. Use Rhett (at every stop) to fast travel. Key stops: 18 for Pucci/Elder Vampire, 13 for Ripple, 3 for Cyborg/Josuke/Stroheim, 2 for Boxing, 15 for Kendo/Karate, and 10 for the Arch Mage.',
  whyThisPageTitle: 'Why this page is worth keeping open',
  whyThisPagePoints: [
    'It turns scattered Trello notes into one Bizarre Lineage NPC locations hub.',
    'It groups Bizarre Lineage bus stop locations by progression goal instead of by random card order.',
    'It surfaces the Bizarre Lineage regions that keep appearing in official route notes.',
    'It flags placeholder routes like Spin so you can re-check the official card before farming.',
  ],
  regionSectionTitle: 'Bizarre Lineage regions and map anchors',
  regionSectionIntro:
    'The official board uses region notes and route callouts more than a single clean map image, so the best way to read the Bizarre Lineage map is through the places that keep recurring in progression, raids, and trainer routes.',
  npcSectionTitle: 'Bizarre Lineage trainer locations and progression NPCs',
  npcSectionIntro:
    'These are the NPCs with the clearest practical value right now. They are the stops most players search for when they want to prestige, start Journey to Heaven, unlock a style, or finish a sub-ability route.',
  routingSectionTitle: 'Bus stop routes that solve the most common searches',
  routingSectionIntro:
    'If you are searching where to find NPCs in Bizarre Lineage, start with the route instead of the full map. These are the most useful bus stop locations to memorize first.',
  faqTitle: 'NPC location FAQ',
} as const;

export const npcRegions: NpcRegionEntry[] = [
  {
    key: 'gym',
    name: 'Gym',
    busStops: 'Bus stop 2 is the key route note in the current trainer data.',
    summary:
      'The Gym is one of the clearest official training regions and is the first place many players need once they start looking for style trainers.',
    whyItMatters:
      'The Boxing Coach is routed upstairs in the Gym, and the region notes also connect the area to raid context on the current public board.',
    anchorRoutes: ['Boxing Coach', 'Jotaro raid context'],
    officialSourceUrl: 'https://trello.com/c/irIwXL9l/570-gym',
    sourceNote: 'Confirmed by the official Gym region card and trainer notes.',
  },
  {
    key: 'hospital',
    name: 'Hospital',
    busStops: 'Bus stop 10 is the main prestige route note.',
    summary:
      'The Hospital area matters because it anchors prestige routing rather than general grinding.',
    whyItMatters:
      'The Arch Mage is the prestige NPC here, and current public notes explicitly tie the route to bus stop 10.',
    anchorRoutes: ['Arch Mage', 'Prestige route'],
    officialSourceUrl: 'https://trello.com/c/DZRrTlGK/614-arch-mage',
    sourceNote:
      'Confirmed through the Arch Mage route notes on the official board.',
  },
  {
    key: 'kame-yu-market',
    name: 'Kame Yu Market',
    busStops: 'Bus stop 15 is the trainer note tied to Kendo.',
    summary:
      'Kame Yu Market is a named route anchor used for one of the official fighting style trainers.',
    whyItMatters:
      'It is the current official location note for the Samurai Master, so it matters whenever players search Bizarre Lineage trainer locations instead of raw build theory.',
    anchorRoutes: ['Samurai Master', 'Kendo route'],
    officialSourceUrl: 'https://trello.com/c/k9ZvXIUo/636-samurai-master',
    sourceNote: 'Confirmed through the Samurai Master trainer reference.',
  },
  {
    key: 'cultist-castle',
    name: 'Cultist Castle',
    busStops: 'Bus stop 18 is the main progression anchor.',
    summary:
      'Cultist Castle is one of the highest-value late-game map anchors because multiple official routes converge here.',
    whyItMatters:
      'Pucci is routed here for Journey to Heaven, and the Elder Vampire path also starts from the same bus stop before pushing deeper into the castle area.',
    anchorRoutes: ['Pucci', 'Elder Vampire', 'Journey to Heaven'],
    officialSourceUrl: 'https://trello.com/c/WwGKcn07/618-pucci',
    sourceNote:
      'Confirmed through the Pucci route notes and the Elder Vampire location summary.',
  },
  {
    key: 'graveyard',
    name: 'Graveyard',
    busStops:
      'No single bus stop callout is surfaced in the current region note.',
    summary:
      'Graveyard is one of the clearest official combat regions and keeps showing up in raid and event references.',
    whyItMatters:
      'The public data ties Graveyard to DIO raid context and a major world event route, which makes it a useful orientation point on the Bizarre Lineage map.',
    anchorRoutes: ['DIO raid context', 'Graveyard Uprising'],
    officialSourceUrl: 'https://trello.com/c/gSGKpZw5/568-graveyard',
    sourceNote:
      'Confirmed by the official Graveyard region card and site event data.',
  },
  {
    key: 'morioh-station',
    name: 'Morioh Station',
    busStops:
      'Current raid notes reference the station area rather than a precise stop.',
    summary:
      'Morioh Station is a repeated map landmark in raid and event notes, even when the official wording does not pin everything to one trainer card.',
    whyItMatters:
      'It helps players orient Kira raid context and event movement without having to memorize the whole map at once.',
    anchorRoutes: ['Kira raid context', 'Meteor Shower'],
    sourceNote:
      'Referenced across current raid and event notes already derived from the official board.',
  },
];

export const npcLocations: NpcLocationEntry[] = [
  {
    key: 'rhett',
    name: 'Rhett',
    role: 'Fast Travel NPC',
    busStop: 'Every Bus Stop',
    region: 'Global',
    summary:
      'Rhett is the most essential utility NPC for navigation. Interacting with her at any bus stop allows you to fast travel to any other stop you have discovered.',
    routeNotes: [
      'Look for the Rhett NPC standing directly at the bus stop sign.',
      'Press N in-game to see nearby bus stop markers and find the nearest Rhett.',
    ],
    officialSourceUrl: 'https://trello.com/c/Zi6UTMnO/official-bizzare-lineage',
  },
  {
    key: 'arch-mage',
    name: 'Arch Mage',
    role: 'Prestige NPC',
    busStop: 'Bus stop 10',
    region: 'Hospital',
    summary:
      'The Arch Mage is the main prestige checkpoint and one of the most practical progression NPCs on the board.',
    routeNotes: [
      'Bring 10,000 Cash before you make the trip.',
      'The official prestige notes route you to the Hospital area, then to the Arch Mage.',
    ],
    officialSourceUrl: 'https://trello.com/c/DZRrTlGK/614-arch-mage',
    relatedHref: '/guides/prestige',
    relatedLabel: 'Prestige guide',
  },
  {
    key: 'jotaro-kujo',
    name: 'Jotaro Kujo',
    role: 'Main Storyline NPC',
    busStop: 'Bus stop 2',
    region: 'Gym',
    summary:
      'Jotaro Kujo starts the main storyline quest chain and is the first point of contact for new players looking to progress.',
    routeNotes: [
      'Found directly in front of Jojo’s Bizarre Gym at Bus Stop 2.',
      'Talk to him to begin Quest 1 of the main story.',
    ],
    officialSourceUrl: 'https://trello.com/c/Zi6UTMnO/official-bizzare-lineage',
  },
  {
    key: 'pucci',
    name: 'Pucci',
    role: 'Journey to Heaven NPC',
    busStop: 'Bus stop 18',
    region: 'Cultist Castle',
    summary:
      'Pucci is the late-game NPC that matters most for Journey to Heaven routing and related awakening-adjacent progression.',
    routeNotes: [
      'Current public notes place Pucci in the Chapel near bus stop 18 in the Graveyard/Cultist Castle area.',
      'This route explicitly appears behind at least 1 Prestige in the current Trello-derived notes.',
    ],
    officialSourceUrl: 'https://trello.com/c/WwGKcn07/618-pucci',
    relatedHref: '/terms/awakening',
    relatedLabel: 'Awakening guide',
  },
  {
    key: 'josuke-higashikata',
    name: 'Josuke Higashikata',
    role: 'Stand Arrow Boss',
    busStop: 'Bus stop 3',
    region: 'Park / Dojo',
    summary:
      'Josuke is a key early-game NPC you can fight to obtain Stand Arrows, EXP, and Rare Chests.',
    routeNotes: [
      'Find the park near Bus Stop 3 with a pond.',
      'Look for the dojo entrance with an "M" on the roof to find Josuke.',
    ],
    officialSourceUrl: 'https://trello.com/c/Zi6UTMnO/official-bizzare-lineage',
  },
  {
    key: 'ancient-ghost',
    name: 'Ancient Ghost',
    role: 'Ripple NPC',
    busStop: 'Bus stop 13',
    region: 'Outer route landmark',
    summary:
      'The Ancient Ghost starts the Ripple questline and is one of the easiest sub-ability NPCs to memorize because the bus stop note is clean.',
    routeNotes: [
      'Teleport to Bus Stop 13 and look for the bridge with sunflowers.',
      'You must defeat 10 Night Vampires (usually spawning at night) as part of his questline.',
    ],
    officialSourceUrl: 'https://trello.com/c/RmgOw6D3/619-ancient-ghost',
    relatedHref: '/terms/sub-abilities/ripple',
    relatedLabel: 'Ripple guide',
  },
  {
    key: 'stroheim',
    name: 'Rudol von Stroheim',
    role: 'Cyborg NPC',
    busStop: 'Bus stop 3',
    region: 'Outer route landmark',
    summary:
      'Stroheim is the Cyborg route starter and another strong example of how Bizarre Lineage bus stop locations simplify trainer searches.',
    routeNotes: [
      'Talk to Rudol von Stroheim behind Bus Stop 3 near two wooden park benches.',
      'The unlock grants the Cyborg spec which provides a 15% Defense buff.',
    ],
    officialSourceUrl: 'https://trello.com/c/hRk9xCle/621-rduol-von-stroheim',
    relatedHref: '/terms/sub-abilities/cyborg',
    relatedLabel: 'Cyborg guide',
  },
  {
    key: 'gupta',
    name: 'Gupta',
    role: 'Crafting NPC',
    busStop: 'Bus stop 1',
    region: 'Morioh Station / Stores',
    summary:
      'Gupta is the primary crafting NPC for essential utility items like the Skateboard and Chests.',
    routeNotes: [
      'Found near Morioh Station (Bus Stop 1) and in various store locations around the map.',
      'Craft a Skateboard early to move much faster than running.',
    ],
    officialSourceUrl: 'https://trello.com/c/Zi6UTMnO/official-bizzare-lineage',
  },
  {
    key: 'elder-vampire',
    name: 'Elder Vampire',
    role: 'Vampire NPC',
    busStop: 'Bus stop 18 (or 15)',
    region: "Dio's Chapel / Cultist Castle route",
    summary:
      'The Elder Vampire is part of the clearest item-plus-quest progression route on the board.',
    routeNotes: [
      'From Bus Stop 18, enter the Graveyard and follow the path northwest to a cave on the left. Through the cave is the castle.',
      'Alternatively, some players reach him from the hill behind Bus Stop 15 near Ken Yu Market.',
    ],
    officialSourceUrl: 'https://trello.com/c/k1Ai3wbh/616-elder-vampire',
    relatedHref: '/terms/sub-abilities/vampire',
    relatedLabel: 'Vampire guide',
  },
  {
    key: 'boxing-coach',
    name: 'Boxing Coach',
    role: 'Boxing trainer',
    busStop: 'Bus stop 2',
    region: 'Gym',
    summary:
      'The Boxing Coach is one of the cleanest fighting style trainer locations because both the bus stop and floor note are already public.',
    routeNotes: [
      'Current notes place the Boxing Coach upstairs in the Gym.',
      'The Boxing questline is the longest, involving sparring multiple opponents and completing an Avdol Raid.',
    ],
    officialSourceUrl: 'https://trello.com/c/IM8f4lDA/640-boxing-coach',
    relatedHref: '/terms/fighting-styles',
    relatedLabel: 'Fighting styles guide',
  },
  {
    key: 'samurai-master',
    name: 'Samurai Master',
    role: 'Kendo trainer',
    busStop: 'Bus stop 15',
    region: 'Kame Yu Market',
    summary:
      'The Samurai Master is the named trainer for Kendo and one of the best examples of a region plus bus-stop search intent.',
    routeNotes: [
      'Teleport to Bus Stop 15 and head inside the Kame Yu Market building.',
      'Kendo is a sword-based style that excels at guard breaking and pressure.',
    ],
    officialSourceUrl: 'https://trello.com/c/k9ZvXIUo/636-samurai-master',
    relatedHref: '/terms/fighting-styles',
    relatedLabel: 'Fighting styles guide',
  },
  {
    key: 'karate-sensei',
    name: 'Karate Sensei',
    role: 'Karate trainer',
    busStop: 'Bus stop 3 (or 15)',
    region: 'Park / Hospital',
    summary:
      'The Karate Sensei teaches the Karate fighting style, balancing mobility with area damage.',
    routeNotes: [
      'Most guides place him in the park at Bus Stop 3, leaning against a wall near the pond.',
      'If not at Stop 3, check the Hospital area near Bus Stop 15.',
    ],
    officialSourceUrl: 'https://trello.com/c/dylpyb9n/641-karate-sensei',
    relatedHref: '/terms/fighting-styles',
    relatedLabel: 'Fighting styles guide',
  },
  {
    key: 'tonio-trussardi',
    name: 'Tonio Trussardi',
    role: 'Recipe / Quest NPC',
    busStop: 'Bus stop 1',
    region: 'Cafe de Maigot',
    summary:
      'Tonio is part of the main storyline recipe quest and is located inside the iconic Cafe de Maigot.',
    routeNotes: [
      'From Bus Stop 1, find Cafe de Maigot and head inside.',
      'He is required for Mr. Rengatei’s recipe quest.',
    ],
    officialSourceUrl: 'https://trello.com/c/Zi6UTMnO/official-bizzare-lineage',
  },
  {
    key: 'yoshikage-kira',
    name: 'Yoshikage Kira',
    role: 'Raid NPC',
    busStop: 'Bus stop 7',
    region: 'Morioh Station',
    summary:
      'Kira starts the Kira Raid, providing access to powerful loot and raid tokens.',
    routeNotes: [
      'Found hiding behind a tree near the parking lot on the left side of Morioh Station.',
      'Morioh Station is accessed via Bus Stop 7 or a short walk from Stop 1.',
    ],
    officialSourceUrl: 'https://trello.com/c/Zi6UTMnO/official-bizzare-lineage',
  },
  {
    key: 'muhammad-avdol',
    name: 'Muhammad Avdol',
    role: 'Raid NPC',
    busStop: 'Bus stop 14',
    region: 'Beach',
    summary:
      'Avdol starts the Avdol Raid, which is highly recommended for early-to-mid game level grinding.',
    routeNotes: [
      'Located southwest of Bus Stop 14, heading toward the beach.',
      'Many questlines (like Boxing) require completing an Avdol Raid.',
    ],
    officialSourceUrl: 'https://trello.com/c/Zi6UTMnO/official-bizzare-lineage',
  },
  {
    key: 'spin-placeholder',
    name: 'Spin trainer',
    role: 'Spin route placeholder',
    busStop: 'Bus stop 18 (farming)',
    region: 'Graveyard',
    summary:
      'Spin is currently an item-based sub-ability. While there is no primary trainer NPC, you must farm "Spin Users" at Bus Stop 18.',
    routeNotes: [
      'Spin Users spawn at night near the campfire at Bus Stop 18.',
      'Use the PvE Mission Board to force Spin Users to spawn if they are not appearing.',
    ],
    officialSourceUrl: 'https://trello.com/c/hSVDi4dE/209-untitled',
    relatedHref: '/terms/sub-abilities/spin',
    relatedLabel: 'Spin guide',
    caution:
      'Spin is often updated on the Trello as "Untitled", so keep an eye on the official board for a dedicated trainer card.',
  },
];

export const fastRoutes: FastRouteEntry[] = [
  {
    title: 'Fast Travel',
    description:
      'Interact with Rhett at any bus stop to teleport across the map. It is the fastest way to navigate Bizarre Lineage.',
  },
  {
    title: 'Prestige route',
    description:
      'Bus stop 10 into the Hospital area is the cleanest prestige travel note because it points directly to the Arch Mage.',
  },
  {
    title: 'Ripple route',
    description:
      'Bus stop 13 is the shortest memory hook for players trying to find the Ancient Ghost and start Ripple.',
  },
  {
    title: 'Cyborg route',
    description:
      'Bus stop 3 is the Cyborg search answer because it leads to Rudol von Stroheim.',
  },
  {
    title: 'Castle route',
    description:
      'Bus stop 18 is the most overloaded late-game route because it covers both Pucci and the Elder Vampire path into Cultist Castle.',
  },
];

export const npcLocationFaq: NpcLocationFaq[] = [
  {
    question: 'How do I fast travel in Bizarre Lineage?',
    answer:
      'Find the Rhett NPC at any bus stop. Interacting with her allows you to teleport to any other bus stop you have already discovered.',
  },
  {
    question: 'Where is Pucci in Bizarre Lineage?',
    answer:
      'Pucci is located in the Chapel at the Graveyard, accessed via Bus Stop 18. He is essential for Journey to Heaven progression.',
  },
  {
    question: 'Where do you find the Arch Mage in Bizarre Lineage?',
    answer:
      'The Arch Mage prestige NPC is at the Hospital behind Bus Stop 10. You need 10,000 Cash and Max Level to prestige.',
  },
  {
    question: 'How do I get a skateboard in Bizarre Lineage?',
    answer:
      'Talk to the Gupta NPC at Bus Stop 1 or various store locations. You can craft a skateboard to move faster across the map.',
  },
  {
    question: 'Which official Bizarre Lineage NPC route is still incomplete?',
    answer:
      'Spin is still primarily item-based with no dedicated trainer card on the Trello yet. You must farm Spin Users at Bus Stop 18.',
  },
];
