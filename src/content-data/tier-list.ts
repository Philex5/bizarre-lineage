import { ContentDataTranslator } from './types';

export type TierListEntry = {
  key: string;
  name: string;
  tier: 'S' | 'A' | 'B' | 'C';
  pvp: string;
  pve: string;
  beginner: string;
  summary: string;
};

export function getTierListEntries(t: ContentDataTranslator): TierListEntry[] {
  return t.raw<TierListEntry[]>('page.content.entries');
}

export function getTierMethodology(t: ContentDataTranslator) {
  return t.raw<Array<{ title: string; description: string }>>(
    'page.content.methodology'
  );
}

export function getBestForCards(t: ContentDataTranslator) {
  return t.raw<Array<{ title: string; description: string }>>(
    'page.content.best_for'
  );
}
