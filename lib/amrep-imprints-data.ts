export interface AmrepImprint {
  name: string;
  description: string;
  highlights: string[];
  url?: string;
}

export const amrepImprints: AmrepImprint[] = [
  {
    name: "Amphetamine Reptile",
    description: "Core AmRep catalog and new releases.",
    highlights: ["Noise rock staples", "Limited vinyl runs", "Catalog reissues"],
    url: "https://www.shoxop.com/",
  },
  {
    name: "OX-OP",
    description: "Related imprint and collaborations highlighted on the AmRep shop.",
    highlights: ["Limited editions", "Collector sets", "Archive drops"],
    url: "https://www.shoxop.com/",
  },
  {
    name: "Archive Releases",
    description: "Out-of-print and archival items resurfacing through the shop.",
    highlights: ["Old Mold Friday Gold", "Garage finds", "Reissue specials"],
    url: "https://www.shoxop.com/",
  },
];
