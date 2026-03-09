export type TermsLocale = 'en';

export type TermKey =
  | 'raid'
  | 'prestige'
  | 'awakening'
  | 'stand-arrow'
  | 'fighting-styles'
  | 'sub-abilities';

export type TermBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | {
      type: 'table';
      columns: string[];
      rows: string[][];
      note?: string;
    }
  | {
      type: 'cards';
      items: Array<{
        href: string;
        title: string;
        description: string;
      }>;
    };

export interface TermLink {
  href: string;
  label: string;
}

export interface TermSection {
  title: string;
  blocks: TermBlock[];
}

export interface TermEntry {
  slug: string;
  title: string;
  cardTitle: string;
  cardDescription: string;
  description: string;
  heroImageSrc: string;
  heroImageAlt: string;
  intro: string[];
  sections: TermSection[];
  references: TermLink[];
  relatedLinks: TermLink[];
}

interface TermsDictionary {
  hub: {
    cards: TermKey[];
  };
  terms: Record<TermKey, TermEntry>;
}

const enTerms: TermsDictionary = {
  hub: {
    cards: [
      'raid',
      'prestige',
      'awakening',
      'stand-arrow',
      'fighting-styles',
      'sub-abilities',
    ],
  },
  terms: {
    raid: {
      slug: 'terms/raid',
      title: 'Raid in Bizarre Lineage',
      cardTitle: 'Raid',
      cardDescription:
        'Mid-game or later progression content that matters for rewards, preparation, and route planning.',
      description:
        'Bizarre Lineage raid overview covering the 8-player raid format, raid token shops, and every listed raid reward in the current public game data.',
      heroImageSrc:
        'https://trello.com/1/cards/69713d0671067a15e9fa2a8a/attachments/69a47d67eb1236308633c559/download/image.png',
      heroImageAlt: 'Official Bizarre Lineage Graveyard raid-region reference',
      intro: [
        'In Bizarre Lineage, raids are 8-player cooperative content built around harder group clears, raid-specific tokens, and shop rewards that are hard to replace elsewhere.',
        'This page is based on the current public Trello and region notes, checked on March 9, 2026.',
      ],
      sections: [
        {
          title: 'Quick answer',
          blocks: [
            {
              type: 'paragraph',
              text: 'Raids matter because they are one of the clearest reward routes for:',
            },
            {
              type: 'list',
              items: [
                'raid shop tokens',
                'Lucky Arrows',
                'Legendary Chests',
                'Stand Arrows',
                'traits',
                'raid-exclusive accessories and weapons',
              ],
            },
            {
              type: 'paragraph',
              text: 'If you are still fixing your first stand, first stat route, or early progression, raids are usually not the first thing to force. They make more sense once you can survive, contribute damage, and farm with a group.',
            },
          ],
        },
        {
          title: 'Where raids fit in progression',
          blocks: [
            {
              type: 'paragraph',
              text: 'The official board frames raids as group content with their own token economies and region ties. That means the real progression question is not just whether raids are good, but whether your current route is stable enough to farm the raid whose shop actually matches your target item.',
            },
          ],
        },
        {
          title: 'Raid list',
          blocks: [
            {
              type: 'table',
              columns: ['Raid', 'Token type', 'Context'],
              rows: [
                [
                  'Jotaro Raid',
                  'Jotaro Tokens',
                  'The Gym notes mention `Chumbo ( Jotaro Boss Raid )`.',
                ],
                [
                  'Avdol Raid',
                  'Avdol Tokens',
                  'Listed in the raid data, but the current notes do not name a location.',
                ],
                [
                  'Kira Raid',
                  'Kira Tokens',
                  'The current region notes place this raid around Morioh Station.',
                ],
                [
                  'DIO Raid',
                  'DIO Tokens',
                  'The current region notes place this raid around Graveyard and also mention `Cultist (DIO Raid)`.',
                ],
              ],
            },
          ],
        },
        {
          title: 'How raids work',
          blocks: [
            {
              type: 'paragraph',
              text: 'The wording in the public data is direct: raids are a cooperative mode for 8 players, and completion gives you both rewards and raid-specific tokens. Those tokens are not one shared currency. Each raid has its own shop list, which changes what is actually worth farming.',
            },
          ],
        },
        {
          title: 'Jotaro Raid rewards',
          blocks: [
            {
              type: 'table',
              columns: ['Reward', 'Stock', 'Cost'],
              rows: [
                ['Lucky Arrow', '1', '450 Jotaro Tokens'],
                ["Jotaro's Coat", '1', '250 Jotaro Tokens'],
                ["Jotaro's Hat", '1', '257 Jotaro Tokens'],
                ['Legendary Chest', '2', '208 Jotaro Tokens'],
                ['Stand Arrow', '3', '12 Jotaro Tokens'],
                ['Grappler Trait', '1', '360 Jotaro Tokens'],
                ['Intimidation Trait', '1', '368 Jotaro Tokens'],
              ],
            },
            {
              type: 'paragraph',
              text: 'Jotaro Raid is the clearest route on this page for Jotaro-themed accessories plus two traits. If you only need cheap arrow value, the Stand Arrow is also one of the lowest-token entries on the whole raid page.',
            },
          ],
        },
        {
          title: 'Avdol Raid rewards',
          blocks: [
            {
              type: 'table',
              columns: ['Reward', 'Stock', 'Cost'],
              rows: [
                ['Flaming Medallion Necklace', '1', '682 Avdol Tokens'],
                ['Legendary Chest', '2', '787 Avdol Tokens'],
                ['Stand Arrow', '5', '11 Avdol Tokens'],
                ['Conjurer Trait', '1', '242 Avdol Tokens'],
                ['King of Flames Trait', '1', '980 Avdol Tokens'],
              ],
            },
            {
              type: 'paragraph',
              text: 'Avdol Raid leans harder into trait and accessory value than broad shop variety. It also has the cheapest listed Stand Arrow cost in the current data at 11 Avdol Tokens.',
            },
          ],
        },
        {
          title: 'Kira Raid rewards',
          blocks: [
            {
              type: 'table',
              note: 'Current location note: Morioh Station',
              columns: ['Reward', 'Stock', 'Cost'],
              rows: [
                ['Skull Tie', '1', '1030 Kira Tokens'],
                ['Lucky Arrow', '1', '510 Kira Tokens'],
                ['Legendary Chest', '3', '214 Kira Tokens'],
                ['Stand Arrow', '3', '12 Kira Tokens'],
                ['A Quiet Life', '1', '392 Kira Tokens'],
                ['Serial Killer', '1', '436 Kira Tokens'],
              ],
            },
            {
              type: 'paragraph',
              text: 'Kira Raid has one of the more balanced shops. It mixes the usual arrow and chest utility with two named traits and a raid-specific accessory.',
            },
          ],
        },
        {
          title: 'DIO Raid rewards',
          blocks: [
            {
              type: 'table',
              note: 'Current location note: Graveyard',
              columns: ['Reward', 'Stock', 'Cost'],
              rows: [
                ['Heart Headband', '1', '1060 DIO Tokens'],
                ['Lucky Arrow', '1', '545 DIO Tokens'],
                ['Legendary Chest', '2', '210 DIO Tokens'],
                ['Stand Arrow', '3', '11 DIO Tokens'],
                ['The Godfather Trait', '1', '412 DIO Tokens'],
                ['Emperor of Time Trait', '1', '420 DIO Tokens'],
                ['Shadow Axe Weapon', '1', '410 DIO Tokens'],
                ['Stop Sign Weapon', '1', '618 DIO Tokens'],
              ],
            },
            {
              type: 'paragraph',
              text: 'DIO Raid currently has the widest shop in the current data. It is the only raid here that explicitly lists two weapons in addition to traits, arrows, chests, and an accessory.',
            },
          ],
        },
        {
          title: 'What to farm for',
          blocks: [
            {
              type: 'paragraph',
              text: 'If your goal is efficient utility value first, the raid shops make a few things obvious:',
            },
            {
              type: 'list',
              items: [
                'Stand Arrows are the cheapest entries across every listed raid shop.',
                "Legendary Chests sit in the mid-cost range, but Avdol's version is much more expensive than the others.",
                'Lucky Arrows are always expensive single-stock purchases.',
                'Unique accessories, traits, and weapons are the main reason to target one raid over another.',
              ],
            },
          ],
        },
        {
          title: 'Common raid mistake',
          blocks: [
            {
              type: 'paragraph',
              text: 'The common mistake is treating raids like early-game carry content. They are reward-focused group content. In practice, that means you usually get more value by fixing your stand, stats, and progression basics first, then farming the raid whose shop actually matches your target reward.',
            },
          ],
        },
        {
          title: 'Bottom line',
          blocks: [
            {
              type: 'paragraph',
              text: 'Raids are 8-player token-based group farms in Bizarre Lineage. They become worth forcing once your account is stable enough to clear them consistently and once you know which raid shop item you actually want.',
            },
          ],
        },
        {
          title: 'Other recommended terms',
          blocks: [
            {
              type: 'cards',
              items: [
                {
                  href: '/terms/prestige',
                  title: 'Prestige',
                  description:
                    'Read the reset and progression term players usually compare against raids.',
                },
                {
                  href: '/terms/awakening',
                  title: 'Awakening',
                  description:
                    'Check the later-game power layer that often comes up after raid farming.',
                },
                {
                  href: '/terms/sub-abilities',
                  title: 'Sub-Ability',
                  description:
                    'Review the extra build layer that can change how useful your raid setup really is.',
                },
              ],
            },
          ],
        },
      ],
      references: [
        {
          label: 'Official Trello board',
          href: 'https://trello.com/b/Zi6UTMnO/official-bizzare-lineage-%E2%9E%B5',
        },
        { label: 'Gym region', href: 'https://trello.com/c/irIwXL9l/570-gym' },
        {
          label: 'Graveyard region',
          href: 'https://trello.com/c/gSGKpZw5/568-graveyard',
        },
      ],
      relatedLinks: [
        { label: 'Terms hub', href: '/terms' },
        { label: 'Stats guide', href: '/guides/stats' },
        { label: 'Prestige guide', href: '/guides/prestige' },
      ],
    },
    prestige: {
      slug: 'terms/prestige',
      title: 'Prestige in Bizarre Lineage',
      cardTitle: 'Prestige',
      cardDescription:
        'A reset-style progression decision that should be timed around what you gain next, not pressed as soon as it unlocks.',
      description:
        'What prestige means in Bizarre Lineage, where to prestige, and why timing matters more than pressing it immediately.',
      heroImageSrc:
        'https://trello.com/1/cards/6953030500874d0dc5346233/attachments/6975739de52649b8b02b525c/download/prestige.png',
      heroImageAlt: 'Official Bizarre Lineage prestige reference art',
      intro: [
        'Prestige in Bizarre Lineage is one of the official end-game mechanics, not just a random reset button.',
        'According to the public Trello, prestiging requires 10,000 Cash, sends you to the Arch Mage in the Hospital, and rewards you with both Prestige Shards and extra account value.',
      ],
      sections: [
        {
          title: 'How to prestige',
          blocks: [
            {
              type: 'paragraph',
              text: 'The official route is simple on paper:',
            },
            {
              type: 'list',
              items: [
                'save 10,000 Cash',
                'go to the Hospital',
                'talk to the Arch Mage',
              ],
            },
            {
              type: 'paragraph',
              text: 'The Trello also notes that the nearest stop is bus stop 10, which makes prestige a route-planning term as much as a mechanics term.',
            },
          ],
        },
        {
          title: 'What you get from prestiging',
          blocks: [
            {
              type: 'paragraph',
              text: 'The public Trello lists three practical reasons players care about prestige:',
            },
            {
              type: 'list',
              items: [
                '5 Prestige Shards',
                'access to the Prestige Shop',
                '1 Stand storage',
              ],
            },
            {
              type: 'paragraph',
              text: 'That is why prestige matters beyond the reset itself. It is a way to unlock long-term account value, not just a way to start over.',
            },
          ],
        },
        {
          title: 'Why timing matters more than speed',
          blocks: [
            {
              type: 'paragraph',
              text: 'Prestige is strongest when you already know what the next route unlocks for you. If you prestige too early, you can end up with a weaker next run, less prepared routing, or a reset that gives less value than expected. In practice, good prestige timing is about preparation, not impatience.',
            },
          ],
        },
        {
          title: 'How prestige fits into progression planning',
          blocks: [
            {
              type: 'paragraph',
              text: 'Because prestige is explicitly tied to end-game systems and shop rewards, it often becomes the bridge between a stable build and more advanced progression targets. That also makes prestige relevant to later terms such as awakening and evolution routes.',
            },
          ],
        },
        {
          title: 'Common prestige mistake',
          blocks: [
            {
              type: 'paragraph',
              text: 'The common mistake is prestiging the moment the option appears instead of checking what the reset is buying you next. If you have not secured enough value from the current run, prestige can slow you down instead of moving you forward.',
            },
          ],
        },
        {
          title: 'Bottom line',
          blocks: [
            {
              type: 'paragraph',
              text: 'Prestige is an end-game progression mechanic in Bizarre Lineage. You need 10,000 Cash and the Arch Mage in the Hospital, and the reward is worth planning around because it includes shards, shop access, and extra stand storage.',
            },
          ],
        },
      ],
      references: [
        {
          label: 'Official Trello board',
          href: 'https://trello.com/b/Zi6UTMnO/official-bizzare-lineage-%E2%9E%B5',
        },
        {
          label: 'Prestige overview',
          href: 'https://trello.com/c/27vSEwgp/26-untitled',
        },
        {
          label: 'Arch Mage NPC',
          href: 'https://trello.com/c/DZRrTlGK/614-arch-mage',
        },
      ],
      relatedLinks: [
        { label: 'Terms hub', href: '/terms' },
        { label: 'Prestige guide', href: '/guides/prestige' },
        { label: 'Awakening term', href: '/terms/awakening' },
      ],
    },
    awakening: {
      slug: 'terms/awakening',
      title: 'Awakening in Bizarre Lineage',
      cardTitle: 'Awakening',
      cardDescription:
        'A later progression layer tied to stronger builds and deeper system knowledge.',
      description:
        'What awakening means in Bizarre Lineage, why it is a late-game term, and how it connects to prestige and evolution routes.',
      heroImageSrc:
        'https://trello.com/1/cards/6959b48f94eb0c94a4036059/attachments/6959b48f94eb0c94a4036087/download/awakening.png',
      heroImageAlt: 'Official Bizarre Lineage awakening reference art',
      intro: [
        'Awakening in Bizarre Lineage is a late-game term, not a beginner mechanic.',
        "Based on the official Trello structure, awakening shows up around stand and evolution content rather than around the game's early progression basics, so most players should treat it as something to plan for later.",
      ],
      sections: [
        {
          title: 'What awakening means right now',
          blocks: [
            {
              type: 'paragraph',
              text: 'The official public Trello does not present awakening like a first-session tutorial system. Instead, it contains multiple cards named `- Awakening -` alongside late-game stand and evolution content. That strongly suggests awakening is tied to specific high-end routes, power spikes, or form changes rather than to a universal starter upgrade.',
            },
          ],
        },
        {
          title: 'Why awakening is a later progression term',
          blocks: [
            {
              type: 'paragraph',
              text: 'If you are still learning how to get a stand, spend stats, or route your first prestige, awakening is not the system that should control your next decision. In practical terms, awakening belongs to the stage where you already understand your build and are thinking about ceiling, requirements, and progression sequencing.',
            },
          ],
        },
        {
          title: 'How prestige and evolutions connect to it',
          blocks: [
            {
              type: 'paragraph',
              text: 'The clearest official late-game clue on the board is the Journey to Heaven questline. That route explicitly requires 1 Prestige and sends you to Pucci near bus stop 18 in Cultist Castle. The official board does not say that every awakening follows that exact path, but it does confirm that at least some awakening-adjacent evolution content sits behind deeper progression requirements.',
            },
          ],
        },
        {
          title: 'When players should start caring about awakening',
          blocks: [
            {
              type: 'paragraph',
              text: 'You should usually care about awakening after three things are already stable:',
            },
            {
              type: 'list',
              items: [
                'your main stand route',
                'your stat allocation',
                'your prestige planning',
              ],
            },
            {
              type: 'paragraph',
              text: 'Before that point, reading awakening pages too early often creates the wrong priority order.',
            },
          ],
        },
        {
          title: 'Common awakening mistake',
          blocks: [
            {
              type: 'paragraph',
              text: 'The common mistake is searching for awakening before the rest of the account is ready for late-game content. Players often chase end-state power language while their current problems are still basic routing, weak stats, or an unprepared prestige path.',
            },
          ],
        },
        {
          title: 'Bottom line',
          blocks: [
            {
              type: 'paragraph',
              text: 'Awakening is best treated as a late-game build and evolution term in Bizarre Lineage. Based on the official Trello structure, it belongs much later than stand unlocks, stat basics, or early progression decisions.',
            },
          ],
        },
      ],
      references: [
        {
          label: 'Official Trello board',
          href: 'https://trello.com/b/Zi6UTMnO/official-bizzare-lineage-%E2%9E%B5',
        },
        {
          label: 'Journey to Heaven questline',
          href: 'https://trello.com/c/eZdniYOH/25-untitled',
        },
        { label: 'Pucci NPC', href: 'https://trello.com/c/WwGKcn07/618-pucci' },
      ],
      relatedLinks: [
        { label: 'Terms hub', href: '/terms' },
        { label: 'Prestige term', href: '/terms/prestige' },
        { label: 'Beginner guide', href: '/guides/beginner-guide' },
      ],
    },
    'stand-arrow': {
      slug: 'terms/stand-arrow',
      title: 'Stand Arrow in Bizarre Lineage',
      cardTitle: 'Stand Arrow',
      cardDescription:
        'The main obtainment path for many stands. It is often the starting point for early stand routing.',
      description:
        'What a Stand Arrow is in Bizarre Lineage, how to get one, and why it matters for your first stand route.',
      heroImageSrc:
        'https://trello.com/1/cards/69530cc85bf78fb14d510291/attachments/69761f762eaf03ec4ec93507/download/image.png',
      heroImageAlt: 'Official Bizarre Lineage stand arrow reference',
      intro: [
        'The Stand Arrow is one of the core progression items in Bizarre Lineage because it is the official route into your first stand.',
        'The public Trello is direct here: you can get a Stand Arrow from the ground or from chests, and you use it on yourself to unlock a stand.',
      ],
      sections: [
        {
          title: 'How to get a Stand Arrow',
          blocks: [
            {
              type: 'paragraph',
              text: 'The official public notes list two main obtainment paths:',
            },
            {
              type: 'list',
              items: ['find it on the ground', 'loot it from chests'],
            },
            {
              type: 'paragraph',
              text: 'That means the Stand Arrow is tied to routing and exploration, not to a guaranteed early tutorial gift.',
            },
          ],
        },
        {
          title: 'How to use a Stand Arrow',
          blocks: [
            {
              type: 'paragraph',
              text: 'The official basics card also states that you unlock your first stand by using a Stand Arrow on yourself. In other words, the item is not just collectible value. It is the point where a no-stand account becomes a stand account.',
            },
          ],
        },
        {
          title: 'Why the Stand Arrow matters so much',
          blocks: [
            {
              type: 'paragraph',
              text: 'For many players, the first real route decision starts here. Once you have a stand, other systems begin to matter more in practice:',
            },
            {
              type: 'list',
              items: [
                'conjuration',
                'fighting styles',
                'sub-abilities',
                'stat planning',
                'later progression like prestige',
              ],
            },
            {
              type: 'paragraph',
              text: 'That is why the Stand Arrow is more than an item drop. It is the start of your real build path.',
            },
          ],
        },
        {
          title: 'How players should think about it',
          blocks: [
            {
              type: 'paragraph',
              text: 'Treat the Stand Arrow as part of a progression route, not just as a random gamble. A usable stand result is often more valuable than endlessly trying to force a premium target too early.',
            },
          ],
        },
        {
          title: 'Common Stand Arrow mistake',
          blocks: [
            {
              type: 'paragraph',
              text: 'The common mistake is burning too much time or too many resources on rerolls before the account has a stable direction. Early on, a workable route usually matters more than an ideal chase.',
            },
          ],
        },
        {
          title: 'Bottom line',
          blocks: [
            {
              type: 'paragraph',
              text: 'The Stand Arrow is the key item that opens stand-based progression in Bizarre Lineage. If you want to understand where your build actually starts, it starts here.',
            },
          ],
        },
      ],
      references: [
        {
          label: 'Official Trello board',
          href: 'https://trello.com/b/Zi6UTMnO/official-bizzare-lineage-%E2%9E%B5',
        },
        {
          label: 'Stand Arrow card',
          href: 'https://trello.com/c/Z82ovOVJ/41-stand-arrow',
        },
      ],
      relatedLinks: [
        { label: 'Terms hub', href: '/terms' },
        { label: 'Beginner guide', href: '/guides/beginner-guide' },
        { label: 'Sub-abilities term', href: '/terms/sub-abilities' },
      ],
    },
    'fighting-styles': {
      slug: 'terms/fighting-styles',
      title: 'Fighting Styles in Bizarre Lineage',
      cardTitle: 'Fighting Style',
      cardDescription:
        'A secondary combat layer that changes pressure, coverage, and how a stand actually performs in practice.',
      description:
        'What fighting styles are in Bizarre Lineage, how to unlock them, and where Boxing, Kendo, and Karate trainers are located.',
      heroImageSrc:
        'https://trello.com/1/cards/69531c612fbbcef6ddae5477/attachments/6976317b4e9db678d4a643a5/download/Screenshot2026-01-25170437-ezgif.com-resize.jpg',
      heroImageAlt: 'Official Bizarre Lineage fighting style trainer reference',
      intro: [
        'Fighting styles in Bizarre Lineage are trainer-based combat paths that add their own abilities and change how a build plays.',
        "The official Trello is clear on the main point: you do not unlock a fighting style from a menu. You unlock one by finding the right trainer and finishing that style's questline.",
      ],
      sections: [
        {
          title: 'How fighting styles work',
          blocks: [
            {
              type: 'paragraph',
              text: 'The fighting-style loop is straightforward. Pick a style, travel to its trainer, and complete the associated quest to unlock abilities. That means fighting styles are part of progression routing, not just part of combat theory.',
            },
          ],
        },
        {
          title: 'Confirmed fighting styles and locations',
          blocks: [
            {
              type: 'paragraph',
              text: 'The current official Trello explicitly names these public fighting-style routes:',
            },
            {
              type: 'list',
              items: [
                'Boxing: talk to the Boxing Coach near bus stop 2, upstairs in the Gym',
                'Kendo: talk to the Samurai Master near bus stop 15 in Kame Yu Market',
                'Karate: talk to the Karate Sensei around the Hospital area near bus stop 15',
              ],
            },
            {
              type: 'paragraph',
              text: "In all three cases, the official notes say you also need to complete the trainer's quest to unlock the style's abilities.",
            },
          ],
        },
        {
          title: 'Why fighting styles matter in real builds',
          blocks: [
            {
              type: 'paragraph',
              text: 'A stand is not the whole build. Fighting styles affect pressure, mobility, coverage, and the kinds of follow-ups a player can actually convert in real matches. That is why strong builds are usually judged as stand-plus-style combinations, not just as stand names on their own.',
            },
          ],
        },
        {
          title: 'When to optimize a style',
          blocks: [
            {
              type: 'paragraph',
              text: 'Most players should first secure a usable stand and stop obvious stat mistakes. After that, fighting styles become a much stronger optimization layer because you can judge whether Boxing, Kendo, or Karate actually supports the rest of your route.',
            },
          ],
        },
        {
          title: 'Common fighting style mistake',
          blocks: [
            {
              type: 'paragraph',
              text: 'The common mistake is copying a style from a high-end build without checking whether the rest of the setup matches it. If your stand, stats, or progression route are not aligned, the same style can feel much worse in practice.',
            },
          ],
        },
        {
          title: 'Bottom line',
          blocks: [
            {
              type: 'paragraph',
              text: 'Fighting styles are trainer-led combat upgrades in Bizarre Lineage. If you want one, the real question is not just which style looks strong, but which trainer, location, and quest path fit your current build.',
            },
          ],
        },
      ],
      references: [
        {
          label: 'Official Trello board',
          href: 'https://trello.com/b/Zi6UTMnO/official-bizzare-lineage-%E2%9E%B5',
        },
        {
          label: 'Fighting style overview',
          href: 'https://trello.com/c/Ft5Mge4A/134-untitled',
        },
        {
          label: 'Boxing Coach',
          href: 'https://trello.com/c/IM8f4lDA/640-boxing-coach',
        },
        {
          label: 'Samurai Master',
          href: 'https://trello.com/c/k9ZvXIUo/636-samurai-master',
        },
        {
          label: 'Karate Sensei',
          href: 'https://trello.com/c/dylpyb9n/641-karate-sensei',
        },
      ],
      relatedLinks: [
        { label: 'Terms hub', href: '/terms' },
        { label: 'Sub-abilities term', href: '/terms/sub-abilities' },
        { label: 'Stats guide', href: '/guides/stats' },
      ],
    },
    'sub-abilities': {
      slug: 'terms/sub-abilities',
      title: 'Sub-Abilities in Bizarre Lineage',
      cardTitle: 'Sub-Ability',
      cardDescription:
        'An extra build layer used to patch weaknesses or sharpen a stand toward a specific role.',
      description:
        'What sub-abilities are in Bizarre Lineage, how to unlock them, and how trainer routes differ from the Vampire item route.',
      heroImageSrc:
        'https://trello.com/1/cards/699f8883686a101eb1c4a0c2/attachments/699f8a6ae3451206a5a14d7a/download/image.png',
      heroImageAlt: 'Official Bizarre Lineage sub-ability NPC reference',
      intro: [
        'Sub-abilities in Bizarre Lineage are secondary progression layers that sit beside your main stand choice.',
        'The official Trello shows two main unlock patterns: trainer-based routes such as Ripple, Cyborg, and Spin, plus item-based routes such as Vampire.',
      ],
      sections: [
        {
          title: 'What counts as a sub-ability',
          blocks: [
            {
              type: 'paragraph',
              text: 'The current public Trello explicitly points to these trainer or route examples:',
            },
            {
              type: 'list',
              items: ['Ripple', 'Cyborg', 'Spin', 'Vampire'],
            },
            {
              type: 'paragraph',
              text: 'That matters because sub-abilities are not one single obtainment system. The route depends on which sub-ability you actually want.',
            },
          ],
        },
        {
          title: 'Trainer-based sub-abilities',
          blocks: [
            {
              type: 'paragraph',
              text: 'The public summary card says you can obtain a sub-ability by talking to available trainers around the map. For players chasing Ripple, Cyborg, or Spin, the key question is trainer location and quest completion, not just raw build theory.',
            },
          ],
        },
        {
          title: 'The Vampire route works differently',
          blocks: [
            {
              type: 'paragraph',
              text: "Vampire is the clearest official exception. The Trello says you must use a Vampire Mask if you do not already have the vampire sub-ability. After that, you still need to talk to the Elder Vampire in Dio's Chapel and complete his quest to unlock the vampire abilities properly.",
            },
          ],
        },
        {
          title: 'Why sub-abilities matter in real builds',
          blocks: [
            {
              type: 'paragraph',
              text: 'Sub-abilities change how complete a build feels. They can add utility, improve coverage, or give a setup a clearer identity beyond the main stand. That is why players often discuss them as a separate layer instead of treating the stand as the whole build.',
            },
          ],
        },
        {
          title: 'Common sub-ability mistake',
          blocks: [
            {
              type: 'paragraph',
              text: 'The common mistake is assuming the first unlock step gives the full power set immediately. Vampire is the easiest example: using the mask alone is not the full route, because the Trello still sends you to the Elder Vampire questline for the actual abilities.',
            },
          ],
        },
        {
          title: 'Bottom line',
          blocks: [
            {
              type: 'paragraph',
              text: 'Sub-abilities are an extra build layer in Bizarre Lineage. Some come from trainers, some come from items, and the correct route depends on which sub-ability you are trying to add to your build.',
            },
          ],
        },
      ],
      references: [
        {
          label: 'Official Trello board',
          href: 'https://trello.com/b/Zi6UTMnO/official-bizzare-lineage-%E2%9E%B5',
        },
        {
          label: 'Sub-ability overview',
          href: 'https://trello.com/c/qXGMJjBT/133-untitled',
        },
        {
          label: 'Sub Ability NPC',
          href: 'https://trello.com/c/Efcil4ql/646-sub-ability-npc',
        },
        {
          label: 'Elder Vampire',
          href: 'https://trello.com/c/k1Ai3wbh/616-elder-vampire',
        },
        {
          label: 'Vampire route',
          href: 'https://trello.com/c/mohrgfOp/5-untitled',
        },
      ],
      relatedLinks: [
        { label: 'Terms hub', href: '/terms' },
        { label: 'Fighting styles term', href: '/terms/fighting-styles' },
        { label: 'Beginner guide', href: '/guides/beginner-guide' },
      ],
    },
  },
};

export function resolveTermsLocale(locale?: string | null): TermsLocale {
  return locale === 'en' ? 'en' : 'en';
}

export function getTermsDictionary(locale?: string | null): TermsDictionary {
  const resolvedLocale = resolveTermsLocale(locale);

  switch (resolvedLocale) {
    case 'en':
    default:
      return enTerms;
  }
}

export function getTermEntry(
  termKey: TermKey,
  locale?: string | null
): TermEntry {
  return getTermsDictionary(locale).terms[termKey];
}
