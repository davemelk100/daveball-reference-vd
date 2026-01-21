import fs from "node:fs/promises";
import path from "node:path";

const GBV_ARTIST_ID = 83529;
const DISCOGS_BASE_URL = "https://api.discogs.com";
const USER_AGENT = "MajorLeagueNumbers/1.0";
const OUTPUT_DIR = path.join(process.cwd(), "public", "gbv-albums");
const OUTPUT_LIB = path.join(process.cwd(), "lib", "gbv-album-images.ts");
const OVERRIDES_PATH = path.join(
  process.cwd(),
  "data",
  "gbv-album-image-overrides.json"
);
const MAX_RETRIES = 5;
const RELEASE_DELAY_MS = 1200;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchDiscogs(endpoint) {
  const token = process.env.DISCOGS_USER_TOKEN || process.env.DISCOGS_TOKEN;
  if (!token) {
    throw new Error("Discogs token missing. Set DISCOGS_TOKEN or DISCOGS_USER_TOKEN.");
  }
  for (let attempt = 0; attempt < MAX_RETRIES; attempt += 1) {
    const res = await fetch(`${DISCOGS_BASE_URL}${endpoint}`, {
      headers: {
        "User-Agent": USER_AGENT,
        ...(token ? { Authorization: `Discogs token=${token}` } : {}),
      },
    });
    if (res.status === 429 && attempt < MAX_RETRIES - 1) {
      const retryAfter = Number(res.headers.get("retry-after") || "0");
      await sleep((retryAfter || 2 + attempt) * 1000);
      continue;
    }
    if (!res.ok) throw new Error(`Discogs error: ${res.status}`);
    return res.json();
  }
  throw new Error("Discogs error: retries exhausted");
}

async function fetchDiscogsUrl(url) {
  const token = process.env.DISCOGS_USER_TOKEN || process.env.DISCOGS_TOKEN;
  if (!token) {
    throw new Error("Discogs token missing. Set DISCOGS_TOKEN or DISCOGS_USER_TOKEN.");
  }
  for (let attempt = 0; attempt < MAX_RETRIES; attempt += 1) {
    const res = await fetch(url, {
      headers: {
        "User-Agent": USER_AGENT,
        ...(token ? { Authorization: `Discogs token=${token}` } : {}),
      },
    });
    if (res.status === 429 && attempt < MAX_RETRIES - 1) {
      const retryAfter = Number(res.headers.get("retry-after") || "0");
      await sleep((retryAfter || 2 + attempt) * 1000);
      continue;
    }
    if (!res.ok) throw new Error(`Discogs error: ${res.status}`);
    return res.json();
  }
  throw new Error("Discogs error: retries exhausted");
}

function getExtensionFromContentType(contentType = "") {
  if (contentType.includes("png")) return "png";
  if (contentType.includes("webp")) return "webp";
  if (contentType.includes("gif")) return "gif";
  if (contentType.includes("avif")) return "avif";
  return "jpg";
}

async function downloadImage(url, targetPath) {
  const res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) throw new Error(`Image fetch failed: ${res.status}`);
  const contentType = res.headers.get("content-type") || "image/jpeg";
  const extension = getExtensionFromContentType(contentType);
  const buffer = new Uint8Array(await res.arrayBuffer());
  const finalPath = `${targetPath}.${extension}`;
  await fs.writeFile(finalPath, buffer);
  return finalPath;
}

async function ensureDir() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
}

async function loadOverrides() {
  try {
    const content = await fs.readFile(OVERRIDES_PATH, "utf-8");
    return JSON.parse(content);
  } catch {
    return {};
  }
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function isAlbumRelease(release) {
  if (release.role !== "Main") return false;
  if (release.type === "master") return true;
  if (release.type !== "release") return false;
  const format = Array.isArray(release.format)
    ? release.format.join(" ").toLowerCase()
    : (release.format || "").toLowerCase();
  return format.includes("single");
}

function pickReleaseImage(images = []) {
  if (!images.length) return null;
  const primary = images.find((img) => img.type === "primary") || images[0];
  return primary?.uri150 || primary?.uri || null;
}

async function main() {
  await ensureDir();
  const overrides = await loadOverrides();

  let allReleases = [];
  let currentPage = 1;
  let totalPages = 1;
  const maxPages = 5;

  do {
    const data = await fetchDiscogs(
      `/artists/${GBV_ARTIST_ID}/releases?page=${currentPage}&per_page=100&sort=year&sort_order=asc`
    );
    const releaseCount = Array.isArray(data.releases) ? data.releases.length : 0;
    console.log(`Page ${currentPage}: ${releaseCount} releases`);
    allReleases = [...allReleases, ...data.releases];
    totalPages = data.pagination.pages;
    currentPage++;
  } while (currentPage <= totalPages && currentPage <= maxPages);

  if (allReleases.length === 0) {
    throw new Error(
      "No releases returned from Discogs. Check token/rate limits."
    );
  }

  const albums = allReleases.filter(isAlbumRelease);
  console.log(`Filtered albums/singles: ${albums.length}`);
  const withThumb = albums.filter((album) => album.thumb);
  console.log(`Albums with thumb: ${withThumb.length}`);
  const imageMap = {};

  for (const album of albums) {
    const albumId = album.id;
    let imageUrl = album.thumb || null;
    if (!imageUrl && overrides[String(albumId)]) {
      imageUrl = overrides[String(albumId)];
    }
    if (!imageUrl && album.resource_url) {
      try {
        const releaseData = await fetchDiscogsUrl(album.resource_url);
        imageUrl = pickReleaseImage(releaseData.images);
      } catch (error) {
        console.error(`Failed release fetch ${album.title}:`, error.message);
      }
      await sleep(RELEASE_DELAY_MS);
    }

    if (!imageUrl) continue;
    const baseTarget = path.join(OUTPUT_DIR, String(albumId));
    const existing = await fileExists(baseTarget + ".jpg");
    if (existing) {
      imageMap[albumId] = `/gbv-albums/${albumId}.jpg`;
      continue;
    }

    const normalized = album.thumb.replace(/^http:/, "https:");
    try {
      const savedPath = await downloadImage(normalized, baseTarget);
      const filename = path.basename(savedPath);
      imageMap[albumId] = `/gbv-albums/${filename}`;
      console.log(`Saved ${album.title} -> ${filename}`);
    } catch (error) {
      console.error(`Failed ${album.title}:`, error.message);
    }
  }

  const entries = Object.entries(imageMap)
    .map(([id, url]) => `  ${id}: "${url}"`)
    .join(",\n");

  const content = `export const localAlbumImages: Record<number, string> = {\n${entries}\n};\n\nexport function getLocalAlbumImage(albumId?: number | null): string | null {\n  if (!albumId) return null;\n  return localAlbumImages[albumId] || null;\n}\n`;

  await fs.writeFile(OUTPUT_LIB, content);
  console.log(`Wrote ${OUTPUT_LIB}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
