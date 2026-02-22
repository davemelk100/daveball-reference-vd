/**
 * Download Skin Graft Records images
 *
 * Part A: Band photos from skingraftrecords.com photo galleries
 * Part B: Release cover art from Discogs (label 33275)
 * Part C: Generate lib/sg-local-images.ts mapping file
 *
 * Usage: npx tsx scripts/download-sg-images.ts
 */

import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

const DISCOGS_TOKEN = process.env.DISCOGS_USER_TOKEN || process.env.DISCOGS_TOKEN || "";
const SG_LABEL_IDS = [33275];
const DISCOGS_BASE = "https://api.discogs.com";
const USER_AGENT = "SkinGraft/1.0";
const RATE_LIMIT_MS = 1200;

const ARTISTS_DIR = path.join(process.cwd(), "public", "images", "sg", "artists");
const ALBUMS_DIR = path.join(process.cwd(), "public", "images", "sg", "albums");
const OUTPUT_FILE = path.join(process.cwd(), "lib", "sg-local-images.ts");

// Artist ID → photo gallery directory name on skingraftrecords.com
const artistGalleryMap: Record<string, string> = {
  "dazzling-killmen": "dazzling_killmen_pics",
  "mount-shasta": "mount_shasta_pics",
  "flying-luttenbachers": "flying_luttenbachers_pics",
  "us-maple": "us_maple_pics",
  "lake-of-dracula": "lake_of_dracula_pics",
  "cheer-accident": "cheer_accident_pics",
  "colossamite": "colossamite_pics",
  "yona-kit": "yona_kit_pics",
  "shorty": "shorty_pics",
  "bobby-conn": "bobby_conn_pics",
  "scissor-girls": "scissor_girls_pics",
  "zeni-geva": "zeni_geva_pics",
  "melt-banana": "melt_banana_pics",
  "ruins": "ruins_pics",
  "upsilon-acrux": "upsilon_acrux_pics",
  "lair-of-the-minotaur": "lair_of_the_minotaur_pics",
  "ahleuchatistas": "ahleuchatistas_pics",
  "psychic-paramount": "psychic_paramount_pics",
  "quintron": "quintron_pics",
  "storm-and-stress": "storm_and_stress_pics",
};

