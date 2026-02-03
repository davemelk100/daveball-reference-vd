import fs from "node:fs/promises";
import path from "node:path";

const USER_AGENT = "MajorLeagueNumbers/1.0 (knowledge-ingestion)";
const DISCOGS_BASE_URL = "https://api.discogs.com";
const MAX_RETRIES = 5;
const RELEASE_DELAY_MS = 1200;
const OUTPUT_DIR = path.join(process.cwd(), "data");

// ── Custom URLs ─────────────────────────────────────────────────────
// Add any URLs here and they'll be fetched, stripped to plain text,
// and added to the knowledge base for that site's chat AI.

const CUSTOM_URLS = {
  gbv: [
    {
      url: "https://www.pastemagazine.com/music/guided-by-voices/guided-by-voices-40th-anniversary-interview",
      label:
        "Paste Magazine — I Love You, I Must Confess: 40 Years of Guided By Voices",
    },
    {
      url: "https://magnetmagazine.com/2025/12/19/best-of-2025-a-conversation-with-robert-pollard-guided-by-voices/",
      label:
        "Magnet Magazine — Best Of 2025: A Conversation With Robert Pollard",
    },
    {
      url: "https://atwoodmagazine.com/dgbv-doug-gillard-interview-guided-by-voices-2022/",
      label: "Atwood Magazine — Interview: Catching Up with Doug Gillard",
    },
    {
      url: "https://magnetmagazine.com/2017/04/10/exclusive-cover-story-excerpt-guided-by-voices-interviewed-by-mike-watt/",
      label: "Magnet Magazine — Guided By Voices Interviewed By Mike Watt",
    },
    {
      url: "https://www.popmatters.com/guided-by-voices-robert-pollard-26",
      label: "PopMatters — A Conversation with Robert Pollard",
    },
    {
      url: "https://tapeop.com/interviews/6/guided-voices",
      label: "Tape Op — Guided By Voices: a chat with Robert Pollard",
    },
    {
      url: "https://www.thetapesarchive.com/robert-pollard/",
      label: "The Tapes Archive — Robert Pollard 1995 Interview",
    },
    {
      url: "https://www.fearandloathingfanzine.com/guided-by-voices.html",
      label: "Fear & Loathing Fanzine — Guided By Voices",
    },
    {
      url: "https://blog.discmakers.com/2018/06/the-glorious-inspirational-mess-that-is-guided-by-voices/",
      label:
        "Disc Makers Blog — The glorious, inspirational mess that is Guided By Voices",
    },
    {
      url: "https://www.popmatters.com/guided-by-voices-bee-thousand-atr30",
      label:
        "PopMatters — Bee Here Now: Guided By Voices and 1994's Bee Thousand",
    },
    {
      url: "https://www.gbvdb.com/album.asp?albumid=2191",
      label: "GBVDB — Guided By Voices: A Brief History",
    },
    {
      url: "https://www.tellallyourfriendspr.com/artists/guided-by-voices",
      label:
        "Tell-All-Your-Friends PR — Guided By Voices biography & influence summary",
    },
    {
      url: "https://grammy.com/news/guided-by-voices-robert-pollard-album-guide-current-lineup-songbook",
      label: "Grammy.com — Guided By Voices album guide and legacy",
    },
    {
      url: "https://uproxx.com/indie/a-beginners-guide-to-guided-by-voices/",
      label: "Uproxx — A Beginner's Guide To Guided By Voices",
    },
    {
      url: "https://faroutmagazine.co.uk/defining-point-history-of-guided-by-voices/",
      label:
        "Far Out Magazine — The defining point in the history of Guided by Voices",
    },
    {
      url: "https://www.lonelyghostrecords.com/media/community-reviews/a-guided-guide-to-guided-by-voice-part-1",
      label:
        "Lonely Ghost Records — A Guided Guide to Guided By Voices (Part 1)",
    },
    {
      url: "https://strangecurrenciesmusic.com/the-gbv-project-week-35-august-by-cake/",
      label: "Trevor Zaple — The GBV Project — Week 35: August by Cake",
    },
  ],
  amrep: [
    // { url: "https://example.com/article", label: "Source name" },
  ],
  mlb: [
    // { url: "https://example.com/article", label: "Source name" },
  ],
};

