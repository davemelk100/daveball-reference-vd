export interface AmrepRecordOfDay {
  title: string;
  artist: string;
  year: number;
  highlight: string;
  coverUrl?: string;
}

export const amrepRecordsOfTheDay: AmrepRecordOfDay[] = [
  {
    title: "Strap It On",
    artist: "Helmet",
    year: 1990,
    highlight: "A defining AmRep release that helped sustain the label.",
  },
  {
    title: "AmRep Motors 1995 Models",
    artist: "Various Artists",
    year: 1995,
    highlight: "A snapshot of the label’s mid‑90s roster.",
  },
  {
    title: "AmRep Equipped 96/97",
    artist: "Various Artists",
    year: 1997,
    highlight: "Compilation capturing the label’s noise rock ecosystem.",
    coverUrl:
      "/api/gbv/image-proxy?url=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F71SDTWoyKJL._UF1000%2C1000_QL80_.jpg",
  },
  {
    title: "Days of Nothing",
    artist: "Chokebore",
    year: 1994,
    highlight: "Moody, slow‑burning rock from the AmRep catalog.",
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
