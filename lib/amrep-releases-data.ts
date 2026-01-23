export interface AmrepRelease {
  id: number;
  title: string;
  artist: string;
  year: number;
  format: string;
  highlight?: string;
}

export const amrepReleases: AmrepRelease[] = [
  {
    id: 1,
    title: "Strap It On",
    artist: "Helmet",
    year: 1990,
    format: "LP",
    highlight: "AmRep’s breakout release, later cited as vital to the label’s growth.",
  },
  {
    id: 2,
    title: "AmRep Motors 1995 Models",
    artist: "Various Artists",
    year: 1995,
    format: "Compilation",
  },
  {
    id: 3,
    title: "AmRep Equipped 96/97",
    artist: "Various Artists",
    year: 1997,
    format: "Compilation",
  },
  {
    id: 4,
    title: "Clusterfuck '94",
    artist: "Various Artists",
    year: 1994,
    format: "Compilation",
  },
  {
    id: 5,
    title: "Palomino Pizza",
    artist: "Cosmic Psychos",
    year: 1993,
    format: "LP",
  },
  {
    id: 6,
    title: "Self Totalled",
    artist: "Cosmic Psychos",
    year: 1995,
    format: "LP",
  },
  {
    id: 7,
    title: "Days of Nothing",
    artist: "Chokebore",
    year: 1994,
    format: "LP",
  },
  {
    id: 8,
    title: "It Could Ruin Your Day",
    artist: "Chokebore",
    year: 1996,
    format: "LP",
  },
  {
    id: 9,
    title: "You're Feeling So Attractive",
    artist: "Calvin Krime",
    year: 1998,
    format: "LP",
  },
];

export function getAmrepReleaseById(id: number): AmrepRelease | undefined {
  return amrepReleases.find((release) => release.id === id);
}
