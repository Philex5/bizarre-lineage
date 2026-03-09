/**
 * Cloudflare R2 配置
 */

// R2 CDN 域名配置
export const R2_CONFIG = {
  // 主域名
  domain: process.env.NEXT_PUBLIC_R2_DOMAIN || "your-r2-domain.r2.dev",
  
  // 自定义域名（如果有）
  customDomain: process.env.NEXT_PUBLIC_R2_CUSTOM_DOMAIN,
  
  // 视频文件夹路径
  videoPath: "videos",
  
  // 图片文件夹路径
  imagePath: "images",
  
  // 缓存设置
  cache: {
    // 视频缓存时间（秒）
    videoCacheTime: 86400, // 24小时
    // 图片缓存时间（秒）
    imageCacheTime: 604800, // 7天
  },
} as const;

/**
 * 获取 R2 资源 URL
 */
export function getR2Url(path: string, useCustomDomain = true): string {
  const domain = useCustomDomain && R2_CONFIG.customDomain 
    ? R2_CONFIG.customDomain 
    : R2_CONFIG.domain;
  
  // 确保路径以 / 开头
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  
  return `https://${domain}${normalizedPath}`;
}

/**
 * 获取视频 URL
 */
export function getVideoUrl(filename: string, useCustomDomain = true): string {
  return getR2Url(`${R2_CONFIG.videoPath}/${filename}`, useCustomDomain);
}

/**
 * 获取图片 URL
 */
export function getImageUrl(filename: string, useCustomDomain = true): string {
  return getR2Url(`${R2_CONFIG.imagePath}/${filename}`, useCustomDomain);
}

/**
 * 检查是否为 R2 URL
 */
export function isR2Url(url: string): boolean {
  return url.includes(R2_CONFIG.domain) || 
         (R2_CONFIG.customDomain && url.includes(R2_CONFIG.customDomain));
}

/**
 * 获取带缓存参数的 URL
 */
export function getCachedUrl(url: string, cacheTime?: number): string {
  if (!isR2Url(url)) return url;
  
  const urlObj = new URL(url);
  
  // 添加缓存控制参数
  if (cacheTime) {
    urlObj.searchParams.set("cache", cacheTime.toString());
  }
  
  return urlObj.toString();
}

/**
 * 预设的视频文件名
 */
export const VIDEO_FILES = {
  demo: "sparkicon-demo.mp4",
  tutorial: "sparkicon-tutorial.mp4",
  showcase: "sparkicon-showcase.mp4",
} as const;

/**
 * 获取预设视频 URL
 */
export function getPresetVideoUrl(
  preset: keyof typeof VIDEO_FILES, 
  useCustomDomain = true
): string {
  return getVideoUrl(VIDEO_FILES[preset], useCustomDomain);
}