// SG discography: catalogNumber → { artist, title }
const sgDiscography = [
  { catalogNumber: 1, artist: "Dazzling Killmen", title: "Coffin Fit" },
  { catalogNumber: 2, artist: "Mount Shasta", title: "Gravity On" },
  { catalogNumber: 3, artist: "Dazzling Killmen", title: "Dig Out / Cornered" },
  { catalogNumber: 4, artist: "Lake of Dracula", title: "Lake of Dracula" },
  { catalogNumber: 5, artist: "The Flying Luttenbachers", title: "Constructive Destruction" },
  { catalogNumber: 6, artist: "Shorty", title: "Thumb the Ride" },
  { catalogNumber: 7, artist: "Dazzling Killmen", title: "Face of Collapse" },
  { catalogNumber: 8, artist: "Yona-Kit", title: "Yona-Kit" },
  { catalogNumber: 9, artist: "Mount Shasta", title: "Watch Out" },
  { catalogNumber: 10, artist: "U.S. Maple", title: "Long Hair in Three Stages" },
  { catalogNumber: 11, artist: "Scissor Girls", title: "We're Not Gonna Take It" },
  { catalogNumber: 12, artist: "Colossamite", title: "Economy of Motion" },
  { catalogNumber: 13, artist: "Cheer-Accident", title: "Not a Food" },
  { catalogNumber: 14, artist: "The Flying Luttenbachers", title: "Gods of Chaos" },
  { catalogNumber: 15, artist: "U.S. Maple", title: "Sang Phat Editor" },
  { catalogNumber: 16, artist: "Mount Shasta", title: "Put the Creep On" },
  { catalogNumber: 17, artist: "Lake of Dracula", title: "Plays Polka" },
  { catalogNumber: 18, artist: "Scissor Girls", title: "Guilt Trip" },
  { catalogNumber: 19, artist: "Shorty", title: "Thumb Rocker" },
  { catalogNumber: 20, artist: "Bobby Conn", title: "Bobby Conn" },
  { catalogNumber: 21, artist: "Storm & Stress", title: "Storm & Stress" },
  { catalogNumber: 22, artist: "Colossamite", title: "All Lingo's Clamor" },
  { catalogNumber: 23, artist: "Various Artists", title: "Ear-Bleeding Country" },
  { catalogNumber: 24, artist: "Cheer-Accident", title: "Salad Days" },
  { catalogNumber: 25, artist: "U.S. Maple", title: "Talker" },
  { catalogNumber: 26, artist: "The Flying Luttenbachers", title: "Infection and Decline" },
  { catalogNumber: 27, artist: "Bobby Conn", title: "The Golden Age" },
  { catalogNumber: 28, artist: "Quintron", title: "These Hands of Mine" },
  { catalogNumber: 29, artist: "Zeni Geva", title: "10000 Light Years" },
  { catalogNumber: 30, artist: "The Flying Luttenbachers", title: "Retrospektiull" },
  { catalogNumber: 31, artist: "Bobby Conn", title: "Rise Up!" },
  { catalogNumber: 32, artist: "Ruins", title: "Burning Stone" },
  { catalogNumber: 33, artist: "Mount Shasta", title: "Who's the Hottie?" },
  { catalogNumber: 34, artist: "Melt-Banana", title: "Teeny Shiny" },
  { catalogNumber: 35, artist: "U.S. Maple", title: "Purple on Time" },
  { catalogNumber: 36, artist: "Upsilon Acrux", title: "Galapagos Momentum" },
  { catalogNumber: 37, artist: "The Psychic Paramount", title: "Gamelan Into the Mink Supernatural" },
  { catalogNumber: 38, artist: "Ahleuchatistas", title: "The Same and the Other" },
  { catalogNumber: 39, artist: "Lair of the Minotaur", title: "Carnage" },
  { catalogNumber: 40, artist: "Bobby Conn", title: "King for a Day" },
  { catalogNumber: 41, artist: "Upsilon Acrux", title: "Sun Square Dialect" },
  { catalogNumber: 42, artist: "Lair of the Minotaur", title: "The Ultimate Destroyer" },
  { catalogNumber: 43, artist: "Ahleuchatistas", title: "What You Will" },
  { catalogNumber: 44, artist: "Cheer-Accident", title: "Fear Draws Misfortune" },
  { catalogNumber: 45, artist: "The Psychic Paramount", title: "II" },
];

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fetchUrl(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    const req = client.get(url, { headers: { "User-Agent": USER_AGENT } }, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        fetchUrl(res.headers.location).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode && res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      const chunks: Buffer[] = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    });
    req.on("error", reject);
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error(`Timeout fetching ${url}`));
    });
  });
}

function fetchText(url: string): Promise<string> {
  return fetchUrl(url).then((buf) => buf.toString("utf-8"));
}

async function fetchDiscogs(endpoint: string): Promise<any> {
  const url = `${DISCOGS_BASE}${endpoint}`;
  const headers: Record<string, string> = { "User-Agent": USER_AGENT };
  if (DISCOGS_TOKEN) {
    headers["Authorization"] = `Discogs token=${DISCOGS_TOKEN}`;
  }

  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers }, (res) => {
      const chunks: Buffer[] = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        const body = Buffer.concat(chunks).toString("utf-8");
        if (res.statusCode && res.statusCode !== 200) {
          reject(new Error(`Discogs ${res.statusCode}: ${body.slice(0, 200)}`));
          return;
        }
        try {
          resolve(JSON.parse(body));
        } catch {
          reject(new Error(`Invalid JSON from Discogs: ${body.slice(0, 200)}`));
        }
      });
      res.on("error", reject);
    });
    req.on("error", reject);
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error(`Timeout fetching ${url}`));
    });
  });
}

function getExtFromUrl(url: string): string {
  const match = url.match(/\.(jpe?g|png|webp|gif|avif)(\?|$)/i);
  return match ? match[1].toLowerCase().replace("jpeg", "jpg") : "jpg";
}

// ─── Part A: Band photos from skingraftrecords.com ───

