import { NextResponse } from "next/server";

const MUSICBRAINZ_BASE = "https://musicbrainz.org/ws/2";
const COVER_ART_BASE = "https://coverartarchive.org";
const USER_AGENT = "GuidedByNumbers/1.0 (https://guidedbynumbers.com)";

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

async function getCoverArt(mbid: string): Promise<string | null> {
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

    // Find front cover
    const frontCover = images.find((img) => img.front);
    if (frontCover) {
      // Prefer 500px thumbnail for good quality without being too large
      return (
        frontCover.thumbnails["500"] ||
        frontCover.thumbnails["1200"] ||
        frontCover.thumbnails.large ||
        frontCover.image
      );
    }

    // Fallback to first image
    if (images.length > 0) {
      const first = images[0];
      return first.thumbnails["500"] || first.thumbnails.large || first.image;
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

  // Check cache
  const cacheKey = mbid || `${artist}:${album}`;
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

// Batch endpoint to get multiple covers at once
export async function POST(request: Request) {
  try {
    const { albums } = await request.json();

    if (!Array.isArray(albums)) {
      return NextResponse.json({ error: "Albums array required" }, { status: 400 });
    }

    const results = await Promise.all(
      albums.slice(0, 40).map(
        async (album: { title?: string; artist?: string; year?: number; primaryType?: string }) => {
          const title = album.title?.trim() || "";
          if (!title) {
            return { title: "Unknown", coverUrl: null };
          }

          try {
            const artist = album.artist || "Guided By Voices";
            const cacheKey = `${artist}:${title}`;

            // Check cache first
            const cached = coverArtCache.get(cacheKey);
            if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
              return { title, coverUrl: cached.url };
            }

            // Search and get cover
            const mbid = await searchMusicBrainz(artist, title, {
              year: album.year,
              primaryType: album.primaryType,
            });
            if (!mbid) {
              coverArtCache.set(cacheKey, { url: null, timestamp: Date.now() });
              return { title, coverUrl: null };
            }

            const coverUrl = await getCoverArt(mbid);
            coverArtCache.set(cacheKey, { url: coverUrl, timestamp: Date.now() });

            return { title, coverUrl, mbid };
          } catch {
            return { title, coverUrl: null };
          }
        })
    );

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Batch cover art error:", error);
    return NextResponse.json({ error: "Failed to fetch cover art" }, { status: 500 });
  }
}
