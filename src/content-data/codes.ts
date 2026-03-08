export type CodeEntry = {
  code: string;
  reward: string;
  status: 'Active' | 'Monitor' | 'Expired';
  lastVerified: string;
};

export const activeCodes: CodeEntry[] = [];

export const expiredCodes: CodeEntry[] = [];

export const monitoredCodeClaims: CodeEntry[] = [
  {
    code: '200KLIKES',
    reward: 'Unannounced future reward',
    status: 'Monitor',
    lastVerified: '2026-03-08',
  },
];

export const redeemSteps = [
  {
    title: 'Check an official source first',
    description:
      'Use the official Discord, Roblox game page, or public Trello before trusting a third-party code list.',
  },
  {
    title: 'Open the current in-game redemption area',
    description:
      'The menu can move after updates, so rely on the live game UI instead of stale screenshots.',
  },
  {
    title: 'Enter the code exactly once it is verified',
    description:
      'If a code fails, re-check the source and the spelling before assuming the reward is still live.',
  },
] as const;

export const codeFailureReasons = [
  {
    title: 'Patch drift',
    description:
      'A code can keep circulating on search results and videos after the game has already disabled it.',
  },
  {
    title: 'Input mismatch',
    description:
      'Typos, spacing issues, or extra characters remain the fastest explanation for failed claims.',
  },
  {
    title: 'Unverified list',
    description:
      'Many third-party pages publish placeholders or recycled codes before the developers confirm anything live.',
  },
] as const;