async function downloadBandPhotos(): Promise<Record<string, string>> {
  console.log("\n=== Part A: Band photos from skingraftrecords.com ===\n");
  const results: Record<string, string> = {};

  for (const [artistId, galleryDir] of Object.entries(artistGalleryMap)) {
    const outPath = path.join(ARTISTS_DIR, `${artistId}.jpg`);
    if (fs.existsSync(outPath)) {
      console.log(`  [skip] ${artistId} — already exists`);
      results[artistId] = `/images/sg/artists/${artistId}.jpg`;
      continue;
    }

    const galleryUrl = `https://skingraftrecords.com/graphics/photogalleries/${galleryDir}/`;
    try {
      const html = await fetchText(galleryUrl);
      // Look for JPG files in the directory listing (not GIF thumbnails)
      const jpgMatches = html.match(/href="([^"]+\.jpe?g)"/gi) || [];
      const jpgFiles = jpgMatches
        .map((m) => m.replace(/^href="/i, "").replace(/"$/, ""))
        .filter((f) => !f.toLowerCase().includes("thumb") && !f.toLowerCase().endsWith(".gif"));

      if (jpgFiles.length === 0) {
        console.log(`  [miss] ${artistId} — no JPGs found in gallery`);
        continue;
      }

      const imageFile = jpgFiles[0];
      const imageUrl = imageFile.startsWith("http")
        ? imageFile
        : `${galleryUrl}${imageFile}`;

      const buf = await fetchUrl(imageUrl);
      fs.writeFileSync(outPath, buf);
      results[artistId] = `/images/sg/artists/${artistId}.jpg`;
      console.log(`  [ok]   ${artistId} — ${imageFile} (${(buf.length / 1024).toFixed(0)} KB)`);
    } catch (err: any) {
      console.log(`  [fail] ${artistId} — ${err.message}`);
    }

    await sleep(500);
  }

  return results;
}

// ─── Part B: Release cover art from Discogs ───

function normalizeKey(artist: string, title: string): string {
  return `${artist}::${title}`
    .toLowerCase()
    .replace(/\s*\(\d+\)\s*/g, "")
    .replace(/[^a-z0-9:]/g, "");
}

async function fetchAllLabelReleases(): Promise<Map<string, any>> {
  const lookup = new Map<string, any>();

  for (const labelId of SG_LABEL_IDS) {
    console.log(`\n  Fetching all releases from Discogs label ${labelId}...`);

    let page = 1;
    let totalPages = 1;

    do {
      try {
        const data = await fetchDiscogs(
          `/labels/${labelId}/releases?page=${page}&per_page=100&sort=year&sort_order=asc`
        );
        totalPages = data?.pagination?.pages || 1;

        for (const r of data?.releases || []) {
          const key = normalizeKey(r.artist || "", r.title || "");
          if (key && !lookup.has(key)) {
            lookup.set(key, r);
          }
        }
        console.log(`    Page ${page}/${totalPages} — ${data?.releases?.length || 0} releases`);
      } catch (err: any) {
        console.log(`    Page ${page} error: ${err.message}`);
      }

      page++;
      if (page <= totalPages) await sleep(RATE_LIMIT_MS);
    } while (page <= totalPages);
  }

  console.log(`  Total unique releases in lookup: ${lookup.size}`);
  return lookup;
}

async function searchDiscogsRelease(artist: string, title: string): Promise<any | null> {
  try {
    const q = `${artist} ${title}`.replace(/[&]/g, "and");
    const data = await fetchDiscogs(
      `/database/search?q=${encodeURIComponent(q)}&type=release&per_page=3`
    );
    if (data?.results?.length > 0) {
      // Return the first result — we'll fetch full release details to get images
      return { id: data.results[0].id };
    }
  } catch {
    // ignore
  }
  return null;
}

