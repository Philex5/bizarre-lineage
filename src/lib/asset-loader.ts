import {
  getAssetUrl as getR2AssetUrl,
  getR2Url,
  isAbsoluteUrl,
} from '@/lib/r2-utils';

export const ASSET_FOLDERS = {
  site: 'site',
  pages: 'pages',
  posts: 'posts',
  stands: 'stands',
} as const;

export type AssetFolder = keyof typeof ASSET_FOLDERS;

function normalizeRelativePath(path: string | null | undefined): string {
  if (!path) {
    return '';
  }

  return path.trim().replace(/^\/+/, '').replace(/^assets\//, '');
}

function joinAssetPath(...segments: Array<string | null | undefined>): string {
  return segments.map(normalizeRelativePath).filter(Boolean).join('/');
}

export function getAssetUrl(path: string): string {
  const normalizedPath = normalizeRelativePath(path);

  if (!normalizedPath) {
    return '';
  }

  return getR2AssetUrl(normalizedPath);
}

export function getAssetFolderUrl(
  folder: AssetFolder,
  path: string | null | undefined
): string {
  const normalizedPath = joinAssetPath(ASSET_FOLDERS[folder], path);

  if (!normalizedPath) {
    return '';
  }

  return getAssetUrl(normalizedPath);
}

export function getSiteAssetUrl(path: string): string {
  return getAssetFolderUrl('site', path);
}

export function getPageAssetUrl(path: string): string {
  return getAssetFolderUrl('pages', path);
}

export function getPostAssetUrl(path: string): string {
  return getAssetFolderUrl('posts', path);
}

export function getStandAssetUrl(path: string): string {
  return getAssetFolderUrl('stands', path);
}

export function getLogoUrl(filename = 'logo.webp'): string {
  return getSiteAssetUrl(filename);
}

export function getFaviconUrl(filename = 'favicon.ico'): string {
  return getSiteAssetUrl(filename);
}

export function resolveAssetUrl(
  path: string | null | undefined,
  folder?: AssetFolder
): string {
  if (!path) {
    return '';
  }

  const trimmedPath = path.trim();
  if (!trimmedPath) {
    return '';
  }

  if (isAbsoluteUrl(trimmedPath)) {
    return trimmedPath;
  }

  if (trimmedPath.startsWith('assets/') || trimmedPath.startsWith('/assets/')) {
    return getR2Url(trimmedPath);
  }

  if (folder) {
    return getAssetFolderUrl(folder, trimmedPath);
  }

  return getAssetUrl(trimmedPath);
}

export async function preloadAssets(
  assets: Array<string | null | undefined>,
  folder?: AssetFolder
): Promise<void> {
  if (typeof window === 'undefined') {
    return;
  }

  await Promise.all(
    assets.map(async (assetPath) => {
      const url = resolveAssetUrl(assetPath, folder);
      if (!url) {
        return;
      }

      try {
        await fetch(url, { method: 'HEAD', mode: 'no-cors' });
      } catch (error) {
        console.warn(`[asset-loader] Failed to preload asset: ${url}`, error);
      }
    })
  );
}

export const assetLoader = {
  folders: ASSET_FOLDERS,
  getAssetUrl,
  getAssetFolderUrl,
  getSiteAssetUrl,
  getPageAssetUrl,
  getPostAssetUrl,
  getStandAssetUrl,
  getLogoUrl,
  getFaviconUrl,
  resolveAssetUrl,
  preloadAssets,
};

export default assetLoader;
