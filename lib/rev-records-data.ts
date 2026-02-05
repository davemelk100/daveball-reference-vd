export interface RevRecordOfDay {
  artist: string;
  title: string;
  year: number;
  highlight: string;
  coverUrl?: string;
}

export const revRecordsOfTheDay: RevRecordOfDay[] = [
  {
    artist: "Warzone",
    title: "Don't Forget the Struggle Don't Forget the Streets",
    year: 1987,
    highlight: "The very first Revelation Records release (REV 001).",
  },
  {
    artist: "Youth of Today",
    title: "Can't Close My Eyes",
    year: 1985,
    highlight: "Raw, blazing straight edge anthem from the youth crew originators.",
  },
  {
    artist: "Youth of Today",
    title: "Break Down the Walls",
    year: 1987,
    highlight: "A cornerstone of New York straight edge hardcore.",
  },
  {
    artist: "Gorilla Biscuits",
    title: "Start Today",
    year: 1989,
    highlight: "One of the most beloved hardcore albums of all time.",
  },
  {
    artist: "Judge",
    title: "Bringin' It Down",
    year: 1989,
    highlight: "Heavy, uncompromising straight edge hardcore at its peak.",
  },
  {
    artist: "Bold",
    title: "Speak Out",
    year: 1988,
    highlight: "An essential straight edge EP that defined the youth crew sound.",
  },
  {
    artist: "Side By Side",
    title: "You're Only Young Once",
    year: 1988,
    highlight: "A fierce 7-inch from one of NYHC's short-lived but influential bands.",
  },
  {
    artist: "Chain of Strength",
    title: "The One Thing That Still Holds True",
    year: 1989,
    highlight: "Orange County straight edge with razor-sharp intensity.",
  },
  {
    artist: "Shelter",
    title: "Perfection of Desire",
    year: 1990,
    highlight: "Ray Cappo's post-Youth of Today project fusing hardcore with Krishna consciousness.",
  },
  {
    artist: "Into Another",
    title: "Into Another",
    year: 1991,
    highlight: "Former NYHC members pushing into melodic, progressive territory.",
  },
  {
    artist: "Quicksand",
    title: "Quicksand (7\")",
    year: 1990,
    highlight: "Walter Schreifels' post-hardcore debut, bridging NYHC and alternative rock.",
  },
  {
    artist: "Texas Is the Reason",
    title: "Do You Know Who You Are?",
    year: 1996,
    highlight: "A landmark emo/post-hardcore album, beloved for its melodic depth.",
  },
  {
    artist: "Sense Field",
    title: "Building",
    year: 1996,
    highlight: "Revelation's expansion into melodic emo and alternative rock.",
  },
  {
    artist: "Iceburn",
    title: "Hephaestus",
    year: 1993,
    highlight: "Progressive, jazz-influenced hardcore from Salt Lake City.",
  },
  {
    artist: "Farside",
    title: "Rochambeau",
    year: 1992,
    highlight: "Orange County melodic hardcore with pop sensibilities.",
  },
  {
    artist: "Supertouch",
    title: "The Earth Is Flat",
    year: 1990,
    highlight: "Underrated NYHC crossover with groove and power.",
  },
  {
    artist: "Burn",
    title: "Burn (7\")",
    year: 1990,
    highlight: "Chaka Malik's fierce vocals over crunching NYHC riffs.",
  },
  {
    artist: "Youth of Today",
    title: "We're Not in This Alone",
    year: 1988,
    highlight: "Youth of Today's most spiritually searching and musically evolved record.",
  },
  {
    artist: "Judge",
    title: "New York Crew (7\")",
    year: 1988,
    highlight: "A short, brutal declaration of NYHC pride.",
  },
  {
    artist: "Bold",
    title: "Looking Back",
    year: 1989,
    highlight: "Bold's full-length captures the urgency of late-'80s straight edge.",
  },
  {
    artist: "Gorilla Biscuits",
    title: "Gorilla Biscuits (7\")",
    year: 1988,
    highlight: "The debut EP that launched one of hardcore's most iconic bands.",
  },
  {
    artist: "Mouthpiece",
    title: "Can't Kill What's Inside",
    year: 1995,
    highlight: "New Jersey straight edge keeping the youth crew flame alive in the '90s.",
  },
  {
    artist: "Ressurection",
    title: "Ressurection (7\")",
    year: 1991,
    highlight: "Short-lived but impactful, bridging NYHC and emotional hardcore.",
  },
  {
    artist: "Battery",
    title: "Until the End",
    year: 1996,
    highlight: "D.C. straight edge with relentless energy and conviction.",
  },
];

export function getDailyRevRecord(date?: Date): RevRecordOfDay {
  const now = date || new Date();
  const utc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const epochDay = Math.floor(utc / 86400000);
  const index = epochDay % revRecordsOfTheDay.length;
  return revRecordsOfTheDay[index];
}
