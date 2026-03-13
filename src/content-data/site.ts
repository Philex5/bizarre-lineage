import { ContentDataTranslator } from './types';

export const siteName = 'Bizarre Lineage Wiki';

export const placeholderImages = {
  hero: '/placeholders/bizarre-lineage-hero.webp',
  stand: '/placeholders/stand-focus.svg',
  guide: '/placeholders/guide-route.svg',
} as const;

const officialLinkHrefs = [
  'https://www.roblox.com/games/14890802310/Bizarre-Lineage',
  'https://discord.com/invite/bizarrelineage',
  'https://trello.com/b/Zi6UTMnO/official-bizzare-lineage-%E2%9E%B5',
] as const;

const systemsOverviewHrefMap: Record<string, string | undefined> = {
  stands: '/tier-list',
  fighting_styles: undefined,
  sub_abilities: undefined,
  stats: '/guides/stats',
  raids: undefined,
  prestige: '/guides/prestige',
  awakening: undefined,
};

const newPlayerRouteHrefMap: Record<string, string | undefined> = {
  first_stand: undefined,
  avoid_waste: undefined,
  understand_stats: '/guides/stats',
  reset_point: '/guides/prestige',
};

export function getOfficialLinks(t: ContentDataTranslator) {
  return [
    {
      label: t('page.sections.utility.official_links.items.roblox'),
      href: officialLinkHrefs[0],
      note: t('page.content.official_links.roblox_note'),
    },
    {
      label: t('page.sections.utility.official_links.items.discord'),
      href: officialLinkHrefs[1],
      note: t('page.content.official_links.discord_note'),
    },
    {
      label: t('page.sections.utility.official_links.items.trello'),
      href: officialLinkHrefs[2],
      note: t('page.content.official_links.trello_note'),
    },
  ] as const;
}

export function getGameplayLoop(t: ContentDataTranslator) {
  return t.raw<string[]>('page.content.gameplay_loop');
}

export function getSystemsOverview(t: ContentDataTranslator) {
  return t
    .raw<
      Array<{ key: string; title: string; description: string }>
    >('page.content.systems_overview')
    .map((item) => ({
      ...item,
      href: systemsOverviewHrefMap[item.key],
    }));
}

export function getNewPlayerRoute(t: ContentDataTranslator) {
  return t
    .raw<
      Array<{
        key: string;
        title: string;
        description: string;
        hrefLabel?: string;
      }>
    >('page.content.new_player_route')
    .map((item) => ({
      ...item,
      href: newPlayerRouteHrefMap[item.key],
    }));
}

export function getTrustSignals(t: ContentDataTranslator) {
  return t.raw<string[]>('page.content.trust_signals');
}

export function getHomeFaq(t: ContentDataTranslator) {
  return t.raw<Array<{ question: string; answer: string }>>(
    'page.content.home_faq'
  );
}
