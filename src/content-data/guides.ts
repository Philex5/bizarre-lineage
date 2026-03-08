export const beginnerGuide = {
  readingTime: '6 min read',
  updatedAt: '2026-03-08',
  checklist: [
    {
      title: 'Redeem the current codes before grinding',
      description:
        'Claim any live rewards first so your opening route is not artificially constrained.',
      href: '/codes',
      hrefLabel: 'Open codes',
    },
    {
      title: 'Do not over-commit to the first flashy stand',
      description:
        'The early game is short on margin. Check the tier list before assuming your first appealing option deserves long-term investment.',
      href: '/tier-list',
      hrefLabel: 'Open tier list',
    },
    {
      title: 'Pick one realistic first target',
      description:
        'A narrow target reduces wasted detours and makes it easier to judge whether your next grind is efficient.',
    },
    {
      title: 'Research expensive chase targets before committing',
      description:
        'Use stand pages when the time cost starts to matter more than novelty.',
      href: '/stands',
      hrefLabel: 'Browse stands',
    },
  ],
  firstThirtyMinutes: [
    {
      title: 'Collect starter value',
      description:
        'Secure the easiest rewards and avoid spending before you understand what they unlock.',
    },
    {
      title: 'Learn the menu flow',
      description:
        'UI friction wastes more early time than most combat mistakes.',
    },
    {
      title: 'Prioritize survivable progress',
      description:
        'Choose steps that remain useful even if your preferred stand target changes later.',
    },
    {
      title: 'Track what feels scarce',
      description:
        'Scarcity usually points at the next guide you should read or the next system you need to understand.',
    },
  ],
  mistakes: [
    {
      title: 'Ignoring codes at the start',
      description:
        'That is one of the easiest ways to make the early game slower than it needs to be.',
    },
    {
      title: 'Chasing a top stand without context',
      description:
        'Not every high-rank option is the right first investment for a brand-new player.',
    },
    {
      title: 'Treating every detour as progress',
      description:
        'A flashy diversion can feel productive while quietly delaying your route.',
    },
    {
      title: 'Skipping build logic entirely',
      description:
        'Stats and progression choices matter too early to ignore until mid-game.',
    },
  ],
  goals: [
    {
      title: 'Stabilize your early economy',
      description:
        'Protect useful rewards and only spend when the decision supports a real progression goal.',
    },
    {
      title: 'Compare chase targets with the tier list',
      description:
        'Use the ranking page to judge whether a longer-term grind is actually worth it.',
    },
    {
      title: 'Understand stats before overbuilding',
      description:
        'The stats guide exists to prevent common early allocation mistakes from snowballing.',
      href: '/guides/stats',
      hrefLabel: 'Read stats guide',
    },
    {
      title: 'Prepare for your first prestige decision',
      description:
        'Use the prestige guide when your route starts feeling reset-sensitive instead of pushing blindly forward.',
      href: '/guides/prestige',
      hrefLabel: 'Read prestige guide',
    },
  ],
  faq: [
    {
      question: 'Why does this guide start with a checklist?',
      answer:
        'Because beginner searchers usually need a route they can execute immediately, not a long introduction.',
    },
    {
      question: 'What page should come next after this guide?',
      answer:
        'Usually the codes page first, then the tier list, then a stand page if a specific chase target emerges.',
    },
    {
      question: 'Should the beginner guide be exhaustive?',
      answer:
        'No. The MVP version should stay compact, high-signal, and easy to skim on mobile.',
    },
  ],
} as const;

export const statsGuide = {
  updatedAt: '2026-03-08',
  overview:
    'Stats should explain decision logic, not pretend every player needs a perfect spreadsheet. The goal is to support your stand, route, and mode preference without trapping yourself in a wasteful allocation pattern.',
  statCards: [
    {
      title: 'Power stats',
      description:
        'These typically shape your direct damage ceiling and whether your build can capitalize on openings.',
    },
    {
      title: 'Durability stats',
      description:
        'Survivability matters when your route values stability over highlight damage.',
    },
    {
      title: 'Mobility and tempo stats',
      description:
        'These affect how often you can start or escape engagements instead of just how hard you hit.',
    },
    {
      title: 'Utility allocation',
      description:
        'Some points exist to smooth progression rather than maximize a duel scenario.',
    },
  ],
  priorities: [
    {
      title: 'Support the stand you actually use',
      description:
        'Do not copy a build logic that assumes a different stand, different style, or different goal.',
    },
    {
      title: 'Bias toward stable progression early',
      description:
        'Early-game stat choices should make PvE and general grinding easier before you optimize for niche fights.',
    },
    {
      title: 'Separate PvP and PvE thinking',
      description:
        'The stat mix that wins duels is not always the same mix that keeps progression efficient.',
    },
    {
      title: 'Leave room for correction',
      description:
        'If you are uncertain, avoid locking yourself into an extreme distribution too early.',
    },
  ],
  mistakes: [
    {
      title: 'Blindly copying endgame builds',
      description:
        'Endgame advice can be actively inefficient on a fresh or mid-game account.',
    },
    {
      title: 'Overbuilding for one matchup',
      description:
        'A narrow duel-focused setup can make the rest of your route worse.',
    },
    {
      title: 'Ignoring progression context',
      description:
        'Stats should serve your current grind stage, not just your ideal future state.',
    },
  ],
  faq: [
    {
      question: 'What should beginners prioritize with stats?',
      answer:
        'Stable progression, survivability, and a build that supports the stand they can actually use right now.',
    },
    {
      question: 'Should PvP and PvE use the same stat logic?',
      answer:
        'Not always. PvP often rewards sharper specialization, while PvE usually rewards smoother consistency.',
    },
    {
      question: 'Why does this guide avoid fake exact numbers?',
      answer:
        'Because the page is meant to teach allocation thinking that survives patches and different account states.',
    },
  ],
} as const;

export const prestigeGuide = {
  updatedAt: '2026-03-08',
  overview:
    'Prestige is valuable when it unlocks the next stage of your route, not when it merely looks available. The page should answer whether you should prestige now, what you gain, and what you should prepare first.',
  whenToPrestige: [
    {
      title: 'Prestige when your current route is capped',
      description:
        'If progress is flattening out and prestige meaningfully opens the next stage, the reset starts making sense.',
    },
    {
      title: 'Prestige after banking critical value',
      description:
        'Do not rush the reset before securing the resources or knowledge you would regret losing.',
    },
    {
      title: 'Prestige with a next-step plan',
      description:
        'A good prestige decision is tied to a new target, not just to the existence of a button.',
    },
  ],
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
      href: '/guides/stats',
      hrefLabel: 'Review stat logic',
    },
    {
      title: 'Set the post-prestige route',
      description:
        'You should know your first goal after the reset so you do not drift once prestige is done.',
      href: '/guides/beginner-guide',
      hrefLabel: 'Open progression route',
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
  faq: [
    {
      question: 'What does prestige do in practical terms?',
      answer:
        'It is a progression reset lever that matters because of what it unlocks next, not because the reset itself is exciting.',
    },
    {
      question: 'When should you prestige?',
      answer:
        'When your current route is capped, you have prepared key resources, and you know what the next stage requires.',
    },
    {
      question: 'What should you read before prestiging?',
      answer:
        'The stats guide and your main progression route are the best pre-checks before making the call.',
    },
  ],
} as const;
