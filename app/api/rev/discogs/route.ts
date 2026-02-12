import { NextResponse } from "next/server";

export const runtime = "nodejs";

const DISCOGS_BASE_URL = "https://api.discogs.com";
const USER_AGENT = "RevelationRecords/1.0";
const REV_LABEL_ID = 488;

const releaseCache = new Map<string, { data: any; timestamp: number }>();
const artistCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 24 * 60 * 60 * 1000;

let labelReleaseLookup: Map<string, number> | null = null;
let labelReleaseLookupTimestamp = 0;
const LOOKUP_TTL = 24 * 60 * 60 * 1000;

async function fetchFromDiscogs(endpoint: string) {
  const token = process.env.DISCOGS_USER_TOKEN || process.env.DISCOGS_TOKEN;
  const response = await fetch(`${DISCOGS_BASE_URL}${endpoint}`, {
    headers: {
      "User-Agent": USER_AGENT,
      ...(token ? { Authorization: `Discogs token=${token}` } : {}),
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Discogs API error: ${response.status}`);
  }

  return response.json();
}

function normalizeKey(artist: string, title: string): string {
  return `${artist}::${title}`
    .toLowerCase()
    .replace(/\s*\(\d+\)\s*/g, "")
    .replace(/[^a-z0-9:]/g, "");
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getLabelReleaseLookup(): Promise<Map<string, number>> {
  if (
    labelReleaseLookup &&
    Date.now() - labelReleaseLookupTimestamp < LOOKUP_TTL
  ) {
    return labelReleaseLookup;
  }

  const lookup = new Map<string, number>();
  let currentPage = 1;
  let totalPages = 1;
  const maxPages = 25;

  do {
    try {
      const data = await fetchFromDiscogs(
        `/labels/${REV_LABEL_ID}/releases?page=${currentPage}&per_page=100&sort=year&sort_order=asc`
      );
      for (const r of data?.releases || []) {
        const key = normalizeKey(r.artist || "", r.title || "");
        if (key && !lookup.has(key)) {
          lookup.set(key, r.id);
        }
      }
      totalPages = data?.pagination?.pages || 1;
    } catch {
      break;
    }
    currentPage++;
    if (currentPage <= totalPages) await sleep(300);
  } while (currentPage <= totalPages && currentPage <= maxPages);

  if (lookup.size > 0) {
    labelReleaseLookup = lookup;
    labelReleaseLookupTimestamp = Date.now();
  }
  return lookup;
}

function pickCoverImage(data: any): string | undefined {
  const images = data.images;
  if (!Array.isArray(images) || images.length === 0) return undefined;
  const primary = images.find((img: any) => img.type === "primary");
  return primary?.uri || images[0]?.uri;
}

function buildReleaseResponse(data: any) {
  return {
    id: data.id,
    title: data.title || "",
    year: data.year,
    coverImage: pickCoverImage(data),
    tracklist: Array.isArray(data.tracklist)
      ? data.tracklist.map((track: any) => ({
          position: track.position,
          title: track.title,
          duration: track.duration,
        }))
      : undefined,
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "resolve";
  const artist = searchParams.get("artist") || "";
  const title = searchParams.get("title") || "";

  try {
    if (type === "resolve") {
      if (!artist && !title) {
        return NextResponse.json({ release: null });
      }

      const cacheKey = normalizeKey(artist, title);
      const cached = releaseCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return NextResponse.json({ release: cached.data, cached: true });
      }

      const lookup = await getLabelReleaseLookup();
      const discogsId = lookup.get(cacheKey);

      if (!discogsId) {
        return NextResponse.json({ release: null });
      }

      const data = await fetchFromDiscogs(`/releases/${discogsId}`);
      const release = buildReleaseResponse(data);

      releaseCache.set(cacheKey, { data: release, timestamp: Date.now() });
      return NextResponse.json({ release });
    }

    if (type === "artist") {
      const name = searchParams.get("name") || "";
      if (!name) {
        return NextResponse.json({ artist: null });
      }

      const cacheKey = name.toLowerCase().replace(/[^a-z0-9]/g, "");
      const cached = artistCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return NextResponse.json({ artist: cached.data, cached: true });
      }

      const q = encodeURIComponent(name);
      const searchData = await fetchFromDiscogs(
        `/database/search?q=${q}&type=artist&per_page=5`
      );
      const results = searchData?.results || [];
      const match = results.find((r: any) =>
        r.title?.toLowerCase() === name.toLowerCase()
      ) || results[0];

      if (!match) {
        artistCache.set(cacheKey, { data: null, timestamp: Date.now() });
        return NextResponse.json({ artist: null });
      }

      const artistData = {
        id: match.id,
        name: match.title,
        imageUrl: match.cover_image && !match.cover_image.includes("spacer.gif")
          ? match.cover_image
          : undefined,
      };

      artistCache.set(cacheKey, { data: artistData, timestamp: Date.now() });
      return NextResponse.json({ artist: artistData });
    }

    return NextResponse.json({ error: "Invalid type parameter" }, { status: 400 });
  } catch (error) {
    console.error("Rev Discogs API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from Discogs" },
      { status: 500 }
    );
  }
}
