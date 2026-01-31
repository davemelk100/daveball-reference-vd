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
  47: "https://upload.wikimedia.org/wikipedia/en/4/43/Cows_-_Old_Gold.jpg",
  50: "https://upload.wikimedia.org/wikipedia/en/6/6e/Cows_Whorn.jpeg",
  56: "https://upload.wikimedia.org/wikipedia/en/7/7e/Feedtime_-_Billy.jpg",
  62: "https://upload.wikimedia.org/wikipedia/en/f/f9/Servotronspare.jpg",
  63: "https://upload.wikimedia.org/wikipedia/en/c/c4/Melvins_Singles_1-12.jpg",
  64: "https://upload.wikimedia.org/wikipedia/en/7/72/Melvins-honky.jpg",
  66: "https://upload.wikimedia.org/wikipedia/en/b/b1/Sorry_In_Pig_Minor.png",
  69: "https://upload.wikimedia.org/wikipedia/en/8/85/Letthemeatpussy.JPG",
  72: "https://upload.wikimedia.org/wikipedia/en/8/8c/Melvins-aatfc.jpg",
  74: "https://upload.wikimedia.org/wikipedia/en/7/75/Melvins_vs._Minneapolis.jpg",
  78: "https://upload.wikimedia.org/wikipedia/en/6/65/Melvins2010.jpg",
  83: "https://upload.wikimedia.org/wikipedia/en/0/0c/Melvins_-_The_Bulls_%26_The_Bees_front_cover.jpg",
  84: "https://upload.wikimedia.org/wikipedia/en/7/75/Freak_Puke-cdcover-.jpg",
  102: "https://upload.wikimedia.org/wikipedia/en/2/25/Drinkin%27%2C_Lechin%27_%26_Lyin%27.jpg",
  106: "https://upload.wikimedia.org/wikipedia/en/d/d6/Teenage_Jesus_and_the_Jerks_-_Teenage_Jesus_and_the_Jerks.jpg",
  107: "https://upload.wikimedia.org/wikipedia/en/7/7f/Crystal_fairy_-_album_cover.jpg",
  108: "https://upload.wikimedia.org/wikipedia/en/f/ff/Cows_Taint_Pluribus_Taint_Unum.JPG",
  109: "https://upload.wikimedia.org/wikipedia/en/4/4d/Cherubs_-_Heroin_Man.jpg",
  110: "https://upload.wikimedia.org/wikipedia/en/8/86/Lydia_Lunch_-_Queen_of_Siam.jpeg",
  114: "https://upload.wikimedia.org/wikipedia/en/d/d6/Gluey_orig.jpg",
  115: "https://upload.wikimedia.org/wikipedia/en/3/3f/The_Cows_Effete_and_Impudent_Snobs.jpg",
  117: "https://upload.wikimedia.org/wikipedia/en/5/5c/Pinkus_Abortion_Technician_%282018%29_cover.jpg",
  118: "https://upload.wikimedia.org/wikipedia/en/a/a5/A_Walk_with_Love_%26_Death.jpg",
  120: "https://upload.wikimedia.org/wikipedia/en/7/74/God_Bullies_-_Mama_Womb_Womb.jpeg",
  129: "https://upload.wikimedia.org/wikipedia/en/b/b8/Melvins-electroretard.jpg",
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