async function downloadReleaseCoverArt(): Promise<Record<number, string>> {
  console.log("\n=== Part B: Release cover art from Discogs ===\n");
  const results: Record<number, string> = {};

  const lookup = await fetchAllLabelReleases();

  for (const release of sgDiscography) {
    const key = normalizeKey(release.artist, release.title);
    let discogsRelease = lookup.get(key);

    const ext = "jpg";
    const filename = `release-${release.catalogNumber}.${ext}`;
    const outPath = path.join(ALBUMS_DIR, filename);

    if (fs.existsSync(outPath)) {
      console.log(`  [skip] GR${String(release.catalogNumber).padStart(3, "0")} — already exists`);
      results[release.catalogNumber] = `/images/sg/albums/${filename}`;
      continue;
    }

    // Fallback: search Discogs by artist + title if label lookup missed
    if (!discogsRelease) {
      console.log(`  [search] GR${String(release.catalogNumber).padStart(3, "0")} ${release.artist} — "${release.title}" — trying search...`);
      const searchResult = await searchDiscogsRelease(release.artist, release.title);
      await sleep(RATE_LIMIT_MS);
      if (searchResult) {
        discogsRelease = { id: searchResult.id, thumb: searchResult.thumb || searchResult.cover_image };
      }
    }

    if (!discogsRelease) {
      console.log(`  [miss] GR${String(release.catalogNumber).padStart(3, "0")} ${release.artist} — "${release.title}" — no Discogs match`);
      continue;
    }

    try {
      // Fetch full release details to get full-size image
      const fullRelease = await fetchDiscogs(`/releases/${discogsRelease.id}`);
      await sleep(RATE_LIMIT_MS);

      const imageUrl =
        fullRelease?.images?.[0]?.uri ||
        fullRelease?.images?.[0]?.uri150 ||
        discogsRelease.thumb;

      if (!imageUrl) {
        console.log(`  [miss] GR${String(release.catalogNumber).padStart(3, "0")} — no image URL on Discogs`);
        continue;
      }

      const buf = await fetchUrl(imageUrl.replace(/^http:/, "https:"));
      const actualExt = getExtFromUrl(imageUrl);
      const actualFilename = `release-${release.catalogNumber}.${actualExt}`;
      const actualPath = path.join(ALBUMS_DIR, actualFilename);

      fs.writeFileSync(actualPath, buf);
      results[release.catalogNumber] = `/images/sg/albums/${actualFilename}`;
      console.log(`  [ok]   GR${String(release.catalogNumber).padStart(3, "0")} ${release.artist} — "${release.title}" (${(buf.length / 1024).toFixed(0)} KB)`);
    } catch (err: any) {
      console.log(`  [fail] GR${String(release.catalogNumber).padStart(3, "0")} ${release.artist} — ${err.message}`);
    }
  }

  return results;
}

// ─── Part C: Generate mapping file ───

function generateMappingFile(
  artistImages: Record<string, string>,
  releaseImages: Record<number, string>,
): void {
  console.log("\n=== Part C: Generate lib/sg-local-images.ts ===\n");

  const artistEntries = Object.entries(artistImages)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([id, p]) => `  "${id}": "${p}",`)
    .join("\n");

  const releaseEntries = Object.entries(releaseImages)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([num, p]) => `  ${num}: "${p}",`)
    .join("\n");

  const content = `// Auto-generated by scripts/download-sg-images.ts
// Do not edit manually — re-run the script to update.

export const sgLocalArtistImages: Record<string, string> = {
${artistEntries}
};

export const sgLocalReleaseImages: Record<number, string> = {
${releaseEntries}
};

export function getSgLocalArtistImage(id: string): string | undefined {
  return sgLocalArtistImages[id];
}

export function getSgLocalReleaseImage(catalogNumber: number): string | undefined {
  return sgLocalReleaseImages[catalogNumber];
}
`;

  fs.writeFileSync(OUTPUT_FILE, content, "utf-8");
  console.log(`  Written ${OUTPUT_FILE}`);
  console.log(`  Artists: ${Object.keys(artistImages).length} mapped`);
  console.log(`  Releases: ${Object.keys(releaseImages).length} mapped`);
}

// ─── Main ───

async function main() {
  console.log("Skin Graft Records — Image Download Script");
  console.log("=".repeat(50));

  fs.mkdirSync(ARTISTS_DIR, { recursive: true });
  fs.mkdirSync(ALBUMS_DIR, { recursive: true });

  const artistImages = await downloadBandPhotos();
  const releaseImages = await downloadReleaseCoverArt();
  generateMappingFile(artistImages, releaseImages);

  console.log("\nDone!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
