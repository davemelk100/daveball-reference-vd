// Skin Graft Records Comics Data
// Source: https://skingraftrecords.com/comix.html

export interface SgComic {
  id: string;
  title: string;
  creator: string;
  year: number;
  description: string;
  sourceUrl: string;
  pages?: number;
}

export const sgComics: SgComic[] = [
  {
    id: "megomaniacal",
    title: "Megomaniacal: Christmas with the Superheroes",
    creator: "Mark Fischer",
    year: 2011,
    description: "Holiday-themed superhero story.",
    sourceUrl: "https://skingraftrecords.com/comix/megomaniacal.pdf",
  },
  {
    id: "hot-satan-serious-brown",
    title: "Hot Satan & Serious Brown (Sides Part Three)",
    creator: "Mark Fischer",
    year: 2008,
    description: "Excerpt, 4 pages plus covers.",
    sourceUrl: "https://skingraftrecords.com/comix/SIDES_11_14preview.pdf",
    pages: 4,
  },
  {
    id: "gumballhead-debut",
    title: "Gumballhead the Cat: Debut Episode",
    creator: "Rob Syers & Mark Fischer",
    year: 2005,
    description: "Chicago Reader serialized series debut.",
    sourceUrl: "https://skingraftrecords.com/comix/Ghead_ep01mini.pdf",
  },
  {
    id: "unsolved-histories",
    title: "Unsolved Histories",
    creator: "Rob Syers & Mark Fischer",
    year: 2005,
    description: "Excerpt from GR#75.",
    sourceUrl: "https://skingraftrecords.com/comix/hofruins_1.html",
  },
  {
    id: "gumballhead-jar",
    title: "Gumballhead in Head in a Jar",
    creator: "Rob Syers",
    year: 2004,
    description: "Single page from Roctober #39.",
    sourceUrl: "https://skingraftrecords.com/comix/gumballhead_jar.html",
    pages: 1,
  },
  {
    id: "swami-teen-mummy",
    title: "The Swami / Teen Mummy",
    creator: "Jeff Bentle",
    year: 2003,
    description: "Two strips for Giant-Size SKiN GRAFT.",
    sourceUrl: "https://skingraftrecords.com/comix/swami.html",
    pages: 2,
  },
  {
    id: "gumballhead-mystery-treasure",
    title: "Gumballhead in Mystery Treasure",
    creator: "Rob Syers",
    year: 2003,
    description: "Preview from GR#67.",
    sourceUrl: "https://skingraftrecords.com/comix/CA_GH.html",
  },
  {
    id: "karate-chimp-lodge",
    title: "Karate Chimp in Lodge Headquarters",
    creator: "Mark Fischer",
    year: 1998,
    description: "Three pages from GR#26.",
    sourceUrl: "https://skingraftrecords.com/comix/Lodge1.html",
    pages: 3,
  },
  {
    id: "mount-shasta-brush",
    title: "Mount Shasta in the Brush",
    creator: "Rob Syers",
    year: 1993,
    description: "Three pages from GR#05.",
    sourceUrl: "https://skingraftrecords.com/comix/brush_1.html",
    pages: 3,
  },
  {
    id: "arab-on-radar-psa",
    title: "Arab on Radar PSA",
    creator: "Mark Fischer",
    year: 2000,
    description: "Promotional comic for Soak the Saddle.",
    sourceUrl: "https://skingraftrecords.com/comix/aorcallcomic.html",
  },
  {
    id: "kooter-cooking",
    title: "Kooter Cooking",
    creator: "Mark Shippy",
    year: 1993,
    description: "Two pages from GR#07.",
    sourceUrl: "https://skingraftrecords.com/comix/kooterkookin1.html",
    pages: 2,
  },
  {
    id: "fruitcake-cook-comic",
    title: "Fruitcake Cook Comic",
    creator: "Mark Fischer",
    year: 1993,
    description: "Three pages from GR#04.",
    sourceUrl: "https://skingraftrecords.com/comix/fruitcomic1.html",
    pages: 3,
  },
  {
    id: "gumballhead-nine-life",
    title: "Gumballhead's Nine Life Deathwish",
    creator: "Rob Syers",
    year: 2000,
    description: "Four pages from Roctober #24.",
    sourceUrl: "https://skingraftrecords.com/comix/gumball9life_1.html",
    pages: 4,
  },
  {
    id: "commander-floyd-wrestling",
    title: "Commander Floyd Wrestling",
    creator: "Mark Fischer",
    year: 1991,
    description: "Twelve pages from SKiN GRAFT #1 vol. 2.",
    sourceUrl: "https://skingraftrecords.com/comix/floydwrestle1.html",
    pages: 12,
  },
  {
    id: "serious-brown-cynical-manson",
    title: "Serious Brown & Cynical Manson",
    creator: "Jeff Bentle",
    year: 1991,
    description: "Four pages from SKiN GRAFT #1 vol. 2.",
    sourceUrl: "https://skingraftrecords.com/comix/seriousandcm_1.html",
    pages: 4,
  },
  {
    id: "shorty-euro-log",
    title: "Shorty's Euro-Log",
    creator: "Mark Shippy",
    year: 1994,
    description: "One page from Newsletter.",
    sourceUrl: "https://skingraftrecords.com/comix/shortyeurolog_1.html",
    pages: 1,
  },
  {
    id: "kill-your-girlfriend",
    title: "Kill Your Girlfriend",
    creator: "Various Artists",
    year: 1988,
    description: "Eight pages.",
    sourceUrl: "https://skingraftrecords.com/comix/killyourgf_1.html",
    pages: 8,
  },
  {
    id: "dazzling-killmen-medicine-me",
    title: "Dazzling Killmen's Medicine Me",
    creator: "Mark Fischer",
    year: 1992,
    description: "Four pages from GR#03.",
    sourceUrl: "https://skingraftrecords.com/comix/medicineme1.html",
    pages: 4,
  },
  {
    id: "serious-brown-lost-shoe",
    title: "Serious Brown: Lost Shoe",
    creator: "Rob Syers",
    year: 1991,
    description: "Two pages from Kamikaze magazine.",
    sourceUrl: "https://skingraftrecords.com/comix/seriousshoe1.html",
    pages: 2,
  },
  {
    id: "induced-vomiting-chucks-lesson",
    title: "Induced Vomiting: Chuck's Lesson",
    creator: "Rob Syers & Mark Fischer",
    year: 1989,
    description: "One page from SKiN GRAFT #4.",
    sourceUrl: "https://skingraftrecords.com/comix/inducedchuck.html",
    pages: 1,
  },
];

export function getAllSgComics(): SgComic[] {
  return [...sgComics].sort((a, b) => b.year - a.year);
}

export function getSgComicById(id: string): SgComic | undefined {
  return sgComics.find((c) => c.id === id);
}

export function getSgComicsByCreator(creator: string): SgComic[] {
  const lower = creator.toLowerCase();
  return sgComics.filter((c) => c.creator.toLowerCase().includes(lower));
}

export const sgComicCharacters = [
  "Serious Brown",
  "Hot Satan",
  "Gumballhead the Cat",
  "Karate Chimp",
  "Commander Floyd",
  "The Crab Guys",
  "Kooter",
  "Cynical Manson",
  "Teen Mummy",
  "The Swami",
];