// ── Helpers ──────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

// ── Custom URL fetching ─────────────────────────────────────────────

async function ingestCustomUrls(entries) {
  const docs = [];
  for (const { url, label } of entries) {
    try {
      console.log(`  Custom URL: ${url}`);
      const res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
      if (!res.ok) {
        console.warn(`    Failed (${res.status}), skipping`);
        continue;
      }
      const html = await res.text();
      const text = stripHtml(html);
      if (text.length < 50) {
        console.warn(`    Too short after stripping, skipping`);
        continue;
      }
      // Split into ~1500 char chunks
      const chunks = [];
      let remaining = text;
      while (remaining.length > 0) {
        chunks.push(remaining.slice(0, 1500));
        remaining = remaining.slice(1500);
      }
      const slug = url.replace(/[^a-z0-9]+/gi, "-").slice(0, 60);
      chunks.forEach((chunk, i) => {
        docs.push({
          id: chunks.length === 1 ? `custom-${slug}` : `custom-${slug}-${i}`,
          title: chunks.length === 1 ? label : `${label} (part ${i + 1})`,
          text: chunk,
          sourceLabel: label,
          sourceUrl: url,
        });
      });
      await sleep(500);
    } catch (err) {
      console.warn(`    Error fetching ${url}:`, err.message);
    }
  }
  return docs;
}

// ── Wikipedia fetching ──────────────────────────────────────────────

async function fetchWikiSummary(title) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  const res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) {
    console.warn(
      `Wikipedia summary fetch failed for "${title}": ${res.status}`,
    );
    return null;
  }
  return res.json();
}

async function fetchWikiParsedSections(title) {
  const url = `https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(title)}&prop=sections|text&format=json&disabletoc=1`;
  const res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) {
    console.warn(`Wikipedia parse fetch failed for "${title}": ${res.status}`);
    return null;
  }
  const data = await res.json();
  if (!data?.parse) return null;
  return data.parse;
}

