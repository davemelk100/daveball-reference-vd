// Skin Graft Records Discography Data
// Source: Discogs, Wikipedia

import { getSgLocalReleaseImage } from "./sg-local-images";

export interface SgRelease {
  catalogNumber: number;
  artist: string;
  title: string;
  year: number;
  format?: string;
  imageUrl?: string;
}

// Remote Discogs thumbnail URLs removed — all signed URLs expired (403).
// All working releases now have local images via download script.
export const sgReleaseImages: Record<number, string> = {};

// Get image URL for a release (prefer local, fall back to remote)
export function getSgReleaseImageUrl(catalogNumber: number): string | undefined {
  return getSgLocalReleaseImage(catalogNumber) ?? sgReleaseImages[catalogNumber];
}

export const sgDiscography: SgRelease[] = [
  { catalogNumber: 1, artist: "Dazzling Killmen", title: "Coffin Fit", year: 1991, format: "7\"" },
  { catalogNumber: 2, artist: "Mount Shasta", title: "Gravity On", year: 1992, format: "7\"" },
  { catalogNumber: 3, artist: "Dazzling Killmen", title: "Dig Out / Cornered", year: 1992, format: "7\"" },
  { catalogNumber: 4, artist: "Lake of Dracula", title: "Lake of Dracula", year: 1993, format: "7\"" },
  { catalogNumber: 5, artist: "The Flying Luttenbachers", title: "Constructive Destruction", year: 1994 },
  { catalogNumber: 6, artist: "Shorty", title: "Thumb the Ride", year: 1994, format: "7\"" },
  { catalogNumber: 7, artist: "Dazzling Killmen", title: "Face of Collapse", year: 1994 },
  { catalogNumber: 8, artist: "Yona-Kit", title: "Yona-Kit", year: 1995 },
  { catalogNumber: 9, artist: "Mount Shasta", title: "Watch Out", year: 1995 },
  { catalogNumber: 10, artist: "U.S. Maple", title: "Long Hair in Three Stages", year: 1995 },
  { catalogNumber: 11, artist: "Scissor Girls", title: "We're Not Gonna Take It", year: 1995, format: "7\"" },
  { catalogNumber: 12, artist: "Colossamite", title: "Economy of Motion", year: 1996 },
  { catalogNumber: 13, artist: "Cheer-Accident", title: "Not a Food", year: 1996 },
  { catalogNumber: 14, artist: "The Flying Luttenbachers", title: "Gods of Chaos", year: 1996 },
  { catalogNumber: 15, artist: "U.S. Maple", title: "Sang Phat Editor", year: 1997 },
  { catalogNumber: 16, artist: "Mount Shasta", title: "Put the Creep On", year: 1997 },
  { catalogNumber: 17, artist: "Lake of Dracula", title: "Plays Polka", year: 1997 },
  { catalogNumber: 18, artist: "Scissor Girls", title: "Guilt Trip", year: 1997 },
  { catalogNumber: 19, artist: "Shorty", title: "Thumb Rocker", year: 1997 },
  { catalogNumber: 20, artist: "Bobby Conn", title: "Bobby Conn", year: 1997 },
  { catalogNumber: 21, artist: "Storm & Stress", title: "Storm & Stress", year: 1997 },
  { catalogNumber: 22, artist: "Colossamite", title: "All Lingo's Clamor", year: 1997 },
  { catalogNumber: 23, artist: "Various Artists", title: "Ear-Bleeding Country", year: 1997 },
  { catalogNumber: 24, artist: "Cheer-Accident", title: "Salad Days", year: 1998 },
  { catalogNumber: 25, artist: "U.S. Maple", title: "Talker", year: 1999 },
  { catalogNumber: 26, artist: "The Flying Luttenbachers", title: "Infection and Decline", year: 1999 },
  { catalogNumber: 27, artist: "Bobby Conn", title: "The Golden Age", year: 1999 },
  { catalogNumber: 28, artist: "Quintron", title: "These Hands of Mine", year: 1999 },
  { catalogNumber: 29, artist: "Zeni Geva", title: "10000 Light Years", year: 1999 },
  { catalogNumber: 30, artist: "The Flying Luttenbachers", title: "Retrospektiull", year: 2000 },
  { catalogNumber: 31, artist: "Bobby Conn", title: "Rise Up!", year: 2001 },
  { catalogNumber: 32, artist: "Ruins", title: "Burning Stone", year: 2001 },
  { catalogNumber: 33, artist: "Mount Shasta", title: "Who's the Hottie?", year: 2001 },
  { catalogNumber: 34, artist: "Melt-Banana", title: "Teeny Shiny", year: 2003 },
  { catalogNumber: 35, artist: "U.S. Maple", title: "Purple on Time", year: 2003 },
  { catalogNumber: 36, artist: "Upsilon Acrux", title: "Galapagos Momentum", year: 2004 },
  { catalogNumber: 37, artist: "The Psychic Paramount", title: "Gamelan Into the Mink Supernatural", year: 2005 },
  { catalogNumber: 38, artist: "Ahleuchatistas", title: "The Same and the Other", year: 2006 },
  { catalogNumber: 39, artist: "Lair of the Minotaur", title: "Carnage", year: 2004 },
  { catalogNumber: 40, artist: "Bobby Conn", title: "King for a Day", year: 2006 },
  { catalogNumber: 41, artist: "Upsilon Acrux", title: "Sun Square Dialect", year: 2007 },
  { catalogNumber: 42, artist: "Lair of the Minotaur", title: "The Ultimate Destroyer", year: 2006 },
  { catalogNumber: 43, artist: "Ahleuchatistas", title: "What You Will", year: 2008 },
  { catalogNumber: 44, artist: "Cheer-Accident", title: "Fear Draws Misfortune", year: 2009 },
  { catalogNumber: 45, artist: "The Psychic Paramount", title: "II", year: 2011 },
];

// Get all releases
export function getAllSgReleases(): SgRelease[] {
  return sgDiscography;
}

// Get releases by year
export function getSgReleasesByYear(year: number): SgRelease[] {
  return sgDiscography.filter((r) => r.year === year);
}

// Get release by catalog number
export function getSgReleaseByCatalogNumber(num: number): SgRelease | undefined {
  return sgDiscography.find((r) => r.catalogNumber === num);
}

// Get unique years
export function getSgReleaseYears(): number[] {
  return [...new Set(sgDiscography.map((r) => r.year))].sort((a, b) => a - b);
}

// Get unique artists
export function getSgArtists(): string[] {
  return [...new Set(sgDiscography.map((r) => r.artist))].sort();
}

// Get releases by artist
export function getSgReleasesByArtist(artist: string): SgRelease[] {
  return sgDiscography.filter((r) => r.artist.toLowerCase().includes(artist.toLowerCase()));
}
