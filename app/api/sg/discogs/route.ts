import { NextResponse } from "next/server";
import { cacheRemoteImage } from "@/lib/gbv-image-cache";

export const runtime = "nodejs";

const DISCOGS_BASE_URL = "https://api.discogs.com";
const USER_AGENT = "SkinGraft/1.0";
const SG_LABEL_ID = 33275;

const releasesCache = new Map<string, { releases: any[]; timestamp: number }>();
const RELEASES_TTL = 24 * 60 * 60 * 1000;

// Lookup cache: normalised "artist::title" → Discogs release ID
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

async function normalizeThumb(url?: string | null) {
  if (!url) return null;
  const httpsUrl = url.replace(/^http:/, "https:");
  const cached = await cacheRemoteImage(httpsUrl, "discogs-sg");
  return cached || `/api/gbv/image-proxy?url=${encodeURIComponent(httpsUrl)}`;
}

function normalizeKey(artist: string, title: string): string {
  return `${artist}::${title}`
    .toLowerCase()
    .replace(/\s*\(\d+\)\s*/g, "") // strip Discogs disambiguators like "(2)"
    .replace(/[^a-z0-9:]/g, "");
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function addPageToLookup(lookup: Map<string, number>, data: any) {
  for (const r of data?.releases || []) {
    const key = normalizeKey(r.artist || "", r.title || "");
    if (key && !lookup.has(key)) {
      lookup.set(key, r.id);
    }
  }
}

async function getLabelReleaseLookup(): Promise<Map<string, number>> {
  if (
    labelReleaseLookup &&
    Date.now() - labelReleaseLookupTimestamp < LOOKUP_TTL
  ) {
    return labelReleaseLookup;
  }

  const lookup = new Map<string, number>();
  const maxPages = 25;
  const BATCH_SIZE = 5;

  // Fetch first page to discover total pages
  try {
    const firstPage = await fetchFromDiscogs(
      `/labels/${SG_LABEL_ID}/releases?page=1&per_page=100&sort=year&sort_order=asc`
    );
    addPageToLookup(lookup, firstPage);
    const totalPages = Math.min(firstPage?.pagination?.pages || 1, maxPages);

    // Fetch remaining pages in parallel batches
    for (let batchStart = 2; batchStart <= totalPages; batchStart += BATCH_SIZE) {
      const batchEnd = Math.min(batchStart + BATCH_SIZE - 1, totalPages);
      const pages = Array.from({ length: batchEnd - batchStart + 1 }, (_, i) => batchStart + i);
      const results = await Promise.all(
        pages.map((p) =>
          fetchFromDiscogs(
            `/labels/${SG_LABEL_ID}/releases?page=${p}&per_page=100&sort=year&sort_order=asc`
          ).catch(() => null)
        )
      );
      for (const data of results) {
        if (data) addPageToLookup(lookup, data);
      }
      if (batchEnd < totalPages) await sleep(300);
    }
  } catch {
    // keep what we have
  }

  if (lookup.size > 0) {
    labelReleaseLookup = lookup;
    labelReleaseLookupTimestamp = Date.now();
  }
  return lookup;
}

function dedupeReleases(releases: any[]) {
  const seen = new Set<string>();
  const unique: any[] = [];

  for (const release of releases) {
    const mainRelease = Number(release.mainRelease || release.main_release || 0);
    const titleKey = `${release.artist || ""}::${release.title || ""}::${release.year || ""}`.toLowerCase();
    const key = mainRelease ? `main:${mainRelease}` : `title:${titleKey}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push({
      ...release,
      mainRelease: mainRelease || undefined,
    });
  }

  return unique;
}

function stripDiscogsDisambiguator(name: string): string {
  return name.replace(/\s*\(\d+\)$/, "");
}

function buildReleaseResponse(data: any, thumb: string | null) {
  return {
    id: data.id,
    title: stripDiscogsDisambiguator(data.title || ""),
    year: data.year,
    thumb,
    format: Array.isArray(data.formats)
      ? data.formats.map((format: { name?: string }) => format.name).filter(Boolean)
      : undefined,
    labels: Array.isArray(data.labels)
      ? data.labels.map((label: { name?: string }) => ({ name: label.name }))
      : undefined,
    artists: Array.isArray(data.artists)
      ? data.artists.map((artist: { name?: string }) => ({ name: stripDiscogsDisambiguator(artist.name || "") }))
      : undefined,
    genres: Array.isArray(data.genres) ? data.genres : undefined,
    styles: Array.isArray(data.styles) ? data.styles : undefined,
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
  const type = searchParams.get("type") || "releases";
  const id = searchParams.get("id");
  const page = searchParams.get("page") || "1";
  const perPage = searchParams.get("per_page") || "100";

  try {
    if (type === "label") {
      const data = await fetchFromDiscogs(`/labels/${SG_LABEL_ID}`);
      return NextResponse.json(data);
    }

    if (type === "releases") {
      const cacheKey = `${page}:${perPage}`;
      const cached = releasesCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < RELEASES_TTL) {
        return NextResponse.json({ releases: cached.releases, cached: true });
      }

      const data = await fetchFromDiscogs(
        `/labels/${SG_LABEL_ID}/releases?page=${page}&per_page=${perPage}`
      );
      const releases = await Promise.all(
        (data?.releases || []).map(async (release: any) => ({
          id: release.id,
          title: stripDiscogsDisambiguator(release.title || ""),
          year: release.year,
          artist: stripDiscogsDisambiguator(release.artist || ""),
          format: release.format,
          mainRelease: release.main_release,
          thumb: await normalizeThumb(release.thumb),
        }))
      );
      const deduped = dedupeReleases(releases);

      releasesCache.set(cacheKey, { releases: deduped, timestamp: Date.now() });
      return NextResponse.json({ releases: deduped });
    }

    if (type === "release") {
      if (!id) {
        return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
      }

      const data = await fetchFromDiscogs(`/releases/${id}`);
      const release = buildReleaseResponse(data, await normalizeThumb(data.thumb));

      return NextResponse.json({ release });
    }

    if (type === "resolve") {
      const artist = searchParams.get("artist") || "";
      const title = searchParams.get("title") || "";
      if (!artist && !title) {
        return NextResponse.json({ release: null });
      }

      const lookup = await getLabelReleaseLookup();
      const key = normalizeKey(artist, title);
      const discogsId = lookup.get(key);

      if (!discogsId) {
        return NextResponse.json({ release: null });
      }

      const data = await fetchFromDiscogs(`/releases/${discogsId}`);
      const release = buildReleaseResponse(data, await normalizeThumb(data.thumb));

      return NextResponse.json({ release });
    }

    return NextResponse.json({ error: "Invalid type parameter" }, { status: 400 });
  } catch (error) {
    console.error("Discogs API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from Discogs" },
      { status: 500 }
    );
  }
}
