import { ContentDataTranslator } from './types';

export type CodeEntry = {
  code: string;
  reward: string;
  status: string;
  lastVerified: string;
};

const activeCodeDefs = [
  { code: '!code 30kLikes', rewardKey: '30kLikes' },
  { code: '!code 100kLikes', rewardKey: '100kLikes' },
  { code: '!code shutdownwoops', rewardKey: 'shutdownwoops' },
  { code: '!code 1week', rewardKey: '1week' },
] as const;

const monitoredCodeDefs = [
  { code: '200KLIKES', rewardKey: '200KLIKES' },
] as const;

const lastVerified = '2026-03-21';

export function getActiveCodes(t: ContentDataTranslator): CodeEntry[] {
  return activeCodeDefs.map((entry) => ({
    code: entry.code,
    reward: t(`page.content.active_codes_rewards.${entry.rewardKey}`),
    status: t('page.content.status.active'),
    lastVerified,
  }));
}

export function getExpiredCodes(t: ContentDataTranslator): CodeEntry[] {
  const expiredCodes = t.raw<
    Array<{ code: string; reward: string; lastVerified: string }>
  >('page.content.expired_codes');

  return expiredCodes.map((entry) => ({
    ...entry,
    status: t('page.content.status.expired'),
  }));
}

export function getMonitoredCodeClaims(t: ContentDataTranslator): CodeEntry[] {
  return monitoredCodeDefs.map((entry) => ({
    code: entry.code,
    reward: t(`page.content.monitored_codes_rewards.${entry.rewardKey}`),
    status: t('page.content.status.monitor'),
    lastVerified,
  }));
}

export function getRedeemSteps(t: ContentDataTranslator) {
  return t.raw<Array<{ title: string; description: string }>>(
    'page.content.redeem_steps'
  );
}

export function getCodeFailureReasons(t: ContentDataTranslator) {
  return t.raw<Array<{ title: string; description: string }>>(
    'page.content.failure_reasons'
  );
}
