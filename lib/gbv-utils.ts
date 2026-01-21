/**
 * Shared utility functions for GBV components
 */

/**
 * Determines the primary release type (Album or Single) based on format and release type
 */
export function getReleaseType(format?: string | string[], releaseType?: string): "Album" | "Single" {
  if (!format && releaseType !== "release") return "Album";
  const normalized = Array.isArray(format) ? format.join(" ") : format || "";
  if (normalized.toLowerCase().includes("single")) return "Single";
  if (releaseType === "release") return "Single";
  return "Album";
}

/**
 * Normalizes a string for use as a cache key (lowercase, trimmed)
 */
export function normalizeCacheKey(str: string): string {
  return str.toLowerCase().trim();
}

/**
 * Creates a normalized cache key from artist and album names
 */
export function createAlbumCacheKey(artist: string, album: string): string {
  return `${normalizeCacheKey(artist)}:${normalizeCacheKey(album)}`;
}

/**
 * Domains that should be proxied to avoid third-party cookies
 */
const PROXY_DOMAINS = [
  "i.discogs.com",
  "img.discogs.com",
  "st.discogs.com",
  "s.discogs.com",
  "archive.org",
  "coverartarchive.org",
  "upload.wikimedia.org",
  "commons.wikimedia.org",
];

/**
 * Converts external image URLs to proxied URLs to avoid third-party cookies
 */
export function getProxiedImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const shouldProxy = PROXY_DOMAINS.some(
      (domain) =>
        parsed.hostname === domain ||
        parsed.hostname.endsWith(`.${domain}`) ||
        parsed.hostname.endsWith(".archive.org")
    );

    if (shouldProxy) {
      return `/api/gbv/image-proxy?url=${encodeURIComponent(url)}`;
    }

    return url;
  } catch {
    return url;
  }
}
