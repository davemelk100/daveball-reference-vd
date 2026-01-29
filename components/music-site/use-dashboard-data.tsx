"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { amrepArtists } from "@/lib/amrep-artists-data";
import { amrepReleases } from "@/lib/amrep-releases-data";
import { getLocalAlbumImage } from "@/lib/gbv-album-images";
import { getAmrepAlbumImage } from "@/lib/amrep-album-images";
import { getProxiedImageUrl } from "@/lib/gbv-utils";

export type DashboardMember = {
  id?: number;
  name: string;
  active: boolean;
  imageUrl?: string | null;
};

export type DashboardAlbum = {
  id?: number;
  title: string;
  year?: number;
  thumb?: string;
  format?: string | string[];
  releaseType?: string;
  mainRelease?: number;
};

type ArtistData = {
  id: number;
  name: string;
  profile: string;
  members?: DashboardMember[];
};

const GBV_ARTIST_ID = 83529;

const GBV_FALLBACK_MEMBERS: DashboardMember[] = [
  { name: "Robert Pollard", active: true },
  { name: "Doug Gillard", active: true },
  { name: "Kevin March", active: true },
  { name: "Mark Shue", active: true },
  { name: "Bobby Bare Jr.", active: true },
  { name: "Travis Harrison", active: true },
];

const GBV_FALLBACK_ALBUMS: DashboardAlbum[] = [
  { title: "Bee Thousand", year: 1994 },
  { title: "Alien Lanes", year: 1995 },
  { title: "Under the Bushes Under the Stars", year: 1996 },
  { title: "Mag Earwhig!", year: 1997 },
  { title: "Propeller", year: 1992 },
  { title: "Isolation Drills", year: 2001 },
];

const dedupeReleases = (items: DashboardAlbum[]) => {
  const seen = new Set<string>();
  return items.filter((item) => {
    const titleKey = `${item.title || ""}::${item.year || ""}`.toLowerCase();
    const key = item.mainRelease
      ? `main:${item.mainRelease}`
      : `title:${titleKey}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

export function useDashboardData() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const isAmrep = site.id === "amrep";
  const [artist, setArtist] = useState<ArtistData | null>(null);
  const [albums, setAlbums] = useState<DashboardAlbum[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAmrep) {
      setArtist({
        id: 0,
        name: site.name,
        profile:
          "Independent label founded in 1986 by Tom Hazelmyer, specializing in noise rock and underground releases.",
        members: amrepArtists.map((artistEntry) => ({
          id: artistEntry.id,
          name: artistEntry.name,
          active: artistEntry.active,
          imageUrl: null,
        })),
      });
      setIsLoading(false);
      return;
    }

    const cacheKey = "gbv-dashboard-artist";
    const cacheTtlMs = 24 * 60 * 60 * 1000;
    let hasCached = false;

    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached) as {
          timestamp: number;
          data: ArtistData;
        };
        if (parsed?.data && Date.now() - parsed.timestamp < cacheTtlMs) {
          setArtist(parsed.data);
          setIsLoading(false);
          hasCached = true;
        }
      }
    } catch {
      // ignore cache errors
    }

    async function fetchData() {
      try {
        const artistRes = await fetch(
          "/api/gbv/discogs?type=artist&include_member_images=true&member_image_limit=20",
        );

        if (!artistRes.ok) {
          // Use fallback data if API fails
          if (!hasCached) {
            setArtist({
              id: GBV_ARTIST_ID,
              name: "Guided by Voices",
              profile: "American indie rock band formed in Dayton, Ohio in 1983.",
              members: GBV_FALLBACK_MEMBERS.map((m, i) => ({ id: i, ...m })),
            });
          }
          return;
        }

        const artistData = await artistRes.json();
        if (
          Array.isArray(artistData?.members) &&
          artistData.members.length <= 1
        ) {
          const fallbackRes = await fetch("/api/gbv/discogs?type=artist");
          if (fallbackRes.ok) {
            const fallbackData = await fallbackRes.json();
            if (Array.isArray(fallbackData?.members)) {
              artistData.members = fallbackData.members;
            }
          }
        }
        setArtist(artistData);
        try {
          localStorage.setItem(
            cacheKey,
            JSON.stringify({ timestamp: Date.now(), data: artistData }),
          );
        } catch {
          // ignore cache errors
        }
      } catch (err) {
        // Use fallback data on error
        if (!hasCached) {
          setArtist({
            id: GBV_ARTIST_ID,
            name: "Guided by Voices",
            profile: "American indie rock band formed in Dayton, Ohio in 1983.",
            members: GBV_FALLBACK_MEMBERS.map((m, i) => ({ id: i, ...m })),
          });
        }
        console.error(err);
      } finally {
        if (!hasCached) {
          setIsLoading(false);
        }
      }
    }

    fetchData();
  }, [isAmrep, site.name]);

  useEffect(() => {
    if (isAmrep) {
      // Use local discography data (more complete than Discogs API)
      setAlbums(
        dedupeReleases(
          amrepReleases.map((release) => ({
            id: release.id,
            title: `${release.artist} — ${release.title}`,
            year: release.year,
            format: release.format,
          })),
        ),
      );
      return;
    }

    const cacheKey = "gbv-albums-cache";
    const cacheTtlMs = 24 * 60 * 60 * 1000;

    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached) as {
          timestamp: number;
          albums: DashboardAlbum[];
        };
        if (
          parsed?.albums?.length &&
          Date.now() - parsed.timestamp < cacheTtlMs
        ) {
          setAlbums(parsed.albums);
        }
      }
    } catch {
      // ignore cache errors
    }

    async function fetchAlbums() {
      try {
        const res = await fetch("/api/gbv/discogs?type=albums");
        if (!res.ok) throw new Error("Failed to fetch albums");
        const data = await res.json();
        const nextAlbums = data.albums || [];
        setAlbums(nextAlbums);
        try {
          localStorage.setItem(
            cacheKey,
            JSON.stringify({ timestamp: Date.now(), albums: nextAlbums }),
          );
        } catch {
          // ignore cache errors
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchAlbums();
  }, [isAmrep]);

  const activeMembers =
    artist?.members?.filter((member) => member.active) || [];
  const fallbackMembers: DashboardMember[] = isAmrep
    ? amrepArtists.slice(0, 6).map((artistEntry) => ({
        id: artistEntry.id,
        name: artistEntry.name,
        active: artistEntry.active,
      }))
    : GBV_FALLBACK_MEMBERS;
  const memberLimit = isAmrep ? 6 : 5;
  const membersToShow =
    activeMembers.length > 0
      ? activeMembers.slice(0, memberLimit)
      : fallbackMembers.slice(0, memberLimit);

  const fallbackAlbums: DashboardAlbum[] = isAmrep
    ? amrepReleases.slice(0, 6).map((release) => ({
        title: `${release.artist} — ${release.title}`,
        year: release.year,
        format: release.format,
      }))
    : GBV_FALLBACK_ALBUMS;
  const albumsToShow = albums.length > 0 ? albums.slice(0, 6) : fallbackAlbums;

  const getAlbumImage = useCallback(
    (album: DashboardAlbum): string | null => {
      if (isAmrep && album.id) return getAmrepAlbumImage(album.id);
      if (album.id) {
        const local = getLocalAlbumImage(album.id);
        if (local) return local;
      }
      return getProxiedImageUrl(album.thumb || null);
    },
    [isAmrep],
  );

  return {
    site,
    isAmrep,
    isLoading,
    error,
    membersToShow,
    albumsToShow,
    getAlbumImage,
  };
}
