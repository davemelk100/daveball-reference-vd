export interface AmrepSourceDoc {
  id: string;
  title: string;
  text: string;
  sourceLabel: string;
  sourceUrl?: string;
}

const sourceDocs: AmrepSourceDoc[] = [
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
      "Helmet’s debut album 'Strap It On' was released by AmRep and helped support the label in the 1990s.",
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
