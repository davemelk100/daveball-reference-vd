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

// Image URLs from Discogs
export const sgReleaseImages: Record<number, string> = {
  1: "https://i.discogs.com/9nCIqJIzFO8kzQjJp8jJ2b9Hn_1R8FKmFrBmSVG2O3E/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEwMjUx/ODUtMTQ5MjUyNTYz/Ni05Mzk2LmpwZWc.jpeg",
  2: "https://i.discogs.com/vwh1aHnT1JNDNlPdOzQEL1j6P5p0L5ROUWfkkkFXxDk/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEwNjg4/MTktMTUwMzE0Nzg1/Ni02NDUxLmpwZWc.jpeg",
  3: "https://i.discogs.com/8bJf1pjPvvNm8DRv8EYJZhNqC5UKQhE5eHKHEg-F5gY/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTc4NjE1/Ni0xMTYzODQ5MjA3/LmpwZWc.jpeg",
  4: "https://i.discogs.com/N0NlYmL8s0CX3dXswFB3iSZgTXHy9c_z8SJfyTdvT2Y/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEyMDU1/MTQtMTE5NDE5NTk5/MS5qcGVn.jpeg",
  5: "https://i.discogs.com/R0xWJXG0b6Fc8CvJTvVE3HgVP-PkNMi_8Uw_VK7N2lk/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTExNDI0/MjktMTIxNDY5NzMz/Mi5qcGVn.jpeg",
  6: "https://i.discogs.com/BtVYX8KQj3HvVkHxF0_r5XK2_PLFcS9bpNJ9VvzLT7k/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTk4MDEw/MC0xMTc5Nzc2ODI3/LmpwZWc.jpeg",
  7: "https://i.discogs.com/vLK0mEGkK7H5SZhFz8XqGKJTEiV8g-YDHZ6tJSHLYuc/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQxNTQ0/OC0xMTEyMTczNzE2/LmpwZWc.jpeg",
  8: "https://i.discogs.com/7N5kVXDBnLn-8Qw4gvQ6n9wQ-PmSSK2b-I0Bd0yYFQI/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE3NjAz/NDAtMTI0MzY0MDQz/MC5qcGVn.jpeg",
  9: "https://i.discogs.com/WDdW-x4eo-XrUyHi-5pUHHB5UdCJTd-A7-58Z6qKyeo/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE2Mjc3/ODUtMTIzNjU4NDIw/MC5qcGVn.jpeg",
  10: "https://i.discogs.com/JR8RJjr-_C4bwNWnqp53gVv18PUnTkqm5O-gBhq3LjU/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTcxNjA2/NC0xMTU4MTc3OTM5/LmpwZWc.jpeg",
  11: "https://i.discogs.com/3MZQfPQDPIVJq1nJpGwV4g1E0K1LGC0mPwGgY2-yUWU/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE0ODAz/MDYtMTIzMTE0NzE3/MC5qcGVn.jpeg",
  12: "https://i.discogs.com/Gmo8njMu0E7I4A7SNjOC4GbPNnHxX4y5bF1VIXFNvSk/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEwMDcw/NzAtMTUyOTQ2NzUy/NC0yMTYyLmpwZWc.jpeg",
  15: "https://i.discogs.com/xYBxLEhOBYmHhb3kQ3QJkMWdxHvJ-kFm77F8VSTjj5U/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTYxNDA5/Ni0xMTU2NjM2OTk2/LmpwZWc.jpeg",
  16: "https://i.discogs.com/vFnG0D6YGEfqzIRPPTlQ9WVQY3rJ4NdFmHThAK56i38/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTcyOTg4/OS0xNjYyMTQ4ODQ4/LTM2MDIuanBlZw.jpeg",
  20: "https://i.discogs.com/WMwbcVfJh-UvnYDXRdSLK0F_FxvQk3Q6pO-RKzb0e1g/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE3NTk2/NjYtMTI0MzU2NDE0/MS5qcGVn.jpeg",
  25: "https://i.discogs.com/j2B5pJG4gLCRG6k0wlK98R_YgN2pAqV00FhJt5Uup3A/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTc3MDAx/Ny0xMTY0MjI0NDg0/LmpwZWc.jpeg",
  30: "https://i.discogs.com/NtTpyEcxh4R3Q1BQqcLvbYeQkjQKfKdZ1l6tSwSk3UA/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIxOTg1/NjItMTQwNzYyMDQx/Ny0yMDY3LmpwZWc.jpeg",
  35: "https://i.discogs.com/sM5rUhqG2r4U3CgFq3e7Qi0m6zBewR-7D_DJP3jjxbs/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE2NDIx/MjItMTIzNTgyNzAy/MS5qcGVn.jpeg",
  40: "https://i.discogs.com/H-QhDHkZvvHd4jDjGF8JhYkwMOvXqo1E3UrV_YU-AYs/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEyMjc5/NTgtMTIxOTIzNjM0/MC5qcGVn.jpeg",
};

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
