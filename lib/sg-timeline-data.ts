// Skin Graft Records Timeline

export interface SgTimelineEvent {
  year: number;
  title: string;
  description: string;
}

export const sgTimeline: SgTimelineEvent[] = [
  {
    year: 1991,
    title: "Label Founded",
    description: "Mark Fischer founds Skin Graft Records in Chicago, releasing Dazzling Killmen's 'Coffin Fit' 7-inch as GR001.",
  },
  {
    year: 1992,
    title: "Early Releases",
    description: "Mount Shasta and more Dazzling Killmen releases establish the label's noise rock identity.",
  },
  {
    year: 1994,
    title: "Face of Collapse",
    description: "Dazzling Killmen release 'Face of Collapse', one of the defining noise rock records of the decade. The Flying Luttenbachers debut with 'Constructive Destruction'.",
  },
  {
    year: 1995,
    title: "U.S. Maple Debut",
    description: "U.S. Maple's 'Long Hair in Three Stages' introduces one of the most radical deconstructions of rock music. Yona-Kit and Mount Shasta add to a growing roster.",
  },
  {
    year: 1996,
    title: "Expanding the Roster",
    description: "Colossamite (featuring ex-Dazzling Killmen members) and Cheer-Accident join the label. Dazzling Killmen break up after a final tour.",
  },
  {
    year: 1997,
    title: "Ear-Bleeding Country",
    description: "The 'Ear-Bleeding Country' compilation showcases the label's diverse and uncompromising roster. Bobby Conn and Storm & Stress debut.",
  },
  {
    year: 1999,
    title: "International Reach",
    description: "Japanese bands Zeni Geva join the roster. U.S. Maple releases 'Talker'. Quintron's 'These Hands of Mine' brings garage-electronic energy.",
  },
  {
    year: 2001,
    title: "New Millennium",
    description: "Bobby Conn's 'Rise Up!' and Ruins' 'Burning Stone' continue the label's adventurous output.",
  },
  {
    year: 2003,
    title: "Japanese Connection",
    description: "Melt-Banana's 'Teeny Shiny' and U.S. Maple's final album 'Purple on Time' are released.",
  },
  {
    year: 2004,
    title: "Heavy Additions",
    description: "Lair of the Minotaur brings sludge metal to the roster. Upsilon Acrux debuts with 'Galapagos Momentum'.",
  },
  {
    year: 2005,
    title: "Psychic Paramount",
    description: "The Psychic Paramount's 'Gamelan Into the Mink Supernatural' adds krautrock-influenced intensity.",
  },
  {
    year: 2006,
    title: "Continued Growth",
    description: "Ahleuchatistas and more Lair of the Minotaur releases expand the label's sonic range.",
  },
  {
    year: 2009,
    title: "Avant-Prog",
    description: "Cheer-Accident's 'Fear Draws Misfortune' showcases the label's avant-prog side.",
  },
  {
    year: 2011,
    title: "Psychic Paramount II",
    description: "The Psychic Paramount returns with 'II', a powerful statement of noise rock hypnosis.",
  },
  {
    year: 2020,
    title: "Legacy Continues",
    description: "Skin Graft Records continues as one of the most respected independent labels for experimental and noise music, with reissues and new releases.",
  },
];

export function getAllSgTimelineEvents(): SgTimelineEvent[] {
  return sgTimeline;
}
