export interface AmrepRecordOfDay {
  title: string;
  artist: string;
  year: number;
  highlight: string;
  coverUrl?: string;
}

export const amrepRecordsOfTheDay: AmrepRecordOfDay[] = [
  // Albums
  {
    title: "Strap It On",
    artist: "Helmet",
    year: 1990,
    highlight: "A defining AmRep release that helped sustain the label.",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/4/4a/Helmet_-_Strap_It_On.jpg",
  },
  {
    title: "AmRep Motors (1995 Models)",
    artist: "Various artists",
    year: 1995,
    highlight: "A snapshot of the label's mid‑90s roster.",
  },
  {
    title: "AmRep Equipped 96/97",
    artist: "Various Artists",
    year: 1997,
    highlight: "Compilation capturing the label's noise rock ecosystem.",
    coverUrl:
      "/api/gbv/image-proxy?url=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F71SDTWoyKJL._UF1000%2C1000_QL80_.jpg",
  },
  {
    title: "Motionless",
    artist: "Chokebore",
    year: 1993,
    highlight: "Chokebore's moody debut on AmRep.",
  },
  {
    title: "Palomino Pizza",
    artist: "Cosmic Psychos",
    year: 1993,
    highlight: "Rowdy, bruising punk rock energy.",
  },
  {
    title: "You're Feeling So Attractive",
    artist: "Calvin Krime",
    year: 1998,
    highlight: "A fuzzed‑out slice of late‑90s AmRep noise rock.",
  },
  {
    title: "Peacetika",
    artist: "Cows",
    year: 1991,
    highlight: "Noise rock at its unhinged finest.",
  },
  {
    title: "Ethereal Killer",
    artist: "Hammerhead",
    year: 1992,
    highlight: "Hammerhead's crushing AmRep debut.",
  },
  {
    title: "Scattered, Smothered & Covered",
    artist: "Unsane",
    year: 1995,
    highlight: "Brutal noise rock from NYC's finest.",
  },
  {
    title: "Ventriloquist",
    artist: "Vertigo",
    year: 1992,
    highlight: "Dark, driving noise rock from Minneapolis.",
  },
  {
    title: "Meantime",
    artist: "Helmet",
    year: 1992,
    highlight: "A genre-defining post-hardcore classic.",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/a/a6/Helmet_-_Meantime.jpg",
  },
  {
    title: "Into the Vortex",
    artist: "Hammerhead",
    year: 1994,
    highlight: "Hammerhead at their most ferocious.",
  },
  {
    title: "Orphan's Tragedy",
    artist: "Cows",
    year: 1994,
    highlight: "Peak Cows weirdness and aggression.",
  },
  // Singles
  {
    title: "Rubber Room",
    artist: "Halo of Flies",
    year: 1986,
    highlight: "The very first AmRep single — Scale 2.",
  },
  {
    title: "Snapping Black Roscoe Bottles",
    artist: "Halo of Flies",
    year: 1986,
    highlight: "Early Halo of Flies on AmRep's Scale imprint.",
  },
  {
    title: "Felch",
    artist: "The Thrown Ups",
    year: 1987,
    highlight: "Raw, unhinged early AmRep chaos.",
  },
  {
    title: "No Time",
    artist: "Halo of Flies",
    year: 1988,
    highlight: "Halo of Flies delivering their signature noise.",
  },
  {
    title: "Dope-Guns-'N-Fucking in the Streets Volume One",
    artist: "Various artists",
    year: 1988,
    highlight: "The legendary AmRep compilation series begins.",
  },
  {
    title: "\"Unsung\"",
    artist: "Helmet",
    year: 1991,
    highlight: "One of the most iconic AmRep singles ever pressed.",
  },
  {
    title: "\"U.V.\"/\"Peep\"",
    artist: "Hammerhead",
    year: 1991,
    highlight: "Hammerhead's crushing debut 7\".",
  },
  {
    title: "\"Load King\"",
    artist: "Hammerhead",
    year: 1992,
    highlight: "Minneapolis noise rock at full throttle.",
  },
  {
    title: "Death of a Fly",
    artist: "Halo of Flies",
    year: 1989,
    highlight: "Tom Hazelmyer's own band pushing boundaries.",
  },
  {
    title: "\"Bullethead\"/\"KCL\"",
    artist: "Janitor Joe",
    year: 1992,
    highlight: "Janitor Joe's ferocious AmRep debut.",
  },
  {
    title: "Mod Showdown!",
    artist: "Mudhoney Versus Halo of Flies",
    year: 1991,
    highlight: "A dream matchup of noise rock heavyweights.",
  },
  {
    title: "\"Euthanasia\"/\"Ambition\"",
    artist: "Melvins",
    year: 2016,
    highlight: "Modern-era Melvins on AmRep wax.",
  },
  {
    title: "\"Fix It\"/\"Wrung\"",
    artist: "Unsane",
    year: 2017,
    highlight: "Unsane's relentless return to AmRep.",
  },
  {
    title: "Stuck",
    artist: "Helmet",
    year: 2015,
    highlight: "Helmet reunited on AmRep for a new 7\".",
  },
  {
    title: "\"Slap Back\"",
    artist: "Cows",
    year: 1990,
    highlight: "Cows at their most deranged on wax.",
  },
  {
    title: "Fear and Pain",
    artist: "God Bullies",
    year: 1988,
    highlight: "Early AmRep fury from the God Bullies.",
  },
];

export function getDailyAmrepRecord(date = new Date()): AmrepRecordOfDay {
  const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash | 0;
  }

  const index = Math.abs(hash) % amrepRecordsOfTheDay.length;
  return amrepRecordsOfTheDay[index];
}
