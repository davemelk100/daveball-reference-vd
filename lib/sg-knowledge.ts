import { sgArtists } from "@/lib/sg-artists-data";
import { sgDiscography } from "@/lib/sg-discography-data";
import { sgSubLabels } from "@/lib/sg-sublabels-data";
import { sgTriviaQuestions } from "@/lib/sg-trivia-data";
import { sgTimeline } from "@/lib/sg-timeline-data";

export interface SgSourceDoc {
  id: string;
  title: string;
  text: string;
  sourceLabel: string;
  sourceUrl?: string;
}

const hardcodedDocs: SgSourceDoc[] = [
  {
    id: "sg-overview",
    title: "Skin Graft Records",
    text:
      "Skin Graft Records is an independent record label founded by Mark Fischer in 1991 in Chicago, Illinois. Known for releasing experimental, noise rock, and avant-garde music, Skin Graft has championed some of the most daring and uncompromising artists in underground music, including The Flying Luttenbachers, U.S. Maple, Dazzling Killmen, Mount Shasta, and Cheer-Accident.",
    sourceLabel: "Wikipedia",
    sourceUrl: "https://en.wikipedia.org/wiki/Skin_Graft_Records",
  },
  {
    id: "sg-ear-bleeding",
    title: "Ear-Bleeding Country",
    text:
      "Ear-Bleeding Country is a compilation album released by Skin Graft Records in 1997, showcasing the label's diverse and uncompromising roster of noise rock and experimental artists.",
    sourceLabel: "Discogs",
  },
  {
    id: "sg-catalog-prefix",
    title: "Skin Graft Catalog Numbers",
    text:
      "Skin Graft Records uses the 'GR' prefix for its catalog numbers, starting with GR001 (Dazzling Killmen's 'Coffin Fit' 7-inch) in 1991.",
    sourceLabel: "Skin Graft Records",
  },
];

const artistDocs: SgSourceDoc[] = sgArtists.map((a) => ({
  id: `artist-${a.id}`,
  title: a.name,
  text: `Skin Graft artist: ${a.name}. Genre: ${a.genre || "Experimental"}. Active: ${a.yearsActive || "Unknown"}.`,
  sourceLabel: "SG roster",
  sourceUrl: a.wikipediaUrl,
}));

const releaseDocs: SgSourceDoc[] = sgDiscography.map((r) => ({
  id: `release-${r.catalogNumber}`,
  title: `${r.artist} – ${r.title}`,
  text: `Release: ${r.artist} – ${r.title} (${r.year}). Catalog: GR ${String(r.catalogNumber).padStart(3, "0")}. ${r.format ? `Format: ${r.format}.` : ""}`,
  sourceLabel: "SG discography",
}));

const sublabelDocs: SgSourceDoc[] = sgSubLabels.map((s) => ({
  id: `sublabel-${s.name}`,
  title: s.name,
  text: `Imprint: ${s.name}. ${s.description} Highlights: ${s.highlights.join(", ")}.`,
  sourceLabel: "SG imprints",
  sourceUrl: s.url,
}));

const triviaDocs: SgSourceDoc[] = sgTriviaQuestions.map((q) => ({
  id: `trivia-${q.id}`,
  title: `SG Trivia: ${q.category}`,
  text: `Q: ${q.question} A: ${q.options[q.correctAnswer]}. ${q.explanation}`,
  sourceLabel: "SG trivia",
}));

const timelineDocs: SgSourceDoc[] = sgTimeline.map((t) => ({
  id: `timeline-${t.year}`,
  title: `${t.year}: ${t.title}`,
  text: `${t.year} — ${t.title}. ${t.description}`,
  sourceLabel: "SG timeline",
}));

const sourceDocs: SgSourceDoc[] = [
  ...hardcodedDocs,
  ...artistDocs,
  ...releaseDocs,
  ...sublabelDocs,
  ...triviaDocs,
  ...timelineDocs,
];

export function getSgSourceDocs(): SgSourceDoc[] {
  return sourceDocs;
}

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2);
}

export function searchSgSources(query: string, limit = 6): SgSourceDoc[] {
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
