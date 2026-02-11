/**
 * Shared utility functions for GBV components
 */

/**
 * Determines the primary release type (Album, EP, or Single) based on format and release type
 */
export function getReleaseType(format?: string | string[], releaseType?: string): "Album" | "EP" | "Single" {
  // Explicit releaseType field takes priority
  if (releaseType === "ep") return "EP";
  if (releaseType === "single") return "Single";

  if (!format && releaseType !== "release") return "Album";
  const normalized = Array.isArray(format) ? format.join(" ") : format || "";
  const lowerFormat = normalized.toLowerCase();

  // Check for EP indicators
  if (lowerFormat.includes("ep")) return "EP";
  if (lowerFormat.includes('10"') || lowerFormat.includes("10\"")) return "EP";
  if (lowerFormat.includes("mini")) return "EP";
  if (lowerFormat.includes('12"') || lowerFormat.includes("12\"")) return "EP";

  // Check for single indicators
  if (lowerFormat.includes("single")) return "Single";
  if (lowerFormat.includes('7"') || lowerFormat.includes("7\"")) return "Single";
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

export { getProxiedImageUrl } from "@/lib/image-utils";
