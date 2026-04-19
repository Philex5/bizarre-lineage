import { ContentDataTranslator } from './types';

export type CodeEntry = {
  code: string;
  reward: string;
  status: string;
  lastVerified: string;
};

const activeCodeDefs = [
  { code: 'Delay3', rewardKey: 'Delay3' },
  { code: 'Delay2', rewardKey: 'Delay2' },
  { code: 'Delay1', rewardKey: 'Delay1' },
  { code: 'BizarreLineage1', rewardKey: 'BizarreLineage1' },
  { code: 'Update1', rewardKey: 'Update1' },
  { code: 'LikeTheGameForMore1', rewardKey: 'LikeTheGameForMore1' },
  { code: 'FavoriteTheGame1', rewardKey: 'FavoriteTheGame1' },
  { code: '750LikesforNextCode', rewardKey: '750LikesforNextCode' },
  { code: 'Update2=2027', rewardKey: 'Update2_2027' },
  { code: '250kLikes', rewardKey: '250kLikes' },
  { code: '500kLikes', rewardKey: '500kLikes' },
] as const;

const monitoredCodeDefs: ReadonlyArray<{
  code: string;
  rewardKey: string;
}> = [];

const lastVerified = '2026-04-18';

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
