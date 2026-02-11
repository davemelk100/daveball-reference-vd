"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { pickDailyGbvRecord, getDailyGbvRecord, type GbvRecordOfDay } from "@/lib/gbv-records-data";
import { getDailyAmrepRecord, type AmrepRecordOfDay } from "@/lib/amrep-records-data";
import { getDailyRevRecord, type RevRecordOfDay } from "@/lib/rev-records-data";
import { getLocalAlbumImage } from "@/lib/gbv-album-images";
import { getAmrepAlbumImage } from "@/lib/amrep-album-images";
import { getMusicSiteFromPathname } from "@/lib/music-site";

export function useRecordOfDay() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const isAmrep = site.id === "amrep";
  const isRev = site.id === "rev";
  const [record, setRecord] = useState<GbvRecordOfDay | AmrepRecordOfDay | RevRecordOfDay | null>(null);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [albumId, setAlbumId] = useState<number | null>(null);

  useEffect(() => {
    if (isRev) {
      // REV records - use discography data directly
      const revDaily = getDailyRevRecord();
      setRecord(revDaily);
      if (revDaily.coverUrl) {
        setCoverUrl(revDaily.coverUrl);
      }
      if ("catalogNumber" in revDaily) {
        setAlbumId(revDaily.catalogNumber);
      }
      return;
    }

    if (isAmrep) {
      // AmRep records - use releases data directly
      const amrepDaily = getDailyAmrepRecord();
      setRecord(amrepDaily);

      // Use the id directly from the record
      if ("id" in amrepDaily) {
        setAlbumId(amrepDaily.id);
        const localImage = getAmrepAlbumImage(amrepDaily.id);
        if (localImage) {
          setCoverUrl(localImage);
          return;
        }
      }

      if (amrepDaily.coverUrl) {
        setCoverUrl(amrepDaily.coverUrl);
        return;
      }

      // Try to fetch cover from Discogs
      const cacheKey = `amrep-record-cover:${amrepDaily.title}:${amrepDaily.year}`;
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached) as { url?: string };
          if (parsed?.url) {
            setCoverUrl(parsed.url);
          }
        }
      } catch {
        // ignore cache errors
      }

      async function fetchAmrepCover() {
        try {
          const perPage = 100;
          const maxPages = 3;

          for (let page = 1; page <= maxPages; page += 1) {
            const res = await fetch(
              `/api/amrep/discogs?type=releases&per_page=${perPage}&page=${page}`,
            );
            if (!res.ok) return;
            const data = await res.json();
            const releases = Array.isArray(data?.releases) ? data.releases : [];
            const titleMatch = (release: { title?: string }) =>
              (release.title || "").toLowerCase() === amrepDaily.title.toLowerCase();
            const exact = releases.find(
              (release: { title?: string; year?: number }) =>
                titleMatch(release) && release.year === amrepDaily.year,
            );
            const fallback = releases.find(titleMatch);
            const resolved = exact || fallback;
            if (resolved?.thumb) {
              setCoverUrl(resolved.thumb);
              try {
                localStorage.setItem(
                  cacheKey,
                  JSON.stringify({ url: resolved.thumb }),
                );
              } catch {
                // ignore cache errors
              }
              break;
            }
          }
        } catch {
          // ignore cover lookup errors
        }
      }

      fetchAmrepCover();
      return;
    }

    // GBV - use static data immediately, then enhance with API data
    const gbvDaily = getDailyGbvRecord();
    setRecord(gbvDaily);
    if (gbvDaily.id) {
      setAlbumId(gbvDaily.id);
      const localImage = getLocalAlbumImage(gbvDaily.id);
      if (localImage) {
        setCoverUrl(localImage);
      }
    }

    const albumsCacheKey = "gbv-albums-cache";

    async function enhanceWithApiData() {
      let albums: Array<{ id?: number; title?: string; year?: number; thumb?: string }> = [];

      try {
        const cached = localStorage.getItem(albumsCacheKey);
        if (cached) {
          const parsed = JSON.parse(cached) as { albums?: typeof albums };
          if (parsed?.albums?.length) {
            albums = parsed.albums;
          }
        }
      } catch {
        // ignore cache errors
      }

      if (albums.length === 0) {
        try {
          const res = await fetch("/api/gbv/discogs?type=albums");
          if (res.ok) {
            const data = await res.json();
            albums = Array.isArray(data.albums) ? data.albums : [];
            try {
              localStorage.setItem(albumsCacheKey, JSON.stringify({ albums }));
            } catch {
              // ignore cache errors
            }
          }
        } catch {
          // ignore fetch errors
        }
      }

      // Enhance with API data if available (may have thumb URLs)
      const daily = pickDailyGbvRecord(albums);
      if (daily) {
        setRecord(daily);
        if (daily.id) {
          setAlbumId(daily.id);
        }
        const localImage = getLocalAlbumImage(daily.id);
        const normalizeImageUrl = (url: string | null | undefined) =>
          url ? url.replace(/^http:/, "https:") : null;
        const resolvedUrl = localImage || normalizeImageUrl(daily.thumb);
        if (resolvedUrl) {
          setCoverUrl(resolvedUrl);
        }
      }
    }

    enhanceWithApiData();
  }, [isAmrep, isRev]);

  const albumHref = albumId ? `${site.basePath}/albums/${albumId}` : null;
  const displayTitle =
    record && "artist" in record && record.artist
      ? `${record.artist} — ${record.title}`
      : record?.title;

  return {
    site,
    isAmrep,
    record,
    coverUrl,
    albumHref,
    displayTitle,
  };
}
