import { NextResponse } from "next/server";

const MUSICBRAINZ_BASE = "https://musicbrainz.org/ws/2";
const COVER_ART_BASE = "https://coverartarchive.org";
const USER_AGENT = "MajorLeagueNumbers/1.0 (https://majorleaguenumbers.com)";

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
  back: boolean;
  thumbnails: {
    small?: string;
    large?: string;
    "250"?: string;
    "500"?: string;
    "1200"?: string;
  };
  types: string[];
}

// Cache for cover art lookups (in-memory, will reset on server restart)
const coverArtCache = new Map<string, { url: string | null; timestamp: number }>();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

// Normalize cache key to improve hit rate
function createCacheKey(artist: string, album: string): string {
  return `${artist.toLowerCase().trim()}:${album.toLowerCase().trim()}`;
}

type ReleaseGroupMatchOptions = {
  year?: number;
  primaryType?: string;
};

function normalizeType(value?: string) {
  return value?.toLowerCase() || "";
}

function pickBestReleaseGroup(
  releaseGroups: MusicBrainzReleaseGroup[],
  options: ReleaseGroupMatchOptions
) {
  const { year, primaryType } = options;
  const targetType = normalizeType(primaryType);

  const scored = releaseGroups.map((group) => {
    let bonus = 0;
    const groupType = normalizeType(group["primary-type"]);
    const releaseYear = group["first-release-date"]?.slice(0, 4);

    if (targetType && groupType === targetType) {
      bonus += 20;
    }

    if (year && releaseYear === String(year)) {
      bonus += 15;
    }

    if (!targetType && (groupType === "album" || groupType === "single")) {
      bonus += 5;
    }

    return { group, score: group.score + bonus };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.group ?? null;
}

async function searchMusicBrainz(
  artist: string,
  album: string,
  options: ReleaseGroupMatchOptions
): Promise<string | null> {
  const query = encodeURIComponent(`artist:"${artist}" AND releasegroup:"${album}"`);
  const url = `${MUSICBRAINZ_BASE}/release-group?query=${query}&fmt=json&limit=5`;

  const response = await fetch(url, {
    headers: { "User-Agent": USER_AGENT },
  });

  if (!response.ok) return null;

  const data = await response.json();
  const releaseGroups: MusicBrainzReleaseGroup[] = data["release-groups"] || [];

  if (releaseGroups.length === 0) return null;

  const best = pickBestReleaseGroup(releaseGroups, options);
  return best?.id ?? null;
}

async function getCoverArt(mbid: string, useSmallThumbnails: boolean = false): Promise<string | null> {
  try {
    // Try release-group first (more likely to have art)
    const url = `${COVER_ART_BASE}/release-group/${mbid}`;
    const response = await fetch(url, {
      headers: { "User-Agent": USER_AGENT },
      redirect: "follow",
    });

    if (!response.ok) return null;

    const data = await response.json();
    const images: CoverArtImage[] = data.images || [];

    // Helper to ensure HTTPS
    const toHttps = (url: string | undefined) =>
      url?.replace(/^http:/, "https:");

    // Find front cover
    const frontCover = images.find((img) => img.front);
    if (frontCover) {
      // Use smaller thumbnails for list views, larger for detail views
      if (useSmallThumbnails) {
        return toHttps(
          frontCover.thumbnails["250"] ||
          frontCover.thumbnails.small ||
          frontCover.thumbnails["500"] ||
          frontCover.image
        ) || null;
      }
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
      if (useSmallThumbnails) {
        return toHttps(first.thumbnails["250"] || first.thumbnails.small || first.image) || null;
      }
      return toHttps(first.thumbnails["500"] || first.thumbnails.large || first.image) || null;
    }

    return null;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const artist = searchParams.get("artist") || "Guided By Voices";
  const album = searchParams.get("album");
  const mbid = searchParams.get("mbid"); // Optional: direct MBID lookup
  const year = searchParams.get("year");
  const primaryType = searchParams.get("primaryType");

  if (!album && !mbid) {
    return NextResponse.json({ error: "Album title or MBID required" }, { status: 400 });
  }

  // Check cache with normalized key
  const cacheKey = mbid || createCacheKey(artist, album || "");
  const cached = coverArtCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return NextResponse.json({ coverUrl: cached.url, cached: true });
  }

  try {
    let releaseGroupId = mbid;

    // If no MBID provided, search MusicBrainz
    if (!releaseGroupId && album) {
      releaseGroupId = await searchMusicBrainz(artist, album, {
        year: year ? Number(year) : undefined,
        primaryType: primaryType || undefined,
      });
    }

    if (!releaseGroupId) {
      coverArtCache.set(cacheKey, { url: null, timestamp: Date.now() });
      return NextResponse.json({ coverUrl: null, error: "Album not found in MusicBrainz" });
    }

    // Get cover art
    const coverUrl = await getCoverArt(releaseGroupId);

    // Cache the result
    coverArtCache.set(cacheKey, { url: coverUrl, timestamp: Date.now() });

    return NextResponse.json({
      coverUrl,
      mbid: releaseGroupId,
      cached: false,
    });
  } catch (error) {
    console.error("Cover art error:", error);
    return NextResponse.json({ error: "Failed to fetch cover art" }, { status: 500 });
  }
}

// Rate limiting helper - process sequentially with delay to respect MusicBrainz limits
async function processWithRateLimit<T, R>(
  items: T[],
  processor: (item: T) => Promise<R>,
  delayMs: number = 300
): Promise<R[]> {
  const results: R[] = [];
  for (const item of items) {
    results.push(await processor(item));
    if (items.indexOf(item) < items.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
  return results;
}

// Batch endpoint to get multiple covers at once
export async function POST(request: Request) {
  try {
    const { albums, useSmallThumbnails } = await request.json();

    if (!Array.isArray(albums)) {
      return NextResponse.json({ error: "Albums array required" }, { status: 400 });
    }

    // Limit batch size to prevent timeout
    const albumsToProcess = albums.slice(0, 12);

    // Separate cached vs uncached albums
    const cachedResults: Array<{ title: string; coverUrl: string | null }> = [];
    const uncachedAlbums: Array<{ title: string; artist?: string; year?: number; primaryType?: string }> = [];

    for (const album of albumsToProcess) {
      const title = album.title?.trim() || "";
      if (!title) {
        cachedResults.push({ title: "Unknown", coverUrl: null });
        continue;
      }

      const artist = album.artist || "Guided By Voices";
      const cacheKey = createCacheKey(artist, title);
      const cached = coverArtCache.get(cacheKey);

      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        cachedResults.push({ title, coverUrl: cached.url });
      } else {
        uncachedAlbums.push({ ...album, title });
      }
    }

    // Process uncached albums with rate limiting
    const uncachedResults = await processWithRateLimit(
      uncachedAlbums,
      async (album) => {
        const title = album.title;
        try {
          const artist = album.artist || "Guided By Voices";
          const cacheKey = createCacheKey(artist, title);

          const mbid = await searchMusicBrainz(artist, title, {
            year: album.year,
            primaryType: album.primaryType,
          });

          if (!mbid) {
            coverArtCache.set(cacheKey, { url: null, timestamp: Date.now() });
            return { title, coverUrl: null };
          }

          const coverUrl = await getCoverArt(mbid, useSmallThumbnails);
          coverArtCache.set(cacheKey, { url: coverUrl, timestamp: Date.now() });

          return { title, coverUrl, mbid };
        } catch {
          return { title, coverUrl: null };
        }
      },
      350 // 350ms delay between requests to respect rate limits
    );

    // Combine results in original order
    const allResults = [...cachedResults, ...uncachedResults];

    return NextResponse.json({ results: allResults });
  } catch (error) {
    console.error("Batch cover art error:", error);
    return NextResponse.json({ error: "Failed to fetch cover art" }, { status: 500 });
  }
}
