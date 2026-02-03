import { NextResponse } from "next/server";
import { cacheRemoteImage } from "@/lib/gbv-image-cache";
import { gbvMembers } from "@/lib/gbv-members-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GBV_ARTIST_ID = 83529;
const DISCOGS_BASE_URL = "https://api.discogs.com";
const USER_AGENT = "GuidedByNumbers/1.0";
const MARK_SHUE_IMAGE =
  "https://commons.wikimedia.org/wiki/Special:FilePath/Mark%20Shue%20GARP%20music%20festival%202016.jpg";

interface DiscogsRelease {
  id: number;
  title: string;
  year: number;
  type: string;
  main_release?: number;
  artist: string;
  role: string;
  resource_url: string;
  thumb: string;
  format?: string | string[];
}

interface DiscogsArtist {
  id: number;
  name: string;
  profile: string;
  members?: Array<{ id: number; name: string; active: boolean; resource_url?: string }>;
  images?: Array<{ uri?: string; uri150?: string; type?: string }>;
  namevariations?: string[];
  urls?: string[];
}

const memberImageCache = new Map<number, { url: string | null; timestamp: number }>();
const MEMBER_IMAGE_TTL = 24 * 60 * 60 * 1000;
const albumsCache = new Map<string, { albums: any[]; timestamp: number }>();
const ALBUMS_CACHE_TTL = 24 * 60 * 60 * 1000;

async function pickDiscogsImage(
  images?: Array<{ uri?: string; uri150?: string; type?: string }>
) {
  if (!images || images.length === 0) return null;
  const primary = images.find((img) => img.type === "primary") || images[0];
  const url = primary?.uri150 || primary?.uri || null;
  if (!url) return null;
  const httpsUrl = url.replace(/^http:/, "https:");
  const cached = await cacheRemoteImage(httpsUrl, "discogs-member");
  return cached || `/api/gbv/image-proxy?url=${encodeURIComponent(httpsUrl)}`;
}

