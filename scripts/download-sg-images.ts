/**
 * Download Skin Graft Records images
 *
 * Part A: Band photos from skingraftrecords.com photo galleries
 * Part B: Release cover art from MusicBrainz/Cover Art Archive + Discogs fallback
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

// MusicBrainz / Cover Art Archive
const MUSICBRAINZ_BASE = "https://musicbrainz.org/ws/2";
const COVER_ART_BASE = "https://coverartarchive.org";
const MB_USER_AGENT = "MajorLeagueNumbers/1.0 (https://majorleaguenumbers.com)";
const MB_RATE_LIMIT_MS = 1100;

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

// ─── MusicBrainz / Cover Art Archive helpers ───

// Artist name overrides for MusicBrainz search (discog name → MB name)
const mbArtistOverrides: Record<string, string> = {
  "The Flying Luttenbachers": "Flying Luttenbachers",
  "The Psychic Paramount": "Psychic Paramount",
};

interface MusicBrainzReleaseGroup {
  id: string;
  title: string;
  "primary-type"?: string;
  "first-release-date"?: string;
  score: number;
}

interface CoverArtImage {
  id: number;
  image: string;
  front: boolean;
  thumbnails: {
    small?: string;
    large?: string;
    "250"?: string;
    "500"?: string;
    "1200"?: string;
  };
}

function fetchJson(url: string, userAgent: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    const req = client.get(url, { headers: { "User-Agent": userAgent } }, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        fetchJson(res.headers.location, userAgent).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode && res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      const chunks: Buffer[] = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(Buffer.concat(chunks).toString("utf-8")));
        } catch {
          reject(new Error(`Invalid JSON from ${url}`));
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

function pickBestReleaseGroup(groups: MusicBrainzReleaseGroup[]): MusicBrainzReleaseGroup | null {
  const scored = groups.map((group) => {
    let bonus = 0;
    const groupType = (group["primary-type"] || "").toLowerCase();

    // Prefer albums and EPs
    if (groupType === "album" || groupType === "ep") bonus += 20;
    if (groupType === "single") bonus += 5;

    return { group, score: group.score + bonus };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.group ?? null;
}

async function searchMusicBrainzCover(
  artist: string,
  title: string,
): Promise<string | null> {
  const mbArtist = mbArtistOverrides[artist] || artist;
  const query = encodeURIComponent(`artist:"${mbArtist}" AND releasegroup:"${title}"`);
  const searchUrl = `${MUSICBRAINZ_BASE}/release-group?query=${query}&fmt=json&limit=5`;

  try {
    const data = await fetchJson(searchUrl, MB_USER_AGENT);
    const releaseGroups: MusicBrainzReleaseGroup[] = data["release-groups"] || [];

    if (releaseGroups.length === 0) return null;

    const best = pickBestReleaseGroup(releaseGroups);
    if (!best) return null;

    await sleep(MB_RATE_LIMIT_MS);

    // Fetch cover art from Cover Art Archive
    const caaUrl = `${COVER_ART_BASE}/release-group/${best.id}`;
    const caaData = await fetchJson(caaUrl, MB_USER_AGENT);
    const images: CoverArtImage[] = caaData.images || [];

    const toHttps = (url: string | undefined) => url?.replace(/^http:/, "https:");

    // Prefer front cover
    const frontCover = images.find((img) => img.front);
    if (frontCover) {
      return toHttps(
        frontCover.thumbnails["500"] ||
        frontCover.thumbnails["1200"] ||
        frontCover.thumbnails.large ||
        frontCover.image
      ) || null;
    }

    // Fallback to first image
    if (images.length > 0) {
      const first = images[0];
      return toHttps(first.thumbnails["500"] || first.thumbnails.large || first.image) || null;
    }

    return null;
  } catch {
    return null;
  }
}

// ─── Part B: Release cover art from MusicBrainz + Discogs fallback ───

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

function normalizeForMatch(s: string): string {
  return s.toLowerCase().replace(/^the\s+/, "").replace(/[^a-z0-9]/g, "");
}

async function searchDiscogsRelease(artist: string, title: string): Promise<any | null> {
  try {
    const q = `${artist} ${title}`.replace(/[&]/g, "and");
    const data = await fetchDiscogs(
      `/database/search?q=${encodeURIComponent(q)}&type=release&per_page=5`
    );
    const normArtist = normalizeForMatch(artist);
    for (const result of data?.results || []) {
      // Validate that the result's title contains the expected artist name
      const resultTitle = normalizeForMatch(result.title || "");
      if (resultTitle.includes(normArtist)) {
        return { id: result.id };
      }
    }
  } catch {
    // ignore
  }
  return null;
}

async function downloadReleaseCoverArt(): Promise<Record<number, string>> {
  console.log("\n=== Part B: Release cover art from MusicBrainz + Discogs ===\n");
  const results: Record<number, string> = {};

  const lookup = await fetchAllLabelReleases();

  let mbHits = 0;
  let discogsHits = 0;

  for (const release of sgDiscography) {
    const catLabel = `GR${String(release.catalogNumber).padStart(3, "0")}`;
    const ext = "jpg";
    const filename = `release-${release.catalogNumber}.${ext}`;
    const outPath = path.join(ALBUMS_DIR, filename);

    if (fs.existsSync(outPath)) {
      console.log(`  [skip] ${catLabel} — already exists`);
      results[release.catalogNumber] = `/images/sg/albums/${filename}`;
      continue;
    }

    let imageUrl: string | null = null;
    let source: string | null = null;

    // 1. Try Discogs label lookup first (no extra requests — already fetched)
    const key = normalizeKey(release.artist, release.title);
    const discogsRelease = lookup.get(key);

    if (discogsRelease) {
      try {
        console.log(`  [discogs] ${catLabel} — found in label lookup (id: ${discogsRelease.id})`);
        const fullRelease = await fetchDiscogs(`/releases/${discogsRelease.id}`);
        await sleep(RATE_LIMIT_MS);

        // Validate artist matches before accepting the image
        const releaseArtists = (fullRelease?.artists || [])
          .map((a: any) => normalizeForMatch(a.name || ""))
          .join(" ");
        const normArtist = normalizeForMatch(release.artist);

        if (!releaseArtists.includes(normArtist)) {
          console.log(`  [skip-mismatch] ${catLabel} — Discogs artist "${fullRelease?.artists?.[0]?.name}" doesn't match "${release.artist}"`);
        } else {
          imageUrl =
            fullRelease?.images?.[0]?.uri ||
            fullRelease?.images?.[0]?.uri150 ||
            discogsRelease.thumb || null;

          if (imageUrl) source = "discogs";
        }
      } catch {
        // Discogs fetch failed
      }
    }

    // 2. Try MusicBrainz / Cover Art Archive (2 requests: search + CAA)
    if (!imageUrl) {
      try {
        console.log(`  [mb]   ${catLabel} ${release.artist} — "${release.title}" — searching MusicBrainz...`);
        imageUrl = await searchMusicBrainzCover(release.artist, release.title);
        await sleep(MB_RATE_LIMIT_MS);
        if (imageUrl) source = "mb";
      } catch {
        // MusicBrainz failed
      }
    }

    // 3. Last resort: Discogs search (only if label lookup missed entirely)
    if (!imageUrl && !discogsRelease) {
      console.log(`  [discogs-search] ${catLabel} — trying Discogs search...`);
      const searchResult = await searchDiscogsRelease(release.artist, release.title);
      await sleep(RATE_LIMIT_MS);

      if (searchResult) {
        try {
          const fullRelease = await fetchDiscogs(`/releases/${searchResult.id}`);
          await sleep(RATE_LIMIT_MS);

          const releaseArtists = (fullRelease?.artists || [])
            .map((a: any) => normalizeForMatch(a.name || ""))
            .join(" ");
          const normArtist = normalizeForMatch(release.artist);

          if (releaseArtists.includes(normArtist)) {
            imageUrl =
              fullRelease?.images?.[0]?.uri ||
              fullRelease?.images?.[0]?.uri150 || null;

            if (imageUrl) source = "discogs";
          }
        } catch {
          // Discogs fetch failed
        }
      }
    }

    if (!imageUrl) {
      console.log(`  [miss] ${catLabel} ${release.artist} — "${release.title}" — no image found`);
      continue;
    }

    // 3. Download the image
    try {
      const buf = await fetchUrl(imageUrl.replace(/^http:/, "https:"));
      const actualExt = getExtFromUrl(imageUrl);
      const actualFilename = `release-${release.catalogNumber}.${actualExt}`;
      const actualPath = path.join(ALBUMS_DIR, actualFilename);

      fs.writeFileSync(actualPath, buf);
      results[release.catalogNumber] = `/images/sg/albums/${actualFilename}`;

      if (source === "mb") mbHits++;
      else discogsHits++;

      console.log(`  [ok]   ${catLabel} ${release.artist} — "${release.title}" [${source}] (${(buf.length / 1024).toFixed(0)} KB)`);
    } catch (err: any) {
      console.log(`  [fail] ${catLabel} ${release.artist} — ${err.message}`);
    }
  }

  console.log(`\n  Sources: ${mbHits} from MusicBrainz, ${discogsHits} from Discogs`);
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