function stripHtml(html) {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/\.mw-parser-output[^{}]*\{[^}]*\}/g, "")
    .replace(/@media[^{]*\{[^}]*(\{[^}]*\})*[^}]*\}/g, "")
    .replace(/<sup[^>]*class="reference"[^>]*>[\s\S]*?<\/sup>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&#\d+;/g, "")
    .replace(/&[a-z]+;/g, " ")
    .replace(/\[edit\]/g, "")
    .replace(/\[\d+\]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractSectionTexts(html, sections) {
  // Split full HTML by h2/h3 section headings and map to section names
  const results = [];
  // Split on h2 tags to get top-level sections
  const h2Parts = html.split(/<h2[^>]*>/);

  for (let i = 1; i < h2Parts.length; i++) {
    const part = h2Parts[i];
    // Extract heading text
    const headingMatch = part.match(/^(.*?)<\/h2>/s);
    if (!headingMatch) continue;
    const heading = stripHtml(headingMatch[1]);
    const body = part.slice(headingMatch[0].length);
    const text = stripHtml(body);
    if (text.length >= 50) {
      results.push({ heading, text });
    }
  }

  return results;
}

async function ingestWikipediaArticle(title, sourceLabel) {
  const docs = [];
  const wikiUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;

  // Fetch summary via REST API
  const summary = await fetchWikiSummary(title);
  if (summary?.extract) {
    docs.push({
      id: `wiki-summary-${title}`,
      title: summary.title || title,
      text: summary.extract,
      sourceLabel,
      sourceUrl: wikiUrl,
    });
  }

  // Fetch full parsed HTML via MediaWiki API
  const parsed = await fetchWikiParsedSections(title);
  if (parsed?.text?.["*"]) {
    const sectionTexts = extractSectionTexts(
      parsed.text["*"],
      parsed.sections || [],
    );
    for (const { heading, text } of sectionTexts) {
      if (text.length > 3000) {
        const chunks = [];
        let remaining = text;
        while (remaining.length > 0) {
          chunks.push(remaining.slice(0, 1500));
          remaining = remaining.slice(1500);
        }
        chunks.forEach((chunk, i) => {
          docs.push({
            id: `wiki-${title}-${heading}-${i}`,
            title: `${summary?.title || title}: ${heading} (part ${i + 1})`,
            text: chunk,
            sourceLabel,
            sourceUrl: wikiUrl,
          });
        });
      } else {
        docs.push({
          id: `wiki-${title}-${heading}`,
          title: `${summary?.title || title}: ${heading}`,
          text,
          sourceLabel,
          sourceUrl: wikiUrl,
        });
      }
    }
  }

  return docs;
}

// ── Discogs fetching ────────────────────────────────────────────────

async function fetchDiscogs(endpoint) {
  const token = process.env.DISCOGS_USER_TOKEN || process.env.DISCOGS_TOKEN;
  if (!token) {
    console.warn("Discogs token missing — skipping Discogs ingestion.");
    return null;
  }
  for (let attempt = 0; attempt < MAX_RETRIES; attempt += 1) {
    const res = await fetch(`${DISCOGS_BASE_URL}${endpoint}`, {
      headers: {
        "User-Agent": USER_AGENT,
        Authorization: `Discogs token=${token}`,
      },
    });
    if (res.status === 429 && attempt < MAX_RETRIES - 1) {
      const retryAfter = Number(res.headers.get("retry-after") || "0");
      await sleep((retryAfter || 2 + attempt) * 1000);
      continue;
    }
    if (!res.ok) {
      console.warn(`Discogs error: ${res.status} for ${endpoint}`);
      return null;
    }
    return res.json();
  }
  console.warn(`Discogs retries exhausted for ${endpoint}`);
  return null;
}

async function ingestDiscogsArtist(artistId, artistName, sourceLabel) {
  const docs = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const data = await fetchDiscogs(
      `/artists/${artistId}/releases?page=${page}&per_page=100&sort=year&sort_order=asc`,
    );
    if (!data?.releases) break;
    if (data.pagination) totalPages = data.pagination.pages;

    for (const release of data.releases) {
      if (release.role !== "Main") continue;
      const year = release.year || "unknown year";
      const title = release.title || "Untitled";
      const label = release.label || "";
      docs.push({
        id: `discogs-${artistId}-${release.id}`,
        title: `${artistName} – ${title}`,
        text: `${artistName} – ${title} (${year}). ${label ? `Label: ${label}.` : ""} Type: ${release.type || "release"}.`,
        sourceLabel,
        sourceUrl: `https://www.discogs.com${release.resource_url ? "" : ""}`,
      });
    }

    page += 1;
    if (page <= totalPages) await sleep(RELEASE_DELAY_MS);
  }

  return docs;
}

async function ingestDiscogsLabel(labelId, labelName, sourceLabel) {
  const docs = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const data = await fetchDiscogs(
      `/labels/${labelId}/releases?page=${page}&per_page=100&sort=year&sort_order=asc`,
    );
    if (!data?.releases) break;
    if (data.pagination) totalPages = data.pagination.pages;

    for (const release of data.releases) {
      const year = release.year || "unknown year";
      const title = release.title || "Untitled";
      const artist = release.artist || "";
      docs.push({
        id: `discogs-label-${labelId}-${release.id}`,
        title: `${artist ? `${artist} – ` : ""}${title}`,
        text: `${artist ? `${artist} – ` : ""}${title} (${year}). Label: ${labelName}. Catalog: ${release.catno || "N/A"}.`,
        sourceLabel,
        sourceUrl: `https://www.discogs.com/release/${release.id}`,
      });
    }

    page += 1;
    if (page <= totalPages) await sleep(RELEASE_DELAY_MS);
  }

  return docs;
}

// ── GBV ingestion ───────────────────────────────────────────────────