async function fetchFromDiscogs(endpoint: string) {
  const token = process.env.DISCOGS_USER_TOKEN || process.env.DISCOGS_TOKEN;
  const url = `${DISCOGS_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      "User-Agent": USER_AGENT,
      ...(token ? { Authorization: `Discogs token=${token}` } : {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    console.error(`Discogs API error: ${response.status} for ${url}`, body);
    throw new Error(`Discogs API error: ${response.status}`);
  }

  return response.json();
}

async function fetchCommonsImage(
  origin: string,
  name: string
): Promise<string | null> {
  const res = await fetch(
    `${origin}/api/gbv/commons-image?name=${encodeURIComponent(name)}`,
    { headers: { "User-Agent": USER_AGENT } }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return typeof data?.imageUrl === "string" ? data.imageUrl : null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const origin = new URL(request.url).origin;
  const type = searchParams.get("type") || "artist";
  const page = searchParams.get("page") || "1";
  const perPage = searchParams.get("per_page") || "50";
  const maxPagesParam = searchParams.get("max_pages");
  const maxPages = Math.max(1, Number(maxPagesParam || 5));
  const includeMemberImages = searchParams.get("include_member_images") === "true";
  const memberImageLimit = Math.max(0, Number(searchParams.get("member_image_limit") || 30));
  const id = searchParams.get("id");

  try {
    if (type === "artist") {
      // Use static member data as primary source; try Discogs for fresh data
      let members: Array<{ id: number; name: string; active: boolean }> = gbvMembers;
      let profile = "American indie rock band formed in Dayton, Ohio in 1983.";
      let namevariations: string[] | undefined;
      let urls: string[] | undefined;

      try {
        const data: DiscogsArtist = await fetchFromDiscogs(`/artists/${GBV_ARTIST_ID}`);
        if (data.members && data.members.length > 0) {
          members = data.members;
        }
        profile = data.profile || profile;
        namevariations = data.namevariations;
        urls = data.urls;
      } catch (err) {
        console.error("Discogs artist fetch failed, using static members:", err);
      }

      if (includeMemberImages && members.length > 0 && memberImageLimit > 0) {
        const membersToFetch = members.slice(0, memberImageLimit);

        async function fetchMemberImage(
          member: { id: number; name: string; active: boolean }
        ): Promise<{ id: number; imageUrl: string | null }> {
          const cached = memberImageCache.get(member.id);
          if (cached && Date.now() - cached.timestamp < MEMBER_IMAGE_TTL) {
            return { id: member.id, imageUrl: cached.url };
          }

          try {
            const memberData: DiscogsArtist = await fetchFromDiscogs(`/artists/${member.id}`);
            let imageUrl = await pickDiscogsImage(memberData.images);

            if (!imageUrl && member.name.toLowerCase() === "mark shue") {
              const cachedOverride = await cacheRemoteImage(
                MARK_SHUE_IMAGE,
                "commons-member"
              );
              imageUrl = cachedOverride || MARK_SHUE_IMAGE;
            }

            if (!imageUrl && member.name.toLowerCase() === "mark shue") {
              const commonsUrl = await fetchCommonsImage(origin, member.name);
              const cachedCommonsUrl = commonsUrl
                ? await cacheRemoteImage(commonsUrl, "commons-member")
                : null;
              imageUrl = cachedCommonsUrl || commonsUrl || null;
            }

            memberImageCache.set(member.id, { url: imageUrl, timestamp: Date.now() });
            return { id: member.id, imageUrl };
          } catch {
            memberImageCache.set(member.id, { url: null, timestamp: Date.now() });
            return { id: member.id, imageUrl: null };
          }
        }

        // Batch requests in groups of 5 to avoid Discogs rate limits
        const BATCH_SIZE = 5;
        const results: { id: number; imageUrl: string | null }[] = [];
        for (let i = 0; i < membersToFetch.length; i += BATCH_SIZE) {
          const batch = membersToFetch.slice(i, i + BATCH_SIZE);
          const batchResults = await Promise.all(batch.map(fetchMemberImage));
          results.push(...batchResults);
        }

        const imageMap = new Map(results.map((result) => [result.id, result.imageUrl]));
        const enrichedMembers = members.map((member) => ({
          ...member,
          imageUrl: imageMap.has(member.id) ? imageMap.get(member.id) : undefined,
        }));

        return NextResponse.json({
          id: GBV_ARTIST_ID,
          name: "Guided by Voices",
          profile,
          members: enrichedMembers,
          namevariations,
          urls,
        });
      }

      return NextResponse.json({
        id: GBV_ARTIST_ID,
        name: "Guided by Voices",
        profile,
        members,
        namevariations,
        urls,
      });
    }

    if (type === "releases") {
      const data = await fetchFromDiscogs(
        `/artists/${GBV_ARTIST_ID}/releases?page=${page}&per_page=${perPage}&sort=year&sort_order=desc`
      );

      const releases = data.releases.map((release: DiscogsRelease) => ({
        id: release.id,
        title: release.title,
        year: release.year,
        type: release.type,
        thumb: release.thumb,
        mainRelease: release.main_release,
        role: release.role,
      }));

      return NextResponse.json({
        releases,
        pagination: data.pagination,
      });
    }

    if (type === "albums") {
      const cacheKey = `albums:${maxPages}`;
      const cachedAlbums = albumsCache.get(cacheKey);
      if (cachedAlbums && Date.now() - cachedAlbums.timestamp < ALBUMS_CACHE_TTL) {
        return NextResponse.json({ albums: cachedAlbums.albums, cached: true });
      }

      // Fetch all pages to get complete album list
      let allReleases: DiscogsRelease[] = [];
      let currentPage = 1;
      let totalPages = 1;

      do {
        try {
          const data = await fetchFromDiscogs(
            `/artists/${GBV_ARTIST_ID}/releases?page=${currentPage}&per_page=100&sort=year&sort_order=asc`
          );
          allReleases = [...allReleases, ...data.releases];
          totalPages = data.pagination.pages;
          currentPage++;
        } catch (error) {
          if (cachedAlbums?.albums?.length) {
            return NextResponse.json({ albums: cachedAlbums.albums, cached: true });
          }
          throw error;
        }
      } while (currentPage <= totalPages && currentPage <= maxPages);

      const albums = allReleases
        .filter((release: DiscogsRelease) => {
          if (release.role !== "Main") return false;
          if (release.type === "master") return true;
          if (release.type !== "release") return false;
          const format = Array.isArray(release.format)
            ? release.format.join(" ").toLowerCase()
            : (release.format || "").toLowerCase();
          return format.includes("single");
        })
        .map((release: DiscogsRelease) => ({
          id: release.id,
          title: release.title,
          year: release.year,
          thumb: release.thumb,
          mainRelease: release.main_release,
          format: release.format,
          releaseType: release.type,
        }));

      albumsCache.set(cacheKey, { albums, timestamp: Date.now() });
      return NextResponse.json({ albums });
    }

    if (type === "master") {
      if (!id) {
        return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
      }
      const data = await fetchFromDiscogs(`/masters/${id}`);
      if (data.title) data.title = data.title.replace(/\s*\(\d+\)$/, "");
      if (Array.isArray(data.artists)) {
        data.artists = data.artists.map((a: any) => ({
          ...a,
          name: (a.name || "").replace(/\s*\(\d+\)$/, ""),
        }));
      }
      return NextResponse.json(data);
    }

    return NextResponse.json({ error: "Invalid type parameter" }, { status: 400 });
  } catch (error) {
    console.error("Discogs API error:", error);

    // Return fallback data instead of error for artist type
    if (type === "artist") {
      return NextResponse.json({
        id: GBV_ARTIST_ID,
        name: "Guided by Voices",
        profile: "American indie rock band formed in Dayton, Ohio in 1983.",
        members: gbvMembers,
      });
    }

    // Return empty albums for albums type
    if (type === "albums") {
      return NextResponse.json({ albums: [], fallback: true });
    }

    return NextResponse.json(
      { error: "Failed to fetch data from Discogs" },
      { status: 500 }
    );
  }
}
