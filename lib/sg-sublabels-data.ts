// Skin Graft Records Sub-Labels and Related Imprints

export interface SgSubLabel {
  name: string;
  description: string;
  years?: string;
  highlights: string[];
  url?: string;
}

export const sgSubLabels: SgSubLabel[] = [
  {
    name: "Skin Graft Records (Main)",
    description:
      "The primary imprint, founded in 1991 by Mark Fischer in Chicago. Focuses on experimental, noise rock, avant-garde, and math rock.",
    years: "1991-present",
    highlights: [
      "Dazzling Killmen – Face of Collapse",
      "U.S. Maple – Long Hair in Three Stages",
      "The Flying Luttenbachers – Constructive Destruction",
      "Ear-Bleeding Country compilation",
    ],
  },
  {
    name: "Gasoline Boost",
    description:
      "A sub-label associated with Skin Graft focusing on international releases and special projects.",
    highlights: [
      "Japanese artist releases",
      "International distribution partnerships",
      "Special edition pressings",
    ],
  },
  {
    name: "Related: Touch and Go Records",
    description:
      "Chicago-based independent label that shared distribution channels and scene connections with Skin Graft. Many artists overlapped between the two labels.",
    years: "1981-2009",
    highlights: [
      "Distribution partner",
      "Shared Chicago scene",
      "Big Black, Shellac, Jesus Lizard",
    ],
    url: "https://www.touchandgorecords.com/",
  },
  {
    name: "Related: Drag City",
    description:
      "Another Chicago-based independent label with strong connections to the experimental music community that Skin Graft served.",
    years: "1990-present",
    highlights: [
      "Shared experimental music community",
      "Jim O'Rourke connections",
      "Royal Trux, Gastr del Sol",
    ],
    url: "https://www.dragcity.com/",
  },
];

export function getAllSgSubLabels(): SgSubLabel[] {
  return sgSubLabels;
}
