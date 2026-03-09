export type CodeEntry = {
  code: string;
  reward: string;
  status: 'Active' | 'Monitor' | 'Expired';
  lastVerified: string;
};

export const activeCodes: CodeEntry[] = [
  {
    code: '!code 30kLikes',
    reward: '1 Stand Stat Point Essence',
    status: 'Active',
    lastVerified: '2026-03-09',
  },
  {
    code: '!code 100kLikes',
    reward: '1 Stand Stat Point Essence',
    status: 'Active',
    lastVerified: '2026-03-09',
  },
  {
    code: '!code shutdownwoops',
    reward: '1 Stand Stat Point Essence',
    status: 'Active',
    lastVerified: '2026-03-09',
  },
  {
    code: '!code 1week',
    reward: '1 Stand Stat Point Essence',
    status: 'Active',
    lastVerified: '2026-03-09',
  },
];

export const expiredCodes: CodeEntry[] = [];

export const monitoredCodeClaims: CodeEntry[] = [
  {
    code: '200KLIKES',
    reward: 'Unannounced future reward',
    status: 'Monitor',
    lastVerified: '2026-03-09',
  },
];

export const redeemSteps = [
  {
    title: 'Launch Bizarre Lineage',
    description: 'Open the game on Roblox and enter the world.',
    image: '/images/codes/redeem-guide.jpg',
  },
  {
    title: 'Open Chat',
    description: 'Type the working code directly into the in-game chat.',
  },
  {
    title: 'Send and Claim',
    description: 'Click the Send button or press Enter to acquire your rewards instantly.',
  },
] as const;

export const codeFailureReasons = [
  {
    title: 'Case Sensitivity',
    description: 'Roblox codes are usually case-sensitive. Ensure "!code" and the code itself match exactly.',
  },
  {
    title: 'Official Group',
    description: 'Some codes require you to join the official Roblox community group first.',
  },
  {
    title: 'Fresh Servers',
    description: 'New codes might only work on updated servers. Try joining a new server if a code fails.',
  },
] as const;
