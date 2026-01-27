/**
 * AmRep release artwork
 */

/**
 * Get album artwork for an AmRep release
 * Returns null - no artwork available (uses site placeholder)
 */
export function getAmrepAlbumImage(_releaseId: number): string | null {
  return null;
}

/**
 * Check if a release has custom artwork (not fallback)
 */
export function hasAmrepAlbumArtwork(_releaseId: number): boolean {
  return false;
}
