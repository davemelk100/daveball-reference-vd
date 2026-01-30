/**
 * AmRep release artwork
 */

const amrepAlbumImages: Record<number, string> = {
  1: "https://upload.wikimedia.org/wikipedia/en/4/4c/Cows_Peacetika.JPG",
  3: "https://upload.wikimedia.org/wikipedia/en/4/40/Helios_Creed_-_Lactating_Purple.jpg",
  6: "https://upload.wikimedia.org/wikipedia/en/9/91/God_Bullies_-_War_on_Everybody.jpeg",
  10: "https://upload.wikimedia.org/wikipedia/en/9/9b/Helios_Creed_-_Kiss_to_the_Brain.jpeg",
  12: "https://upload.wikimedia.org/wikipedia/en/1/1d/Hammerhead_-_Ethereal_Killer.jpg",
  14: "https://upload.wikimedia.org/wikipedia/en/1/12/Big_Metal_Birds.jpg",
  15: "https://upload.wikimedia.org/wikipedia/en/6/68/Cows_Sexy_Pee_Story.JPG",
  17: "https://upload.wikimedia.org/wikipedia/en/0/0d/Boss_Hog_Girl_Positive.jpg",
  18: "https://upload.wikimedia.org/wikipedia/en/d/de/Surgery_-_Trim%2C_9th_Ward_High_Roller.jpeg",
  22: "https://upload.wikimedia.org/wikipedia/en/4/43/Today_is_the_Day_Supernova.jpg",
  24: "https://upload.wikimedia.org/wikipedia/en/b/bf/Hammerhead_-_Evil_Twin.jpeg",
  26: "https://upload.wikimedia.org/wikipedia/en/0/07/Hammerhead_-_Into_the_Vortex.jpg",
  28: "https://upload.wikimedia.org/wikipedia/en/a/a5/Cows_Orphans_Tragedy.JPG",
  31: "https://upload.wikimedia.org/wikipedia/en/7/7c/Prick.png",
  33: "https://upload.wikimedia.org/wikipedia/en/e/e5/Today_Is_the_Day_Willpower.JPG",
  36: "https://upload.wikimedia.org/wikipedia/en/9/90/Helmet-BornAnnoying.jpg",
  39: "https://upload.wikimedia.org/wikipedia/en/6/6f/ScattredUnsane.jpg",
  46: "https://upload.wikimedia.org/wikipedia/en/2/21/Today_Is_the_Day_Today_Is_the_Day.jpg",
};

/**
 * Get album artwork for an AmRep release
 */
export function getAmrepAlbumImage(releaseId: number): string | null {
  return amrepAlbumImages[releaseId] ?? null;
}

/**
 * Check if a release has custom artwork (not fallback)
 */
export function hasAmrepAlbumArtwork(releaseId: number): boolean {
  return releaseId in amrepAlbumImages;
}
