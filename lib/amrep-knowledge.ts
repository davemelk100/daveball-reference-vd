import { amrepArtists } from "@/lib/amrep-artists-data";
import { amrepReleases } from "@/lib/amrep-releases-data";
import { amrepImprints } from "@/lib/amrep-imprints-data";
import { amrepTriviaQuestions } from "@/lib/amrep-trivia-data";
import { amrepTimeline } from "@/lib/amrep-timeline-data";

export interface AmrepSourceDoc {
  id: string;
  title: string;
  text: string;
  sourceLabel: string;
  sourceUrl?: string;
}

const hardcodedDocs: AmrepSourceDoc[] = [
  {
    id: "amrep-overview",
    title: "Amphetamine Reptile Records",
    text:
      "Independent American record label founded in 1986 by Tom Hazelmyer. The label specializes in noise rock and is known for releases by a wide roster of underground artists.",
    sourceLabel: "Wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Amphetamine_Reptile_Records",
  },
  {
    id: "amrep-strap-it-on",
    title: "Helmet – Strap It On",
    text:
      "Helmet's debut album 'Strap It On' was released by AmRep and helped support the label in the 1990s.",
    sourceLabel: "Wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Amphetamine_Reptile_Records",
  },
  {
    id: "amrep-shop",
    title: "AmRep shop",
    text:
      "The official shop (Shoxop) lists current releases, reissues, and catalog items for Amphetamine Reptile and OX-OP.",
    sourceLabel: "Shoxop",
    sourceUrl: "https://www.shoxop.com/",
  },
  {
    id: "amrep-facebook",
    title: "Amphetamine Reptile Records on Facebook",
    text:
      "Official social updates and announcements from Amphetamine Reptile Records.",
    sourceLabel: "Facebook",
    sourceUrl: "https://www.facebook.com/amphetaminereptile/",
  },
];

const artistDocs: AmrepSourceDoc[] = amrepArtists.map((a) => ({
  id: `artist-${a.id}`,
  title: a.name,
  text: `AmRep artist: ${a.name}. ${a.description || ""}`,
  sourceLabel: "AmRep roster",
}));

const releaseDocs: AmrepSourceDoc[] = amrepReleases.map((r) => ({
  id: `release-${r.id}`,
  title: `${r.artist} – ${r.title}`,
  text: `Release: ${r.artist} – ${r.title}${r.year ? ` (${r.year})` : ""}. ${r.catalogNo ? `Catalog: ${r.catalogNo}.` : ""} ${r.format ? `Format: ${r.format}.` : ""} ${r.highlight || ""}`,
  sourceLabel: "AmRep discography",
}));

const imprintDocs: AmrepSourceDoc[] = amrepImprints.map((imp) => ({
  id: `imprint-${imp.name}`,
  title: imp.name,
  text: `Imprint: ${imp.name}. ${imp.description} Highlights: ${imp.highlights.join(", ")}.`,
  sourceLabel: "AmRep imprints",
  sourceUrl: imp.url,
}));

const triviaDocs: AmrepSourceDoc[] = amrepTriviaQuestions.map((q) => ({
  id: `trivia-${q.id}`,
  title: `AmRep Trivia: ${q.category}`,
  text: `Q: ${q.question} A: ${q.options[q.correctAnswer]}. ${q.explanation}`,
  sourceLabel: "AmRep trivia",
}));

const timelineDocs: AmrepSourceDoc[] = amrepTimeline.map((t) => ({
  id: `timeline-${t.year}`,
  title: `${t.year}: ${t.title}`,
  text: `${t.year} — ${t.title}. ${t.description}`,
  sourceLabel: "AmRep timeline",
}));

let scrapedDocs: AmrepSourceDoc[] = [];
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const scraped = require("@/data/amrep-knowledge-scraped.json") as AmrepSourceDoc[];
  scrapedDocs = scraped;
} catch {
  // scraped data not yet generated — skip
}

const sourceDocs: AmrepSourceDoc[] = [
  ...hardcodedDocs,
  ...artistDocs,
  ...releaseDocs,
  ...imprintDocs,
  ...triviaDocs,
  ...timelineDocs,
  ...scrapedDocs,
];

export function getAmrepSourceDocs(): AmrepSourceDoc[] {
  return sourceDocs;
}

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2);
}

export function searchAmrepSources(query: string, limit = 6): AmrepSourceDoc[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const scored = sourceDocs
    .map((doc) => {
      const haystack = `${doc.title} ${doc.text}`.toLowerCase();
      const score = tokens.reduce(
        (total, token) => total + (haystack.includes(token) ? 1 : 0),
        0
      );
      return { doc, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.doc);

  return scored;
}