async function ingestGbv() {
  console.log("\n=== Ingesting GBV knowledge ===");
  const docs = [];

  // Wikipedia
  const wikiArticles = [
    "Guided_by_Voices",
    "Guided_by_Voices_discography",
    "Robert_Pollard",
  ];
  for (const article of wikiArticles) {
    console.log(`  Wikipedia: ${article}`);
    const articleDocs = await ingestWikipediaArticle(article, "Wikipedia");
    docs.push(...articleDocs);
    await sleep(500);
  }

  // Discogs — GBV artist ID 83529
  console.log("  Discogs: Guided by Voices");
  const discogsDocs = await ingestDiscogsArtist(
    83529,
    "Guided by Voices",
    "Discogs",
  );
  docs.push(...discogsDocs);

  // Custom URLs
  if (CUSTOM_URLS.gbv.length > 0) {
    const customDocs = await ingestCustomUrls(CUSTOM_URLS.gbv);
    docs.push(...customDocs);
  }

  console.log(`  Total GBV docs: ${docs.length}`);
  return docs;
}

// ── AmRep ingestion ─────────────────────────────────────────────────

async function ingestAmrep() {
  console.log("\n=== Ingesting AmRep knowledge ===");
  const docs = [];

  // Wikipedia
  const wikiArticles = [
    "Amphetamine_Reptile_Records",
    "Amphetamine_Reptile_Records_discography",
  ];
  for (const article of wikiArticles) {
    console.log(`  Wikipedia: ${article}`);
    const articleDocs = await ingestWikipediaArticle(article, "Wikipedia");
    docs.push(...articleDocs);
    await sleep(500);
  }

  // Discogs — AmRep label ID 5126
  console.log("  Discogs: Amphetamine Reptile label");
  const discogsDocs = await ingestDiscogsLabel(
    5126,
    "Amphetamine Reptile Records",
    "Discogs",
  );
  docs.push(...discogsDocs);

  // Custom URLs
  if (CUSTOM_URLS.amrep.length > 0) {
    const customDocs = await ingestCustomUrls(CUSTOM_URLS.amrep);
    docs.push(...customDocs);
  }

  console.log(`  Total AmRep docs: ${docs.length}`);
  return docs;
}

// ── MLB ingestion ───────────────────────────────────────────────────

async function ingestMlb() {
  console.log("\n=== Ingesting MLB knowledge ===");
  const docs = [];

  // Wikipedia only (no Discogs for MLB)
  const wikiArticles = [
    "Major_League_Baseball",
    "List_of_Major_League_Baseball_records",
  ];
  for (const article of wikiArticles) {
    console.log(`  Wikipedia: ${article}`);
    const articleDocs = await ingestWikipediaArticle(article, "Wikipedia");
    docs.push(...articleDocs);
    await sleep(500);
  }

  // Custom URLs
  if (CUSTOM_URLS.mlb.length > 0) {
    const customDocs = await ingestCustomUrls(CUSTOM_URLS.mlb);
    docs.push(...customDocs);
  }

  console.log(`  Total MLB docs: ${docs.length}`);
  return docs;
}

// ── Main ────────────────────────────────────────────────────────────

async function main() {
  await ensureDir(OUTPUT_DIR);

  const [gbvDocs, amrepDocs, mlbDocs] = await Promise.all([
    ingestGbv(),
    ingestAmrep(),
    ingestMlb(),
  ]);

  const writes = [
    {
      path: path.join(OUTPUT_DIR, "gbv-knowledge-scraped.json"),
      data: gbvDocs,
      label: "GBV",
    },
    {
      path: path.join(OUTPUT_DIR, "amrep-knowledge-scraped.json"),
      data: amrepDocs,
      label: "AmRep",
    },
    {
      path: path.join(OUTPUT_DIR, "mlb-knowledge-scraped.json"),
      data: mlbDocs,
      label: "MLB",
    },
  ];

  for (const { path: filePath, data, label } of writes) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    console.log(`Wrote ${filePath} (${data.length} docs for ${label})`);
  }

  console.log("\nDone! Knowledge files written to data/");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
