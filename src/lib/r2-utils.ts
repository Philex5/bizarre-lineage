let hasWarnedAboutStorageDomain = false;

function getStorageDomain(): string | undefined {
  return typeof window !== 'undefined'
    ? process.env.NEXT_PUBLIC_STORAGE_DOMAIN
    : process.env.NEXT_PUBLIC_STORAGE_DOMAIN || process.env.STORAGE_DOMAIN;
}

function normalizeR2Path(path: string | null | undefined): string {
  if (!path) {
    return '';
  }

  return path.trim().replace(/^\/+/, '');
}

function warnAboutStorageDomain(): void {
  if (hasWarnedAboutStorageDomain) {
    return;
  }

  hasWarnedAboutStorageDomain = true;
  console.warn(
    '[r2-utils] NEXT_PUBLIC_STORAGE_DOMAIN or STORAGE_DOMAIN is not configured, falling back to a relative path.'
  );
}

export function isAbsoluteUrl(url: string | null | undefined): boolean {
  if (!url) {
    return false;
  }

  return /^(?:[a-z]+:)?\/\//i.test(url);
}

export function getR2Url(r2Path: string): string {
  if (!r2Path) {
    return '';
  }

  if (isAbsoluteUrl(r2Path)) {
    return r2Path;
  }

  const cleanPath = normalizeR2Path(r2Path);
  if (!cleanPath) {
    return '';
  }

  const storageDomain = getStorageDomain();
  if (!storageDomain) {
    warnAboutStorageDomain();
    return `/${cleanPath}`;
  }

  const normalizedDomain = storageDomain.replace(/\/+$/, '');
  return `${normalizedDomain}/${cleanPath}`;
}

export function getAssetUrl(assetPath: string): string {
  const cleanPath = normalizeR2Path(assetPath).replace(/^assets\//, '');

  if (!cleanPath) {
    return '';
  }

  return getR2Url(`assets/${cleanPath}`);
}

export function getR2ThumbnailUrl(r2Path: string): string {
  const cleanPath = normalizeR2Path(r2Path);
  if (!cleanPath) {
    return '';
  }

  const lastSlashIndex = cleanPath.lastIndexOf('/');
  if (lastSlashIndex === -1) {
    return getR2Url(`thumbs/${cleanPath}`);
  }

  const directory = cleanPath.slice(0, lastSlashIndex);
  const filename = cleanPath.slice(lastSlashIndex + 1);

  return getR2Url(`${directory}/thumbs/${filename}`);
}

export function toImageUrl(imageRef: string | null | undefined): string {
  if (!imageRef) {
    return '';
  }

  if (isAbsoluteUrl(imageRef)) {
    return imageRef;
  }

  return getR2Url(imageRef);
}
