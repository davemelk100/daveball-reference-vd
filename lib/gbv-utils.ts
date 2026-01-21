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
 * Returns the image URL directly (proxy disabled for performance)
 */
export function getProxiedImageUrl(url: string | null | undefined): string | null {
  return url || null;
}
