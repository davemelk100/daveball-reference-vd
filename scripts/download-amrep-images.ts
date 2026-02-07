/**
 * Download all AmRep images to local storage
 * Run with: npx tsx scripts/download-amrep-images.ts
 */

import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

// Read and parse the album images file
const ALBUM_IMAGES_PATH = path.join(
  process.cwd(),
  "lib/amrep-album-images.ts"
);
const MEMBER_IMAGES_PATH = path.join(
  process.cwd(),
  "lib/amrep-member-images.ts"
);

const ALBUMS_OUTPUT_DIR = path.join(
  process.cwd(),
  "public/images/amrep/albums"
);
const MEMBERS_OUTPUT_DIR = path.join(
  process.cwd(),
  "public/images/amrep/members"
);

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getExtension(url: string): string {
  const urlPath = new URL(url).pathname;
  const ext = path.extname(urlPath).toLowerCase();
  if ([".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(ext)) {
    return ext;
  }
  return ".jpg"; // default
}

function downloadImage(url: string, outputPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https") ? https : http;

    const request = protocol.get(
      url,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        },
      },
      (response) => {
        // Handle redirects
        if (
          response.statusCode &&
          response.statusCode >= 300 &&
          response.statusCode < 400 &&
          response.headers.location
        ) {
          downloadImage(response.headers.location, outputPath)
            .then(resolve)
            .catch(reject);
          return;
        }

        if (response.statusCode !== 200) {
          reject(new Error(`HTTP ${response.statusCode} for ${url}`));
          return;
        }

        const fileStream = fs.createWriteStream(outputPath);
        response.pipe(fileStream);

        fileStream.on("finish", () => {
          fileStream.close();
          resolve();
        });

        fileStream.on("error", (err) => {
          fs.unlink(outputPath, () => {}); // Clean up partial file
          reject(err);
        });
      }
    );

    request.on("error", reject);
    request.setTimeout(30000, () => {
      request.destroy();
      reject(new Error(`Timeout downloading ${url}`));
    });
  });
}

function parseAlbumImages(): Map<number, string> {
  const content = fs.readFileSync(ALBUM_IMAGES_PATH, "utf-8");
  const images = new Map<number, string>();

  // Match patterns like: 123: "https://..."
  const regex = /^\s*(\d+):\s*["'`]([^"'`]+)["'`]/gm;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const id = parseInt(match[1], 10);
    const url = match[2];
    images.set(id, url);
  }

  return images;
}

function parseMemberImages(): Map<string, string> {
  const content = fs.readFileSync(MEMBER_IMAGES_PATH, "utf-8");
  const images = new Map<string, string>();

  // Match patterns like: "member name": "https://..." or "member name":\n    "https://..."
  const regex =
    /["'`]([^"'`]+)["'`]:\s*\n?\s*["'`](\/api\/gbv\/image-proxy\?url=[^"'`]+|https?:\/\/[^"'`]+)["'`]/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const name = match[1];
    let url = match[2];

    // Decode proxy URLs
    if (url.startsWith("/api/gbv/image-proxy?url=")) {
      const encoded = url.replace("/api/gbv/image-proxy?url=", "");
      url = decodeURIComponent(encoded);
    }

    images.set(name, url);
  }

  return images;
}

function sanitizeFilename(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function downloadAllImages() {
  console.log("Starting AmRep image download...\n");

  ensureDir(ALBUMS_OUTPUT_DIR);
  ensureDir(MEMBERS_OUTPUT_DIR);

  // Download album images
  const albumImages = parseAlbumImages();
  console.log(`Found ${albumImages.size} album images\n`);

  let albumSuccess = 0;
  let albumFailed = 0;

  for (const [id, url] of albumImages) {
    const ext = getExtension(url);
    const filename = `album-${id}${ext}`;
    const outputPath = path.join(ALBUMS_OUTPUT_DIR, filename);

    // Skip if already exists
    if (fs.existsSync(outputPath)) {
      console.log(`  [SKIP] Album ${id} already exists`);
      albumSuccess++;
      continue;
    }

    try {
      process.stdout.write(`  Downloading album ${id}...`);
      await downloadImage(url, outputPath);
      console.log(" OK");
      albumSuccess++;
    } catch (err) {
      console.log(` FAILED: ${(err as Error).message}`);
      albumFailed++;
    }

    // Small delay to be nice to servers
    await new Promise((r) => setTimeout(r, 100));
  }

  console.log(`\nAlbums: ${albumSuccess} succeeded, ${albumFailed} failed\n`);

  // Download member images
  const memberImages = parseMemberImages();
  console.log(`Found ${memberImages.size} member images\n`);

  let memberSuccess = 0;
  let memberFailed = 0;

  for (const [name, url] of memberImages) {
    const ext = getExtension(url);
    const filename = `${sanitizeFilename(name)}${ext}`;
    const outputPath = path.join(MEMBERS_OUTPUT_DIR, filename);

    // Skip if already exists
    if (fs.existsSync(outputPath)) {
      console.log(`  [SKIP] Member "${name}" already exists`);
      memberSuccess++;
      continue;
    }

    try {
      process.stdout.write(`  Downloading member "${name}"...`);
      await downloadImage(url, outputPath);
      console.log(" OK");
      memberSuccess++;
    } catch (err) {
      console.log(` FAILED: ${(err as Error).message}`);
      memberFailed++;
    }

    // Small delay to be nice to servers
    await new Promise((r) => setTimeout(r, 100));
  }

  console.log(
    `\nMembers: ${memberSuccess} succeeded, ${memberFailed} failed\n`
  );

  console.log("Done!");
  console.log(`\nImages saved to:`);
  console.log(`  Albums:  ${ALBUMS_OUTPUT_DIR}`);
  console.log(`  Members: ${MEMBERS_OUTPUT_DIR}`);
}

downloadAllImages().catch(console.error);
